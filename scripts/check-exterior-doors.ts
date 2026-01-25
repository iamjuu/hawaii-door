require("dotenv").config({ path: ".env.local" });

async function checkExteriorDoors() {
  try {
    // Import after dotenv loads
    const connectDB = (await import("../lib/mongodb")).default;
    const Gallery = (await import("../models/Gallery")).default;
    
    await connectDB();
    
    const doors = await Gallery.find({ category: "exterior" }).lean();
    
    console.log("\n📊 Exterior doors by doorType:\n");
    const grouped: Record<string, number> = {};
    doors.forEach((d: any) => {
      const type = d.doorType || "NO DOORTYPE";
      grouped[type] = (grouped[type] || 0) + 1;
    });
    
    Object.entries(grouped)
      .sort()
      .forEach(([type, count]) => {
        console.log(`  "${type}": ${count} doors`);
      });
    
    console.log(`\n✅ Total: ${doors.length} exterior doors\n`);
    
    // Check specifically for Contemporary Collection
    const contemporary = doors.filter((d: any) => 
      d.doorType && d.doorType.toLowerCase().includes("contemporary")
    );
    console.log(`🔍 Contemporary Collection doors: ${contemporary.length}`);
    if (contemporary.length > 0) {
      console.log("   Sample doorType values:");
      contemporary.slice(0, 3).forEach((d: any) => {
        console.log(`     - "${d.doorType}"`);
      });
    } else {
      console.log("   ⚠️  No Contemporary Collection doors found!");
      console.log("   Checking for similar names...");
      doors.forEach((d: any) => {
        if (d.doorType && d.doorType.toLowerCase().includes("contemp")) {
          console.log(`     Found: "${d.doorType}"`);
        }
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

checkExteriorDoors();
