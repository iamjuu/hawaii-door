"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Woodcoreimag from "../../../../public/assets/images/landing/woodcore.png";
import Hollowcoreimg from "../../../../public/assets/images/landing/hollowcore.png";
import Fiberglassimg from "../../../../public/assets/images/landing/fiberglass.png";
import Particlecoreimg from "../../../../public/assets/images/landing/particlecore.png";
import Sclcimg from "../../../../public/assets/images/landing/sclc.png";
import Headings from "../components/header";
import { ProductFootericonDoor, ProductFootericonDoorGreen, Starcenter, StarcenterG } from "@/public/assets";

const galleryItems = [
  {
    id: 1,
    title: "Wood Core",
    description: " Island-crafted wood core doors built for strength and natural beauty. Perfect for interiors that need a classic, warm finish.",
    image: Woodcoreimag,
  },
  {
    id: 2,
    title: "Fiber Glass",
    description: "Durable, low-maintenance fiberglass doors designed for Hawai'i's humidity, salt air, and harsh weather, built to last.",
    image: Fiberglassimg,
  },
  {
    id: 3,
    title: "Hollow Core",
    description: " Lightweight, cost-effective hollow core doors ideal for interior spaces where budget and weight matter.",
    image: Hollowcoreimg,
  },
  {
    id: 4,
    title: "Particle Core",
    description: "With a solid feel and cost efficiency, particle core doors offer improved sound control and durability for bedrooms or offices.",
    image: Particlecoreimg,
  },
  {
    id: 5,
    title: "SCLC",
    description: " Premium laminated solid-core doors built for strength, sound reduction, and long-term stability ideal for high-traffic homes and commercial spaces.",
    image: Sclcimg,
  },
];

const CONTENT_WIDTH = "max-w-7xl";

const Gallerysection = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [inViewCards, setInViewCards] = useState<Set<number>>(new Set());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const refs = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!refs.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setInViewCards((prev) => {
          const next = new Set(prev);
          entries.forEach((entry) => {
            const idx = refs.indexOf(entry.target as HTMLDivElement);
            if (idx === -1) return;
            entry.isIntersecting ? next.add(idx) : next.delete(idx);
          });
          return next;
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" }
    );
    refs.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isMobile]);

  const isActive = (idx: number) => isMobile && inViewCards.has(idx);

  // Single card renderer — desktop uses md:group-hover:*, mobile uses isActive state
  const renderCard = (
    item: (typeof galleryItems)[0],
    idx: number,
    heightClass: string,
    descPadding: string
  ) => {
    const a = isActive(idx);
    return (
      <div
        key={item.id}
        ref={(el: HTMLDivElement | null) => { cardRefs.current[idx] = el; }}
      >
        <Link
          href="/gallery"
          className={`group relative ${heightClass} rounded-2xl overflow-hidden cursor-pointer block`}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            className={`object-cover transition-transform duration-500 md:group-hover:scale-105 ${a ? "scale-105" : ""}`}
          />
          {/* Dark overlay - slides up from bottom */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-1/2 bg-black/70 transition-transform duration-500 ease-out md:group-hover:translate-y-0 ${a ? "translate-y-0" : "translate-y-full"}`}
          />
          {/* Card title - fades out when overlay appears */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h3
              className={`text-white text-3xl font-medium transition-opacity duration-300 md:group-hover:opacity-0 ${a ? "opacity-0" : "opacity-100"}`}
            >
              {item.title}
            </h3>
          </div>
          {/* Description - slides up with overlay */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-1/2 ${descPadding} flex items-center justify-center transition-transform duration-500 ease-out md:group-hover:translate-y-0 ${a ? "translate-y-0" : "translate-y-full"}`}
          >
            <p className="text-white text-base md:text-lg font-roboto text-center">
              {item.description}
            </p>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div className="w-full py-[25px] sm:py-12 md:pt-[50px] md:py-[0px] font-inter">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[60px]">
        <div className="max-w-[1400px] 2xl:mx-auto gap-[46px] flex flex-col">
          <div className="">
            <div className="mb-[25px] md:mb-[60px]">
              <Headings
                heading="Gallery"
                subheading="Explore our diverse collection of door styles, each crafted to complement your unique aesthetic."
              />
            </div>

            <div className="pb-[25px] bg-white md:pb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First row — 2 cards */}
                {renderCard(galleryItems[0], 0, "h-[300px]", "p-8")}
                {renderCard(galleryItems[1], 1, "h-[300px]", "p-8")}

                {/* Second row — 3 cards */}
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {galleryItems.slice(2).map((item, i) =>
                    renderCard(item, i + 2, "h-[300px] md:h-[350px]", "p-6")
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width strip */}
      <div className="w-full flex items-start md:items-center justify-center bg-[#F6F5F1] h-[82px] md:h-[68px]">
        <div className={`${CONTENT_WIDTH} relative flex flex-col md:flex-row justify-center items-start md:items-center gap-2 md:gap-12 lg:gap-16 py-3 md:py-[25px] group md:mt-0 transition-all duration-300 text-xs sm:text-sm md:text-base`}>
          <p className="flex md:items-center gap-1 md:gap-4 items-start">
            <div className="relative w-8 h-8">
              <Image src={ProductFootericonDoor} className="w-6 h-6 sm:w-7 sm:h-7 md:size-[32px] group-hover:opacity-0 transition-opacity duration-300" alt="Door" width={100} height={100} />
              <Image src={ProductFootericonDoorGreen} className="w-6 h-6 sm:w-7 sm:h-7 md:size-[32px] absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" alt="Door" width={100} height={100} />
            </div>
            Machined to Perfection
          </p>
          <p className="flex md:items-center gap-1 md:gap-4 items-start">
            <div className="relative w-8 h-8">
              <Image src={Starcenter} className="w-6 h-6 sm:w-7 sm:h-7 md:size-[32px] group-hover:opacity-0 transition-opacity duration-300" alt="Settings" width={100} height={100} />
              <Image src={StarcenterG} className="w-6 h-6 sm:w-7 sm:h-7 md:size-[32px] absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" alt="Settings" width={100} height={100} />
            </div>
            True Hawaii Spec
          </p>
        </div>
      </div>
    </div>
  );
};

export default Gallerysection;
