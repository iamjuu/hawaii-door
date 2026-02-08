import dotenv from "dotenv";
import path from "path";

const result = dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});

async function main() {
  console.log("Starting Search Script...");
  try {
    const mongoose = (await import("mongoose")).default;
    const { default: Door } = await import("../models/Door");

    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined");
    }

    await mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGODB_DB,
    });
    console.log("Connected.");

    console.log("Searching for 'SD'...");
    const doors = await Door.find({
      name: { $regex: "SD", $options: "i" },
    }).limit(20);
    console.log(`Found ${doors.length} matches.`);

    doors.forEach((d) => console.log(`Name: "${d.name}"`));

    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

main();
