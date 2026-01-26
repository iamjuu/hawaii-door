"use client";

import React, { useState, useEffect } from 'react'
import Navbar from '@/components/user/Navbar'
import Footer from '@/components/user/Footer'
import PageLoader from '@/components/user/PageLoader'
import Image from 'next/image'
import { About1, About2, iconAbout1, iconAbout2, iconAbout3, ProductFootericonSettingsGreen, ProductFootericonTruckGreen,  } from '@/public/assets'
import doorGreen from '@/public/assets/icon/door-green.svg'
import truckGreen from '@/public/assets/icon/truck-green.svg'
const page = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PageLoader isLoading={isLoading} />
      <Navbar />
      
      {/* Main Content */}
      <main className="min-h-screen bg-[#fdfffc]">
    {/* Hero Section */}
    <section className="w-full py-16 md:py-4 md:mt-[120px]">
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[60px]">
    <div className="max-w-[1400px] 2xl:mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
      
      {/* Left Content */}
      <div className="flex w-full gap-5 flex-col">
        <h1 className="text-[23px] md:text-[46px] font-medium  leading-[56px] text-black font-roboto">
          Built for Hawaii.<br />
          Crafted with Integrity.
        </h1>

        <p className="text-sm md:text-[18px] font-[400] text-[#3B3B3B] font-montserrat w-full md:max-w-xl tracking-[-1%]">
        My father started this company with one rule: get it right the first time. Forty years later, we still measure twice, machine once, and deliver doors that fit. We're not a franchise. We're local, women-owned, and proud to serve the builders, architects, and homeowners who shape Hawaii.
        Every door is precision-machined and pre-hung in our shop, labeled for each opening, and backed by both vendor and shop warranties. Integrity means showing up, documenting specs clearly, and keeping promises. That's how Hawaiʻi Doors operates, from quote to delivery.
        </p>

        <div className="flex w-full justify-end mt-4">
          <button className="text-[#3B3B3B] px-8 py-2 text-[20px] italic rounded-md leading-[31px]">
            — Leah Heen
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="relative w-full md:w-[587px] h-[300px] md:h-[523px] rounded-[15px] overflow-hidden">
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
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[60px] pt-10 sm:pt-12 md:pt-[50px]">
            <div className="max-w-[1400px] 2xl:mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-[130px]">
              {/* Centered Card with Border - Our Vision */}
              <div className="bg-white border-[40px] border-[#D4A574] border-b-0 p-8 md:p-12 lg:p-16 transition-all duration-300 hover:border-[#C8955F] group/card">
            <div className="text-center space-y-6">
                <p className='text-[14px] font-[500] text-black group-hover/card:text-[#FF6E4A] transition-colors duration-300'>
                  Our Vision
                </p>
                <h1 className='text-3xl md:text-4xl lg:text-[36px] font-[600] text-black leading-tight group-hover/card:text-[#FF6E4A] transition-colors duration-300'>
                  Build doors that set the standard for Hawaii
                </h1>
                <p className='text-base md:text-[16px] font-[300] text-black leading-relaxed max-w-2xl mx-auto group-hover/card:text-[#FF6E4A] transition-colors duration-300'>
                  Become the only door company architects & builders call when the fit, timeline, and reputation all have to be perfect.
                </p>
              </div>
            </div>
            {/* Our Mission */}
            <div className="bg-white border-[40px] border-[#D4A574] border-b-0 p-8 md:p-12 lg:p-16 transition-all duration-300 hover:border-[#C8955F] group/card">
            <div className="text-center space-y-6">
                <p className='text-[14px] font-[500] text-black group-hover/card:text-[#FF6E4A] transition-colors duration-300'>
                  Our Mission
                </p>
                <h1 className='text-3xl md:text-4xl lg:text-[36px] font-[600] text-black leading-tight group-hover/card:text-[#FF6E4A] transition-colors duration-300'>
                  Built with purpose.<br />
                  Driven by precision.
                </h1>
                <p className='text-base md:text-[16px] font-[300] text-[#3B3B3B] leading-relaxed max-w-2xl mx-auto group-hover/card:text-[#FF6E4A] transition-colors duration-300'>
                  Deliver premium door craftsmanship, every time. The door industry settled for 'good enough.' We didn't. Precision-machined. Pre-hung. Island-ready. That's not premium service. That's the baseline.
                </p>
              </div>
            </div>
          </div>
          </div>
        </section>


        {/* Horizontal Bar - Measure, Machine, Deliver */}
        <section className="w-full bg-[#F6F5F1] h-20 flex items-center mt-[50px] group/bar">
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[60px]">
          <div className="max-w-[1400px] 2xl:mx-auto w-full">
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 lg:gap-16 ">
              {/* Measure */}
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="relative w-6 h-6 md:w-7 md:h-7">
                  <Image
                    src={iconAbout2}
                    alt="Measure"
                    width={28}
                    height={28}
                    className="w-6 h-6 md:w-7 md:h-7 group-hover/bar:opacity-0 transition-opacity duration-300"
                  />
                  <Image
                    src={ProductFootericonSettingsGreen}
                    alt="Measure"
                    width={28}
                    height={28}
                    className="w-6 h-6 md:w-7 md:h-7 absolute top-0 left-0 opacity-0 group-hover/bar:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <span className="text-[#585858] font-roboto text-xs md:text-sm font-[400]">
                  Measure
                </span>
              </div>

              {/* Machine */}
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="relative w-6 h-6 md:w-7 md:h-7">
                  <Image
                    src={iconAbout3}
                    alt="Machine"
                    width={28}
                    height={28}
                    className="w-6 h-6 md:w-7 md:h-7 group-hover/bar:opacity-0 transition-opacity duration-300"
                  />
                  <Image
                    src={truckGreen}
                    alt="Machine"
                    width={28}
                    height={28}
                    className="w-6 h-6 md:w-7 md:h-7 absolute top-0 left-0 opacity-0 group-hover/bar:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <span className="text-[#585858] font-roboto text-xs md:text-sm font-[400]">
                  Machine
                </span>
              </div>

              {/* Deliver */}
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="relative w-6 h-6 md:w-7 md:h-7">
                  <Image
                    src={iconAbout1}
                    alt="Deliver"
                    width={28}
                    height={28}
                    className="w-6 h-6 md:w-7 md:h-7 group-hover/bar:opacity-0 transition-opacity duration-300"
                  />
                  <Image
                    src={doorGreen}
                    alt="Deliver"
                    width={28}
                    height={28}
                    className="w-6 h-6 md:w-7 md:h-7 absolute top-0 left-0 opacity-0 group-hover/bar:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <span className="text-[#585858] font-roboto text-xs md:text-sm font-[400]">
                  Deliver
                </span>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Meet Our Team Section */}
        <section className="w-full mt-[50px]">
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[60px]">
          <div className="max-w-[1400px] 2xl:mx-auto">
            <div className="text-left space-y-6">
              <h2 className="text-[23px] md:text-[46px] font-[600] text-black font-roboto leading-[56px] tracking-[0%]">
                Meet Our Team
              </h2>
              <p className="text-sm md:text-base font-[400] text-[#3B3B3B] font-roboto leading-relaxed max-w-3xl">
                A group of experienced makers, each adding precision and knowledge to <br /> raise the quality of every project.
              </p>
            </div>
          </div>
          </div>
        </section>

        {/* Photo Section */}
        <section className="w-full py-10 sm:py-12 md:py-[50px]">
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[60px]">
          <div className="max-w-[1400px] 2xl:mx-auto">
            <div className="relative h-[300px] md:h-[400px] rounded-[15px] overflow-hidden">
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
  )
}

export default page
