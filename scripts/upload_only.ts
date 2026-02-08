import dotenv from "dotenv";
import path from "path";
import fs from "fs";

// Load environment variables
const result = dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});

// Configuration
const SOURCE_DIR = "C:\\Users\\nithi\\Downloads\\panel doors";
const TARGET_FTP_FOLDER = "products";
const REPORT_FILE = "uploaded_images_map.json";

async function main() {
  console.log("Starting Upload-Only Script...");

  try {
    // Dynamic imports
    console.log("Importing dependencies...");
    const { uploadToFtp } = await import("../lib/ftp");
    const sharp = (await import("sharp")).default;
    console.log("Dependencies imported.");

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
    const uploadMap: Record<string, string> = {};

    for (const file of files) {
      const originalName = path.parse(file).name;
      const searchName = originalName.trim();

      console.log(`\nProcessing: ${file}`);

      try {
        const filePath = path.join(SOURCE_DIR, file);
        const fileBuffer = fs.readFileSync(filePath);

        // Convert to WebP
        const webpBuffer = await sharp(fileBuffer)
          .webp({ quality: 80, effort: 4 })
          .toBuffer();

        const newFileName = `${searchName.replace(/[^a-zA-Z0-9.-]/g, "_")}.webp`;

        // Upload
        const publicUrl = await uploadToFtp(
          webpBuffer,
          newFileName,
          TARGET_FTP_FOLDER,
        );

        console.log(`Uploaded: ${publicUrl}`);

        // Save to map: "Original Name" -> "URL"
        uploadMap[originalName] = publicUrl;
        successCount++;
      } catch (err) {
        console.error(`[ERROR] Failed ${file}:`, err);
        failCount++;
      }
    }

    // Write Report
    fs.writeFileSync(REPORT_FILE, JSON.stringify(uploadMap, null, 2));
    console.log(`\nMap saved to ${REPORT_FILE}`);

    console.log("\n--------------------------------------------------");
    console.log(
      `Total: ${files.length} | Success: ${successCount} | Failed: ${failCount}`,
    );
    console.log("--------------------------------------------------");
  } catch (err) {
    console.error("Fatal Error:", err);
    process.exit(1);
  }
}

main();
