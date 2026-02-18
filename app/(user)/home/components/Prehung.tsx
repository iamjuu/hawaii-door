"use client";
import { MdOutlineArrowOutward, MdFileDownload } from "react-icons/md";
import Image from "next/image";
import Doors from "../../../../public/assets/images/landing/door22.png";
import Link from "next/link";
import PillCTAButton from "./link-button";

const Prehung = () => {
  return (
    <div className="w-full py-0 mt-[25px] md:mt-[0px] sm:py-12 md:py-[50px] mb-[5px] bg-[#fdfffc]">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[60px]">
        <div className="max-w-[1400px] 2xl:mx-auto">
          <div className="relative w-full min-h-[400px] md:min-h-[420px] bg-[#84684C] rounded-lg overflow-hidden">
            {/* ================= LEFT CONTENT ================= */}
            <div className="relative z-10 flex flex-col justify-center h-full px-4 sm:px-8 md:px-12 lg:px-16 pt-8 pt-12 md:py-16">
              <div className="max-w-xl">
                <h2 className="font-roboto font-[500] text-[23px] md:text-[46px] text-white leading-[32px] md:leading-[62px] tracking-normal mb-4 md:mb-6">
                  Pre-Hung. Pre-Bored.
                  <br />
                  Problem-Solved.
                </h2>

                <p className="font-roboto font-medium text-base md:text-lg  text-[#C6C6C6]  mb-6 md:mb-8">
                  Forty years of wood and fiberglass doors that fit,
                  <br className="hidden md:block" />
                  perform, and endure in Hawaii&apos;s toughest conditions.
                </p>

                {/* Button */}
                <a
                  href={
                    process.env.NEXT_PUBLIC_PRODUCTION === "true"
                      ? `${process.env.NEXT_PUBLIC_URL}uploads/brochure/Hawaii_Door_Brochure.pdf`
                      : "https://navajowhite-ostrich-413154.hostingersite.com/uploads/brochure/Hawaii_Door_Brochure.pdf"
                  }
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PillCTAButton
                    label="Download our Brochure"
                    icon={
                      <MdFileDownload className="text-white text-xl md:text-2xl" />
                    }
                    className="!w-auto !min-w-[172px] !h-[44px] !rounded-[35.2px] !px-4 !text-[19.36px] !leading-none !font-normal !cursor-pointer"
                  />
                </a>
              </div>
            </div>

            {/* ================= DESKTOP IMAGE ================= */}
            <div className="absolute right-0 bottom-0 top-18 hidden md:block w-[50%] h-full pr-10">
              <div className="relative w-full h-full">
                <Image
                  src={Doors}
                  alt="Various door styles in different finishes"
                  fill
                  priority
                  className="object-cover object-bottom" // Cover entire div, align bottom
                />
              </div>
            </div>

            {/* ================= MOBILE IMAGE ================= */}
            <div className="relative md:hidden w-full flex justify-center items-end mt-2 px-4 pb-4">
              <div className="relative w-full max-w-xs sm:max-w-sm h-[280px] sm:h-[320px]">
                <Image
                  src={Doors}
                  alt="Various door styles in different finishes"
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, 400px"
                  className="object-contain object-bottom" // Contain to show full image, align bottom
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prehung;
