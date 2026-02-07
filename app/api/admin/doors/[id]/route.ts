import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Gallery from "@/models/Gallery";
import { requireAdmin } from "@/lib/auth";
import { deleteFile } from "@/lib/storage";
import mongoose from "mongoose";

// GET - Fetch a single gallery item by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin(req);
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid gallery item ID" },
        { status: 400 },
      );
    }

    const galleryItem = await Gallery.findById(id).lean();

    if (!galleryItem) {
      return NextResponse.json(
        { success: false, message: "Gallery item not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: galleryItem,
    });
  } catch (e: unknown) {
    const error = e as { message?: string };
    const status =
      error?.message === "FORBIDDEN" || error?.message === "UNAUTHORIZED"
        ? 403
        : 500;
    return NextResponse.json(
      { success: false, message: error?.message || "Server error" },
      { status },
    );
  }
}

// PUT - Update a gallery item by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin(req);
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid gallery item ID" },
        { status: 400 },
      );
    }

    const body = await req.json();
    const { name, category, subCategory, hasGlass, imageUrl } = body;

    // Find existing gallery item
    const existingItem = await Gallery.findById(id);
    if (!existingItem) {
      return NextResponse.json(
        { success: false, message: "Gallery item not found" },
        { status: 404 },
      );
    }

    // If images are being updated, delete old images from S3/FTP/Local
    if (imageUrl !== undefined && existingItem.imageUrl) {
      const oldImage = existingItem.imageUrl;
      const newImage = imageUrl;

      // If image changed, delete old one
      if (oldImage !== newImage && typeof oldImage === "string") {
        try {
          await deleteFile(oldImage);
        } catch (error) {
          console.error(`Failed to delete old image: ${oldImage}`, error);
          // Continue with update
        }
      }
    }

    // Prepare update data - Gallery model has: name, category, subCategory, hasGlass, imageUrl
    const updateData: Record<string, unknown> = {};

    // Update name if provided (required)
    if (name !== undefined) {
      updateData.name = String(name).trim();
    }

    // Update category if provided (required)
    if (category !== undefined) {
      if (!["interior", "exterior"].includes(category)) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid category. Must be 'interior' or 'exterior'",
          },
          { status: 400 },
        );
      }
      updateData.category = category;
    }

    // Update subCategory if provided (required)
    if (subCategory !== undefined) {
      if (!["Single", "Double", "Barn", "Dutch"].includes(subCategory)) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Invalid subCategory. Must be 'Single', 'Double', 'Barn', or 'Dutch'",
          },
          { status: 400 },
        );
      }
      updateData.subCategory = subCategory;
    }

    // Update hasGlass if provided (required)
    if (hasGlass !== undefined && hasGlass !== null) {
      updateData.hasGlass = Boolean(hasGlass);
    }

    // Update imageUrl if provided
    if (imageUrl !== undefined) {
      if (typeof imageUrl === "string") {
        updateData.imageUrl = imageUrl;
      } else {
        return NextResponse.json(
          { success: false, message: "imageUrl must be a string" },
          { status: 400 },
        );
      }
    }

    const updatedItem = await Gallery.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true },
    ).lean();

    return NextResponse.json({
      success: true,
      data: updatedItem,
      message: "Gallery item updated successfully",
    });
  } catch (e: unknown) {
    const error = e as { message?: string };
    const status =
      error?.message === "FORBIDDEN" || error?.message === "UNAUTHORIZED"
        ? 403
        : 500;
    return NextResponse.json(
      { success: false, message: error?.message || "Server error" },
      { status },
    );
  }
}

// DELETE - Delete a gallery item by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin(req);
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid gallery item ID" },
        { status: 400 },
      );
    }

    // Get gallery item before deleting to access image URLs
    const galleryItem = await Gallery.findById(id);

    if (!galleryItem) {
      return NextResponse.json(
        { success: false, message: "Gallery item not found" },
        { status: 404 },
      );
    }

    // Delete images before deleting the gallery item
    if (galleryItem.imageUrl && typeof galleryItem.imageUrl === "string") {
      try {
        console.log(`Deleting image: ${galleryItem.imageUrl}`);
        await deleteFile(galleryItem.imageUrl);
      } catch (error) {
        console.error(`Failed to delete image: ${galleryItem.imageUrl}`, error);
        // Continue with deletion
      }
    }

    // Delete the gallery item from database
    await Gallery.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Gallery item deleted successfully",
      data: galleryItem,
    });
  } catch (e: unknown) {
    const error = e as { message?: string };
    const status =
      error?.message === "FORBIDDEN" || error?.message === "UNAUTHORIZED"
        ? 403
        : 500;
    return NextResponse.json(
      { success: false, message: error?.message || "Server error" },
      { status },
    );
  }
}
