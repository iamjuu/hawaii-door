import Image from "next/image";
import { ProductFootericonDoor, ProductFootericonSettings, ProductFootericonTruck } from "@/public/assets";

const DoorCategoryBox = () => {
  return (
    <div className="relative w-full flex flex-col md:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-8 lg:gap-16 bg-[#F6F5F1] group cursor-pointer">
      <div className="py-3 sm:py-4 md:py-[25px] flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 lg:gap-[70px]  items-center">
        
        <p className="flex items-center gap-2 sm:gap-2.5 md:gap-[10px] text-xs sm:text-sm md:text-base">
          <Image src={ProductFootericonDoor} className="w-6 h-6 sm:w-7 sm:h-7 md:size-[32px]" alt="Door" width={100} height={100} />
          <span className="whitespace-nowrap">Custom Doors</span>
        </p>

        <p className="flex items-center gap-2 sm:gap-2.5 md:gap-[10px] text-xs sm:text-sm md:text-base">
          <Image src={ProductFootericonSettings} className="w-6 h-6 sm:w-7 sm:h-7 md:size-[32px]" alt="Settings" width={100} height={100} />
          <span className="whitespace-nowrap">Custom Jambs</span>
        </p>
        
        <p className="flex items-center gap-2 sm:gap-2.5 md:gap-[10px] text-xs sm:text-sm md:text-base">
          <Image src={ProductFootericonTruck} className="w-6 h-6 sm:w-7 sm:h-7 md:size-[32px]" alt="Truck" width={100} height={100} />
          <span className="whitespace-nowrap">Complete Precision</span>
        </p>
      </div>
    </div>
  );
};

export default DoorCategoryBox;

