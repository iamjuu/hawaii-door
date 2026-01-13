
"use client";

import { ChangeEvent, useEffect } from "react";
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

  // Set default thickness and quantity on mount if not already set
  useEffect(() => {
    const updates: any = {};
    if (!quoteData.thickness) {
      updates.thickness = '1 3/8"';
    }
    if (!quoteData.quantity) {
      updates.quantity = 1;
    }
    if (Object.keys(updates).length > 0) {
      setQuoteData({
        ...quoteData,
        ...updates,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

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
      <h2 className="text-[20px] md:text-[32px] font-roboto font-[500] mb-8 text-black">Door Size & Specification</h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Measurement Guide */}
        <div className="lg:w-1/3">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-4 pb-6 md:p-6">
            <h3 className="text-[14px] text-[#0A0A0A] font-medium mb-4 ">Measurement Guide</h3>
            <div className="relative bg-gray-50 rounded-lg p-4 md:p-8 flex items-center justify-center min-h-[200px] md:min-h-auto">
              {/* Door Diagram */}
              <div className="relative">
                {/* Height Arrow */}
                <div className="absolute -left-4 md:-left-5 top-0 bottom-0 flex flex-col items-center justify-between">
                  <div className="w-[2px] md:w-1 bg-orange-500 flex-1" />
                 
                  <div className="absolute top-1/2 -translate-y-1/2 -left-8 md:-left-12 -rotate-90 origin-center text-[#F97316] text-[12px] md:text-[15px] whitespace-nowrap font-roboto">
                    HEIGHT
                  </div>
                </div>

                {/* Door Rectangle */}
                <div className="w-32 h-64 md:w-40 md:h-80 bg-gray-200 border-3 border-gray-700 relative">
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 w-2 h-2 md:w-3 md:h-3 bg-gray-700 rounded-full" />
                  <div className="absolute inset-4 border-2 border-gray-400 " />
               
                </div>

                {/* Width Arrow */}
                <div className="absolute -bottom-4 md:-bottom-5 left-0 right-0 flex items-center justify-between">
                  <div className="h-[2px] md:h-1 bg-orange-500 flex-1" />
                
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-5 md:-bottom-6 text-[#F97316] text-[12px] md:text-[15px] font-roboto whitespace-nowrap">
                    WIDTH
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form Fields */}
        <div className="lg:w-2/3  pt-5 md:pt-[27px]">
          <div className="flex w-full flex-col">
            <div className="flex flex-col md:mb-[15px]">
              <div className="flex gap-4">
                {/* Width */}
                <div className="w-full max-w-[280px]">
                  <label className="block text-[16px] md:text-[20px] font-roboto mb-3 text-black">Width</label>
                  <div className="relative">
                    <select
                      value={quoteData.width || ""}
                      onChange={(e) => handleWidthChange(e.target.value)}
                      className="w-full rounded-lg px-4 py-1.5 md:py-2 pr-10 text-sm md:text-lg text-black focus:border-orange-500 focus:outline-none bg-white shadow-md appearance-none"
                    >
                      <option value="" disabled>Select Width</option>
                      {widthOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                {/* Height */}
                <div className="w-full max-w-[280px]">
                  <label className="block text-[16px] md:text-[20px] font-roboto mb-3 text-black">Height</label>
                  <div className="relative">
                    <select
                      value={quoteData.height || ""}
                      onChange={(e) => handleHeightChange(e.target.value)}
                      className="w-full rounded-lg px-4 py-1.5 md:py-2 pr-10 text-sm md:text-lg text-black focus:border-orange-500 focus:outline-none bg-white shadow-md appearance-none"
                    >
                      <option value="" disabled>Select Height</option>
                      {heightOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-500 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-6 mt-6">
              {/* Thickness */}
              <div className="flex gap-3 flex-col md:mb-[30px]">
                <label className="block text-[16px] md:text-[20px] font-roboto mb-1 md:mb-3 text-black">Thickness</label>
                <div className="flex w-full max-w-[320px] md:max-w-[400px] gap-3 md:gap-4">
                  <button
                    onClick={() => handleThicknessChange('1 3/8"')}
                    className={`w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border-2 font-medium transition-all flex items-center justify-between ${
                      (quoteData.thickness || '1 3/8"') === '1 3/8"' ? "border-orange-500 text-black" : "border-gray-300 hover:border-orange-300 text-black bg-white"
                    }`}
                  >
                    <span className="text-sm md:text-base">1 ⅜"</span>
                    <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center ${
                      (quoteData.thickness || '1 3/8"') === '1 3/8"' ? "border-orange-500" : "border-gray-300"
                    }`}>
                      {(quoteData.thickness || '1 3/8"') === '1 3/8"' && (
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-orange-500"></div>
                      )}
                    </div>
                  </button>
                  <button
                    onClick={() => handleThicknessChange('1 3/4"')}
                    className={`w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border-2 font-medium transition-all flex items-center justify-between ${
                      quoteData.thickness === '1 3/4"' ? "border-orange-500 text-black" : "border-gray-300 hover:border-orange-300 text-black bg-white"
                    }`}
                  >
                    <span className="text-sm md:text-base">1 ¾"</span>
                    <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center ${
                      quoteData.thickness === '1 3/4"' ? "border-orange-500" : "border-gray-300"
                    }`}>
                      {quoteData.thickness === '1 3/4"' && (
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-orange-500"></div>
                      )}
                    </div>
                  </button>
                </div>
              </div>
              
              {/* Quantity */}
              <div>
                <label className="block text-[16px] md:text-[20px] font-roboto mb-4 text-black">Quantity</label>
                <div className=" flex items-center pr-25 md:pr-20">
                 
                  <input
                    type="number"
                    min="1"
                    value={quoteData.quantity || 1}
                    onChange={handleQuantityChange}
                    className="w-full h-10 md:h-12  text-[14px] md:text-[20px]  border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-black px-3 font-[300] font-roboto"
                  />

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
{/*  */}
    </div>
  );
};

export default Step3DoorSize;
