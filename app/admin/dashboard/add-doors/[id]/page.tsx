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
  price: number;
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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "" as "interior" | "exterior" | "",
    doorType: "",
    description: "",
    material: "",
    dimensions: "",
    color: "",
    inStock: true,
    imageUrl: [] as string[],
  });

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
        const response = await fetch(`/api/admin/doors/${doorId}`);
        const result = await response.json();

        if (result.success) {
          const doorData = result.data;
          setDoor(doorData);
          setFormData({
            name: doorData.name || "",
            price: ((doorData.price || 0) / 100).toFixed(2),
            category: doorData.category || "",
            doorType: doorData.doorType || "",
            description: doorData.description || "",
            material: doorData.material || "",
            dimensions: doorData.dimensions || "",
            color: doorData.color || "",
            inStock: doorData.inStock !== undefined ? doorData.inStock : true,
            imageUrl: doorData.imageUrl || [],
          });
        } else {
          router.push("/admin/dashboard/add-doors");
        }
      } catch (error) {
        console.error("Error fetching door:", error);
        router.push("/admin/dashboard/add-doors");
      } finally {
        setLoading(false);
      }
    };

    if (doorId) {
      fetchDoor();
    }
  }, [doorId, router]);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const promises = fileArray.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then((base64Images) => {
      setFormData((prev) => ({
        ...prev,
        imageUrl: [...prev.imageUrl, ...base64Images],
      }));
    });
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      imageUrl: prev.imageUrl.filter((_, i) => i !== index),
    }));
    if (selectedImageIndex >= index && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      return;
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      return;
    }

    if (formData.imageUrl.length === 0) {
      return;
    }

    try {
      setSaving(true);
      const updateData = {
        name: formData.name,
        price: parseFloat(formData.price),
        category: formData.category,
        doorType: formData.doorType,
        description: formData.description,
        material: formData.material,
        dimensions: formData.dimensions,
        color: formData.color,
        inStock: formData.inStock,
        imageUrl: formData.imageUrl,
      };

      const response = await fetch(`/api/admin/doors/${doorId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      const result = await response.json();

      if (result.success) {
        setIsEditing(false);
        // Refresh door data
        const refreshResponse = await fetch(`/api/admin/doors/${doorId}`);
        const refreshResult = await refreshResponse.json();
        if (refreshResult.success) {
          setDoor(refreshResult.data);
        }
      }
    } catch (error) {
      console.error("Error updating door:", error);
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
      const response = await fetch(`/api/admin/doors/${doorId}`, {
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
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          /* Edit Mode */
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6 space-y-6">
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

            {/* Price and Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Price ($) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

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
                  setIsEditing(false);
                  // Reset form data to original door data
                  if (door) {
                    setFormData({
                      name: door.name || "",
                      price: ((door.price || 0) / 100).toFixed(2),
                      category: door.category || "",
                      doorType: door.doorType || "",
                      description: door.description || "",
                      material: door.material || "",
                      dimensions: door.dimensions || "",
                      color: door.color || "",
                      inStock: door.inStock !== undefined ? door.inStock : true,
                      imageUrl: door.imageUrl || [],
                    });
                  }
                }}
                className="px-6 py-3 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Saving..." : "Save Changes"}
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

                <div>
                  <span className="text-sm text-zinc-400">Price</span>
                  <p className="text-2xl font-bold text-green-400 mt-1">
                    ${(door.price / 100).toFixed(2)}
                  </p>
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

