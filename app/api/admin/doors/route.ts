import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Gallery from "@/models/Gallery";
import { requireAdmin } from "@/lib/auth";


// GET - Fetch all gallery items with pagination and filters
export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req);
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const skip = (page - 1) * limit;
    
    // Filters - Gallery model has category, subCategory, hasGlass
    const category = searchParams.get("category"); // "interior" or "exterior"
    const subCategory = searchParams.get("subCategory"); // "Single", "Double", "Barn", "Dutch"
    const hasGlass = searchParams.get("hasGlass"); // "true" or "false"
    
    // Build query
    const query: Record<string, unknown> = {};
    if (category) query.category = category;
    if (subCategory) query.subCategory = subCategory;
    if (hasGlass !== null && hasGlass !== undefined) {
      query.hasGlass = hasGlass === "true";
    }

    const [galleryItems, total] = await Promise.all([
      Gallery.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Gallery.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: galleryItems,
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

// POST - Create a new gallery item
export async function POST(req: NextRequest) {
  try {
    await requireAdmin(req);
    await connectDB();
    
    const body = await req.json();
    const { name, category, subCategory, hasGlass, imageUrl } = body;

    // Validation - Gallery model requires name, category, subCategory, hasGlass, imageUrl
    if (!name || !category || !subCategory || hasGlass === undefined || hasGlass === null) {
      return NextResponse.json(
        { success: false, message: "Name, category, subCategory, and hasGlass are required" },
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

    // Validate subCategory
    if (!["Single", "Double", "Barn", "Dutch"].includes(subCategory)) {
      return NextResponse.json(
        { success: false, message: "Invalid subCategory. Must be 'Single', 'Double', 'Barn', or 'Dutch'" },
        { status: 400 }
      );
    }

    // Validate imageUrl
    if (!Array.isArray(imageUrl) || imageUrl.length === 0) {
      return NextResponse.json(
        { success: false, message: "At least one image is required" },
        { status: 400 }
      );
    }

    // Prepare gallery data
    const galleryData = {
      name: String(name).trim(),
      category,
      subCategory,
      hasGlass: Boolean(hasGlass),
      imageUrl: imageUrl,
    };

    const galleryItem = await Gallery.create(galleryData);

    return NextResponse.json(
      { success: true, data: galleryItem, message: "Gallery item created successfully" },
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

// DELETE - Delete all gallery items (use with caution)
export async function DELETE(req: NextRequest) {
  try {
    await requireAdmin(req);
    await connectDB();
    
    const result = await Gallery.deleteMany({});
    
    return NextResponse.json({
      success: true,
      message: `Deleted ${result.deletedCount} gallery items`,
      data: { deletedCount: result.deletedCount }
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

