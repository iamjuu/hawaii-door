
"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Heading from "./header";
import { ProductFootericonDoor, ProductFootericonSettings, ProductFootericonTruck, ProductFootericonDoorGreen, ProductFootericonSettingsGreen, ProductFootericonTruckGreen, TickGreen, TickGray } from "@/public/assets";

// Using public paths - NO SPACES in filenames for production compatibility
const Door1 = "/assets/images/landing/door22.png";
const Door3 = "/assets/images/landing/door33.png";
const Door4 = "/assets/images/landing/door41.png";


const DoorCategories = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [windowWidth, setWindowWidth] = useState(1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const categories = [
    {
      id: 1,
      title: "Wood Core Door",
      image: Door1,
    },
    {
      id: 2,
      title: "Fibre Glass Door",
      image: Door4,
    },
    {
      id: 3,
      title: "Hollow Core Doors",
      image: Door3,
    },
    {
      id: 4,
      title: "Solid Wood Door",
      image: Door4,
    },

  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % categories.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length);
  };

  const getTranslateX = (position: number) => {
    if (windowWidth < 640) return position * 170; // sm: smaller spacing
    if (windowWidth < 768) return position * 220; // md: medium spacing
    if (windowWidth < 1024) return position * 280; // lg: larger spacing
    if (windowWidth < 1280) return position * 350; // xl: even larger
    return position * 380; // 2xl: maximum spacing
  };

  const getScale = (isCurrent: boolean) => {
    if (windowWidth < 640) return isCurrent ? 1 : 0.7; // sm: more contrast
    if (windowWidth < 768) return isCurrent ? 1 : 0.75; // md
    if (windowWidth < 1024) return isCurrent ? 1.05 : 0.85; // lg
    return isCurrent ? 1.1 : 0.9; // xl+
  };

  const getVisibleCards = () => {
    const visible = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + categories.length) % categories.length;
      visible.push({ ...categories[index], position: i });
    }
    return visible;
  };

  return (
    <div className="w-full py-10 sm:py-12 md:py-[0px] md:pt-[50px] font-inter ">

      {/* MAIN CONTENT – constrained */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[60px]">
        <div className="max-w-[1400px] 2xl:mx-auto gap-6 sm:gap-8 md:gap-[46px] flex flex-col">
          {/* Header */}
          <Heading heading="Door Categories" subheading="Explore our full line of pre-hung wood and fiberglass doors, organized by material and style." className="" />

          {/* Carousel */}
          <div className="relative flex items-center justify-center">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="absolute left-0 sm:left-2 md:left-4 lg:left-0 z-20 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 ml-2 sm:ml-3 md:ml-4 rounded-full bg-gray-400 hover:bg-gray-500 text-white flex items-center justify-center transition-all shadow-lg"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
            </button>

            {/* Cards Container */}
            <div className="relative w-full max-w-5xl h-[320px] sm:h-[350px] md:h-[450px] lg:h-[500px] flex items-center justify-center overflow-hidden">
              {getVisibleCards().map((category) => {
                const isCurrent = category.position === 0;

                return (
                  <div
                    key={category.id}
                    className={`absolute transition-all duration-500 ease-out ${isCurrent
                      ? "z-30 opacity-100"
                      : "z-10 opacity-30 sm:opacity-40 md:opacity-50 lg:opacity-60"
                      }`}
                    style={{
                      transform: `translateX(${getTranslateX(category.position)}px) scale(${getScale(isCurrent)})`,
                    }}
                  >
                    <div className="relative w-40 h-[280px] sm:w-48 sm:h-[300px] md:w-64 md:h-[380px] lg:w-80 lg:h-[420px] rounded-xl md:rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-cover rounded-xl md:rounded-2xl"
                        sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, (max-width: 1024px) 256px, 320px"
                        priority={isCurrent}
                        quality={85}
                        loading={isCurrent ? "eager" : "lazy"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-3 md:p-4 lg:p-6 text-white">
                        <div className="flex flex-col sm:flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-roboto font-medium">
                            {category.title}
                          </h3>
                          {isCurrent && (
                            <Link href={"/product"}>
                              <button className="group relative inline-flex items-center overflow-hidden rounded-full bg-[#B6D78A] px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-[#000000] whitespace-nowrap">
                                {/* Hover overlay */}
                                <span
                                  className="
                              absolute inset-0
                              bg-black
                              origin-bottom
                              scale-y-0
                              transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                              group-hover:scale-y-100
                            "
                                />
                                {/* Content */}
                                <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                                  View Details
                                </span>
                              </button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="absolute right-0 sm:right-2 md:right-4 lg:right-0 z-20 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 mr-2 sm:mr-3 md:mr-4 rounded-full bg-gray-400 hover:bg-gray-500 text-white flex items-center justify-center transition-all shadow-lg"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-5 md:mt-8 lg:mt-12">
            {categories.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 sm:h-2 rounded-full transition-all ${idx === currentIndex
                  ? "w-6 sm:w-8 bg-[#FF6E4A]"
                  : "w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* FULL WIDTH FOOTER STRIP – Responsive */}
      <div className="relative w-full flex flex-col md:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-8 lg:gap-16 py-4 sm:py-5 md:py-0 min-h-[60px] md:h-[68px] bg-[#F6F5F1] group cursor-pointer mt-8 sm:mt-10 md:mt-[50px] lg:mt-[50px] mb-0  transition-all duration-300 ">
        <div className="py-3 sm:py-4 md:py-[25px] flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center">

          <p className="flex items-center gap-3 sm:gap-3.5 md:gap-4 text-xs sm:text-sm md:text-base">

            <div className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8">
              <Image src={ProductFootericonDoor} className="w-6 h-6 sm:w-7 sm:h-7 md:size-[32px] group-hover:opacity-0 transition-opacity duration-300" alt="Door" width={100} height={100} />
              <Image src={ProductFootericonDoorGreen} className="w-6 h-6 sm:w-7 sm:h-7 md:size-[32px] absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" alt="Door" width={100} height={100} />
            </div>

            <span className="whitespace-nowrap">Custom Doors</span>


          </p>

          <p className="flex items-center gap-3 sm:gap-3.5 md:gap-4 text-xs sm:text-sm md:text-base">

            <div className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8">
              <Image src={ProductFootericonSettings} className="w-6 h-6 sm:w-7 sm:h-7 md:size-[32px] group-hover:opacity-0 transition-opacity duration-300" alt="Settings" width={100} height={100} />
              <Image src={ProductFootericonSettingsGreen} className="w-6 h-6 sm:w-7 sm:h-7 md:size-[32px] absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" alt="Settings" width={100} height={100} />
            </div>
            <span className="whitespace-nowrap">Custom Jambs</span>


          </p>

          <p className="flex items-center gap-3 sm:gap-3.5 md:gap-4 text-xs sm:text-sm md:text-base">

            <div className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8">
              <Image src={TickGray} className="w-6 h-6 sm:w-7 sm:h-7 md:size-[32px] group-hover:opacity-0 transition-opacity duration-300" alt="Truck" width={100} height={100} />
              <Image src={TickGreen} className="w-6 h-6 sm:w-7 sm:h-7 md:size-[32px] absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" alt="Truck" width={100} height={100} />
            </div>

            <span className="whitespace-nowrap">Complete Precision</span>

          </p>
        </div>
      </div>

    </div>

  );
};

export default DoorCategories;
