import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await requireAdmin(req);
    await connectDB();
    
    const body = await req.json();
    const { name, price, type, category, imageUrl } = body;

    // Validation
    if (!price || !type || !category) {
      return NextResponse.json(
        { success: false, message: "Price, type, and category are required" },
        { status: 400 }
      );
    }

    // Validate type
    if (!["normal", "glass"].includes(type)) {
      return NextResponse.json(
        { success: false, message: "Invalid product type" },
        { status: 400 }
      );
    }

    // Validate category based on type
    const normalCategories = ["single", "double", "barn", "dutch"];
    const glassCategories = ["with-glass", "without-glass"];
    
    if (type === "normal" && !normalCategories.includes(category)) {
      return NextResponse.json(
        { success: false, message: "Invalid category for normal door" },
        { status: 400 }
      );
    }
    
    if (type === "glass" && !glassCategories.includes(category)) {
      return NextResponse.json(
        { success: false, message: "Invalid category for glass door" },
        { status: 400 }
      );
    }

    if (!Array.isArray(imageUrl) || imageUrl.length === 0) {
      return NextResponse.json(
        { success: false, message: "At least one image is required" },
        { status: 400 }
      );
    }

    // Price should be in smallest currency unit (cents/paise)
    const priceInCents = Math.round(Number(price) * 100);
    if (isNaN(priceInCents) || priceInCents <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid price" },
        { status: 400 }
      );
    }

    const productData: Record<string, unknown> = {
      price: priceInCents,
      type: type,
      category: category,
      imageUrl: imageUrl,
    };
    
    if (name && String(name).trim()) {
      productData.name = String(name).trim();
    }

    const product = await Product.create(productData);

    return NextResponse.json(
      { success: true, data: product },
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

