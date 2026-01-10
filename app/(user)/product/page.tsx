import React from "react";
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";
import HeroSection from "./components/herosection";
import {
  ProductFootericondoor,
  ProductFooterflag,
  intiordooricon,
  extiordoor
} from "@/public/assets";
import { MdOutlineArrowForward } from "react-icons/md";
import { ChevronRight } from "lucide-react";
const page = () => {
  const bgImage = "/assets/product/productmain.svg";
  const contant = "Doors That Fit. Every Time.";
  const para =
    "Explore our full line of pre-hung wood and fiberglass doors, organized by material and style. All units are machined in-house to match your project’s exact hinge, bore, and jamb specs.";
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
      alt: "Interior Door"
    },
    {
      title: "Exterior Door",
      description:
        "Exterior doors protect your space from weather and wear. They improve security while holding their shape in heat and rain. Built to perform daily and look solid from the street.",
      image: extiordoor,
      alt: "Exterior Door"
    }
  ];
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">
        <HeroSection
          contant={contant}
          bgImage={bgImage}
          para={para}
          features={features}
        />

        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {doorCards.map((door, index) => (
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
                  key={index}
                  className="rounded-lg w-[407px] overflow-hidden shadow-lg h-[260px] flex flex-col justify-end"
                >
                  <div className=" w-full h-full flex justify-between">
                    <div className="w-[30%]"></div>
                    <div
                      className="w-[70%] flex flex-col justify-around "
                      style={{
                        background:
                          "linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 30%)"
                      }}
                    >
                      <h1 className="text-[20px] font-[500]">Interior Door</h1>
                      <p className="text-[14px] font-[300]">
                        Interior doors define privacy and movement inside your
                        space.They connect rooms, control noise, and support
                        daily use.Clean design, precise fit, and smooth finishes
                        keep every interior refined.
                      </p>
                      <div className=" flex w-full justify-end px-3">
                      <div className="w-5 h-5 border border-black rounded-full flex items-center justify-center">
                        <ChevronRight className="w-3 h-3" />
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default page;
