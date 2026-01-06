import Image from "next/image";
import { StaticImageData } from "next/image";
interface InfoBannerProps {
  icon: StaticImageData;
  text: string;
}
  
  const InfoBanner = ({ icon, text }: InfoBannerProps) => {
    return (
      <div className="relative w-full min-h-[68px] md:h-[68px] flex flex-col md:flex-row justify-center items-center gap-4 md:gap-16 py-3 md:py-0 bg-[#F6F5F1] group cursor-pointer mt-18 md:mt-20 p-6">
        <div className="flex items-center md:flex-row gap-2">
        <Image
  src={icon}
  alt="Info icon"
  width={28}
  height={28}
  className="object-contain"
/>
          <span className="text-[#585858] font-roboto text-sm md:text-base">
            {text}
          </span>
        </div>
      </div>
    );
  };
  
  export default InfoBanner;