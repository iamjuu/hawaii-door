'use client'

import React, { useState, useEffect } from 'react'
import Navbar from '@/components/user/Navbar'
import Footer from '@/components/user/Footer'
import { ProductFootericoncheck, ProductFootericonstar } from '@/public/assets'
import HeroSection from '../../components/herosection'
import { FiFilter, FiX } from 'react-icons/fi'

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

const ExteriorWoodPage = () => {
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
        // Reduced limit to 100 to avoid MongoDB memory issues
        const response = await fetch('/api/products?category=exterior&limit=100');
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

  // AWS hero (removed): "https://hawaai-doors-bucket.s3.us-west-2.amazonaws.com/uploads/1769351030278-hero_wood-interior.webp"
  const bgImage = "/assets/product/exterior hero 4.svg"
  const contant = "Exterior Doors"
  const para =
    "Discover exterior doors; we offer a variety of door types, designs and styles. You are sure to find the perfect door for your project."

  const features = [
    {
      text: "Exterior doors as design features",
      iconType: ProductFootericoncheck
    },
    {
      text: "Styles that align with your space",
      iconType: ProductFootericonstar
    }
  ]

  return (
    <>
      <Navbar />

      <HeroSection
        contant={contant}
        bgImage={bgImage}
        para={para}
        features={features}
      />

      <main className="w-full bg-white py-10 sm:py-12 md:py-[50px]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[60px]">
          <div className="max-w-[1400px] 2xl:mx-auto">
            <section className="space-y-6">
              <h2 className="text-[23px] md:text-[32px] font-roboto font-[500] text-black leading-tight">
                In-Stock at Hawaii Western Door Products
              </h2>

              <p className="text-sm md:text-base font-roboto font-[400] text-[#3B3B3B] leading-relaxed">
                The following product offering is part of our stocking program. We reserve the right to make changes without notice. Please contact your Hawaii Western Door Products representative to verify availability, lead time, and for more information.
              </p>

              <p className="text-sm md:text-base font-roboto font-[400] text-[#3B3B3B] leading-relaxed">
                Please note that our doors are delivered unfinished. The product images shown below depict finished doors. Due to the natural variations in wood, each door will have a unique appearance, and the stainability of wood species may differ. We recommend consulting with a coatings expert for recommended finishing options and instructions.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* MOBILE FILTER BUTTON - STICKY */}
      <button
        onClick={() => setOpenFilter(true)}
        className="md:hidden fixed top-[80px] left-6 z-30 flex items-center gap-2 border bg-[#b7d7a8] border-gray-300 rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#a8c798] transition-colors shadow-lg"
      >
        <FiFilter className="text-lg" />
        Filter
      </button>

      {/* OVERLAY */}
      {openFilter && (
        <div
          onClick={() => setOpenFilter(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <main className="w-full bg-white py-10 sm:py-12 md:py-[50px]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[60px]">
          <div className="max-w-[1400px] 2xl:mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

            {/* LEFT SIDEBAR */}
            <aside
              className={`
                fixed lg:sticky top-0 lg:top-[100px] left-0 h-full lg:h-auto
                w-[280px] bg-white z-50 lg:z-auto
                transform transition-transform duration-300 ease-in-out
                ${openFilter ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0
                lg:self-start lg:max-h-[calc(100vh-120px)]
              `}
            >
              <div className="bg-white rounded-lg p-6 pl-2 lg:pl-0 h-full lg:h-auto lg:overflow-y-auto">

                {/* MOBILE HEADER */}
                <div className="flex items-center justify-between mb-6 md:hidden">
                  <h2 className="text-lg font-roboto font-[600] text-black">
                    Exterior Wood Doors
                  </h2>
                  <button onClick={() => setOpenFilter(false)} className="text-gray-600 hover:text-black">
                    <FiX className="text-xl" />
                  </button>
                </div>

                {/* DESKTOP HEADER */}
                <h2 className="text-xl font-roboto font-[600] text-black mb-6 hidden md:block">
                  Exterior Wood Doors
                </h2>

                <nav className="space-y-0">
                  {[
                    "Contemporary Collection",
                    "Craftsman Collection",
                    "Exterior French Doors",
                    "Waterbarrier",
                    "Entry Doors",
                    "Half Lite Doors",
                    "Exterior Panel Doors"
                  ].map((item, index) => (
                    <div key={item}>
                      <a
                        href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                        onClick={() => setOpenFilter(false)}
                        className="block py-3 text-sm font-roboto font-[400] text-gray-700 hover:text-[#FF6E4A] transition-colors"
                      >
                        {item}
                      </a>
                      {index < 6 && (
                        <div className="border-t border-gray-200"></div>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </aside>

            {/* RIGHT CONTENT */}
            <div className="flex-1 space-y-8">
              {loading && (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6E4A]"></div>
                </div>
              )}
              {error && <p className="text-red-600 text-sm md:text-base font-roboto">{error}</p>}
              
              {!loading && !error && (
                <>
                  {/* Group doors by doorType */}
                  {[
                    "Contemporary Collection",
                    "Craftsman Collection",
                    "Exterior French Doors",
                    "Waterbarrier",
                    "Entry Doors",
                    "Half Lite Doors",
                    "Exterior Panel Doors"
                  ].map((doorType) => {
                    const doorsInType = doors.filter((door) => door.doorType === doorType);
                    if (doorsInType.length === 0) return null;

                    const sectionId = doorType.toLowerCase().replace(/\s+/g, "-");
                    
                    return (
                      <section key={doorType} id={sectionId} className="mb-16 scroll-mt-24">
                        <h2 className="text-[20px] md:text-[28px] font-roboto font-[500] text-black mb-6 leading-tight">{doorType}</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3">
                          {doorsInType.map((door) => (
                            <div key={door._id} className="relative group cursor-pointer" onClick={() => handleDoorClick(door, doorType)}>
                              {door.imageUrl && door.imageUrl[0] && (
                                <div className="w-full h-48 rounded-lg group-hover:border-[#FF6E4A] transition-colors overflow-hidden flex items-center justify-center">
                                  <img
                                    src={door.imageUrl[0]}
                                    alt={door.name}
                                    className="w-full h-full object-contain transition-transform group-hover:scale-105"
                                  />
                                </div>
                              )}
                              <div className="mt-2">
                                <p className="text-sm font-roboto font-[500] text-black truncate text-center">{door.name}</p>
                                {door.description && (
                                  <p className="text-xs font-roboto font-[400] text-[#3B3B3B] line-clamp-2 mt-1 text-center">{door.description}</p>
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
                    <p className="text-base md:text-lg lg:text-xl font-roboto font-[600]">{currentDoorGroup[currentDoorIndex]?.name}</p>
                    <p className="text-xs md:text-sm font-roboto font-[400] text-gray-300 mt-1 md:mt-2">
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

export default ExteriorWoodPage
