"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";
import PageLoader from "@/components/user/PageLoader";
import HeroSection from "./components/herosection";
import {
  ProductFootericondoor,
  ProductFooterflag,
  intiordooricon,
  extiordoor,
  DoorGray,
  DoorColor,
  SettingGray,
  SettingColor,
  StartGray,
  StartColor,
  UsaGray,
  UsaColor,
} from "@/public/assets";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import FooterBanner from "./components/footerbanner";

const page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [touchedCard, setTouchedCard] = useState<number | null>(null);
  const touchPendingCard = useRef<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Simulate page load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Use public URL so the hero image loads reliably (same pattern as interior/exterior pages)
  const heroBg = "/assets/product/productmain.webp";
  const contant = "Doors That Fit. Every Time.";
  const para =
    "Explore our full line of pre-hung wood and fiberglass doors, organized by material and style. All units are machined in-house to match your project's exact hinge, bore, and jamb specs.";

  const features = [
    {
      text: "Proudly manufactured in the USA for superior quality",
      iconGray: UsaGray,
      iconColor: UsaColor,
    },
    {
      text: "Custom-crafted doors tailored to your exact specifications",
      iconGray: DoorGray,
      iconColor: DoorColor,
    },
    {
      text: "Custom jambs available for a precise, seamless fit",
      iconGray: SettingGray,
      iconColor: SettingColor,
    },
    {
      text: "Hawaii Spec! Built for island durability and performance",
      iconGray: StartGray,
      iconColor: StartColor,
    },
  ];

  const doorCards = [
    {
      title: "Interior Door",
      description:
        "Interior doors define privacy and movement inside your space. They connect rooms, control noise, and support daily use. Clean design, precise fit, and smooth finishes keep every interior refined.",
      image: intiordooricon,
      link: "/product/interior",
    },
    {
      title: "Exterior Door",
      description:
        "Exterior doors protect your space from weather and wear. They improve security while holding their shape in heat and rain. Built to perform daily and look solid from the street.",
      image: extiordoor,
      link: "/product/exterior",
    },
  ];

  return (
    <div>
      <PageLoader isLoading={isLoading} />
      <Navbar />

      <main className="bg-[#fdfffc]">
        <HeroSection
          contant={contant}
          bgImage={heroBg}
          para={para}
          features={features}
        />

        {/* Door Cards Section */}
        <section className="w-full  md:py-[80px]  ">
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[60px]">
            <div className="max-w-[1400px] 2xl:mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 py-[25px] gap-5 justify-items-center xl:justify-items-start">
                {doorCards.map((door, index) => {
                  const isCardTouched = touchedCard === index;
                  return (
                  <React.Fragment key={index}>
                    <Link
                      className="w-full max-w-[407px]"
                      href={door.link}
                      onTouchStart={() => {
                        setTouchedCard(index);
                        touchPendingCard.current = index;
                      }}
                      onClick={(e) => {
                        if (touchPendingCard.current === index) {
                          e.preventDefault();
                          touchPendingCard.current = null;
                          setTimeout(() => {
                            setTouchedCard(null);
                            router.push(door.link);
                          }, 500);
                        }
                      }}
                    >
                      <div
                        style={{
                          backgroundImage: `url('${
                            typeof door.image === "string"
                              ? door.image
                              : door.image.src
                          }')`,
                          backgroundSize: "fit",
                          backgroundPosition: "left",
                          backgroundRepeat: "no-repeat",
                        }}
                        className={`group rounded-lg w-full xl:w-[407px] overflow-hidden shadow-lg h-[265px] flex flex-col justify-end border transition-colors duration-300 hover:border-[#FF6E4A] ${isCardTouched ? "border-[#FF6E4A]" : "border-white"}`}
                      >
                        <div className="w-full h-full flex justify-between">
                          <div className="w-[20%]" />

                          <div
                            className="w-[80%] flex flex-col justify-around items-end pr-3"
                            style={{
                              background:
                                "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 30%)",
                            }}
                          >
                            <div className="w-[193px] pt-8">
                              <h1 className="text-[20px] font-[500] font-roboto mb-2">
                                {door.title}
                              </h1>
                              <p className="text-[14px] font-[300] font-roboto text-black md:text-[#616161]">
                                {door.description}
                              </p>
                            </div>

                            <div className="flex w-full justify-end px-3 mb-2">
                              <div className={`w-5 h-5 border rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 group-hover:border-[#FF6E4A] group-hover:text-[#FF6E4A] ${isCardTouched ? "border-[#FF6E4A] text-[#FF6E4A]" : "border-black"}`}>
                                <ChevronRight className="w-3 h-3" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <FooterBanner />
      </main>

      <Footer />
    </div>
  );
};

export default page;
