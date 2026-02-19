"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EditGalleryItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [itemId, setItemId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "" as "interior" | "exterior" | "",
    subCategory: "" as "Single" | "Double" | "Barn" | "Dutch" | "",
    hasGlass: false,
    imageUrl: "", // Single string
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Helper to resolve image URL - use NEXT_PUBLIC_URL so images load when stored as localhost or relative paths
  const resolveImageUrl = (url: string | undefined | null) => {
    if (!url || typeof url !== "string") return "/placeholder-image.jpg";
    if (url.startsWith("data:")) return url;
    const baseUrl =
      process.env.NEXT_PUBLIC_URL ||
      "https://navajowhite-ostrich-413154.hostingersite.com";
    const cleanBase = baseUrl.replace(/\/$/, "");
    // Rewrite localhost URLs to production base (images are on production server)
    if (url.includes("localhost")) {
      try {
        const parsed = new URL(url);
        return `${cleanBase}${parsed.pathname}`;
      } catch {
        return url;
      }
    }
    if (url.startsWith("http")) return url;
    if (url.startsWith("/")) return `${cleanBase}${url}`;
    const path = url.startsWith("/") ? url : `/${url}`;
    return `${cleanBase}${path}`;
  };

  useEffect(() => {
    params.then((resolvedParams) => {
      setItemId(resolvedParams.id);
    });
  }, [params]);

  const fetchGalleryItem = useCallback(async () => {
    if (!itemId) return;
    try {
      const response = await fetch(`/api/admin/doors/${itemId}`);
      const result = await response.json();

      if (result.success) {
        setFormData({
          name: result.data.name,
          category: result.data.category,
          subCategory: result.data.subCategory,
          hasGlass: result.data.hasGlass,
          imageUrl: result.data.imageUrl || "",
        });
      } else {
        alert(result.message || "Failed to fetch gallery item");
        router.push("/admin/dashboard/gallery");
      }
    } catch (error) {
      console.error("Error fetching gallery item:", error);
      alert("Error fetching gallery item");
      router.push("/admin/dashboard/gallery");
    } finally {
      setLoading(false);
    }
  }, [itemId, router]);

  useEffect(() => {
    fetchGalleryItem();
  }, [fetchGalleryItem]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          imageUrl: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      imageUrl: "",
    }));
    setSelectedFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.category || !formData.subCategory) {
      alert("Please fill in all required fields");
      return;
    }

    if (!selectedFile && !formData.imageUrl) {
      alert("Please select an image");
      return;
    }

    setSubmitting(true);

    try {
      let uploadedImageUrl = "";

      // 1. Upload new file if selected
      if (selectedFile) {
        const uploadFormData = new FormData();
        uploadFormData.append("folder", "gallery");
        uploadFormData.append("files", selectedFile);

        const token =
          typeof window !== "undefined"
            ? document.cookie
                .split("; ")
                .find((row) => row.startsWith("adminToken="))
                ?.split("=")[1]
            : null;

        const uploadResponse = await fetch("/api/upload/image", {
          method: "POST",
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: uploadFormData,
        });

        const uploadData = await uploadResponse.json();

        if (
          uploadData.success &&
          uploadData.data &&
          Array.isArray(uploadData.data) &&
          uploadData.data.length > 0
        ) {
          uploadedImageUrl = uploadData.data[0].url;
        } else {
          throw new Error(uploadData.message || "Failed to upload images");
        }
      } else {
        // Use existing URL
        // Filter out base64 previews from formData.imageUrl if they were not uploaded (shouldn't happen as we separate them)
        if (
          formData.imageUrl.startsWith("http") ||
          formData.imageUrl.startsWith("/")
        ) {
          uploadedImageUrl = formData.imageUrl;
        }
      }

      const galleryData = {
        name: formData.name,
        category: formData.category,
        subCategory: formData.subCategory,
        hasGlass: formData.hasGlass,
        imageUrl: uploadedImageUrl,
      };

      const response = await fetch(`/api/admin/doors/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(galleryData),
      });

      const result = await response.json();

      if (result.success) {
        alert("Gallery item updated successfully!");
        router.push("/admin/dashboard/gallery");
      } else {
        alert(result.message || "Failed to update gallery item");
      }
    } catch (error) {
      console.error("Error updating gallery item:", error);
      alert("Error updating gallery item");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 p-6 sm:p-8">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin/dashboard/gallery"
            className="text-zinc-400 hover:text-white"
          >
            &larr; Back to Gallery
          </Link>
          <h1 className="text-3xl font-bold text-white">Edit Gallery Item</h1>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Product Type (Category) */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Product Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as "interior" | "exterior" | "",
                  })
                }
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">-- Select Product Type --</option>
                <option value="interior">Interior</option>
                <option value="exterior">Exterior</option>
              </select>
            </div>

            {/* Sub Category */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Sub Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.subCategory}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    subCategory: e.target.value as
                      | "Single"
                      | "Double"
                      | "Barn"
                      | "Dutch"
                      | "",
                  })
                }
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">-- Select Sub Category --</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Barn">Barn</option>
                <option value="Dutch">Dutch</option>
              </select>
            </div>

            {/* With/Without Glass */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasGlass}
                  onChange={(e) =>
                    setFormData({ ...formData, hasGlass: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-zinc-700 bg-zinc-900 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-zinc-300">
                  With Glass
                </span>
              </label>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Image <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
              {formData.imageUrl && (
                <div className="mt-4 relative w-full sm:w-1/2">
                  <img
                    src={resolveImageUrl(formData.imageUrl)}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded border border-zinc-700"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Link
                href="/admin/dashboard/gallery"
                className="flex-1 px-4 py-3 bg-zinc-800 text-white text-center rounded-lg font-medium hover:bg-zinc-700 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Updating..." : "Update Gallery Item"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
