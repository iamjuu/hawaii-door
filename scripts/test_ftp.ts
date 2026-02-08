import dotenv from "dotenv";
import path from "path";
import { uploadToFtp } from "../lib/ftp";

const result = dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});

console.log("FTP_HOST:", process.env.FTP_HOST);
console.log("FTP_USER:", process.env.FTP_USER);
console.log("FTP_PORT:", process.env.FTP_PORT);

async function main() {
  console.log("Starting FTP test...");
  try {
    const testBuffer = Buffer.from("Hello World");
    const fileName = "test_upload_bot.txt";
    const folder = "products";

    console.log("Uploading...");
    const url = await uploadToFtp(testBuffer, fileName, folder);
    console.log("Uploaded successfully to:", url);
  } catch (err) {
    console.error("FTP Error:", err);
  }
}

main();
