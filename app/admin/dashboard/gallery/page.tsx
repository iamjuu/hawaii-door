"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface GalleryItem {
  _id: string;
  name: string;
  category: "interior" | "exterior";
  subCategory: "Single" | "Double" | "Barn" | "Dutch";
  hasGlass: boolean;
  imageUrl: string; // Single string
  createdAt: string;
  updatedAt: string;
}

export default function GalleryManagementPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    category: "" as "interior" | "exterior" | "",
    subCategory: "" as "Single" | "Double" | "Barn" | "Dutch" | "",
    hasGlass: false,
    imageUrl: "", // Single string
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Gallery items listing state
  const [viewTab, setViewTab] = useState<"interior" | "exterior">("interior");
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [interiorCount, setInteriorCount] = useState(0);
  const [exteriorCount, setExteriorCount] = useState(0);
  const itemsPerPage = 12;

  // Reset to page 1 when changing tabs
  useEffect(() => {
    setCurrentPage(1);
  }, [viewTab]);

  const fetchGalleryItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/admin/doors?category=${viewTab}&page=${currentPage}&limit=${itemsPerPage}`,
      );
      const result = await response.json();
      if (result.success) {
        setGalleryItems(result.data);
        setTotalPages(result.pagination.totalPages);
        setTotalItems(result.pagination.total);
      }
    } catch (error) {
      console.error("Error fetching gallery items:", error);
    } finally {
      setLoading(false);
    }
  }, [viewTab, currentPage, itemsPerPage]);

  // Fetch counts for both categories
  const fetchCategoryCounts = useCallback(async () => {
    try {
      const [interiorResponse, exteriorResponse] = await Promise.all([
        fetch(`/api/admin/doors?category=interior&limit=1`),
        fetch(`/api/admin/doors?category=exterior&limit=1`),
      ]);

      const interiorResult = await interiorResponse.json();
      const exteriorResult = await exteriorResponse.json();

      if (interiorResult.success) {
        setInteriorCount(interiorResult.pagination?.total || 0);
      }
      if (exteriorResult.success) {
        setExteriorCount(exteriorResult.pagination?.total || 0);
      }
    } catch (error) {
      console.error("Error fetching category counts:", error);
    }
  }, []);

  // Fetch category counts on mount and when items change
  useEffect(() => {
    fetchCategoryCounts();
  }, [fetchCategoryCounts, refreshTrigger]);

  // Fetch gallery items based on selected tab
  useEffect(() => {
    fetchGalleryItems();
  }, [fetchGalleryItems, refreshTrigger]);

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

  const handleDeleteItem = async (itemId: string) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;

    try {
      setDeletingItemId(itemId);
      const response = await fetch(`/api/admin/doors/${itemId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        setRefreshTrigger((prev) => prev + 1);
      } else {
        alert(result.message || "Failed to delete gallery item");
      }
    } catch (error) {
      console.error("Error deleting gallery item:", error);
      alert("Error deleting gallery item");
    } finally {
      setDeletingItemId(null);
    }
  };

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

    // Validate required fields
    if (!formData.name || !formData.category || !formData.subCategory) {
      alert("Please fill in all required fields");
      return;
    }

    // Validate image is required
    if (!selectedFile && !formData.imageUrl) {
      alert("Please select an image");
      return;
    }

    setSubmitting(true);

    try {
      // Upload images to S3 only when Create button is clicked
      let s3ImageUrl = "";

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
          s3ImageUrl = uploadData.data[0].url;
        } else {
          throw new Error(uploadData.message || "Failed to upload images");
        }
      } else {
        // Use existing URL if valid
        if (
          formData.imageUrl.startsWith("http") ||
          formData.imageUrl.startsWith("/")
        ) {
          s3ImageUrl = formData.imageUrl;
        }
      }

      const galleryData = {
        name: formData.name,
        category: formData.category,
        subCategory: formData.subCategory,
        hasGlass: formData.hasGlass,
        imageUrl: s3ImageUrl,
      };

      const response = await fetch("/api/admin/doors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(galleryData),
      });

      const result = await response.json();

      if (result.success) {
        // Reset form
        setFormData({
          name: "",
          category: "",
          subCategory: "",
          hasGlass: false,
          imageUrl: "",
        });
        setSelectedFile(null);
        setRefreshTrigger((prev) => prev + 1);
        alert("Gallery item created successfully!");
      } else {
        alert(result.message || "Failed to create gallery item");
      }
    } catch (error) {
      console.error("Error creating gallery item:", error);
      alert("Error creating gallery item");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 p-6 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-white mb-8">
          Gallery Management
        </h1>

        {/* Tabs for Interior/Exterior */}
        <div className="mb-6 border-b border-zinc-700">
          <div className="flex gap-4">
            <button
              onClick={() => setViewTab("interior")}
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                viewTab === "interior"
                  ? "border-white text-white"
                  : "border-transparent text-zinc-400 hover:text-zinc-300"
              }`}
            >
              Interior ({interiorCount})
            </button>
            <button
              onClick={() => setViewTab("exterior")}
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                viewTab === "exterior"
                  ? "border-white text-white"
                  : "border-transparent text-zinc-400 hover:text-zinc-300"
              }`}
            >
              Exterior ({exteriorCount})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Gallery Item Form */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-white mb-4">
                Add Gallery Item
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
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
                        category: e.target.value as
                          | "interior"
                          | "exterior"
                          | "",
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
                  {/* Preview */}
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

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Creating..." : "Add Gallery Item"}
                </button>
              </form>
            </div>
          </div>

          {/* Gallery Items List */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="text-zinc-400 text-center py-12">
                Loading gallery items...
              </div>
            ) : galleryItems.length === 0 ? (
              <div className="text-zinc-400 text-center py-12">
                No gallery items found
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {galleryItems.map((item) => (
                  <div
                    key={item._id}
                    className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-colors"
                  >
                    {/* Item Image */}
                    <div className="relative h-48 bg-zinc-900">
                      {item.imageUrl ? (
                        <img
                          src={resolveImageUrl(item.imageUrl)}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-600">
                          <div className="text-6xl">🖼️</div>
                        </div>
                      )}
                    </div>

                    {/* Item Info */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {item.name}
                      </h3>
                      <div className="space-y-1 text-sm text-zinc-400">
                        <p>
                          Type:{" "}
                          <span className="text-white capitalize">
                            {item.category}
                          </span>
                        </p>
                        <p>
                          Sub Category:{" "}
                          <span className="text-white">{item.subCategory}</span>
                        </p>
                        <p>
                          Glass:{" "}
                          <span className="text-white">
                            {item.hasGlass ? "With Glass" : "Without Glass"}
                          </span>
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="mt-4 flex gap-2">
                        <Link
                          href={`/admin/dashboard/gallery/${item._id}`}
                          className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors text-center"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteItem(item._id)}
                          disabled={deletingItemId === item._id}
                          className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors disabled:opacity-50"
                        >
                          {deletingItemId === item._id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-zinc-800 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-zinc-300">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-zinc-800 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
