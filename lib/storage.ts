import { uploadToFtp, deleteFromFtp } from "./ftp";
import fs from "fs";
import path from "path";
import { mkdir } from "fs/promises";
import sharp from "sharp";

// Determine environment
// NEXT_PUBLIC_PRODUCTION=true -> Production Server (Use Local FS)
// NEXT_PUBLIC_PRODUCTION=false -> Dev/Local (Use FTP to Remote)
const IS_PRODUCTION = process.env.NEXT_PUBLIC_PRODUCTION === "true";
const PUBLIC_URL =
  process.env.NEXT_PUBLIC_URL ||
  "https://navajowhite-ostrich-413154.hostingersite.com/";

/**
 * Interface for storage operations
 */
interface StorageProvider {
  uploadFile(
    fileBuffer: Buffer,
    fileName: string,
    contentType: string,
    folder?: string,
  ): Promise<string>;
  deleteFile(fileUrl: string): Promise<void>;
}

/**
 * Local File System Provider (Used when running ON production server)
 */
const LocalStorage: StorageProvider = {
  async uploadFile(
    fileBuffer: Buffer,
    fileName: string,
    contentType: string,
    folder: string = "",
  ): Promise<string> {
    // Determine local path: public/uploads/folder/filename
    // If we're in Next.js, public folder is at root.
    const uploadBase = path.join(process.cwd(), "public", "uploads");
    const uploadDir = folder ? path.join(uploadBase, folder) : uploadBase;

    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);

    // Write file
    await fs.promises.writeFile(filePath, fileBuffer);

    // Construct URL
    // URL: https://site.com/uploads/folder/file.jpg
    const urlPath = folder
      ? `/uploads/${folder}/${fileName}`
      : `/uploads/${fileName}`;

    return urlPath;
  },

  async deleteFile(fileUrl: string): Promise<void> {
    try {
      let relativePath = "";
      try {
        const urlObj = new URL(fileUrl);
        // Pathname includes leading slash e.g. /uploads/image.jpg
        relativePath = urlObj.pathname;
      } catch {
        relativePath = fileUrl;
      }

      // Sanitize path to prevent traversal
      // We expect paths to start with /uploads/
      if (!relativePath.startsWith("/uploads/")) {
        // If it doesn't start with /uploads, it might be just the key or something else.
        console.warn(`Skipping deletion of non-upload path: ${relativePath}`);
        return;
      }

      // relativePath is like /uploads/folder/image.jpg
      // We want public/uploads/folder/image.jpg
      const filePath = path.join(process.cwd(), "public", relativePath);

      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
        console.log(`Deleted local file: ${filePath}`);
      } else {
        console.log(`File not found for deletion: ${filePath}`);
      }
    } catch (err) {
      console.error(`Local delete error: ${err}`);
    }
  },
};

/**
 * FTP Provider (Used when running LOCALLY and pushing to production)
 */
const FtpStorage: StorageProvider = {
  async uploadFile(
    fileBuffer: Buffer,
    fileName: string,
    contentType: string,
    folder: string = "",
  ): Promise<string> {
    return uploadToFtp(fileBuffer, fileName, folder);
  },

  async deleteFile(fileUrl: string): Promise<void> {
    return deleteFromFtp(fileUrl);
  },
};

const provider = IS_PRODUCTION ? LocalStorage : FtpStorage;

/**
 * Convert image to WebP format
 */
async function convertToWebP(
  fileBuffer: Buffer,
  quality: number = 85,
): Promise<Buffer> {
  return sharp(fileBuffer).webp({ quality, effort: 4 }).toBuffer();
}

/**
 * Upload a file to storage (FTP or Local)
 * Automatically converts images to WebP
 */
export async function uploadFile(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string,
  folder: string = "",
): Promise<string> {
  let bufferToUpload = fileBuffer;
  let fileNameToUpload = fileName;
  let contentTypeToUpload = contentType;

  // Convert to WebP if it's an image
  if (contentType.startsWith("image/")) {
    try {
      bufferToUpload = await convertToWebP(fileBuffer);
      contentTypeToUpload = "image/webp";
      // Change extension
      const nameWithoutExt = fileName.replace(/\.[^/.]+$/, "");
      fileNameToUpload = `${nameWithoutExt}.webp`;
    } catch (error) {
      console.error("WebP conversion failed, uploading original:", error);
    }
  }

  // Sanitize filename
  fileNameToUpload = fileNameToUpload.replace(/[^a-zA-Z0-9.-]/g, "_");
  // Add timestamp to ensure uniqueness
  const timestamp = Date.now();
  fileNameToUpload = `${timestamp}-${fileNameToUpload}`;

  return provider.uploadFile(
    bufferToUpload,
    fileNameToUpload,
    contentTypeToUpload,
    folder,
  );
}

export async function deleteFile(fileUrl: string): Promise<void> {
  return provider.deleteFile(fileUrl);
}
