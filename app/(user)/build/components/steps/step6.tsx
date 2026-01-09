"use client";

import Image from "next/image";
import { useState } from "react";
import lhra from "../../../../../public/assets/images/dummy/Lhra.png";
import lha from "../../../../../public/assets/images/dummy/Lha.png";
import rha from "../../../../../public/assets/images/dummy/rha.png";
import rhra from "../../../../../public/assets/images/dummy/rhra.png";

interface StepProps {
  quoteData: any;
  setQuoteData: (data: any) => void;
}

const Step6 = ({ quoteData, setQuoteData }: StepProps) => {
  const [selectedHandling, setSelectedHandling] = useState<string | null>(
    quoteData.doorHandling || null
  );
  const [selectedRadius, setSelectedRadius] = useState<string | null>(
    quoteData.hingeRadius || null
  );
  const [selectedType, setSelectedType] = useState<string | null>(
    quoteData.hingeType || null
  );

  const handleHandlingSelect = (handling: string) => {
    setSelectedHandling(handling);
    setQuoteData({
      ...quoteData,
      doorHandling: handling,
    });
  };

  const handleRadiusSelect = (radius: string) => {
    setSelectedRadius(radius);
    setQuoteData({
      ...quoteData,
      hingeRadius: radius,
    });
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setQuoteData({
      ...quoteData,
      hingeType: type,
    });
  };

  return (
    <div className="mt-[50px] mb-[50px] max-w-[900px]">
      <h2 className="text-[20px] md:text-[32px] font-roboto font-[500] mb-5 md:mb-8 text-black">Door Handling & Hinges</h2>

      <div className="max-w-[900px] w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 1: LHRA */}
        <div
          onClick={() => handleHandlingSelect("LHRA")}
          className={`
            relative border-2 rounded-lg p-4 cursor-pointer transition-all
             hover:shadow-lg
            ${
              selectedHandling === "LHRA"
                ? "shadow-lg border-gray-200 bg-white"
                : "border-gray-200 bg-white"
            }
          `}
        >
          {/* Selected Badge */}
          {selectedHandling === "LHRA" && (
            <div className="absolute top-3 right-3 z-10">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
          )}
          <div className="relative w-full max-w-[320px] mx-auto aspect-[4/3] mb-4">
            <Image
              src={lhra}
              alt="LHRA"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-[16.6px] font-semibold text-black font-roboto mb-1 text-center">LHRA</p>
          <p className="text-[11.96px] text-[#000000] font-light text-center">Left Hand Reverse Active</p>

        </div>

        {/* 2: LHA */}
        <div
          onClick={() => handleHandlingSelect("LHA")}
          className={`
            relative border-2 rounded-lg p-4 cursor-pointer transition-all
             hover:shadow-lg
            ${
              selectedHandling === "LHA"
                ? "shadow-lg border-gray-200 bg-white"
                : "border-gray-200 bg-white"
            }
          `}
        >
          {/* Selected Badge */}
          {selectedHandling === "LHA" && (
            <div className="absolute top-3 right-3 z-10">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
          )}
          <div className="relative w-full max-w-[320px] mx-auto aspect-[4/3] mb-4">
            <Image
              src={lha}
              alt="LHA"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-[16.6px] font-semibold text-black font-roboto mb-1 text-center">LHA</p>
          <p className="text-[11.96px] text-[#000000] font-light text-center">Left Hand Active</p>
        </div>

        {/* 3: RHA */}
        <div
          onClick={() => handleHandlingSelect("RHA")}
          className={`
            relative border-2 rounded-lg p-4 cursor-pointer transition-all
             hover:shadow-lg
            ${
              selectedHandling === "RHA"
                ? "shadow-lg border-gray-200 bg-white"
                : "border-gray-200 bg-white"
            }
          `}
        >
          {/* Selected Badge */}
          {selectedHandling === "RHA" && (
            <div className="absolute top-3 right-3 z-10">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
          )}
          <div className="relative w-full max-w-[320px] mx-auto aspect-[4/3] mb-4">
            <Image
              src={rha}
              alt="RHA"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-[16.6px] font-semibold text-black font-roboto mb-1 text-center">RHA</p>
          <p className="text-[11.96px] text-[#000000] font-light text-center">Right Hand Active</p>
        </div>

        {/* 4: RHRA */}
        <div
          onClick={() => handleHandlingSelect("RHRA")}
          className={`
            relative border-2 rounded-lg p-4 cursor-pointer transition-all
            hover:shadow-lg
            ${
              selectedHandling === "RHRA"
                ? "shadow-lg border-gray-200 bg-white"
                : "border-gray-200 bg-white"
            }
          `}
        >
          {/* Selected Badge */}
          {selectedHandling === "RHRA" && (
            <div className="absolute top-3 right-3 z-10">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
          )}
          <div className="relative w-full max-w-[320px] mx-auto aspect-[4/3] mb-4">
            <Image
              src={rhra}
              alt="RHRA"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-[16.6px] font-semibold text-black font-roboto mb-1 text-center">RHRA</p>
          <p className="text-[11.96px] text-[#000000] font-light text-center">Right Hand Reverse Active</p>
        </div>
      </div>

      {/* Hinge Radius */}
      <div className="mt-10">
        <p className="text-lg font-semibold text-gray-900 mb-3">Hinge Radius</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => handleRadiusSelect("1/4")}
            className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
              selectedRadius === "1/4"
                ? "border-orange-500 text-orange-600"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            1/4&quot; Round Corner
          </button>
          <button
            type="button"
            onClick={() => handleRadiusSelect("5/8")}
            className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
              selectedRadius === "5/8"
                ? "border-orange-500 text-orange-600"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            5/8&quot; Round Corner
          </button>
          <button
            type="button"
            onClick={() => handleRadiusSelect("square")}
            className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
              selectedRadius === "square"
                ? "border-orange-500 text-orange-600"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            Square
          </button>
        </div>
      </div>

      {/* Hinge Type */}
      <div className="mt-8">
        <p className="text-lg font-semibold text-gray-900 mb-3">Hinge Type</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleTypeSelect("residential")}
            className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
              selectedType === "residential"
                ? "border-orange-500 text-orange-600"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            Residential
          </button>
          <button
            type="button"
            onClick={() => handleTypeSelect("commercial")}
            className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
              selectedType === "commercial"
                ? "border-orange-500 text-orange-600"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            Commercial
          </button>
        </div>
      </div>

      {/* Hinge Location (from top) */}
      <div className="mt-8">
        <div className="max-w-[900px] w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Hinge Location */}
          <div>
            <p className="text-lg font-semibold text-gray-900 mb-1">
              Hinge Location (from top)
            </p>
            <p className="text-xs text-gray-500 mb-3">Bottom to bottom</p>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Hinge 1 location"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500"
              />
              <input
                type="text"
                placeholder="Hinge 2 location"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500"
              />
              <input
                type="text"
                placeholder="Hinge 3 location"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Right: Backset */}
          <div>
            <p className="text-lg font-semibold text-gray-900 mb-2">Backset</p>
            <input
              type="text"
              placeholder="Measure from door edge to hinge edge"
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step6;