import { MdOutlineArrowOutward } from "react-icons/md"
import Image from "next/image"
import Measureimg from "../../../../public/assets/images/landing/measure.png"
import Vector7 from "../../../../public/assets/images/landing/vector7.png"
const Measure = () => {
  return (
    <>
    <div className="w-full px-4  md:px-15 pb-7 pt-12 md:py-16 lg:py-18 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Content Section */}
          <div className="order-2 lg:order-1 flex flex-col justify-between h-full">
            <div>
              <h1 className="font-roboto font-medium md:font-semibold text-2xl md:text-4xl leading-tight mb-6 md:mb-8 text-black">
                Measure Twice.<br />
                Deliver Once.
              </h1>
              
              <p className="font-roboto font-light text-base md:text-lg lg:text-xl text-[#3B3B3B] leading-relaxed ">
                We're The Island Door Company, a women-owned, Hawaiʻi-based shop delivering precision-machined wood and fiberglass doors across every island. Each door is pre-hung, labeled, and ready to install, cutting labor hours, preventing callbacks, and keeping your project on schedule. We partner with the industry's top vendors, Simpson Door, Alliance Door Products, and Plastpro, to bring proven quality to island conditions
              </p>
            </div>

            <button className="w-max group relative inline-flex items-center gap-3 overflow-hidden rounded-3xl bg-[#B6D78A] px-5 py-2 font-roboto text-xl text-white mt-5 md:mt-6 mb-[20px] ">
{/* WhatsApp-style black reveal */}
<span
  className="
    absolute inset-0
    bg-black
    origin-bottom
    scale-y-0
    transition-transform duration-900 ease-[cubic-bezier(0.4,0,0.2,1)]
    group-hover:scale-y-100
  "
/>

{/* Content */}
<span className="relative z-10 flex items-center gap-3 text-[15px] md:text-lg">
  Explore Now
  {/* Arrow */}
  <span
    className="
      inline-flex items-center justify-center w-7 h-7
      transform
      transition-all duration-500 ease-in-out
      rotate-0 translate-x-1.5
      group-hover:rotate-45 group-hover:translate-x-0
    "
  >
    <MdOutlineArrowOutward className="text-white text-2xl" />
  </span>
</span>
</button>

          </div>
          {/* Right Image Section */}
          <div className="order-1 lg:order-2">
            <div className="relative w-full h-[350px] md:h-[400px] lg:h-[450px] rounded-2xl overflow-hidden shadow-lg">
              <Image 
                src={Measureimg} 
                alt="Modern architectural interior with wooden ceiling details" 
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="relative px-5 md:px-0 w-full min-h-[68px] md:h-[68px] flex flex-col md:flex-row justify-center items-center gap-4 md:gap-16 py-3 md:py-0 bg-[#F6F5F1] group cursor-pointer md:mt-9 ">

{/* Item 1 */}
<div className="flex  items-center md:flex-row gap-2">
  <Image
    src={Vector7}
    alt="Use"
    className="w-5 h-5
      sm:w-6 sm:h-6
      md:w-8 md:h-8 filter md:grayscale md:group-hover:grayscale-0 transition-all duration-500"
  />
  <span className=" text-[#585858]  font-roboto text-sm md:text-lg pr-2">
  Crafted for Hawaii’s Heat, Humidity, and Salt Air.
  </span>
</div>



</div>
    </>
  )
}

export default Measure