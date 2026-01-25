import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import Door from "@/models/Door";
import { requireAuth } from "@/lib/auth";

// Instant buy - direct purchase without cart
export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const { productId, quantity = 1 } = (await req.json()) as {
      productId?: string;
      quantity?: number;
    };

    if (!productId || quantity <= 0) {
      return NextResponse.json({ success: false, message: "Invalid input" }, { status: 400 });
    }

    await connectDB();

    // Get product (door)
    const product = await Door.findById(productId).lean();
    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    // Note: Door model doesn't have price field. Using placeholder price of 0
    // This instant order feature may need to be updated for actual pricing
    const orderItems = [
      {
        productId: String(product._id),
        name: product.name,
        price: 0, // Placeholder - Door model doesn't have price field
        quantity,
      },
    ];

    const amount = 0 * quantity;

    const order = await Order.create({
      userId: user._id,
      items: orderItems,
      amount,
      currency: "INR",
      status: "pending",
    });

    return NextResponse.json({ success: true, data: order }, { status: 201 });
  } catch (e: any) {
    const status = e?.message === "UNAUTHORIZED" ? 401 : 500;
    return NextResponse.json({ success: false, message: e?.message || "Server error" }, { status });
  }
}



