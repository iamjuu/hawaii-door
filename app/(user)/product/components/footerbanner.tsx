import { ProductFooter, FooterSetting, FooterTool } from '@/public/assets';
import Image from 'next/image';
import { MdOutlineArrowOutward } from 'react-icons/md';
import Link from "next/link"
const FooterBanner = () => {
  return (
    <div className="w-full py-10 sm:py-12 md:py-[80px]">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[60px]">
        <div className="max-w-[1400px] 2xl:mx-auto">
          <div className="relative w-full min-h-[400px] md:min-h-[420px] bg-[#84684C] rounded-lg overflow-hidden">

            {/* ================= LEFT CONTENT ================= */}
            <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-12 lg:px-16 pt-12 md:py-16">
              <div className="max-w-xl">
                <h2 className="font-roboto font-semibold md:font-[500] text-[23px] md:text-[46px] text-white leading-tight mb-6">
                  Create Your Custom<br />
                  Door
                </h2>

                <p className="font-roboto font-[400] text-sm md:text-base text-[#C6C6C6] mb-8 md:w-[490px]">
                  Explore doors designed for precision fit, with custom jambs and built to Hawaii Spec for lasting durability. Elevate your space with doors tailored to your style and needs.
                </p>

                {/* Button */}
                <Link href={'/build'}>
                  <button className="group relative inline-flex items-center gap-3 overflow-hidden rounded-3xl bg-[#FF6E4A] text-[15px] md:text-lg font-roboto px-5 py-2  text-white">
                    {/* Hover overlay */}
                    <span
                      className="
          absolute inset-0
          bg-black
          rounded-full
          w-[148%]
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
        "
                    />

                    {/* Button content */}
                    <span className="relative z-10 flex items-center gap-3 font-roboto cursor-pointer">
                      Start Building Your Perfect Custom Door Now
                      <MdOutlineArrowOutward className="text-white text-2xl transition-all duration-900 rotate-0 translate-x-1.5 group-hover:rotate-45 group-hover:translate-x-0" />
                    </span>
                  </button>
                </Link>
              </div>
            </div>

            {/* ================= DESKTOP IMAGE ================= */}
            {/* ================= DESKTOP IMAGE ================= */}
            <div className="absolute right-0 bottom-0 top-10 hidden md:block w-[50%] h-full pr-10">
              <div className="relative w-full h-full">

                {/* MAIN DOOR IMAGE */}
                <Image
                  src={ProductFooter}
                  alt="Door styles"
                  fill
                  priority
                  className="object-contain object-bottom"
                />

                {/* SETTINGS ICON */}
                <Image
                  src={FooterSetting}
                  alt="Settings icon"
                  width={130}
                  height={130}
                  className="absolute top-[34%] right-[23%] z-20"
                />

                {/* TOOL ICON */}
                <Image
                  src={FooterTool}
                  alt="Tool icon"
                  width={120}
                  height={120}
                  className="absolute bottom-[10%] right-[55%] z-20 rotate-[-10deg]"
                />

              </div>
            </div>


            {/* ================= MOBILE IMAGE ================= */}
            {/* ================= MOBILE IMAGE ================= */}
            <div className="relative md:hidden w-full h-[260px] mt-2 md:mt-8">

              {/* DOOR */}
              <Image
                src={ProductFooter}
                alt="Door styles"
                fill
                priority
                className="object-contain object-bottom"
              />

              {/* SETTINGS */}
              <Image
                src={FooterSetting}
                alt="Settings icon"
                width={70}
                height={70}
                className="absolute top-23 right-20 z-20"
              />

              {/* TOOL */}
              <Image
                src={FooterTool}
                alt="Tool icon"
                width={80}
                height={80}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
              />
            </div>


          </div>
        </div>
      </div>
    </div>
  )
}
export default FooterBanner