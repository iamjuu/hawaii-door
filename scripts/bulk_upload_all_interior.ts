import dotenv from "dotenv";
import path from "path";
import fs from "fs";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const CATEGORY = "interior";
const FTP_FOLDER = "products";

// Configuration from user request
// Note: Fixed typos in paths as best guess, kept original if unsure but likely needs match
const CONFIG = [
  {
    type: "Bifold Doors",
    path: "C:\\Users\\nithi\\Downloads\\bifold",
    baseName: "bifolddoors",
  },
  {
    type: "Primed Interior Panel Doors",
    path: "C:\\Users\\nithi\\Downloads\\primed interior panel doors",
    baseName: "primedinteriorpaneldoors",
  },
  {
    type: "Primed Bifold Doors",
    path: "C:\\Users\\nithi\\Downloads\\primed bifold",
    baseName: "primedbifolddoors",
  },
  {
    type: "Louver Doors and Bifold Doors",
    // "lover doors dn biofld dooors" -> Assuming typo "lover" -> "louver", "dn" -> "and", "biofld" -> "bifold"
    path: "C:\\Users\\nithi\\Downloads\\lover doors dn biofld dooors",
    baseName: "louverdoorsandbifolddoors",
  },
  {
    type: "Interior Barn Doors",
    path: "C:\\Users\\nithi\\Downloads\\interior-barn",
    baseName: "interiorbarndoors",
  },
  {
    type: "Interior French Doors",
    path: "C:\\Users\\nithi\\Downloads\\interior french doors",
    baseName: "interiorfrenchdoors",
  },
  {
    type: "Primed Interior French Doors",
    path: "C:\\Users\\nithi\\Downloads\\Primed Interior French Doors",
    baseName: "primedinteriorfrenchdoors",
  },
  {
    type: "20-Minute Fire Doors",
    // Removed trailing single quote from user string if it was a typo, verified existence later
    path: "C:\\Users\\nithi\\Downloads\\20-Minute Fire Doors'",
    baseName: "20minutefiredoors",
  },
  {
    type: "20-Minute Fire Doors Primed",
    path: "C:\\Users\\nithi\\Downloads\\20-Minute Fire Doors Primed",
    baseName: "20minutefiredoorsprimed",
  },
];

async function main() {
  console.log("Starting Master Bulk Upload Script...");

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
      console.log(`Base Name: ${item.baseName}`);
      console.log(`==================================================`);

      // Check Dir
      // Handle the trailing quote issue in path if needed by checking both with/without
      let dirPath = item.path;
      if (!fs.existsSync(dirPath)) {
        // Try removing trailing quote if it exists
        if (dirPath.endsWith("'")) {
          const altPath = dirPath.slice(0, -1);
          if (fs.existsSync(altPath)) {
            dirPath = altPath;
            console.log(`Found directory at adjusted path: ${dirPath}`);
          } else {
            console.error(`[Directory Not Found] Skipping ${item.type}`);
            totalErrors++;
            continue;
          }
        } else {
          console.error(`[Directory Not Found] Skipping ${item.type}`);
          totalErrors++;
          continue;
        }
      }

      // Get Files
      const files = fs
        .readdirSync(dirPath)
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
      }).sort({ name: 1 }); // Sort to have stable order if renaming

      console.log(`Existing DB records: ${existingDoors.length}`);

      // Process Files
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const newName = `${item.baseName}${i + 1}`; // e.g., bifolddoors1
        const targetFileName = `${newName}.webp`;

        console.log(
          `> Processing [${i + 1}/${files.length}]: ${file} -> ${newName}`,
        );

        try {
          // Read & Convert
          const fileBuf = fs.readFileSync(path.join(dirPath, file));
          const webpBuf = await sharp(fileBuf)
            .webp({ quality: 80, effort: 4 })
            .toBuffer();

          // Upload
          const publicUrl = await uploadToFtp(
            webpBuf,
            targetFileName,
            FTP_FOLDER,
          );
          // console.log(`  Uploaded: ${publicUrl}`);

          // DB Update/Create
          if (i < existingDoors.length) {
            // Update existing
            const door = existingDoors[i];
            door.name = newName;
            door.imageUrl = publicUrl;
            door.category = CATEGORY; // Reinforce
            door.doorType = item.type; // Reinforce

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
