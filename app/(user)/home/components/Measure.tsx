"use client";
import { MdOutlineArrowOutward } from "react-icons/md";
import Image from "next/image";
import Measureimg from "../../../../public/assets/images/landing/measure.png";
import Link from "next/link";
import MeasureBox from "./MeasureBox";

const Measure = () => {
  return (
    <>
      {/* Main Section */}
      <div className="w-full     font-inter">
        <div className="max-w-7xl md:max-w-full  mx-auto px-5 md:px-[80px] gap-[46px] flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">

            {/* Left Content */}
            <div className="order-2 lg:order-1 flex flex-col justify-between gap-10 md:gap-[70px]">
              <div className="flex flex-col gap-6 max-w-[95%] md:max-w-none">

                <h1 className="text-[23px] md:text-[46px] font-medium  letter leading-[56px] text-black font-roboto">
                  Measure Twice.
                  <br />
                  Deliver Once.
                </h1>

                <p className="text-sm md:text-[18px] font-[300] text-[#3B3B3B] font-roboto w-full md:max-w-xl tracking-[-1%]">
                  We’re The Island Door Company, a women-owned, Hawaiʻi-based shop
                  delivering precision-machined wood and fiberglass doors across
                  every island. Each door is pre-hung, labeled, and ready to
                  install, cutting labor hours, preventing callbacks, and keeping
                  your project on schedule. We partner with the industry’s top
                  vendors, Simpson Door, Alliance Door Products, and Plastpro, to
                  bring proven quality to island conditions.
                </p>
              </div>

              {/* CTA */}
              <Link href="/product">
                <button className="w-max group relative inline-flex items-center gap-3 overflow-hidden rounded-3xl bg-[#B6D78A] px-5 py-2 font-roboto text-xl text-white ">
                  {/* Hover overlay */}
                  <span
                    className="
                      absolute inset-0
                      bg-white
                      origin-bottom
                      scale-y-0
                      transition-transform duration-900 ease-[cubic-bezier(0.4,0,0.2,1)]
                      group-hover:scale-y-100
                    "
                  />

                  {/* Content */}
                  <span className="relative z-10 flex items-center  text-black gap-3 text-[15px] md:text-lg whitespace-nowrap">
                    Explore Now
                    <span
                      className="
                        inline-flex items-center justify-center w-7 h-7
                        transition-all duration-500 ease-in-out
                        rotate-0 translate-x-1.5
                        group-hover:rotate-45 group-hover:translate-x-0
                      "
                    >
                      <MdOutlineArrowOutward className="text-black text-2xl" />
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

    </>
  );
};

export default Measure;
