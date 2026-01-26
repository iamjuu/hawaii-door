  "use client";

  import React, { useState, useEffect } from 'react'
  import Navbar from '@/components/user/Navbar'
  import Footer from '@/components/user/Footer'
  import PageLoader from '@/components/user/PageLoader'
  import Image from 'next/image'
  import { About1, About2 } from '@/public/assets'

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
        <main className=" bg-white  flex flex-col items-center ">
      {/* Hero Section */}
      <section className="bg-red-100 flex items-center justify-center">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
        
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
    </section>


          <section className="px-6 md:px-12 lg:px-20 py-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-[130px]">
              {/* Centered Card with Border */}
              <div className="bg-white border-[40px] border-[#D4A574] border-b-0  p-8 md:p-12 lg:p-16">
              <div className="text-center space-y-6">
                  <p className='text-[14px] font-[500] text-black'>
                    Our Vision
                  </p>
                  <h1 className='text-3xl md:text-4xl lg:text-[36px] font-[600] text-black leading-tight'>
                    Build doors that set the standard for Hawaii
                  </h1>
                  <p className='text-base md:text-[16px] font-[300] text-black leading-relaxed max-w-2xl mx-auto'>
                    Become the only door company architects & builders call when the fit, timeline, and reputation all have to be perfect.
                  </p>
                </div>
              </div>
              <div className="bg-white border-[40px] border-[#D4A574] border-b-0  p-8 md:p-12 lg:p-16">
              <div className="text-center space-y-6">
                  <p className='text-[14px] font-[500] text-black'>
                    Our Vision
                  </p>
                  <h1 className='text-3xl md:text-4xl lg:text-[36px] font-[600] text-black leading-tight'>
                    Build doors that set the standard for Hawaii
                  </h1>
                  <p className='text-base md:text-[16px] font-[300] text-black leading-relaxed max-w-2xl mx-auto'>
                    Become the only door company architects & builders call when the fit, timeline, and reputation all have to be perfect.
                  </p>
                </div>
              </div>
            </div>
          </section>


          {/* Second Section - Optional additional content */}
          <section className="px-6 md:px-12 lg:px-20 py-16">
            <div className="">
              <div className="relative w-full rounded-[15px] h-full overflow-hidden">
                <Image
                  src={About1}
                  alt="Hawaii Western Doors"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </>
    )
  }

  export default page
