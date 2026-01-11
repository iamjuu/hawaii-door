import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Door from "@/models/Door";
import mongoose from "mongoose";

// GET - Fetch a single door by ID (public route)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
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
  } catch {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

