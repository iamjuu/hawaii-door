import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { requireAdmin } from "@/lib/auth";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    await requireAdmin(req);
    await connectDB();
    
    const { id } = await context.params;
    const body = await req.json();
    const { name, price, type, category, imageUrl } = body;

    // Validation
    if (imageUrl !== undefined && (!Array.isArray(imageUrl) || imageUrl.length === 0)) {
      return NextResponse.json(
        { success: false, message: "At least one image is required" },
        { status: 400 }
      );
    }

    // Validate type if provided
    if (type !== undefined && !["normal", "glass"].includes(type)) {
      return NextResponse.json(
        { success: false, message: "Invalid product type" },
        { status: 400 }
      );
    }

    // Validate category based on type if both provided
    if (type && category) {
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
    }

    const updateData: Record<string, unknown> = {};
    
    if (name !== undefined && name && String(name).trim()) {
      updateData.name = String(name).trim();
    }
    
    if (price !== undefined) {
      const priceInCents = Math.round(Number(price) * 100);
      if (isNaN(priceInCents) || priceInCents <= 0) {
        return NextResponse.json(
          { success: false, message: "Invalid price" },
          { status: 400 }
        );
      }
      updateData.price = priceInCents;
    }
    
    if (type !== undefined) updateData.type = type;
    if (category !== undefined) updateData.category = category;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;

    const updated = await Product.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (e: unknown) {
    const error = e as { message?: string };
    const status = error?.message === "FORBIDDEN" || error?.message === "UNAUTHORIZED" ? 403 : 500;
    return NextResponse.json(
      { success: false, message: error?.message || "Server error" },
      { status }
    );
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    await requireAdmin(req);
    await connectDB();
    
    const { id } = await context.params;
    const deleted = await Product.findByIdAndDelete(id);
    
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (e: unknown) {
    const error = e as { message?: string };
    const status = error?.message === "FORBIDDEN" || error?.message === "UNAUTHORIZED" ? 403 : 500;
    return NextResponse.json(
      { success: false, message: error?.message || "Server error" },
      { status }
    );
  }
}

