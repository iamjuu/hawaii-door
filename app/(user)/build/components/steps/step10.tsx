"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import noneimg from "../../../../../public/assets/images/dummy/none.png";
import plainimg from "../../../../../public/assets/images/dummy/plain.png";
import ballimg from "../../../../../public/assets/images/dummy/ball.png";

interface StepProps {
  quoteData: any;
  setQuoteData: (data: any) => void;
  onNext?: () => void;
}

const Step10 = ({ quoteData, setQuoteData, onNext }: StepProps) => {
  const [selectedHangOption, setSelectedHangOption] = useState<string | null>(
    quoteData.hangDoorOption || null
  );

  // Sync local state with quoteData when it changes (e.g., when navigating back/forward)
  useEffect(() => {
    setSelectedHangOption(quoteData.hangDoorOption || null);
  }, [quoteData.hangDoorOption]);

  const handleHangSelect = (option: string) => {
    setSelectedHangOption(option);
    setQuoteData({
      ...quoteData,
      hangDoorOption: option,
    });

    // Auto-advance to next step after selecting an option (like Step 7)
    if (onNext) {
      setTimeout(() => {
        onNext();
      }, 300);
    }
  };

  return (
    <div className="mt-[50px] mb-[50px] max-w-[900px]">
      <h2 className="text-[20px] md:text-[32px] font-roboto font-[500] mb-5 md:mb-8 text-black">Hang Door</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1: None (pre-hung) */}
        <div
          onClick={() => handleHangSelect("none")}
          className={`
            relative border-2 p-3 cursor-pointer transition-all flex flex-col
            hover:shadow-lg
            ${
              selectedHangOption === "none"
                ? "border-[#FF6E4A] bg-white shadow-lg"
                : "border-gray-200 bg-white"
            }
          `}
        >
          <div className="relative w-full max-w-[115px] aspect-4/3 mx-auto mb-6  mt-3 md:mt-8">
            <Image
              src={noneimg}
              alt="None (pre-hung door)"
              fill
              className="object-contain"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-black text-center mb-1">
                None
              </h3>
              <p className="text-xs text-gray-600 text-center">(pre-hung door)</p>
            </div>
            {/* Selected Badge */}
            {selectedHangOption === "none" && (
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#FF6E4A] flex items-center justify-center flex-shrink-0 ml-2">
                <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* 2: Plain Bearing Hinges */}
        <div
          onClick={() => handleHangSelect("plain_bearing")}
          className={`
            relative border-2 p-3 pt-0 cursor-pointer transition-all flex flex-col items-center
            hover:shadow-lg
            ${
              selectedHangOption === "plain_bearing"
                ? "border-[#FF6E4A] bg-white shadow-lg"
                : "border-gray-200 bg-white"
            }
          `}
        >
          <div className="relative w-full max-w-[200px] aspect-4/3 mx-auto mb-3">
            <Image
              src={plainimg}
              alt="Plain Bearing Hinges"
              fill
              className="object-contain"
            />
          </div>

          <div className="flex items-center justify-between w-full">
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-black text-center mb-1">
                Plain Bearing Hinges
              </h3>
              <p className="text-[10px] text-gray-600 text-center">
                (3) 4.5&quot; x 4.5&quot; Hinges - not for use with a door closer
              </p>
            </div>
            {/* Selected Badge */}
            {selectedHangOption === "plain_bearing" && (
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#FF6E4A] flex items-center justify-center flex-shrink-0 ml-2">
                <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* 3: Ball Bearing Hinges */}
        <div
          onClick={() => handleHangSelect("ball_bearing")}
          className={`
            relative border-2 p-3 pt-0 cursor-pointer transition-all flex flex-col items-center
            hover:shadow-lg
            ${
              selectedHangOption === "ball_bearing"
                ? "border-[#FF6E4A] bg-white shadow-lg "
                : "border-gray-200 bg-white"
            }
          `}
        >
          <div className="relative w-full max-w-[200px] aspect-4/3 mx-auto mb-3">
            <Image
              src={ballimg}
              alt="Ball Bearing Hinges"
              fill
              className="object-contain"
            />
          </div>

          <div className="flex items-center justify-between w-full">
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-black text-center mb-1">
                Ball Bearing Hinges
              </h3>
              <p className="text-xs text-gray-600 text-center">
                (3) 4.5&quot; x 4.5&quot; hinges per door
              </p>
              <p className="text-[10px] text-gray-600 text-center mt-1">
                (4) hinges for 8&apos;0&quot; height door
              </p>
            </div>
            {/* Selected Badge */}
            {selectedHangOption === "ball_bearing" && (
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#FF6E4A] flex items-center justify-center flex-shrink-0 ml-2">
                <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step10;