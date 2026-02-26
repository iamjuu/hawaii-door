"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";
import PageLoader from "@/components/user/PageLoader";
import { FiFilter, FiX } from "react-icons/fi";
import { ParallaxScroll } from "../components/ui/parallax-scroll";

/* ---------------- TYPES ---------------- */
type GalleryItem = {
  id: string;
  image: string;
  product: string; // "Interior" or "Exterior"
  type: string; // "Single", "Double", "Barn", "Dutch"
  glass: string; // "With Glass" or "Without Glass"
};

type ApiGalleryItem = {
  _id?: string;
  id?: string;
  imageUrl?: string | string[];
  category?: "interior" | "exterior";
  subCategory?: "Single" | "Double" | "Barn" | "Dutch";
  hasGlass?: boolean;
  name?: string;
};

/* ---------------- COMPONENT ---------------- */

const GalleryPage = () => {
  const [openFilter, setOpenFilter] = useState(false);

  // Filters
  const [selectedProduct, setSelectedProduct] = useState("All");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedGlass, setSelectedGlass] = useState<string[]>([]);

  // Data State
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoaded, setInitialLoaded] = useState(false);

  // Constants
  const LIMIT = 100;

  /* ---------------- HELPERS ---------------- */
  // Use NEXT_PUBLIC_URL + path for FTP paths (uploads/...). No base64.
  const getImageUrl = (imageUrl: string): string => {
    if (!imageUrl) return "";
    const s = String(imageUrl).trim();
    if (s.startsWith("data:image")) return s;
    if (s.startsWith("http")) return s;
    const base = (process.env.NEXT_PUBLIC_URL || "https://navajowhite-ostrich-413154.hostingersite.com").replace(/\/$/, "");
    const path = s.startsWith("/") ? s : `/${s}`;
    return `${base}${path}`;
  };

  /* ---------------- FETCH DATA ---------------- */
  const fetchGalleryItems = useCallback(
    async (pageNum: number, isNewFilter: boolean = false) => {
      if (loading) return;

      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.append("limit", LIMIT.toString());
        params.append("page", pageNum.toString());

        if (selectedProduct !== "All")
          params.append("category", selectedProduct.toLowerCase());
        if (selectedTypes.length > 0)
          selectedTypes.forEach((t) => params.append("subCategory", t));
        if (selectedGlass.length > 0)
          selectedGlass.forEach((g) =>
            params.append("hasGlass", (g === "With Glass").toString()),
          );

        const response = await fetch(`/api/gallery?${params.toString()}`);
        const result = await response.json();

        if (result.success && result.data) {
          const transformedItems: GalleryItem[] = result.data
            .map((item: ApiGalleryItem) => {
              const raw = item.imageUrl;
              const imagePath = typeof raw === "string" ? raw : (Array.isArray(raw) && raw[0] ? raw[0] : "");
              const image = getImageUrl(imagePath);
              const productCategory =
                item.category === "interior"
                  ? "Interior"
                  : item.category === "exterior"
                    ? "Exterior"
                    : "Other";
              return {
                id: item._id || item.id || "",
                image,
                product: productCategory,
                type: item.subCategory || "",
                glass: item.hasGlass ? "With Glass" : "Without Glass",
              };
            })
            .filter((item: GalleryItem) => item.image && item.id);

          if (isNewFilter) {
            setGalleryItems(transformedItems);
          } else {
            setGalleryItems((prev) => [...prev, ...transformedItems]);
          }

          setHasMore(result.pagination.hasNext);
        }
      } catch (error) {
        console.error("Error fetching gallery items:", error);
      } finally {
        setLoading(false);
        setInitialLoaded(true);
      }
    },
    [selectedProduct, selectedTypes, selectedGlass],
  );

  // Initial fetch or filter change
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setGalleryItems([]);
    fetchGalleryItems(1, true);
  }, [selectedProduct, selectedTypes, selectedGlass]);

  // Infinite Scroll Handler
  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;

      const scrolled = window.innerHeight + document.documentElement.scrollTop;
      const total = document.documentElement.offsetHeight;
      const threshold = 100; // Trigger when 100px from bottom

      if (scrolled >= total - threshold) {
        setPage((prev) => {
          const nextPage = prev + 1;
          fetchGalleryItems(nextPage, false);
          return nextPage;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, fetchGalleryItems]);

  /* ---------------- FILTER LOGIC (Toggle Handlers) ---------------- */
  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const handleGlassToggle = (glass: string) => {
    setSelectedGlass((prev) =>
      prev.includes(glass) ? prev.filter((g) => g !== glass) : [...prev, glass],
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
      <PageLoader isLoading={!initialLoaded} />
      <Navbar />

      {/* MOBILE FILTER BUTTON - STICKY */}
      <button
        onClick={() => setOpenFilter(true)}
        className="lg:hidden fixed top-[55px] left-6 z-30 flex items-center gap-2 border bg-[#b7d7a8] border-gray-300 rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#a8c798] transition-colors shadow-lg"
      >
        <FiFilter className="text-lg" />
        Filter
      </button>

      {/* OVERLAY */}
      {openFilter && (
        <div
          onClick={() => setOpenFilter(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <main className="min-h-screen bg-[#fdfffc] pt-[70px] md:pt-[80px]">
        {/* HERO */}
        <section className="w-full py-[25px] sm:py-12 md:py-16">
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[60px]">
            <div className="max-w-[1400px] 2xl:mx-auto">
              <h1 className="text-[23px] md:text-[46px] font-[600] text-black font-roboto leading-[32px] md:leading-[56px] tracking-normal mb-4">
                Doors That Speak
                <br />
                for Themselves
              </h1>
              <p className="text-sm md:text-base font-[400] text-[#3B3B3B] font-roboto max-w-2xl">
                See recent installs, machining projects, and custom builds
                across O'ahu, Maui, Kaua'i, and Hawai'i Island. Every project
                tells the same story: precision, fit, and finish done right.
              </p>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="w-full pb-16">
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[60px]">
            <div className="max-w-[1400px] 2xl:mx-auto">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* FILTER SIDEBAR */}
                <aside
                  className={`
                  fixed lg:static top-0 left-0 h-full lg:h-fit
                  w-[280px] bg-white border border-gray-200 rounded-lg p-6
                  z-50 lg:z-auto
                  transform transition-transform duration-300
                  ${openFilter ? "translate-x-0" : "-translate-x-full"}
                  lg:translate-x-0
                  lg:sticky lg:top-[100px] lg:self-start lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto
                `}
                >
                  {/* MOBILE HEADER */}
                  <div className="flex bg-[#b7d7a8] justify-between items-center mb-6 lg:hidden">
                    <h2 className="text-lg font-semibold text-black">
                      Filters
                    </h2>
                    <button onClick={() => setOpenFilter(false)}>
                      <FiX className="text-xl text-black" />
                    </button>
                  </div>

                  {/* DESKTOP HEADER */}
                  <div className="hidden lg:block">
                    <div className="flex items-center gap-2">
                      <FiFilter className="text-lg" />
                      <h2 className="text-lg font-semibold">Filters</h2>
                    </div>
                  </div>

                  {/* PRODUCT */}
                  <div className="mb-8 mt-6">
                    <h3 className="text-sm font-semibold mb-4">Product</h3>
                    <div className="flex gap-2">
                      {["All", "Interior", "Exterior"].map((p) => (
                        <button
                          key={p}
                          onClick={() => {
                            setSelectedProduct(p);
                            setOpenFilter(false);
                          }}
                          className={`px-3 py-2 rounded-md text-sm ${
                            selectedProduct === p
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
                    {[
                      { label: "All", value: "All" },
                      { label: "Single", value: "Single" },
                      { label: "Double", value: "Double" },
                      { label: "Barn", value: "Barn" },
                      { label: "Dutch", value: "Dutch" },
                    ].map((type) => (
                      <label
                        key={type.value}
                        className="flex justify-between items-center mb-3 cursor-pointer"
                      >
                        <span className="text-sm">{type.label}</span>
                        <input
                          type="checkbox"
                          checked={
                            type.value === "All"
                              ? selectedTypes.length === 0
                              : selectedTypes.includes(type.value)
                          }
                          onChange={() => {
                            if (type.value === "All") {
                              setSelectedTypes([]);
                            } else {
                              handleTypeToggle(type.value);
                            }
                          }}
                          className="custom-checkbox"
                        />
                      </label>
                    ))}
                  </div>

                  {/* GLASS */}
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold mb-4">Glass</h3>
                    {[
                      { label: "All", value: "All" },
                      { label: "With Glass", value: "With Glass" },
                      { label: "Without Glass", value: "Without Glass" },
                    ].map((g) => (
                      <label
                        key={g.value}
                        className="flex justify-between items-center mb-3 cursor-pointer"
                      >
                        <span className="text-sm">{g.label}</span>
                        <input
                          type="checkbox"
                          checked={
                            g.value === "All"
                              ? selectedGlass.length === 0
                              : selectedGlass.includes(g.value)
                          }
                          onChange={() => {
                            if (g.value === "All") {
                              setSelectedGlass([]);
                            } else {
                              handleGlassToggle(g.value);
                            }
                          }}
                          className="custom-checkbox"
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
                <div className="flex-1 overflow-x-hidden">
                  {/* Showing count */}
                  <div className="mb-3">
                    <p className="text-sm font-[400] text-[#585858] font-roboto">
                      Showing {galleryItems.length} {hasMore ? "+" : ""} doors
                    </p>
                  </div>

                  {initialLoaded && galleryItems.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                      No gallery items found. Please check back later or try
                      different filters.
                    </div>
                  ) : (
                    <ParallaxScroll images={galleryItems} />
                  )}

                  {loading && galleryItems.length > 0 && (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6E4A]"></div>
                    </div>
                  )}
                </div>
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
