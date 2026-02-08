import dotenv from "dotenv";
import path from "path";
import fs from "fs";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const CATEGORY = "exterior";
const FTP_FOLDER = "products";

const CONFIG = [
  {
    type: "Contemporary Collection",
    path: "C:\\Users\\nithi\\Downloads\\Contemporary",
    baseName: "contemporarycollection",
  },
  {
    type: "Craftsman Collection",
    path: "C:\\Users\\nithi\\Downloads\\Craftssman collection",
    baseName: "craftsmancollection",
  },
  {
    type: "Exterior French Doors",
    path: "C:\\Users\\nithi\\Downloads\\exterior french doors",
    baseName: "exteriorfrenchdoors",
  },
  {
    type: "Waterbarrier",
    path: "C:\\Users\\nithi\\Downloads\\water barrier",
    baseName: "waterbarrier",
  },
  {
    type: "Entry Doors",
    path: "C:\\Users\\nithi\\Downloads\\Entry doors",
    baseName: "entrydoors",
  },
  {
    type: "Half Lite Doors",
    path: "C:\\Users\\nithi\\Downloads\\half litedoors",
    baseName: "halflitedoors",
  },
  {
    type: "Exterior Panel Doors",
    path: "C:\\Users\\nithi\\Downloads\\EXTERIOR PANEL DOOR",
    baseName: "exteriorpaneldoors",
  },
];

async function main() {
  console.log("Starting Bulk Upload Exterior Doors...");

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

    let totalUpdated = 0;
    let totalCreated = 0;
    let totalErrors = 0;

    // 3. Iterate Config
    for (const item of CONFIG) {
      console.log(`\n==================================================`);
      console.log(`Processing: ${item.type}`);
      console.log(`Path: ${item.path}`);

      if (!fs.existsSync(item.path)) {
        console.error(`[Directory Not Found] Skipping ${item.type}`);
        totalErrors++;
        continue;
      }

      const files = fs
        .readdirSync(item.path)
        .filter((f) =>
          [".jpg", ".jpeg", ".png", ".webp"].includes(
            path.extname(f).toLowerCase(),
          ),
        );
      console.log(`Found ${files.length} images.`);

      if (files.length === 0) {
        console.warn("No images found, skipping.");
        continue;
      }

      // Fetch Existing Records
      const existingDoors = await Door.find({
        category: CATEGORY,
        doorType: item.type,
      }).sort({ name: 1 });

      console.log(`Existing DB records: ${existingDoors.length}`);

      // Process Files
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const newName = `${item.baseName}${i + 1}`;
        const targetFileName = `${newName}.webp`;

        console.log(
          `> Processing [${i + 1}/${files.length}]: ${file} -> ${newName}`,
        );

        try {
          // Read & Convert
          const fileBuf = fs.readFileSync(path.join(item.path, file));
          const webpBuf = await sharp(fileBuf)
            .webp({ quality: 80, effort: 4 })
            .toBuffer();

          // Upload
          const publicUrl = await uploadToFtp(
            webpBuf,
            targetFileName,
            FTP_FOLDER,
          );

          // DB Update/Create
          if (i < existingDoors.length) {
            // Update existing
            const door = existingDoors[i];
            door.name = newName;
            door.imageUrl = publicUrl;
            door.category = CATEGORY;
            door.doorType = item.type;

            await door.save();
            console.log(`  [UPDATED] ID: ${door._id} -> ${newName}`);
            totalUpdated++;
          } else {
            // Create new
            await Door.create({
              name: newName,
              imageUrl: publicUrl,
              category: CATEGORY,
              doorType: item.type,
            });
            console.log(`  [CREATED] New Record -> ${newName}`);
            totalCreated++;
          }
        } catch (err) {
          console.error(`  [ERROR] Failed to process ${file}`, err);
          totalErrors++;
        }
      }
    }

    console.log(`\n==================================================`);
    console.log(`GRAND TOTALS`);
    console.log(`Updated: ${totalUpdated}`);
    console.log(`Created: ${totalCreated}`);
    console.log(`Errors: ${totalErrors}`);
    console.log(`==================================================`);

    process.exit(0);
  } catch (err) {
    console.error("Fatal Error:", err);
    process.exit(1);
  }
}

main();
