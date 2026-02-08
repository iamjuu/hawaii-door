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
  console.log("Starting Database Overwrite Script...");

  try {
    // 1. Validate Map File
    if (!fs.existsSync(MAP_FILE)) {
      console.error(`Map file not found: ${MAP_FILE}`);
      process.exit(1);
    }
    const uploadMap = JSON.parse(fs.readFileSync(MAP_FILE, "utf-8"));
    const newDoorNames = Object.keys(uploadMap); // Array of "SD_..." names
    console.log(`Loaded ${newDoorNames.length} images from map.`);

    // 2. Connect to DB
    const mongoose = (await import("mongoose")).default;
    const { default: Door } = await import("../models/Door");

    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env.local");
    }

    await mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGODB_DB,
    });
    console.log("Connected to MongoDB.");

    // 3. Fetch Existing Records
    console.log(`Fetching existing '${DOOR_TYPE}'...`);
    const existingDoors = await Door.find({
      category: CATEGORY,
      doorType: DOOR_TYPE,
    });
    console.log(`Found ${existingDoors.length} existing records.`);

    // 4. Overwrite / Create
    let updatedCount = 0;
    let createdCount = 0;

    for (let i = 0; i < newDoorNames.length; i++) {
      const newName = newDoorNames[i];
      const newUrl = uploadMap[newName];

      if (i < existingDoors.length) {
        // Update existing
        const door = existingDoors[i];
        console.log(
          `[UPDATE] ID: ${door._id} | Old Name: "${door.name}" -> New Name: "${newName}"`,
        );

        door.name = newName;
        door.imageUrl = newUrl;
        // Ensure type/category consistency
        door.category = CATEGORY;
        door.doorType = DOOR_TYPE;

        await door.save();
        updatedCount++;
      } else {
        // Create new
        console.log(`[CREATE] New Door: "${newName}"`);
        await Door.create({
          name: newName,
          imageUrl: newUrl,
          category: CATEGORY,
          doorType: DOOR_TYPE,
        });
        createdCount++;
      }
    }

    console.log("\n--------------------------------------------------");
    console.log(`Total Uploaded Images: ${newDoorNames.length}`);
    console.log(`Existing Records Updated: ${updatedCount}`);
    console.log(`New Records Created: ${createdCount}`);
    console.log("--------------------------------------------------");

    process.exit(0);
  } catch (err) {
    console.error("Fatal Error:", err);
    process.exit(1);
  }
}

main();
