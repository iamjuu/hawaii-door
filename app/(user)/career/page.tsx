"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Careerimg from "@/public/assets/career/careerimage.png";

import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";
import PageLoader from "@/components/user/PageLoader";

export default function CareerPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <PageLoader isLoading={isLoading} />
      <Navbar />
      {/* First Section - Hero with Gradient */}
      <section className="relative w-full min-h-[400px] md:min-h-[450px] lg:h-[470px] bg-[#efede9] overflow-visible">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[60px] min-h-[400px] md:min-h-0 md:h-full">
          <div className="max-w-[1400px] 2xl:mx-auto flex flex-col md:flex-row gap-3 sm:gap-6 lg:gap-12 items-center h-full py-4 sm:py-8 md:py-4 lg:py-0">
            {/* Left Content - order-2 on mobile so image shows first */}
            <div className="flex-1 min-w-0 space-y-3 sm:space-y-4 lg:space-y-6 mt-0 sm:mt-8 md:mt-16 order-2 md:order-1">
              <h1 className="text-[28px] sm:text-[32px] md:text-[38px] lg:text-[45px] font-roboto font-[600] text-gray-900">
                Join The Island Door Company
              </h1>

              <p className="font-roboto font-[400] text-[14px] sm:text-[16px] lg:text-[18px] text-[#3B3B3B] leading-relaxed">
                For forty years, we've measured twice, machined once, and delivered
                doors that fit. At Hawaii Doors, we don't just build doors, we build
                trust, craftsmanship, and opportunity across every island.
              </p>

              <p className="font-roboto font-[400] text-[14px] sm:text-[16px] lg:text-[18px] text-[#3B3B3B] leading-relaxed">
                If you value precision, integrity, and doing things right, you'll fit our
                team. Think you'd be a great addition?{" "}
                <a
                  href="#contact"
                  className="text-black font-semibold transition-colors"
                >
                  Get in touch
                </a>
              </p>
            </div>

            {/* Right Image - order-1 on mobile so it appears at top */}
            <div className="flex-1 w-full min-w-0 flex-none md:flex-1 h-[256px] sm:h-[320px] md:h-[320px] lg:h-full lg:max-h-[420px] relative order-1 md:order-2">
              <div className="relative w-full h-full">
                <Image
                  src={Careerimg}
                  alt="Happy team members collaborating"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second Section - White Background Contact */}
      <section className="bg-[#fdfffc] py-[60px]">
        <div className="container mx-auto px-6">
          <div className="flex  gap-4 flex-col justify-center items-center text-center ">
            <h2 className="text-[24px]  md:text-[38px] lg:text-[45px] font-[600] text-black font-roboto">
              Ready to Join our Team?
            </h2>

            <p className="text-[14px] sm:text-[16px] lg:text-[18px] font-[400] text-gray-700 max-w-2xl">
              Email your resume and cover letter to
            </p>

            <a
              href="mailto:info@hawaiidoors.com"
              className="inline-flex flex-row items-center justify-center gap-2 sm:gap-4 rounded-lg transition-shadow hover:opacity-90"
            >
              {/* Email Icon */}
              <div className="p-2 rounded-full bg-[#F5F5F4] shrink-0">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>

              {/* Email Address */}
              <span className="font-[400] text-[14px] sm:text-[20px] md:text-[24px] lg:text-[32px] text-[#0069A8] whitespace-nowrap">
                info@hawaiidoors.com
              </span>

              {/* Arrow Icon */}
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#0069A8] shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}