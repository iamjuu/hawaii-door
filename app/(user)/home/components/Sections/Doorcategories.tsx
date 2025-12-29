
"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
 import Door1 from "../../../../../public/assets/images/landing/Door1 8.02.03 PM.png"
import Door3 from "../../../../../public/assets/images/landing/Door3 8.02.03 PM.png"
import Door4 from "../../../../../public/assets/images/landing/Door4 8.02.03 PM.png"
import Door from "../../../../../public/assets/images/landing/Door.png"
import Settings from "../../../../../public/assets/images/landing/Settings.png"
import Tick from "../../../../../public/assets/images/landing/Tick.png"
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
      image:Door3,
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

  const getTranslateX = (position:any) => {
    if (windowWidth < 768) return position * 200;
    if (windowWidth < 1024) return position * 280;
    return position * 380;
  };

  const getScale = (isCurrent:any) => {
    if (windowWidth < 768) return isCurrent ? 1 : 0.75;
    if (windowWidth < 1024) return isCurrent ? 1.05 : 0.85;
    return isCurrent ? 1.1 : 0.9;
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
    <div className="w-full h-min md:min-h-screen bg-white pt-4 pb-10 md:py-10 ">
      <div className="max-w-7xl md:max-w-full mx-auto">
        {/* Header */}
        <div className="mb-10 pl-5 md:pl-[60px] ">
          <h1 className="text-2xl md:text-4xl font-medium md:font-semibold text-black font-roboto mb-2 md:mb-4">Door Categories</h1>
          {/* <p className="text-sm md:text-lg text-[#3B3B3B] font-roboto max-w-xl">
            Explore our full line of pre-hung wood and fiberglass doors,<br/>
            organized by material and style.
          </p> */}
         <p className="text-sm md:text-lg text-[#3B3B3B] font-roboto max-w-xl pr-2">
  Explore our full line of pre-hung wood and fiberglass doors,
  <span className="hidden md:block"></span>
  organized by material and style.
</p>
        </div>

        {/* Carousel */}
        <div className="relative flex items-center justify-center">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute left-0 md:left-4 lg:left-0 z-20 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 ml-4 md:ml-13 rounded-full bg-gray-400 hover:bg-gray-500 text-white flex items-center justify-center transition-all shadow-lg"
            aria-label="Previous door"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </button>

          {/* Cards Container */}
          <div className="relative w-full max-w-5xl h-[350px] md:h-[450px] lg:h-[500px] flex items-center justify-center overflow-hidden">
            {getVisibleCards().map((category, idx) => {
              const isCurrent = category.position === 0;
              const isLeft = category.position === -1;
              const isRight = category.position === 1;

              return (
                <div
                  key={category.id}
                  className={`absolute transition-all duration-500 ease-out ${
                    isCurrent
                      ? "z-30 scale-100 md:scale-105 lg:scale-110 opacity-100"
                      : "z-10 scale-75 md:scale-85 lg:scale-90 opacity-40 md:opacity-50 lg:opacity-60"
                  }`}
                  style={{
                    transform: `translateX(${getTranslateX(category.position)}px) scale(${getScale(isCurrent)})`,
                  }}
                >
                  <div className="relative w-48 h-[300px] md:w-64 md:h-[380px] lg:w-80  rounded-xl md:rounded-2xl overflow-hidden ">
                    <Image
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover rounded-xl md:rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 lg:p-6 text-white">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h3 className="text-sm md:text-base  flex-shrink-0 font-roboto" >{category.title}</h3>
                        {isCurrent && (
                          <button style={{backgroundColor: '#B6D78A', fontSize: "0.875rem"}} className="hover:bg-[#a3c677] text-gray-900  rounded-full px-3 ">
                            View Details
                          </button>
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
            className="absolute right-0 md:right-4 lg:right-0 z-20 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 mr-4 md:mr-13 rounded-full bg-gray-400 hover:bg-gray-500 text-white flex items-center justify-center transition-all shadow-lg"
            aria-label="Next door"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-5 md:mt-12">
          {categories.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex
                  ? "w-8 bg-orange-500"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="relative w-full min-h-[68px] md:h-[68px] flex flex-col md:flex-row justify-center items-center gap-4 md:gap-16 py-3 md:py-0 bg-[#F6F5F1] group cursor-pointer mt-[50px] md:mt-[75px] mb-0 md:mb-6">

{/* Item 1 */}
<div className="flex  items-center md:flex-row gap-2">
  <Image
    src={Door}
    alt="Use"
    className="w-5 h-5
      sm:w-6 sm:h-6
      md:w-8 md:h-8 filter md:grayscale md:group-hover:grayscale-0 transition-all duration-500"
  />
  <span className=" text-[#585858]  font-roboto text-sm md:text-lg">
  Custom Doors
  </span>
</div>
<div className="flex  items-center md:flex-row gap-2">
  <Image
    src={Tick}
    alt="Use"
    width={32}
    height={32}
    className="w-5 h-5
      sm:w-6 sm:h-6
      md:w-8 md:h-8 filter md:grayscale md:group-hover:grayscale-0 transition-all duration-500"
  />
  <span className=" text-[#585858]  font-roboto text-sm md:text-lg">
  Complete Precision
  </span>
</div>
<div className="flex  items-center md:flex-row gap-2">
  <Image
    src={Settings}
    alt="Use"
    width={32}
    height={32}
    className="w-5 h-5
      sm:w-6 sm:h-6
      md:w-8 md:h-8 filter md:grayscale md:group-hover:grayscale-0 transition-all duration-500"
  />
  <span className=" text-[#585858]  font-roboto text-sm md:text-lg">
  Custom Jambs
  </span>
</div>

</div>
    </div>
  );
};

export default DoorCategories;