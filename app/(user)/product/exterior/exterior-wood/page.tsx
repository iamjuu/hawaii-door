'use client'

import React, { useState } from 'react'
import Navbar from '@/components/user/Navbar'
import Footer from '@/components/user/Footer'
import { ProductFootericoncheck, ProductFootericonstar } from '@/public/assets'
import HeroSection from '../../components/herosection'
import { FiFilter, FiX } from 'react-icons/fi'


const ExteriorWoodPage = () => {
  const [openFilter, setOpenFilter] = useState(false)

  const bgImage = "/assets/product/intertior/wood-interior.svg"
  const contant = "Exterior Doors"
  const para =
    "Discover exterior doors; we offer a variety of door types, designs and styles. You are sure to find the perfect door for your project."

  const features = [
    {
      text: "Exterior doors as design features",
      iconType: ProductFootericoncheck
    },
    {
      text: "Styles that align with your space",
      iconType: ProductFootericonstar
    }
  ]

  return (
    <>
      <Navbar />

      <HeroSection
        contant={contant}
        bgImage={bgImage}
        para={para}
        features={features}
      />

      <main className="px-6 md:px-12 py-10 lg:px-20 bg-white">
        <section className="space-y-6">
          <h2 className="text-[28px] font-[500] text-black">
            In-Stock at Hawaii Western Door Products
          </h2>

          <p className="text-[16px] font-[300] text-gray-700 leading-relaxed">
            The following product offering is part of our stocking program. We reserve the right to make changes without notice. Please contact your Hawaii Western Door Products representative to verify availability, lead time, and for more information.
          </p>

          <p className="text-[16px] font-[300] text-gray-700 leading-relaxed">
            Please note that our doors are delivered unfinished. The product images shown below depict finished doors. Due to the natural variations in wood, each door will have a unique appearance, and the stainability of wood species may differ. We recommend consulting with a coatings expert for recommended finishing options and instructions.
          </p>
        </section>
      </main>

      {/* MOBILE FILTER BUTTON - STICKY */}
      <button
        onClick={() => setOpenFilter(true)}
        className="md:hidden fixed top-[80px] left-6 z-30 flex items-center gap-2 border bg-[#b7d7a8] border-gray-300 rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#a8c798] transition-colors shadow-lg"
      >
        <FiFilter className="text-lg" />
        Filter
      </button>

      {/* OVERLAY */}
      {openFilter && (
        <div
          onClick={() => setOpenFilter(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <main>
        <div className="px-16 mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* LEFT SIDEBAR */}
            <aside
              className={`
                fixed md:static top-0 left-0 h-full md:h-auto
                w-[280px] bg-white z-50 md:z-auto
                transform transition-transform duration-300 ease-in-out
                ${openFilter ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0
              `}
            >
              <div className="bg-white border border-gray-200 rounded-lg p-6 h-full md:sticky md:top-[100px]">

                {/* MOBILE HEADER */}
                <div className="flex  items-center justify-between mb-6 md:hidden">
                  <h2 className="text-lg font-semibold text-black">
                    Exterior Wood Doors
                  </h2>
                  <button onClick={() => setOpenFilter(false)}>
                    <FiX className="text-xl text-black" />
                  </button>
                </div>

                {/* DESKTOP HEADER */}
                <h2 className="text-xl font-semibold text-black mb-6 hidden md:block">
                  Exterior Wood Doors
                </h2>

                <nav className="space-y-0">
                  {[
                    "Contemporary Collection",
                    "Craftsman Collection",
                    "Exterior French Doors",
                    "Waterbarrier",
                    "Entry Doors",
                    "Half Lite Doors",
                    "Exterior Panel Doors"
                  ].map((item, index) => (
                    <div key={item}>
                      <a
                        href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                        onClick={() => setOpenFilter(false)}
                        className="block py-3 text-gray-700 hover:text-[#FF6E4A] transition-colors text-sm font-medium"
                      >
                        {item}
                      </a>
                      {index < 6 && (
                        <div className="border-t border-gray-200"></div>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </aside>

            {/* RIGHT CONTENT */}
            <div className="flex-1 space-y-8">
              {/* Content will go here */}
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default ExteriorWoodPage
