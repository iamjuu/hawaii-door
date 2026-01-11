import React from 'react'
import Navbar from '@/components/user/Navbar'
import Footer from '@/components/user/Footer'
import { ProductFootericoncheck, ProductFootericonstar } from '@/public/assets';
import HeroSection from '../../components/herosection';

const ExteriorWoodPage = () => {
    const bgImage = "/assets/product/intertior/wood-interior.svg";
  const contant = "Exterior Doors";
  const para =
    "Discover exterior doors; we offer a variety of door types, designs and styles. You are sure to find the perfect door for your project.";
  const features = [
    {
      text: "Exterior doors as design features",
      iconType: ProductFootericoncheck
    },
    {
      text: "Styles that align with your space",
      iconType: ProductFootericonstar
    }
  ];

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
            {/* Main Heading */}
            <h2 className="text-[28px] font-[500] text-black">
                In-Stock at Hawaii Western Door Products
            </h2>

            {/* First Paragraph */}
            <p className="text-[16px] font-[300] text-gray-700 leading-relaxed">
                The following product offering is part of our stocking program. We reserve the right to make changes without notice. Please contact your Hawaii Western Door Products representative to verify availability, lead time, and for more information.
            </p>

            {/* Second Paragraph */}
            <p className="text-[16px] font-[300] text-gray-700 leading-relaxed">
                Please note that our doors are delivered unfinished. The product images shown below depict finished doors. Due to the natural variations in wood, each door will have a unique appearance, and the stainability of wood species may differ. We recommend consulting with a coatings expert for recommended finishing options and instructions.
            </p>
        </section>
    </main>

      <main className="  ">
        <div className="px-16 mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Sidebar - Navigation Menu */}
            <aside className="w-full lg:w-[280px] flex-shrink-0">
              <div className="bg-white border border-gray-200 rounded-lg p-6 lg:sticky lg:top-[100px]">
                <h2 className="text-xl font-semibold text-black mb-6">
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

            {/* Right Side - Main Content */}
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

