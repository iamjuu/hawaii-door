"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";
import {
  ProductFootericoncheck,
  ProductFootericonstar,
  Interiordoorlogo,
  ProductFooter,
  sideMain,
  white1,
  white2,
  white3,
  white4,
  ProductMain,
  white20,
  white19,
  white18,
  white17,
  white16,
  white15,
  white14,
  white13,
  white12,
  white11,
  white10,
  white9,
  white8,
  white7,
  white6,
  white5,
  stair,
  way,
  wood1,
  wood4,
  wood3,
  wood2,
  Resdiscovery,
  modernmain,
  modern1,
  modern12,
  kitchen,
  modern11,
  modern10,
  modern9,
  modern8,
  modern7,
  modern6,
  modern5,
  modern4,
  modern3,
  modern2,
  wood7,
  wood6,
  wood5,
  playwood1,
  playwood2,
  playwood3,
  playwood4,
  playwood5,
  playwood6,
  playwood7,
  playwood8,
  playwood9,
  playwood10,
  playwood11,
  playwood12,
  playwood13,
  playwood14,
  playwood15,
  Kitchenwoodveneer,
  PrefinishedRiftCut,
  PrefinishedRiftCut1,
  PrefinishedRiftCut2,
  PrefinishedRiftCutTeak,
  PrefinishedEmbossed,
  PrefinishedEmbossed1,
  PrefinishedEmbossed2,
  PrefinishedSmooth,
  PrefinishedSmooth1,
  PrefinishedSmooth2,
  PrefinishedSmooth3,
  PrefinishedSmooth4,
  PrimedSmooth,
  PrimedTexturedHardboardSlab,
  Bathroom,
  footermainaImage1,
  footermainaImage2,
  footermainaImage3,
  footermainaImage4,
  footermainaImage5,
  SettingGray,
  SettingColor,
  StartGray,
  StartColor,
  ComfortGray,
  ComfortColor,
  TickGrayPng,
  TickColorPng,
} from "@/public/assets";
import HeroSection from "../../components/herosection";
import Image from "next/image";
import { MdOutlineArrowForward } from "react-icons/md";
import FooterBanner from "../../components/footerbanner";
import { FiX } from "react-icons/fi";
import { HiMenu } from "react-icons/hi";

const LyndenDoorPage = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  // Custom slow scroll to top
  const slowScrollToTop = (duration = 2000) => {
    const start = window.scrollY;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (easeInOutQuad)
      const ease =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      window.scrollTo(0, start * (1 - ease));

      if (elapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    if (sectionId === "overview") {
      const element = document.getElementById("overview");
      if (element) {
        const offset = 100;
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
      setOpenMenu(false);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Offset for fixed navbar
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setOpenMenu(false); // Close mobile menu
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setActiveSection("overview");
        return;
      }

      const sections = [
        "overview",
        "new-products",
        "fineline",
        "elemental",
        "stileline",
        "rediscovery",
        "molded",
        "wood-veneer",
        "prefinished",
        "lynden-ventilated-door",
      ];

      let current = "overview";
      const scrollPosition = window.scrollY + 150;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          // If we've scrolled past the top of the section, it's a candidate
          if (element.offsetTop <= scrollPosition) {
            current = sectionId;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // AWS hero (commented out): "https://hawaai-doors-bucket.s3.us-west-2.amazonaws.com/uploads/1769351029217-hero_interior-door-hero.webp"
  const bgImage = "/assets/product/lyndenproduct.svg";
  const contant = "Lynden Door";
  const para =
    "Discover premium Lynden Door interior solutions; we offer a variety of door types, designs and styles. Experience quality craftsmanship and design excellence.";
  const features = [
    {
      text: "Versatile for every project",
      iconGray: SettingGray,
      iconColor: SettingColor,
    },
    {
      text: "Built for long-term use",
      iconGray: StartGray,
      iconColor: StartColor,
    },
    {
      text: "Designed with purpose",
      iconGray: ComfortGray,
      iconColor: ComfortColor,
    },
    {
      text: "Made to match your vision",
      iconGray: TickGrayPng,
      iconColor: TickColorPng,
    },
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

      {/* MOBILE MENU BUTTON - STICKY */}
      <button
        onClick={() => setOpenMenu(true)}
        className="md:hidden fixed top-[80px] left-6 z-30 flex items-center gap-2 border bg-[#b7d7a8] border-gray-300 rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#a8c798] transition-colors shadow-lg"
      >
        <HiMenu className="text-lg" />
        Menu
      </button>

      {/* OVERLAY */}
      {openMenu && (
        <div
          onClick={() => setOpenMenu(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <section className="px-8 md:px-12 lg:px-20 py-1 bg-white font-roboto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Sidebar - Navigation Menu */}
            {/* LEFT SIDEBAR */}
            <aside
              className={`
                fixed md:static top-0 left-0 h-full md:h-auto
                w-[280px] bg-white flex-shrink-0
                z-50 md:z-auto
                transform transition-transform duration-300 ease-in-out
                ${openMenu ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0
              `}
            >
              <div className="bg-white border border-gray-200 rounded-lg p-6 h-full lg:sticky lg:top-[100px] lg:max-h-[calc(100vh-120px)] overflow-y-auto">
                {/* MOBILE HEADER */}
                <div className="flex bg-[#b7d7a8] justify-between items-center mb-6 md:hidden">
                  <h2 className="text-lg font-semibold text-black">
                    Lynden Door
                  </h2>
                  <button onClick={() => setOpenMenu(false)}>
                    <FiX className="text-xl" />
                  </button>
                </div>

                {/* DESKTOP HEADER - Simple Title */}
                <div className="hidden md:block mb-6 ">
                  <h2 className="text-lg font-semibold">Lynden Door</h2>
                </div>

                <nav className="space-y-0">
                  {[
                    { label: "Overview", id: "overview" },
                    { label: "New Products", id: "new-products" },
                    { label: "FineLine", id: "fineline" },
                    { label: "Elemental", id: "elemental" },
                    { label: "StileLine", id: "stileline" },
                    { label: "ReDiscovery", id: "rediscovery" },
                    { label: "Molded", id: "molded" },
                    { label: "Wood Veneer", id: "wood-veneer" },
                    { label: "Prefinished", id: "prefinished" },
                    {
                      label: "Lynden Ventilated Door",
                      id: "lynden-ventilated-door",
                    },
                  ].map((item, index) => (
                    <div key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`block w-full text-left py-3 transition-colors text-sm font-medium ${
                          activeSection === item.id
                            ? "text-[#FF6E4A] font-semibold"
                            : "text-gray-700 hover:text-[#FF6E4A]"
                        }`}
                      >
                        {item.label}
                      </button>
                      {index < 9 && (
                        <div className="border-t border-gray-200"></div>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </aside>
            {/* Right Side - Main Content */}
            <div className="flex-1 space-y-8 mt-2 md:mt-8 mb-3 md:mb-[20px]">
              {/* Overview Section */}
              <div id="overview" className="scroll-mt-[150px]">
                {/* Logo */}
                <div className="flex items-center gap-3 mb-6">
                  <Image
                    src={Interiordoorlogo}
                    alt="Lynden Door"
                    width={200}
                    height={60}
                    className="h-auto"
                  />
                </div>

                {/* Headline */}
                <p className="text-lg text-gray-600 font-medium mb-[15px] md:mb-[12px]">
                  The Perfect Door for Any Project - Lynden Door
                </p>

                {/* Main Title */}
                <h1 className="text-[24px] md:text-[28px] font-[500] text-black leading-tight mb-[12px]">
                  Discover the Ideal Interior Doors for Residential, Light
                  Commercial, and Architectural/Commercial Spaces
                </h1>

                {/* Introductory Paragraph */}
                <p className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                  Lynden Door provides a comprehensive range of high-quality
                  interior door products for various projects, including
                  residential, light commercial, and architectural/commercial
                  applications. Our doors are designed to meet the diverse needs
                  of different spaces while maintaining exceptional quality and
                  aesthetic appeal.
                </p>

                {/* Why Choose Lynden Door Section */}
                <div className="space-y-4 py-[20px] md:py-[23px]">
                  <h2 className="text-[24px] md:text-[28px] font-[500] text-black">
                    Why Choose Lynden Door?
                  </h2>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="text-gray-500 text-xl font-bold ">
                        •
                      </span>
                      <div>
                        <strong className="text-[#666666]  text-[16px] leading-[26px] font-semibold">
                          Versatile Product Portfolio:
                        </strong>
                        <span className="text-[#666666]  text-[16px] leading-[26px] font-light ml-2">
                          Doors crafted to blend seamlessly with any
                          environment, from residential to commercial and
                          architectural designs.
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gray-500 text-xl font-bold ">
                        •
                      </span>
                      <div>
                        <strong className="text-[#666666]  text-[16px] leading-[26px] font-semibold">
                          Quality and Durability:
                        </strong>
                        <span className="text-[#666666]  text-[16px] leading-[26px] font-light ml-2">
                          Doors built to last, offering a blend of aesthetics
                          and functionality.
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gray-500 text-xl font-bold ">
                        •
                      </span>
                      <div>
                        <strong className="text-[#666666]  text-[16px] leading-[26px] font-semibold">
                          Customization Options:
                        </strong>
                        <span className="text-[#666666]  text-[16px] leading-[26px] font-light ml-2">
                          A variety of styles, materials, and finishes to match
                          project requirements.
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Explore Our Interior Door Collections Section */}
                <div className="space-y-4">
                  <h2 className="text-[24px] md:text-[28px] font-[500] text-black">
                    Explore Our Interior Door Collections
                  </h2>
                  <div className="space-y-3">
                    <h3 className="text-[20px] md:text-[22px] font-[400] text-[#3B3B3B] uppercase tracking-wide">
                      Residential Doors
                    </h3>
                    <p className="text-[16px] leading-[26px] text-[#666666]  font-light">
                      Improve the look and comfort of your home with our broad
                      range of residential interior doors. From timeless designs
                      to contemporary styles, you will find doors that fit your
                      décor perfectly
                    </p>
                  </div>
                  <div>
                    <p className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                      All Lynden Door Residential products{" "}
                      <strong className="font-semibold">(SD Series)</strong> all
                      available with either a hollow or solid core and carry a{" "}
                      <strong className="font-semibold">
                        1-year limited warranty.
                      </strong>
                      Select doors (solid core, 1-3/4" thick) may be ordered
                      with a fire rating.
                    </p>
                  </div>
                  <div className="space-y-6 mt-8">
                    {/* Light Commercial Doors */}
                    <div className="space-y-3">
                      <h3 className="text-[18px] md:text-[22px] font-[400] text-black uppercase tracking-wide">
                        Light Commercial Doors
                      </h3>
                      <p className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                        Our light commercial doors are ideal for small
                        businesses, offices, and other commercial spaces,
                        providing durability and a professional look.
                      </p>
                    </div>

                    {/* Architectural/Commercial Doors */}
                    <div className="space-y-3 ">
                      <h3 className="text-[18px] md:text-[22px] font-[400] text-black uppercase tracking-wide">
                        Architectural/Commercial Doors
                      </h3>
                      <p className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                        For larger commercial projects and architectural
                        designs, our doors offer superior performance and
                        elegant aesthetics, making them a perfect choice for
                        high-traffic areas and sophisticated settings.
                      </p>
                    </div>

                    {/* Warranty Information */}
                    <p className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                      Light Commercial{" "}
                      <strong className="font-semibold">CD Series</strong> doors
                      come with a{" "}
                      <strong className="font-semibold">
                        5-year limited warranty
                      </strong>
                      , and Architectural{" "}
                      <strong className="font-semibold">LD Series</strong> doors
                      have a{" "}
                      <strong className="font-semibold">
                        lifetime limited warranty
                      </strong>
                      .
                    </p>
                  </div>
                </div>
              </div>
              {/* New Products Section */}
              <div
                id="new-products"
                className="mt-16 space-y-8 scroll-mt-[150px]"
              >
                {/* Section Heading */}
                <h2 className="text-[28px] font-[500] text-black">
                  New Designs - FineLine Collection
                </h2>

                {/* Two Column Layout */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                  {/* Left Column - Image */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative w-full h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
                      <Image
                        src={sideMain}
                        alt="FineLine Collection Interior"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Right Column - Text Content */}
                  <div className="w-full lg:w-1/2 space-y-6">
                    <h3 className="text-[16px] font-[500] text-black leading-tight">
                      Discover the FineLine Collection – Where Minimalism Meets
                      Magnificence.
                    </h3>

                    <p className="text-[16px] font-[300] text-gray-700 leading-relaxed">
                      Inspired by the vibrant neighborhoods of the Pacific
                      Northwest, FineLine doors reflect the distinct charm of
                      Portland, Seattle, and Vancouver.
                    </p>

                    <p className="text-[16px] font-[300] text-gray-700 leading-relaxed">
                      Seattle&apos;s Alki, Montlake, Ravenna, and Ballard blend
                      modern lines with coastal influences. Portland&apos;s
                      Parkrose and Laurelhurst showcase architectural elegance,
                      while Vancouver&apos;s Denman, Granville, Fairview, and
                      Robson embody urban sophistication and cosmopolitan flair.
                      Every design tells a story, capturing the spirit of these
                      iconic districts.
                    </p>
                  </div>
                </div>
              </div>

              {/* New 2025 Designs Grid */}
              <div className="mt-[25px] md:mt-16 bg-[#444237BA]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                  {[
                    { image: white1, name: "Ballard" },
                    { image: white2, name: "Fairview" },
                    { image: white3, name: "Granville" },
                    { image: white4, name: "Ravenna" },
                  ].map((item, index) => (
                    <div key={index} className=" rounded-lg overflow-hidden">
                      {/* Image Container */}
                      <div className="relative w-full h-[400px] ">
                        <Image
                          src={item.image}
                          alt={`New 2025 ${item.name}`}
                          fill
                          className="object-contain p-4"
                        />
                      </div>

                      {/* Label */}
                      <div className="px-4 py-3">
                        <p className="text-white text-sm font-medium text-center">
                           {item.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FineLine Door Collection Image Section */}
              <div id="fineline" className="mt-[25px] md:mt-16 space-y-6 scroll-mt-[150px]">
                <h2 className="text-[28px] font-[500] text-black">
                  FineLine Door Collection
                </h2>

                <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
                  <Image
                    src={sideMain}
                    alt="FineLine Door Collection - Modern Interior"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="space-y-6 mt-12">
                {/* FineLine Section */}
                <div className="space-y-6">
                  {/* Main Heading */}
                  <h2 className="text-[28px] font-[500] text-black">
                    Clean. Modern. Purposeful.
                  </h2>

                  {/* Paragraph 1 */}
                  <p className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                    <strong className="font-semibold">FineLine</strong> designs
                    introduce understated, sleek profiles that bring a fresh,
                    refined aesthetic to any space. Where less is more, these
                    doors make minimalism magnificent.
                  </p>

                  {/* Paragraph 2 */}
                  <p className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                    Designed for single-family, multi-family, and hospitality
                    projects, the FineLine Collection offers grooved profiles
                    thoughtfully positioned for hardware compatibility and
                    accessibility compliance. Performance upgrades include
                    ventilated core options, STC and fire ratings, ensuring
                    design flexibility without compromise.
                  </p>

                  {/* Paragraph 3 */}
                  <p className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                    Available as passage, bifold, or double door systems,
                    FineLine is crafted to meet every architectural and design
                    need.
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 mt-6">
                    <h3 className="text-[20px] font-[500] text-black">
                      Features:
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Creative, conceptual, uniquely contemporary
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Contemporary modernizing solution
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Ten standard designs
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Single and double door applications
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Engineered and designed to accommodate most door
                          hardware
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Wide top and bottom rails allow trimming of up to
                          1&quot; on each end
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Custom factory machining
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Available 1-3/8&quot; and 1-3/4&quot; thick and
                          6&apos;8&quot;, 7&apos;0&quot; &amp; 8&apos;0&quot;
                          heights in passage and bifold door sizes
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Custom sizes available
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Durable, primed hardboard surface, ready to accept
                          paint
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Engineered wood construction outperforms wood doors
                          while offering superior value
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Fire ratings available
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          STC sound rated doors
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-[25px] md:mt-16 bg-[#444237BA]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
                  {[
                    { image: white1, name: "Ballard" },
                    { image: white2, name: "Fairview" },
                    { image: white3, name: "Granville" },
                    { image: white4, name: "Ravenna" },
                    { image: white5, name: "Alki" },
                    { image: white6, name: "Denman" },
                    { image: white7, name: "Laurelhurst" },
                    { image: white8, name: "Parkrose" },
                    { image: white9, name: "Montlake" },
                    { image: white10, name: "Robson" },
                  ].map((item, index) => (
                    <div key={index} className=" rounded-lg overflow-hidden">
                      {/* Image Container */}
                      <div className="relative w-full h-[400px] ">
                        <Image
                          src={item.image}
                          alt={`New 2025 ${item.name}`}
                          fill
                          className="object-contain p-4"
                        />
                      </div>

                      {/* Label */}
                      <div className="px-4 py-3">
                        <p className="text-white text-sm font-medium text-center">
                           {item.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div id="elemental" className="mt-16 space-y-6 scroll-mt-24">
                <h2 className="text-[28px] font-[500] text-black">
                  Elemental Door Collection
                </h2>

                <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden shadow-lg">
                  <Image
                    src={stair}
                    alt="Elemental Door Collection - Modern Interior with Staircase"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* ELEMENTAL Door Collection Content */}
              <div className="mt-16 space-y-6">
                <div className="space-y-6">
                  {/* Main Description */}
                  <p className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                    The <strong className="font-semibold">ELEMENTAL</strong>{" "}
                    Door Collection of bevel grooved door designs is modern in
                    style and construction.ELEMENTAL door designs are
                    characterized by clean, simple lines. Offering a modern take
                    on traditional wood and molded doors, the 1- and 2-Panel
                    door designs allow room for interpretation in any
                    architectural and interior design environment.
                  </p>

                  {/* Availability Statement */}
                  <p className="text-[#666666]  text-[16px] leading-[26px]  font-semibold">
                    All door designs are now available with single or double
                    route lines.
                  </p>

                  {/* General Application */}
                  <p className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                    Designed, engineered and fabricated for today&apos;s
                    building needs, these doors are at home in any application.
                  </p>

                  {/* Key Features */}
                  <div className="space-y-3 mt-6">
                    <h3 className="text-[20px] font-[500] text-black">
                      Key Features:
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Smooth, bevel grooved MDF surface, ready for paint
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          6&apos; stile width easily accommodates door hardware
                          (doors 2&apos;0&apos; and up to 4&apos;0&quot;
                          [greater widths available special order])
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          10&quot; bottom rail meets most disability access
                          requirements
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Up to 90-minute fire rating available*
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Optional exit device blocking
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          6&apos;8&quot;, 7&apos;0&quot; and 8&apos;0&quot;
                          heights
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          1-3/8&quot; and 1-3/4&quot; thickness, hollow and
                          solid core
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Ventilated door options
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Bifold doors available*
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Footnote */}
                  <p className="text-sm text-gray-600 italic mt-4">
                    *Contact your Lynden Door representative for more
                    information
                  </p>
                </div>
              </div>

              <div className="mt-[25px] md:mt-16 bg-[#444237BA]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
                  {[
                    { image: white11, name: "Ballard" },
                    { image: white12, name: "Fairview" },
                    { image: white13, name: "Granville" },
                    { image: white14, name: "Ravenna" },
                    { image: white15, name: "Ballard" },
                    { image: white16, name: "Fairview" },
                    { image: white17, name: "Granville" },
                    { image: white18, name: "Ravenna" },
                    { image: white19, name: "Ballard" },
                    { image: white20, name: "Ballard" },
                  ].map((item, index) => (
                    <div key={index} className=" rounded-lg overflow-hidden">
                      {/* Image Container */}
                      <div className="relative w-full h-[400px] ">
                        <Image
                          src={item.image}
                          alt={`New 2025 ${item.name}`}
                          fill
                          className="object-contain p-4"
                        />
                      </div>

                      {/* Label */}
                      <div className="px-4 py-3">
                        <p className="text-white text-sm font-medium text-center">
                           {item.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* StileLine Door Collection Image Section */}
              <div id="stileline" className="mt-[25px] md:mt-16 space-y-6 scroll-mt-24">
                <h2 className="text-[28px] font-[500] text-black">
                  StileLine Door Collection
                </h2>

                <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px]  overflow-hidden shadow-lg">
                  <Image
                    src={way}
                    alt="StileLine Door Collection - Modern Hallway with Wood Veneer Doors"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Descriptive Text */}
                <p className="text-[#666666]  text-[16px] leading-[26px]  font-light italic">
                  The natural beauty of wood veneer sketch face designs that
                  showcase the beauty of wood and create a bold, modern look.
                </p>
              </div>

              {/* StileLine Door Collection Content */}
              <div className="mt-10 space-y-6">
                <div className="space-y-6">
                  {/* Introductory Paragraphs */}
                  <p className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                    These premium natural wood veneer doors are at home in
                    spaces ranging from high-end commercial projects to luxury
                    spas and custom homes. If you are looking for elegant
                    designs, StileLine is the perfect solution.
                  </p>

                  {/* Key Features */}
                  <div className="space-y-3 mt-6">
                    <h3 className="text-[20px] font-[500] text-black">
                      Key Features:
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          European styling with an opposing grain in Quarter
                          Sawn African Mahogany, Plain Sliced White Maple, Rift
                          White Oak and Quarter Sawn Black Walnut
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          High quality wood veneer door provide the warmth and
                          beauty of natural wood
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Solid or hollow core options
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Wide top and bottom rails allow trimming of up to
                          1&quot; on each end
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Custom factory machining
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Available 1-3/8&quot; and 1-3/4&quot; thick and
                          6&apos;8&quot;, 7&apos;0&quot; &amp; 8&apos;0&quot;
                          heights in passage and bifold door sizes
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Custom sizes available
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Optional ClearLine Factory Finish is an affordable,
                          state of the art, ultra-violet cured clear coat finish
                          (no VOCs released in the home)
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Due to the nature of real wood, each door surface will
                          vary in woodgrain patterns, color and appearance,
                          showcasing the beauty of real wood
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Fire ratings available
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          STC sound rated doors
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
                {[
                  { image: wood1, name: "StileLine-African-Mahogany", sub: "African-Mahogany" },
                  { image: wood2, name: "StileLine-Maple", sub: "Maple" },
                  {
                    image: wood3,
                    name: "StileLine",
                    sub: "Rift Cut White Oak",
                  },
                  { image: wood4, name: "StileLine", sub: "Walnut" },
                ].map((item, index) => (
                  <div key={index} className=" rounded-lg overflow-hidden">
                    {/* Image Container */}
                    <div className="relative w-full h-[400px] ">
                      <Image
                        src={item.image}
                        alt={`New 2025 ${item.name}`}
                        fill
                        className="object-contain p-4"
                      />
                    </div>

                    {/* Label */}
                    <div className="px-4 py-3">
                      <p className="text-black text-sm font-medium text-center">
                         {item.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* ReDiscovery Door Collection Image Section */}
              <div
                id="rediscovery"
                className="mt-[25px] md:mt-16 space-y-6 scroll-mt-[150px]"
              >
                <h2 className="text-[28px] font-[500] text-black">
                  ReDiscovery Door Collection
                </h2>

                <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px]  overflow-hidden shadow-lg">
                  <Image
                    src={Resdiscovery}
                    alt="ReDiscovery Door Collection - Modern Barn Door Hallway"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* ReDiscovery Door Collection Content */}
                <div className="mt-8 space-y-6">
                  {/* Introductory Paragraph */}
                  <p className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                    The luxury of stunning wood grain with custom-order veneers,
                    exotic wood and boutique-style design. These door designs
                    are show stoppers.
                  </p>

                  {/* Key Features */}
                  <div className="space-y-3 mt-6">
                    <h3 className="text-[20px] font-[500] text-black">
                      Key Features:
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Contemporary look and custom opportunities for
                          horizontal grain or sketchface designs.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Rediscover doors by employing one of our existing
                          custom designs or exploring other species,
                          configurations &amp; finishes
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          High quality wood veneer door provide the warmth and
                          beauty of natural wood
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Solid or hollow core options
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Wide top and bottom rails allow trimming of up to
                          1&quot; on each end
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Custom factory machining
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Available 1-3/8&quot; and 1-3/4&quot; thick and
                          6&apos;8&quot;, 7&apos;0&quot; &amp; 8&apos;0&quot;
                          heights in passage and bifold door sizes
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Custom sizes available
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Optional ClearLine Factory Finish is an affordable,
                          state of the art, ultra-violet cured clear coat finish
                          (no VOCs released in the home)
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Due to the nature of real wood, each door surface will
                          vary in woodgrain patterns, color and appearance,
                          showcasing the beauty of real wood.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Fire ratings available
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          STC sound rated doors
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
                  {[
                    {
                      image: wood5,
                      name: "Rediscovery-SpecialOrder001",
                      sub: "African-Mahogany",
                    },
                    { image: wood6, name: "Rediscovery-SpecialOrder002", sub: "Maple" },
                    {
                      image: wood7,
                      name: "Rediscovery-SpecialOrder003",
                      sub: "Rift Cut White Oak",
                    },
                  ].map((item, index) => (
                    <div key={index} className=" rounded-lg overflow-hidden">
                      {/* Image Container */}
                      <div className="relative w-full h-[400px] ">
                        <Image
                          src={item.image}
                          alt={`New 2025 ${item.name}`}
                          fill
                          className="object-contain p-4"
                        />
                      </div>

                      {/* Label */}
                      <div className="px-4 py-3">
                        <p className="text-black text-sm font-medium text-center">
                          {item.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Molded Door Collection Image Section */}
                <div id="molded" className="mt-[25px] md:mt-16 space-y-6 scroll-mt-[150px]">
                  <h2 className="text-[28px] font-[500] text-black">
                    Molded Door Collection
                  </h2>

                  <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={modernmain}
                      alt="Molded Door Collection - Modern Bathroom with Barn Door"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Molded Door Collection Content */}
                <div className="mt-8 space-y-6">
                  {/* Introductory Paragraph */}
                  <p className="text-[#666666]  text-[16px] leading-[26px]  font-light ">
                    Versatile designs for a range of interior needs, these
                    fiberboard doors offer style &amp; character in a range of
                    designs, including flat recessed panels and traditional
                    smooth raised panel designs.
                  </p>

                  {/* Key Features */}
                  <div className="space-y-3 mt-6">
                    <h3 className="text-[20px] font-[500] text-black">
                      Key Features:
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Contemporary panel designs in all popular panel
                          layouts
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Smooth and woodgrain textured molded designs with flat
                          or raised panels
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Molded high-density fiberboard facings resist
                          shrinking, swelling, cracking and joint separation
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Available with matching bifolds
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Hollow and solid core choices
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Engineered wood construction outperforms wood doors
                          while offering superior value
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Wide top and bottom rails allow trimming of up to
                          1&quot; on each end
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Custom factory machining
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Available 1-3/8&quot; and 1-3/4&quot; thick and
                          6&apos;8&quot;, 7&apos;0&quot; &amp; 8&apos;0&quot;
                          heights in passage and bifold door sizes
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Door facings contain recycled wood fibers and No Added
                          Urea Formaldehyde (please ask your sales
                          representative for more information)
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Fire ratings available
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          STC sound rated doors
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-16 ">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
                    {[
                      {
                        image: modern1,
                        name: "Mercer",
                        sub: "Flat Panel",
                        type: "Smooth",
                      },
                      {
                        image: modern2,
                        name: "Whitman",
                        sub: "Flat Panel",
                        type: "Smooth",
                      },
                      {
                        image: modern3,
                        name: "Aberdeen",
                        sub: "Flat Panel",
                        type: "Smooth",
                      },
                      {
                        image: modern4,
                        name: "Yarrow",
                        sub: "Flat Panel",
                        type: "Smooth",
                      },
                      {
                        image: modern5,
                        name: "Winthrop",
                        sub: "Flat Panel",
                        type: "Smooth",
                      },
                      {
                        image: modern6,
                        name: "Kingston",
                        sub: "Raised Panel",
                        type: "Smooth",
                      },
                      {
                        image: modern7,
                        name: "Rosario",
                        sub: "Raised Panel",
                        type: "Smooth",
                      },
                      {
                        image: modern8,
                        name: "Lopez",
                        sub: "Raised Panel",
                        type: "Smooth",
                      },
                      {
                        image: modern9,
                        name: "Benton",
                        sub: "Raised Panel",
                        type: "Smooth",
                      },
                      {
                        image: modern10,
                        name: "Columbia",
                        sub: "Raised Panel",
                        type: "Smooth",
                      },
                      {
                        image: modern11,
                        name: "Blakely",
                        sub: "Raised Panel",
                        type: "Textured",
                      },
                      {
                        image: modern12,
                        name: "Bonneville",
                        sub: "Raised Panel",
                        type: "Textured",
                      },
                    ].map((item, index) => (
                      <div key={index} className=" rounded-lg overflow-hidden">
                        {/* Image Container */}
                        <div className="relative w-full h-[400px] ">
                          <Image
                            src={item.image}
                            alt={`New 2025 ${item.name}`}
                            fill
                            className="object-contain pt-4 pb-2"
                          />
                        </div>

                        {/* Label */}
                        <div className="px-4 flex items-center flex-col">
                          <p className="text-black text-sm font-medium text-center">
                            MDC- {item.name}
                          </p>
                          {/* <p>{item.sub}</p>
                          <p>{item.type}</p> */}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Wood Veneer Door Collection Image Section */}
                <div id="wood-veneer" className="mt-[25px] md:mt-16 space-y-6 scroll-mt-24">
                  <h2 className="text-[28px] font-[500] text-black">
                    Wood Veneer Door Collection
                  </h2>

                  <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px]  overflow-hidden shadow-lg">
                    <Image
                      src={kitchen}
                      alt="Wood Veneer Door Collection - Modern Kitchen Interior"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Wood Veneer Door Collection Content */}
                <div className="mt-8 space-y-6">
                  {/* Introductory Paragraph */}
                  <p className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                    The natural wood grain patterns in wood veneer doors create
                    unique, one-of-a-kind designs at a value price point. Wood
                    veneer flush doors offer exceptional versatility for any
                    project—commercial, hospitality, institutional, or
                    residential.
                  </p>

                  {/* Key Features */}
                  <div className="space-y-3 mt-6">
                    <h3 className="text-[20px] font-[500] text-black">
                      Key Features:
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          <strong>
                            Residential and Architectural Grade Hardwood
                            veneers:
                          </strong>{" "}
                          Indicates the quality and application of the veneers.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          High quality wood veneer doors provide the warmth and
                          beauty of natural wood
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Plain Sliced, Quarter or Rift cut, producing a narrow
                          stripped pattern or natural Rotary-cut showcasing the
                          unique grain patterns of natural wood
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Popular species for both, commercial and residential
                          applications
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Wide top and bottom rails allow trimming of up to
                          1&quot; on each end
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Available 1-3/8&quot; and 1-3/4&quot; thick and
                          6&apos;8&quot;, 7&apos;0&quot; &amp; 8&apos;0&quot; in
                          passage and bifold door sizes
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Custom sizes available
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Custom factory machining
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Optional ClearLine Factory Finish is an affordable,
                          state of the art, ultra-violet cured clear coat finish
                          (no VOCs released in the home)
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          Due to the nature of real wood, each door surface will
                          vary in woodgrain patterns, color and appearance,
                          showcasing the beauty of real wood.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          20-minute fire ratings available
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-500 text-xl font-bold ">
                          •
                        </span>
                        <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                          STC sound rated doors
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
                  {[
               
               { image: playwood1, name: "Natural Birch 01", sub: "" },
               { image: playwood2, name: "Fir", sub: "" },
               { image: playwood3, name: "White Oak 01", sub: "" },
               { image: playwood4, name: "White Oak 02", sub: "" },
               { image: playwood5, name: "Red Oak", sub: "" },
               { image: playwood6, name: "Cherry", sub: "" },
               { image: playwood7, name: "Sapele", sub: "" },
               { image: playwood8, name: "African Mahogany", sub: "" },
               { image: playwood9, name: "Walnut", sub: "" },
               { image: playwood10, name: "White Maple", sub: "" },
               { image: playwood11, name: "Uniform Light Birch", sub: "" },
               { image: playwood12, name: "Natural Birch 02", sub: "" },
                  ].map((item, index) => (
                    <div key={index} className=" rounded-lg overflow-hidden">
                      {/* Image Container */}
                      <div className="relative w-full h-[400px] ">
                        <Image
                          src={item.image}
                          alt={`New 2025 ${item.name}`}
                          fill
                          className="object-contain p-4"
                        />
                      </div>

                      {/* Label */}
                      <div className="px-4 py-3">
                        <p className="text-black text-sm font-medium text-center">
                      WV-{item.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Prefinished Door Collection Image Section */}
                <div id="prefinished" className="mt-[25px] md:mt-16 space-y-6 scroll-mt-24">
                  <h2 className="text-[28px] font-[500] text-black">
                    Prefinished Door Collection
                  </h2>

                  <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden shadow-lg">
                    <Image
                      src={Kitchenwoodveneer}
                      alt="Prefinished Door Collection - Modern Kitchen Interior"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Prefinished Door Collection Content */}
                <div className="mt-8 space-y-6">
                  <div className="space-y-6">
                    {/* Heading */}
                    <h3 className="text-[20px] font-bold text-black">
                      Durable and Economical.
                    </h3>

                    {/* Introductory Paragraphs */}
                    <p className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                      Prefinished flush doors are ready to install with a
                      factory applied, uniform finish that makes them easy to
                      maintain.
                    </p>
                    <p className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                      A variety of textures and finishes cover the color
                      spectrum and offer options from light to dark in smooth,
                      textured and traditional embossed surfaces.
                    </p>
                    <p className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                      Unfinished and primed doors are also available (not
                      shown).
                    </p>

                    {/* Key Features */}
                    <div className="space-y-3 mt-6">
                      <h3 className="text-[20px] font-[500] text-black">
                        Key Features:
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-3">
                          <span className="text-gray-500 text-xl font-bold ">
                            •
                          </span>
                          <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                            Prefinished doors offer great value at an affordable
                            price.
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-gray-500 text-xl font-bold ">
                            •
                          </span>
                          <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                            Durable and stable
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-gray-500 text-xl font-bold ">
                            •
                          </span>
                          <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                            Arrive ready to install
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-gray-500 text-xl font-bold ">
                            •
                          </span>
                          <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                            Professionally applied, uniform finish
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-gray-500 text-xl font-bold ">
                            •
                          </span>
                          <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                            No maintenance
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-gray-500 text-xl font-bold ">
                            •
                          </span>
                          <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                            A variety of finishes
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-gray-500 text-xl font-bold ">
                            •
                          </span>
                          <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                            Available in smooth and traditional embossed and
                            textured surfaces
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-gray-500 text-xl font-bold ">
                            •
                          </span>
                          <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                            Rift Cut textures in Coffee, Slate, Medium Walnut,
                            and Teak
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-gray-500 text-xl font-bold ">
                            •
                          </span>
                          <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                            Unfinished and prime coated also available
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-gray-500 text-xl font-bold ">
                            •
                          </span>
                          <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                            All doors are available with hollow or solid core
                            construction and matching bifolds
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-gray-500 text-xl font-bold ">
                            •
                          </span>
                          <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                            1-3/8&quot; and 1-3/4&quot; thick
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-gray-500 text-xl font-bold ">
                            •
                          </span>
                          <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                            Fire ratings available
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-gray-500 text-xl font-bold ">
                            •
                          </span>
                          <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                            STC sound rated doors
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 ">
                  {[
                    {
                      image: PrefinishedRiftCut,
                      name: "Rift Cut Coffee Textured",

                      sub: "Rift Cut",
                    },
                    {
                      image: PrefinishedRiftCut1,
                      name: "Rift Cut Slate Textured",

                      sub: "Rift Cut (1)",
                    },
                    {
                      image: PrefinishedRiftCut2,
                      name: "Rift Cut Medium Walnut Textured",
                      sub: "Rift Cut (2)",
                    },
                    {
                      image: PrefinishedRiftCutTeak,
                      name: "Rift Cut Teak Textured",
                      sub: "Rift Cut Teak",
                    },
                    {
                      image: PrefinishedEmbossed,
                      name: "Rift Cut Coffee Embossed",
                      sub: "Embossed",
                    },
                    {
                      image: PrefinishedEmbossed1,
                      name: "Rift Cut Slate Embossed",
                      sub: "Embossed (1)",
                    },
                    {
                      image: PrefinishedEmbossed2,
                      name: "Rift Cut Medium Walnut Embossed",
                      sub: "Embossed (2)",
                    },
                    {
                      image: PrefinishedSmooth,
                      name: "Newport Cherry Smooth",

                      sub: "Smooth",
                    },
                    {
                      image: PrefinishedSmooth1,
                      name: "Western Hemlock Smooth",
                      sub: "Smooth (1)",
                    },
                    {
                      image: PrefinishedSmooth2,
                      name: "Coastal Hemlock Smooth",
                      sub: "Smooth (2)",
                    },
                    {
                      image: PrefinishedSmooth3,
                      name: "Alpine Oak Smooth",
                      sub: "Smooth (3)",
                    },
                    {
                      image: PrefinishedSmooth4,
                      name: "Albany Maple Smooth",
                      sub: "Smooth (4)",
                    },
                    { image: PrimedSmooth, name: "Crystal White Embossed", sub: "Smooth" },
                    {
                      image: PrimedTexturedHardboardSlab,
                      name: "Primed Embossed",

                      sub: "Textured Hardboard Slab",
                    },
                  ].map((item, index) => (
                    <div key={index} className=" rounded-lg overflow-hidden">
                      {/* Image Container */}
                      <div className="relative w-full h-[400px] ">
                        <Image
                          src={item.image}
                          alt={`New 2025 ${item.name}`}
                          fill
                          className="object-contain p-4"
                        />
                      </div>

                      {/* Label */}
                      <div className="px-4 py-3">
                        <p className="text-black text-sm font-medium text-center">
                           {item.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Lynden Ventilated Doors Image Section */}
                <div
                  id="lynden-ventilated-door"
                  className="mt-[25px] md:mt-16 space-y-6 scroll-mt-24"
                >
                  <h2 className="text-[36px] font-[500] text-black">
                    Lynden Ventilated Doors
                  </h2>

                  <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden shadow-lg">
                    <Image
                      src={Bathroom}
                      alt="Lynden Ventilated Doors - Modern Bathroom Interior"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Lynden Ventilated Doors Content */}
                <div className="mt-8 space-y-8">
                  <div className="space-y-6">
                    {/* Main Title */}
                    <div className="space-y-4">
                      <h3 className="text-[20px] font-bold text-[#FF6E4A] uppercase tracking-wide">
                        CREATE A HEALTHY HOME
                      </h3>
                      <p className="text-[24px] md:text-[28px] font-bold text-black leading-tight">
                        Air quality is an important component of healthy living
                        and essential to a comfortable home environment.
                      </p>
                    </div>

                    {/* Introductory Paragraph */}
                    <p className="text-[#666666]  text-[16px] leading-[26px]  font-light ">
                      Air circulation in living spaces helps reduce pollutants
                      like carbon dioxide (CO2) and volatile organic compounds
                      (VOCs), which can lead to respiratory issues, poor sleep,
                      and breathing disorders. Promoting air circulation helps
                      create healthier spaces with Lynden Ventilated Doors.
                    </p>

                    {/* Sound Privacy Section */}
                    <div className="space-y-3">
                      <h3 className="text-[16px] font-[500] text-[#666666]">
                        Sound Privacy
                      </h3>
                      <p className="text-[#666666]  text-[16px] leading-[26px]  font-light ">
                        Integrated resort construction, acoustic baffles and a
                        tighter undercut provide the sound privacy of a solid
                        core door.
                      </p>
                    </div>

                    {/* Design Flexibility Section */}
                    <div className="space-y-3">
                      <h3 className="text-[16px] font-[500] text-[#666666]">
                        Design Flexibility
                      </h3>
                      <p className="text-[#666666]  text-[16px] leading-[26px]  font-light ">
                        Create airflow pathways without the complexity of
                        modifying ceilings and walls to accept ducting, vents
                        and grilles. Save installation and material cost.
                      </p>
                    </div>

                    {/* Avoid Undercutting Section */}
                    <div className="space-y-4">
                      <h3 className="text-[16px] font-[500] text-[#666666]">
                        Avoid undercutting doors to provide airflow
                      </h3>
                      <p className="text-[#666666]  text-[16px] leading-[26px]  font-light ">
                        Undercutting doors for airflow is unsightly, negatively
                        impacts sound privacy, and may not even provide
                        sufficient airflow.
                      </p>

                      {/* Key Features */}
                      <div className="space-y-3 mt-6">
                        <h4 className="text-[20px] font-[500] text-black">
                          Benefits and Features:
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-3">
                            <span className="text-gray-500 text-xl font-bold ">
                              •
                            </span>
                            <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                              Ventilated doors are suitable for commercial
                              spaces, single and multifamily residential,
                              hospitality, schools and healthcare facilities.
                            </span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-gray-500 text-xl font-bold ">
                              •
                            </span>
                            <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                              The Lynden Ventilated door reduces the need for
                              ducting, vents and grilles for today&apos;s
                              demanding building designs.
                            </span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-gray-500 text-xl font-bold ">
                              •
                            </span>
                            <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                              Attractive, modern design.
                            </span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-gray-500 text-xl font-bold ">
                              •
                            </span>
                            <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                              Provides ventilation across enclosed spaces to
                              balance and alleviate temperature and pressure
                              buildup.
                            </span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-gray-500 text-xl font-bold ">
                              •
                            </span>
                            <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                              Creates airflow pathways without the complexity of
                              modifying doors, ceilings and walls to accept
                              ducting, vents and grilles.
                            </span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-gray-500 text-xl font-bold ">
                              •
                            </span>
                            <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                              Available up to 4&apos;0&quot; in width and
                              8&apos;0&quot; in height.
                            </span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-gray-500 text-xl font-bold ">
                              •
                            </span>
                            <span className="text-[#666666]  text-[16px] leading-[26px]  font-light">
                              Lynden Ventilated is available in a variety of
                              paint grade options, factory finish and veneer.
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Applications Section */}
                <div className="mt-12 space-y-6">
                  <h3 className="text-[22px] font-[500] text-gray-600">
                    Applications
                  </h3>

                  <div className="grid grid-cols-1 gap-1 md:gap-5">
                    {/* First Group */}
                    <div className="space-y-3">
                      <ul className="space-y-2 text-gray-600">
                        <li className="text-base">Laundry + Linen</li>
                        <li className="text-base">Bedrooms</li>
                        <li className="text-base">Washrooms</li>
                        <li className="text-base">Living Rooms + Den</li>
                        <li className="text-base">Home office</li>
                      </ul>
                    </div>

                    {/* Second Group */}
                    <div className="space-y-3">
                      <ul className="space-y-2 text-gray-600">
                        <li className="text-base">Kitchen + Pantry</li>
                        <li className="text-base">Home theatre</li>
                        <li className="text-base">Mechanical + equipment</li>
                        <li className="text-base">Closets</li>
                        <li className="text-base">Mudroom</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Interior Design Gallery */}
                <div className="mt-16 space-y-6">
                  <h2 className="text-[28px] font-[500] text-black">
                    Interior Design Gallery
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left Side - Single Image */}
                    <div className="relative w-full  rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src={footermainaImage5}
                        alt="Modern Office Space"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Right Side - Four Images */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative w-full h-[200px] md:h-[250px] lg:h-[300px] rounded-lg overflow-hidden shadow-lg">
                        <Image
                          src={footermainaImage2}
                          alt="Modern Kitchen with Island"
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="relative w-full h-[200px] md:h-[250px] lg:h-[300px] rounded-lg overflow-hidden shadow-lg">
                        <Image
                          src={footermainaImage3}
                          alt="Integrated Kitchen Storage"
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="relative w-full h-[200px] md:h-[250px] lg:h-[300px] rounded-lg overflow-hidden shadow-lg">
                        <Image
                          src={footermainaImage4}
                          alt="Modern Floating Staircase"
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="relative w-full h-[200px] md:h-[250px] lg:h-[300px] rounded-lg overflow-hidden shadow-lg">
                        <Image
                          src={footermainaImage1}
                          alt="Modern Interior Door"
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterBanner />

      <Footer />
    </>
  );
};

export default LyndenDoorPage;
