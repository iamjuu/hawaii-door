import mongoose, { Schema, models, model } from "mongoose";
import type { Product as ProductType } from "@/types";

const ProductSchema = new Schema<ProductType>(
  {
    name: { type: String, required: false },
    price: { type: Number, required: true },
    type: { type: String, required: true, enum: ["normal", "glass"] },
    category: { type: String, required: true },
    imageUrl: { type: [String], default: [] }, // Array of base64 image strings (only 1 allowed)
  },
  { 
    timestamps: true,
    strict: true // Only allow fields defined in schema
  }
);

export default (models.Product as mongoose.Model<ProductType>) || model<ProductType>("Product", ProductSchema);



