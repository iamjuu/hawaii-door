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
    
    // Filters - support multiple values
    const category = searchParams.get("category"); // "interior" or "exterior" (single value)
    const subCategories = searchParams.getAll("subCategory"); // Array: "Single", "Double", "Barn", "Dutch"
    const hasGlassValues = searchParams.getAll("hasGlass"); // Array: "true" or "false"

    // Build query
    const query: Record<string, unknown> = {};
    
    // Category filter (single value)
    if (category) {
      query.category = category;
    }
    
    // SubCategory filter (multiple values supported)
    if (subCategories.length > 0) {
      query.subCategory = { $in: subCategories };
    }
    
    // HasGlass filter (multiple values supported)
    if (hasGlassValues.length > 0) {
      const glassBooleans = hasGlassValues.map(v => v === "true");
      // If both true and false are selected, don't filter (show all)
      if (glassBooleans.includes(true) && glassBooleans.includes(false)) {
        // Don't add hasGlass filter - show all
      } else if (glassBooleans.includes(true)) {
        query.hasGlass = true;
      } else if (glassBooleans.includes(false)) {
        query.hasGlass = false;
      }
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
