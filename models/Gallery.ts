import { Schema, models, model } from "mongoose";
import type { GalleryItem as GalleryItemType } from "@/types";

// Gallery model schema for gallery collection
const GallerySchema = new Schema<GalleryItemType>(
  {
    name: { type: String, required: true },
    category: { 
      type: String, 
      required: true, 
      enum: ["interior", "exterior"] // Product Type
    },
    subCategory: { 
      type: String, 
      required: true,
      enum: ["Single", "Double", "Barn", "Dutch"] // Main Category
    },
    hasGlass: { 
      type: Boolean, 
      required: true,
      default: false // With Glass (true) or Without Glass (false)
    },
    imageUrl: { type: [String], required: true, default: [] }, // Array of image URLs (S3 URLs)
  },
  { 
    timestamps: true,
    strict: true,
    strictQuery: true
  }
);

// Add indexes for better query performance
GallerySchema.index({ category: 1, subCategory: 1 });
GallerySchema.index({ hasGlass: 1 });

// Delete the model from cache to ensure fresh schema
if (models.Gallery) {
  delete models.Gallery;
}

// Model name "Gallery" will create MongoDB collection "gallery"
export default model<GalleryItemType>("Gallery", GallerySchema);
