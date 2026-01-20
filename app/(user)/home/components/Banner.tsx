"use client";
import Image from "next/image";
import bannerimg from "../../../../public/assets/door/hq.png";
import {MdOutlineArrowOutward } from "react-icons/md";
import Link from "next/link";
import Navbar from "@/components/user/Navbar";

export default function BannerSection() {

  return (
    <>
    <Navbar />

    <div
      className="
        relative
        w-full

        /* Desktop – ORIGINAL DESIGN (UNCHANGED) */
        aspect-[3840/1996]

        /* Tablet */
        md:aspect-[3840/1996]

        /* Mobile */
        sm:aspect-[3840/1996]

        overflow-hidden
      "
    >
      <Image
        src={bannerimg}
        alt="Hero"
        fill
        priority
        sizes="(max-width: 640px) 100vw,
               (max-width: 1024px) 100vw,
               100vw"
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
         {/* Dark overlay: smooth fade from 70% dark to clear */}
         <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl w-full px-6 md:px-15">
          <div className="max-w-xl text-white">
            {/* Heading */}
            <h1 className="text-3xl md:text-[58px] font-playfair leading-tight">
              A Door Designed <br /> for Paradise.
            </h1>

            {/* Description */}
            <h3 className="mt-5 text-sm md:text-xl text-[#C6C6C6] font-roboto">
              Island-crafted, precision-machined, and made to thrive in
              Hawaii&apos;s climate for generations.
            </h3>

            {/* Button */}

            <Link href="/build">
            <button className="group relative mt-7 inline-flex items-center gap-2 md:gap-3 overflow-hidden rounded-3xl bg-[#FF6E4A] px-5 py-2 font-roboto text-xl text-white">

{/* WhatsApp-style black reveal */}
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
<span className="relative z-10 flex items-center gap-3 text-[15px] md:text-lg">
  Build Your Door

  {/* Arrow (your previous working animation) */}
  <span
    className="
      inline-flex items-center justify-center w-7 h-7
      transform
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
        </div>
      </div>
    </div>

    </>


  );
}


