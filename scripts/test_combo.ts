import dotenv from "dotenv";
import path from "path";

const result = dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});

async function main() {
  console.log("Starting Combo Test...");
  try {
    console.log("Importing FTP...");
    const { uploadToFtp } = await import("../lib/ftp");
    console.log("FTP Imported.");

    console.log("Importing MongoDB...");
    const { default: connectDB } = await import("../lib/mongodb");
    console.log("MongoDB Imported.");

    console.log("Importing Sharp...");
    const sharp = (await import("sharp")).default;
    console.log("Sharp Imported.");

    console.log("Importing Door Model...");
    const { default: Door } = await import("../models/Door");
    console.log("Door Model Imported.");

    console.log("All imports successful.");
  } catch (err) {
    console.error("Combo Error:", err);
  }
}

main();
