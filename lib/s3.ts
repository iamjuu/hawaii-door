import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || "";

/**
 * Convert image to WebP format
 * @param fileBuffer - Image buffer
 * @param quality - WebP quality (1-100, default: 85)
 * @returns WebP buffer
 */
async function convertToWebP(fileBuffer: Buffer, quality: number = 85): Promise<Buffer> {
  return sharp(fileBuffer)
    .webp({ quality, effort: 4 })
    .toBuffer();
}

/**
 * Upload a file to S3 (converts to WebP if it's an image)
 * @param file - File buffer or base64 string
 * @param fileName - Name for the file in S3
 * @param contentType - MIME type of the file
 * @param convertToWebPFormat - Whether to convert image to WebP (default: true)
 * @returns URL of the uploaded file
 */
export async function uploadToS3(
  file: Buffer | string,
  fileName: string,
  contentType: string = "image/jpeg",
  convertToWebPFormat: boolean = true
): Promise<string> {
  if (!BUCKET_NAME) {
    throw new Error("AWS_S3_BUCKET_NAME is not set in environment variables");
  }

  // Convert base64 to buffer if needed
  let fileBuffer: Buffer;
  if (typeof file === "string") {
    // Remove data URL prefix if present
    const base64Data = file.includes(",") ? file.split(",")[1] : file;
    fileBuffer = Buffer.from(base64Data, "base64");
  } else {
    fileBuffer = file;
  }

  // Check if it's an image and convert to WebP if requested
  const isImage = contentType.startsWith("image/");
  let finalBuffer = fileBuffer;
  let finalContentType = contentType;
  let finalFileName = fileName;

  if (isImage && convertToWebPFormat) {
    try {
      finalBuffer = await convertToWebP(fileBuffer);
      finalContentType = "image/webp";
      // Change file extension to .webp
      const nameWithoutExt = fileName.replace(/\.[^/.]+$/, "");
      finalFileName = `${nameWithoutExt}.webp`;
    } catch (error) {
      console.error("Error converting to WebP, using original:", error);
      // If conversion fails, use original
    }
  }

  // Generate unique filename with timestamp
  const timestamp = Date.now();
  const sanitizedFileName = finalFileName.replace(/[^a-zA-Z0-9.-]/g, "_");
  const key = `uploads/${timestamp}-${sanitizedFileName}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: finalBuffer,
    ContentType: finalContentType,
    // ACL removed - bucket doesn't allow ACLs, use bucket policy instead
  });

  await s3Client.send(command);

  // Return the public URL
  const region = process.env.AWS_REGION || "us-east-1";
  return `https://${BUCKET_NAME}.s3.${region}.amazonaws.com/${key}`;
}

/**
 * Delete a file from S3
 * @param fileUrl - Full URL of the file to delete, or S3 key
 */
export async function deleteFromS3(fileUrl: string): Promise<void> {
  if (!BUCKET_NAME) {
    throw new Error("AWS_S3_BUCKET_NAME is not set in environment variables");
  }

  if (!fileUrl || typeof fileUrl !== "string") {
    console.error("Invalid file URL provided for deletion:", fileUrl);
    return;
  }

  try {
    let key: string;
    
    // Handle s3:// protocol format (s3://bucket/key)
    if (fileUrl.startsWith("s3://")) {
      const s3Path = fileUrl.replace("s3://", "");
      // Remove bucket name if present
      if (s3Path.startsWith(BUCKET_NAME + "/")) {
        key = s3Path.substring(BUCKET_NAME.length + 1);
      } else {
        key = s3Path;
      }
    }
    // Handle HTTPS URLs
    else if (fileUrl.startsWith("http://") || fileUrl.startsWith("https://")) {
      try {
        const url = new URL(fileUrl);
        let path = url.pathname;
        
        // Remove leading slash
        if (path.startsWith("/")) {
          path = path.substring(1);
        }
        
        // Handle virtual-hosted style: bucket.s3.region.amazonaws.com/key
        if (url.hostname.includes(`.s3.`) || url.hostname.includes(`.s3-`)) {
          // Path should be the key directly
          key = path;
        }
        // Handle path-style: s3.region.amazonaws.com/bucket/key
        else if (url.hostname.startsWith("s3.") || url.hostname.includes("s3.amazonaws.com")) {
          // Remove bucket name from path if present
          if (path.startsWith(BUCKET_NAME + "/")) {
            key = path.substring(BUCKET_NAME.length + 1);
          } else {
            key = path;
          }
        }
        // Fallback: use pathname
        else {
          key = path;
        }
      } catch (urlError) {
        console.error("Error parsing URL:", fileUrl, urlError);
        // Try to extract key from the string directly
        const match = fileUrl.match(/uploads\/[^\/]+$/);
        if (match) {
          key = match[0];
        } else {
          throw new Error(`Could not parse URL: ${fileUrl}`);
        }
      }
    }
    // Assume it's already a key (e.g., "uploads/filename.webp")
    else {
      key = fileUrl;
      // Remove leading slash if present
      if (key.startsWith("/")) {
        key = key.substring(1);
      }
    }

    // Clean up the key
    key = key.trim();
    
    if (!key || key === "") {
      console.error("Could not extract S3 key from URL:", fileUrl);
      return;
    }

    console.log(`Attempting to delete S3 object - Bucket: ${BUCKET_NAME}, Key: ${key}`);

    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    await s3Client.send(command);
    console.log(`Successfully deleted S3 object: ${key}`);
  } catch (error) {
    console.error(`Error deleting file from S3. URL: ${fileUrl}`, error);
    // Don't throw - allow deletion to continue even if S3 deletion fails
    // This prevents database deletion from failing if S3 is temporarily unavailable
  }
}

/**
 * Extract key from S3 URL
 */
export function getS3KeyFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.pathname.substring(1); // Remove leading slash
  } catch {
    // If URL parsing fails, assume it's already a key
    return url;
  }
}
