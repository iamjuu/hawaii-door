import dotenv from "dotenv";
import path from "path";

// Load environment variables immediately
const result = dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});

async function debug() {
  const { default: connectDB } = await import("../lib/mongodb");
  const { default: Door } = await import("../models/Door");

  await connectDB();

  console.log("--- Debugging Interior Doors ---");

  // Count total interior doors
  const totalInterior = await Door.countDocuments({ category: "interior" });
  console.log(`Total doors with category='interior': ${totalInterior}`);

  // Group by doorType
  const byType = await Door.aggregate([
    { $match: { category: "interior" } },
    { $group: { _id: "$doorType", count: { $sum: 1 } } },
  ]);

  console.log("Counts by doorType:");
  byType.forEach((g) => console.log(`  "${g._id}": ${g.count}`));

  // Check specifically for "Interior Panel Doors"
  const panelDoors = await Door.find({
    doorType: "Interior Panel Doors",
  }).limit(5);
  console.log('\nSample "Interior Panel Doors":');
  panelDoors.forEach((d) => {
    console.log(
      `  Name: "${d.name}", Type: "${d.doorType}", Category: "${d.category}", Image: "${d.imageUrl}"`,
    );
  });

  process.exit(0);
}

debug();
