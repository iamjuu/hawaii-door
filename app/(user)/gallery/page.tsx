"use client";
import React, { useState, useEffect } from 'react'
import Navbar from '@/components/user/Navbar'
import Footer from '@/components/user/Footer'
import Image from 'next/image'
import { HiMenu } from 'react-icons/hi'

type Door = {
  id: string
  image: string
  product: string
  type: string
  glass: string
}

type ApiProduct = {
  _id?: string
  id?: string
  imageUrl?: string[]
  category?: string
  type?: "normal" | "glass" | "interior" | "exterior"
  name?: string
  price?: number
}

type ApiDoor = {
  _id?: string
  id?: string
  imageUrl?: string[]
  image?: string
  category?: string
  type?: string
  doorType?: string
}

const GalleryPage = () => {
  const [selectedProduct, setSelectedProduct] = useState('All')
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedGlass, setSelectedGlass] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [alldoors, setAllDoors] = useState<Door[]>([])

  // Helper function to normalize image URL
  const getImageUrl = (imageUrl: string): string => {
    if (!imageUrl) return ""
    if (imageUrl.startsWith("data:image")) return imageUrl
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) return imageUrl
    return `data:image/jpeg;base64,${imageUrl}`
  }

  // Helper function to capitalize first letter
  const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/products?limit=100')
        console.log("response", response)
        const result = await response.json()
        
        if (result.success && result.data) {
          // Transform API data to match gallery format
          const transformedDoors: Door[] = result.data.map((product: ApiProduct) => {
            // Get first image - handle empty strings in array
            const firstImage = product.imageUrl?.[0]?.trim() || ""
            const category = product.category || ""
            const productType = (product.type || "normal").toLowerCase().trim()
            
            // Map category to type (single -> Single, etc.)
            // For interior/exterior types, category might be empty, so use a default
            const doorType = category ? capitalize(category) : (productType === "interior" || productType === "exterior" ? "" : "Normal")
            
            // Map type to glass field (glass -> With Glass, normal -> Without Glass)
            // For interior/exterior, don't show glass info
            const glass = productType === "glass" ? "With Glass" : productType === "interior" || productType === "exterior" ? "" : "Without Glass"
            
            // Map product type to Interior/Exterior category - STRICT MATCHING
            // Only assign Interior/Exterior to products that actually have those types
            let productCategory = "Other" // Default for normal/glass types
            if (productType === "interior") {
              productCategory = "Interior"
            } else if (productType === "exterior") {
              productCategory = "Exterior"
            } else {
              // For normal and glass types, use "Other" so they don't show in Interior/Exterior filters
              productCategory = "Other"
            }
            
            const imageUrl = getImageUrl(firstImage)
            
            // Debug logging for all products to see what's being assigned
            console.log(`Product mapping:`, {
              id: product._id?.substring(0, 8),
              rawType: product.type,
              productType: productType,
              assignedCategory: productCategory,
              hasImage: !!firstImage && firstImage !== "",
              imageUrlLength: imageUrl.length
            })
            
            return {
              id: product._id || product.id,
              image: imageUrl,
              product: productCategory,
              type: doorType,
              glass: glass
            }
          }).filter((door: Door) => {
            // Filter out doors without valid images (empty string or falsy)
            const hasValidImage = door.image && door.image.trim() !== "" && door.image !== "data:image/jpeg;base64,"
            return hasValidImage
          })
        
          console.log("Total doors after transform:", transformedDoors.length)
          console.log("Interior doors count:", transformedDoors.filter(d => d.product === "Interior").length)
          console.log("Exterior doors count:", transformedDoors.filter(d => d.product === "Exterior").length)
          console.log("Other doors count:", transformedDoors.filter(d => d.product === "Other").length)
          console.log("All products by category:", transformedDoors.reduce((acc, d) => {
            acc[d.product] = (acc[d.product] || 0) + 1
            return acc
          }, {} as Record<string, number>))
          setAllDoors(transformedDoors)
        } else {
          setError("Failed to load products")
        }
      } catch (err) {
        setError("Error loading products")
        console.error("Error fetching products:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()

  }, [])


  // Filter doors based on selected filters
  const filteredDoors = alldoors.filter(door => {
    // Filter by product category (Interior/Exterior/All)
    if (selectedProduct !== 'All') {
      // STRICT check - only show products that match exactly
      const productMatches = door.product === selectedProduct
      if (!productMatches) {
        return false
      }
    }
    // Filter by door type (Single, Double, etc.)
    if (selectedTypes.length > 0 && !selectedTypes.includes(door.type)) {
      return false
    }
    // Filter by glass (With Glass/Without Glass)
    if (selectedGlass.length > 0 && !selectedGlass.includes(door.glass)) {
      return false
    }
    return true
  })
  
  // Debug logging
  if (selectedProduct === "Interior" || selectedProduct === "Exterior") {
    console.log(`=== Filtering for ${selectedProduct} ===`)
    console.log("- All doors:", alldoors.length)
    console.log(`- ${selectedProduct} doors in all:`, alldoors.filter(d => d.product === selectedProduct).length)
    console.log("- Other category doors:", alldoors.filter(d => d.product !== selectedProduct && d.product !== "All").length)
    console.log("- Filtered doors:", filteredDoors.length)
    console.log("- Selected types:", selectedTypes)
    console.log("- Selected glass:", selectedGlass)
    console.log("- Product category breakdown:", alldoors.reduce((acc, d) => {
      acc[d.product] = (acc[d.product] || 0) + 1
      return acc
    }, {} as Record<string, number>))
    console.log("- First 10 doors:", alldoors.slice(0, 10).map(d => ({ 
      id: d.id?.substring(0, 8), 
      product: d.product, 
      type: d.type,
      matches: d.product === selectedProduct
    })))
  }

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
              <aside className="w-full lg:w-[280px] bg-white border border-gray-200 rounded-lg p-6 h-fit lg:sticky lg:top-[100px]">
                <div className="flex items-center gap-3 mb-6">
                  <HiMenu className="w-5 h-5 text-gray-600" />
                  <h2 className="text-lg font-semibold text-black">Filters</h2>
                </div>

                {/* Product Filter */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-black mb-4">Product</h3>
                  <div className="flex gap-2">
                    {['All', 'Interior', 'Exterior'].map((product) => (
                      <button
                        key={product}
                        onClick={() => setSelectedProduct(product)}
                        className={`w-[80px] text-center px-3 py-2 rounded-md transition-colors ${
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
                        className="flex items-center justify-between cursor-pointer text-gray-700 hover:text-black"
                      >
                        <span className="text-[15px]">{type}</span>
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
                          className="custom-checkbox"
                        />
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
                        className="flex items-center justify-between cursor-pointer text-gray-700 hover:text-black"
                      >
                        <span className="text-[15px]">{glass}</span>
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
                          className="custom-checkbox"
                        />
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
                {loading ? (
                  <p className="text-gray-600 mb-6">Loading doors...</p>
                ) : error ? (
                  <p className="text-red-600 mb-6">{error}</p>
                ) : (
                  <>
                    <p className="text-gray-600 mb-6">
                      Showing {filteredDoors.length} doors
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      {filteredDoors.length === 0 ? (
                        <p className="text-gray-500 col-span-2">No doors found matching the filters.</p>
                      ) : (
                        filteredDoors.map((door) => (
                          <div
                            key={door.id}
                            className="relative w-full aspect-4/3 rounded-lg overflow-hidden group cursor-pointer"
                          >
                            {door.image.startsWith("data:") ? (
                              <Image
                                src={door.image}
                                alt={`Door ${door.id}`}
                                fill
                                unoptimized
                                className="object-contain group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <Image
                                src={door.image}
                                alt={`Door ${door.id}`}
                                fill
                                className="object-contain group-hover:scale-105 transition-transform duration-300"
                              />
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </>
                )}
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
