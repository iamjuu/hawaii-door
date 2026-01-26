"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import threeshold from "../../../../../public/assets/images/dummy/threshold.png";
import usleep from "../../../../../public/assets/images/dummy/usleep.png";
import staple from "../../../../../public/assets/images/dummy/staple.png";
import noneimg from "../../../../../public/assets/images/dummy/none.png";

interface StepProps {
  quoteData: any;
  setQuoteData: (data: any) => void;
  onNext?: () => void;
}

const Step11 = ({ quoteData, setQuoteData, onNext }: StepProps) => {
  const [selectedProtectOption, setSelectedProtectOption] = useState<
    string | null
  >(quoteData.protectDoorOption || null);

  // Sync local state with quoteData when it changes (e.g., when navigating back/forward)
  useEffect(() => {
    setSelectedProtectOption(quoteData.protectDoorOption || null);
  }, [quoteData.protectDoorOption]);

  const handleProtectSelect = (option: string) => {
    setSelectedProtectOption(option);
    setQuoteData({
      ...quoteData,
      protectDoorOption: option,
    });

    // Auto-advance to next step after selecting an option (like Step 7 and Step 10)
    if (onNext) {
      setTimeout(() => {
        onNext();
      }, 300);
    }
  };

  return (
    <div className="mt-[50px] mb-[50px] max-w-[900px]">
      <h2 className="text-[20px] md:text-[32px] font-roboto font-[500] mb-5 md:mb-8 text-black">Protect Door</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* None */}
        <div
          onClick={() => handleProtectSelect("none")}
          className={`
            relative border-2 p-3 cursor-pointer transition-all flex flex-col
            hover:shadow-lg
            ${
              selectedProtectOption === "none"
                ? "border-[#FF6E4A] bg-white shadow-lg"
                : "border-gray-200 bg-white"
            }
          `}
        >
          <div className="relative w-full max-w-[115px] aspect-4/3 mx-auto mb-4 md:mb-11  mt-3 md:mt-8">
            <Image src={noneimg} alt="None" fill className="object-contain" />
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-black text-center mb-1 flex-1">
              None
            </h3>
            {selectedProtectOption === "none" && (
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#FF6E4A] flex items-center justify-center flex-shrink-0 ml-2">
                <svg
                  className="w-3 h-3 md:w-4 md:h-4 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Threshold */}
        <div
          onClick={() => handleProtectSelect("threshold")}
          className={`
            relative border-2 p-3 cursor-pointer transition-all flex flex-col hover:shadow-lg
            ${
              selectedProtectOption === "threshold"
                ? "border-[#FF6E4A] bg-white shadow-lg"
                : "border-gray-200 bg-white"
            }
          `}
        >
          <div className="relative w-full max-w-[200px] aspect-4/3 mx-auto mb-3">
            <Image
              src={threeshold}
              alt="Threshold"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-black text-center mb-1 flex-1">
              Threshold
            </h3>
            {selectedProtectOption === "threshold" && (
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#FF6E4A] flex items-center justify-center flex-shrink-0 ml-2">
                <svg
                  className="w-3 h-3 md:w-4 md:h-4 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Door Sweep (U-Sweep) */}
        <div
          onClick={() => handleProtectSelect("usweep")}
          className={`
            relative border-2 p-3 cursor-pointer transition-all flex flex-col hover:shadow-lg
            ${
              selectedProtectOption === "usweep"
                ? "border-[#FF6E4A] bg-white shadow-lg"
                : "border-gray-200 bg-white"
            }
          `}
        >
          <div className="relative w-full max-w-[200px] aspect-4/3 mx-auto mb-3">
            <Image
              src={usleep}
              alt="Door Sweep (U-Sweep)"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-black text-center mb-1 flex-1">
              Door Sweep (U-Sweep)
            </h3>
            {selectedProtectOption === "usweep" && (
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#FF6E4A] flex items-center justify-center flex-shrink-0 ml-2">
                <svg
                  className="w-3 h-3 md:w-4 md:h-4 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Staple on Sweep */}
        <div
          onClick={() => handleProtectSelect("staple")}
          className={`
            relative border-2 p-3 cursor-pointer transition-all flex flex-col hover:shadow-lg
            ${
              selectedProtectOption === "staple"
                ? "border-[#FF6E4A] bg-white shadow-lg"
                : "border-gray-200 bg-white"
            }
          `}
        >
          <div className="relative w-full max-w-[200px] aspect-4/3 mx-auto mb-3">
            <Image
              src={staple}
              alt="Staple on Sweep"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-black text-center mb-1 flex-1">
              Staple on Sweep
            </h3>
            {selectedProtectOption === "staple" && (
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#FF6E4A] flex items-center justify-center flex-shrink-0 ml-2">
                <svg
                  className="w-3 h-3 md:w-4 md:h-4 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step11;