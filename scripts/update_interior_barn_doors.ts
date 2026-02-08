import dotenv from "dotenv";
import path from "path";
import fs from "fs";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const SOURCE_DIR = "C:\\Users\\nithi\\Downloads\\interior barn doors";
const CATEGORY = "interior";
const DOOR_TYPE = "Interior Barn Doors"; // Matches schema enum if applicable, or just string
const BASE_NAME = "interiorbarndoors";
const FTP_FOLDER = "products";

async function main() {
  console.log(`Starting Update for ${DOOR_TYPE}...`);

  try {
    // 1. Imports
    console.log("Importing dependencies...");
    const mongoose = (await import("mongoose")).default;
    const { default: Door } = await import("../models/Door");
    const { uploadToFtp } = await import("../lib/ftp");
    const sharp = (await import("sharp")).default;

    // 2. Connect DB
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) throw new Error("No MONGODB_URI");

    await mongoose.connect(MONGODB_URI, { dbName: process.env.MONGODB_DB });
    console.log("Connected to MongoDB.");

    // 3. check source dir
    if (!fs.existsSync(SOURCE_DIR)) {
      throw new Error(`Source directory not found: ${SOURCE_DIR}`);
    }

    const files = fs
      .readdirSync(SOURCE_DIR)
      .filter((f) =>
        [".jpg", ".jpeg", ".png", ".webp"].includes(
          path.extname(f).toLowerCase(),
        ),
      );
    console.log(`Found ${files.length} images in ${SOURCE_DIR}`);

    if (files.length === 0) {
      console.log("No images found. Exiting.");
      process.exit(0);
    }

    // 4. Fetch existing records
    const existingDoors = await Door.find({
      category: CATEGORY,
      doorType: DOOR_TYPE,
    }).sort({ name: 1 }); // Sort by name to try and match sequence if possible

    console.log(
      `Existing DB records for ${DOOR_TYPE}: ${existingDoors.length}`,
    );

    // 5. Process Files
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Sequential naming: interiorbarndoors1, interiorbarndoors2, ...
      const newName = `${BASE_NAME}${i + 1}`;
      const targetFileName = `${newName}.webp`;

      console.log(
        `> Processing [${i + 1}/${files.length}]: ${file} -> ${newName}`,
      );

      try {
        // Read & Convert
        const fileBuf = fs.readFileSync(path.join(SOURCE_DIR, file));
        const webpBuf = await sharp(fileBuf)
          .webp({ quality: 80, effort: 4 })
          .toBuffer();

        // Upload
        const publicUrl = await uploadToFtp(
          webpBuf,
          targetFileName,
          FTP_FOLDER,
        );
        console.log(`  [UPLOADED] ${publicUrl}`);

        // DB Update/Create
        if (i < existingDoors.length) {
          // Update existing record
          const door = existingDoors[i];
          door.name = newName;
          door.imageUrl = publicUrl;
          // Ensure category/type are set correctly just in case
          door.category = CATEGORY;
          door.doorType = DOOR_TYPE;

          await door.save();
          console.log(`  [UPDATED DB] ID: ${door._id} -> ${newName}`);
        } else {
          // Create new record
          const newDoor = await Door.create({
            name: newName,
            imageUrl: publicUrl,
            category: CATEGORY,
            doorType: DOOR_TYPE,
            price: 0, // Default
            description: "Interior Barn Door", // Default
            inStock: true,
          });
          console.log(`  [CREATED DB] New Record -> ${newName}`);
        }
      } catch (err) {
        console.error(`  [ERROR] Failed to process ${file}`, err);
      }
    }

    // Optional: If there are MORE existing records than files, should we delete the extras?
    // User said "if there are no datas add thest two", implying we want to sync.
    // Usually safest NOT to delete unless asked, but we can log it.
    if (existingDoors.length > files.length) {
      console.log(
        `Note: There are ${existingDoors.length} existing records but only ${files.length} images provided.`,
      );
      console.log(
        `Records from index ${files.length} onwards were NOT touched.`,
      );
    }

    console.log("\nDone.");
    process.exit(0);
  } catch (err) {
    console.error("Fatal Error:", err);
    process.exit(1);
  }
}

main();
