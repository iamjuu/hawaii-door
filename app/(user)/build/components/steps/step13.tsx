"use client";

import Image from "next/image";
import { useState } from "react";
import clearwhite from "../../../../../public/assets/images/dummy/clearwhite.png";
import oak from "../../../../../public/assets/images/dummy/oak.png";
import primedwhite from "../../../../../public/assets/images/dummy/primed.png";
import rotted from "../../../../../public/assets/images/dummy/rotary.png";

interface StepProps {
  quoteData: any;
  setQuoteData: (data: any) => void;
}

const Step13 = ({ quoteData, setQuoteData }: StepProps) => {
  const [selectedFinishOption, setSelectedFinishOption] = useState<string | null>(
    quoteData.doorFinishOption || null
  );

  const handleFinishSelect = (option: string) => {
    setSelectedFinishOption(option);
    setQuoteData({
      ...quoteData,
      doorFinishOption: option,
    });
  };

  return (
    <div className="mt-[50px] mb-[50px]">
      <h2 className="text-[32px] font-medium text-black mb-8">
        Door Finish & Notes
      </h2>

      <div className="w-full border-2 border-gray-200 rounded-md p-6">
        <h3 className="text-base font-semibold text-black mb-4">Door Finish</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Clear White Brich Prefinished */}
          <div
            onClick={() => handleFinishSelect("clearwhite")}
            className={`
              relative border-2 cursor-pointer transition-all flex flex-col overflow-hidden
              hover:shadow-lg
              ${
                selectedFinishOption === "clearwhite"
                  ? "border-orange-500 shadow-lg"
                  : "border-gray-200"
              }
            `}
          >
            {selectedFinishOption === "clearwhite" && (
              <div className="absolute top-2 right-2 z-10">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-4 h-4 text-white"
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

            <div className="relative w-full aspect-square bg-gray-200 flex items-center justify-center p-4">
              <Image
                src={clearwhite}
                alt="Clear White Brich Prefinished"
                fill
                className="object-contain"
              />
            </div>
            <div className="bg-white p-3 border-t border-gray-200">
              <h4 className="text-xs font-semibold text-black text-center">
                Clear White Brich Prefinished
              </h4>
            </div>
          </div>

          {/* Placeholder boxes - will be filled manually */}
          {/* Box 2 */}
          <div className="relative border-2 border-gray-200 cursor-pointer transition-all flex flex-col overflow-hidden hover:shadow-lg">
            <div className="relative w-full aspect-square bg-gray-200 flex items-center justify-center p-4">
              <div className="text-gray-400 text-xs">Image 2</div>
            </div>
            <div className="bg-white p-3 border-t border-gray-200">
              <h4 className="text-xs font-semibold text-black text-center">
                Placeholder 2
              </h4>
            </div>
          </div>

          {/* Box 3 */}
          <div className="relative border-2 border-gray-200 cursor-pointer transition-all flex flex-col overflow-hidden hover:shadow-lg">
            <div className="relative w-full aspect-square bg-gray-200 flex items-center justify-center p-4">
              <div className="text-gray-400 text-xs">Image 3</div>
            </div>
            <div className="bg-white p-3 border-t border-gray-200">
              <h4 className="text-xs font-semibold text-black text-center">
                Placeholder 3
              </h4>
            </div>
          </div>

          {/* Box 4 */}
          <div className="relative border-2 border-gray-200 cursor-pointer transition-all flex flex-col overflow-hidden hover:shadow-lg">
            <div className="relative w-full aspect-square bg-gray-200 flex items-center justify-center p-4">
              <div className="text-gray-400 text-xs">Image 4</div>
            </div>
            <div className="bg-white p-3 border-t border-gray-200">
              <h4 className="text-xs font-semibold text-black text-center">
                Placeholder 4
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step13;