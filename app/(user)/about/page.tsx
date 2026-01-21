import React from 'react'
import Navbar from '@/components/user/Navbar'
import Footer from '@/components/user/Footer'
import Image from 'next/image'
import { About1, About2 } from '@/public/assets'

const page = () => {
  return (
    <>
      <Navbar />
      
      {/* Main Content */}
      <main className="min-h-screen bg-white  ">
        {/* Hero Section */}
        <section className="  w-full px-6 md:px-12 lg:px-20 py-16 md:py-4  mt-[120px]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left Content */}
            <div className="space-y-6 ">
            <h1 className="text-4xl md:text-[46px] font-semibold text-black leading-[56px]">
                Built for Hawaii.<br />
                Crafted with Integrity.
              </h1>
              
              <p className="text-[#3B3B3B] text-[19px] font-[300] italic leading-[31px] tracking-[-1%]">
                Hawaii Western Doors was founded in 1995 by Leah Harris, a 500-year 
                hire at a 100-million-block machine shop, and William Jasper Beal III, 
                1960-2014. We&apos;re a local, woman-owned business that offers each opening 
                and door/frame to each island. Every door is precision-machined and pre-
                hung in our shop, finished for each opening and delivered to each island 
                and shop. Our team is made up of skilled craftsmen, machinists and 
                installers who deeply respect, every door is precision-machined and pre-
                hung in our shop, finished for each opening and delivered to each island 
                and shop. That&apos;s how Hawaii Doors operates, from quote to delivery.
              </p>
              <div className='flex w-full justify-end'>

              <button className=" text-[#3B3B3B] px-8 py-2   text-[20px] font -[400]  italic rounded-md hover:bg-gray-800 transition-colors leading-[31px]">
              — Leah Heen
              </button>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="relative w-[587px] h-[523px] rounded-[15px] overflow-hidden">
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
        <section className="px-6 md:px-12 lg:px-20 py-16 ">
          <div className="max-w-7xl mx-auto">
            <div className="relative h-[300px] md:h-[400px] rounded-[15px] overflow-hidden">
              <Image
                src={About1}
                alt="Hawaii Western Doors"
                fill
                className="object-cover"
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
