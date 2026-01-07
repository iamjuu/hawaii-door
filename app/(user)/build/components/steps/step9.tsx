"use client";

import { useState } from "react";

interface StepProps {
  quoteData: any;
  setQuoteData: (data: any) => void;
}

const Step9 = ({ quoteData, setQuoteData }: StepProps) => {
  const [selectedJambType, setSelectedJambType] = useState<string | null>(
    quoteData.jambType || null
  );
  const [jambSize, setJambSize] = useState<string>(quoteData.jambSize || "");
  const [selectedDBStrikeType, setSelectedDBStrikeType] = useState<string | null>(
    quoteData.dbStrikeType || null
  );
  const [selectedLockStrikeType, setSelectedLockStrikeType] = useState<string | null>(
    quoteData.lockStrikeType || null
  );
  const [undercutMeasurement, setUndercutMeasurement] = useState<string>(
    quoteData.undercutMeasurement || ""
  );
  const [selectedWeatherstripping, setSelectedWeatherstripping] = useState<string | null>(
    quoteData.weatherstripping || null
  );
  const [selectedThresholdType, setSelectedThresholdType] = useState<string | null>(
    quoteData.thresholdType || null
  );

  const handleJambTypeSelect = (type: string) => {
    setSelectedJambType(type);
    setQuoteData({
      ...quoteData,
      jambType: type,
    });
  };

  const handleJambSizeChange = (value: string) => {
    setJambSize(value);
    setQuoteData({
      ...quoteData,
      jambSize: value,
    });
  };

  const handleDBStrikeTypeSelect = (type: string) => {
    setSelectedDBStrikeType(type);
    setQuoteData({
      ...quoteData,
      dbStrikeType: type,
    });
  };

  const handleLockStrikeTypeSelect = (type: string) => {
    setSelectedLockStrikeType(type);
    setQuoteData({
      ...quoteData,
      lockStrikeType: type,
    });
  };

  const handleUndercutMeasurementChange = (value: string) => {
    setUndercutMeasurement(value);
    setQuoteData({
      ...quoteData,
      undercutMeasurement: value,
    });
  };

  const handleWeatherstrippingSelect = (type: string) => {
    setSelectedWeatherstripping(type);
    setQuoteData({
      ...quoteData,
      weatherstripping: type,
    });
  };

  const handleThresholdTypeSelect = (type: string) => {
    setSelectedThresholdType(type);
    setQuoteData({
      ...quoteData,
      thresholdType: type,
    });
  };

  return (
    <div className="mt-[50px] mb-[50px]">
      <h2 className="text-[32px] font-[500] text-black mb-8">Select Jamb & Pre Hanging</h2>

      {/* Jamb Type */}
      <div className="mb-8">
        <p className="text-lg font-semibold text-gray-900 mb-3">Jamb Type</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => handleJambTypeSelect("interior_double_rabbet")}
            className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
              selectedJambType === "interior_double_rabbet"
                ? "border-orange-500 text-orange-600"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            Interior Double Rabbet
          </button>
          <button
            type="button"
            onClick={() => handleJambTypeSelect("exterior_single_rabbet")}
            className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
              selectedJambType === "exterior_single_rabbet"
                ? "border-orange-500 text-orange-600"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            Exterior Single Rabbet
          </button>
          <button
            type="button"
            onClick={() => handleJambTypeSelect("exterior_single_rabbet_kerfed")}
            className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
              selectedJambType === "exterior_single_rabbet_kerfed"
                ? "border-orange-500 text-orange-600"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            Exterior Single Rabbet Kerfed
          </button>
        </div>
      </div>

      {/* Jamb Size */}
      <div className="mb-8">
        <p className="text-lg font-semibold text-gray-900 mb-3">Jamb Size</p>
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
          <span className="text-xs text-gray-600">view video virtual</span>
        </div>
        <input
          type="text"
          value={jambSize}
          onChange={(e) => handleJambSizeChange(e.target.value)}
          placeholder="Enter In Inches"
          className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500"
        />
      </div>

      {/* DB Strike Type */}
      <div className="mb-8">
        <p className="text-lg font-semibold text-gray-900 mb-3">DB Strike Type</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => handleDBStrikeTypeSelect("standard")}
            className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
              selectedDBStrikeType === "standard"
                ? "border-orange-500 text-orange-600"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            Standard
          </button>
          <button
            type="button"
            onClick={() => handleDBStrikeTypeSelect("radius_corner")}
            className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
              selectedDBStrikeType === "radius_corner"
                ? "border-orange-500 text-orange-600"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            Radius corner
          </button>
          <button
            type="button"
            onClick={() => handleDBStrikeTypeSelect("box_strike")}
            className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
              selectedDBStrikeType === "box_strike"
                ? "border-orange-500 text-orange-600"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            Box Strike
          </button>
        </div>
      </div>

      {/* Lock Strike Type */}
      <div className="mb-8">
        <p className="text-lg font-semibold text-gray-900 mb-3">Lock Strike Type</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => handleLockStrikeTypeSelect("standard")}
            className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
              selectedLockStrikeType === "standard"
                ? "border-orange-500 text-orange-600"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            Standard
          </button>
          <button
            type="button"
            onClick={() => handleLockStrikeTypeSelect("radius_corner")}
            className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
              selectedLockStrikeType === "radius_corner"
                ? "border-orange-500 text-orange-600"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            Radius Corner
          </button>
          <button
            type="button"
            onClick={() => handleLockStrikeTypeSelect("t_strike")}
            className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
              selectedLockStrikeType === "t_strike"
                ? "border-orange-500 text-orange-600"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            T-Strike
          </button>
        </div>
      </div>

      {/* Undercut Measurement (Optional) */}
      <div className="mb-8">
        <p className="text-lg font-semibold text-gray-900 mb-3">
          Undercut Measurement (Optional)
        </p>
        <input
          type="text"
          value={undercutMeasurement}
          onChange={(e) => handleUndercutMeasurementChange(e.target.value)}
          placeholder="Enter measurement"
          className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500"
        />
      </div>

      {/* Weatherstripping */}
      <div className="mb-8">
        <p className="text-lg font-semibold text-gray-900 mb-3">Weatherstripping</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleWeatherstrippingSelect("white")}
            className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
              selectedWeatherstripping === "white"
                ? "border-orange-500 text-orange-600"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            White
          </button>
          <button
            type="button"
            onClick={() => handleWeatherstrippingSelect("brown")}
            className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
              selectedWeatherstripping === "brown"
                ? "border-orange-500 text-orange-600"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            Brown
          </button>
        </div>
      </div>

      {/* Threshold Type */}
      <div className="mb-8">
        <p className="text-lg font-semibold text-gray-900 mb-3">Threshold Type</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => handleThresholdTypeSelect("adjustable_in_swing")}
            className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
              selectedThresholdType === "adjustable_in_swing"
                ? "border-orange-500 text-orange-600"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            Adjustable In-swing
          </button>
          <button
            type="button"
            onClick={() => handleThresholdTypeSelect("out_swing")}
            className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
              selectedThresholdType === "out_swing"
                ? "border-orange-500 text-orange-600"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            Out-Swing
          </button>
          <button
            type="button"
            onClick={() => handleThresholdTypeSelect("flat_saddle")}
            className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
              selectedThresholdType === "flat_saddle"
                ? "border-orange-500 text-orange-600"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            Flat / Saddle
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step9;
