import dotenv from "dotenv";
import path from "path";
import fs from "fs";

const result = dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});

const SOURCE_DIR = "C:\\Users\\nithi\\Downloads\\panel doors";
const TARGET_FTP_FOLDER = "products";
const REPORT_FILE = "uploaded_images_map.json";

function loadMap() {
  if (fs.existsSync(REPORT_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(REPORT_FILE, "utf-8"));
    } catch (e) {
      console.error("Error reading map file, starting fresh.", e);
    }
  }
  return {};
}

function saveMap(map: Record<string, string>) {
  fs.writeFileSync(REPORT_FILE, JSON.stringify(map, null, 2));
}

async function main() {
  console.log("Starting Robust Upload Script...");

  try {
    const { uploadToFtp } = await import("../lib/ftp");
    const sharp = (await import("sharp")).default;

    if (!fs.existsSync(SOURCE_DIR)) {
      console.error(`Source directory not found: ${SOURCE_DIR}`);
      process.exit(1);
    }

    const files = fs.readdirSync(SOURCE_DIR).filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
    });

    console.log(`Found ${files.length} images.`);

    const uploadMap = loadMap();
    let successCount = 0;
    let skipCount = 0;

    for (const file of files) {
      const originalName = path.parse(file).name;

      if (uploadMap[originalName]) {
        console.log(`[SKIP] Already uploaded: ${file}`);
        skipCount++;
        continue;
      }

      const searchName = originalName.trim();
      console.log(`\nProcessing: ${file}`);

      try {
        const filePath = path.join(SOURCE_DIR, file);
        const fileBuffer = fs.readFileSync(filePath);

        const webpBuffer = await sharp(fileBuffer)
          .webp({ quality: 80, effort: 4 })
          .toBuffer();

        const newFileName = `${searchName.replace(/[^a-zA-Z0-9.-]/g, "_")}.webp`;

        const publicUrl = await uploadToFtp(
          webpBuffer,
          newFileName,
          TARGET_FTP_FOLDER,
        );

        console.log(`Uploaded: ${publicUrl}`);

        uploadMap[originalName] = publicUrl;
        saveMap(uploadMap); // Save after every success
        successCount++;
      } catch (err) {
        console.error(`[ERROR] Failed ${file}:`, err);
        // Don't exit, just continue to next file
      }
    }

    console.log("\n--------------------------------------------------");
    console.log(
      `Total: ${files.length} | Success: ${successCount} | Skipped: ${skipCount}`,
    );
    console.log(`Map saved to ${REPORT_FILE}`);
    console.log("--------------------------------------------------");
  } catch (err) {
    console.error("Fatal Error:", err);
    process.exit(1);
  }
}

main();
