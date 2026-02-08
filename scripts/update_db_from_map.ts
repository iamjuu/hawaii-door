import dotenv from "dotenv";
import path from "path";
import fs from "fs";

// Load environment variables
const result = dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});

const MAP_FILE = "uploaded_images_map.json";
const CATEGORY = "interior";
const DOOR_TYPE = "Interior Panel Doors";

async function main() {
  console.log("Starting DB Update Script...");

  try {
    if (!fs.existsSync(MAP_FILE)) {
      console.error(`Map file not found: ${MAP_FILE}`);
      process.exit(1);
    }

    const uploadMap = JSON.parse(fs.readFileSync(MAP_FILE, "utf-8"));
    const filenames = Object.keys(uploadMap);
    console.log(`Found ${filenames.length} entries in map.`);

    // Dynamic imports
    console.log("Importing dependencies...");
    const mongoose = (await import("mongoose")).default;
    const { default: Door } = await import("../models/Door");
    console.log("Dependencies imported.");

    console.log("Connecting to MongoDB...");
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env.local");
    }

    await mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGODB_DB,
    });
    console.log("Connected.");

    let successCount = 0;
    let failCount = 0;
    let notFoundCount = 0;

    for (const originalName of filenames) {
      const publicUrl = uploadMap[originalName];
      const searchName = originalName.trim();

      // console.log(`Processing: ${searchName}`);

      const door = await Door.findOne({
        name: { $regex: new RegExp(`^${searchName}$`, "i") },
      });

      if (!door) {
        console.warn(`[SKIP] No door found for "${searchName}"`);
        notFoundCount++;
        continue;
      }

      // console.log(`[MATCH] Found: ${door.name} (${door._id})`);

      try {
        door.imageUrl = publicUrl;
        door.category = CATEGORY;
        door.doorType = DOOR_TYPE;

        await door.save();
        console.log(`[UPDATED] ${door.name} -> ${publicUrl}`);
        successCount++;
      } catch (err) {
        console.error(`[ERROR] Failed to update ${door.name}:`, err);
        failCount++;
      }
    }

    console.log("\n--------------------------------------------------");
    console.log(`Total Entries: ${filenames.length}`);
    console.log(`Updated: ${successCount}`);
    console.log(`Not Found: ${notFoundCount}`);
    console.log(`Failed: ${failCount}`);
    console.log("--------------------------------------------------");

    process.exit(0);
  } catch (err) {
    console.error("Fatal Error:", err);
    process.exit(1);
  }
}

main();
