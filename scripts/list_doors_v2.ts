import dotenv from "dotenv";
import path from "path";

const result = dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});

async function main() {
  console.log("Script starting...");
  try {
    console.log("Importing connectDB...");
    const { default: connectDB } = await import("../lib/mongodb");

    console.log("Connecting...");
    await connectDB();
    console.log("Connected.");

    console.log("Importing Door...");
    const { default: Door } = await import("../models/Door");
    console.log("Door Imported.");

    console.log("Finding doors...");
    const doors = await Door.find({}).limit(5);
    console.log(`Found ${doors.length} doors.`);

    doors.forEach((d) => console.log(`Name: ${d.name}`));
  } catch (err) {
    console.error("Error:", err);
  }
  process.exit(0);
}

main();
