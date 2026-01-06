"use client";

import { useState } from "react";
import Image from "next/image";
import m1img from "../../../../../public/assets/images/dummy/m1.png";
import m2img from "../../../../../public/assets/images/dummy/m2.png";
import m3img from "../../../../../public/assets/images/dummy/m3.png";
import m4img from "../../../../../public/assets/images/dummy/m4.png";

interface StepProps {
  quoteData: any;
  setQuoteData: (data: any) => void;
}

const Step5 = ({ quoteData, setQuoteData }: StepProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    quoteData.wallThickness || null
  );
  const [customDiameter, setCustomDiameter] = useState<string>(
    quoteData.customDiameter || ""
  );

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setQuoteData({
      ...quoteData,
      wallThickness: option,
    });
  };

  const handleCustomDiameterChange = (value: string) => {
    setCustomDiameter(value);
    setQuoteData({
      ...quoteData,
      customDiameter: value,
    });
  };

  return (
    <div className="mt-[50px] mb-[50px]">
      <h2 className="text-3xl font-bold mb-8">What is the Wall Thickness</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Option 1 */}
        <div
          onClick={() => handleOptionSelect("option1")}
          className={`
            relative border-2 rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all
            hover:border-orange-500 hover:shadow-lg
            ${
              selectedOption === "option1"
                ? "border-orange-500 shadow-lg bg-orange-50"
                : "border-gray-200 bg-white"
            }
          `}
        >
          {/* Selected Badge */}
          {selectedOption === "option1" && (
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
          <div className="relative w-full aspect-[4/3] mb-3">
            <Image
              src={m1img}
              alt="Wall thickness option 1"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-sm text-gray-700 font-medium text-center">
            Option 1
          </p>
        </div>

        {/* Option 2 */}
        <div
          onClick={() => handleOptionSelect("option2")}
          className={`
            relative border-2 rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all
            hover:border-orange-500 hover:shadow-lg
            ${
              selectedOption === "option2"
                ? "border-orange-500 shadow-lg bg-orange-50"
                : "border-gray-200 bg-white"
            }
          `}
        >
          {/* Selected Badge */}
          {selectedOption === "option2" && (
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
          <div className="relative w-full aspect-[4/3] mb-3">
            <Image
              src={m2img}
              alt="Wall thickness option 2"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-sm text-gray-700 font-medium text-center">
            Option 2
          </p>
        </div>

        {/* Option 3 */}
        <div
          onClick={() => handleOptionSelect("option3")}
          className={`
            relative border-2 rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all
            hover:border-orange-500 hover:shadow-lg
            ${
              selectedOption === "option3"
                ? "border-orange-500 shadow-lg bg-orange-50"
                : "border-gray-200 bg-white"
            }
          `}
        >
          {/* Selected Badge */}
          {selectedOption === "option3" && (
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
          <div className="relative w-full aspect-[4/3] mb-3">
            <Image
              src={m3img}
              alt="Wall thickness option 3"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-sm text-gray-700 font-medium text-center">
            Option 3
          </p>
        </div>

        {/* Option 4 */}
        <div
          onClick={() => handleOptionSelect("option4")}
          className={`
            relative border-2 rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all
            hover:border-orange-500 hover:shadow-lg
            ${
              selectedOption === "option4"
                ? "border-orange-500 shadow-lg bg-orange-50"
                : "border-gray-200 bg-white"
            }
          `}
        >
          {/* Selected Badge */}
          {selectedOption === "option4" && (
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
          <div className="relative w-full aspect-[4/3] mb-3">
            <Image
              src={m4img}
              alt="Wall thickness option 4"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-sm text-gray-700 font-medium text-center">
            Option 4
          </p>
        </div>

        {/* Input card – only input, no image */}
        <div className="border-2 border-gray-200 rounded-lg p-4 flex flex-col justify-center bg-white">
          <input
            type="text"
            value={customDiameter}
            onChange={(e) => handleCustomDiameterChange(e.target.value)}
            placeholder="Enter Diameter"
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Step5;