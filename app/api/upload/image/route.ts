import { NextRequest, NextResponse } from "next/server";
import { uploadToS3 } from "@/lib/s3";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await requireAdmin(req);

    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const file = formData.get("file") as File | null;
    const base64Data = formData.get("base64") as string | null;
    const base64Array = formData.getAll("base64Array") as string[];

    // Handle multiple files
    if (files.length > 0) {
      const uploadPromises = files.map(async (fileItem) => {
        const arrayBuffer = await fileItem.arrayBuffer();
        const fileBuffer = Buffer.from(arrayBuffer);
        const fileName = fileItem.name;
        const contentType = fileItem.type || "image/jpeg";

        // Validate file size (max 10MB)
        if (fileBuffer.length > 10 * 1024 * 1024) {
          throw new Error(`File ${fileName} exceeds 10MB limit`);
        }

        // Upload to S3 (converts to WebP automatically)
        const imageUrl = await uploadToS3(fileBuffer, fileName, contentType, true);
        return {
          url: imageUrl,
          fileName,
          size: fileBuffer.length,
        };
      });

      const results = await Promise.all(uploadPromises);
      return NextResponse.json({
        success: true,
        data: results,
      });
    }

    // Handle single file
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const fileBuffer = Buffer.from(arrayBuffer);
      const fileName = file.name;
      const contentType = file.type || "image/jpeg";

      // Validate file size (max 10MB)
      if (fileBuffer.length > 10 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, message: "File size exceeds 10MB limit" },
          { status: 400 }
        );
      }

      // Upload to S3 (converts to WebP automatically)
      const imageUrl = await uploadToS3(fileBuffer, fileName, contentType, true);

      return NextResponse.json({
        success: true,
        data: {
          url: imageUrl,
          fileName,
          size: fileBuffer.length,
        },
      });
    }

    // Handle multiple base64 images
    if (base64Array.length > 0) {
      const uploadPromises = base64Array.map(async (base64Item, index) => {
        let base64String = base64Item;
        let contentType = "image/jpeg";

        if (base64Item.includes(",")) {
          const parts = base64Item.split(",");
          const mimeMatch = parts[0].match(/data:([^;]+)/);
          contentType = mimeMatch ? mimeMatch[1] : "image/jpeg";
          base64String = parts[1];
        }

        const fileBuffer = Buffer.from(base64String, "base64");
        const fileName = `image-${Date.now()}-${index}.${contentType.split("/")[1] || "jpg"}`;

        // Validate file size (max 10MB)
        if (fileBuffer.length > 10 * 1024 * 1024) {
          throw new Error(`Image ${index + 1} exceeds 10MB limit`);
        }

        // Upload to S3 (converts to WebP automatically)
        const imageUrl = await uploadToS3(fileBuffer, fileName, contentType, true);
        return {
          url: imageUrl,
          fileName,
          size: fileBuffer.length,
        };
      });

      const results = await Promise.all(uploadPromises);
      return NextResponse.json({
        success: true,
        data: results,
      });
    }

    // Handle single base64
    if (base64Data) {
      let base64String = base64Data;
      let contentType = "image/jpeg";

      if (base64Data.includes(",")) {
        const parts = base64Data.split(",");
        const mimeMatch = parts[0].match(/data:([^;]+)/);
        contentType = mimeMatch ? mimeMatch[1] : "image/jpeg";
        base64String = parts[1];
      }

      const fileBuffer = Buffer.from(base64String, "base64");
      const fileName = `image-${Date.now()}.${contentType.split("/")[1] || "jpg"}`;

      // Validate file size (max 10MB)
      if (fileBuffer.length > 10 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, message: "File size exceeds 10MB limit" },
          { status: 400 }
        );
      }

      // Upload to S3 (converts to WebP automatically)
      const imageUrl = await uploadToS3(fileBuffer, fileName, contentType, true);

      return NextResponse.json({
        success: true,
        data: {
          url: imageUrl,
          fileName,
          size: fileBuffer.length,
        },
      });
    }

    return NextResponse.json(
      { success: false, message: "No file or base64 data provided" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Image upload error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const status = errorMessage.includes("FORBIDDEN") || errorMessage.includes("UNAUTHORIZED") ? 403 : 500;
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status }
    );
  }
}
