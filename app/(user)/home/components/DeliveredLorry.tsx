import Image from "next/image";
import { ProductFootericonTruck } from "@/public/assets";

const DeliveredLorry = () => {
  return (
    <div className="relative w-full py-[30px] flex flex-col md:flex-row justify-center items-center gap-4 md:gap-16 bg-[#F6F5F1] cursor-pointer">
      <div className="flex items-center gap-2">
        <Image
          src={ProductFootericonTruck}
          alt="Delivered"
          width={32}
          height={32}
          className="w-6 h-6 md:w-8 md:h-8 md:grayscale md:group-hover:grayscale-0 transition-all duration-500"
        />
        <span className="text-[#585858] font-roboto text-sm md:text-lg">
          Delivered Across Hawaii.
        </span>
      </div>
    </div>
  );
};

export default DeliveredLorry;

