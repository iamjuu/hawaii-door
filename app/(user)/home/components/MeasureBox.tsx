import Image from "next/image";
import Vector7 from "../../../../public/assets/images/landing/vector7.png";

const MeasureBox = () => {
  return (
    <div className="relative w-full  py-[30px] flex flex-col md:flex-row justify-center items-center gap-4 md:gap-16 bg-[#F6F5F1] group cursor-pointer">
      <div className="flex items-center gap-2">
        <Image
          src={Vector7}
          alt="Crafted for Hawaii"
          className="
            w-5 h-5
            sm:w-6 sm:h-6
            md:w-8 md:h-8
            md:grayscale md:group-hover:grayscale-0
            transition-all duration-500
          "
        />
        <span className="text-[#585858] font-roboto text-sm md:text-lg pr-2 text-center md:text-left">
          Crafted for Hawaii's Heat, Humidity, and Salt Air.
        </span>
      </div>
    </div>
  );
};

export default MeasureBox;

