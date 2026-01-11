"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import lock1 from "../../../../../public/assets/images/dummy/lock1.png";
import lock2 from "../../../../../public/assets/images/dummy/lock2.png";
import rounded1 from "../../../../../public/assets/images/dummy/roundcorner11.png";
import square from "../../../../../public/assets/images/dummy/square2.png";

interface StepProps {
  quoteData: any;
  setQuoteData: (data: any) => void;
  onNext?: () => void;
}

const Step8 = ({ quoteData, setQuoteData, onNext }: StepProps) => {
  const [selectedLockType, setSelectedLockType] = useState<string | null>(
    quoteData.lockType || null
  );
  const [selectedBoreDiameter, setSelectedBoreDiameter] = useState<string | null>(
    quoteData.lockBoreDiameter || null
  );
  const [selectedBackset, setSelectedBackset] = useState<string | null>(
    quoteData.lockBackset || null
  );
  const [selectedLatchBoreDiameter, setSelectedLatchBoreDiameter] = useState<string | null>(
    quoteData.latchBoreDiameter || "default"
  );

  // Set LatchBore Diameter to default on mount
  useEffect(() => {
    if (!quoteData.latchBoreDiameter) {
      setSelectedLatchBoreDiameter("default");
      setQuoteData((prev: any) => ({
        ...prev,
        latchBoreDiameter: "default",
      }));
    }
  }, [quoteData.latchBoreDiameter, setQuoteData]);
  const [lockCenterline, setLockCenterline] = useState<string>(
    quoteData.lockCenterline || ""
  );
  const [selectedFaceplateDimension, setSelectedFaceplateDimension] = useState<string | null>(
    quoteData.faceplateDimension || null
  );
  const [selectedFaceplateRadius, setSelectedFaceplateRadius] = useState<string | null>(
    quoteData.faceplateRadius || null
  );
  const [selectedDriveInDiameter, setSelectedDriveInDiameter] = useState<string | null>(
    quoteData.driveInDiameter || null
  );

  const handleLockTypeSelect = (type: string) => {
    setSelectedLockType(type);
    setQuoteData({
      ...quoteData,
      lockType: type,
    });
  };

  const handleBoreDiameterSelect = (diameter: string) => {
    setSelectedBoreDiameter(diameter);
    setQuoteData({
      ...quoteData,
      lockBoreDiameter: diameter,
    });
  };

  const handleBacksetSelect = (backset: string) => {
    setSelectedBackset(backset);
    setQuoteData({
      ...quoteData,
      lockBackset: backset,
    });
  };

  const handleLatchBoreDiameterSelect = (diameter: string) => {
    setSelectedLatchBoreDiameter(diameter);
    setQuoteData({
      ...quoteData,
      latchBoreDiameter: diameter,
    });
  };

  const handleLockCenterlineChange = (value: string) => {
    setLockCenterline(value);
    setQuoteData({
      ...quoteData,
      lockCenterline: value,
    });
  };

  const handleFaceplateDimensionSelect = (value: string) => {
    setSelectedFaceplateDimension(value);
    setQuoteData({
      ...quoteData,
      faceplateDimension: value,
    });
  };

  const handleFaceplateRadiusSelect = (value: string) => {
    setSelectedFaceplateRadius(value);
    setQuoteData({
      ...quoteData,
      faceplateRadius: value,
    });
  };

  const handleDriveInDiameterSelect = (value: string) => {
    setSelectedDriveInDiameter(value);
    setQuoteData({
      ...quoteData,
      driveInDiameter: value,
    });
  };

  return (
    <div className="mt-[50px] mb-[50px] max-w-[1050px] text-black">
      <h2 className="text-[20px] md:text-[32px] font-roboto font-[500] mb-5 md:mb-8 text-black">Lock Information</h2>

      {/* Main Flex Container - Left: Deadbolt, Lock Bore Diameter, Lock Centerline | Right: Door Knob, Backset, LatchBore Diameter */}
      <div className="flex flex-col md:flex-row gap-6 mb-8 md:items-stretch">
        {/* Left Side */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Deadbolt Section */}
          <button
            type="button"
            onClick={() => handleLockTypeSelect("deadbolt")}
            className={`relative border-2 rounded-lg p-4 text-left transition-all hover:shadow-lg min-h-[110px] max-w-[400px] ${
              selectedLockType === "deadbolt"
                ? "border-gray-200 bg-white shadow-lg"
                : "border-gray-200 bg-white"
            }`}
          >
            {/* Circle indicator top right */}
            <div className={`absolute top-3 right-3 w-5 h-5  rounded-full border-2 flex items-center justify-center ${
              selectedLockType === "deadbolt" ? "border-orange-500" : "border-gray-300"
            }`}>
              {selectedLockType === "deadbolt" && (
                <div className="w-3 h-3  rounded-full bg-orange-500"></div>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              {/* Image before text */}
              <div className="relative w-11 h-11 flex-shrink-0">
                <Image
                  src={lock1}
                  alt="Deadbolt"
                  fill
                  className="object-contain"
                />
              </div>
              
              {/* Text content */}
              <div>
                <h3 className="text-[17px] md:text-[22px] font-roboto font-normal text-black">Deadbolt</h3>
                <p className="text-[11px] text-black font-roboto text-[#222222]">Additional security with deadbolt lock</p>
              </div>
            </div>
          </button>

          {/* Door Knob Section - Small Screen Only (below Deadbolt) */}
          <button
            type="button"
            onClick={() => handleLockTypeSelect("door_knob")}
            className={`md:hidden relative border-2 rounded-lg p-4 text-left transition-all hover:shadow-lg min-h-[110px] max-w-[400px] ${
              selectedLockType === "door_knob"
                ? "border-gray-200 bg-whiteshadow-lg"
                : "border-gray-200 bg-white"
            }`}
          >
            {/* Circle indicator top right */}
            <div className={`absolute top-3 right-3 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              selectedLockType === "door_knob" ? "border-orange-500" : "border-gray-300"
            }`}>
              {selectedLockType === "door_knob" && (
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              {/* Image before text */}
              <div className="relative w-11 h-11 flex-shrink-0">
                <Image
                  src={lock2}
                  alt="Door Knob"
                  fill
                  className="object-contain"
                />
              </div>
              
              {/* Text content */}
              <div>
                <h3 className="text-[17px] md:text-[22px] font-roboto font-normal text-black">Door Knob</h3>
                <p className="text-[11px] text-black font-roboto text-[#222222]">
                  Durable fiberglass construction with wood-like texture
                </p>
              </div>
            </div>
          </button>

          {/* Lock Bore Diameter Section */}
          <div>
            <p className="text-[18px] md:text-[26px] font-[400] text-black mb-3 md:mb-7 font-roboto md:mt-3">
              Lock Bore Diameter
            </p>
            <div className="flex flex-col md:grid md:grid-cols-3 gap-2 max-w-full md:max-w-[300px]">
              <button
                type="button"
                onClick={() => handleBoreDiameterSelect("1")}
                className={`w-full relative border-2 rounded-lg px-5 md:px-3 py-2 text-sm font-medium bg-white transition-colors flex items-center justify-between ${
                  selectedBoreDiameter === "1"
                    ? "border-orange-500 text-black"
                    : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
                }`}
              >
                <span className="text-left text-black font-roboto">1&quot;</span>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedBoreDiameter === "1" ? "border-orange-500" : "border-gray-300"
                }`}>
                  {selectedBoreDiameter === "1" && (
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  )}
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleBoreDiameterSelect("7/8")}
                className={`w-full relative border-2 rounded-lg px-5 md:px-3 py-2 text-sm font-medium bg-white transition-colors flex items-center justify-between ${
                  selectedBoreDiameter === "7/8"
                    ? "border-orange-500 text-black"
                    : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
                }`}
              >
                <span className="text-left text-black font-roboto">⅞&quot;</span>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedBoreDiameter === "7/8" ? "border-orange-500" : "border-gray-300"
                }`}>
                  {selectedBoreDiameter === "7/8" && (
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  )}
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleBoreDiameterSelect("other")}
                className={`w-full relative border-2 rounded-lg px-5 md:px-3 py-2 font-roboto text-sm font-medium bg-white transition-colors flex items-center justify-between ${
                  selectedBoreDiameter === "other"
                    ? "border-orange-500 text-black"
                    : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
                }`}
              >
                <span className="text-left text-black font-roboto font-[400]">Other</span>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedBoreDiameter === "other" ? "border-orange-500" : "border-gray-300"
                }`}>
                  {selectedBoreDiameter === "other" && (
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Lock Centerline Section */}
          <div className="flex flex-col">
            <p className="text-[18px] md:text-[26px] font-[400] text-black font-roboto md:mt-3">Lock Centerline</p>
            <div className="flex items-center gap-2 mb-3 md:mb-5">
              <div className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white ml-0.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="text-xs text-gray-600">view video tutorial</span>
            </div>
            <input
              type="text"
              value={lockCenterline}
              onChange={(e) => handleLockCenterlineChange(e.target.value)}
              placeholder="Enter In Inches"
              className="w-full md:w-[350px] border-2 border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500 text-black text-[13px] font-robot font-light"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Door Knob Section - Large Screen Only (right side) */}
          <button
            type="button"
            onClick={() => handleLockTypeSelect("door_knob")}
            className={`hidden md:block relative border-2 rounded-lg p-4 text-left transition-all hover:shadow-lg min-h-[110px] max-w-[400px] ${
              selectedLockType === "door_knob"
                ? "border-gray-200 bg-whiteshadow-lg"
                : "border-gray-200 bg-white"
            }`}
          >
            {/* Circle indicator top right */}
            <div className={`absolute top-3 right-3 w-5 h-5  rounded-full border-2 flex items-center justify-center ${
              selectedLockType === "door_knob" ? "border-orange-500" : "border-gray-300"
            }`}>
              {selectedLockType === "door_knob" && (
                <div className="w-3 h-3  rounded-full bg-orange-500"></div>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              {/* Image before text */}
              <div className="relative w-11 h-11 flex-shrink-0">
                <Image
                  src={lock2}
                  alt="Door Knob"
                  fill
                  className="object-contain"
                />
              </div>
              
              {/* Text content */}
              <div>
                <h3 className="text-[17px] md:text-[22px] font-roboto font-normal text-black">Door Knob</h3>
                <p className="text-[11px] text-black font-roboto text-[#222222]">
                  Durable fiberglass construction with wood-like texture
                </p>
              </div>
            </div>
          </button>

          {/* Backset (lock) Section */}
          <div>
            <p className="text-[18px] md:text-[26px] font-[400] text-black mb-3 md:mb-7 font-roboto md:mt-3">
              Backset (lock)
            </p>
            <div className="flex flex-col md:grid md:grid-cols-3 gap-3 max-w-full md:max-w-[300px]">
              <button
                type="button"
                onClick={() => handleBacksetSelect("2_3/8")}
                className={`w-full relative border-2 rounded-lg px-5 md:px-3 py-2 text-sm font-medium bg-white transition-colors flex items-center justify-between ${
                  selectedBackset === "2_3/8"
                    ? "border-orange-500 text-black"
                    : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
                }`}
              >
                <span className="text-left text-black text-[15px] font-roboto font-normal">2 ⅜&quot;</span>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedBackset === "2_3/8" ? "border-orange-500" : "border-gray-300"
                }`}>
                  {selectedBackset === "2_3/8" && (
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  )}
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleBacksetSelect("2_3/4")}
                className={`w-full relative border-2 rounded-lg px-5 md:px-3 py-2 text-sm font-medium bg-white transition-colors flex items-center justify-between ${
                  selectedBackset === "2_3/4"
                    ? "border-orange-500 text-black"
                    : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
                }`}
              >
                <span className="text-left text-black text-[15px] font-roboto font-normal">2 ¾&quot;</span>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedBackset === "2_3/4" ? "border-orange-500" : "border-gray-300"
                }`}>
                  {selectedBackset === "2_3/4" && (
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  )}
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleBacksetSelect("other")}
                className={`w-full relative border-2 rounded-lg px-5 md:px-3 py-2 text-sm font-medium bg-white transition-colors flex items-center justify-between ${
                  selectedBackset === "other"
                    ? "border-orange-500 text-black"
                    : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
                }`}
              >
                <span className="text-left text-black font-roboto font-[400]">Other</span>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedBackset === "other" ? "border-orange-500" : "border-gray-300"
                }`}>
                  {selectedBackset === "other" && (
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* LatchBore Diameter Section */}
          <div>
            <p className="text-[18px] md:text-[26px] font-[400] text-black mb-3 md:mb-9 font-roboto md:mt-3">LatchBore Diameter</p>
            <button
              type="button"
              onClick={() => handleLatchBoreDiameterSelect("default")}
              className={`w-full md:max-w-[140px] border-2 rounded-lg px-5 md:px-3 py-2 text-sm font-medium bg-white transition-colors flex items-center justify-between font-roboto ${
                selectedLatchBoreDiameter === "default"
                  ? "border-orange-500 text-black"
                  : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
              }`}
            >
              <span className="text-left text-black font-roboto font-[400]">1 Default</span>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                selectedLatchBoreDiameter === "default" ? "border-orange-500" : "border-gray-300"
              }`}>
                {selectedLatchBoreDiameter === "default" && (
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Flex Container - Left: Faceplate Dimension, Drive-In Diameter | Right: Faceplate Radius */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Faceplate Dimension Section */}
          <div>
            <p className="text-[18px] md:text-[26px] font-[400] text-black mb-3 md:mb-7 font-roboto md:mt-3">
              Faceplate Dimension
            </p>
            <div className="flex flex-col md:grid md:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() =>
                  handleFaceplateDimensionSelect('1" x 2 1/4" x 5/32"')
                }
                className={`w-full relative border-2 rounded-lg px-5 py-2.5 text-[11px] font-medium bg-white transition-colors flex items-center justify-between font-roboto ${
                  selectedFaceplateDimension === '1" x 2 1/4" x 5/32"'
                    ? "border-orange-500 text-black"
                    : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
                }`}
              >
                <span className="text-left text-black font-roboto">1&quot; x 2 ¼&quot; x 5/32&quot;</span>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedFaceplateDimension === '1" x 2 1/4" x 5/32"' ? "border-orange-500" : "border-gray-300"
                }`}>
                  {selectedFaceplateDimension === '1" x 2 1/4" x 5/32"' && (
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  )}
                </div>
              </button>
              <button
                type="button"
                onClick={() =>
                  handleFaceplateDimensionSelect('1 1/8" x 2 1/4" x 5/32"')
                }
                className={`w-full relative border-2 rounded-lg px-5  py-2 text-[11px] font-medium bg-white transition-colors flex items-center justify-between font-roboto ${
                  selectedFaceplateDimension === '1 1/8" x 2 1/4" x 5/32"'
                    ? "border-orange-500 text-black"
                    : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
                }`}
              >
                <span className="text-left text-black font-roboto">1 ⅛&quot; x 2 ¼&quot; x 5/32&quot;</span>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedFaceplateDimension === '1 1/8" x 2 1/4" x 5/32"' ? "border-orange-500" : "border-gray-300"
                }`}>
                  {selectedFaceplateDimension === '1 1/8" x 2 1/4" x 5/32"' && (
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  )}
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleFaceplateDimensionSelect("other")}
                className={`w-full relative border-2 rounded-lg px-5 py-2 text-xs font-medium bg-white transition-colors flex items-center justify-between font-roboto ${
                  selectedFaceplateDimension === "other"
                    ? "border-orange-500 text-black"
                    : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
                }`}
              >
                <span className="text-left text-black font-roboto text-[15px] font-[400]">Other</span>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedFaceplateDimension === "other" ? "border-orange-500" : "border-gray-300"
                }`}>
                  {selectedFaceplateDimension === "other" && (
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Drive-In Diameter Section */}
          <div>
            <p className="text-[18px] md:text-[26px] font-[400] text-black mb-3 md:mb-7 font-roboto md:mt-3">
              Drive-In Diameter
            </p>
            <div className="flex flex-col md:grid md:grid-cols-3 gap-3 max-w-full md:max-w-[300px]">
              <button
                type="button"
                onClick={() => handleDriveInDiameterSelect('7/8"' )}
                className={`w-full relative border-2 rounded-lg px-5 md:px-3 py-2 text-sm font-medium bg-white transition-colors flex items-center justify-between font-roboto ${
                  selectedDriveInDiameter === '7/8"'
                    ? "border-orange-500 text-black"
                    : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
                }`}
              >
                <span className="text-left text-black font-roboto">⅞&quot;</span>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedDriveInDiameter === '7/8"' ? "border-orange-500" : "border-gray-300"
                }`}>
                  {selectedDriveInDiameter === '7/8"' && (
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  )}
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleDriveInDiameterSelect('1"' )}
                className={`w-full relative border-2 rounded-lg px-5 md:px-3 py-2 text-sm font-medium bg-white transition-colors flex items-center justify-between font-roboto ${
                  selectedDriveInDiameter === '1"'
                    ? "border-orange-500 text-black"
                    : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
                }`}
              >
                <span className="text-left text-black font-roboto">1&quot;</span>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedDriveInDiameter === '1"' ? "border-orange-500" : "border-gray-300"
                }`}>
                  {selectedDriveInDiameter === '1"' && (
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  )}
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleDriveInDiameterSelect("other")}
                className={`w-full relative border-2 rounded-lg px-5 md:px-3 py-2 text-sm font-medium bg-white transition-colors flex items-center justify-between font-roboto ${
                  selectedDriveInDiameter === "other"
                    ? "border-orange-500 text-black"
                    : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
                }`}
              >
                <span className="text-left text-black font-roboto font-[400]">Other</span>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedDriveInDiameter === "other" ? "border-orange-500" : "border-gray-300"
                }`}>
                  {selectedDriveInDiameter === "other" && (
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1">
          {/* Faceplate Radius Section */}
          <div className="max-w-[390px]">
            <p className="text-[18px] md:text-[26px] font-[400] text-black mb-3 md:mb-7 font-roboto md:mt-3">
              Faceplate Radius
            </p>
            <div className="flex flex-col md:grid md:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleFaceplateRadiusSelect('1/4" radius')}
                className={`w-full relative border-2 rounded-lg px-5 py-2 text-sm font-medium bg-white transition-colors flex items-center justify-between font-roboto ${
                  selectedFaceplateRadius === '1/4" radius'
                    ? "border-orange-500 text-black"
                    : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-6 h-6 flex-shrink-0">
                    <Image
                      src={rounded1}
                      alt="1/4 Radius"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-left text-black font-roboto font-[400]">¼&quot; Radius</span>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedFaceplateRadius === '1/4" radius' ? "border-orange-500" : "border-gray-300"
                }`}>
                  {selectedFaceplateRadius === '1/4" radius' && (
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  )}
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleFaceplateRadiusSelect("square")}
                className={`w-full relative border-2 rounded-lg px-5 py-2 text-sm font-medium bg-white transition-colors flex items-center justify-between font-roboto ${
                  selectedFaceplateRadius === "square"
                    ? "border-orange-500 text-black"
                    : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-6 h-6 flex-shrink-0">
                    <Image
                      src={square}
                      alt="Square"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-left text-black font-roboto font-[400]">Square</span>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedFaceplateRadius === "square" ? "border-orange-500" : "border-gray-300"
                }`}>
                  {selectedFaceplateRadius === "square" && (
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step8;
