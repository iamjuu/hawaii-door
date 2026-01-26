"use client";

import Image from "next/image"
import Comaimg from "../../../../public/assets/images/landing/coma.png"
import Heading from "./header"

const Testimonial = () => {
  const testimonials = [
    {
      quote: "We've used Hawaii Doors for multiple builds, and every door fit perfectly the first time. Their machining precision saves us hours on installs and eliminates callbacks. You can tell their team takes pride in their work.",
      name: "Keoni L.",
      title: "Project Manager, O'ahu Construction Group"
    },
    {
      quote: "They understand design intent and deliver with craftsmanship. The doors we specified were machined exactly to our drawings, and their documentation process made approvals seamless. Reliable, local, and precise, that's rare.",
      name: "Maria T.",
      title: "Architect, Kailua Design Studio"
    },
    {
      quote: "We replaced all our exterior doors with Hawaiʻi Doors, and the difference is night and day. The fit, the finish, and the island-friendly materials are top-notch. It's like they were made for our home, because they were.",
      name: "Daniel & Kiana P.",
      title: "Homeowners, Maui"
    },
    {
      quote: "From consultation to installation, everything was seamless. The team provided excellent guidance on door selection and ensured each piece fit perfectly.",
      name: "Liam H.",
      title: "Contractor, Honolulu Builders"
    },
    {
      quote: "The attention to detail is incredible. Every door was delivered on time and fit flawlessly. Exceptional quality and service.",
      name: "Aloha K.",
      title: "Interior Designer, Kauai Design Co."
    },
    {
      quote: "Professional, reliable, and highly skilled. Their doors have completely transformed the look and feel of our clients' homes.",
      name: "Sophia M.",
      title: "Architect, Hilo Architectural Studio"
    },
    {
      quote: "We couldn’t be happier. The doors are durable, beautiful, and truly crafted for island life. Highly recommend to anyone seeking top-notch quality.",
      name: "Noah W.",
      title: "Homeowner, Big Island"
    },
    {
      quote: "Exceptional service from start to finish. The team guided us through options, and every door was installed without a hitch.",
      name: "Emma R.",
      title: "Project Manager, Maui Homes"
    },
    {
      quote: "The precision and quality are unmatched. Every project with Hawaii Doors has been smooth and stress-free.",
      name: "Kai N.",
      title: "Builder, O'ahu Construction Group"
    },
    {
      quote: "Beautiful craftsmanship and excellent customer support. Each door feels custom-made and perfectly suited for our home.",
      name: "Olivia S.",
      title: "Homeowner, Kauai"
    }
  ]
  

  // Duplicate testimonials to create the infinite scroll illusion
  const loopTestimonials = [...testimonials, ...testimonials]

  return (
    <div className="w-full py-10 sm:py-12 md:pt-[50px] md:py-[0px] bg-[#fdfffc] font-roboto  ">
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[60px]">
    <div className="max-w-[1400px] 2xl:mx-auto">
      {/* Header Section */}
      <div className="mb-10 md:mb-12">
        <Heading  
          heading="Testimonial" 
          subheading="Real feedback from the people who build, design, and live with our doors."
        />
      </div>
  
      <div className="relative overflow-hidden testimonial-group">
        {/* Left fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[12%] bg-gradient-to-r from-white via-white/70 to-transparent z-10" />
        {/* Right fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[12%] bg-gradient-to-l from-white via-white/70 to-transparent z-10" />
  
        {/* Carousel Container */}
        <div className="flex gap-6 animate-scroll group-hover:pause">
          {loopTestimonials.map((testimonial, index) => (
     <div
     key={index}
     className="flex-shrink-0 w-[300px] md:w-[350px]  gap-5 lg:w-[400px] h-[400px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.10)] rounded-2xl p-6 md:p-8 flex flex-col"
   >
     {/* Top section */}
     <div>
       {/* Quote Icon */}
       <div className="mb-6 w-12 h-12 relative">
         <Image src={Comaimg} alt="Quote icon" fill className="object-contain" />
       </div>
   
       {/* Testimonial Text */}
       <p className="font-roboto font-[400] md:text-[20px] text-black leading-relaxed break-words">
         {testimonial.quote}
       </p>
     </div>
   
     {/* Footer (Author Info) */}
     <div className="mt-auto ">
       <p className="font-roboto flex flex-col  font-light text-sm md:text-base text-[#3B3B3B]">
         {testimonial.name} 
         <p>
          </p>
          {testimonial.title}
       </p>
     </div>
   </div>
   
         
          ))}
        </div>
      </div>
  

    </div>
    </div>
  
    {/* Tailwind CSS keyframes */}
    <style jsx>{`
      @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-scroll {
        animation: scroll 20s linear infinite;
      }
      .testimonial-group:hover .animate-scroll {
        animation-play-state: paused;
      }
    `}</style>
  </div>
  
  )
}

export default Testimonial
