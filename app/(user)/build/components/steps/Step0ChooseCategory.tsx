"use client";

import { ChevronRight } from "lucide-react";
import {
  intiordooricon,
  extiordoor,
} from "@/public/assets";

interface StepProps {
  quoteData: { productCategory?: string };
  setQuoteData: (data: any) => void;
  onNext?: (productCategory?: string) => void;
}

const doorCards: {
  title: string;
  value: string;
  image: string | { src: string };
  description?: string;
}[] = [
  { title: "Interior Door", value: "interior", image: intiordooricon },
  { title: "Exterior Door", value: "exterior", image: extiordoor },
];

export default function Step0ChooseCategory({
  quoteData,
  setQuoteData,
  onNext,
}: StepProps) {
  const handleSelect = (value: string) => {
    setQuoteData({ ...quoteData, productCategory: value });
    if (onNext) {
      setTimeout(() => onNext(value), 300);
    }
  };

  return (
    <div className="mt-[25px] mb-[50px] md:pr-[90px]">
      <h2 className="text-[20px] md:text-[32px] font-[500] font-roboto mb-8 text-black">
        Choose Door Category
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[900px]">
        {doorCards.map((door) => {
          const isSelected = quoteData.productCategory === door.value;
          const imageSrc =
            typeof door.image === "string" ? door.image : door.image.src;
          const description = door.description;
          return (
            <div
              key={door.value}
              onClick={() => handleSelect(door.value)}
              style={{
                backgroundImage: `url('${imageSrc}')`,
                backgroundSize: "fit",
                backgroundPosition: "left",
                backgroundRepeat: "no-repeat",
              }}
              className={`group rounded-lg w-full max-w-[407px] overflow-hidden shadow-lg h-[265px] flex flex-col justify-end border cursor-pointer transition-colors ${
                isSelected
                  ? "border-[#FF6E4A] ring-2 ring-[#FF6E4A]/30"
                  : "border-white hover:border-[#FF6E4A]"
              }`}
            >
              <div className="w-full h-full flex justify-between">
                <div className="w-[20%]" />

                <div
                  className="w-[80%] flex flex-col justify-around items-end pr-3"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 30%)",
                  }}
                >
                  <div className="w-[193px] pt-8">
                    <h1 className="text-[20px] font-[500]  sm:text-center text-ent font-roboto mb-2">
                      {door.title}
                    </h1>
                    {description && (
                      <p className="text-[14px] font-[300] font-roboto text-black md:text-[#616161]">
                        {description}
                      </p>
                    )}
                  </div>

                  <div className="flex w-full justify-end items-center gap-2 px-3 mb-2">
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#FF6E4A] flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                    <div
                      className={`w-5 h-5 border rounded-full flex items-center justify-center transition-colors ${
                        isSelected
                          ? "border-[#FF6E4A] text-[#FF6E4A]"
                          : "border-black group-hover:border-[#FF6E4A] group-hover:text-[#FF6E4A]"
                      }`}
                    >
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
