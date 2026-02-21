"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Footer = () => {
  const [touchedLink, setTouchedLink] = useState<string | null>(null);
  const touchPendingLink = useRef<string | null>(null);
  const router = useRouter();

  const handleLinkTouch = (key: string) => {
    setTouchedLink(key);
    touchPendingLink.current = key;
  };

  const handleLinkClick = (e: React.MouseEvent, key: string, href: string) => {
    if (touchPendingLink.current === key) {
      e.preventDefault();
      touchPendingLink.current = null;
      setTimeout(() => {
        setTouchedLink(null);
        router.push(href);
      }, 400);
    }
  };
  return (
    <footer className="bg-black text-white py-12 px-6 md:px-12 lg:px-20">
      {/* Container */}
      <div className="w-full md:max-w-7xl md:mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          
          {/* Logo + Description */}
          <div className="flex flex-col space-y-4">
            <div className="relative w-48 h-24">
              <Image
                src="/assets/icon/hawaii-doors-horizontal-text-box-V2 1.svg"
                alt="Hawaii Western Doors Logo"
                fill
                className="object-contain object-left"
                priority
                // quality={90}
              />
            </div>

            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              The Island Door Company. Machined in Hawaii, crafted to fit,
              delivered to every island.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 md:justify-between">
            
            {/* Explore Doors */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Explore Doors</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/build" onTouchStart={() => handleLinkTouch("build")} onClick={(e) => handleLinkClick(e, "build", "/build")} className={`transition-colors text-sm ${touchedLink === "build" ? "text-white" : "text-gray-300 hover:text-white"}`}>
                    Find a Door
                  </a>
                </li>
                <li>
                  <a href="/career" onTouchStart={() => handleLinkTouch("career")} onClick={(e) => handleLinkClick(e, "career", "/career")} className={`transition-colors text-sm ${touchedLink === "career" ? "text-white" : "text-gray-300 hover:text-white"}`}>
                    Career
                  </a>
                </li>
                <li>
                  <a href="/gallery" onTouchStart={() => handleLinkTouch("gallery")} onClick={(e) => handleLinkClick(e, "gallery", "/gallery")} className={`transition-colors text-sm ${touchedLink === "gallery" ? "text-white" : "text-gray-300 hover:text-white"}`}>
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="/contact#faq" onTouchStart={() => handleLinkTouch("faq")} onClick={(e) => handleLinkClick(e, "faq", "/contact#faq")} className={`transition-colors text-sm ${touchedLink === "faq" ? "text-white" : "text-gray-300 hover:text-white"}`}>
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Products</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/product/interior" onTouchStart={() => handleLinkTouch("interior")} onClick={(e) => handleLinkClick(e, "interior", "/product/interior")} className={`transition-colors text-sm ${touchedLink === "interior" ? "text-white" : "text-gray-300 hover:text-white"}`}>
                    Interior Doors
                  </a>
                </li>
                <li>
                  <a href="/product/interior/Lynden-Door" onTouchStart={() => handleLinkTouch("lynden")} onClick={(e) => handleLinkClick(e, "lynden", "/product/interior/Lynden-Door")} className={`transition-colors text-sm ${touchedLink === "lynden" ? "text-white" : "text-gray-300 hover:text-white"}`}>
                    Lynden Doors
                  </a>
                </li>
                <li>
                  <a href="/product/interior/interior-wood" onTouchStart={() => handleLinkTouch("interior-wood")} onClick={(e) => handleLinkClick(e, "interior-wood", "/product/interior/interior-wood")} className={`transition-colors text-sm ${touchedLink === "interior-wood" ? "text-white" : "text-gray-300 hover:text-white"}`}>
                    Interior Wood
                  </a>
                </li>
                <li>
                  <a href="/product/exterior" onTouchStart={() => handleLinkTouch("exterior")} onClick={(e) => handleLinkClick(e, "exterior", "/product/exterior")} className={`transition-colors text-sm ${touchedLink === "exterior" ? "text-white" : "text-gray-300 hover:text-white"}`}>
                    Exterior Doors
                  </a>
                </li>
                <li>
                  <a href="/product/exterior/exterior-wood" onTouchStart={() => handleLinkTouch("exterior-wood")} onClick={(e) => handleLinkClick(e, "exterior-wood", "/product/exterior/exterior-wood")} className={`transition-colors text-sm ${touchedLink === "exterior-wood" ? "text-white" : "text-gray-300 hover:text-white"}`}>
                    Exterior Wood
                  </a>
                </li>
               
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Hawaii Western Doors. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
