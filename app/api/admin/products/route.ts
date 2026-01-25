import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Gallery from "@/models/Gallery";
import { requireAdmin } from "@/lib/auth";

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

// GET - Fetch all products (doors) with pagination and filters
export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req);
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const skip = (page - 1) * limit;
    
    // Optional filters
    const category = searchParams.get("category"); // "interior" or "exterior"
    const doorType = searchParams.get("doorType");
    const inStock = searchParams.get("inStock");
    
    // Build query
    const query: Record<string, unknown> = {};
    if (category) query.category = category;
    if (doorType) query.doorType = doorType;
    if (inStock !== null && inStock !== undefined) {
      query.inStock = inStock === "true";
    }

    const [products, total] = await Promise.all([
      Gallery.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Gallery.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
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

export async function POST(req: NextRequest) {
  try {
    await requireAdmin(req);
    await connectDB();
    
    const body = await req.json();
    const { name, category, doorType, description, material, dimensions, color, inStock, imageUrl } = body;

    // Validation - Gallery model requires name, category, doorType, and imageUrl
    if (!name || !category || !doorType) {
      return NextResponse.json(
        { success: false, message: "Name, category, and door type are required" },
        { status: 400 }
      );
    }

    // Validate category
    if (!["interior", "exterior"].includes(category)) {
      return NextResponse.json(
        { success: false, message: "Invalid category. Must be 'interior' or 'exterior'" },
        { status: 400 }
      );
    }

    // Validate doorType based on category
    if (category === "interior" && !interiorDoorTypes.includes(doorType)) {
      return NextResponse.json(
        { success: false, message: "Invalid door type for interior category" },
        { status: 400 }
      );
    }
    
    if (category === "exterior" && !exteriorDoorTypes.includes(doorType)) {
      return NextResponse.json(
        { success: false, message: "Invalid door type for exterior category" },
        { status: 400 }
      );
    }

    // Validate imageUrl is required
    if (!Array.isArray(imageUrl) || imageUrl.length === 0) {
      return NextResponse.json(
        { success: false, message: "At least one image is required" },
        { status: 400 }
      );
    }

    // Prepare gallery data (doors)
    const galleryData: Record<string, unknown> = {
      name: String(name).trim(),
      category,
      doorType,
      imageUrl: imageUrl,
    };

    // Add optional fields
    if (description) galleryData.description = String(description).trim();
    if (material) galleryData.material = String(material).trim();
    if (dimensions) galleryData.dimensions = String(dimensions).trim();
    if (color) galleryData.color = String(color).trim();
    if (inStock !== undefined) galleryData.inStock = Boolean(inStock);

    const gallery = await Gallery.create(galleryData);

    return NextResponse.json(
      { success: true, data: gallery, message: "Door created successfully" },
      { status: 201 }
    );
  } catch (e: unknown) {
    const error = e as { message?: string };
    const status = error?.message === "FORBIDDEN" || error?.message === "UNAUTHORIZED" ? 403 : 500;
    return NextResponse.json(
      { success: false, message: error?.message || "Server error" },
      { status }
    );
  }
}

