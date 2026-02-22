import Image from "next/image";
import { useState } from "react";
import { GoChevronRight } from "react-icons/go";
import FiberDoorImage from "../../../../../public/assets/images/landing/door41.png"
import HollowCoreDoorImage from "../../../../../public/assets/images/landing/door5050.png"
import ParticleCoreDoorImage from "../../../../../public/assets/images/dummy/door5151.png"
import SCLCDoorImage from "../../../../../public/assets/images/landing/door33.png"
import OtherDoorImage from "../../../../../public/assets/images/dummy/door531.png"
import WoodCoreDoorImage from "../../../../../public/assets/images/dummy/door54.png"
import vector123 from "../../../../../public/assets/images/dummy/vector123.png"
interface StepProps {
    quoteData: any;
    setQuoteData: (data: any) => void;
    onNext?: (doorType?: string) => void;
  }
  
  const Step1SelectCategory = ({ quoteData, setQuoteData, onNext }: StepProps) => {
    const doorCategories = [
      { name: "Fibre Glass Door", image: FiberDoorImage, size: "8'0\"" },
      { name: "Hollow Core Door", image: HollowCoreDoorImage, size: "8'0\"" },
      { name: "Particle Core Door", image: ParticleCoreDoorImage, size: "8'0\"" },
      { name: "Wood Core Door", image:WoodCoreDoorImage, size: "8'0\"" },
      { name: "Solid Core Laminated Construction (SCLC)", image:SCLCDoorImage, size: "8'0\"" },
     
      { name: "Other (Special Order)", image: OtherDoorImage, size: "8'0\"" },
      
    ];

    const predefinedCategories = doorCategories.map(cat => cat.name);
    const isCustomDoor = quoteData.doorType && !predefinedCategories.includes(quoteData.doorType);
    
    const [customDoorType, setCustomDoorType] = useState(isCustomDoor ? quoteData.doorType : "");
    const [showOtherInput, setShowOtherInput] = useState(isCustomDoor);
  
    return (
      <div className="mt-[25px] md:mt-[50px] md:mb-[70px] mb-[50px]  md:pr-20">
        <h2 className="text-[20px] md:text-[32px] font-[500] font-roboto mb-8 text-black">Select Your Core</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doorCategories.map((category) => (
            <div
              key={category.name}
              onClick={() => {
                if (category.name === "Other (Special Order)") {
                  setQuoteData({ ...quoteData, doorType: category.name });
                  setShowOtherInput(true);
                } else {
                  setQuoteData({ ...quoteData, doorType: category.name });
                  setShowOtherInput(false);
                  if (onNext) {
                    setTimeout(() => {
                      onNext(category.name);
                    }, 300);
                  }
                }
              }}
              className={`
                relative rounded-t-[9.32px] rounded-b-[12.42px] pb-3 cursor-pointer transition-all flex flex-col
                shadow-md hover:border-orange-500 hover:shadow-lg
                ${
                  quoteData.doorType === category.name
                    ? "border-gray-200 bg-white"
                    : "border-gray-200 bg-white"
                }
              `}
            >
              {/* Selected Badge */}
              {(quoteData.doorType === category.name || (category.name === "Other (Special Order)" && isCustomDoor)) && (
                <div className="absolute top-3 right-3 z-10">
                  <div className="w-8 h-8 bg-[#FF6E4A] rounded-full flex items-center justify-center shadow-lg">
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

              <div 
                className="aspect-[4/2.5] md:aspect-[4/4.3] rounded-t-[9.32px] mb-4 relative bg-gradient-to-b from-[#F3F4F6] to-[#E5E7EB]"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className={`object-contain rounded-t-[9.32px] ${
                    category.name === "Wood Core Door" || category.name === "Other (Special Order)"
                      ? "scale-75"
                      : ""
                  }`}
                />
              </div>

<div className="mt-auto px-4 pb-1 min-h-[45px] flex flex-col justify-between">
<h3 className="font-medium text-[12px] text-black leading-4">
  {category.name}
</h3>
              <p className="text-sm w-full text-[12px] text-black text-center  flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Image src={vector123} alt="size icon" width={10} height={10} />
                  {category.size}
                </span>
                <GoChevronRight className="text-black text-base" />
              </p>
</div>
            </div>
          ))}
        </div>

        {/* Custom Door Type Input for "Other" */}
        {showOtherInput && (
          <div className="mt-6 max-w-md">
            <input
              type="text"
              value={customDoorType}
              onChange={(e) => {
                const value = e.target.value.slice(0, 20); // Limit to 20 characters
                setCustomDoorType(value);
                setQuoteData({ ...quoteData, doorType: value || "Other (Special Order)" });
              }}
              onBlur={() => {
                if (customDoorType.trim()) {
                  setQuoteData({ ...quoteData, doorType: customDoorType.trim() });
                }
              }}
              maxLength={20}
              placeholder="Please specify your door"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-[14px] md:text-[16px] font-roboto"
            />
            <p className="text-xs text-gray-500 mt-2">
              {customDoorType.length}/20 characters
            </p>
          </div>
        )}
      </div>
    );
  };
  
  export default Step1SelectCategory;