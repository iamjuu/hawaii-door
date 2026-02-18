"use client";

import Image from "next/image";
import { useState } from "react";
import lhra from "../../../../../public/assets/images/dummy/Lhra.png";
import lha from "../../../../../public/assets/images/dummy/Lha.png";
import rha from "../../../../../public/assets/images/dummy/rha.png";
import rhra from "../../../../../public/assets/images/dummy/rhra.png";
import lhImage from "../../../../../public/assets/door/LH.png";
import rhImage from "../../../../../public/assets/door/RH.png";
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
    quoteData.doorHandling || null,
  );
  const [selectedRadius, setSelectedRadius] = useState<string | null>(
    quoteData.hingeRadius || null,
  );
  const [selectedType, setSelectedType] = useState<string | null>(
    quoteData.hingeType || null,
  );
  const [hingeLocation1, setHingeLocation1] = useState<string>(
    quoteData.hingeLocation1 || "",
  );
  const [hingeLocation2, setHingeLocation2] = useState<string>(
    quoteData.hingeLocation2 || "",
  );
  const [hingeLocation3, setHingeLocation3] = useState<string>(
    quoteData.hingeLocation3 || "",
  );
  const [backset, setBackset] = useState<string>(quoteData.backset || "");

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

  // Check if it's a single door or double door
  const isSingleDoor = quoteData.doorConfig === "Single Door";

  return (
    <div className="mt-[25px]  w-full mb-[50px] max-w-[900px]">
      <h2 className="text-[20px] md:text-[32px] font-roboto font-[500] mb-5 md:mb-8 text-black">
        Door Handing & Hinges
      </h2>

      {/* Single Door Options (LH and RH) */}
      {isSingleDoor && (
        <div className="max-w-[900px] w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LH - Left Hand */}
          <div
            onClick={() => handleHandlingSelect("LH")}
            className={`
              relative border-2 rounded-lg p-4 cursor-pointer transition-all
              hover:shadow-lg
              ${
                selectedHandling === "LH"
                  ? "shadow-lg border-[#FF6E4A] bg-white"
                  : "border-gray-200 bg-white"
              }
            `}
          >
            <div className="relative w-full max-w-[320px] mx-auto aspect-[4/3] mb-4">
              <Image src={lhImage} alt="LH" fill className="object-contain" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-[16.6px] font-semibold text-black font-roboto mb-1 text-center">
                  LH
                </p>
                <p className="text-[11.96px] text-[#000000] font-light text-center">
                  Left Hand (hinges on left, door swings in)
                </p>
              </div>
              {/* Selected Badge */}
              {selectedHandling === "LH" && (
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#FF6E4A] flex items-center justify-center flex-shrink-0 ml-2">
                  <svg
                    className="w-3 h-3 md:w-4 md:h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* RH - Right Hand */}
          <div
            onClick={() => handleHandlingSelect("RH")}
            className={`
              relative border-2 rounded-lg p-4 cursor-pointer transition-all
              hover:shadow-lg
              ${
                selectedHandling === "RH"
                  ? "shadow-lg border-[#FF6E4A] bg-white"
                  : "border-gray-200 bg-white"
              }
            `}
          >
            <div className="relative w-full max-w-[320px] mx-auto aspect-[4/3] mb-4">
              <Image src={rhImage} alt="RH" fill className="object-contain" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-[16.6px] font-semibold text-black font-roboto mb-1 text-center">
                  RH
                </p>
                <p className="text-[11.96px] text-[#000000] font-light text-center">
                  Right Hand (hinges on right, door swings in)
                </p>
              </div>
              {/* Selected Badge */}
              {selectedHandling === "RH" && (
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#FF6E4A] flex items-center justify-center flex-shrink-0 ml-2">
                  <svg
                    className="w-3 h-3 md:w-4 md:h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Double Door Options (LHRA, LHA, RHA, RHRA) */}
      {!isSingleDoor && (
        <div className="max-w-[900px] w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 1: LHRA */}
          <div
            onClick={() => handleHandlingSelect("LHRA")}
            className={`
            relative border-2 rounded-lg p-4 cursor-pointer transition-all
             hover:shadow-lg
            ${
              selectedHandling === "LHRA"
                ? "shadow-lg border-[#FF6E4A] bg-white"
                : "border-gray-200 bg-white"
            }
          `}
          >
            <div className="relative w-full max-w-[320px] mx-auto aspect-[4/3] mb-4">
              <Image src={lhra} alt="LHRA" fill className="object-contain" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-[16.6px] font-semibold text-black font-roboto mb-1 text-center">
                  LHRA
                </p>
                <p className="text-[11.96px] text-[#000000] font-light text-center">
                  Left Hand Reverse Active
                </p>
              </div>
              {/* Selected Badge */}
              {selectedHandling === "LHRA" && (
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#FF6E4A] flex items-center justify-center flex-shrink-0 ml-2">
                  <svg
                    className="w-3 h-3 md:w-4 md:h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* 2: LHA */}
          <div
            onClick={() => handleHandlingSelect("LHA")}
            className={`
            relative border-2 rounded-lg p-4 cursor-pointer transition-all
             hover:shadow-lg
            ${
              selectedHandling === "LHA"
                ? "shadow-lg border-[#FF6E4A] bg-white"
                : "border-gray-200 bg-white"
            }
          `}
          >
            <div className="relative w-full max-w-[320px] mx-auto aspect-[4/3] mb-4">
              <Image src={lha} alt="LHA" fill className="object-contain" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-[16.6px] font-semibold text-black font-roboto mb-1 text-center">
                  LHA
                </p>
                <p className="text-[11.96px] text-[#000000] font-light text-center">
                  Left Hand Active
                </p>
              </div>
              {/* Selected Badge */}
              {selectedHandling === "LHA" && (
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#FF6E4A] flex items-center justify-center flex-shrink-0 ml-2">
                  <svg
                    className="w-3 h-3 md:w-4 md:h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* 3: RHA */}
          <div
            onClick={() => handleHandlingSelect("RHA")}
            className={`
            relative border-2 rounded-lg p-4 cursor-pointer transition-all
             hover:shadow-lg
            ${
              selectedHandling === "RHA"
                ? "shadow-lg border-[#FF6E4A] bg-white"
                : "border-gray-200 bg-white"
            }
          `}
          >
            <div className="relative w-full max-w-[320px] mx-auto aspect-[4/3] mb-4">
              <Image src={rha} alt="RHA" fill className="object-contain" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-[16.6px] font-semibold text-black font-roboto mb-1 text-center">
                  RHA
                </p>
                <p className="text-[11.96px] text-[#000000] font-light text-center">
                  Right Hand Active
                </p>
              </div>
              {/* Selected Badge */}
              {selectedHandling === "RHA" && (
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#FF6E4A] flex items-center justify-center flex-shrink-0 ml-2">
                  <svg
                    className="w-3 h-3 md:w-4 md:h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* 4: RHRA */}
          <div
            onClick={() => handleHandlingSelect("RHRA")}
            className={`
            relative border-2 rounded-lg p-4 cursor-pointer transition-all
            hover:shadow-lg
            ${
              selectedHandling === "RHRA"
                ? "shadow-lg border-[#FF6E4A] bg-white"
                : "border-gray-200 bg-white"
            }
          `}
          >
            <div className="relative w-full max-w-[320px] mx-auto aspect-[4/3] mb-4">
              <Image src={rhra} alt="RHRA" fill className="object-contain" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-[16.6px] font-semibold text-black font-roboto mb-1 text-center">
                  RHRA
                </p>
                <p className="text-[11.96px] text-[#000000] font-light text-center">
                  Right Hand Reverse Active
                </p>
              </div>
              {/* Selected Badge */}
              {selectedHandling === "RHRA" && (
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#FF6E4A] flex items-center justify-center flex-shrink-0 ml-2">
                  <svg
                    className="w-3 h-3 md:w-4 md:h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hinge Radius */}
      <div className="mt-10">
        <div className="flex items-center gap-2 mb-3">
          <p className="text-[16px] md:text-[20px] font-medium text-black font-montserrat">
            Hinge Radius
          </p>
          <div className="relative group">
            <div className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center cursor-pointer">
              <span className="text-white text-xs font-bold">?</span>
            </div>
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="relative">
                <div className="bg-gray-100 rounded-lg px-4 py-3 shadow-lg w-[300px] md:w-[400px]">
                  <p className="text-sm text-black font-roboto">
                    Hinge radius refers to the curve of the rounded corners on a
                    door hinge, which is measured by the radius of the circle
                    that would be formed if the curve were continued
                  </p>
                </div>
                <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-gray-100"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 w-full max-w-[900px] gap-[15px]">
          <button
            type="button"
            onClick={() => handleRadiusSelect("1/4")}
            className={`w-full font-roboto px-3 py-2 rounded-[10px] border-2 font-medium transition-all flex items-center justify-between ${
              selectedRadius === "1/4"
                ? "border-[#FF6E4A] text-black"
                : "border-[#E9EAEE] hover:border-orange-300 text-black bg-white"
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
              <span className="text-[13px] md:text-[16px] font-normal text-black">
                1/4&quot; Round Corner
              </span>
            </div>
            {selectedRadius === "1/4" && (
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#FF6E4A] flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-3 h-3 md:w-4 md:h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}
          </button>
          <button
            type="button"
            onClick={() => handleRadiusSelect("5/8")}
            className={`w-full font-roboto px-3 py-2 rounded-[10px] border-2 font-medium transition-all flex items-center justify-between ${
              selectedRadius === "5/8"
                ? "border-[#FF6E4A] text-black"
                : "border-[#E9EAEE] hover:border-orange-300 text-black bg-white"
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
              <span className="text-[13px] md:text-[16px] font-normal text-black">
                5/8&quot; Round Corner
              </span>
            </div>
            {selectedRadius === "5/8" && (
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#FF6E4A] flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-3 h-3 md:w-4 md:h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}
          </button>
          <button
            type="button"
            onClick={() => handleRadiusSelect("square")}
            className={`w-full font-roboto px-3 py-2 rounded-[10px] border-2 font-medium transition-all flex items-center justify-between ${
              selectedRadius === "square"
                ? "border-[#FF6E4A] text-black"
                : "border-[#E9EAEE] hover:border-orange-300 text-black bg-white"
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
              <span className="text-[13px] md:text-[16px] font-normal text-black">
                Square
              </span>
            </div>
            {selectedRadius === "square" && (
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#FF6E4A] flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-3 h-3 md:w-4 md:h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Hinge Type */}
      <div className="mt-8 max-w-[600px]">
        <p className="text-[16px] md:text-[20px] font-medium text-black mb-3 font-montserrat">
          Hinge Type
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleTypeSelect("residential")}
            className={`w-full font-roboto px-3 py-2 rounded-[10px] border-2 font-medium transition-all flex items-center justify-between ${
              selectedType === "residential"
                ? "border-[#FF6E4A] text-black"
                : "border-[#E9EAEE] hover:border-orange-300 text-black bg-white"
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
              <span className="text-[13px] md:text-[16px] font-normal text-black">
                Residential
              </span>
            </div>
            {selectedType === "residential" && (
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#FF6E4A] flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-3 h-3 md:w-4 md:h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}
          </button>
          <button
            type="button"
            onClick={() => handleTypeSelect("commercial")}
            className={`w-full font-roboto px-3 py-2 rounded-[10px] border-2 font-medium transition-all flex items-center justify-between ${
              selectedType === "commercial"
                ? "border-[#FF6E4A] text-black"
                : "border-[#E9EAEE] hover:border-orange-300 text-black bg-white"
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
              <span className="text-[13px] md:text-[16px] font-normal text-black">
                Commercial
              </span>
            </div>
            {selectedType === "commercial" && (
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#FF6E4A] flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-3 h-3 md:w-4 md:h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}
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
              <p className="text-[16px] md:text-[20px] font-medium font-montserrat text-black">
                Backset
              </p>
              <div className="relative group">
                <div className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center cursor-pointer">
                  <span className="text-white text-xs font-bold">?</span>
                </div>
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="relative">
                    <div className="bg-gray-100 rounded-lg px-4 py-3 shadow-lg whitespace-nowrap">
                      <p className="text-sm text-black font-roboto">
                        A door's backset is the distance from the edge of the
                        door to the center of the lock or hardware hole
                      </p>
                    </div>
                    <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-gray-100"></div>
                  </div>
                </div>
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
