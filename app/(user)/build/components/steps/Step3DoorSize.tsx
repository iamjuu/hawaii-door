
"use client";

import { ChangeEvent } from "react";
import { ChevronDown } from "lucide-react";

interface StepProps {
  quoteData: any;
  setQuoteData: (data: any) => void;
  onNext?: () => void; // optional callback
}


const Step3DoorSize = ({ quoteData, setQuoteData }: StepProps) => {
  const widthOptions = [
    { label: '24"', value: "24" },
    { label: '28"', value: "28" },
    { label: '30"', value: "30" },
    { label: '32"', value: "32" },
    { label: '36"', value: "36" },
    { label: '42"', value: "42" },
    { label: '48"', value: "48" },
  ];

  const heightOptions = [
    { label: '80" (6\'8")', value: "80" },
    { label: '84" (7\'0")', value: "84" },
    { label: '96" (8\'0")', value: "96" },
  ];

  const handleWidthChange = (value: string) => {
    setQuoteData({
      ...quoteData,
      width: value,
    });
  };

  const handleHeightChange = (value: string) => {
    setQuoteData({
      ...quoteData,
      height: value,
    });
  };

  const handleThicknessChange = (value: string) => {
    setQuoteData({
      ...quoteData,
      thickness: value,
    });
  };

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuoteData({
      ...quoteData,
      quantity: value,
    });
  };

  const incrementQuantity = () => {
    setQuoteData({
      ...quoteData,
      quantity: (quoteData.quantity || 1) + 1,
    });
  };

  const decrementQuantity = () => {
    setQuoteData({
      ...quoteData,
      quantity: Math.max(1, (quoteData.quantity || 1) - 1),
    });
  };

  return (
    <div className="mt-[50px] mb-[50px]">
      <h2 className="text-[32px] font-[500] text-black mb-8">Door Size & Specification</h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Measurement Guide */}
        <div className="lg:w-1/3">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-black">Measurement Guide</h3>
            <div className="relative bg-gray-50 rounded-lg p-8 flex items-center justify-center">
              {/* Door Diagram */}
              <div className="relative">
                {/* Height Arrow */}
                <div className="absolute -left-12 top-0 bottom-0 flex flex-col items-center justify-between">
                  <div className="w-px bg-orange-500 flex-1" />
                  <div className="absolute top-1/2 -translate-y-1/2 -left-2">
                    <svg
                      className="w-4 h-4 text-orange-500 -rotate-90"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 3l-7 7h4v7h6v-7h4l-7-7z" />
                    </svg>
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 text-black font-bold text-sm whitespace-nowrap -left-16">
                    HEIGHT
                  </div>
                </div>

                {/* Door Rectangle */}
                <div className="w-40 h-72 bg-gray-200 border-4 border-gray-700 rounded-md relative">
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 bg-gray-700 rounded-full" />
                  <div className="absolute inset-4 border-2 border-gray-400 rounded" />
                  <div className="absolute inset-8 border border-gray-400 rounded" />
                </div>

                {/* Width Arrow */}
                <div className="absolute -bottom-12 left-0 right-0 flex items-center justify-between">
                  <div className="h-px bg-orange-500 flex-1" />
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-2">
                    <svg
                      className="w-4 h-4 text-orange-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 3l-7 7h4v7h6v-7h4l-7-7z" />
                    </svg>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 text-black font-bold text-sm whitespace-nowrap">
                    WIDTH
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form Fields */}
        <div className="lg:w-2/3  bg-red-400space-y-6">
        <div className="flex w-full    flex-col gap-15 justify-between">
          <div className=" flex flex-col">
            <div className="flex gap-4">
          {/* Width */}
          <div className="w-full">
            <label className="block text-lg font-semibold mb-2 text-black">Width</label>
            <div className="relative">
              <select
                value={quoteData.width || ""}
                onChange={(e) => handleWidthChange(e.target.value)}
                className="w-full rounded-lg px-4 py-2 pr-10 text-lg text-black focus:border-orange-500 focus:outline-none bg-white shadow-md appearance-none"
              >
                <option value="" disabled>Select Width</option>
                {widthOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Height */}
          <div className="w-full">
            <label className="block text-lg font-semibold mb-2 text-black">Height</label>
            <div className="relative">
              <select
                value={quoteData.height || ""}
                onChange={(e) => handleHeightChange(e.target.value)}
                className="w-full rounded-lg px-4 py-2 pr-10 text-lg text-black focus:border-orange-500 focus:outline-none bg-white shadow-md appearance-none"
              >
                <option value="" disabled>Select Height</option>
                {heightOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>
          </div>
          </div>
          </div>
          <div>
          {/* Thickness */}
          <div className=" flex   gap-3 flex-col">
            <label className="block text-lg font-semibold mb-3 text-black">Thickness</label>
            <div className="flex w-full gap-4">
              <button
                onClick={() => handleThicknessChange('1 3/8"')}
                className={`w-full px-4 py-3 rounded-lg border-2 font-medium transition-all flex items-center justify-between ${
                  (quoteData.thickness || '1 3/8"') === '1 3/8"' ? "border-orange-500 bg-orange-50 text-black" : "border-gray-300 hover:border-orange-300 text-black bg-white"
                }`}
              >
                <span className="text-base">1 ⅜"</span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  (quoteData.thickness || '1 3/8"') === '1 3/8"' ? "border-orange-500" : "border-gray-300"
                }`}>
                  {(quoteData.thickness || '1 3/8"') === '1 3/8"' && (
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  )}
                </div>
              </button>
              <button
                onClick={() => handleThicknessChange('1 3/4"')}
                className={`w-full px-4 py-3 rounded-lg border-2 font-medium transition-all flex items-center justify-between ${
                  quoteData.thickness === '1 3/4"' ? "border-orange-500 bg-orange-50 text-black" : "border-gray-300 hover:border-orange-300 text-black bg-white"
                }`}
              >
                <span className="text-base">1 ¾"</span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  quoteData.thickness === '1 3/4"' ? "border-orange-500" : "border-gray-300"
                }`}>
                  {quoteData.thickness === '1 3/4"' && (
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  )}
                </div>
              </button>
            </div>
          </div>
          </div>
          </div>
          {/* Quantity */}
          <div>
            <label className="block text-lg font-semibold mb-3 text-black">Quantity</label>
            <div className="flex items-center gap-4">
              <button onClick={decrementQuantity} className="w-12 h-12 rounded-lg border-2 border-gray-300 hover:border-orange-500 flex items-center justify-center text-2xl font-bold text-black">−</button>
              <input
                type="number"
                min="1"
                value={quoteData.quantity || 1}
                onChange={handleQuantityChange}
                className="w-24 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-black"
              />
              <button onClick={incrementQuantity} className="w-12 h-12 rounded-lg border-2 border-gray-300 hover:border-orange-500 flex items-center justify-center text-2xl font-bold text-black">+</button>
              <span className="text-black">doors</span>
            </div>
          </div>
        </div>
      </div>
{/*  */}
    </div>
  );
};

export default Step3DoorSize;
