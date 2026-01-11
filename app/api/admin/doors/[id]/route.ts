import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Door from "@/models/Door";
import { requireAdmin } from "@/lib/auth";
import mongoose from "mongoose";

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

// GET - Fetch a single door by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin(req);
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid door ID" },
        { status: 400 }
      );
    }

    const door = await Door.findById(id).lean();

    if (!door) {
      return NextResponse.json(
        { success: false, message: "Door not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: door,
    });
  } catch (e: unknown) {
    const error = e as { message?: string };
    const status = error?.message === "FORBIDDEN" || error?.message === "UNAUTHORIZED" ? 403 : 500;
    return NextResponse.json(
      { success: false, message: error?.message || "Server error" },
      { status }
    );
  }
}

// PUT - Update a door by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin(req);
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid door ID" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { 
      name, 
      description, 
      price, 
      category, 
      doorType, 
      material, 
      dimensions, 
      color, 
      inStock,
      imageUrl 
    } = body;

    // Find existing door
    const existingDoor = await Door.findById(id);
    if (!existingDoor) {
      return NextResponse.json(
        { success: false, message: "Door not found" },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: Record<string, unknown> = {};

    // Update name if provided
    if (name !== undefined) {
      if (!name || !String(name).trim()) {
        return NextResponse.json(
          { success: false, message: "Name cannot be empty" },
          { status: 400 }
        );
      }
      updateData.name = String(name).trim();
    }

    // Update price if provided
    if (price !== undefined) {
      const priceInCents = Math.round(Number(price) * 100);
      if (isNaN(priceInCents) || priceInCents <= 0) {
        return NextResponse.json(
          { success: false, message: "Invalid price. Must be a positive number" },
          { status: 400 }
        );
      }
      updateData.price = priceInCents;
    }

    // Update category if provided
    if (category !== undefined) {
      if (!["interior", "exterior"].includes(category)) {
        return NextResponse.json(
          { success: false, message: "Invalid category. Must be 'interior' or 'exterior'" },
          { status: 400 }
        );
      }
      updateData.category = category;
    }

    // Update doorType if provided
    if (doorType !== undefined) {
      const finalCategory = category || existingDoor.category;
      
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
      
      updateData.doorType = doorType;
    }

    // Update optional fields
    if (description !== undefined) {
      updateData.description = description ? String(description).trim() : "";
    }
    if (material !== undefined) {
      updateData.material = material ? String(material).trim() : "";
    }
    if (dimensions !== undefined) {
      updateData.dimensions = dimensions ? String(dimensions).trim() : "";
    }
    if (color !== undefined) {
      updateData.color = color ? String(color).trim() : "";
    }
    if (inStock !== undefined) {
      updateData.inStock = Boolean(inStock);
    }
    if (imageUrl !== undefined && Array.isArray(imageUrl)) {
      updateData.imageUrl = imageUrl;
    }

    const updatedDoor = await Door.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).lean();

    return NextResponse.json({
      success: true,
      data: updatedDoor,
      message: "Door updated successfully",
    });
  } catch (e: unknown) {
    const error = e as { message?: string };
    const status = error?.message === "FORBIDDEN" || error?.message === "UNAUTHORIZED" ? 403 : 500;
    return NextResponse.json(
      { success: false, message: error?.message || "Server error" },
      { status }
    );
  }
}

// DELETE - Delete a door by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin(req);
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid door ID" },
        { status: 400 }
      );
    }

    const door = await Door.findByIdAndDelete(id).lean();

    if (!door) {
      return NextResponse.json(
        { success: false, message: "Door not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Door deleted successfully",
      data: door,
    });
  } catch (e: unknown) {
    const error = e as { message?: string };
    const status = error?.message === "FORBIDDEN" || error?.message === "UNAUTHORIZED" ? 403 : 500;
    return NextResponse.json(
      { success: false, message: error?.message || "Server error" },
      { status }
    );
  }
}

