import React from 'react'
import Navbar from '@/components/user/Navbar'
import Footer from '@/components/user/Footer'
import { ProductFootericoncheck, ProductFootericonstar, Interiorhero, Interiordoorlogo, Interiordoorlogo1, ProductFooter } from '@/public/assets';
import HeroSection from '../components/herosection';
import Image from 'next/image';
import { MdOutlineArrowForward } from 'react-icons/md';
import Link from 'next/link';

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
              <h2 className="text-[46px] font-[500] text-black">
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
                <p className="text-base md:text-lg">
                  Explore the transformative potential of interior doors with Lynden Door. With a passion for innovation and design excellence, we offer a wide range of interior doors that are not only environmentally intelligent but also surprisingly affordable. Our selection ensures that interior doors can become a central feature of your design aesthetic.
                </p>
                <p className="text-base md:text-lg">
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

        <section className='px-16'>

          <Image
          
          src={Interiorhero}
          alt="Interior Hero"
          width={100}
          height={100}
          className="w-full"
          />


       
        </section>



        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24 bg-white">
          <div className="">
            <div className="space-y-6">
              {/* Heading */}
              <h2 className="text-[46px] font-[500] text-black">
              Wood Stile & Rail Doors
              </h2>

           

              {/* Subheading */}
              <h3 className="text-xl md:text-2xl font-normal text-black">
                Let Lynden Door Guide You in Discovering Interior Doors as a Key Design Element
              </h3>

              {/* Body Text */}
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-[18px] font-[500]">
                 Interior Wood Stile & Rail Door Collections - Timeless Elegance of Natural Wood                </p>
                <p className="text-[16px]">
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

        <section className=" px-16 py-16 md:py-24">
          <div className=" px-6 bg-[#84684C] mx-auto">
            <div className="flex  w-full gap-12 items-center justify-between">
              {/* Left Side - Text Content */}
              <div className="w-[43%]">
                <h2 className="text-[42px] font-[500] text-white">
                  Create Your Custom Door
                </h2>
                <div className="flex flex-col justify-between gap-5">
                <p className="text-[18px] font-[400] text-[#C6C6C6] leading-relaxed">
                  Explore doors designed for precision fit, with custom jambs and built to Hawaii Spec for lasting durability. Elevate your space with doors tailored to your style and needs.
                </p>
                <button className="bg-[#FF6E4A] hover:bg-[#FF5A3A] text-white px-8 py-[10px] rounded-[35.2px] font-medium text-[18px] justify-between flex items-center gap-4 transition-colors">
                  Start Building Your Perfect Custom Door Now
                  <MdOutlineArrowForward className="w-8 h-8 -rotate-30" />
                </button>
                </div>
              </div>

              {/* Right Side - Image */}
              <div className="relative w-[50%] flex justify-end  h-[500px] lg:h-[600px]">
                <Image
                  src={ProductFooter}
                  alt="Custom Door Illustration"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </section>
      
      <Footer />
    </>
  )
}

export default InteriorPage

