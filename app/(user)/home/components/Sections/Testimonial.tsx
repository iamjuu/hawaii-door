import Image from "next/image"
import Comaimg from "../../../../../public/assets/images/landing/coma.png"

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
    }
  ]

  return (
    <div className="w-full px-5 md:px-15 pt-12 pb-12 md:py-16 lg:py-20 bg-white font-roboto">
      <div className="max-w-[1400px] mx-auto">
        {/* Header Section */}
        <div className="mb-10 md:mb-12">
          <h2 className="font-roboto font-medium md:font-semibold text-2xl md:text-4xl mb-2 md:mb-4 text-black">
            Testimonial
          </h2>
          <p className="text-sm md:text-lg text-[#3B3B3B] font-roboto max-w-xl pr-2">
            Real feedback from the people who build, design, and<br className="hidden md:block" />
            live with our doors.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="
              bg-white
              rounded-2xl
              p-6 md:p-8
              shadow-[0_4px_20px_rgba(0,0,0,0.10)]
            "            
            
            
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <div className="relative w-12 h-12">
                  <Image 
                    src={Comaimg}
                    alt="Quote icon"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Testimonial Text */}
              <p className="font-roboto text-base md:text-lg text-black leading-relaxed mb-8">
                {testimonial.quote}
              </p>

              {/* Author Info */}
              <div className=" border-gray-200">
                <p className="font-roboto font-medium text-base md:text-lg text-black mb-1">
                  {testimonial.name}
                </p>
                <p className="font-roboto font-light text-sm md:text-base text-[#3B3B3B]">
                  {testimonial.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Testimonial