"use client";
import Image from "next/image";
import bannerimg from "../../../../public/assets/door/hq.png";
import { MdOutlineArrowOutward } from "react-icons/md";
import Link from "next/link";
import Navbar from "@/components/user/Navbar";
import PillCTAButton from "../../home/components/link-button"
export default function BannerSection() {

  return (
    <>
      <Navbar />

      <div
        className="
        relative
        w-full
mt-[30px]
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
            <div className="max-w-xxl text-white">
              {/* Heading */}
              <h1
                className="text-3xl md:text-[78px] leading-tight font-[400]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                A Door Designed <br /> for Paradise.
              </h1>



<div className=" flex flex-col gap-8">
              {/* Description */}
              <h3 className="mt-5 text-sm md:text-xl text-[#C6C6C6] font-roboto">
                Island-crafted, precision-machined, and made to thrive in
                <br />
                Hawaii&apos;s climate for generations.
              </h3>

              {/* Button */}

              <Link href="/build">
              <PillCTAButton

  label=" Build Your Door "
  icon={<MdOutlineArrowOutward className="text-2xl  py-[15px]" />}
/>
</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>


  );
}


