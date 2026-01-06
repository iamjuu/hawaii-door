"use client";

import { useState } from "react";

interface StepProps {
  quoteData: any;
  setQuoteData: (data: any) => void;
}

const Step8 = ({ quoteData, setQuoteData }: StepProps) => {
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
    quoteData.latchBoreDiameter || null
  );
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
    <div className="mt-[50px] mb-[50px]">
      <h2 className="text-3xl font-bold mb-8">Lock Information</h2>

      {/* Lock Type Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Deadbolt Option */}
        <button
          type="button"
          onClick={() => handleLockTypeSelect("deadbolt")}
          className={`border-2 rounded-lg p-6 text-left transition-all hover:shadow-lg ${
            selectedLockType === "deadbolt"
              ? "border-orange-500 bg-orange-50 shadow-lg"
              : "border-gray-200 bg-white hover:border-orange-500"
          }`}
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Deadbolt</h3>
          <p className="text-sm text-gray-600">Additional security with deadbolt lock</p>
        </button>

        {/* Door Knob Option */}
        <button
          type="button"
          onClick={() => handleLockTypeSelect("door_knob")}
          className={`border-2 rounded-lg p-6 text-left transition-all hover:shadow-lg ${
            selectedLockType === "door_knob"
              ? "border-orange-500 bg-orange-50 shadow-lg"
              : "border-gray-200 bg-white hover:border-orange-500"
          }`}
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Door Knob</h3>
          <p className="text-sm text-gray-600">
            Durable fiberglass construction with wood-like texture
          </p>
        </button>
      </div>

      {/* Lock Bore Diameter and Backset */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Lock Bore Diameter */}
        <div>
          <p className="text-lg font-semibold text-gray-900 mb-3">
            Lock Bore Diameter
          </p>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => handleBoreDiameterSelect("1")}
              className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
                selectedBoreDiameter === "1"
                  ? "border-orange-500 text-orange-600"
                  : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
              }`}
            >
              1&quot;
            </button>
            <button
              type="button"
              onClick={() => handleBoreDiameterSelect("7/8")}
              className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
                selectedBoreDiameter === "7/8"
                  ? "border-orange-500 text-orange-600"
                  : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
              }`}
            >
              7/8&quot;
            </button>
            <button
              type="button"
              onClick={() => handleBoreDiameterSelect("other")}
              className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
                selectedBoreDiameter === "other"
                  ? "border-orange-500 text-orange-600"
                  : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
              }`}
            >
              Other
            </button>
          </div>
        </div>

        {/* Right: Backset (lock) */}
        <div>
          <p className="text-lg font-semibold text-gray-900 mb-3">
            Backset (lock)
          </p>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => handleBacksetSelect("2_3/8")}
              className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
                selectedBackset === "2_3/8"
                  ? "border-orange-500 text-orange-600"
                  : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
              }`}
            >
              2 3/8&quot;
            </button>
            <button
              type="button"
              onClick={() => handleBacksetSelect("2_3/4")}
              className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
                selectedBackset === "2_3/4"
                  ? "border-orange-500 text-orange-600"
                  : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
              }`}
            >
              2 3/4&quot;
            </button>
            <button
              type="button"
              onClick={() => handleBacksetSelect("other")}
              className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
                selectedBackset === "other"
                  ? "border-orange-500 text-orange-600"
                  : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
              }`}
            >
              Other
            </button>
          </div>
        </div>
      </div>

      {/* Lock Centerline and LatchBore Diameter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Left: Lock Centerline */}
        <div>
          <p className="text-lg font-semibold text-gray-900 mb-3">Lock Centerline</p>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
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
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Right: LatchBore Diameter */}
        <div>
          <p className="text-lg font-semibold text-gray-900 mb-3">LatchBore Diameter</p>
          <button
            type="button"
            onClick={() => handleLatchBoreDiameterSelect("default")}
            className={`w-full border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
              selectedLatchBoreDiameter === "default"
                ? "border-orange-500 text-orange-600"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            Default
          </button>
        </div>
      </div>

      {/* Faceplate Dimension and Radius */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Left: Faceplate Dimension */}
        <div>
          <p className="text-lg font-semibold text-gray-900 mb-3">
            Faceplate Dimension
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() =>
                handleFaceplateDimensionSelect('1" x 2 1/4" x 5/32"')
              }
              className={`border-2 rounded-lg px-2 py-2 text-xs font-medium bg-white transition-colors ${
                selectedFaceplateDimension === '1" x 2 1/4" x 5/32"'
                  ? "border-orange-500 text-orange-600"
                  : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
              }`}
            >
              1&quot; x 2 1/4&quot; x 5/32&quot;
            </button>
            <button
              type="button"
              onClick={() =>
                handleFaceplateDimensionSelect('1 1/8" x 2 1/4" x 5/32"')
              }
              className={`border-2 rounded-lg px-2 py-2 text-xs font-medium bg-white transition-colors ${
                selectedFaceplateDimension === '1 1/8" x 2 1/4" x 5/32"'
                  ? "border-orange-500 text-orange-600"
                  : "border-gray-200 text-gray-800 hover-border-orange-500 hover:text-orange-600"
              }`}
            >
              1 1/8&quot; x 2 1/4&quot; x 5/32&quot;
            </button>
            <button
              type="button"
              onClick={() => handleFaceplateDimensionSelect("other")}
              className={`border-2 rounded-lg px-2 py-2 text-xs font-medium bg-white transition-colors ${
                selectedFaceplateDimension === "other"
                  ? "border-orange-500 text-orange-600"
                  : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
              }`}
            >
              Other
            </button>
          </div>
        </div>

        {/* Right: Faceplate Radius */}
        <div>
          <p className="text-lg font-semibold text-gray-900 mb-3">
            Faceplate Radius
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleFaceplateRadiusSelect('1/4" radius')}
              className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
                selectedFaceplateRadius === '1/4" radius'
                  ? "border-orange-500 text-orange-600"
                  : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
              }`}
            >
              1/4&quot; Radius
            </button>
            <button
              type="button"
              onClick={() => handleFaceplateRadiusSelect("square")}
              className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
                selectedFaceplateRadius === "square"
                  ? "border-orange-500 text-orange-600"
                  : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
              }`}
            >
              Square
            </button>
          </div>
        </div>
      </div>

      {/* Drive-In Diameter */}
      <div className="mt-8">
        <p className="text-lg font-semibold text-gray-900 mb-3">
          Drive-In Diameter
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => handleDriveInDiameterSelect('7/8"' )}
            className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
              selectedDriveInDiameter === '7/8"'
                ? "border-orange-500 text-orange-600"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            7/8&quot;
          </button>
          <button
            type="button"
            onClick={() => handleDriveInDiameterSelect('1"' )}
            className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
              selectedDriveInDiameter === '1"'
                ? "border-orange-500 text-orange-600"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            1&quot;
          </button>
          <button
            type="button"
            onClick={() => handleDriveInDiameterSelect("other")}
            className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
              selectedDriveInDiameter === "other"
                ? "border-orange-500 text-orange-600"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            Other
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step8;
