"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import noneimg from "../../../../../public/assets/images/dummy/none.png";
import viewer from "../../../../../public/assets/images/dummy/viewer.png";

interface StepProps {
  quoteData: any;
  setQuoteData: (data: any) => void;
  onNext?: () => void;
}

const Step12 = ({ quoteData, setQuoteData, onNext }: StepProps) => {
  const [selectedAddOnOption, setSelectedAddOnOption] = useState<string | null>(
    quoteData.addOnOption || null
  );

  // Sync local state with quoteData when it changes (e.g., when navigating back/forward)
  useEffect(() => {
    setSelectedAddOnOption(quoteData.addOnOption || null);
  }, [quoteData.addOnOption]);

  const handleAddOnSelect = (option: string) => {
    setSelectedAddOnOption(option);
    setQuoteData({
      ...quoteData,
      addOnOption: option,
    });

    // Auto-advance to next step after selecting an option (like Step 7, Step 10, and Step 11)
    if (onNext) {
      setTimeout(() => {
        onNext();
      }, 300);
    }
  };

  return (
    <div className="mt-[50px] mb-[50px] max-w-[900px]">
      <h2 className="text-[20px] md:text-[32px] font-roboto font-[500] mb-5 md:mb-8 text-black">Add On&apos;s</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[600px]">
        {/* None */}
        <div
          onClick={() => handleAddOnSelect("none")}
          className={`
            relative border-2 p-3 cursor-pointer transition-all flex flex-col
            hover:shadow-lg
            ${
              selectedAddOnOption === "none"
                ? "border-gray-200 bg-whiteshadow-lg"
                : "border-gray-200 bg-white"
            }
          `}
        >
          {selectedAddOnOption === "none" && (
            <div className="absolute top-3 right-3 z-10">
              <div className="w-8 h-8 bg-[#FF6E4A]-500 rounded-full flex items-center justify-center shadow-lg">
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

          <div className="relative w-full max-w-[115px] aspect-4/3 mx-auto mb-3 md:mb-11 mbt-3 md:mt-8">
            <Image src={noneimg} alt="None" fill className="object-contain" />
          </div>
          <h3 className="text-sm font-semibold text-black text-center mb-1">
            None
          </h3>
        </div>

        {/* Door Viewer (TD-VIEWER) */}
        <div
          onClick={() => handleAddOnSelect("viewer")}
          className={`
            relative border-2 p-3 cursor-pointer transition-all flex flex-col hover:shadow-lg
            ${
              selectedAddOnOption === "viewer"
                ? "border-gray-200 bg-white shadow-lg "
                : "border-gray-200 bg-white"
            }
          `}
        >
          {selectedAddOnOption === "viewer" && (
            <div className="absolute top-3 right-3 z-10">
              <div className="w-8 h-8 bg-[#FF6E4A]-500 rounded-full flex items-center justify-center shadow-lg">
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

          <div className="relative w-full max-w-[200px] aspect-4/3 mx-auto mb-3">
            <Image
              src={viewer}
              alt="Door Viewer (TD-VIEWER)"
              fill
              className="object-contain"
            />
          </div>
          <h3 className="text-sm font-semibold text-black text-center mb-1">
            Door Viewer (TD-VIEWER)
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Step12;