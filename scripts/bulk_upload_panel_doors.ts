import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import sharp from "sharp";

// Load environment variables
console.log("Script starting...");
const result = dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});

if (result.error) {
  console.error("Error loading .env.local", result.error);
  process.exit(1);
}

// Configuration
const SOURCE_DIR = "C:\\Users\\nithi\\Downloads\\panel doors";
const TARGET_FTP_FOLDER = "products"; // Will be uploads/products
const CATEGORY = "interior";
const DOOR_TYPE = "Interior Panel Doors";

async function main() {
  console.log("Inside main function...");

  // Dynamic imports to ensure dotenv is loaded (though lib fix makes this less critical)
  const { uploadToFtp } = await import("../lib/ftp");
  const { default: connectDB } = await import("../lib/mongodb");
  const { default: Door } = await import("../models/Door");

  console.log("Connecting to MongoDB...");
  await connectDB();
  console.log("Connected.");

  // Check if source directory exists
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`Source directory not found: ${SOURCE_DIR}`);
    process.exit(1);
  }

  // Get all files from source directory
  const files = fs.readdirSync(SOURCE_DIR).filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
  });

  console.log(`Found ${files.length} images in ${SOURCE_DIR}`);

  let successCount = 0;
  let failCount = 0;
  let skipCount = 0;

  for (const file of files) {
    const originalName = path.parse(file).name; // e.g., "My Door" from "My Door.jpg"
    // Normalize name for matching (trim spaces)
    const searchName = originalName.trim();

    console.log(`\nProcessing: ${file}`);
    console.log(`Searching for Door with name: "${searchName}"...`);

    // Find the door in the database
    // Using a regex for case-insensitive matching and robust whitespace handling
    const door = await Door.findOne({
      name: { $regex: new RegExp(`^${searchName}$`, "i") },
    });

    if (!door) {
      console.warn(`[SKIP] No matching Door record found for "${searchName}"`);
      skipCount++;
      continue;
    }

    console.log(`[MATCH] Found Door: ${door.name} (${door._id})`);

    try {
      // Read file
      const filePath = path.join(SOURCE_DIR, file);
      const fileBuffer = fs.readFileSync(filePath);

      // Convert to WebP
      console.log("Converting to WebP...");
      const webpBuffer = await sharp(fileBuffer)
        .webp({ quality: 80, effort: 4 })
        .toBuffer();

      const newFileName = `${searchName.replace(/[^a-zA-Z0-9.-]/g, "_")}.webp`;

      // Upload to FTP
      console.log(`Uploading to FTP as ${newFileName}...`);
      // uploadToFtp returns matching URL like /uploads/products/filename.webp
      const publicUrl = await uploadToFtp(
        webpBuffer,
        newFileName,
        TARGET_FTP_FOLDER,
      );

      console.log(`Uploaded to: ${publicUrl}`);

      // Update Database
      door.imageUrl = publicUrl;
      door.category = CATEGORY; // Enforce category
      door.doorType = DOOR_TYPE; // Enforce doorType

      await door.save();
      console.log(`[SUCCESS] Database updated.`);
      successCount++;
    } catch (err) {
      console.error(`[ERROR] Failed to process ${file}:`, err);
      failCount++;
    }
  }

  console.log("\n--------------------------------------------------");
  console.log("Bulk Upload Summary");
  console.log("--------------------------------------------------");
  console.log(`Total Files Found: ${files.length}`);
  console.log(`Successfully Updated: ${successCount}`);
  console.log(`Skipped (No Match): ${skipCount}`);
  console.log(`Failed (Errors): ${failCount}`);
  console.log("--------------------------------------------------");

  process.exit(0);
}

main().catch((err) => {
  console.error("Fatal Error:", err);
  process.exit(1);
});
