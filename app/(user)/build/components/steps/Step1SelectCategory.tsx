import Image from "next/image";
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
  }
  
  const Step1SelectCategory = ({ quoteData, setQuoteData }: StepProps) => {
    const doorCategories = [
      { name: "Fibre Glass Door", image: FiberDoorImage, size: "8'0\"" },
      { name: "Hollow Core Door", image: HollowCoreDoorImage, size: "8'0\"" },
      { name: "Particle Core Door", image: ParticleCoreDoorImage, size: "8'0\"" },
      { name: "Wood Core Door", image:WoodCoreDoorImage, size: "8'0\"" },
      { name: "Solid Core Laminated Construction (SCLC)", image:SCLCDoorImage, size: "8'0\"" },
     
      { name: "Other (Special Order)", image: OtherDoorImage, size: "8'0\"" },
      
    ];
  
    return (
      <div className="mt-[50px] mb-[50px]  md:pr-20">
        <h2 className="text-[32px] font-medium font-roboto mb-8 text-black">Select Door Category</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doorCategories.map((category) => (
            <div
              key={category.name}
              onClick={() => setQuoteData({ ...quoteData, doorType: category.name })}
              className={`
                relative border-2 rounded-lg pb-3 cursor-pointer transition-all flex flex-col
                hover:border-orange-500 hover:shadow-lg
                ${
                  quoteData.doorType === category.name
                    ? "border-orange-500 shadow-lg bg-orange-50"
                    : "border-gray-200 bg-white"
                }
              `}
            >
              {/* Selected Badge */}
              {quoteData.doorType === category.name && (
                <div className="absolute top-3 right-3 z-10">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-5 h-5 text-black"
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
                className="aspect-[4/4.3] rounded mb-4 relative bg-gradient-to-b from-[#F3F4F6] to-[#E5E7EB]"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className={`object-contain rounded ${
                    category.name === "Wood Core Door" || category.name === "Other (Special Order)"
                      ? "scale-75"
                      : ""
                  }`}
                />
              </div>

<div className="mt-auto px-3 min-h-[50px] flex flex-col justify-between">
<h3 className="font-medium text-[12px] text-black leading-4">
  {category.name}
</h3>
              <p className="text-sm w-full text-[12px] text-black text-center mt-2 flex items-center justify-between">
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
      </div>
    );
  };
  
  export default Step1SelectCategory;