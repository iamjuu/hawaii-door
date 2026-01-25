import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Gallery from "@/models/Gallery";
import { requireAdmin } from "@/lib/auth";
import { deleteFromS3 } from "@/lib/s3";

const interiorDoorTypes = [
  "Interior Panel Doors",
  "Bifold Doors",
  "Primed Interior Panel Doors",
  "Primed Bifold Doors",
  "Louver Doors and Bifold Doors",
  "Interior Barn Doors",
  "Interior French Doors",
  "Primed Interior French Doors",
  "20-Minute Fire Doors",
  "20-Minute Fire Doors Primed",
];

const exteriorDoorTypes = [
  "Contemporary Collection",
  "Craftsman Collection",
  "Exterior French Doors",
  "Waterbarrier",
  "Entry Doors",
  "Half Lite Doors",
  "Exterior Panel Doors",
];

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    await requireAdmin(req);
    await connectDB();
    
    const { id } = await context.params;
    const gallery = await Gallery.findById(id);
    
    if (!gallery) {
      return NextResponse.json(
        { success: false, message: "Door not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: gallery });
  } catch (e: unknown) {
    const error = e as { message?: string };
    const status = error?.message === "FORBIDDEN" || error?.message === "UNAUTHORIZED" ? 403 : 500;
    return NextResponse.json(
      { success: false, message: error?.message || "Server error" },
      { status }
    );
  }
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    await requireAdmin(req);
    await connectDB();
    
    const { id } = await context.params;
    const body = await req.json();
    const { name, category, doorType, description, material, dimensions, color, inStock, imageUrl } = body;

    // Get existing gallery item to check for old images
    const existingGallery = await Gallery.findById(id);
    if (!existingGallery) {
      return NextResponse.json(
        { success: false, message: "Door not found" },
        { status: 404 }
      );
    }

    // Validation
    if (imageUrl !== undefined && (!Array.isArray(imageUrl) || imageUrl.length === 0)) {
      return NextResponse.json(
        { success: false, message: "At least one image is required" },
        { status: 400 }
      );
    }

    // Validate category if provided
    if (category !== undefined && !["interior", "exterior"].includes(category)) {
      return NextResponse.json(
        { success: false, message: "Invalid category. Must be 'interior' or 'exterior'" },
        { status: 400 }
      );
    }

    // Validate doorType if provided
    if (doorType !== undefined) {
      const finalCategory = category || existingGallery.category;
      
      if (finalCategory === "interior" && !interiorDoorTypes.includes(doorType)) {
        return NextResponse.json(
          { success: false, message: "Invalid door type for interior category" },
          { status: 400 }
        );
      }
      
      if (finalCategory === "exterior" && !exteriorDoorTypes.includes(doorType)) {
        return NextResponse.json(
          { success: false, message: "Invalid door type for exterior category" },
          { status: 400 }
        );
      }
    }

    // If images are being updated, delete old images from S3
    if (imageUrl !== undefined && existingGallery.imageUrl && Array.isArray(existingGallery.imageUrl)) {
      const oldImages = existingGallery.imageUrl;
      const newImages = Array.isArray(imageUrl) ? imageUrl : [imageUrl];
      
      // Find images that are being removed
      const imagesToDelete = oldImages.filter((oldImg: string) => !newImages.includes(oldImg));
      
      // Delete removed images from S3
      const deletePromises = imagesToDelete.map(async (imageUrlToDelete: string) => {
        try {
          // Only delete if it's an S3 URL
          if (imageUrlToDelete && (imageUrlToDelete.includes("s3.amazonaws.com") || imageUrlToDelete.includes("s3."))) {
            await deleteFromS3(imageUrlToDelete);
          }
        } catch (error) {
          console.error(`Failed to delete old image from S3: ${imageUrlToDelete}`, error);
          // Continue with update even if S3 deletion fails
        }
      });
      await Promise.all(deletePromises);
    }

    const updateData: Record<string, unknown> = {};
    
    if (name !== undefined && name && String(name).trim()) {
      updateData.name = String(name).trim();
    }
    
    if (category !== undefined) updateData.category = category;
    if (doorType !== undefined) updateData.doorType = doorType;
    if (description !== undefined) updateData.description = description ? String(description).trim() : "";
    if (material !== undefined) updateData.material = material ? String(material).trim() : "";
    if (dimensions !== undefined) updateData.dimensions = dimensions ? String(dimensions).trim() : "";
    if (color !== undefined) updateData.color = color ? String(color).trim() : "";
    if (inStock !== undefined) updateData.inStock = Boolean(inStock);
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;

    const updated = await Gallery.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Door not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (e: unknown) {
    const error = e as { message?: string };
    const status = error?.message === "FORBIDDEN" || error?.message === "UNAUTHORIZED" ? 403 : 500;
    return NextResponse.json(
      { success: false, message: error?.message || "Server error" },
      { status }
    );
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    await requireAdmin(req);
    await connectDB();
    
    const { id } = await context.params;
    const gallery = await Gallery.findById(id);
    
    if (!gallery) {
      return NextResponse.json(
        { success: false, message: "Door not found" },
        { status: 404 }
      );
    }

    // Delete images from S3 before deleting the gallery item
    if (gallery.imageUrl && Array.isArray(gallery.imageUrl)) {
      console.log(`Deleting ${gallery.imageUrl.length} images from S3 for door ${id}`);
      const deletePromises = gallery.imageUrl.map(async (imageUrl: string) => {
        try {
          // Delete if it's an S3 URL or S3 key format
          if (imageUrl && (
            imageUrl.includes("s3.amazonaws.com") || 
            imageUrl.includes("s3.") || 
            imageUrl.startsWith("s3://") ||
            imageUrl.startsWith("uploads/") ||
            imageUrl.startsWith("/uploads/")
          )) {
            console.log(`Deleting image from S3: ${imageUrl}`);
            await deleteFromS3(imageUrl);
          } else {
            console.log(`Skipping non-S3 URL: ${imageUrl}`);
          }
        } catch (error) {
          console.error(`Failed to delete image from S3: ${imageUrl}`, error);
          // Continue with deletion even if S3 deletion fails
        }
      });
      await Promise.all(deletePromises);
      console.log(`Finished deleting images from S3 for door ${id}`);
    }

    // Delete the gallery item from database
    await Gallery.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (e: unknown) {
    const error = e as { message?: string };
    const status = error?.message === "FORBIDDEN" || error?.message === "UNAUTHORIZED" ? 403 : 500;
    return NextResponse.json(
      { success: false, message: error?.message || "Server error" },
      { status }
    );
  }
}

