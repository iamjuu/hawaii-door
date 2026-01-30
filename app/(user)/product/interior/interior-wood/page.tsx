"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";
import {
  interiorDoor1,
  ProductFootericoncheck,
  ProductFootericonstar,
  StartGray,
  StartColor,
  ComfortGray,
  ComfortColor,
  DoorGray,
  DoorColor,
  SettingGray,
  SettingColor,
} from "@/public/assets";
import HeroSection from "../../components/herosection";
import Image from "next/image";
import Heading from "@/app/(user)/home/components/header";

interface Door {
  _id: string;
  name: string;
  price: number;
  category: string;
  doorType: string;
  imageUrl?: string[];
  description?: string;
  inStock?: boolean;
}

const InteriorWoodPage = () => {
  const [doors, setDoors] = useState<Door[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openFilter, setOpenFilter] = useState(false);

  // Modal state for door preview
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDoorIndex, setCurrentDoorIndex] = useState(0);
  const [currentDoorGroup, setCurrentDoorGroup] = useState<Door[]>([]);

  useEffect(() => {
    const fetchDoors = async () => {
      try {
        setLoading(true);
        // Reduced limit to 100 to avoid MongoDB memory issues
        const response = await fetch(
          "/api/products?category=interior&limit=100",
        );
        const data = await response.json();

        if (data.success) {
          setDoors(data.data || []);
        } else {
          setError(data.message || "Failed to fetch doors");
        }
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
    const doorsInType = doors.filter((d) => d.doorType === doorType);
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

  // AWS hero (commented out): "https://hawaai-doors-bucket.s3.us-west-2.amazonaws.com/uploads/1769351030278-hero_wood-interior.webp"
  const bgImage = "/assets/product/Interior Wood Stile & Rail.svg";
  const contant = "Interior Wood Stile & Rail";
  const para =
    "Interior Solid Wood Doors provide the ultimate versatility in design, style, and size. Wood doors are available in a variety of wood species and glass options,allowing you to find the perfect door for your needs.";
  const features = [
    {
      text: "Crafted with precision",
      iconGray: StartGray,
      iconColor: StartColor,
    },
    {
      text: "Beauty that lasts",
      iconGray: ComfortGray,
      iconColor: ComfortColor,
    },
    {
      text: "Wide design selection",
      iconGray: DoorGray,
      iconColor: DoorColor,
    },
    {
      text: "Personalised detailing",
      iconGray: SettingGray,
      iconColor: SettingColor,
    },
  ];

  return (
    <>
      <Navbar />
      <section id="overview">
        <HeroSection
          contant={contant}
          bgImage={bgImage}
          para={para}
          features={features}
        />{" "}
      </section>

      {/* INTRO SECTION */}
      <section className="w-full bg-white py-10 sm:py-12 md:py-[50px]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[60px]">
          <div className="max-w-[1400px] 2xl:mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
              {/* LEFT CONTENT */}
              <div className="flex-1 space-y-9">
                <div>
                  <h1 className="text-[23px] md:text-[46px] font-roboto font-[500] text-black leading-[32px] md:leading-[58px] mb-10">
                    Unmatched Versatility with Interior Solid Wood Doors
                  </h1>
                  <p className="text-sm md:text-[16px] font-roboto font-[300] text-[#666666] leading-relaxed">
                    Interior solid wood doors deliver unmatched flexibility in
                    design, style, and size. These wood doors come in a wide
                    range of species and glass options, helping you choose the
                    ideal door for your space, whether you need a standard style
                    or a fully custom, one-of-a-kind design.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[16px] md:text-[28px] font-roboto font-[500] text-black tracking-wide md:mb-6">
                    Key Benefits of Our Wood Doors:
                  </h3>
                  <ul className="space-y-5 list-disc pl-5">
                    <li className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                      <span className="font-semibold">Diverse Styles:</span>{" "}
                      Choose from a wide array of designs to match your interior
                      decor.
                    </li>
                    <li className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                      <span className="font-semibold">
                        Customizable Options:
                      </span>{" "}
                      Consider unique customizations to create a door that is
                      truly your own.
                    </li>
                    <li className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                      <span className="font-semibold">
                        Quality Craftsmanship:
                      </span>{" "}
                      Enjoy the superior craftsmanship that ensures durability
                      and aesthetic appeal.
                    </li>
                  </ul>
                </div>

                <div className="space-y-6">
                  <h2 className="text-[20px] md:text-[28px] font-roboto font-[500] text-black leading-tight">
                    Explore Our Door Collections
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-[16px] md:text-[18px] font-roboto font-[600] text-black uppercase mb-2 md:mb-4">
                        PANEL DOORS
                      </h3>
                      <p className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                        Our panel doors offer a timeless solution, featuring
                        both classic and modern designs that suit a wide range
                        of interior spaces.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-[16px] md:text-[18px] font-roboto font-[600] text-black uppercase mb-2 md:mb-4">
                        DECORATIVE FRENCH DOORS
                      </h3>
                      <p className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                        Add a sense of elegance to your home with our decorative
                        French doors, designed with detailed styling and
                        high-quality privacy and textured glass options.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT IMAGE */}
              <div className="flex-1 flex items-stretch justify-center lg:justify-end min-w-0">
                <div className="relative w-full min-h-[400px] md:min-h-[600px] h-full">
                  <Image
                    src={interiorDoor1}
                    alt="Interior Solid Wood Door"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STOCK INFO */}
      <section className="w-full bg-white py-10 sm:py-12 md:py-[50px]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[60px]">
          <div className="max-w-[1400px] 2xl:mx-auto">
            <h2 className="text-[23px] md:text-[32px] font-roboto font-[500] text-black mb-4 leading-tight">
              In-Stock at Hawaii Western Door Products
            </h2>
            <p className="text-[#666666]  text-[16px] leading-[26px]  font-light mb-4">
              The product selections listed are included in our stocking
              program. Specifications are subject to change without prior
              notice. Please contact your Hawaii Western Door Products
              representative to confirm availability, lead times, and additional
              details.
            </p>
            <p className="text-[#666666]  text-[16px] leading-[26px]  font-light">
              Please be aware that all doors ship unfinished. The images below
              show doors after finishing. Natural wood variation means each door
              will look unique, and stain results vary by species. We suggest
              consulting a coatings professional for proper finishing options
              and application guidance.
            </p>
          </div>
        </div>
      </section>

      {/* MOBILE FILTER BUTTON - STICKY */}
      <button
        onClick={() => setOpenFilter(true)}
        className="lg:hidden fixed top-[80px] left-6 z-30 flex items-center gap-2 border bg-[#b7d7a8] border-gray-300 rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#a8c798] transition-colors shadow-lg"
      >
        {/* FILTER ICON (SVG – no library) */}
        <svg
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 5h12M5 9h8M7 13h4" />
        </svg>
        Filter
      </button>

      {/* OVERLAY */}
      {openFilter && (
        <div
          onClick={() => setOpenFilter(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* MAIN CONTENT */}
      <main className="w-full bg-white py-10 sm:py-12 md:py-[50px] ">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[60px]">
          <div className="max-w-[1400px] 2xl:mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* SIDEBAR */}
            <aside
              className={`
              fixed lg:sticky top-0 lg:top-[100px] left-0 h-full lg:h-auto
              w-[280px] bg-white z-50 lg:z-auto
              transform transition-transform duration-300
              ${openFilter ? "translate-x-0" : "-translate-x-full"}
              lg:translate-x-0
              lg:self-start lg:max-h-[calc(100vh-120px)]
            `}
            >
              <div className="rounded-lg p-6 pl-2 lg:pl-0 h-full lg:h-auto lg:overflow-y-auto">
                <div className="flex justify-between items-center mb-6 lg:hidden">
                  <h2 className="font-roboto font-[600] text-black text-lg">
                    Interior Wood Doors
                  </h2>
                  <button
                    onClick={() => setOpenFilter(false)}
                    className="text-gray-600 hover:text-black text-xl"
                  >
                    ✕
                  </button>
                </div>

                <h2 className="text-xl font-roboto font-[600] text-black mb-6 hidden lg:block">
                  Interior Wood Doors
                </h2>

                {[
                  "Overview",
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
                ].map((item, i) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => setOpenFilter(false)}
                    className="block py-3 text-sm font-roboto font-[400] text-gray-700 hover:text-[#FF6E4A] border-b border-gray-200 last:border-b-0 transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </aside>

            {/* CONTENT */}
            <div className="flex-1">
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
                  {/* Overview Section */}
                  {/* <section i className="mb-16 scroll-mt-24">
                    <h2 className="text-[23px] md:text-[32px] font-roboto font-[500] text-black mb-4 leading-tight">
                      Overview
                    </h2>
                    <p className="text-sm md:text-base font-roboto font-[400] text-[#3B3B3B]">
                      Browse our collection of interior wood doors organized by
                      type. Each door is crafted with precision and quality
                      materials.
                    </p>
                  </section> */}

                  {/* Group doors by doorType */}
                  {[
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
                  ].map((doorType) => {
                    const doorsInType = doors.filter(
                      (door) => door.doorType === doorType,
                    );
                    if (doorsInType.length === 0) return null;

                    const sectionId = doorType
                      .toLowerCase()
                      .replace(/\s+/g, "-");

                    return (
                      <section
                        key={doorType}
                        id={sectionId}
                        className="mb-16 scroll-mt-24 pt-22"
                      >
                        <h2 className="text-[20px] md:text-[28px] font-roboto font-[500]  mb-6 leading-tight text-[#ff6e4a]">
                          {doorType}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3">
                          {doorsInType.map((door) => (
                            <div
                              key={door._id}
                              className="relative group cursor-pointer"
                              onClick={() => handleDoorClick(door, doorType)}
                            >
                              {door.imageUrl && door.imageUrl[0] && (
                                <div className="w-full h-48 rounded-lg  border-gray-200 group-hover:border-[#FF6E4A] transition-colors overflow-hidden flex items-center justify-center ">
                                  <img
                                    src={door.imageUrl[0]}
                                    alt={door.name}
                                    className="w-full h-full object-contain transition-transform group-hover:scale-105"
                                  />
                                </div>
                              )}
                              <div className="mt-2">
                                {/* <p className="text-sm font-roboto font-[500] text-black truncate text-center ">{door.name}</p> */}
                                {door.description && (
                                  <p className="text-xs font-roboto font-[400] text-[#3B3B3B] line-clamp-2 mt-1 text-center">
                                    {door.description}
                                  </p>
                                )}
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
              {currentDoorGroup[currentDoorIndex]?.imageUrl?.[0] && (
                <>
                  <img
                    key={currentDoorIndex}
                    src={currentDoorGroup[currentDoorIndex].imageUrl[0]}
                    alt={currentDoorGroup[currentDoorIndex].name}
                    className="w-auto h-auto max-w-[75%] max-h-[55vh] md:max-w-[70%] md:max-h-[65vh] lg:max-w-[65%] lg:max-h-[70vh] object-contain"
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

export default InteriorWoodPage;
