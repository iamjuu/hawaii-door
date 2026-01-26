"use client";
import { MdOutlineArrowOutward } from "react-icons/md";
import Image from "next/image";
import Measureimg from "../../../../public/assets/images/landing/measure.png";
import Vector7 from "../../../../public/assets/images/landing/vector7.png";
import Link from "next/link";
import Heading from "./header";

const Measure = () => {
  return (
    <>
      {/* Main Section */}
      <div className="w-full py-10 sm:py-12 md:py-[50px] font-inter">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[60px]">
        <div className="max-w-[1400px] 2xl:mx-auto flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">

            {/* Left Content */}
            <div className="order-2 lg:order-1 flex flex-col justify-between gap-10 md:gap-[70px]">
              <div className="flex flex-col gap-6 max-w-[95%] md:max-w-none">

                <h1 className="text-[23px] md:text-[46px] font-[600] text-black font-roboto leading-[32px] md:leading-[62px] tracking-normal">
                  Measure Twice.
                  <br />
                  Deliver Once.
                </h1>

                <p className="font-roboto text-[#3B3B3B] text-[16px] md:text-[19.11px] font-[300] leading-[26px] md:leading-[31.86px] tracking-[-0.01em]">
                  We're The Island Door Company, a women-owned, Hawaiʻi-based shop
                  delivering precision-machined wood and fiberglass doors across
                  every island. Each door is pre-hung, labeled, and ready to
                  install, cutting labor hours, preventing callbacks, and keeping
                  your project on schedule. We partner with the industry's top
                  vendors, Simpson Door, Alliance Door Products, and Plastpro, to
                  bring proven quality to island conditions.
                </p>
              </div>

              {/* CTA */}
              <Link href="/product">
                <button className="w-max group relative inline-flex items-center gap-3 overflow-hidden rounded-3xl bg-[#B6D78A] px-5 py-2 font-roboto text-xl text-white mt-5 md:mt-6 mb-[20px]">
                  {/* Hover overlay */}
                  <span
                    className="
                      absolute inset-0
                      bg-black
                      origin-bottom
                      scale-y-0
                      transition-transform duration-900 ease-[cubic-bezier(0.4,0,0.2,1)]
                      group-hover:scale-y-100
                    "
                  />

                  {/* Content */}
                  <span className="relative z-10 flex items-center gap-3 text-[15px] md:text-lg whitespace-nowrap">
                    Explore Now
                    <span
                      className="
                        inline-flex items-center justify-center w-7 h-7
                        transition-all duration-500 ease-in-out
                        rotate-0 translate-x-1.5
                        group-hover:rotate-45 group-hover:translate-x-0
                      "
                    >
                      <MdOutlineArrowOutward className="text-white text-2xl" />
                    </span>
                  </span>
                </button>
              </Link>
            </div>

            {/* Right Image */}
            <div className="order-1 lg:order-2">
              <div className="relative w-full h-[320px] sm:h-[350px] md:h-[400px] lg:h-[450px] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={Measureimg}
                  alt="Modern architectural interior with wooden ceiling details"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="relative px-5 md:px-0 w-full min-h-[60px] md:h-[68px] flex flex-col md:flex-row justify-center items-center gap-4 md:gap-16 py-3 md:py-0 bg-[#F6F5F1] group cursor-pointer mt-4 md:mt-9">
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
            Crafted for Hawaii’s Heat, Humidity, and Salt Air.
          </span>
        </div>
      </div>
    </>
  );
};

export default Measure;
