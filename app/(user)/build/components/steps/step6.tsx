"use client";

import Image from "next/image";
import { useState } from "react";
import lhra from "../../../../../public/assets/images/dummy/Lhra.png";
import lha from "../../../../../public/assets/images/dummy/Lha.png";
import rha from "../../../../../public/assets/images/dummy/rha.png";
import rhra from "../../../../../public/assets/images/dummy/rhra.png";
import rounded1 from "../../../../../public/assets/images/dummy/roundcorner11.png";
import rounded2 from "../../../../../public/assets/images/dummy/roundcorner22.png";
import square from "../../../../../public/assets/images/dummy/square2.png";
import residential from "../../../../../public/assets/images/dummy/residential1.png";
import commercial from "../../../../../public/assets/images/dummy/commercial1.png";
interface StepProps {
  quoteData: any;
  setQuoteData: (data: any) => void;
  onNext?: () => void;
}

const Step6 = ({ quoteData, setQuoteData, onNext }: StepProps) => {
  const [selectedHandling, setSelectedHandling] = useState<string | null>(
    quoteData.doorHandling || null
  );
  const [selectedRadius, setSelectedRadius] = useState<string | null>(
    quoteData.hingeRadius || null
  );
  const [selectedType, setSelectedType] = useState<string | null>(
    quoteData.hingeType || null
  );
  const [hingeLocation1, setHingeLocation1] = useState<string>(
    quoteData.hingeLocation1 || ""
  );
  const [hingeLocation2, setHingeLocation2] = useState<string>(
    quoteData.hingeLocation2 || ""
  );
  const [hingeLocation3, setHingeLocation3] = useState<string>(
    quoteData.hingeLocation3 || ""
  );
  const [backset, setBackset] = useState<string>(
    quoteData.backset || ""
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

  const handleHingeLocation1Change = (value: string) => {
    setHingeLocation1(value);
    setQuoteData({
      ...quoteData,
      hingeLocation1: value,
    });
  };

  const handleHingeLocation2Change = (value: string) => {
    setHingeLocation2(value);
    setQuoteData({
      ...quoteData,
      hingeLocation2: value,
    });
  };

  const handleHingeLocation3Change = (value: string) => {
    setHingeLocation3(value);
    setQuoteData({
      ...quoteData,
      hingeLocation3: value,
    });
  };

  const handleBacksetChange = (value: string) => {
    setBackset(value);
    setQuoteData({
      ...quoteData,
      backset: value,
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
        <div className="flex items-center gap-2 mb-3">
          <p className="text-[16px] md:text-[20px] font-medium text-black font-montserrat">Hinge Radius</p>
          <div className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">?</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 w-full max-w-[900px] gap-[15px]">
          <button
            type="button"
            onClick={() => handleRadiusSelect("1/4")}
            className={`w-full font-roboto px-3 py-2 rounded-[10px] border-2 font-medium transition-all flex items-center justify-between ${
              selectedRadius === "1/4" ? "border-orange-500 text-black" : "border-[#E9EAEE] hover:border-orange-300 text-black bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative w-6 h-6 md:w-8 md:h-8 rounded">
                <Image
                  src={rounded1}
                  alt="1/4 Round Corner"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-[13px] md:text-[16px] font-normal text-black">1/4&quot; Round Corner</span>
            </div>
            <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center ${
              selectedRadius === "1/4" ? "border-orange-500" : "border-gray-300"
            }`}>
              {selectedRadius === "1/4" && (
                <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-orange-500"></div>
              )}
            </div>
          </button>
          <button
            type="button"
            onClick={() => handleRadiusSelect("5/8")}
            className={`w-full font-roboto px-3 py-2 rounded-[10px] border-2 font-medium transition-all flex items-center justify-between ${
              selectedRadius === "5/8" ? "border-orange-500 text-black" : "border-[#E9EAEE] hover:border-orange-300 text-black bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative w-6 h-6 md:w-8 md:h-8 rounded">
                <Image
                  src={rounded2}
                  alt="5/8 Round Corner"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-[13px] md:text-[16px] font-normal text-black">5/8&quot; Round Corner</span>
            </div>
            <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center ${
              selectedRadius === "5/8" ? "border-orange-500" : "border-gray-300"
            }`}>
              {selectedRadius === "5/8" && (
                <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-orange-500"></div>
              )}
            </div>
          </button>
          <button
            type="button"
            onClick={() => handleRadiusSelect("square")}
            className={`w-full font-roboto px-3 py-2 rounded-[10px] border-2 font-medium transition-all flex items-center justify-between ${
              selectedRadius === "square" ? "border-orange-500 text-black" : "border-[#E9EAEE] hover:border-orange-300 text-black bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative md:w-8 md:h-8 w-6 h-6 rounded">
                <Image
                  src={square}
                  alt="Square"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-[13px] md:text-[16px] font-normal text-black">Square</span>
            </div>
            <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center ${
              selectedRadius === "square" ? "border-orange-500" : "border-gray-300"
            }`}>
              {selectedRadius === "square" && (
                <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-orange-500"></div>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Hinge Type */}
      <div className="mt-8 max-w-[600px]">
        <p className="text-[16px] md:text-[20px] font-medium text-black mb-3 font-montserrat">Hinge Type</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleTypeSelect("residential")}
            className={`w-full font-roboto px-3 py-2 rounded-[10px] border-2 font-medium transition-all flex items-center justify-between ${
              selectedType === "residential" ? "border-orange-500 text-black" : "border-[#E9EAEE] hover:border-orange-300 text-black bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative w-6 h-6 md:w-8 md:h-8 rounded">
                <Image
                  src={residential}
                  alt="Residential"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-[13px] md:text-[16px] font-normal text-black">Residential</span>
            </div>
            <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center ${
              selectedType === "residential" ? "border-orange-500" : "border-gray-300"
            }`}>
              {selectedType === "residential" && (
                <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-orange-500"></div>
              )}
            </div>
          </button>
          <button
            type="button"
            onClick={() => handleTypeSelect("commercial")}
            className={`w-full font-roboto px-3 py-2 rounded-[10px] border-2 font-medium transition-all flex items-center justify-between ${
              selectedType === "commercial" ? "border-orange-500 text-black" : "border-[#E9EAEE] hover:border-orange-300 text-black bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative w-6 h-6 md:w-8 md:h-8 rounded">
                <Image
                  src={commercial}
                  alt="Commercial"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-[13px] md:text-[16px] font-normal text-black">Commercial</span>
            </div>
            <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center ${
              selectedType === "commercial" ? "border-orange-500" : "border-gray-300"
            }`}>
              {selectedType === "commercial" && (
                <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-orange-500"></div>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Hinge Location (from top) */}
      <div className="mt-8">
        <div className="max-w-[900px] w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Hinge Location */}
          <div>
            <p className="text-[16px] md:text-[20px] font-medium font-montserrat text-black mb-3">
              Hinge Location (from top)
            </p>
          
            <div className="space-y-3">
              <input
                type="text"
                value={hingeLocation1}
                onChange={(e) => handleHingeLocation1Change(e.target.value)}
                placeholder="Hinge 1 location"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500 text-[#717182] font-roboto text-[14px]"
              />
              <input
                type="text"
                value={hingeLocation2}
                onChange={(e) => handleHingeLocation2Change(e.target.value)}
                placeholder="Hinge 2 location"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500 text-[#717182] font-roboto text-[14px]"
              />
              <input
                type="text"
                value={hingeLocation3}
                onChange={(e) => handleHingeLocation3Change(e.target.value)}
                placeholder="Hinge 3 location"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500 text-[#717182] font-roboto text-[14px]"
              />
            </div>
          </div>

          {/* Right: Backset */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <p className="text-[16px] md:text-[20px] font-medium font-montserrat text-black">Backset</p>
              <div className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">?</span>
              </div>
            </div>
            <input
              type="text"
              value={backset}
              onChange={(e) => handleBacksetChange(e.target.value)}
              placeholder="Measure from door edge to hinge edge"
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500 text-[#717182] font-roboto text-[14px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step6;