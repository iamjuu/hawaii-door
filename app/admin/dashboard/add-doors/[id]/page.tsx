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
  imageUrl: string[];
  description?: string;
  material?: string;
  dimensions?: string;
  color?: string;
  inStock?: boolean;
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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    category: "" as "interior" | "exterior" | "",
    doorType: "",
    description: "",
    material: "",
    dimensions: "",
    color: "",
    inStock: true,
    imageUrl: [] as string[],
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [originalImageUrls, setOriginalImageUrls] = useState<string[]>([]);

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
          const imageUrls = doorData.imageUrl || [];
          setOriginalImageUrls(imageUrls);
          setFormData({
            name: doorData.name || "",
            category: doorData.category || "",
            doorType: doorData.doorType || "",
            description: doorData.description || "",
            material: doorData.material || "",
            dimensions: doorData.dimensions || "",
            color: doorData.color || "",
            inStock: doorData.inStock !== undefined ? doorData.inStock : true,
            imageUrl: imageUrls,
          });
        } else {
          setError(result.message || "Failed to fetch door details");
        }
      } catch (error) {
        console.error("Error fetching door:", error);
        setError(error instanceof Error ? error.message : "An error occurred while fetching door details");
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
    >
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
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    
    try {
      // Create preview URLs for immediate display (base64)
      const previewPromises = fileArray.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      const previewUrls = await Promise.all(previewPromises);
      
      // Store File objects for later upload
      setSelectedFiles((prev) => [...prev, ...fileArray]);
      
      // Set preview URLs immediately (base64, not S3 URLs)
      setFormData((prev) => ({
        ...prev,
        imageUrl: [...prev.imageUrl, ...previewUrls],
      }));
    } catch (error) {
      console.error("Error creating image preview:", error);
    }
  };

  const removeImage = (index: number) => {
    const imageUrl = formData.imageUrl[index];
    const isBase64Preview = imageUrl && !imageUrl.startsWith("https://");
    
    setFormData((prev) => ({
      ...prev,
      imageUrl: prev.imageUrl.filter((_, i) => i !== index),
    }));
    
    if (selectedImageIndex >= index && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
    
    // If it's a base64 preview (new file), remove from selectedFiles
    // Count how many base64 previews come before this index
    if (isBase64Preview) {
      let base64Count = 0;
      for (let i = 0; i < index; i++) {
        if (formData.imageUrl[i] && !formData.imageUrl[i].startsWith("https://")) {
          base64Count++;
        }
      }
      setSelectedFiles((prev) => {
        const newFiles = [...prev];
        if (base64Count < newFiles.length) {
          newFiles.splice(base64Count, 1);
        }
        return newFiles;
      });
    }
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

    if (formData.imageUrl.length === 0) {
      setError("At least one image is required");
      return;
    }

    try {
      setSaving(true);
      
      // Upload new images to S3 only when Save button is clicked
      let finalImageUrls: string[] = [];
      
      // Separate existing S3 URLs from new base64 previews
      const existingS3Urls = formData.imageUrl.filter((url) => url.startsWith("https://"));
      const base64Previews = formData.imageUrl.filter((url) => !url.startsWith("https://"));
      
      // Upload new files to S3
      if (selectedFiles.length > 0) {
        const uploadFormData = new FormData();
        selectedFiles.forEach((file) => {
          uploadFormData.append("files", file);
        });

        const token = typeof window !== "undefined" ? document.cookie.split("; ").find(row => row.startsWith("adminToken="))?.split("=")[1] : null;
        
        const uploadResponse = await fetch("/api/upload/image", {
          method: "POST",
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: uploadFormData,
        });

        const uploadData = await uploadResponse.json();

        if (uploadData.success && uploadData.data && Array.isArray(uploadData.data)) {
          const newS3Urls = uploadData.data.map((item: { url: string }) => item.url);
          finalImageUrls = [...existingS3Urls, ...newS3Urls];
        } else {
          throw new Error(uploadData.message || "Failed to upload images");
        }
      } else {
        // No new files, use existing URLs
        finalImageUrls = existingS3Urls;
      }

      const updateData = {
        name: formData.name,
        category: formData.category,
        doorType: formData.doorType,
        description: formData.description,
        material: formData.material,
        dimensions: formData.dimensions,
        color: formData.color,
        inStock: formData.inStock,
        imageUrl: finalImageUrls,
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
        setSelectedFiles([]);
        // Refresh door data
        const refreshResponse = await fetch(`/api/admin/products/${doorId}`);
        const refreshResult = await refreshResponse.json();
        if (refreshResult.success) {
          setDoor(refreshResult.data);
          const imageUrls = refreshResult.data.imageUrl || [];
          setOriginalImageUrls(imageUrls);
          // Update formData with refreshed data
          setFormData({
            name: refreshResult.data.name || "",
            category: refreshResult.data.category || "",
            doorType: refreshResult.data.doorType || "",
            description: refreshResult.data.description || "",
            material: refreshResult.data.material || "",
            dimensions: refreshResult.data.dimensions || "",
            color: refreshResult.data.color || "",
            inStock: refreshResult.data.inStock !== undefined ? refreshResult.data.inStock : true,
            imageUrl: imageUrls,
          });
        }
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(result.message || "Failed to update door");
      }
    } catch (error) {
      console.error("Error updating door:", error);
      setError(error instanceof Error ? error.message : "An error occurred while updating the door");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this door? This action cannot be undone.")) {
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
          <h3 className="text-xl font-semibold text-white mb-2">Error loading door</h3>
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
          <h3 className="text-xl font-semibold text-white mb-2">Door not found</h3>
          <p className="text-zinc-400 mb-6">The door you're looking for doesn't exist.</p>
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

            {/* Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Stock Status
                </label>
                <div className="flex items-center h-[48px]">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="inStock"
                      checked={formData.inStock}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-blue-600 bg-zinc-900 border-zinc-700 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-white">
                      {formData.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Optional Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Material
                </label>
                <input
                  type="text"
                  name="material"
                  value={formData.material}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="e.g., Wood, Metal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Dimensions
                </label>
                <input
                  type="text"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="e.g., 36x80 inches"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Color
              </label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="e.g., White, Brown"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                placeholder="Enter door description"
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
              {formData.imageUrl.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.imageUrl.map((image, index) => (
                    <div key={index} className="relative group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-zinc-700"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
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
                  setSelectedFiles([]);
                  // Reset form data to original door data
                  if (door) {
                    setFormData({
                      name: door.name || "",
                      category: door.category || "",
                      doorType: door.doorType || "",
                      description: door.description || "",
                      material: door.material || "",
                      dimensions: door.dimensions || "",
                      color: door.color || "",
                      inStock: door.inStock !== undefined ? door.inStock : true,
                      imageUrl: door.imageUrl || [],
                    });
                    setOriginalImageUrls(door.imageUrl || []);
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
              {door.imageUrl && door.imageUrl.length > 0 ? (
                <div className="space-y-4">
                  {/* Main Image */}
                  <div className="relative bg-zinc-900 rounded-lg overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={door.imageUrl[selectedImageIndex]}
                      alt={door.name}
                      className="w-full h-96 object-contain"
                    />
                  </div>

                  {/* Thumbnail Gallery */}
                  {door.imageUrl.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {door.imageUrl.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                            selectedImageIndex === index
                              ? "border-blue-500"
                              : "border-zinc-700 hover:border-zinc-600"
                          }`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={image}
                            alt={`${door.name} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
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
                  <p className="text-lg font-semibold text-white mt-1">{door.name}</p>
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
                    <p className="text-white font-medium mt-1">{door.doorType}</p>
                  </div>
                </div>

                {door.description && (
                  <div>
                    <span className="text-sm text-zinc-400">Description</span>
                    <p className="text-white mt-1">{door.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {door.material && (
                    <div>
                      <span className="text-sm text-zinc-400">Material</span>
                      <p className="text-white font-medium mt-1">{door.material}</p>
                    </div>
                  )}
                  {door.dimensions && (
                    <div>
                      <span className="text-sm text-zinc-400">Dimensions</span>
                      <p className="text-white font-medium mt-1">{door.dimensions}</p>
                    </div>
                  )}
                </div>

                {door.color && (
                  <div>
                    <span className="text-sm text-zinc-400">Color</span>
                    <p className="text-white font-medium mt-1">{door.color}</p>
                  </div>
                )}

                <div>
                  <span className="text-sm text-zinc-400">Stock Status</span>
                  <p
                    className={`font-medium mt-1 ${
                      door.inStock ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {door.inStock ? "In Stock" : "Out of Stock"}
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

