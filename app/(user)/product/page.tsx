"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";
import PageLoader from "@/components/user/PageLoader";
import HeroSection from "./components/herosection";
import {
  ProductFootericondoor,
  ProductFooterflag,
  intiordooricon,
  extiordoor
} from "@/public/assets";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import FooterBanner from "./components/footerbanner";

const page = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate page load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const bgImage = "https://hawaai-doors-bucket.s3.us-west-2.amazonaws.com/uploads/1769351026932-hero_productmain.webp";
  const contant = "Doors That Fit. Every Time.";
  const para =
    "Explore our full line of pre-hung wood and fiberglass doors, organized by material and style. All units are machined in-house to match your project's exact hinge, bore, and jamb specs.";

  const features = [
    {
      text: "Proudly manufactured in the USA for superior quality",
      iconType: ProductFooterflag
    },
    {
      text: "Custom-crafted doors tailored to your exact specifications",
      iconType: ProductFootericondoor
    }
  ];

  const doorCards = [
    {
      title: "Interior Door",
      description:
        "Interior doors define privacy and movement inside your space. They connect rooms, control noise, and support daily use. Clean design, precise fit, and smooth finishes keep every interior refined.",
      image: intiordooricon,
      link: "/product/interior"
    },
    {
      title: "Exterior Door",
      description:
        "Exterior doors protect your space from weather and wear. They improve security while holding their shape in heat and rain. Built to perform daily and look solid from the street.",
      image: extiordoor,
      link: "/product/exterior"
    }
  ];

  return (
    <div>
      <PageLoader isLoading={isLoading} />
      <Navbar />

      <main>
        <HeroSection
          contant={contant}
          bgImage={bgImage}
          para={para}
          features={features}
        />

        {/* Door Cards Section */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-0 justify-items-center lg:justify-items-start">
            {doorCards.map((door, index) => (
              <React.Fragment key={index}>
                <Link className="w-full" href={door.link}>
              <div
                style={{
                  backgroundImage: `url('${
                    typeof door.image === "string"
                      ? door.image
                      : door.image.src
                  }')`,
                  backgroundSize: "fit",
                  backgroundPosition: "left",
                  backgroundRepeat: "no-repeat"
                }}
                className="group rounded-lg w-full max-w-[407px] lg:w-[407px] overflow-hidden shadow-lg h-[280px] flex flex-col justify-end border border-white hover:border-[#FF6E4A]"
              >
                <div className="w-full h-full flex justify-between">
                  <div className="w-[20%]" />

                  <div
                    className="w-[80%] flex flex-col justify-around items-end pr-3"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 30%)"
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
                    
                        <div className="w-5 h-5 border border-black rounded-full flex items-center justify-center cursor-pointer group-hover:border-[#FF6E4A] group-hover:text-[#FF6E4A] transition-colors">
                          <ChevronRight className="w-3 h-3" />
                        </div>
                  
                    </div>
                  </div>
                </div>
              </div>
              </Link>
              </React.Fragment>
            ))}
          </div>
        </section>

        <FooterBanner />
      </main>

      <Footer />
    </div>
  );
};

export default page;
