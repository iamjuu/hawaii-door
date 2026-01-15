"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  createdAt: string;
  updatedAt: string;
}

export default function AddDoorsPage() {
  const router = useRouter();
  const [doorCategory, setDoorCategory] = useState<"interior" | "exterior" | "">("");
  const [selectedDoorType, setSelectedDoorType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    imageUrl: [] as string[],
  });
  
  // Products listing state
  const [viewTab, setViewTab] = useState<"interior" | "exterior">("interior");
  const [doors, setDoors] = useState<Door[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDoors, setTotalDoors] = useState(0);
  const itemsPerPage = 12;

  const doorTypes = doorCategory === "interior" ? interiorDoorTypes : doorCategory === "exterior" ? exteriorDoorTypes : [];

  // Reset to page 1 when changing tabs
  useEffect(() => {
    setCurrentPage(1);
  }, [viewTab]);

  const fetchDoors = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/admin/doors?category=${viewTab}&page=${currentPage}&limit=${itemsPerPage}`
      );
      const result = await response.json();
      if (result.success) {
        setDoors(result.data);
        setTotalPages(result.pagination.totalPages);
        setTotalDoors(result.pagination.total);
      }
    } catch (error) {
      console.error("Error fetching doors:", error);
    } finally {
      setLoading(false);
    }
  }, [viewTab, currentPage, itemsPerPage]);

  // Fetch doors based on selected tab
  useEffect(() => {
    fetchDoors();
  }, [fetchDoors, refreshTrigger]);

  const handleDeleteDoor = async (doorId: string) => {
    if (!confirm("Are you sure you want to delete this door?")) return;

    try {
      const response = await fetch(`/api/admin/doors/${doorId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        // If we deleted the last item on a page and it's not page 1, go to previous page
        if (doors.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
        
        setRefreshTrigger((prev) => prev + 1); // Refresh the list
      }
    } catch (error) {
      console.error("Error deleting door:", error);
    }
  };

  const handleCategoryChange = (category: "interior" | "exterior") => {
    setDoorCategory(category);
    setSelectedDoorType(""); // Reset door type when category changes
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
        imageUrl: base64Images,
      }));
    });
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      imageUrl: prev.imageUrl.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate image is required
    if (!formData.imageUrl || formData.imageUrl.length === 0) {
      return;
    }

    const doorData = {
      name: formData.name,
      price: parseFloat(formData.price),
      category: doorCategory,
      doorType: selectedDoorType,
      imageUrl: formData.imageUrl,
    };

    try {
      const response = await fetch("/api/admin/doors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doorData),
      });

      const result = await response.json();

      if (result.success) {
        // Reset form
        setDoorCategory("");
        setSelectedDoorType("");
        setFormData({
          name: "",
          price: "",
          imageUrl: [],
        });
        
        // Refresh the product list
        setRefreshTrigger((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error adding door:", error);
    }
  };

  return (
    <div className="p-6 sm:p-8 bg-zinc-900 min-h-screen">
      <div className="w-full mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Add New Door</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Select Door Category */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Step 1: Select Door Category</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleCategoryChange("interior")}
                className={`p-6 rounded-lg border-2 transition-all ${
                  doorCategory === "interior"
                    ? "border-blue-500 bg-blue-500/10 text-blue-400"
                    : "border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-600"
                }`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">🚪</div>
                  <div className="font-semibold text-lg">Interior Doors</div>
                  <div className="text-sm mt-1 opacity-75">For indoor spaces</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleCategoryChange("exterior")}
                className={`p-6 rounded-lg border-2 transition-all ${
                  doorCategory === "exterior"
                    ? "border-blue-500 bg-blue-500/10 text-blue-400"
                    : "border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-600"
                }`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">🏠</div>
                  <div className="font-semibold text-lg">Exterior Doors</div>
                  <div className="text-sm mt-1 opacity-75">For outdoor entry</div>
                </div>
              </button>
            </div>
          </div>

          {/* Step 2: Select Door Type */}
          {doorCategory && (
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Step 2: Select {doorCategory === "interior" ? "Interior" : "Exterior"} Door Type
              </h2>
              <div className="space-y-2">
                <select
                  value={selectedDoorType}
                  onChange={(e) => setSelectedDoorType(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  required
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
          )}

          {/* Step 3: Door Details */}
          {selectedDoorType && (
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Step 3: Door Details</h2>
              <div className="space-y-4">
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

                {/* Price */}
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

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Door Images * (Required)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer"
                    required={formData.imageUrl.length === 0}
                  />
                  <p className="mt-2 text-xs text-zinc-400">
                    Upload one or more images. Supported formats: JPG, PNG, WebP
                  </p>
                </div>

                {/* Image Preview */}
                {formData.imageUrl.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Image Preview ({formData.imageUrl.length} image{formData.imageUrl.length > 1 ? 's' : ''})
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Submit Button */}
          {selectedDoorType && (
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => {
                  setDoorCategory("");
                  setSelectedDoorType("");
                  setFormData({
                    name: "",
                    price: "",
                    imageUrl: [],
                  });
                }}
                className="px-6 py-3 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Add Door
              </button>
            </div>
          )}
        </form>

        {/* Summary Card */}
        {doorCategory && (
          <div className="mt-8 bg-zinc-950 border border-zinc-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-400">Category:</span>
                <span className="text-white font-medium capitalize">{doorCategory}</span>
              </div>
              {selectedDoorType && (
                <div className="flex justify-between">
                  <span className="text-zinc-400">Door Type:</span>
                  <span className="text-white font-medium">{selectedDoorType}</span>
                </div>
              )}
              {formData.name && (
                <div className="flex justify-between">
                  <span className="text-zinc-400">Name:</span>
                  <span className="text-white font-medium">{formData.name}</span>
                </div>
              )}
              {formData.price && (
                <div className="flex justify-between">
                  <span className="text-zinc-400">Price:</span>
                  <span className="text-white font-medium">${formData.price}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Products Listing Section */}
        <div className="mt-12 border-t border-zinc-800 pt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Added Doors</h2>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-zinc-800">
            <button
              onClick={() => setViewTab("interior")}
              className={`px-6 py-3 font-semibold transition-colors relative ${
                viewTab === "interior"
                  ? "text-blue-400"
                  : "text-zinc-400 hover:text-zinc-300"
              }`}
            >
              Interior Doors
              {viewTab === "interior" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"></div>
              )}
            </button>
            <button
              onClick={() => setViewTab("exterior")}
              className={`px-6 py-3 font-semibold transition-colors relative ${
                viewTab === "exterior"
                  ? "text-blue-400"
                  : "text-zinc-400 hover:text-zinc-300"
              }`}
            >
              Exterior Doors
              {viewTab === "exterior" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"></div>
              )}
            </button>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : doors.length === 0 ? (
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-12 text-center">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No {viewTab} doors added yet
              </h3>
              <p className="text-zinc-400">
                Add your first {viewTab} door using the form above
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {doors.map((door) => (
                <div
                  key={door._id}
                  className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-colors flex flex-col"
                >
                  {/* Clickable Door Image and Info */}
                  <Link
                    href={`/admin/dashboard/add-doors/${door._id}`}
                    className="flex-1 flex flex-col cursor-pointer"
                  >
                    {/* Door Image */}
                    <div className="relative h-48 bg-zinc-900">
                      {door.imageUrl && door.imageUrl.length > 0 ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={door.imageUrl[0]}
                          alt={door.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-600">
                          <div className="text-6xl">🚪</div>
                        </div>
                      )}
                      {door.imageUrl && door.imageUrl.length > 1 && (
                        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          +{door.imageUrl.length - 1} more
                        </div>
                      )}
                    </div>

                    {/* Door Info */}
                    <div className="p-4 flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2 truncate">
                        {door.name}
                      </h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Type:</span>
                          <span className="text-zinc-300 text-right truncate ml-2">
                            {door.doorType}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Price:</span>
                          <span className="text-green-400 font-semibold">
                            ${(door.price / 100).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Added:</span>
                          <span className="text-zinc-300">
                            {new Date(door.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>

               
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === 1
                    ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                    : "bg-zinc-800 text-white hover:bg-zinc-700"
                }`}
              >
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first page, last page, current page, and pages around current
                  const showPage =
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1);

                  // Show ellipsis
                  const showEllipsisBefore = page === currentPage - 2 && currentPage > 3;
                  const showEllipsisAfter = page === currentPage + 2 && currentPage < totalPages - 2;

                  if (showEllipsisBefore || showEllipsisAfter) {
                    return (
                      <span key={page} className="px-4 py-2 text-zinc-400">
                        ...
                      </span>
                    );
                  }

                  if (!showPage) return null;

                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "bg-zinc-800 text-white hover:bg-zinc-700"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === totalPages
                    ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                    : "bg-zinc-800 text-white hover:bg-zinc-700"
                }`}
              >
                Next
              </button>
            </div>
          )}

          {/* Products Count */}
          {!loading && doors.length > 0 && (
            <div className="mt-6 text-center text-zinc-400 text-sm">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, totalDoors)} of {totalDoors} {viewTab} door
              {totalDoors !== 1 ? "s" : ""}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

