import React from 'react'
import Navbar from '@/components/user/Navbar'
import Footer from '@/components/user/Footer'
import { ProductFootericoncheck, ProductFootericonstar,ProductFooter,FooterSetting,FooterTool} from '@/public/assets';
import HeroSection from '../components/herosection';
import Houseimage from '../../../../public/assets/product/exterior/house.jpg';
import Windowimage from '../../../../public/assets/product/exterior/window.jpg';
import Image from 'next/image';
import { MdOutlineArrowForward, MdOutlineArrowOutward } from 'react-icons/md';
const ExteriorPage = () => {
  const bgImage = "/assets/product/exterior/exterior.png";
  const contant = "Exterior Doors";
  const para =
    "Choose from our beautiful, low maintenance woodgrain textured and smooth Fiberglass Doors or create a stunning entrance with our unsurpassed Wood Stile & RailDoors.";
  const features = [
    {
      text: "High-definition panel detailing",
      iconType: ProductFootericoncheck
    },
    {
      text: "Built for lasting performance",
      iconType: ProductFootericonstar
    }
  ];

  return (
    <div className='bg-white'>
      <Navbar />
      <HeroSection 
      contant={contant}
      bgImage={bgImage}
      para={para}
      features={features}
      />
      {/* Fiberglass Doors Section */}
<section className="px-6 md:px-14 pt-5 pb-12 md:py-16 bg-white font-roboto">
  <h2 className="text-[24px] md:text-[36px] font-[500] mb-5 md:mb-8 text-black">FIBERGLASS DOORS</h2>

  <div className="space-y-6  text-gray-600 ">
    <div className='max-w-7xl'>
      <h3 className="text-[16px] md:text-[24px] font-[400] text-lg text-[#252525] mb-3">
        SMOOTH FIBERGLASS DOORS
      </h3>
      <p className='text-[14px] md:text-[16px] font-[300] text-[#666666]'>
      Our smooth fiberglass doors include a subtle texture that accepts paint in any color without requiring pre-sanding or surface preparation.
      </p>
    </div>

    <div className='max-w-7xl'>
      <h3 className="text-[16px] md:text-[24px] font-[400] font-roboto text-lg text-[#252525] mb-3">
        WOODGRAIN FIBERGLASS DOORS
      </h3>
      <p className='text-[14px] md:text-[16px] font-[300] text-[#666666]'>
      Our wide selection of textured fiberglass doors accurately mirrors natural wood grain. When finished in one of our rich stain colors, these doors match the look of wood while offering superior durability and low maintenance.
      </p>
    </div>

    <div>
      <h3 className="font-[400] text-[20px] md:text-[28px] text-black mb-2">Benefits</h3>
      <ul className="list-disc ml-5 space-y-2 text-[14px] md:text-[16px] font-[300] text-[#666666] pl-3">
        <li>Crafted with high-definition panels adding depth and authenticity.</li>
        <li>Engineered to resist warping, denting, and rust, ensuring aesthetics, energy efficiency, and minimal upkeep.</li>
        <li>Wide selection of decorative glass designs, direct glaze options, Simulated Divided Lites (SDL), blinds, and vents.</li>
      </ul>
    </div>
  </div>
</section>

<section className="w-full px-6 md:px-16">
  <img
    src={Houseimage.src}
    alt="Exterior House"
    className="w-full h-auto object-cover"
  />
</section>

<section className="bg-white pb-10 px-6 md:px-16 mt-[37px] font-roboto ">
  <div className="w-full py-10  border-t border-[#CCCCCC]">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-14 items-start">
      
      {/* LEFT IMAGE */}
      <div>
        <img
          src={Windowimage.src}
          alt="Wood Stile Door"
          className="w-full h-auto xl:h-[680px] object-cover"
        />
      </div>

      {/* RIGHT CONTENT */}
      <div className=" h-full pt-8 flex flex-col justify-start  ">
        <h2 className="text-[24px] md:text-[36px] font-roboto font-[500] mb-5 text-[#333333]">
          WOOD STILE & RAIL DOORS
        </h2>

        <p className="text-[#666666] font-[300] font-light text-[14px] md:text-[16px] mb-4 leading-relaxed">
        When you value traditional craftsmanship, nothing matches a wood stile and rail door. As both the first and final impression of your home, the door expresses your personal style and design vision.
        </p>

        <p className="text-[#666666] font-[300] font-light text-[14px] md:text-[16px] mb-7 mt-3 leading-relaxed">
          Wide range of standard and custom options.
        </p>

        <p className="text-[#666666] font-[300] font-light text-[14px] md:text-[16px] mb-8 leading-relaxed">
          Whether you need solid panel entry doors, bold designs with decorative
          or privacy glass, or patio French doors with coordinated sidelights
          and transoms, we offer the right solution for your home.
        </p>

        <h3 className="text-[23px] md:text-[28px] font-[400] text-[#252525] mb-4">Benefits</h3>

        <ul className="list-disc ml-5 space-y-3 ttext-[#666666] font-[300] font-light text-[14px] md:text-[16px] mb-10 md:mb-17">
          <li>Custom Designs</li>
          <li>Wood doors provide unmatched versatility in design, style, and size</li>
          <li>Variety of wood species and glass options</li>
        </ul>

        <button className="w-fit px-8 py-3 bg-[#FF6E4A] text-white rounded-md hover:bg-orange-500 transition">
          LEARN MORE
        </button>
      </div>

    </div>
  </div>
</section>

<div className="w-full px-5 md:px-15 mb-12 py-8 md:pt-12 md:pb-16 lg:pb-20 bg-white  ">
      <div className="max-w-[1400px] mx-auto">
        <div className="relative w-full min-h-[400px] md:min-h-[420px] bg-[#84684C] rounded-lg overflow-hidden">

          {/* ================= LEFT CONTENT ================= */}
          <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-12 lg:px-16 pt-12 md:py-16">
            <div className="max-w-xl">
              <h2 className="font-roboto ffont-semibold text-[26px] md:text-[46px] text-white leading-tight mb-6">
              Create Your Custom<br /> 
              Door
              </h2>

              <p className="font-roboto font-[400] text-[14px] md:text-[18px]  text-[#C6C6C6]  mb-8 md:w-[490px] ">
              Explore doors designed for precision fit, with custom jambs and built to Hawaii Spec for lasting durability. Elevate your space with doors tailored to your style and needs.
              </p>

              {/* Button */}
              <button className="group relative inline-flex items-center gap-3 overflow-hidden rounded-3xl bg-[#FF6E4A] text-[15px] md:text-lg font-roboto px-5 py-2  text-white">
                {/* Hover overlay */}
                <span className="absolute inset-0 bg-black origin-bottom scale-y-0 transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-y-100" />

                {/* Button content */}
                <span className="relative z-10 flex items-center gap-3 font-roboto">
                Start Building Your Perfect Custom Door Now
                  <span className="inline-flex items-center justify-center w-7 h-7 transition-all duration-500 rotate-0 translate-x-1.5 group-hover:rotate-45 group-hover:translate-x-0">
                    <MdOutlineArrowOutward className="text-white text-2xl" />
                  </span>
                </span>
              </button>
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
<div className="relative md:hidden w-full h-[260px] mt-8">

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

      <Footer />
      </div>
  )
}

export default ExteriorPage

