import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Door from "@/models/Door";

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

export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET - Fetch all products (doors) - public route with filters
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

    // Build query - match admin API category logic for consistency
    const query: Record<string, unknown> = {};
    if (category) {
      if (category === "interior") {
        query.$or = [
          { category: "interior" },
          {
            category: { $exists: false },
            doorType: { $in: interiorDoorTypes },
          },
          { category: "", doorType: { $in: interiorDoorTypes } },
        ];
      } else if (category === "exterior") {
        query.$or = [
          { category: "exterior" },
          {
            category: { $exists: false },
            doorType: { $in: exteriorDoorTypes },
          },
          { category: "", doorType: { $in: exteriorDoorTypes } },
        ];
      } else {
        query.category = category;
      }
    }
    if (doorType) query.doorType = doorType;
    if (inStock !== null && inStock !== undefined) {
      query.inStock = inStock === "true";
    }

    const [products, total] = await Promise.all([
      Door.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Door.countDocuments(query),
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
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Server error",
      },
      { status: 500 }
    );
  }
}
