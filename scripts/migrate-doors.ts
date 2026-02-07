import dotenv from "dotenv";
import path from "path";

// Load environment variables immediately
const result = dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});

async function migrate() {
  const { default: connectDB } = await import("../lib/mongodb");
  const { default: Door } = await import("../models/Door");

  await connectDB();
  console.log("Connected to MongoDB");

  console.log("Starting migration of Door images from [String] to String...");

  const doors = await Door.find({});
  let updatedCount = 0;

  for (const door of doors) {
    // Check if imageUrl is an array
    if (Array.isArray(door.imageUrl)) {
      const urlArray = door.imageUrl as unknown as string[];
      let newUrl = "";
      if (urlArray.length > 0) {
        newUrl = urlArray[0];
      }

      // Update the record
      await Door.updateOne({ _id: door._id }, { $set: { imageUrl: newUrl } });
      updatedCount++;
      if (updatedCount % 50 === 0) process.stdout.write(".");
    }
  }

  console.log(`\nMigration completed. Updated ${updatedCount} documents.`);
  process.exit(0);
}

migrate();
