"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";
import { FiFilter, FiX } from "react-icons/fi";
import { ParallaxScrollSecondDemo } from "../components/card/card";

/* ---------------- TYPES ---------------- */
type Door = {
  id: string;
  image: string;
  product: string;
  type: string;
  glass: string;
};

type ApiProduct = {
  _id?: string;
  id?: string;
  imageUrl?: string[];
  category?: string;
  type?: "normal" | "glass" | "interior" | "exterior";
  name?: string;
  price?: number;
};

/* ---------------- COMPONENT ---------------- */
const GalleryPage = () => {
  const [openFilter, setOpenFilter] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState("All");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedGlass, setSelectedGlass] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [alldoors, setAllDoors] = useState<Door[]>([]);

  /* ---------------- HELPERS ---------------- */
  const getImageUrl = (imageUrl: string): string => {
    if (!imageUrl) return "";
    if (imageUrl.startsWith("data:image")) return imageUrl;
    if (imageUrl.startsWith("http")) return imageUrl;
    return `data:image/jpeg;base64,${imageUrl}`;
  };

  const capitalize = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1);

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/products?limit=100");
        const result = await response.json();

        if (result.success && result.data) {
          const transformedDoors: Door[] = result.data
            .map((product: ApiProduct) => {
              const firstImage = product.imageUrl?.[0]?.trim() || "";
              const productType = (product.type || "normal").toLowerCase();
              const image = getImageUrl(firstImage);

              let productCategory = "Other";
              if (productType === "interior") productCategory = "Interior";
              if (productType === "exterior") productCategory = "Exterior";

              return {
                id: product._id || product.id || "",
                image,
                product: productCategory,
                type: product.category ? capitalize(product.category) : "",
                glass:
                  productType === "glass"
                    ? "With Glass"
                    : productType === "normal"
                      ? "Without Glass"
                      : "",
              };
            })
            .filter(
              (d: Door) =>
                d.image && d.image !== "data:image/jpeg;base64,"
            );

          setAllDoors(transformedDoors);
        } else {
          setError("Failed to load products");
        }
      } catch {
        setError("Error loading products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredDoors = alldoors.filter((door) => {
    if (selectedProduct !== "All" && door.product !== selectedProduct)
      return false;
    if (selectedTypes.length && !selectedTypes.includes(door.type))
      return false;
    if (selectedGlass.length && !selectedGlass.includes(door.glass))
      return false;
    return true;
  });

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleGlassToggle = (glass: string) => {
    setSelectedGlass((prev) =>
      prev.includes(glass) ? prev.filter((g) => g !== glass) : [...prev, glass]
    );
  };

  const clearAllFilters = () => {
    setSelectedProduct("All");
    setSelectedTypes([]);
    setSelectedGlass([]);
    setOpenFilter(false);
  };

  /* ---------------- RENDER ---------------- */
  return (
    <>
      <Navbar />

      {/* MOBILE FILTER BUTTON - STICKY */}
      <button
        onClick={() => setOpenFilter(true)}
        className="md:hidden fixed top-[80px] left-6 z-30 flex items-center gap-2 border bg-[#b7d7a8] border-gray-300 rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#a8c798] transition-colors shadow-lg"
      >
        <FiFilter className="text-lg" />
        Filter
      </button>

      {/* OVERLAY */}
      {openFilter && (
        <div
          onClick={() => setOpenFilter(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <main className="min-h-screen bg-white pt-[70px] md:pt-[80px]">
        {/* HERO */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-[28px] md:text-[56px] font-semibold mb-6">
              Doors That Speak <br /> for Themselves
            </h1>
            <p className="text-[18px] text-gray-700 max-w-2xl">
              See recent installs, machining projects, and custom builds across
              Hawai‘i.
            </p>
          </div>
        </section>

        {/* CONTENT */}
        <section className="px-6 md:px-12 lg:px-20 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">

              {/* FILTER SIDEBAR */}
              <aside
                className={`
                  fixed md:static top-0 left-0 h-full md:h-fit
                  w-[280px] bg-white border border-gray-200 rounded-lg p-6
                  z-50 md:z-auto
                  transform transition-transform duration-300
                  ${openFilter ? "translate-x-0" : "-translate-x-full"}
                  md:translate-x-0
                  lg:sticky lg:top-[100px]
                `}
              >
                {/* MOBILE HEADER */}
                <div className="flex bg-[#b7d7a8] justify-between items-center mb-6 md:hidden">
                  <h2 className="text-lg font-semibold text-black">Filters</h2>
                  <button onClick={() => setOpenFilter(false)}>
                    <FiX className="text-xl text-black" />
                  </button>
                </div>

                {/* DESKTOP HEADER - Simple Title */}
                <div className="hidden md:block mb-6">
                  <h2 className="text-lg font-semibold">Filters</h2>
                </div>


                {/* PRODUCT */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold mb-4">Product</h3>
                  <div className="flex gap-2">
                    {["All", "Interior", "Exterior"].map((p) => (
                      <button
                        key={p}
                        onClick={() => {
                          setSelectedProduct(p);
                          setOpenFilter(false);
                        }}
                        className={`px-3 py-2 rounded-md text-sm ${selectedProduct === p
                            ? "bg-[#FF6E4A] text-white"
                            : "hover:bg-gray-100"
                          }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* TYPE */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold mb-4">Type</h3>
                  {["Single", "Double", "Barn", "Dutch"].map((type) => (
                    <label
                      key={type}
                      className="flex justify-between items-center mb-3 cursor-pointer"
                    >
                      <span>{type}</span>
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleTypeToggle(type)}
                      />
                    </label>
                  ))}
                </div>

                {/* GLASS */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold mb-4">Glass</h3>
                  {["With Glass", "Without Glass"].map((g) => (
                    <label
                      key={g}
                      className="flex justify-between items-center mb-3 cursor-pointer"
                    >
                      <span>{g}</span>
                      <input
                        type="checkbox"
                        checked={selectedGlass.includes(g)}
                        onChange={() => handleGlassToggle(g)}
                      />
                    </label>
                  ))}
                </div>

                <button
                  onClick={clearAllFilters}
                  className="text-sm text-[#FF6E4A] hover:underline"
                >
                  Clear All Filters
                </button>
              </aside>

              {/* RIGHT CONTENT */}
              <div className="flex-1">
                <ParallaxScrollSecondDemo />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default GalleryPage;
