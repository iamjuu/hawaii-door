// Script to bulk upload gallery images from local folder to S3 and MongoDB
// Run this with: npx tsx scripts/bulk-upload-gallery.ts
// Make sure to set your .env.local file with AWS credentials and MongoDB URI

// Load environment variables from .env.local FIRST, before any other imports
require("dotenv").config({ path: require("path").resolve(process.cwd(), ".env.local") });

// Use dynamic imports to ensure dotenv loads first
async function runScript() {
  const { readdir, readFile } = await import("fs/promises");
  const { join } = await import("path");
  const connectDB = (await import("@/lib/mongodb")).default;
  const { uploadToS3 } = await import("@/lib/s3");
  const GalleryModel = (await import("@/models/Gallery")).default;

  // Configuration
  const IMAGE_FOLDER_PATH = "c:\\Users\\nithi\\Downloads\\exterior-dutch";
  const CATEGORY = "exterior";
  const SUB_CATEGORY = "Dutch";
  const HAS_GLASS = false;

  interface UploadResult {
    fileName: string;
    success: boolean;
    s3Url?: string;
    galleryId?: string;
    error?: string;
  }

  /**
   * Extract name from filename (remove extension and clean up)
   */
  function getNameFromFileName(fileName: string): string {
    // Remove extension
    const nameWithoutExt = fileName.replace(/\.[^/.]+$/, "");
    // Capitalize first letter and replace hyphens/underscores with spaces
    const cleaned = nameWithoutExt
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
    return cleaned;
  }

  /**
   * Upload a single image and create gallery entry
   */
  async function uploadImageAndCreateGalleryItem(
    filePath: string,
    fileName: string
  ): Promise<UploadResult> {
    try {
      console.log(`\n📤 Processing: ${fileName}`);

      // Read file
      const fileBuffer = await readFile(filePath);

      // Upload to S3 (will convert to WebP automatically)
      console.log(`   → Uploading to S3...`);
      const s3Url = await uploadToS3(
        fileBuffer,
        fileName,
        "image/png",
        true // convert to WebP
      );
      console.log(`   ✅ Uploaded to S3: ${s3Url}`);

      // Create gallery item name from filename
      const itemName = getNameFromFileName(fileName);

      // Create gallery entry in MongoDB
      console.log(`   → Creating gallery entry in MongoDB...`);
      const galleryItem = new GalleryModel({
        name: itemName,
        category: CATEGORY,
        subCategory: SUB_CATEGORY,
        hasGlass: HAS_GLASS,
        imageUrl: [s3Url],
      });

      const savedItem = await galleryItem.save();
      console.log(`   ✅ Created gallery item: ${savedItem._id} (${itemName})`);

      return {
        fileName,
        success: true,
        s3Url,
        galleryId: savedItem._id.toString(),
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error(`   ❌ Error processing ${fileName}:`, errorMessage);
      return {
        fileName,
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Main function
   */
  async function bulkUpload() {
    try {
      console.log("🚀 Starting bulk upload of gallery items...");
      console.log(`📁 Reading images from: ${IMAGE_FOLDER_PATH}`);
      console.log(`📋 Configuration:`);
      console.log(`   Category: ${CATEGORY}`);
      console.log(`   Sub Category: ${SUB_CATEGORY}`);
      console.log(`   Has Glass: ${HAS_GLASS}`);

      // Connect to MongoDB
      console.log("\n🔌 Connecting to MongoDB...");
      await connectDB();
      console.log("✅ Connected to MongoDB");

      // Read all files from the folder
      const files = await readdir(IMAGE_FOLDER_PATH);
      const imageFiles = files.filter(
        (file) =>
          file.toLowerCase().endsWith(".png") ||
          file.toLowerCase().endsWith(".jpg") ||
          file.toLowerCase().endsWith(".jpeg") ||
          file.toLowerCase().endsWith(".webp")
      );

      if (imageFiles.length === 0) {
        console.error("❌ No image files found in the specified folder!");
        process.exit(1);
      }

      console.log(`\n📊 Found ${imageFiles.length} image file(s) to upload\n`);

      // Process each image
      const results: UploadResult[] = [];
      for (const fileName of imageFiles) {
        const filePath = join(IMAGE_FOLDER_PATH, fileName);
        const result = await uploadImageAndCreateGalleryItem(filePath, fileName);
        results.push(result);

        // Small delay to avoid overwhelming S3
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      // Summary
      console.log("\n" + "=".repeat(60));
      console.log("📊 UPLOAD SUMMARY");
      console.log("=".repeat(60));

      const successful = results.filter((r) => r.success);
      const failed = results.filter((r) => !r.success);

      console.log(`\n✅ Successful: ${successful.length}/${results.length}`);
      successful.forEach((result) => {
        console.log(`   • ${result.fileName} → ${result.galleryId}`);
      });

      if (failed.length > 0) {
        console.log(`\n❌ Failed: ${failed.length}/${results.length}`);
        failed.forEach((result) => {
          console.log(`   • ${result.fileName}: ${result.error}`);
        });
      }

      console.log("\n✨ Bulk upload completed!");
    } catch (error) {
      console.error("\n❌ Fatal error:", error);
      process.exit(1);
    } finally {
      // Close MongoDB connection
      const mongoose = await import("mongoose");
      if (mongoose.default.connection.readyState === 1) {
        await mongoose.default.connection.close();
        console.log("\n🔌 MongoDB connection closed");
      }
    }
  }

  // Run the bulk upload
  await bulkUpload();
}

// Execute the script
runScript().catch((error) => {
  console.error("Failed to run script:", error);
  process.exit(1);
});
