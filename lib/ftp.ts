import { Client } from "basic-ftp";
import stream from "stream";

// Constants moved inside functions to allow late env loading

/**
 * Upload a file to FTP server inside public_html/uploads or uploads/ depending on root
 * @param fileBuffer - File content
 * @param fileName - Target filename
 * @param folder - Subfolder inside uploads (e.g., 'products', 'gallery')
 * @returns Public URL of the uploaded file
 */
export async function uploadToFtp(
  fileBuffer: Buffer,
  fileName: string,
  folder: string = "",
): Promise<string> {
  const FTP_HOST = process.env.FTP_HOST || "91.108.107.63";
  const FTP_USER = process.env.FTP_USER || "";
  const FTP_PASSWORD = process.env.FTP_PASSWORD || "";
  const FTP_PORT = parseInt(process.env.FTP_PORT || "21", 10);
  const FTP_ROOT_FOLDER =
    process.env.FTP_ROOT_FOLDER !== undefined
      ? process.env.FTP_ROOT_FOLDER
      : "public_html";

  const client = new Client();
  // client.ftp.verbose = true; // Enable for debugging
  console.log("FTP Lib - Host:", FTP_HOST);
  console.log("FTP Lib - User:", FTP_USER ? "Set" : "Not Set");
  console.log("FTP Lib - Port:", FTP_PORT);

  try {
    await client.access({
      host: FTP_HOST,
      user: FTP_USER,
      password: FTP_PASSWORD,
      port: FTP_PORT,
      secure: false, // Explicitly false as standard FTP is port 21
    });

    const prefix = FTP_ROOT_FOLDER ? `${FTP_ROOT_FOLDER}/` : "";

    const targetPath = folder
      ? `${prefix}uploads/${folder}/${fileName}`
      : `${prefix}uploads/${fileName}`;

    // Ensure directory exists
    const dirPath = folder ? `${prefix}uploads/${folder}` : `${prefix}uploads`;

    await client.ensureDir(dirPath);

    // Upload from buffer
    const sourceStream = new stream.PassThrough();
    sourceStream.end(fileBuffer);

    await client.uploadFrom(sourceStream, fileName);

    // Construct public URL
    // Remove public_html/ from path for URL
    // URL: https://site.com/uploads/folder/file.jpg
    const urlPath = folder
      ? `uploads/${folder}/${fileName}`
      : `uploads/${fileName}`;

    return `/${urlPath}`;
  } catch (err) {
    console.error("FTP Upload Error:", err);
    throw new Error(
      `FTP Upload failed: ${err instanceof Error ? err.message : String(err)}`,
    );
  } finally {
    client.close();
  }
}

/**
 * Delete a file from FTP server
 * @param fileUrl - Full URL to delete
 */
export async function deleteFromFtp(fileUrl: string): Promise<void> {
  const FTP_HOST = process.env.FTP_HOST || "91.108.107.63";
  const FTP_USER = process.env.FTP_USER || "";
  const FTP_PASSWORD = process.env.FTP_PASSWORD || "";
  const FTP_PORT = parseInt(process.env.FTP_PORT || "21", 10);
  const FTP_ROOT_FOLDER =
    process.env.FTP_ROOT_FOLDER !== undefined
      ? process.env.FTP_ROOT_FOLDER
      : "public_html";

  if (!fileUrl) return;

  const client = new Client();

  try {
    // Extract path from URL
    // URL: https://site.com/uploads/folder/file.jpg
    // Path: public_html/uploads/folder/file.jpg

    let relativePath = "";
    try {
      const urlObj = new URL(fileUrl);
      relativePath = urlObj.pathname; // /uploads/folder/file.jpg
      if (relativePath.startsWith("/"))
        relativePath = relativePath.substring(1);
    } catch {
      // Fallback if not a valid URL
      // If it's already a path like 'uploads/...'
      relativePath = fileUrl;
    }

    // Remove leading slash if present
    if (relativePath.startsWith("/")) {
      relativePath = relativePath.substring(1);
    }

    // Ensure it's inside uploads
    if (!relativePath.includes("uploads/")) {
      console.warn(`Skipping deletion of non-upload path: ${relativePath}`);
      return;
    }

    const prefix = FTP_ROOT_FOLDER ? `${FTP_ROOT_FOLDER}/` : "";
    const targetPath = `${prefix}${relativePath}`;

    await client.access({
      host: FTP_HOST,
      user: FTP_USER,
      password: FTP_PASSWORD,
      port: FTP_PORT,
      secure: false,
    });

    await client.remove(targetPath);
    console.log(`Deleted from FTP: ${targetPath}`);
  } catch (err) {
    console.error(`FTP Delete Error (${fileUrl}):`, err);
    // Don't throw, just log
  } finally {
    client.close();
  }
}
