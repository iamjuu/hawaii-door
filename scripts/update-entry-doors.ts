require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

async function updateEntryDoors() {
  try {
    console.log("🚀 Starting 1-to-1 image update for Entry Doors...\n");

    // Import after dotenv loads
    const connectDB = (await import("../lib/mongodb")).default;
    const Door = (await import("../models/Door")).default;

    await connectDB();

    // Path to the Entry Doors folder
    const entryDoorsFolder = "C:\\Users\\nithi\\Downloads\\Entry doors";

    // Check if folder exists
    if (!fs.existsSync(entryDoorsFolder)) {
      console.error("❌ Error: Entry Doors folder not found at:", entryDoorsFolder);
      process.exit(1);
    }

    // Read all image files from the folder
    const files = fs.readdirSync(entryDoorsFolder);
    const imageFiles = files.filter((file: string) =>
      /\.(jpg|jpeg|png)$/i.test(file)
    );

    console.log(`📁 Found ${imageFiles.length} images in folder\n`);

    if (imageFiles.length === 0) {
      console.error("❌ No image files found in the folder");
      process.exit(1);
    }

    let updatedCount = 0;
    let notFoundCount = 0;
    const notFoundDoors: string[] = [];

    // Process each image file individually
    for (const file of imageFiles) {
      const filePath = path.join(entryDoorsFolder, file);
      
      // Extract door name from filename
      // Example: "SD_6424-ED-Fir.jpg" → "SD 6424 ED Fir"
      const doorName = file
        .replace(/\.(jpg|jpeg|png)$/i, '') // Remove extension
        .replace(/^SD_/, 'SD ') // Replace SD_ with SD space
        .replace(/_/g, ' ') // Replace underscores with spaces
        .replace(/-/g, ' ') // Replace hyphens with spaces
        .replace(/\s+/g, ' ') // Normalize multiple spaces to single space
        .replace(/\s*Sidelite.*$/, '') // Remove "Sidelite-43x250" type suffixes
        .trim();

      console.log(`\n🔄 Processing: ${file}`);
      console.log(`   Looking for door: "${doorName}"`);

      try {
        // Find the matching door in MongoDB
        const door = await Door.findOne({
          category: "exterior",
          doorType: "Entry Doors",
          name: doorName
        });

        if (!door) {
          console.log(`   ⚠️  Door not found in database!`);
          notFoundCount++;
          notFoundDoors.push(doorName);
          continue;
        }

        // Convert image to WebP and base64
        const webpBuffer = await sharp(filePath)
          .webp({ quality: 85 })
          .toBuffer();

        const base64String = `data:image/webp;base64,${webpBuffer.toString("base64")}`;
        const sizeKB = (webpBuffer.length / 1024).toFixed(2);

        console.log(`   ✅ Converted to WebP (${sizeKB} KB)`);

        // Update the door with this ONE image - REPLACES entire imageUrl array
        await Door.updateOne(
          { _id: door._id },
          { $set: { imageUrl: [base64String] } } // Array with single image
        );

        updatedCount++;
        console.log(`   ✅ Updated door: ${door.name}`);

      } catch (err) {
        console.error(`   ❌ Error processing ${file}:`, err);
      }
    }

    console.log(`\n==========================================`);
    console.log(`🎉 Update complete!`);
    console.log(`   ✅ Doors updated: ${updatedCount}`);
    console.log(`   ⚠️  Doors not found: ${notFoundCount}`);
    
    if (notFoundDoors.length > 0) {
      console.log(`\n   Doors not found in database:`);
      notFoundDoors.forEach(name => console.log(`     - "${name}"`));
    }
    
    console.log(`\n⚠️  NOTE: Each door now has ONLY 1 image (its matching image)!`);
    console.log(`==========================================\n`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

updateEntryDoors();
