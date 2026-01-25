import Image from "next/image";
import { ProductFootericonDoor, ProductFootericonSettings } from "@/public/assets";

// 👉 CHANGE WIDTH HERE ONLY
const CONTENT_WIDTH = "max-w-7xl";

const GalleryBox = () => {
  return (
    <div className="w-full flex items-center justify-center bg-[#F6F5F1]">
      <div className={`${CONTENT_WIDTH} relative flex flex-col md:flex-row justify-center items-center gap-4 md:gap-16 py-3 md:py-[25px] group cursor-pointer mt-0`}>
        
        <p className="flex items-center gap-[10px] items-center">      
          <Image src={ProductFootericonDoor} className="size-[32px]" alt="Door" width={100} height={100} />        
          Delivered Across Hawaii.        
        </p>
        
        <p className="flex items-center gap-[10px] items-center">      
          <Image src={ProductFootericonSettings} className="size-[32px]" alt="Door" width={100} height={100} />        
          True Hawaii Spec    
        </p>

      </div>
    </div>
  );
};

export default GalleryBox;

