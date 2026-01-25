require("dotenv").config({ path: ".env.local" });

async function checkInteriorDoors() {
  try {
    // Import after dotenv loads
    const connectDB = (await import("../lib/mongodb")).default;
    const Gallery = (await import("../models/Gallery")).default;
    
    await connectDB();
    
    const doors = await Gallery.find({ category: "interior" }).lean();
    
    console.log("\n📊 Interior doors by doorType:\n");
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
    
    console.log(`\n✅ Total: ${doors.length} interior doors\n`);
    
    // Check specifically for Interior Panel Doors
    const interiorPanel = doors.filter((d: any) => 
      d.doorType && d.doorType.toLowerCase().includes("interior panel")
    );
    console.log(`🔍 Interior Panel Doors: ${interiorPanel.length}`);
    if (interiorPanel.length > 0) {
      console.log("   Sample doorType values:");
      interiorPanel.slice(0, 3).forEach((d: any) => {
        console.log(`     - "${d.doorType}"`);
      });
    } else {
      console.log("   ⚠️  No Interior Panel Doors found!");
      console.log("   Checking for similar names...");
      doors.forEach((d: any) => {
        if (d.doorType && d.doorType.toLowerCase().includes("panel")) {
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

checkInteriorDoors();
