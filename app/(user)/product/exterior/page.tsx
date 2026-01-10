import React from 'react'
import Navbar from '@/components/user/Navbar'
import Footer from '@/components/user/Footer'

const ExteriorPage = () => {
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-white pt-[70px] md:pt-[80px]">
        <div>
          <h1>
            Exterior Products
          </h1>
        </div>
      </main>
      
      <Footer />
    </>
  )
}

export default ExteriorPage

