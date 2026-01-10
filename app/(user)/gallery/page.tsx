"use client";
import React, { useState } from 'react'
import Navbar from '@/components/user/Navbar'
import Footer from '@/components/user/Footer'
import Image from 'next/image'
import { Door1, Door2, Door3, Door4, Door5, Door6 } from '@/public/assets'
import { HiMenu } from 'react-icons/hi'

const GalleryPage = () => {
  const [selectedProduct, setSelectedProduct] = useState('All')
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedGlass, setSelectedGlass] = useState<string[]>([])

  // Mock data - 13 doors total
  const allDoors = [
    { id: 1, image: Door1, product: 'Interior', type: 'Single', glass: 'Without Glass' },
    { id: 2, image: Door2, product: 'Exterior', type: 'Double', glass: 'With Glass' },
    { id: 3, image: Door3, product: 'Interior', type: 'Single', glass: 'With Glass' },
    { id: 4, image: Door4, product: 'Exterior', type: 'Barn', glass: 'Without Glass' },
    { id: 5, image: Door5, product: 'Interior', type: 'Dutch', glass: 'With Glass' },
    { id: 6, image: Door6, product: 'Exterior', type: 'Single', glass: 'With Glass' },
    { id: 7, image: Door1, product: 'Interior', type: 'Double', glass: 'Without Glass' },
    { id: 8, image: Door2, product: 'Exterior', type: 'Single', glass: 'With Glass' },
    { id: 9, image: Door3, product: 'Interior', type: 'Barn', glass: 'Without Glass' },
    { id: 10, image: Door4, product: 'Exterior', type: 'Dutch', glass: 'With Glass' },
    { id: 11, image: Door5, product: 'Interior', type: 'Single', glass: 'With Glass' },
    { id: 12, image: Door6, product: 'Exterior', type: 'Double', glass: 'Without Glass' },
    { id: 13, image: Door1, product: 'Interior', type: 'Single', glass: 'Without Glass' },
  ]

  // Filter doors based on selected filters
  const filteredDoors = allDoors.filter(door => {
    if (selectedProduct !== 'All' && door.product !== selectedProduct) return false
    if (selectedTypes.length > 0 && !selectedTypes.includes(door.type)) return false
    if (selectedGlass.length > 0 && !selectedGlass.includes(door.glass)) return false
    return true
  })

  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  const handleGlassToggle = (glass: string) => {
    setSelectedGlass(prev => 
      prev.includes(glass) 
        ? prev.filter(g => g !== glass)
        : [...prev, glass]
    )
  }

  const clearAllFilters = () => {
    setSelectedProduct('All')
    setSelectedTypes([])
    setSelectedGlass([])
  }

  return (
    <>
      <Navbar />
      
      {/* Main Content */}
      <main className="min-h-screen bg-white pt-[70px] md:pt-[80px]">
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            {/* Headline */}
            <h1 className="text-[56px] font-semibold text-black mb-6 md:mb-8 leading-tight">
              Doors That Speak<br />
              <span className="">for Themselves</span>
            </h1>
            
            {/* Body Text */}
            <p className="text-[18px] font-normal text-gray-700 leading-relaxed max-w-2xl">
              See recent installs, machining projects, and custom builds across O&apos;ahu, Maui, Kaua&apos;i, and Hawai&apos;i Island. Every project tells the same story, precision, fit, and finish done right.
            </p>
          </div>
        </section>

        {/* Gallery Section with Filters */}
        <section className="px-6 md:px-12 lg:px-20 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Sidebar - Filters */}
              <aside className="w-full lg:w-[280px] bg-white border border-gray-200 rounded-lg p-6 h-fit">
                <div className="flex items-center gap-3 mb-6">
                  <HiMenu className="w-5 h-5 text-gray-600" />
                  <h2 className="text-lg font-semibold text-black">Filters</h2>
                </div>

                {/* Product Filter */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-black mb-4">Product</h3>
                  <div className="space-y-3">
                    {['All', 'Interior', 'Exterior'].map((product) => (
                      <button
                        key={product}
                        onClick={() => setSelectedProduct(product)}
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                          selectedProduct === product
                            ? 'bg-[#FF6E4A] text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {product}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Type Filter */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-black mb-4">Type</h3>
                  <div className="space-y-3">
                    {['All', 'Single', 'Double', 'Barn', 'Dutch'].map((type) => (
                      <label
                        key={type}
                        className="flex items-center gap-3 cursor-pointer text-gray-700 hover:text-black"
                      >
                        <input
                          type="checkbox"
                          checked={type === 'All' ? selectedTypes.length === 0 : selectedTypes.includes(type)}
                          onChange={() => {
                            if (type === 'All') {
                              setSelectedTypes([])
                            } else {
                              handleTypeToggle(type)
                            }
                          }}
                          className="w-4 h-4 text-[#FF6E4A] border-gray-300 rounded focus:ring-[#FF6E4A]"
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Glass Filter */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-black mb-4">Glass</h3>
                  <div className="space-y-3">
                    {['All', 'With Glass', 'Without Glass'].map((glass) => (
                      <label
                        key={glass}
                        className="flex items-center gap-3 cursor-pointer text-gray-700 hover:text-black"
                      >
                        <input
                          type="checkbox"
                          checked={glass === 'All' ? selectedGlass.length === 0 : selectedGlass.includes(glass)}
                          onChange={() => {
                            if (glass === 'All') {
                              setSelectedGlass([])
                            } else {
                              handleGlassToggle(glass)
                            }
                          }}
                          className="w-4 h-4 text-[#FF6E4A] border-gray-300 rounded focus:ring-[#FF6E4A]"
                        />
                        <span>{glass}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear All Filters Button */}
                <button
                  onClick={clearAllFilters}
                  className="w-full text-[#FF6E4A] text-sm font-medium hover:underline"
                >
                  Clear All Filters
                </button>
              </aside>

              {/* Right Side - Gallery Grid */}
              <div className="flex-1">
                <p className="text-gray-600 mb-6">
                  Showing {filteredDoors.length} doors
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredDoors.map((door) => (
                    <div
                      key={door.id}
                      className="relative w-full aspect-4/3 rounded-lg overflow-hidden group cursor-pointer"
                    >
                      <Image
                        src={door.image}
                        alt={`Door ${door.id}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
}

export default GalleryPage
