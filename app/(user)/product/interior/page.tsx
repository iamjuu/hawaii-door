import React from "react";
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";
import {
  ProductFootericoncheck,
  ProductFootericonstar,
  Interiorhero,
  Interiordoorlogo,
  Interiordoorlogo1,
  StartGray,
  StartColor,
  TickGrayPng,
  TickColorPng,
  ConstructGray,
  ConstructColor,
  ComfortGray,
  ComfortColor,
} from "@/public/assets";
import HeroSection from "../components/herosection";
import Image from "next/image";
import Link from "next/link";
import FooterBanner from "../components/footerbanner";
import Heading from "../../home/components/header";

const InteriorPage = () => {
  const bgImage = "/assets/product/interior door hero image 3.svg";
  const contant = "Interior Doors";
  const para =
    "Discover interior doors; we offer a variety of door types, designs and styles. You are sure to find the perfectdoor for your project.";

  const features = [
    {
      text: "Interior doors as design features",
      iconGray: StartGray,
      iconColor: StartColor,
    },
    {
      text: "Styles that align your space",
      iconGray: TickGrayPng,
      iconColor: TickColorPng,
    },
    {
      text: "Smart construction choices",
      iconGray: ConstructGray,
      iconColor: ConstructColor,
    },
    {
      text: "Comfort you notice every day",
      iconGray: ComfortGray,
      iconColor: ComfortColor,
    },
  ];

  return (
    <>
      <Navbar />

      <main className="bg-[#fdfffc]">
        <HeroSection
          contant={contant}
          bgImage={bgImage}
          para={para}
          features={features}
        />

        <section className="w-full py-10 sm:py-12 md:pt-[50px] md:py-[0px] font-inter ">
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[60px] ">
            <div className="max-w-[1400px] 2xl:mx-auto">
              <div className="flex flex-col gap-16 md:gap-24">
                {/* ================= First Block ================= */}
                <div className="flex flex-col gap-8 md:gap-12">
                  <section>
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

                      <h3 className="text-base md:text-lg font-[500] text-black">
                        Let Lynden Door Guide You in Discovering Interior Doors
                        as a Key Design Element
                      </h3>

                      <div className="space-y-4 leading-relaxed max-w-[1100px]">
                        <p className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Reimagine the impact of interior doors with Lynden
                          Door. Driven by innovation and refined design
                          standards, we present a broad range of interior doors
                          that balance environmental responsibility with
                          accessible pricing. Our collection ensures interior
                          doors play a defining role in shaping your overall
                          design aesthetic.
                        </p>
                        <p className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Feel the difference the right interior doors bring to
                          your home. Choose molded or flush designs to suit your
                          décor. These doors elevate comfort, improve usability,
                          and refine the look of every space.
                        </p>
                      </div>

                      <Link href="/product/interior/Lynden-Door">
                        <button className="bg-[#FF6E4A] hover:bg-black text-white px-6 py-3 rounded-lg font-[500] mt-6 transition-colors duration-300">
                          LEARN MORE
                        </button>
                      </Link>
                    </div>
                  </section>

                  {/* 🔥 Image with Right Fade (NO layout change) */}
                  <section>
                    <div className="relative">
                      <Image
                        src={Interiorhero}
                        alt="Interior Hero"
                        width={100}
                        height={100}
                        className="w-full rounded-lg"
                      />
                      <div className="absolute inset-0 " />
                    </div>
                  </section>
                </div>

                {/* ================= Second Block ================= */}
                <div className="flex flex-col gap-8 md:gap-12">
                  <section>
                    <div className="space-y-6">
                      <Heading heading="Wood Stile & Rail Doors" />

                      <div className="space-y-4 leading-relaxed">
                        <p className="text-base md:text-lg font-[500] text-black">
                          Interior Wood Stile & Rail Door Collections - Timeless
                          Elegance of Natural Wood
                        </p>
                        <p className="ext-[#666666]  text-[16px] leading-[26px]  font-light max-w-[1100px]">
                          Enhance your home with the timeless appeal of natural
                          wood. Our interior wood stile and rail door
                          collections feature diverse designs, wood species,
                          glass options, and panel configurations. This wide
                          selection helps you craft a distinctive, personal home
                          style your family will value for years.
                        </p>
                      </div>

                      <Link href="/product/interior/interior-wood">
                        <button className="bg-[#FF6E4A] hover:bg-black text-white px-6 py-3 rounded-lg font-[500] mt-6 transition-colors duration-300">
                          LEARN MORE
                        </button>
                      </Link>
                    </div>
                  </section>

                  {/* 🔥 Image with Right Fade (NO layout change) */}
                  <section>
                    <div className="relative">
                      <Image
                        src={Interiordoorlogo1}
                        alt="Interior Hero"
                        width={100}
                        height={100}
                        className="w-full rounded-lg"
                      />
                      <div className="absolute inset-0 " />
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FooterBanner />
      </main>
      <Footer />
    </>
  );
};

export default InteriorPage;
