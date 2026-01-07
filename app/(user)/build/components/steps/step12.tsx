"use client";

import Image from "next/image";
import { useState } from "react";
import noneimg from "../../../../../public/assets/images/dummy/none.png";
import viewer from "../../../../../public/assets/images/dummy/viewer.png";

interface StepProps {
  quoteData: any;
  setQuoteData: (data: any) => void;
}

const Step12 = ({ quoteData, setQuoteData }: StepProps) => {
  const [selectedAddOnOption, setSelectedAddOnOption] = useState<string | null>(
    quoteData.addOnOption || null
  );

  const handleAddOnSelect = (option: string) => {
    setSelectedAddOnOption(option);
    setQuoteData({
      ...quoteData,
      addOnOption: option,
    });
  };

  return (
    <div className="mt-[50px] mb-[50px]">
      <h2 className="text-[32px] font-medium text-black mb-8">Add On&apos;s</h2>

      <div className="grid grid-cols-2 gap-6 max-w-[600px]">
        {/* None */}
        <div
          onClick={() => handleAddOnSelect("none")}
          className={`
            relative border-2 p-3 cursor-pointer transition-all flex flex-col
            hover:shadow-lg
            ${
              selectedAddOnOption === "none"
                ? "border-orange-500 shadow-lg bg-orange-50"
                : "border-gray-200 bg-white"
            }
          `}
        >
          {selectedAddOnOption === "none" && (
            <div className="absolute top-3 right-3 z-10">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
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

          <div className="relative w-full max-w-[115px] aspect-4/3 mx-auto mb-11 mt-8">
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
                ? "border-orange-500 shadow-lg bg-orange-50"
                : "border-gray-200 bg-white"
            }
          `}
        >
          {selectedAddOnOption === "viewer" && (
            <div className="absolute top-3 right-3 z-10">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
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