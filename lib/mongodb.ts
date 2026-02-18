import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.join(process.env.HOME || "/home/u907461807", ".env.runtime") });

import mongoose from "mongoose";


// Connection validated inside connectDB

declare global {
  // eslint-disable-next-line no-var
  var mongooseConn:
    | { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
    | undefined;
}

let cached = global.mongooseConn;
if (!cached) {
  cached = global.mongooseConn = { conn: null, promise: null };
}

export default async function connectDB() {
  if (cached!.conn) return cached!.conn;

  const MONGODB_URI = process.env.MONGODB_URI?.trim();
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not set");
  }

  if (!cached!.promise) {
    cached!.promise = mongoose.connect(MONGODB_URI as string, {
      dbName: process.env.MONGODB_DB || undefined,
    });
  }
  cached!.conn = await cached!.promise;
  return cached!.conn;
}
