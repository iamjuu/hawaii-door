import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const DOOR_TYPES = [
  "Bifold Doors",
  "Primed Interior Panel Doors",
  "Primed Bifold Doors",
  "Louver Doors and Bifold Doors",
  "Interior Barn Doors",
  "Interior French Doors",
  "Primed Interior French Doors",
  "20-Minute Fire Doors",
  "20-Minute Fire Doors Primed",
];

async function main() {
  console.log("Verifying Database Records...");
  try {
    const mongoose = (await import("mongoose")).default;
    const { default: Door } = await import("../models/Door");

    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) throw new Error("No MONGODB_URI");

    await mongoose.connect(MONGODB_URI, { dbName: process.env.MONGODB_DB });
    console.log("Connected to MongoDB.\n");

    console.log("category | Door Type | Count | Sample Name");
    console.log("--- | --- | --- | ---");

    for (const type of DOOR_TYPES) {
      const count = await Door.countDocuments({
        category: "interior",
        doorType: type,
      });
      const sample = await Door.findOne({
        category: "interior",
        doorType: type,
      }).select("name");
      console.log(
        `interior | ${type} | ${count} | ${sample ? sample.name : "N/A"}`,
      );
    }

    console.log("\nVerification Complete.");
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

main();
