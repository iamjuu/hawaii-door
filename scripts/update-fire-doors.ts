require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

async function updateFireDoors() {
  try {
    console.log("🚀 Starting bulk image update for 20-Minute Fire Doors...\n");

    // Import after dotenv loads
    const connectDB = (await import("../lib/mongodb")).default;
    const Door = (await import("../models/Door")).default;

    await connectDB();

    // Path to the fire doors folder
    const fireDoorsFolder = "C:\\Users\\nithi\\Downloads\\20-Minute Fire Doors'";

    // Check if folder exists
    if (!fs.existsSync(fireDoorsFolder)) {
      console.error("❌ Error: 20-Minute Fire Doors folder not found at:", fireDoorsFolder);
      process.exit(1);
    }

    // Read all image files from the folder
    const files = fs.readdirSync(fireDoorsFolder);
    const imageFiles = files.filter((file: string) =>
      /\.(jpg|jpeg|png)$/i.test(file)
    );

    console.log(`📁 Found ${imageFiles.length} images in folder\n`);

    if (imageFiles.length === 0) {
      console.error("❌ No image files found in the folder");
      process.exit(1);
    }

    // Convert all images to webp and base64
    const imageDataArray: string[] = [];

    for (const file of imageFiles) {
      const filePath = path.join(fireDoorsFolder, file);
      console.log(`🔄 Processing: ${file}`);

      try {
        // Read and convert to WebP with optimization
        const webpBuffer = await sharp(filePath)
          .webp({ quality: 85 }) // Good quality, smaller size
          .toBuffer();

        // Convert to base64
        const base64String = `data:image/webp;base64,${webpBuffer.toString("base64")}`;
        imageDataArray.push(base64String);

        console.log(`   ✅ Converted to WebP (${(webpBuffer.length / 1024).toFixed(2)} KB)`);
      } catch (err) {
        console.error(`   ❌ Error processing ${file}:`, err);
      }
    }

    console.log(`\n✅ Successfully converted ${imageDataArray.length} images\n`);

    // Find all 20-Minute Fire Doors
    const fireDoors = await Door.find({
      category: "interior",
      doorType: "20-Minute Fire Doors",
    }).lean();

    console.log(`🔍 Found ${fireDoors.length} 20-Minute Fire Doors in database\n`);

    if (fireDoors.length === 0) {
      console.log("⚠️  No 20-Minute Fire Doors found in database");
      console.log("   Checking what door types exist...\n");

      // Check what door types exist
      const allInteriorDoors = await Door.find({ category: "interior" }).lean();
      const doorTypes = new Set(allInteriorDoors.map((d: any) => d.doorType));
      console.log("   Available interior door types:");
      Array.from(doorTypes).forEach((type) => console.log(`     - ${type}`));

      process.exit(0);
    }

    // Update each door with all the images
    let updatedCount = 0;
    for (const door of fireDoors) {
      try {
        await Door.updateOne(
          { _id: door._id },
          { $set: { imageUrl: imageDataArray } }
        );
        updatedCount++;
        console.log(`✅ Updated: ${door.name || door._id}`);
      } catch (err) {
        console.error(`❌ Error updating door ${door._id}:`, err);
      }
    }

    console.log(`\n🎉 Bulk update complete!`);
    console.log(`   Total doors updated: ${updatedCount}`);
    console.log(`   Images per door: ${imageDataArray.length}`);
    console.log(`   Total size per door: ${(imageDataArray.join("").length / 1024 / 1024).toFixed(2)} MB\n`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

updateFireDoors();
