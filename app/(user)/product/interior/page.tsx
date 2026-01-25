import React from 'react'
import Navbar from '@/components/user/Navbar'
import Footer from '@/components/user/Footer'
import {
  ProductFootericoncheck,
  ProductFootericonstar,
  Interiorhero,
  Interiordoorlogo,
  Interiordoorlogo1
} from '@/public/assets'
import HeroSection from '../components/herosection'
import Image from 'next/image'
import Link from 'next/link'
import FooterBanner from '../components/footerbanner'
import Heading from '../../home/components/header'

const InteriorPage = () => {
  const bgImage = "/assets/product/interior-door-hero-3.webp";
  const contant = "Interior Doors";
  const para =
    "Discover interior doors; we offer a variety of door types, designs and styles. You are sure to find the perfectdoor for your project.";

  const features = [
    {
      text: "Interior doors as design features",
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

      <section className="w-full py-[50px] pb-5 font-inter">
        <div className="max-w-7xl md:max-w-full mx-auto px-4 sm:px-6 md:px-[60px] gap-[46px] flex flex-col">
          <div className="flex flex-col gap-24">

            {/* ================= First Block ================= */}
            <div className="flex flex-col gap-12">
              <section className="px-6 md:px-12 lg:px-20">
                <div className="space-y-6">
                  <Heading heading="Molded & Flush Doors" />

                  <div className="flex items-center gap-3">
                    <Image
                      src={Interiordoorlogo}
                      alt="Lynden Door"
                      width={100}
                      height={100}
                      className="w-56"
                    />
                  </div>

                  <h3 className="text-[18px] font-[500] text-black">
                    Let Lynden Door Guide You in Discovering Interior Doors as a Key Design Element
                  </h3>

                  <div className="space-y-4 leading-relaxed">
                    <p className="text-sm md:text-[16px] font-[300] text-[#666666]">
                      Explore the transformative potential of interior doors with Lynden Door. With a passion for innovation and design excellence, we offer a wide range of interior doors that are not only environmentally intelligent but also surprisingly affordable.
                    </p>
                    <p className="text-sm md:text-[16px] font-[300] text-[#666666]">
                      Experience the value that well-chosen interior doors can add to your home.
                    </p>
                  </div>

                  <Link href="/product/interior/Lynden-Door">
                    <button className="bg-[#FF6E4A] hover:bg-[#FF5A3A] text-white px-[22px] py-[16px] rounded-lg font-[500] mt-6">
                      LEARN MORE
                    </button>
                  </Link>
                </div>
              </section>

              {/* 🔥 Image with Right Fade (NO layout change) */}
              <section className="px-6 md:px-16">
                <div className="relative">
                  <Image
                    src={Interiorhero}
                    alt="Interior Hero"
                    width={100}
                    height={100}
                    className="w-full"
                  />
                  <div className="absolute inset-0 " />
                </div>
              </section>
            </div>

            {/* ================= Second Block ================= */}
            <div className="flex flex-col gap-12">
              <section className="px-6 md:px-12 lg:px-20">
                <div className="space-y-6">
                  <Heading heading="Wood Stile & Rail Doors" />

                  <div className="space-y-4 leading-relaxed">
                    <p className="text-base md:text-[18px] font-[500]">
                      Interior Wood Stile & Rail Door Collections - Timeless Elegance of Natural Wood
                    </p>
                    <p className="text-sm md:text-[16px] font-[300]">
                      Experience the value that well-chosen interior doors can add to your home.
                    </p>
                  </div>

                  <Link href="/product/interior/interior-wood">
                    <button className="bg-[#FF6E4A] hover:bg-[#FF5A3A] text-white px-[22px] py-[16px] rounded-sm font-[500] mt-6">
                      LEARN MORE
                    </button>
                  </Link>
                </div>
              </section>

              {/* 🔥 Image with Right Fade (NO layout change) */}
              <section className="px-6 md:px-12 lg:px-20">
                <div className="relative">
                  <Image
                    src={Interiordoorlogo1}
                    alt="Interior Hero"
                    width={100}
                    height={100}
                    className="w-full"
                  />
                  <div className="absolute inset-0 " />
                </div>
              </section>
            </div>

          </div>
        </div>
      </section>

      <FooterBanner />
      <Footer />
    </>
  )
}

export default InteriorPage
