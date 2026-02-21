"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";
import {
  TickGrayPng,
  TickColorPng,
  StartGray,
  StartColor,
} from "@/public/assets";
import HeroSection from "../../components/herosection";
import { FiFilter, FiX } from "react-icons/fi";

interface Door {
  _id: string;
  name: string;
  price: number;
  category: string;
  doorType: string;
  imageUrl?: string;
  description?: string;
  inStock?: boolean;
  skuCode?: string;
  sku_code?: string;
}

// Normalize image URL: use base64 webp as data URL, otherwise use direct URL
function getImageSrc(url: string | undefined): string {
  if (!url || !String(url).trim()) return "";
  const s = String(url).trim();
  if (s.startsWith("data:image")) return s;
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  if (s.startsWith("/")) {
    const baseUrl =
      process.env.NEXT_PUBLIC_URL ||
      "https://navajowhite-ostrich-413154.hostingersite.com";
    return `${baseUrl.replace(/\/$/, "")}${s}`;
  }
  const base64Part = s.includes(",") ? (s.split(",")[1] ?? s) : s;
  return `data:image/webp;base64,${base64Part}`;
}

// Normalize doorType for matching (DB may have different casing/spacing)
function normalizeDoorType(t: string | undefined): string {
  return (t || "").trim().toLowerCase().replace(/\s+/g, " ");
}

// Use blob URL for long base64 data URLs so webp base64 actually displays (avoids browser/engine limits on data: URL length)
const DATA_URL_LENGTH_THRESHOLD = 15_000;

function useResolvedImageSrc(rawSrc: string | undefined): string {
  const [src, setSrc] = React.useState<string>(() => {
    if (!rawSrc || !rawSrc.trim()) return "";
    const s = rawSrc.trim();
    if (!s.startsWith("data:image")) return s;
    if (s.length < DATA_URL_LENGTH_THRESHOLD) return s;
    return "";
  });

  React.useEffect(() => {
    if (!rawSrc || !rawSrc.trim()) {
      setSrc("");
      return;
    }
    const s = rawSrc.trim();
    if (!s.startsWith("data:image")) {
      setSrc(s);
      return;
    }
    if (s.length < DATA_URL_LENGTH_THRESHOLD) {
      setSrc(s);
      return;
    }
    const m = s.match(/^data:([^;]+);base64,(.+)$/);
    if (!m) {
      setSrc(s);
      return;
    }
    const mime = m[1];
    const b64 = m[2];
    try {
      const bin = atob(b64);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      const blob = new Blob([bytes], { type: mime });
      const objectUrl = URL.createObjectURL(blob);
      setSrc(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } catch {
      setSrc(s);
    }
  }, [rawSrc]);

  return src;
}

// Renders door image, resolving long base64 via blob URL so webp base64 actually shows
function DoorImage({
  rawSrc,
  alt,
  className,
  onError,
}: {
  rawSrc: string | undefined;
  alt: string;
  className?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}) {
  const src = useResolvedImageSrc(rawSrc ? getImageSrc(rawSrc) : undefined);
  if (!src) return null;
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={onError}
      decoding="async"
    />
  );
}

const ExteriorWoodPage = () => {
  const [doors, setDoors] = useState<Door[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openFilter, setOpenFilter] = useState(false);

  // Modal state for door preview
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDoorIndex, setCurrentDoorIndex] = useState(0);
  const [currentDoorGroup, setCurrentDoorGroup] = useState<Door[]>([]);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const fetchDoors = async () => {
      try {
        setLoading(true);
        const limit = 100;
        let allDoors: Door[] = [];
        let page = 1;
        let hasMore = true;

        while (hasMore) {
          const response = await fetch(
            `/api/products?category=exterior&limit=${limit}&page=${page}`,
            { cache: "no-store" },
          );
          const data = await response.json();

          if (!data.success) {
            setError(data.message || "Failed to fetch doors");
            break;
          }

          const batch: Door[] = data.data || [];
          allDoors = allDoors.concat(batch);
          hasMore =
            batch.length === limit && (data.pagination?.hasNext ?? false);
          page += 1;

          if (batch.length < limit || page > 20) break; // guard: max 20 pages
        }

        setDoors(allDoors);
      } catch (err) {
        setError("Error loading doors");
        console.error("Error fetching doors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoors();
  }, []);

  // Handle door image click - open modal with that door's group
  const handleDoorClick = (door: Door, doorType: string) => {
    const doorsInType = doors.filter(
      (d) => normalizeDoorType(d.doorType) === normalizeDoorType(doorType),
    );
    const doorIndex = doorsInType.findIndex((d) => d._id === door._id);
    setCurrentDoorGroup(doorsInType);
    setCurrentDoorIndex(doorIndex >= 0 ? doorIndex : 0);
    setIsModalOpen(true);
  };

  // Navigate to previous door in the same group
  const handlePrev = () => {
    setCurrentDoorIndex((prev) =>
      prev > 0 ? prev - 1 : currentDoorGroup.length - 1,
    );
  };

  // Navigate to next door in the same group
  const handleNext = () => {
    setCurrentDoorIndex((prev) =>
      prev < currentDoorGroup.length - 1 ? prev + 1 : 0,
    );
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentDoorIndex((prev) =>
          prev > 0 ? prev - 1 : currentDoorGroup.length - 1,
        );
      }
      if (e.key === "ArrowRight") {
        setCurrentDoorIndex((prev) =>
          prev < currentDoorGroup.length - 1 ? prev + 1 : 0,
        );
      }
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, currentDoorGroup.length]);

  const bgImage = "/assets/product/exterior hero 4.svg";
  const contant = "Exterior Wood Stile & Rail";
  const para =
    "Wood doors offer unmatched customization, with flexible designs, sizes, wood species, and glass options to create standard or fully custom doors that fit your project.";

  const features = [
    {
      text: "Exterior doors as design features",
      iconGray: TickGrayPng,
      iconColor: TickColorPng,
    },
    {
      text: "Styles that align with your space",
      iconGray: StartGray,
      iconColor: StartColor,
    },
  ];

  return (
    <>
      <Navbar />

      <HeroSection
        contant={contant}
        bgImage={bgImage}
        para={para}
        features={features}
      />

      <main className="w-full bg-white py-10 sm:py-12 md:py-[50px]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[60px]">
          <div className="max-w-[1400px] 2xl:mx-auto">
            <section className="space-y-6">
              <h2
                id="overview"
                className="text-[23px] md:text-[32px] font-roboto font-[500] text-black leading-tight"
              >
                In-Stock at Hawaii Western Door Products
              </h2>

              <p className="text-sm md:text-base font-roboto font-[400] text-[#3B3B3B] leading-relaxed">
                The following product offering is part of our stocking program.
                We reserve the right to make changes without notice. Please
                contact your Hawaii Western Door Products representative to
                verify availability, lead time, and for more information.
              </p>

              <p className="text-sm md:text-base font-roboto font-[400] text-[#3B3B3B] leading-relaxed">
                Please note that our doors are delivered unfinished. The product
                images shown below depict finished doors. Due to the natural
                variations in wood, each door will have a unique appearance, and
                the stainability of wood species may differ. We recommend
                consulting with a coatings expert for recommended finishing
                options and instructions.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* MOBILE/TABLET FILTER BUTTON - STICKY */}
      <button
        onClick={() => setOpenFilter(true)}
        className="lg:hidden fixed top-[80px] left-6 z-30 flex items-center gap-2 border bg-[#b7d7a8] border-gray-300 rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#a8c798] transition-colors shadow-lg"
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

      <main className="w-full bg-white py-10 sm:py-12 md:py-[50px]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[60px]">
          <div className="max-w-[1400px] 2xl:mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              {/* LEFT SIDEBAR */}
              <aside
                className={`
                fixed lg:sticky top-0 lg:top-[100px] left-0 h-full lg:h-auto
                w-[280px] bg-white z-50 lg:z-auto
                transform transition-transform duration-300 ease-in-out
                ${openFilter ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0
                lg:self-start lg:max-h-[calc(100vh-120px)]
              `}
              >
                <div className="bg-white rounded-lg p-6 pl-2 lg:pl-0 h-full lg:h-auto lg:overflow-y-auto">
                  {/* MOBILE/TABLET HEADER */}
                  <div className="flex items-center justify-between mb-6 lg:hidden">
                    <h2 className="text-lg font-roboto font-[600] text-black">
                      Exterior Wood Doors
                    </h2>
                    <button
                      onClick={() => setOpenFilter(false)}
                      className="text-gray-600 hover:text-black"
                    >
                      <FiX className="text-xl" />
                    </button>
                  </div>

                  {/* DESKTOP HEADER */}
                  <h2 className="text-xl font-roboto font-[600] text-black mb-6 hidden md:block">
                    Exterior Wood Doors
                  </h2>

                  <nav className="space-y-0">
                    {[
                      "Contemporary Collection",
                      "Craftsman Collection",
                      "Exterior French Doors",
                      "Waterbarrier",
                      "Entry Doors",
                      "Half Lite Doors",
                      "Exterior Panel Doors",
                    ].map((item, index) => (
                      <div key={item}>
                        <a
                          href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                          onClick={() => setOpenFilter(false)}
                          className="block py-3 text-sm font-roboto font-[400] text-gray-700 hover:text-[#FF6E4A] transition-colors"
                        >
                          {item}
                        </a>
                        {index < 6 && (
                          <div className="border-t border-gray-200"></div>
                        )}
                      </div>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* RIGHT CONTENT */}
              <div className="flex-1 w-full space-y-8">
                {loading && (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6E4A]"></div>
                  </div>
                )}
                {error && (
                  <p className="text-red-600 text-sm md:text-base font-roboto">
                    {error}
                  </p>
                )}

                {!loading && !error && (
                  <>
                    {/* Group doors by doorType — show ALL fetched doors,
                        ordered by the preferred list first, then any extras */}
                    {(() => {
                      const preferredOrder = [
                        "Contemporary Collection",
                        "Craftsman Collection",
                        "Exterior French Doors",
                        "Waterbarrier",
                        "Entry Doors",
                        "Half Lite Doors",
                        "Exterior Panel Doors",
                      ];
                      // Collect any doorType from DB not in the preferred list
                      const extraTypes = Array.from(
                        new Set(
                          doors
                            .map((d) => d.doorType)
                            .filter(
                              (t) =>
                                t &&
                                !preferredOrder.some(
                                  (p) =>
                                    normalizeDoorType(p) ===
                                    normalizeDoorType(t),
                                ),
                            ),
                        ),
                      );
                      return [...preferredOrder, ...extraTypes];
                    })().map((doorType) => {
                      const doorsInType = doors.filter(
                        (door) =>
                          normalizeDoorType(door.doorType) ===
                          normalizeDoorType(doorType),
                      );
                      if (doorsInType.length === 0) return null;

                      const sectionId = doorType
                        .toLowerCase()
                        .replace(/\s+/g, "-");

                      return (
                        <section
                          key={doorType}
                          id={sectionId}
                          className="mb-16 scroll-mt-24"
                        >
                          <h2 className="text-[20px] md:text-[28px] font-roboto font-[500] text-[#FF6E4A] mb-6 leading-tight">
                            {doorType}
                          </h2>
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3">
                            {doorsInType.map((door) => (
                              <div
                                key={door._id}
                                className="relative group cursor-pointer"
                                onClick={() => handleDoorClick(door, doorType)}
                              >
                                <div className="w-full h-48 rounded-lg  group-hover:border-[#FF6E4A] transition-colors overflow-hidden flex items-center justify-center ">
                                  {door.imageUrl ? (
                                    <DoorImage
                                      rawSrc={door.imageUrl}
                                      alt={door.name}
                                      className="w-full h-full object-contain transition-transform group-hover:scale-105"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = "none";
                                      }}
                                    />
                                  ) : (
                                    <span className="text-gray-300 text-xs text-center px-2">No image</span>
                                  )}
                                </div>
                                <div className="mt-2 px-1 min-h-[2.5rem] flex flex-col justify-center gap-0.5">
                                  {(door.skuCode ?? door.sku_code) && (
                                    <p className="text-sm font-roboto font-[700] text-black text-center">
                                      {door.skuCode ?? door.sku_code}
                                    </p>
                                  )}
                                  <p className="text-xs font-roboto font-[400] text-[#3B3B3B] text-center line-clamp-2 break-words">
                                    {door.name}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </section>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Door Preview Modal */}
      {isModalOpen && currentDoorGroup.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          {/* Modal Container */}
          <div
            className="relative w-full h-full flex items-center justify-center p-4 md:p-8"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const diff = touchStartX.current - e.changedTouches[0].clientX;
              if (Math.abs(diff) > 50) {
                if (diff > 0) handleNext();
                else handlePrev();
              }
              touchStartX.current = null;
            }}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="fixed top-4 right-4 z-20 text-white hover:text-[#FF6E4A] transition-colors bg-black/60 rounded-full p-3 hover:bg-black/80"
              aria-label="Close"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Previous Button */}
            {currentDoorGroup.length > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-2 md:left-8 z-20 text-white hover:text-[#FF6E4A] transition-all bg-black/60 rounded-full p-2 md:p-3 hover:bg-black/80 hover:scale-110"
                aria-label="Previous"
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}

            {/* Next Button */}
            {currentDoorGroup.length > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-2 md:right-8 z-20 text-white hover:text-[#FF6E4A] transition-all bg-black/60 rounded-full p-2 md:p-3 hover:bg-black/80 hover:scale-110"
                aria-label="Next"
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}

            {/* Image Container */}
            <div className="flex flex-col items-center justify-center w-full h-full max-w-7xl">
              {currentDoorGroup[currentDoorIndex]?.imageUrl && (
                <>
                  <DoorImage
                    key={currentDoorIndex}
                    rawSrc={currentDoorGroup[currentDoorIndex]?.imageUrl}
                    alt={currentDoorGroup[currentDoorIndex].name}
                    className="w-auto h-auto max-w-[90vw] max-h-[55vh] md:max-w-[75vw] md:max-h-[65vh] lg:max-w-[65vw] lg:max-h-[70vh] object-contain"
                  />

                  {/* Door Info */}
                  <div className="mt-4 md:mt-6 text-center text-white">
                    <p className="text-base md:text-lg lg:text-xl font-roboto font-[600]">
                      {currentDoorGroup[currentDoorIndex]?.name}
                    </p>
                    <p className="text-xs md:text-sm font-roboto font-[400] text-gray-300 mt-1 md:mt-2">
                      {currentDoorIndex + 1} / {currentDoorGroup.length}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ExteriorWoodPage;
