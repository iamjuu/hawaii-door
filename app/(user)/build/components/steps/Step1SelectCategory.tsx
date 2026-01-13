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
  
    return (
      <div className="mt-[50px] md:mb-[70px] mb-[50px]  md:pr-20">
        <h2 className="text-[20px] md:text-[32px] font-[500] font-roboto mb-8 text-black">Select Door Category</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doorCategories.map((category) => (
            <div
              key={category.name}
              onClick={() => {
                setQuoteData({ ...quoteData, doorType: category.name });
                if (onNext) {
                  setTimeout(() => {
                    onNext(category.name);
                  }, 300);
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
              {quoteData.doorType === category.name && (
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
      </div>
    );
  };
  
  export default Step1SelectCategory;