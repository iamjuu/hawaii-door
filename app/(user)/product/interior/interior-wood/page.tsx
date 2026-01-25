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

  // Modal state for door preview
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDoorIndex, setCurrentDoorIndex] = useState(0);
  const [currentDoorGroup, setCurrentDoorGroup] = useState<Door[]>([]);

  useEffect(() => {
    const fetchDoors = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products?category=interior&limit=200');
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

  // Handle door image click - open modal with that door's group
  const handleDoorClick = (door: Door, doorType: string) => {
    const doorsInType = doors.filter((d) => d.doorType === doorType);
    const doorIndex = doorsInType.findIndex((d) => d._id === door._id);
    setCurrentDoorGroup(doorsInType);
    setCurrentDoorIndex(doorIndex >= 0 ? doorIndex : 0);
    setIsModalOpen(true);
  };

  // Navigate to previous door in the same group
  const handlePrev = () => {
    setCurrentDoorIndex((prev) => (prev > 0 ? prev - 1 : currentDoorGroup.length - 1));
  };

  // Navigate to next door in the same group
  const handleNext = () => {
    setCurrentDoorIndex((prev) => (prev < currentDoorGroup.length - 1 ? prev + 1 : 0));
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (!isModalOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentDoorIndex((prev) => (prev > 0 ? prev - 1 : currentDoorGroup.length - 1));
      }
      if (e.key === 'ArrowRight') {
        setCurrentDoorIndex((prev) => (prev < currentDoorGroup.length - 1 ? prev + 1 : 0));
      }
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, currentDoorGroup.length]);

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

      {/* MOBILE FILTER BUTTON - STICKY */}
      <button
        onClick={() => setOpenFilter(true)}
        className="lg:hidden fixed top-[80px] left-6 z-30 flex items-center gap-2 border bg-[#b7d7a8] border-gray-300 rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#a8c798] transition-colors shadow-lg"
      >
        {/* FILTER ICON (SVG – no library) */}
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 5h12M5 9h8M7 13h4" />
        </svg>
        Filter
      </button>

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
            <div className="border border-gray-200 rounded-lg p-6 h-full lg:sticky lg:top-[100px] lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto">
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
                "Primed Interior Panel Doors",
                "Primed Bifold Doors",
                "Louver Doors and Bifold Doors",
                "Interior Barn Doors",
                "Interior French Doors",
                "Primed Interior French Doors",
                "20-Minute Fire Doors",
                "20-Minute Fire Doors Primed"
              ].map((item, i) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setOpenFilter(false)}
                  className="block py-3 text-gray-700 hover:text-[#FF6E4A] border-b border-gray-200 last:border-b-0"
                >
                  {item}
                </a>
              ))}
            </div>
          </aside>

          {/* CONTENT */}
          <div className="flex-1">
            {loading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6E4A]"></div>
              </div>
            )}
            {error && <p className="text-red-600">{error}</p>}
            
            {!loading && !error && (
              <>
                {/* Overview Section */}
                <section id="overview" className="mb-16 scroll-mt-24">
                  <h2 className="text-2xl font-semibold text-black mb-6">Overview</h2>
                  <p className="text-gray-700 mb-6">
                    Browse our collection of interior wood doors organized by type. Each door is crafted with precision and quality materials.
                  </p>
                </section>

                {/* Group doors by doorType */}
                {[
                  "Interior Panel Doors",
                  "Bifold Doors",
                  "Primed Interior Panel Doors",
                  "Primed Bifold Doors",
                  "Louver Doors and Bifold Doors",
                  "Interior Barn Doors",
                  "Interior French Doors",
                  "Primed Interior French Doors",
                  "20-Minute Fire Doors",
                  "20-Minute Fire Doors Primed"
                ].map((doorType) => {
                  const doorsInType = doors.filter((door) => door.doorType === doorType);
                  if (doorsInType.length === 0) return null;

                  const sectionId = doorType.toLowerCase().replace(/\s+/g, "-");
                  
                  return (
                    <section key={doorType} id={sectionId} className="mb-16 scroll-mt-24">
                      <h2 className="text-2xl font-semibold text-black mb-6">{doorType}</h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {doorsInType.map((door) => (
                          <div key={door._id} className="relative group cursor-pointer" onClick={() => handleDoorClick(door, doorType)}>
                            {door.imageUrl && door.imageUrl[0] && (
                              <div className="w-full h-48 rounded-lg  border-gray-200 group-hover:border-[#FF6E4A] transition-colors overflow-hidden flex items-center justify-center ">
                                <img
                                  src={door.imageUrl[0]}
                                  alt={door.name}
                                  className="w-full h-full object-contain transition-transform group-hover:scale-105"
                                />
                              </div>
                            )}
                            <div className="mt-2">
                              <p className="text-sm font-medium text-black truncate text-center" >{door.name}</p>
                              {door.description && (
                                <p className="text-xs text-gray-600 line-clamp-2 mt-1">{door.description}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Door Preview Modal */}
      {isModalOpen && currentDoorGroup.length > 0 && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          {/* Modal Container */}
          <div 
            className="relative w-full h-full flex items-center justify-center p-4 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="fixed top-4 right-4 z-20 text-white hover:text-[#FF6E4A] transition-colors bg-black/60 rounded-full p-3 hover:bg-black/80"
              aria-label="Close"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Previous Button */}
            {currentDoorGroup.length > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-2 md:left-8 z-20 text-white hover:text-[#FF6E4A] transition-all bg-black/60 rounded-full p-2 md:p-3 hover:bg-black/80 hover:scale-110"
                aria-label="Previous"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Next Button */}
            {currentDoorGroup.length > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-2 md:right-8 z-20 text-white hover:text-[#FF6E4A] transition-all bg-black/60 rounded-full p-2 md:p-3 hover:bg-black/80 hover:scale-110"
                aria-label="Next"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Image Container */}
            <div className="flex flex-col items-center justify-center w-full h-full max-w-7xl">
              {currentDoorGroup[currentDoorIndex]?.imageUrl?.[0] && (
                <>
                  <img
                    key={currentDoorIndex}
                    src={currentDoorGroup[currentDoorIndex].imageUrl[0]}
                    alt={currentDoorGroup[currentDoorIndex].name}
                    className="w-auto h-auto max-w-[75%] max-h-[55vh] md:max-w-[70%] md:max-h-[65vh] lg:max-w-[65%] lg:max-h-[70vh] object-contain"
                  />
                  
                  {/* Door Info */}
                  <div className="mt-4 md:mt-6 text-center text-white">
                    <p className="text-base md:text-lg lg:text-xl font-semibold">{currentDoorGroup[currentDoorIndex]?.name}</p>
                    <p className="text-xs md:text-sm text-gray-300 mt-1 md:mt-2">
                      {currentDoorIndex + 1} / {currentDoorGroup.length}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

export default InteriorWoodPage
