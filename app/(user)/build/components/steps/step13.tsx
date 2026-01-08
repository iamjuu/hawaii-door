"use client";

import Image from "next/image";
import { useState } from "react";
import clearwhite from "../../../../../public/assets/images/dummy/clearwhite1.png";
import oak from "../../../../../public/assets/images/dummy/oak1.png";
import primedwhite from "../../../../../public/assets/images/dummy/primed1.png";
import rotted from "../../../../../public/assets/images/dummy/rotary1.png";

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

  const finishOptions = [
    {
      id: "clearwhite",
      image: clearwhite,
      title: "Clear White Brich Prefinished",
      alt: "Clear White Brich Prefinished",
    },
    {
      id: "oak",
      image: oak,
      title: "Clear Oak Prefinished",
      alt: "Placeholder 2",
    },
    {
      id: "primedwhite",
      image: primedwhite,
      title: "Primed White Hardboard",
      alt: "Placeholder 3",
    },
    {
      id: "rotted",
      image: rotted,
      title: "Unfinished Rotary Natural Birch",
      alt: "Placeholder 4",
    },
  ];

  return (
    <div className="mt-[50px] mb-[50px]">
      <h2 className="text-[32px] font-medium text-black mb-8">
        Door Finish & Notes
      </h2>

      <div className="w-full border-2 border-gray-100 rounded-xl p-6">
        <h3 className="text-[16px] font-roboto  text-[#0A0A0A]  mb-6">Door Finish</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {finishOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => handleFinishSelect(option.id)}
              className={`
                relative cursor-pointer transition-all flex flex-col overflow-hidden
                rounded-xl shadow-md hover:shadow-lg max-w-[230px] mx-auto
                ${
                  selectedFinishOption === option.id
                    ? "shadow-lg"
                    : ""
                }
              `}
            >
              {selectedFinishOption === option.id && (
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

              <div className="relative w-full aspect-[4/3] bg-gradient-to-b from-[#F3F4F6] to-[#E5E7EB] flex items-center justify-center p-3">
                <Image
                  src={option.image}
                  alt={option.alt}
                  width={130}
                  height={130}
                  className="object-contain"
                />
              </div>
              <div className="bg-white p-3 border-t border-gray-200">
                <h4 className="text-[19.48px] font-roboto text-[#2C2C2C] text-center px-4">
                  {option.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step13;