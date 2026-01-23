"use client";
import { useEffect, useState } from "react";
import { ParallaxScroll } from "../ui/parallax-scroll";



export function ParallaxScrollSecondDemo() {

  const [selectedProduct, setSelectedProduct] = useState('All')
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedGlass, setSelectedGlass] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [alldoors, setAllDoors] = useState<Door[]>([])



  // state
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


  return <ParallaxScroll images={alldoors} />;
}

const images = [
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  "https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  "https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2640&q=80",
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
];
