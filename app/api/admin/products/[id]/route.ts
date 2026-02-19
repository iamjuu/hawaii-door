import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Door from "@/models/Door";
import { requireAdmin } from "@/lib/auth";
import { deleteFile } from "@/lib/storage";

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
    const door = await Door.findById(id);

    if (!door) {
      return NextResponse.json(
        { success: false, message: "Door not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: door });
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

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    await requireAdmin(req);
    await connectDB();

    const { id } = await context.params;
    const body = await req.json();
    const {
      name,
      category,
      doorType,
      description,
      skuCode,
      imageUrl,
    } = body;

    // Get existing door item to check for old images
    const existingDoor = await Door.findById(id);
    if (!existingDoor) {
      return NextResponse.json(
        { success: false, message: "Door not found" },
        { status: 404 },
      );
    }

    // Validation
    if (imageUrl !== undefined && (typeof imageUrl !== "string" || !imageUrl)) {
      return NextResponse.json(
        { success: false, message: "Image cannot be empty" },
        { status: 400 },
      );
    }

    // If images are being updated, delete old image
    if (
      imageUrl !== undefined &&
      existingDoor.imageUrl &&
      existingDoor.imageUrl !== imageUrl
    ) {
      try {
        await deleteFile(existingDoor.imageUrl);
      } catch (error) {
        console.error(
          `Failed to delete old image: ${existingDoor.imageUrl}`,
          error,
        );
      }
    }

    // Validate category if provided
    if (
      category !== undefined &&
      !["interior", "exterior"].includes(category)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid category. Must be 'interior' or 'exterior'",
        },
        { status: 400 },
      );
    }

    // Validate doorType if provided
    if (doorType !== undefined) {
      const finalCategory = category || existingDoor.category;

      if (
        finalCategory === "interior" &&
        !interiorDoorTypes.includes(doorType)
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid door type for interior category",
          },
          { status: 400 },
        );
      }

      if (
        finalCategory === "exterior" &&
        !exteriorDoorTypes.includes(doorType)
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid door type for exterior category",
          },
          { status: 400 },
        );
      }
    }

    // If images are being updated, delete old images from S3/FTP/Local
    if (
      imageUrl !== undefined &&
      existingDoor.imageUrl &&
      Array.isArray(existingDoor.imageUrl)
    ) {
      const oldImages = existingDoor.imageUrl;
      const newImages = Array.isArray(imageUrl) ? imageUrl : [imageUrl];

      // Find images that are being removed
      const imagesToDelete = oldImages.filter(
        (oldImg: string) => !newImages.includes(oldImg),
      );

      // Delete removed images
      const deletePromises = imagesToDelete.map(
        async (imageUrlToDelete: string) => {
          try {
            await deleteFile(imageUrlToDelete);
          } catch (error) {
            console.error(
              `Failed to delete old image: ${imageUrlToDelete}`,
              error,
            );
            // Continue with update
          }
        },
      );
      await Promise.all(deletePromises);
    }

    const updateData: Record<string, unknown> = {};

    if (name !== undefined && name && String(name).trim()) {
      updateData.name = String(name).trim();
    }

    if (category !== undefined) updateData.category = category;
    if (doorType !== undefined) updateData.doorType = doorType;
    if (description !== undefined)
      updateData.description = description ? String(description).trim() : "";
    // Always include skuCode when present in body (even empty string)
    if (Object.prototype.hasOwnProperty.call(body, "skuCode")) {
      updateData.skuCode = body.skuCode ? String(body.skuCode).trim() : "";
    }
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;

    // Skip update if nothing to change
    if (Object.keys(updateData).length === 0) {
      const current = await Door.findById(id).lean();
      return NextResponse.json({ success: true, data: current });
    }

    // Use native MongoDB update to ensure skuCode persists (bypasses Mongoose strict/validation)
    const objectId = new mongoose.Types.ObjectId(id);
    const updateResult = await Door.collection.updateOne(
      { _id: objectId },
      { $set: updateData },
    );

    if (updateResult.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Door not found" },
        { status: 404 },
      );
    }

    const updated = await Door.findById(id).lean();
    return NextResponse.json({ success: true, data: updated });
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

export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    await requireAdmin(req);
    await connectDB();

    const { id } = await context.params;
    const door = await Door.findById(id);

    if (!door) {
      return NextResponse.json(
        { success: false, message: "Door not found" },
        { status: 404 },
      );
    }

    // Delete image before deleting the door item
    if (door.imageUrl) {
      try {
        console.log(`Deleting image: ${door.imageUrl}`);
        await deleteFile(door.imageUrl);
      } catch (error) {
        console.error(`Failed to delete image: ${door.imageUrl}`, error);
        // Continue with deletion
      }
    }

    // Delete the door item from database
    await Door.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
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
