import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import Door from "@/models/Door";
import { requireAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    await connectDB();
    const orders = await Order.find({ userId: user._id }).lean();
    return NextResponse.json({ success: true, data: orders });
  } catch (e: any) {
    const status = e?.message === "UNAUTHORIZED" ? 401 : 500;
    return NextResponse.json({ success: false, message: e?.message || "Server error" }, { status });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const { items } = (await req.json()) as {
      items: { productId: string; quantity: number }[];
    };
    if (!items?.length) return NextResponse.json({ success: false, message: "No items" }, { status: 400 });

    await connectDB();
    const dbProducts = await Door.find({ _id: { $in: items.map((i) => i.productId) } }).lean();
    const idToProduct = new Map(dbProducts.map((p) => [String(p._id), p]));

    // Note: Door model doesn't have price field. Using placeholder price of 0
    let amount = 0;
    const orderItems = items.map((i) => {
      const p = idToProduct.get(i.productId);
      if (!p) throw new Error("Product not found");
      const price = 0; // Placeholder - Door model doesn't have price field
      amount += price * i.quantity;
      return { productId: String(p._id), name: p.name, price, quantity: i.quantity };
    });

    const order = await Order.create({ userId: user._id, items: orderItems, amount, currency: "INR", status: "pending" });

    return NextResponse.json({ success: true, data: order }, { status: 201 });
  } catch (e: any) {
    const status = e?.message === "UNAUTHORIZED" ? 401 : 400;
    return NextResponse.json({ success: false, message: e?.message || "Bad request" }, { status });
  }
}



