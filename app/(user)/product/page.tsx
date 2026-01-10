import React from 'react'
import Navbar from '@/components/user/Navbar'
import Footer from '@/components/user/Footer'
import HeroSection from './components/herosection'
import { ProductFootericondoor,ProductFooterflag } from '@/public/assets'
const page = () => {

    const bgImage = '/assets/product/productmain.svg';
    const contant = 'Doors That Fit. Every Time.';
    const para = 'Explore our full line of pre-hung wood and fiberglass doors, organized by material and style. All units are machined in-house to match your project’s exact hinge, bore, and jamb specs.'
    const features = [
      {
        text: 'Proudly manufactured in the USA for superior quality',
        iconType: ProductFooterflag
      },
      {
        text: 'Custom-crafted doors tailored to your exact specifications',
        iconType: ProductFootericondoor
      }
    ];
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-white">
        <HeroSection contant={contant} bgImage={bgImage} para={para} features={features}/>
      </main>
      
      <Footer />
    </>
  )
}

export default page
