import React from 'react'
import Navbar from '@/components/user/Navbar'
import Footer from '@/components/user/Footer'
import { ProductFootericoncheck, ProductFootericonstar, Interiorhero, Interiordoorlogo, Interiordoorlogo1, ProductFooter } from '@/public/assets';
import HeroSection from '../components/herosection';
import Image from 'next/image';
import { MdOutlineArrowForward } from 'react-icons/md';
import Link from 'next/link';
import FooterBanner from '../components/footerbanner';

const InteriorPage = () => {
  const bgImage = "/assets/product/interior door hero image 3.svg";
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

        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24 bg-white">
          <div className="">
            <div className="space-y-6">
              {/* Heading */}
              <h2 className="text-3xl md:text-[46px] font-[500] text-black">
                Molded & Flush Doors
              </h2>

              {/* Logo */}
              <div className="flex items-center gap-3">
                <Image
                  src={Interiordoorlogo}
                  alt="Lynden Door"
                  width={100}
                  height={100}
                  className="w-56"
                />
              </div>

              {/* Subheading */}
              <h3 className="text-[18px] font-[500]  text-black">
                Let Lynden Door Guide You in Discovering Interior Doors as a Key Design Element
              </h3>

              {/* Body Text */}
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-sm md:text-[16px] font-[300] text-[#666666]">
                  Explore the transformative potential of interior doors with Lynden Door. With a passion for innovation and design excellence, we offer a wide range of interior doors that are not only environmentally intelligent but also surprisingly affordable. Our selection ensures that interior doors can become a central feature of your design aesthetic.
                </p>
                <p className="text-sm md:text-[16px] font-[300] text-[#666666]">
                  Experience the value that well-chosen interior doors can add to your home. Whether you opt for molded or flush styles to complement your décor, our doors will enhance the comfort, functionality, and style of any space.
                </p>
              </div>

              {/* Call-to-Action Button */}
              <Link href="/product/interior/Lynden-Door">
              <button className="bg-[#FF6E4A] hover:bg-[#FF5A3A] text-white px-[22px] py-[16px] rounded-lg font-[18px] font-[500]  mt-6">
                LEARN MORE
              </button>
              </Link>
            </div>
          </div>
        </section>

        <section className='px-6 md:px-16'>

          <Image
          
          src={Interiorhero}
          alt="Interior Hero"
          width={100}
          height={100}
          className="w-full"
          />


       
        </section>



        <section className="px-6 md:px-12 lg:px-20 py-10 md:py-24 bg-white">
          <div className="">
            <div className="space-y-6">
              {/* Heading */}
              <h2 className="text-3xl md:text-[46px] font-[500] text-black">
              Wood Stile & Rail Doors
              </h2>

           

              {/* Subheading */}
              <h3 className="text-lg md:text-2xl font-normal text-black">
                Let Lynden Door Guide You in Discovering Interior Doors as a Key Design Element
              </h3>

              {/* Body Text */}
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-base md:text-[18px] font-[500]">
                 Interior Wood Stile & Rail Door Collections - Timeless Elegance of Natural Wood                </p>
                <p className="text-sm md:text-[16px]">
                  Experience the value that well-chosen interior doors can add to your home. Whether you opt for molded or flush styles to complement your décor, our doors will enhance the comfort, functionality, and style of any space.
                </p>
              </div>

              {/* Call-to-Action Button */}
              <Link href={'/product/interior/interior-wood'}>
              
              <button className="bg-[#FF6E4A] hover:bg-[#FF5A3A] text-white px-[22px] py-[16px] rounded-lg font-[18px] font-[500]  mt-6">
                LEARN MORE
              </button>
              </Link>
            </div>
          </div>
        </section>

        <section className='px-6 md:px-12 lg:px-20  md:py-24'>

    <Image
          
          src={Interiordoorlogo1}
          alt="Interior Hero"
          width={100}
          height={100}
          className="w-full"
          />

        </section>

        <FooterBanner />

      
      <Footer />
    </>
  )
}

export default InteriorPage

