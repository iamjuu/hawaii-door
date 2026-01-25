import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Gallery from "@/models/Gallery";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "100", 10);
    const skip = (page - 1) * limit;
    
    // Filters
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
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
