import { Schema, models, model } from "mongoose";
import type { Product as ProductType } from "@/types";

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

const DoorSchema = new Schema<ProductType>(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    category: { 
      type: String, 
      required: true, 
      enum: ["interior", "exterior"] 
    },
    doorType: { 
      type: String, 
      required: true,
      enum: [...interiorDoorTypes, ...exteriorDoorTypes]
    },
    material: { type: String, required: false },
    dimensions: { type: String, required: false },
    color: { type: String, required: false },
    inStock: { type: Boolean, required: false, default: true },
    imageUrl: { type: [String], required: true }, // Array of image URLs (S3 URLs)
  },
  { 
    timestamps: true,
    strict: true,
    strictQuery: true
  }
);

// Add index for better query performance
DoorSchema.index({ category: 1, doorType: 1 });
DoorSchema.index({ inStock: 1 });

// Delete the model from cache to ensure fresh schema
if (models.Door) {
  delete models.Door;
}
if (models.Doors) {
  delete models.Doors;
}

// Model name "Doors" will create MongoDB collection "doors"
export default model<ProductType>("Doors", DoorSchema);
