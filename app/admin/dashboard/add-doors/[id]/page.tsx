"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

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

interface Door {
  _id: string;
  name: string;
  category: "interior" | "exterior";
  doorType: string;
  imageUrl: string;
  description?: string;
  skuCode?: string;
  createdAt: string;
  updatedAt: string;
}

export default function DoorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const doorId = params.id as string;

  const [door, setDoor] = useState<Door | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "" as "interior" | "exterior" | "",
    doorType: "",
    description: "",
    skuCode: "",
    imageUrl: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState("");

  const doorTypes =
    formData.category === "interior"
      ? interiorDoorTypes
      : formData.category === "exterior"
        ? exteriorDoorTypes
        : [];

  // Fetch door details
  useEffect(() => {
    const fetchDoor = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/admin/products/${doorId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch door: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          throw new Error(`Invalid response format: ${text.substring(0, 100)}`);
        }

        const result = await response.json();

        if (result.success) {
          const doorData = result.data;
          setDoor(doorData);
          const imageUrl = doorData.imageUrl || "";
          setOriginalImageUrl(imageUrl);

          // Infer category if missing
          let category = doorData.category;
          if (!category && doorData.doorType) {
            if (interiorDoorTypes.includes(doorData.doorType)) {
              category = "interior";
            } else if (exteriorDoorTypes.includes(doorData.doorType)) {
              category = "exterior";
            }
          }

          setFormData({
            name: doorData.name || "",
            category: category || "",
            doorType: doorData.doorType || "",
            description: doorData.description || "",
            skuCode: doorData.skuCode || "",
            imageUrl: imageUrl,
          });
        } else {
          setError(result.message || "Failed to fetch door details");
        }
      } catch (error) {
        console.error("Error fetching door:", error);
        setError(
          error instanceof Error
            ? error.message
            : "An error occurred while fetching door details",
        );
      } finally {
        setLoading(false);
      }
    };

    if (doorId) {
      fetchDoor();
    }
  }, [doorId]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
            ? value
            : value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Create preview URL for immediate display (base64)
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          imageUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);

      // Store File object for later upload
      setSelectedFile(file);
    } catch (error) {
      console.error("Error creating image preview:", error);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      imageUrl: "",
    }));
    setSelectedFile(null);
  };

  const handleSave = async () => {
    setError(null);
    setSuccess(null);

    if (!formData.name.trim()) {
      setError("Door name is required");
      return;
    }

    if (!formData.category) {
      setError("Category is required");
      return;
    }

    if (!formData.doorType) {
      setError("Door type is required");
      return;
    }

    if (!formData.imageUrl) {
      setError("Image is required");
      return;
    }

    try {
      setSaving(true);

      // Upload new image to FTP/S3 only when Save button is clicked
      let finalImageUrl = "";

      // Check if it's a new file (base64) or existing URL
      if (selectedFile) {
        const uploadFormData = new FormData();
        uploadFormData.append("file", selectedFile);
        uploadFormData.append("folder", "products");

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

        if (uploadData.success && uploadData.data && uploadData.data.url) {
          finalImageUrl = uploadData.data.url;
        } else {
          throw new Error(uploadData.message || "Failed to upload image");
        }
      } else {
        // No new file, use existing URL
        finalImageUrl = formData.imageUrl;
      }

      const updateData = {
        name: formData.name,
        category: formData.category,
        doorType: formData.doorType,
        description: formData.description,
        skuCode: formData.skuCode?.trim() ?? "",
        imageUrl: finalImageUrl,
      };

      const response = await fetch(`/api/admin/products/${doorId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess("Door updated successfully!");
        setIsEditing(false);
        setSelectedFile(null);
        // Refresh door data
        const refreshResponse = await fetch(`/api/admin/products/${doorId}`);
        const refreshResult = await refreshResponse.json();
        if (refreshResult.success) {
          setDoor(refreshResult.data);
          const imageUrl = refreshResult.data.imageUrl || "";
          setOriginalImageUrl(imageUrl);
          // Update formData with refreshed data
          setFormData({
            name: refreshResult.data.name || "",
            category: refreshResult.data.category || "",
            doorType: refreshResult.data.doorType || "",
            description: refreshResult.data.description || "",
            skuCode: refreshResult.data.skuCode || "",
            imageUrl: imageUrl,
          });
        }
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(result.message || "Failed to update door");
      }
    } catch (error) {
      console.error("Error updating door:", error);
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while updating the door",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this door? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      setDeleting(true);
      const response = await fetch(`/api/admin/products/${doorId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        router.push("/admin/dashboard/add-doors");
      }
    } catch (error) {
      console.error("Error deleting door:", error);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 sm:p-8 bg-zinc-900 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && !door) {
    return (
      <div className="p-6 sm:p-8 bg-zinc-900 min-h-screen">
        <div className="bg-zinc-950 border border-red-800 rounded-lg p-12 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Error loading door
          </h3>
          <p className="text-red-400 mb-6">{error}</p>
          <Link
            href="/admin/dashboard/add-doors"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Doors
          </Link>
        </div>
      </div>
    );
  }

  if (!door) {
    return (
      <div className="p-6 sm:p-8 bg-zinc-900 min-h-screen">
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-12 text-center">
          <div className="text-6xl mb-4">🚪</div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Door not found
          </h3>
          <p className="text-zinc-400 mb-6">
            The door you're looking for doesn't exist.
          </p>
          <Link
            href="/admin/dashboard/add-doors"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Doors
          </Link>
        </div>
      </div>
    );
  }

  const resolveImageUrl = (url: any) => {
    if (!url || typeof url !== "string") return "";
    if (url.startsWith("http") || url.startsWith("data:")) return url;
    if (url.startsWith("/")) {
      const baseUrl =
        process.env.NEXT_PUBLIC_URL ||
        "https://navajowhite-ostrich-413154.hostingersite.com";
      return `${baseUrl.replace(/\/$/, "")}${url}`;
    }
    return url;
  };

  return (
    <div className="p-6 sm:p-8 bg-zinc-900 min-h-screen">
      <div className="w-full mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Link
              href="/admin/dashboard/add-doors"
              className="text-blue-400 hover:text-blue-300 mb-2 inline-block text-sm"
            >
              ← Back to Doors
            </Link>
            <h1 className="text-3xl font-bold text-white">
              {isEditing ? "Edit Door" : door.name}
            </h1>
          </div>
          {!isEditing && (
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {deleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Deleting...</span>
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          /* Edit Mode */
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6 space-y-6">
            {/* Error Message */}
            {error && (
              <div className="rounded-md bg-red-900/50 border border-red-500 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="rounded-md bg-green-900/50 border border-green-500 px-4 py-3 text-sm text-green-200">
                {success}
              </div>
            )}

            {/* Door Name */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Door Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Enter door name"
                required
              />
            </div>

            {/* Category and Door Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  required
                >
                  <option value="">-- Select Category --</option>
                  <option value="interior">Interior</option>
                  <option value="exterior">Exterior</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Door Type *
                </label>
                <select
                  name="doorType"
                  value={formData.doorType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  required
                  disabled={!formData.category}
                >
                  <option value="">-- Select Door Type --</option>
                  {doorTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* SKU Code */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                SKU Code
              </label>
              <input
                type="text"
                name="skuCode"
                value={formData.skuCode}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Enter SKU code (e.g. DOOR-001)"
              />
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Door Images * (At least one required)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer"
              />
              <p className="mt-2 text-xs text-zinc-400">
                Upload additional images. Existing images will be kept.
              </p>

              {/* Image Preview */}
              {formData.imageUrl && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Image Preview
                  </label>
                  <div className="relative group w-48">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={resolveImageUrl(formData.imageUrl)}
                      alt="Preview"
                      className="w-full h-32 object-contain rounded-lg border border-zinc-700"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-4 border-t border-zinc-800">
              <button
                onClick={() => {
                  setError(null);
                  setSuccess(null);
                  setIsEditing(false);
                  setSelectedFile(null);
                  // Reset form data to original door data
                  if (door) {
                    setFormData({
                      name: door.name || "",
                      category: door.category || "",
                      doorType: door.doorType || "",
                      description: door.description || "",
                      skuCode: door.skuCode || "",
                      imageUrl: door.imageUrl || "",
                    });
                    setOriginalImageUrl(door.imageUrl || "");
                  }
                }}
                className="px-6 py-3 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        ) : (
          /* View Mode */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Images Section */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Images</h2>
              {door.imageUrl ? (
                <div className="space-y-4">
                  {/* Main Image */}
                  <div className="relative bg-zinc-900 rounded-lg overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={resolveImageUrl(door.imageUrl)}
                      alt={door.name}
                      className="w-full h-96 object-contain"
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full h-96 bg-zinc-900 rounded-lg flex items-center justify-center">
                  <div className="text-6xl">🚪</div>
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6 space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4">Details</h2>

              <div className="space-y-4">
                <div>
                  <span className="text-sm text-zinc-400">Name</span>
                  <p className="text-lg font-semibold text-white mt-1">
                    {door.name}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-zinc-400">Category</span>
                    <p className="text-white font-medium mt-1 capitalize">
                      {door.category}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-zinc-400">Door Type</span>
                    <p className="text-white font-medium mt-1">
                      {door.doorType}
                    </p>
                  </div>
                </div>

                <div>
                  <span className="text-sm text-zinc-400">Door Code</span>
                  <p className="text-white font-medium mt-1">
                    {door.skuCode || "—"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
                  <div>
                    <span className="text-sm text-zinc-400">Created</span>
                    <p className="text-white text-sm mt-1">
                      {new Date(door.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-zinc-400">Last Updated</span>
                    <p className="text-white text-sm mt-1">
                      {new Date(door.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
