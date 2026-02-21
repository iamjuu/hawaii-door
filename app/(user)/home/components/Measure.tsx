"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineArrowOutward } from "react-icons/md";
import Image from "next/image";
import Measureimg from "../../../../public/assets/images/landing/measure.png";
import Vector7 from "../../../../public/assets/images/landing/vector7.png";
import Link from "next/link";
import Heading from "./header";

const Measure = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isBarInView, setIsBarInView] = useState(false);
  const [btnTouched, setBtnTouched] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const btnTouchPending = useRef(false);
  const router = useRouter();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    setIsBarInView(false);
    if (!isMobile) return;
    const handleScroll = () => {
      if (!barRef.current) return;
      const rect = barRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      setIsBarInView(rect.bottom > vh * 0.15 && rect.top < vh * 0.85);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <>
      {/* Main Section */}
      <div className="w-full sm:py-12 md:pt-[50px] md:py-[0px] font-inter ">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[60px]">
          <div className="max-w-[1400px] 2xl:mx-auto flex flex-col">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
              {/* Left Content */}
              <div className="order-2 lg:order-1 flex flex-col justify-between gap-[25px] md:gap-[59px] ">
                <div className="flex flex-col gap-6 max-w-[95%] md:max-w-none">
                  <h1 className="text-[23px] md:text-[46px] font-[600] text-black font-roboto leading-[32px] md:leading-[56px] tracking-normal">
                    Measure Twice.
                    <br />
                    Deliver Once.
                  </h1>

                  <p className="font-roboto text-[#3B3B3B] text-[16px] md:text-[19.11px] font-[300] leading-[26px] md:leading-[31.86px] tracking-[-0.01em]">
                    We are The Island Door Company a women-owned, Hawaiʻi-based
                    shop delivering precision-machined wood and fiberglass doors
                    across every island. Each door is pre-hung, labeled, and
                    ready to install, helping reduce labor hours, prevent
                    callbacks, and keep your project on schedule. We partner with
                    trusted vendors like Simpson Door, Alliance Door Products, and
                    Plastpro to bring proven performance to island conditions.
                  </p>
                </div>

                {/* CTA */}
                <Link href="/product">
                  <button
                    className="w-max group relative inline-flex items-center gap-3 overflow-hidden rounded-3xl bg-[#B6D78A] px-5 py-2 font-roboto text-xl"
                    onTouchStart={() => {
                      setBtnTouched(true);
                      btnTouchPending.current = true;
                    }}
                    onClick={(e) => {
                      if (btnTouchPending.current) {
                        e.preventDefault();
                        e.stopPropagation();
                        btnTouchPending.current = false;
                        setTimeout(() => {
                          setBtnTouched(false);
                          router.push("/product");
                        }, 500);
                      }
                    }}
                  >
                    {/* Hover overlay */}
                    <span
                      className={`
          absolute inset-0
          bg-black
          rounded-full
          w-[130%]
          aspect-square
          left-1/2 -translate-x-1/2
          translate-y-[60%]
          scale-0
          origin-bottom
          transition-transform
          duration-[650ms]
          ease-[cubic-bezier(0.65,0,0.35,1)]
          group-hover:scale-102
          group-hover:translate-y-[-10%]
          ${btnTouched ? "!scale-[1.02] !translate-y-[-10%]" : ""}
        `}
                    />

                    {/* Content */}
                    <span className={`relative z-10 flex items-center gap-3 text-[15px] md:text-lg whitespace-nowrap text-[#000000] group-hover:text-white transition-colors duration-500 group-hover:duration-200 group-hover:delay-[500ms] cursor-pointer ${btnTouched ? "!text-white" : ""}`}>
                      Explore Now
                      <span
                        className={`
                        inline-flex items-center justify-center w-7 h-7
                        transition-all duration-800 ease-in-out
                        group-hover:duration-200
                        group-hover:delay-[500ms]
                        rotate-0 translate-x-1.5
                        group-hover:rotate-45 group-hover:translate-x-0
                        ${btnTouched ? "!rotate-45 !translate-x-0" : ""}
                      `}
                      >
                        <MdOutlineArrowOutward className={`text-[#000000] group-hover:text-white text-2xl transition-colors duration-500 group-hover:duration-200 group-hover:delay-[500ms] ${btnTouched ? "!text-white" : ""}`} />
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
      <div ref={barRef} className="relative px-5 md:px-0 w-full min-h-[60px] md:h-[68px] flex flex-col md:flex-row justify-center items-center gap-4 md:gap-16 py-[25px] md:py-0 bg-[#F6F5F1] group  mt-6 md:mt-9 h-[68px] ">
        <div className="flex items-center gap-2">
          <Image
            src={Vector7}
            alt="Crafted for Hawaii"
            className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 transition-all duration-500 ${
              isMobile
                ? isBarInView ? "grayscale-0" : "grayscale"
                : "md:grayscale md:group-hover:grayscale-0"
            }`}
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
