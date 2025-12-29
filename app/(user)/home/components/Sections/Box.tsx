import Image from "next/image";
import treeImage from "../../../../../public/assets/images/landing/tree.png"
import usaImage from "../../../../../public/assets/images/landing/usa.png"

const Box = () => {
  return (
    <div className="relative w-full min-h-[68px] md:h-[68px] flex flex-col md:flex-row justify-center items-center gap-4 md:gap-16 py-3 md:py-0 bg-[#F6F5F1] group cursor-pointer">

      {/* Item 1 */}
      <div className="flex  items-center md:flex-row gap-2">
        <Image
          src={usaImage}
          alt="Use"
          width={32}
          height={32}
          className="
          w-6 h-4
      md:w-10 md:h-6 
    transition-all duration-500
    md:grayscale
    md:group-hover:grayscale-0
  "

        />
        <span className=" text-[#585858]  font-roboto text-sm md:text-lg">
          Manufactured in the US
        </span>
      </div>

      {/* Item 2 */}
      <div className="flex  items-center md:flex-row gap-2">
        <Image
          src={treeImage}
          alt="Tree"
          width={30}
          height={30}
          className="
          w-6 h-6
      md:w-8 md:h-8
    transition-all duration-500
    md:grayscale
    md:group-hover:grayscale-0
  "
        />
        <span className=" text-[#585858]  font-roboto text-sm md:text-lg">
          Island Tough
        </span>
      </div>

    </div>
  );
};

export default Box;
