

"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../../public/assets/images/landing/logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: "PRODUCTS", path: "/product" },
    { label: "GALLERY", path: "/gallery" },
    { label: "ABOUT", path: "/about" },
    // { label: "CAREER", path: "/career" },
    { label: "CONTACT", path: "/contact" },
  ];


  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-black  md:h-[80px]">
      <div className="px-6   md:px-15 flex h-full items-center justify-between ">

        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" aria-label="Go to home">
            <Image
              src={logo}
              alt="Logo"
              width={40}     // max width for larger screens
              height={40}    // max height for larger screens
              className="w-[20px] h-[30px] md:w-[40px] md:h-[50px]"
              priority
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-white font-medium font-roboto">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.path}
              className="transition-colors duration-300 hover:text-[#B6D78A]"
            >
              {item.label}
            </Link>
          ))}
        </nav>


        {/* Mobile Menu Icon */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-white text-3xl"
        >
          <HiMenu />
        </button>
      </div>

      {/* Mobile Slide Menu */}
      <div
        className={`
          fixed top-0 left-0 w-full bg-black text-white
          transition-transform duration-500 ease-in-out
          ${open ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        {/* Close Icon */}
        <div className="flex h-[70px] items-center justify-end px-5">
          <button onClick={() => setOpen(false)} className="text-3xl">
            <HiX />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col items-center gap-6 py-10 text-lg font-medium font-roboto">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.path}
              onClick={() => setOpen(false)}
              className="transition-colors duration-300 hover:text-[#B6D78A]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

      </div>
    </header>
  );
}
