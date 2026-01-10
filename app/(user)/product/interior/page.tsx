import React from 'react'
import Navbar from '@/components/user/Navbar'
import Footer from '@/components/user/Footer'

const InteriorPage = () => {
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-white pt-[70px] md:pt-[80px]">
        <div>
          <h1>
            Interior Products
          </h1>
        </div>
      </main>
      
      <Footer />
    </>
  )
}

export default InteriorPage

