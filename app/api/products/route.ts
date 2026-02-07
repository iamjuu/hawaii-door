import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Door from "@/models/Door";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    // Cap limit at 100 to avoid memory issues on free MongoDB tier
    const requestedLimit = parseInt(searchParams.get("limit") || "20", 10);
    const limit = Math.min(requestedLimit, 100);
    const skip = (page - 1) * limit;
    const excludeImages = searchParams.get("excludeImages") === "true";
    const category = searchParams.get("category"); // "interior" or "exterior"
    const doorType = searchParams.get("doorType");

    // Build query
    const query: Record<string, unknown> = {};
    if (category) query.category = category;
    if (doorType) query.doorType = doorType;

    // Use _id for sorting instead of createdAt to avoid memory issues
    // _id contains timestamp and is automatically indexed
    // For large datasets with skip, we avoid skip when page=1 to reduce memory usage
    const queryBuilder = Door.find(query).sort({ _id: -1 }).limit(limit).lean();

    // Only apply skip if not the first page
    if (page > 1) {
      queryBuilder.skip(skip);
    }

    const [products, total] = await Promise.all([
      queryBuilder,
      Door.countDocuments(query),
    ]);

    // If images are excluded, remove them to reduce payload size (for better performance)
    const productsData = excludeImages
      ? products.map(({ imageUrl, ...product }) => ({
          ...product,
          hasImage: !!imageUrl,
        }))
      : products;

    return NextResponse.json({
      success: true,
      data: productsData,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });
  } catch (error: any) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Server error",
        error:
          process.env.NODE_ENV === "development"
            ? error?.toString()
            : undefined,
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin(req);
    await connectDB();
    const body = await req.json();
    const created = await Door.create(body);
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (e: any) {
    const status =
      e?.message === "FORBIDDEN" || e?.message === "UNAUTHORIZED" ? 403 : 500;
    return NextResponse.json(
      { success: false, message: e?.message || "Server error" },
      { status },
    );
  }
}
