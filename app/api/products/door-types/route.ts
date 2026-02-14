import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Door from "@/models/Door";

/**
 * GET /api/products/door-types?category=interior|exterior
 * Returns distinct doorType values for the given category (for dropdown 1).
 */
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    if (!category || !["interior", "exterior"].includes(category)) {
      return NextResponse.json(
        { success: false, message: "category must be 'interior' or 'exterior'" },
        { status: 400 }
      );
    }

    const doorTypes = await Door.distinct("doorType", { category });
    return NextResponse.json({ success: true, data: doorTypes });
  } catch (error: unknown) {
    console.error("GET /api/products/door-types error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Server error",
      },
      { status: 500 }
    );
  }
}
