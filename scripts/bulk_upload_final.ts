import dotenv from "dotenv";
import path from "path";
import fs from "fs";

// Ensure env vars are loaded first
const result = dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});

// Configuration
const SOURCE_DIR = "C:\\Users\\nithi\\Downloads\\panel doors";
const TARGET_FTP_FOLDER = "products";
const CATEGORY = "interior";
const DOOR_TYPE = "Interior Panel Doors";

async function main() {
  console.log("Script starting...");

  try {
    // Dynamic imports to match successful test execution
    console.log("Importing dependencies...");
    const { uploadToFtp } = await import("../lib/ftp");
    const { default: connectDB } = await import("../lib/mongodb");
    const { default: Door } = await import("../models/Door");
    const sharp = (await import("sharp")).default;
    console.log("Dependencies imported.");

    console.log("Connecting to MongoDB...");
    await connectDB();
    console.log("Connected.");

    // Check source directory
    if (!fs.existsSync(SOURCE_DIR)) {
      console.error(`Source directory not found: ${SOURCE_DIR}`);
      process.exit(1);
    }

    // Get files
    const files = fs.readdirSync(SOURCE_DIR).filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
    });

    console.log(`Found ${files.length} images in ${SOURCE_DIR}`);

    let successCount = 0;
    let failCount = 0;
    let skipCount = 0;

    for (const file of files) {
      const originalName = path.parse(file).name;
      const searchName = originalName.trim();

      console.log(`\nProcessing: ${file}`);
      // console.log(`Searching for Door: "${searchName}"...`);

      const door = await Door.findOne({
        name: { $regex: new RegExp(`^${searchName}$`, "i") },
      });

      if (!door) {
        console.warn(`[SKIP] No door found for "${searchName}"`);
        skipCount++;
        continue;
      }

      console.log(`[MATCH] Found: ${door.name} (${door._id})`);

      try {
        const filePath = path.join(SOURCE_DIR, file);
        const fileBuffer = fs.readFileSync(filePath);

        // Convert to WebP
        const webpBuffer = await sharp(fileBuffer)
          .webp({ quality: 80, effort: 4 })
          .toBuffer();

        const newFileName = `${searchName.replace(/[^a-zA-Z0-9.-]/g, "_")}.webp`;

        // Upload
        // console.log(`Uploading as ${newFileName}...`);
        const publicUrl = await uploadToFtp(
          webpBuffer,
          newFileName,
          TARGET_FTP_FOLDER,
        );

        console.log(`Uploaded: ${publicUrl}`);

        // Update DB
        door.imageUrl = publicUrl;
        door.category = CATEGORY;
        door.doorType = DOOR_TYPE;

        await door.save();
        console.log(`[SUCCESS] Updated.`);
        successCount++;
      } catch (err) {
        console.error(`[ERROR] Failed ${file}:`, err);
        failCount++;
      }
    }

    console.log("\n--------------------------------------------------");
    console.log(
      `Total: ${files.length} | Success: ${successCount} | Failed: ${failCount} | Skipped: ${skipCount}`,
    );
    console.log("--------------------------------------------------");
  } catch (err) {
    console.error("Fatal Error:", err);
    process.exit(1);
  }
}

main();
