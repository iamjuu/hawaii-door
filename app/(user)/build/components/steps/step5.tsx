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
  onNext?: () => void;
}

const Step5 = ({ quoteData, setQuoteData, onNext }: StepProps) => {
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
      wallThickness: option,      // store the selected label as wallThickness
      customDiameter: "",         // clear custom diameter when a preset is chosen
    });

    // Auto-advance to next step after selecting a preset option (like Step 4)
    if (onNext) {
      setTimeout(() => {
        onNext();
      }, 300);
    }
  };

  const handleCustomDiameterChange = (value: string) => {
    setCustomDiameter(value);
    setQuoteData({
      ...quoteData,
      customDiameter: value,
      wallThickness: "",
    });
  };

  return (
    <div className="mt-[25px] mb-[50px]">
      <h2 className="text-[20px] md:text-[32px] font-roboto font-[500] mb-5 md:mb-8 text-black">What is the Wall Thickness</h2>

      <div className="max-w-[900px] w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Option 1 */}
        <div
          onClick={() => handleOptionSelect(`4-5/8\" (w/wood stud)`)}
          className={`
            relative border-2 p-4 flex flex-col items-center cursor-pointer transition-all
             hover:shadow-lg
            ${
              selectedOption === `4-5/8\" (w/wood stud)`
                ? " shadow-lg border-[#FF6E4A] bg-white "
                : "border-gray-200 bg-white"
            }
          `}
        >
          <div className="relative w-full aspect-[4/3] mb-3">
            <Image
              src={m4img}
              alt="Wall thickness option 1"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex items-center justify-between w-full">
            <p className="text-[12.7px] text-black font-roboto font-medium text-center flex-1">
              4-5/8" (w/wood stud)
            </p>
            {/* Selected Badge */}
            {selectedOption === `4-5/8\" (w/wood stud)` && (
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

        {/* Option 2 */}
        <div
          onClick={() => handleOptionSelect(`4-7/8\" (w/wood stud)`)}
          className={`
            relative border-2  p-4 flex flex-col items-center cursor-pointer transition-all
             hover:shadow-lg
            ${
              selectedOption === `4-7/8\" (w/wood stud)`
                ? "shadow-lg border-[#FF6E4A] bg-white"
                : "border-gray-200 bg-white"
            }
          `}
        >
          <div className="relative w-full aspect-[4/3] mb-3">
            <Image
              src={m3img}
              alt="Wall thickness option 2"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex items-center justify-between w-full">
            <p className="text-[12.7px] text-black font-roboto font-medium text-center flex-1">
              4-7/8" (w/wood stud)
            </p>
            {/* Selected Badge */}
            {selectedOption === `4-7/8\" (w/wood stud)` && (
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

        {/* Option 3 */}
        <div
          onClick={() => handleOptionSelect(`6-1/8\" (w/wood stud)`)}
          className={`
            relative border-2 p-4 flex flex-col items-center cursor-pointer transition-all
           hover:shadow-lg
            ${
              selectedOption === `6-1/8\" (w/wood stud)`
                ? "shadow-lg border-[#FF6E4A] bg-white"
                : "border-gray-200 bg-white"
            }
          `}
        >
          <div className="relative w-full aspect-[4/3] mb-3">
            <Image
              src={m2img}
              alt="Wall thickness option 3"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex items-center justify-between w-full">
            <p className="text-[12.7px] text-black font-roboto font-medium text-center flex-1">
              6-1/8" (w/wood stud)
            </p>
            {/* Selected Badge */}
            {selectedOption === `6-1/8\" (w/wood stud)` && (
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

        {/* Option 4 */}
        <div
          onClick={() => handleOptionSelect(`6-3/4\" (w/wood stud)`)}
          className={`
            relative border-2 p-4 flex flex-col items-center cursor-pointer transition-all
            hover:shadow-lg
            ${
              selectedOption === `6-3/4\" (w/wood stud)`
                ? "shadow-lg border-[#FF6E4A] bg-white"
                : "border-gray-200 bg-white"
            }
          `}
        >
          <div className="relative w-full aspect-[4/3] mb-3">
            <Image
              src={m1img}
              alt="Wall thickness option 4"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex items-center justify-between w-full">
            <p className="text-[12.7px] text-black font-roboto font-medium text-center flex-1">
              6-3/4" (w/wood stud)
            </p>
            {/* Selected Badge */}
            {selectedOption === `6-3/4\" (w/wood stud)` && (
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

        {/* Input card – custom value */}
        <div className="border-2 border-[#E9EAEE] p-4 flex flex-col items-center bg-white">
          <p className="text-[14.17px] font-roboto text-black text-center mb-2 font-robot">
            Other
          </p>
          <input
            type="text"
            value={customDiameter}
            onChange={(e) => handleCustomDiameterChange(e.target.value)}
            placeholder="Enter Diameter"
            className="w-full border border-[#E9EAEE] rounded-lg px-3 py-2.5 text-[10.37px] font-roboto text-black placeholder:text-[#9CA3AF] focus:outline-none focus:border-orange-500 "
          />
          <p className="mt-2 text-[10.03px] font-roboto text-black text-center font-robot">
            Enter value then click next
          </p>
        </div>
      </div>
    </div>
  );
};

export default Step5;