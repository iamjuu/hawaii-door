"use client";

import NextImage from "next/image";
import { useState } from "react";

type ProductFormProps = {
  productId?: string;
  initialData?: {
    name?: string;
    price?: string;
    imageUrl?: string[];
    type?: string;
    category?: string;
  };
  onComplete?: () => void;
  onCancel?: () => void;
};

export default function ProductForm({ productId, initialData, onComplete, onCancel }: ProductFormProps) {
  const isEdit = !!productId;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    price: initialData?.price || "",
    type: initialData?.type || "",
    category: initialData?.category || "",
    images: initialData?.imageUrl || [] as string[],
  });

  // Helper to convert base64 string to data URL if needed
  const normalizeImageUrl = (url: string): string => {
    if (!url) return "";
    if (url.startsWith("data:image")) return url;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `data:image/jpeg;base64,${url}`;
  };

  const [uploadedImages, setUploadedImages] = useState<string[]>(() => {
    const existing = initialData?.imageUrl || [];
    return existing.map(normalizeImageUrl);
  });


  // Helper function to compress and convert image to base64
  const compressImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            reject(new Error("Could not get canvas context"));
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error("Failed to create blob"));
                return;
              }

              const reader2 = new FileReader();
              reader2.onloadend = () => {
                const base64String = reader2.result as string;
                resolve(base64String);
              };
              reader2.onerror = () => reject(new Error("Failed to read blob"));
              reader2.readAsDataURL(blob);
            },
            "image/webp",
            0.8
          );
        };
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (file: File | null) => {
    if (!file) {
      setUploadedImages([]);
      setFormData({ ...formData, images: [] });
      return;
    }

    try {
      const base64String = await compressImageToBase64(file);
      setUploadedImages([base64String]);
      setFormData({ ...formData, images: [base64String] });
    } catch (error) {
      console.error("Error compressing image:", error);
      alert("Failed to process image. Please try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Validation
    if (!formData.type) {
      setError("Product type is required");
      setLoading(false);
      return;
    }

    if (!formData.category) {
      setError("Product category is required");
      setLoading(false);
      return;
    }

    if (!formData.price || Number.parseFloat(formData.price) <= 0) {
      setError("Valid price is required");
      setLoading(false);
      return;
    }

    if (formData.images.length === 0) {
      setError("At least one image is required");
      setLoading(false);
      return;
    }


    try {
      const url = isEdit 
        ? `/api/admin/products/${productId}`
        : `/api/admin/products`;
      
      const method = isEdit ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim() || undefined,
          price: formData.price,
          type: formData.type,
          category: formData.category,
          imageUrl: formData.images,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to save product");
      }

      setSuccess(isEdit ? "Product updated successfully!" : "Product created successfully!");
      
      setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-zinc-700 bg-zinc-800 p-6 shadow-sm">
      <div className="space-y-1">
        <label htmlFor="product-name" className="text-sm font-medium text-white">
          Product name
        </label>
        <input
          id="product-name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full rounded-md border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-white focus:outline-none"
          placeholder="Enter product name"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="product-type" className="text-sm font-medium text-white">
          Product Type <span className="text-red-500">*</span>
        </label>
        <select
          id="product-type"
          required
          value={formData.type}
          onChange={(e) => {
            setFormData({ ...formData, type: e.target.value, category: "" });
          }}
          className="w-full rounded-md border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-white focus:outline-none"
        >
          <option value="">Select product type</option>
          <option value="normal">Normal Door</option>
          <option value="glass">Glass Door</option>
        </select>
      </div>

      {formData.type && (
        <div className="space-y-1">
          <label htmlFor="product-category" className="text-sm font-medium text-white">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="product-category"
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full rounded-md border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-white focus:outline-none"
          >
            <option value="">Select category</option>
            {formData.type === "normal" && (
              <>
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="barn">Barn</option>
                <option value="dutch">Dutch</option>
              </>
            )}
            {formData.type === "glass" && (
              <>
                <option value="with-glass">With Glass</option>
                <option value="without-glass">Without Glass</option>
              </>
            )}
          </select>
        </div>
      )}

      <div className="space-y-1">
        <label htmlFor="product-price" className="text-sm font-medium text-white">
          Price (₹) <span className="text-red-500">*</span>
        </label>
        <input
          id="product-price"
          type="number"
          step="0.01"
          min="0"
          required
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="w-full rounded-md border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-white focus:outline-none"
          placeholder="2999.00"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-white">
          Product Image <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-zinc-400 mb-2">
          One image is required.
        </p>
        <div className="space-y-2">
          <input
            id="product-image-file"
            type="file"
            accept="image/*"
            className="w-full rounded-md border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-white focus:outline-none"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              handleImageUpload(file);
            }}
          />
          {uploadedImages[0] && (
            <div className="relative w-full h-32 max-w-[200px] rounded-md border border-zinc-600 overflow-hidden bg-zinc-900">
              <NextImage
                src={normalizeImageUrl(uploadedImages[0])}
                alt="Product Preview"
                width={200}
                height={128}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <button
                type="button"
                onClick={() => handleImageUpload(null)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 z-10"
                title="Remove image"
              >
                ×
              </button>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-900/50 border border-red-500 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-md bg-green-900/50 border border-green-500 px-3 py-2 text-sm text-green-200">
          {success}
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (isEdit ? "Updating..." : "Creating...") : isEdit ? "Update Product" : "Create Product"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center justify-center rounded-md border border-zinc-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

