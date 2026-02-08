import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const EXTERIOR_DOOR_TYPES = [
  "Contemporary Collection",
  "Craftsman Collection",
  "Exterior French Doors",
  "Waterbarrier",
  "Entry Doors",
  "Half Lite Doors",
  "Exterior Panel Doors",
];

async function main() {
  console.log("Verifying Exterior Door Records...");
  try {
    const mongoose = (await import("mongoose")).default;
    const { default: Door } = await import("../models/Door");

    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) throw new Error("No MONGODB_URI");

    await mongoose.connect(MONGODB_URI, { dbName: process.env.MONGODB_DB });
    console.log("Connected to MongoDB.\n");

    console.log("category | Door Type | Count | Sample Name");
    console.log("--- | --- | --- | ---");

    for (const type of EXTERIOR_DOOR_TYPES) {
      const count = await Door.countDocuments({
        category: "exterior",
        doorType: type,
      });
      const sample = await Door.findOne({
        category: "exterior",
        doorType: type,
      }).select("name");
      console.log(
        `exterior | ${type} | ${count} | ${sample ? sample.name : "N/A"}`,
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
