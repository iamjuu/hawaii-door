import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Door from "@/models/Door";

// GET - Fetch all doors (public route with filters)
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const skip = (page - 1) * limit;
    
    // Optional filters
    const category = searchParams.get("category"); // "interior" or "exterior"
    const doorType = searchParams.get("doorType");
    const inStock = searchParams.get("inStock");
    const excludeImages = searchParams.get("excludeImages") === "true";
    
    // Build query
    const query: Record<string, unknown> = {};
    if (category) query.category = category;
    if (doorType) query.doorType = doorType;
    if (inStock !== null && inStock !== undefined) {
      query.inStock = inStock === "true";
    }

    const [doors, total] = await Promise.all([
      Door.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Door.countDocuments(query),
    ]);

    // If images are excluded, remove them to reduce payload size
    const doorsData = excludeImages
      ? doors.map(({ imageUrl, ...door }) => ({
          ...door,
          hasImage: Array.isArray(imageUrl) && imageUrl.length > 0,
        }))
      : doors;

    return NextResponse.json({
      success: true,
      data: doorsData,
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
    console.error("Error fetching doors:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : "Server error" 
      },
      { status: 500 }
    );
  }
}

