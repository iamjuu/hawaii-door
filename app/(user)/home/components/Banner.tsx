"use client";
import Image from "next/image";
import bannerimg from "../../../../public/assets/door/hq.png";
import { MdOutlineArrowOutward } from "react-icons/md";
import Link from "next/link";
import Navbar from "@/components/user/Navbar";
import PillCTAButton from "../../home/components/link-button";

export default function BannerSection() {
  return (
    <>
      <Navbar />

      <div
        className="
          relative w-full mt-[30px]
          aspect-[3840/1996]

          /* ✅ FIX 1: give mobile enough height */
          min-h-[520px] sm:min-h-0

          overflow-hidden
        "
      >
        {/* Background Image */}
        <Image
          src={bannerimg}
          alt="Hero"
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0) 100%)",
          }}
        />

        {/* Content */}
        <div
          className="
            relative z-10 h-full flex

            /* ✅ FIX 2: top align on mobile, center on desktop */
            items-start sm:items-center
            pt-16 sm:pt-0
          "
        >
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[60px]">
            <div className="max-w-[1400px] 2xl:mx-auto">
              <div className="text-white max-w-[95%] sm:max-w-[90%]">
                {/* Heading */}
                <h1
                  className="
                    text-3xl md:text-[78px]
                    leading-tight
                    font-[400]
                    break-words
                  "
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  A Door Designed
                  <br className="hidden md:block" />
                  <span className="block md:inline"> for Paradise.</span>
                </h1>

                {/* Description + CTA */}
                <div className="flex flex-col gap-8 mt-5">
                  <h1
                    className="
                      text-sm md:text-xl
                      text-[#C6C6C6]
                      font-roboto
                      leading-relaxed
                      max-w-[95%] md:max-w-none
                    "
                  >
                    Island-crafted, precision-machined, and made to thrive in
                    <br className="hidden md:block" />
                    <span className="block md:inline">
                      Hawaii&apos;s climate for generations.
                    </span>
                  </h1>

                  {/* CTA */}
                  <div className="w-fit cursor-pointer ">
                    <Link href="/build">
                   <PillCTAButton
  label="Build Your Door"
  icon={<MdOutlineArrowOutward className="text-2xl" />}
  hoverVariant="white"
  className="cursor-pointer !w-fit !h-auto !px-6 !py-3 "
/>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
