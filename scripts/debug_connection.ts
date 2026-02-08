import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

const result = dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});

console.log("Env loaded:", result.parsed ? "Yes" : "No");
const uri = process.env.MONGODB_URI;
console.log("URI defined:", !!uri);
if (uri) {
  console.log("URI starts with:", uri.substring(0, 15) + "...");
}

async function run() {
  console.log("Attempting to connect...");

  mongoose.connection.on("connected", () => console.log("Mongoose connected"));
  mongoose.connection.on("error", (err) =>
    console.error("Mongoose connection error:", err),
  );
  mongoose.connection.on("disconnected", () =>
    console.log("Mongoose disconnected"),
  );

  try {
    await mongoose.connect(uri!, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s
      socketTimeoutMS: 45000,
    });
    console.log("Connected successfully!");

    // List collections
    const collections = await mongoose.connection.db
      ?.listCollections()
      .toArray();
    console.log(
      "Collections:",
      collections?.map((c) => c.name),
    );

    await mongoose.disconnect();
    console.log("Done.");
  } catch (err) {
    console.error("Connection failed:", err);
  }
}

run();
