"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";
import PageLoader from "@/components/user/PageLoader";
import Image from "next/image";
import {
  About1,
  About2,
  iconAbout1,
  iconAbout2,
  iconAbout3,
  ProductFootericonSettingsGreen,
  ProductFootericonTruckGreen,
} from "@/public/assets";
import doorGreen from "@/public/assets/icon/door-green.svg";
import truckGreen from "@/public/assets/icon/truck-green.svg";
const page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isBarInView, setIsBarInView] = useState(false);
  const [isImg1InView, setIsImg1InView] = useState(false);
  const [isImg2InView, setIsImg2InView] = useState(false);
  const [isCard1InView, setIsCard1InView] = useState(false);
  const [isCard2InView, setIsCard2InView] = useState(false);

  const barRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    setIsBarInView(false);
    setIsImg1InView(false);
    setIsImg2InView(false);
    setIsCard1InView(false);
    setIsCard2InView(false);
    if (!isMobile) return;

    const inZone = (el: HTMLDivElement | null) => {
      if (!el) return false;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      return r.bottom > vh * 0.15 && r.top < vh * 0.85;
    };

    const handleScroll = () => {
      setIsBarInView(inZone(barRef.current));
      setIsImg1InView(inZone(img1Ref.current));
      setIsImg2InView(inZone(img2Ref.current));
      setIsCard1InView(inZone(card1Ref.current));
      setIsCard2InView(inZone(card2Ref.current));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <>
      <PageLoader isLoading={isLoading} />
      <Navbar />

      {/* Main Content */}
      <main className=" bg-[#fdfffc] flex flex-col mt-[25px] md:mt-[0px]">
        {/* Hero Section */}
        <section className="w-full pt-[25px] md:py-4 md:mt-[120px]">
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-[25px] 2xl:px-[60px]">
            <div className="max-w-[1400px] 2xl:mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-center">
              {/* Left Content */}
              <div className="flex w-full  sm:gap-5 flex-col">
                <h1 className="text-[23px] md:text-[46px] font-medium  md:leading-[56px] leading-[32px] text-black font-roboto">
                  Built for Hawaii.
                  <br />
                  Crafted with Integrity.
                </h1>

                <p className="text-sm md:text-[18px] text-left font-[300] text-[#3B3B3B] font-montserrat w-full tracking-[-1%] italic mt-[20px] sm:mt-[0px]">
                  My father started this company with one rule: get it right the
                  first time. Forty years later, we still measure twice, machine
                  once, and deliver doors that fit. We're not a franchise. We're
                  local, women-owned, and proud to serve the builders,
                  architects, and homeowners who shape Hawaii. Every door is
                  precision-machined and pre-hung in our shop, labeled for each
                  opening, and backed by both vendor and shop warranties.
                  Integrity means showing up, documenting specs clearly, and
                  keeping promises. That's how Hawaiʻi Doors operates, from
                  quote to delivery.
                </p>

                <div className="flex w-full justify-end mt-4">
                  <button className="text-[#3B3B3B] px-8 py-2 text-[20px] italic rounded-md leading-[31px]">
                    — Leah Heen
                  </button>
                </div>
              </div>

              {/* Right Image */}
              <div ref={img2Ref} className={`relative w-full h-[300px] md:h-[523px] rounded-[15px] overflow-hidden transition-all duration-500 grayscale ${isMobile ? (isImg2InView ? "grayscale-0" : "") : "hover:grayscale-0"}`}>
                <Image
                  src={About2}
                  alt="Craftsman working"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full  bg-[#f5f5f5] mt-[50px]   ">
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[60px]  sm:pt-12 md:pt-[50px]">
            <div className="max-w-[1400px] 2xl:mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-[130px]">
              {/* Centered Card with Border - Our Vision */}
              <div ref={card1Ref} className={`bg-white border-[40px] border-b-0 p-8 md:p-12 lg:p-16 transition-all duration-300 group/card ${isMobile ? (isCard1InView ? "border-[#C8955F]" : "border-[#D4A574]") : "border-[#D4A574] hover:border-[#C8955F]"}`}>
                <div className="text-center space-y-6">
                  <p className={`text-[14px] font-[500] transition-colors duration-300 ${isMobile ? (isCard1InView ? "text-[#FF6E4A]" : "text-black") : "text-black group-hover/card:text-[#FF6E4A]"}`}>
                    Our Vision
                  </p>
                  <h1 className={`text-3xl md:text-4xl lg:text-[36px] font-[600] leading-tight transition-colors duration-300 ${isMobile ? (isCard1InView ? "text-[#FF6E4A]" : "text-black") : "text-black group-hover/card:text-[#FF6E4A]"}`}>
                    Build doors that set the standard for Hawaii
                  </h1>
                  <p className={`text-base md:text-[16px] font-[300] leading-relaxed max-w-2xl mx-auto transition-colors duration-300 ${isMobile ? (isCard1InView ? "text-[#FF6E4A]" : "text-black") : "text-black group-hover/card:text-[#FF6E4A]"}`}>
                    Become the only door company architects & builders call when
                    the fit, timeline, and reputation all have to be perfect.
                  </p>
                </div>
              </div>
              {/* Our Mission */}
              <div ref={card2Ref} className={`bg-white border-[40px] border-b-0 p-8 md:p-12 lg:p-16 transition-all duration-300 group/card ${isMobile ? (isCard2InView ? "border-[#C8955F]" : "border-[#D4A574]") : "border-[#D4A574] hover:border-[#C8955F]"}`}>
                <div className="text-center space-y-6">
                  <p className={`text-[14px] font-[500] transition-colors duration-300 ${isMobile ? (isCard2InView ? "text-[#FF6E4A]" : "text-black") : "text-black group-hover/card:text-[#FF6E4A]"}`}>
                    Our Mission
                  </p>
                  <h1 className={`text-3xl md:text-4xl lg:text-[36px] font-[600] leading-tight transition-colors duration-300 ${isMobile ? (isCard2InView ? "text-[#FF6E4A]" : "text-black") : "text-black group-hover/card:text-[#FF6E4A]"}`}>
                    Built with purpose.
                    <br />
                    Driven by precision.
                  </h1>
                  <p className={`text-base md:text-[16px] font-[300] leading-relaxed max-w-2xl mx-auto transition-colors duration-300 ${isMobile ? (isCard2InView ? "text-[#FF6E4A]" : "text-[#3B3B3B]") : "text-[#3B3B3B] group-hover/card:text-[#FF6E4A]"}`}>
                    Deliver premium door craftsmanship, every time. The door
                    industry settled for 'good enough.' We didn't.
                    Precision-machined. Pre-hung. Island-ready. That's not
                    premium service. That's the baseline.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Horizontal Bar - Measure, Machine, Deliver */}
        <section ref={barRef} className="relative w-full flex flex-col md:flex-row justify-center items-center gap-3 md:gap-8 lg:gap-16 py-4 md:py-0 min-h-[60px] md:h-[68px] bg-[#F6F5F1] group mt-[50px] mb-0 transition-all duration-300 group/bar">
          <div className="py-3 md:py-[25px] flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Measure */}
            <div className="flex items-center gap-3 md:gap-4 text-xs md:text-base">
              <div className="relative w-6 h-6 md:w-8 md:h-8">
                <Image
                  src={iconAbout2}
                  alt="Measure"
                  width={32}
                  height={32}
                  className={`w-6 h-6 md:size-[32px] transition-opacity duration-500 ${isMobile ? (isBarInView ? "opacity-0" : "opacity-100") : "group-hover/bar:opacity-0"}`}
                />
                <Image
                  src={ProductFootericonSettingsGreen}
                  alt="Measure"
                  width={32}
                  height={32}
                  className={`w-6 h-6 md:size-[32px] absolute top-0 left-0 transition-opacity duration-500 ${isMobile ? (isBarInView ? "opacity-100" : "opacity-0") : "opacity-0 group-hover/bar:opacity-100"}`}
                />
              </div>
              <span className="text-[#585858] font-roboto font-[400] whitespace-nowrap md:text-[20px]">
                Measure
              </span>
            </div>

            {/* Machine */}
            <div className="flex items-center gap-3 md:gap-4 text-xs md:text-base">
              <div className="relative w-6 h-6 md:w-8 md:h-8">
                <Image
                  src={iconAbout1}
                  alt="Machine"
                  width={32}
                  height={32}
                  className={`w-6 h-6 md:size-[32px] transition-opacity duration-500 ${isMobile ? (isBarInView ? "opacity-0" : "opacity-100") : "group-hover/bar:opacity-0"}`}
                />
                <Image
                  src={doorGreen}
                  alt="Machine"
                  width={32}
                  height={32}
                  className={`w-6 h-6 md:size-[32px] absolute top-0 left-0 transition-opacity duration-500 ${isMobile ? (isBarInView ? "opacity-100" : "opacity-0") : "opacity-0 group-hover/bar:opacity-100"}`}
                />
              </div>
              <span className="text-[#585858] font-roboto font-[400] whitespace-nowrap md:text-[20px]">
                Machine
              </span>
            </div>

            {/* Deliver */}
            <div className="flex items-center gap-3 md:gap-4 text-xs md:text-base mr-[8px] sm:mr-[0px] ">
              <div className="relative w-6 h-6 md:w-8 md:h-8 ">
                <Image
                  src={iconAbout3}
                  alt="Deliver"
                  width={32}
                  height={32}
                  className={`w-6 h-6 md:size-[32px] transition-opacity duration-500 ${isMobile ? (isBarInView ? "opacity-0 ml-[-2px]" : "opacity-100 ") : "group-hover/bar:opacity-0"}`}
                />
                <Image
                  src={truckGreen}
                  alt="Deliver"
                  width={32}
                  height={32}
                  className={`w-6 h-6 md:size-[32px] absolute top-0 left-0 transition-opacity duration-500 ${isMobile ? (isBarInView ? "opacity-100" : "opacity-0") : "opacity-0 group-hover/bar:opacity-100"}`}
                />
              </div>
              <span className="text-[#585858] font-roboto font-[400] whitespace-nowrap md:text-[20px]">
                Deliver
              </span>
            </div>
          </div>
        </section>

        {/* Meet Our Team Section */}
        <section className="w-full sm:mt-[50px] mt-[25px]">
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[60px]">
            <div className="max-w-[1400px] 2xl:mx-auto">
              <div className="text-left sm:space-y-6  g ">
                <h2 className="text-[23px] md:text-[46px] font-[600] text-black font-roboto leading-[56px] tracking-[0%]">
                  Meet Our Team
                </h2>
                <p className="text-sm md:text-base font-[400] text-[#3B3B3B] font-roboto leading-relaxed max-w-3xl">
                  A group of experienced makers, each adding precision and
                  knowledge to <br /> raise the quality of every project.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Photo Section */}
        <section className="w-full py-10 sm:py-12 md:py-[50px]">
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[60px]">
            <div className="max-w-[1400px] 2xl:mx-auto">
              <div ref={img1Ref} className={`relative h-[300px] md:h-[400px] rounded-[15px] overflow-hidden transition-all duration-500 grayscale ${isMobile ? (isImg1InView ? "grayscale-0" : "") : "hover:grayscale-0"}`}>
                <Image
                  src={About1}
                  alt="Hawaii Western Doors Team"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default page;
