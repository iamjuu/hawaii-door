"use client";

import React, { useState, useEffect } from 'react'
import Navbar from '@/components/user/Navbar'
import Footer from '@/components/user/Footer'
import { interiorDoor1, ProductFootericoncheck, ProductFootericonstar } from '@/public/assets';
import HeroSection from '../../components/herosection';
import Image from 'next/image';
import Heading from '@/app/(user)/home/components/header';

interface Door {
  _id: string;
  name: string;
  price: number;
  category: string;
  doorType: string;
  imageUrl?: string[];
  description?: string;
  inStock?: boolean;
}

const InteriorWoodPage = () => {
  const [doors, setDoors] = useState<Door[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    const fetchDoors = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/doors?category=interior&limit=100');
        const data = await response.json();

        if (data.success) {
          setDoors(data.data || []);
        } else {
          setError(data.message || 'Failed to fetch doors');
        }
      } catch (err) {
        setError('Error loading doors');
        console.error('Error fetching doors:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoors();
  }, []);

  const bgImage = "/assets/product/intertior/wood-interior.svg";
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

      {/* INTRO SECTION */}
      <section className="flex flex-col md:flex-row gap-12 px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="space-y-8 w-full md:w-1/2 pr-0 md:pr-8">
          <Heading
            heading="Unmatched Versatility with Interior Solid Wood Doors"
            subheading="Interior Solid Wood Doors provide the ultimate versatility in design, style, and size. Wood doors are available in a variety of wood species and glass options, allowing you to find the perfect door for your needs, whether it's a standard design or a custom, one-of-a-kind creation."
          />

          <div className="space-y-4">
            <h3 className="text-[22px] font-[500] text-black uppercase">
              KEY BENEFITS OF OUR WOOD DOORS:
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li><span className="font-bold">Diverse Styles:</span> Choose from a wide array of designs.</li>
              <li><span className="font-bold">Customizable Options:</span> Create a door that is truly your own.</li>
              <li><span className="font-bold">Quality Craftsmanship:</span> Superior durability and beauty.</li>
            </ul>
          </div>

          <Heading
            heading="DECORATIVE FRENCH DOORS"
            subheading="Add a touch of elegance to your home with decorative French doors, featuring premium glass options."
          />
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center">
          <Image   src={interiorDoor1} alt="Interior Door" className="w-full h-[600px] rounded-lg" />
        </div>
      </section>

      {/* STOCK INFO */}
      <main className="px-6 md:px-12 lg:px-20 pb-16 bg-white">
        <h2 className="text-[28px] font-[500] text-black mb-4">
          In-Stock at Hawaii Western Door Products
        </h2>
        <p className="text-[16px] font-[300] text-gray-700 mb-4">
          Product availability may change without notice. Contact your representative for details.
        </p>
        <p className="text-[16px] font-[300] text-gray-700">
          Doors are delivered unfinished. Wood grain and stainability may vary.
        </p>
      </main>

      {/* MOBILE FILTER BUTTON */}
      <div className="lg:hidden px-6 mb-6">
        <button
          onClick={() => setOpenFilter(true)}
          className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-black"
        >
          {/* FILTER ICON (SVG – no library) */}
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 5h12M5 9h8M7 13h4" />
          </svg>
          Filter
        </button>
      </div>

      {/* OVERLAY */}
      {openFilter && (
        <div
          onClick={() => setOpenFilter(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* MAIN CONTENT */}
      <main className="px-6 md:px-12 lg:px-20 py-16 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">

          {/* SIDEBAR */}
          <aside
            className={`
              fixed lg:static top-0 left-0 h-full lg:h-auto
              w-[280px] bg-white z-50 lg:z-auto
              transform transition-transform duration-300
              ${openFilter ? "translate-x-0" : "-translate-x-full"}
              lg:translate-x-0
            `}
          >
            <div className="border border-gray-200 rounded-lg p-6 h-full lg:sticky lg:top-[100px]">
              <div className="flex justify-between items-center mb-6 lg:hidden">
                <h2 className="font-semibold text-black">Interior Wood Doors</h2>
                <button onClick={() => setOpenFilter(false)}>✕</button>
              </div>

              <h2 className="text-xl font-semibold text-black mb-6 hidden lg:block">
                Interior Wood Doors
              </h2>

              {[
                "Overview",
                "Interior Panel Doors",
                "Bifold Doors",
                "Interior Barn Doors",
                "Interior French Doors"
              ].map((item, i) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setOpenFilter(false)}
                  className="block py-3 text-gray-700 hover:text-[#FF6E4A]"
                >
                  {item}
                </a>
              ))}
            </div>
          </aside>

          {/* CONTENT */}
          <div className="flex-1">
            {loading && <p>Loading doors...</p>}
            {error && <p className="text-red-600">{error}</p>}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default InteriorWoodPage
