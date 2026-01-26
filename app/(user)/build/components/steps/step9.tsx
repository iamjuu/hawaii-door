"use client";

import { useState, useEffect } from "react";

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

  // Sync local state with quoteData when it changes (e.g., when navigating back/forward)
  useEffect(() => {
    setSelectedJambType(quoteData.jambType || null);
    setJambSize(quoteData.jambSize || "");
    setSelectedDBStrikeType(quoteData.dbStrikeType || null);
    setSelectedLockStrikeType(quoteData.lockStrikeType || null);
    setUndercutMeasurement(quoteData.undercutMeasurement || "");
    setSelectedWeatherstripping(quoteData.weatherstripping || null);
    setSelectedThresholdType(quoteData.thresholdType || null);
  }, [quoteData.jambType, quoteData.jambSize, quoteData.dbStrikeType, quoteData.lockStrikeType, quoteData.undercutMeasurement, quoteData.weatherstripping, quoteData.thresholdType]);

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
    <div className="mt-[50px] mb-[50px] max-w-[950px]">
      <h2 className="text-[20px] md:text-[32px] font-roboto font-[500] mb-5 md:mb-8 text-black">Select Jamb & Pre Hanging</h2>

      {/* Jamb Type */}
      <div className="mb-8">
        <p className="text-[18px] md:text-[26px] font-[400] text-black mb-3 md:mb-7 font-roboto">Jamb Type</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => handleJambTypeSelect("interior_double_rabbet")}
            className={`w-full relative border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors flex items-center justify-between font-roboto ${
              selectedJambType === "interior_double_rabbet"
                ? "border-orange-500 text-black"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            <span className="text-left text-black font-[400] font-roboto md:text-[17px]">Interior Double Rabbet</span>
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              selectedJambType === "interior_double_rabbet" ? "border-orange-500" : "border-gray-300"
            }`}>
              {selectedJambType === "interior_double_rabbet" && (
                <div className="w-2 h-2 rounded-full bg-[#FF6E4A]-500"></div>
              )}
            </div>
          </button>
          <button
            type="button"
            onClick={() => handleJambTypeSelect("exterior_single_rabbet")}
            className={`w-full relative border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors flex items-center justify-between font-roboto ${
              selectedJambType === "exterior_single_rabbet"
                ? "border-orange-500 text-black"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            <span className="text-left text-black font-[400] font-roboto md:text-[17px]">Exterior Single Rabbet</span>
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              selectedJambType === "exterior_single_rabbet" ? "border-orange-500" : "border-gray-300"
            }`}>
              {selectedJambType === "exterior_single_rabbet" && (
                <div className="w-2 h-2 rounded-full bg-[#FF6E4A]-500"></div>
              )}
            </div>
          </button>
          <button
            type="button"
            onClick={() => handleJambTypeSelect("exterior_single_rabbet_kerfed")}
            className={`w-full relative border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors flex items-center justify-between font-roboto ${
              selectedJambType === "exterior_single_rabbet_kerfed"
                ? "border-orange-500 text-black"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            <span className="text-left text-black font-[400] font-roboto md:text-[17px]">Exterior Single Rabbet Kerfed</span>
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              selectedJambType === "exterior_single_rabbet_kerfed" ? "border-orange-500" : "border-gray-300"
            }`}>
              {selectedJambType === "exterior_single_rabbet_kerfed" && (
                <div className="w-2 h-2 rounded-full bg-[#FF6E4A]-500"></div>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Jamb Size */}
      <div className="mb-8">
        <p className="text-[18px] md:text-[26px] font-[400] text-black  font-roboto">Jamb Size</p>
        <div className="flex items-center gap-2 mb-3 md:mb-7">
          <div className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center">
            <svg
              className="w-3 h-3 text-white ml-0.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="text-xs text-gray-600 font-roboto">view video virtual</span>
        </div>
        <input
          type="text"
          value={jambSize}
          onChange={(e) => handleJambSizeChange(e.target.value)}
          placeholder="Enter In Inches"
          className="w-full md:w-[300px] border-2 border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500 text-black font-roboto"
        />
      </div>

      {/* DB Strike Type */}
      <div className="mb-8">
        <p className="text-[18px] md:text-[26px] font-[400] text-black mb-3 md:mb-7 font-roboto">DB Strike Type</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:max-w-[700px]">
          <button
            type="button"
            onClick={() => handleDBStrikeTypeSelect("standard")}
            className={`w-full relative border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors flex items-center justify-between font-roboto ${
              selectedDBStrikeType === "standard"
                ? "border-orange-500 text-black"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            <span className="text-left text-black font-[400] font-roboto md:text-[17px]">Standard</span>
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              selectedDBStrikeType === "standard" ? "border-orange-500" : "border-gray-300"
            }`}>
              {selectedDBStrikeType === "standard" && (
                <div className="w-2 h-2 rounded-full bg-[#FF6E4A]-500"></div>
              )}
            </div>
          </button>
          <button
            type="button"
            onClick={() => handleDBStrikeTypeSelect("radius_corner")}
            className={`w-full relative border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors flex items-center justify-between font-roboto ${
              selectedDBStrikeType === "radius_corner"
                ? "border-orange-500 text-black"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            <span className="text-left text-black font-[400] font-roboto md:text-[17px]">Radius corner</span>
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              selectedDBStrikeType === "radius_corner" ? "border-orange-500" : "border-gray-300"
            }`}>
              {selectedDBStrikeType === "radius_corner" && (
                <div className="w-2 h-2 rounded-full bg-[#FF6E4A]-500"></div>
              )}
            </div>
          </button>
          <button
            type="button"
            onClick={() => handleDBStrikeTypeSelect("box_strike")}
            className={`w-full relative border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors flex items-center justify-between font-roboto ${
              selectedDBStrikeType === "box_strike"
                ? "border-orange-500 text-black"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            <span className="text-left text-black font-[400] font-roboto md:text-[17px]">Box Strike</span>
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              selectedDBStrikeType === "box_strike" ? "border-orange-500" : "border-gray-300"
            }`}>
              {selectedDBStrikeType === "box_strike" && (
                <div className="w-2 h-2 rounded-full bg-[#FF6E4A]-500"></div>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Lock Strike Type */}
      <div className="mb-8">
        <p className="text-[18px] md:text-[26px] font-[400] text-black mb-3 md:mb-7 font-roboto">Lock Strike Type</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:max-w-[700px]">
          <button
            type="button"
            onClick={() => handleLockStrikeTypeSelect("standard")}
            className={`w-full relative border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors flex items-center justify-between font-roboto ${
              selectedLockStrikeType === "standard"
                ? "border-orange-500 text-black"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            <span className="text-left text-black font-[400] font-roboto md:text-[17px]">Standard</span>
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              selectedLockStrikeType === "standard" ? "border-orange-500" : "border-gray-300"
            }`}>
              {selectedLockStrikeType === "standard" && (
                <div className="w-2 h-2 rounded-full bg-[#FF6E4A]-500"></div>
              )}
            </div>
          </button>
          <button
            type="button"
            onClick={() => handleLockStrikeTypeSelect("radius_corner")}
            className={`w-full relative border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors flex items-center justify-between font-roboto ${
              selectedLockStrikeType === "radius_corner"
                ? "border-orange-500 text-black"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            <span className="text-left text-black font-[400] font-roboto md:text-[17px]">Radius Corner</span>
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              selectedLockStrikeType === "radius_corner" ? "border-orange-500" : "border-gray-300"
            }`}>
              {selectedLockStrikeType === "radius_corner" && (
                <div className="w-2 h-2 rounded-full bg-[#FF6E4A]-500"></div>
              )}
            </div>
          </button>
          <button
            type="button"
            onClick={() => handleLockStrikeTypeSelect("t_strike")}
            className={`w-full relative border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors flex items-center justify-between font-roboto ${
              selectedLockStrikeType === "t_strike"
                ? "border-orange-500 text-black"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            <span className="text-left text-black font-[400] font-roboto md:text-[17px]">T-Strike</span>
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              selectedLockStrikeType === "t_strike" ? "border-orange-500" : "border-gray-300"
            }`}>
              {selectedLockStrikeType === "t_strike" && (
                <div className="w-2 h-2 rounded-full bg-[#FF6E4A]-500"></div>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Undercut Measurement (Optional) */}
      <div className="mb-8">
        <p className="text-[18px] md:text-[26px] font-[400] text-black mb-3 md:mb-7 font-roboto">
          Undercut Measurement (Optional)
        </p>
        <input
          type="text"
          value={undercutMeasurement}
          onChange={(e) => handleUndercutMeasurementChange(e.target.value)}
          placeholder="Enter measurement"
          className="w-full md:w-[300px] border-2 border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500 text-black font-roboto"
        />
      </div>

      {/* Weatherstripping */}
      <div className="mb-8">
        <p className="text-[18px] md:text-[26px] font-[400] text-black mb-3 md:mb-7 font-roboto">Weatherstripping</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:max-w-[300px]">
          <button
            type="button"
            onClick={() => handleWeatherstrippingSelect("white")}
            className={`w-full relative border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors flex items-center justify-between font-roboto ${
              selectedWeatherstripping === "white"
                ? "border-orange-500 text-black"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            <span className="text-left text-black font-[400] font-roboto md:text-[17px]">White</span>
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              selectedWeatherstripping === "white" ? "border-orange-500" : "border-gray-300"
            }`}>
              {selectedWeatherstripping === "white" && (
                <div className="w-2 h-2 rounded-full bg-[#FF6E4A]-500"></div>
              )}
            </div>
          </button>
          <button
            type="button"
            onClick={() => handleWeatherstrippingSelect("brown")}
            className={`w-full relative border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors flex items-center justify-between font-roboto ${
              selectedWeatherstripping === "brown"
                ? "border-orange-500 text-black"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            <span className="text-left text-black font-[400] font-roboto md:text-[17px]">Brown</span>
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              selectedWeatherstripping === "brown" ? "border-orange-500" : "border-gray-300"
            }`}>
              {selectedWeatherstripping === "brown" && (
                <div className="w-2 h-2 rounded-full bg-[#FF6E4A]-500"></div>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Threshold Type */}
      <div className="mb-8">
        <p className="text-[18px] md:text-[26px] font-[400] text-black mb-3 md:mb-7 font-roboto">Threshold Type</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:max-w-[700px]">
          <button
            type="button"
            onClick={() => handleThresholdTypeSelect("adjustable_in_swing")}
            className={`w-full relative border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors flex items-center justify-between font-roboto ${
              selectedThresholdType === "adjustable_in_swing"
                ? "border-orange-500 text-black"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            <span className="text-left text-black font-[400] font-roboto md:text-[17px]">Adjustable In-swing</span>
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              selectedThresholdType === "adjustable_in_swing" ? "border-orange-500" : "border-gray-300"
            }`}>
              {selectedThresholdType === "adjustable_in_swing" && (
                <div className="w-2 h-2 rounded-full bg-[#FF6E4A]-500"></div>
              )}
            </div>
          </button>
          <button
            type="button"
            onClick={() => handleThresholdTypeSelect("out_swing")}
            className={`w-full relative border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors flex items-center justify-between font-roboto ${
              selectedThresholdType === "out_swing"
                ? "border-orange-500 text-black"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            <span className="text-left text-black font-[400] font-roboto md:text-[17px]">Out-Swing</span>
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              selectedThresholdType === "out_swing" ? "border-orange-500" : "border-gray-300"
            }`}>
              {selectedThresholdType === "out_swing" && (
                <div className="w-2 h-2 rounded-full bg-[#FF6E4A]-500"></div>
              )}
            </div>
          </button>
          <button
            type="button"
            onClick={() => handleThresholdTypeSelect("flat_saddle")}
            className={`w-full relative border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors flex items-center justify-between font-roboto ${
              selectedThresholdType === "flat_saddle"
                ? "border-orange-500 text-black"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            <span className="text-left text-black font-[400] font-roboto md:text-[17px]">Flat / Saddle</span>
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              selectedThresholdType === "flat_saddle" ? "border-orange-500" : "border-gray-300"
            }`}>
              {selectedThresholdType === "flat_saddle" && (
                <div className="w-2 h-2 rounded-full bg-[#FF6E4A]-500"></div>
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step9;
