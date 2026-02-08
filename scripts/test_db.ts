import dotenv from "dotenv";
import path from "path";

const result = dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});

async function main() {
  console.log("Starting test_db...");
  try {
    const mongoose = (await import("mongoose")).default;
    mongoose.set("debug", true);

    const { default: connectDB } = await import("../lib/mongodb");
    console.log("Imported connectDB");
    await connectDB();
    console.log("Connected to DB");
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
