import Image from "next/image";
import { GoChevronRight } from "react-icons/go";
import FiberDoorImage from "../../../../../public/assets/images/landing/Door4 8.02.03 PM.png"
import HollowCoreDoorImage from "../../../../../public/assets/images/dummy/door50.png"
import ParticleCoreDoorImage from "../../../../../public/assets/images/dummy/door51.png"
import SCLCDoorImage from "../../../../../public/assets/images/landing/Door3 8.02.03 PM.png"
import OtherDoorImage from "../../../../../public/assets/images/dummy/door53.png"
import WoodCoreDoorImage from "../../../../../public/assets/images/dummy/door54.png"
interface StepProps {
    quoteData: any;
    setQuoteData: (data: any) => void;
  }
  
  const Step1SelectCategory = ({ quoteData, setQuoteData }: StepProps) => {
    const doorCategories = [
      { name: "Fibre Glass Door", image: FiberDoorImage, size: "8'0\"" },
      { name: "Hollow Core Door", image: HollowCoreDoorImage, size: "8'0\"" },
      { name: "Particle Core Door", image: ParticleCoreDoorImage, size: "8'0\"" },
      { name: "Solid Core Laminated Construction (SCLC)", image:SCLCDoorImage, size: "8'0\"" },
      { name: "Wood Core Door", image:WoodCoreDoorImage, size: "8'0\"" },
      { name: "Other (Special Order)", image: OtherDoorImage, size: "8'0\"" },
      
    ];
  
    return (
      <div className="mt-[50px] mb-[50px]">
        <h2 className="text-3xl font-bold mb-8">Select Door Category</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doorCategories.map((category) => (
            <div
              key={category.name}
              onClick={() => setQuoteData({ ...quoteData, doorType: category.name })}
              className={`
                relative border-2 rounded-lg p-3 cursor-pointer transition-all
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

              <div className="aspect-square bg-gray-100 rounded mb-4 relative">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-contain rounded"
                />
              </div>

              <h3 className="font-medium text-center">{category.name}</h3>
              <p className="text-sm text-gray-500 text-center mt-2 flex justify-evenly">{category.size} <GoChevronRight className="text-gray-400 text-base" /> </p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Step1SelectCategory;