"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import treeImage from "../../../../public/assets/images/landing/tree.png";
import usaImage from "../../../../public/assets/images/landing/usa.png";

const Box = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isBarInView, setIsBarInView] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1024);
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
    <div
      ref={barRef}
      className="relative w-full min-h-[6px] md:h-[60px] flex flex-col md:flex-row justify-center items-center gap-2 md:gap-16 py-2 md:py-0 bg-[#F6F5F1] group"
    >
      {/* Item 1 */}
      <div className="flex items-center md:flex-row gap-2">
        <Image
          src={usaImage}
          alt="Use"
          width={32}
          height={32}
          className={`w-6 h-4 md:w-10 md:h-6 transition-all duration-500 ${
            isMobile
              ? isBarInView
                ? "grayscale-0"
                : "grayscale"
              : "md:grayscale md:group-hover:grayscale-0"
          }`}
        />
        <span className="text-[#585858] font-roboto text-sm md:text-lg">
          Manufactured in the US
        </span>
      </div>

      {/* Item 2 */}
      <div className="flex items-center md:flex-row gap-2">
        <Image
          src={treeImage}
          alt="Tree"
          width={30}
          height={30}
          className={`w-6 h-6 md:w-8 md:h-8 transition-all duration-500 ${
            isMobile
              ? isBarInView
                ? "grayscale-0"
                : "grayscale"
              : "md:grayscale md:group-hover:grayscale-0"
          }`}
        />
        <span className="text-[#585858] font-roboto text-sm md:text-lg">
          Island Tough
        </span>
      </div>
    </div>
  );
};

export default Box;
