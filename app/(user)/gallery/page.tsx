"use client";

import React, { useState } from "react";
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";
import PageLoader from "@/components/user/PageLoader";
import { FiFilter, FiX } from "react-icons/fi";
import { ParallaxScrollSecondDemo } from "../components/card/card";

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
  imageUrl?: string[];
  category?: "interior" | "exterior";
  subCategory?: "Single" | "Double" | "Barn" | "Dutch";
  hasGlass?: boolean;
  name?: string;
};

/* ---------------- STATIC GALLERY (temporary until backend has images; uncomment API below when ready) ---------------- */
const STATIC_GALLERY_ITEMS: GalleryItem[] = [
  { id: "s1", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", product: "Exterior", type: "Single", glass: "With Glass" },
  { id: "s2", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800", product: "Interior", type: "Single", glass: "Without Glass" },
  { id: "s3", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6d3ea?w=800", product: "Interior", type: "Single", glass: "With Glass" },
  { id: "s4", image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800", product: "Exterior", type: "Double", glass: "With Glass" },
  { id: "s5", image: "https://images.unsplash.com/photo-1600047509807-ba87494cfbce?w=800", product: "Exterior", type: "Double", glass: "Without Glass" },
  { id: "s6", image: "https://images.unsplash.com/photo-1600585154520-5d63cc2118e0?w=800", product: "Exterior", type: "Single", glass: "With Glass" },
  { id: "s7", image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800", product: "Interior", type: "Single", glass: "Without Glass" },
  { id: "s8", image: "https://images.unsplash.com/photo-1558618666-fa25c5b8318d?w=800", product: "Interior", type: "Barn", glass: "Without Glass" },
  { id: "s9", image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800", product: "Interior", type: "Dutch", glass: "With Glass" },
  { id: "s10", image: "https://images.unsplash.com/photo-1600566752733-c8c8e2716c63?w=800", product: "Interior", type: "Single", glass: "With Glass" },
  { id: "s11", image: "/assets/images/doorimage/Gallery%201.png", product: "Interior", type: "Single", glass: "With Glass" },
  { id: "s12", image: "/assets/images/doorimage/Frame%20138.png", product: "Exterior", type: "Single", glass: "With Glass" },
  { id: "s13", image: "/assets/images/doorimage/Frame%20150.png", product: "Interior", type: "Double", glass: "Without Glass" },
  { id: "s14", image: "/assets/images/doorimage/Frame%20154.png", product: "Exterior", type: "Single", glass: "With Glass" },
  { id: "s15", image: "https://images.unsplash.com/photo-1600573472692-25e63ee141f8?w=800", product: "Exterior", type: "Single", glass: "Without Glass" },
];

/* ---------------- COMPONENT ---------------- */
const GalleryPage = () => {
  const [openFilter, setOpenFilter] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState("All");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedGlass, setSelectedGlass] = useState<string[]>([]);
  // Static mode: no API, use STATIC_GALLERY_ITEMS. When using API, set loading true and use [].
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allGalleryItems, setAllGalleryItems] = useState<GalleryItem[]>(STATIC_GALLERY_ITEMS);

  /* ---------------- HELPERS ---------------- */
  const getImageUrl = (imageUrl: string): string => {
    if (!imageUrl) return "";
    if (imageUrl.startsWith("data:image")) return imageUrl;
    if (imageUrl.startsWith("http")) return imageUrl;
    return `data:image/jpeg;base64,${imageUrl}`;
  };

  const capitalize = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1);

  /* ---------------- FETCH: commented out; using static gallery until backend has images ---------------- */
  // When backend is ready: set initial loading=true, allGalleryItems=[], and uncomment below.
  // useEffect(() => {
  //   const fetchGalleryItems = async () => {
  //     try {
  //       setLoading(true);
  //       const params = new URLSearchParams();
  //       params.append("limit", "200");
  //       if (selectedProduct !== "All") params.append("category", selectedProduct.toLowerCase());
  //       if (selectedTypes.length > 0) selectedTypes.forEach((t) => params.append("subCategory", t));
  //       if (selectedGlass.length > 0) selectedGlass.forEach((g) => params.append("hasGlass", (g === "With Glass").toString()));
  //       const response = await fetch(`/api/gallery?${params.toString()}`);
  //       const result = await response.json();
  //       if (result.success && result.data) {
  //         const transformedItems: GalleryItem[] = result.data.map((item: ApiGalleryItem) => {
  //           const firstImage = item.imageUrl?.[0]?.trim() || "";
  //           const image = getImageUrl(firstImage);
  //           const productCategory = item.category === "interior" ? "Interior" : item.category === "exterior" ? "Exterior" : "Other";
  //           return { id: item._id || item.id || "", image, product: productCategory, type: item.subCategory || "", glass: item.hasGlass ? "With Glass" : "Without Glass" };
  //         }).filter((item: GalleryItem) => item.image && item.image !== "data:image/jpeg;base64,");
  //         setAllGalleryItems(transformedItems);
  //       } else setError("Failed to load gallery items");
  //     } catch { setError("Error loading gallery items"); }
  //     finally { setLoading(false); }
  //   };
  //   fetchGalleryItems();
  // }, [selectedProduct, selectedTypes, selectedGlass]);

  /* ---------------- FILTER LOGIC (client-side when using static data) ---------------- */
  const filteredDoors = allGalleryItems.filter((item) => {
    if (selectedProduct !== "All" && item.product !== selectedProduct) return false;
    if (selectedTypes.length > 0 && !selectedTypes.includes(item.type)) return false;
    if (selectedGlass.length > 0 && !selectedGlass.includes(item.glass)) return false;
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
      <PageLoader isLoading={loading} />
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

      <main className="min-h-screen bg-[#fdfffc] pt-[70px] md:pt-[80px]">
        {/* HERO */}
        <section className="w-full py-10 sm:py-12 md:py-16">
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[60px]">
            <div className="max-w-[1400px] 2xl:mx-auto">
              <h1 className="text-[23px] md:text-[46px] font-[600] text-black font-roboto leading-[32px] md:leading-[56px] tracking-normal mb-4">
                Doors That Speak<br />for Themselves
              </h1>
              <p className="text-sm md:text-base font-[400] text-[#3B3B3B] font-roboto max-w-2xl">
                See recent installs, machining projects, and custom builds across O'ahu, Maui, Kaua'i, and Hawai'i Island. Every project tells the same story: precision, fit, and finish done right.
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
                  fixed md:static top-0 left-0 h-full md:h-fit
                  w-[280px] bg-white border border-gray-200 rounded-lg p-6
                  z-50 md:z-auto
                  transform transition-transform duration-300
                  ${openFilter ? "translate-x-0" : "-translate-x-full"}
                  md:translate-x-0
                  lg:sticky lg:top-[100px] lg:self-start lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto
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
                <div className="hidden md:block">
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
                  {[{ label: "All", value: "All" }, { label: "Single", value: "Single" }, { label: "Double", value: "Double" }, { label: "Barn", value: "Barn" }, { label: "Dutch", value: "Dutch" }].map((type) => (
                    <label
                      key={type.value}
                      className="flex justify-between items-center mb-3 cursor-pointer"
                    >
                      <span className="text-sm">{type.label}</span>
                      <input
                        type="checkbox"
                        checked={type.value === "All" ? selectedTypes.length === 0 : selectedTypes.includes(type.value)}
                        onChange={() => {
                          if (type.value === "All") {
                            setSelectedTypes([]);
                          } else {
                            handleTypeToggle(type.value);
                          }
                        }}
                        className="w-4 h-4"
                      />
                    </label>
                  ))}
                </div>

                {/* GLASS */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold mb-4">Glass</h3>
                  {[{ label: "All", value: "All" }, { label: "With Glass", value: "With Glass" }, { label: "Without Glass", value: "Without Glass" }].map((g) => (
                    <label
                      key={g.value}
                      className="flex justify-between items-center mb-3 cursor-pointer"
                    >
                      <span className="text-sm">{g.label}</span>
                      <input
                        type="checkbox"
                        checked={g.value === "All" ? selectedGlass.length === 0 : selectedGlass.includes(g.value)}
                        onChange={() => {
                          if (g.value === "All") {
                            setSelectedGlass([]);
                          } else {
                            handleGlassToggle(g.value);
                          }
                        }}
                        className="w-4 h-4"
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
                    Showing {filteredDoors.length} doors
                  </p>
                </div>
                <ParallaxScrollSecondDemo filteredItems={filteredDoors} />
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
