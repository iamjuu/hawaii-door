require("dotenv").config({ path: ".env.local" });

async function checkDoorDocument() {
  try {
    console.log("🔍 Fetching document for: SD 7409 Shaker Sticking Clear Fir\n");

    // Import after dotenv loads
    const connectDB = (await import("../lib/mongodb")).default;
    const Door = (await import("../models/Door")).default;

    await connectDB();

    // Find the specific door
    const door = await Door.findOne({
      name: "SD 7409 Shaker Sticking Clear Fir"
    }).lean();

    if (!door) {
      console.log("❌ Door not found!");
      process.exit(1);
    }

    console.log("✅ Door found! Here's the complete document:\n");
    console.log("==========================================");
    console.log("_id:", door._id);
    console.log("name:", door.name);
    console.log("category:", door.category);
    console.log("doorType:", door.doorType);
    console.log("description:", door.description || "N/A");
    console.log("material:", door.material || "N/A");
    console.log("dimensions:", door.dimensions || "N/A");
    console.log("color:", door.color || "N/A");
    console.log("inStock:", door.inStock);
    console.log("createdAt:", door.createdAt);
    console.log("updatedAt:", door.updatedAt);
    console.log("\nimageUrl array length:", door.imageUrl?.length || 0);
    
    if (door.imageUrl && door.imageUrl.length > 0) {
      console.log("\n📸 Images in imageUrl array:");
      door.imageUrl.forEach((url: string, index: number) => {
        const preview = url.substring(0, 100);
        const size = (url.length / 1024).toFixed(2);
        console.log(`\n  [${index + 1}] Size: ${size} KB`);
        console.log(`      Preview: ${preview}...`);
        console.log(`      Format: ${url.startsWith('data:image/webp') ? '✅ WebP base64' : '❌ Not WebP'}`);
      });
      
      // Total size
      const totalSize = door.imageUrl.reduce((sum: number, url: string) => sum + url.length, 0);
      console.log(`\n📊 Total size of all images: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
    } else {
      console.log("\n⚠️  No images found in imageUrl array!");
    }
    
    console.log("\n==========================================");
    console.log("\n✅ Document check complete!\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

checkDoorDocument();
