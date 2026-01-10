import Image from "next/image";
import Careerimg from "../../../public/assets/images/landing/career.png";
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";
export default function CareerPage() {
  return (
    <div>
        <Navbar />
      {/* First Section - Hero with Gradient */}
      <section className="relative w-full h-auto lg:h-[500px] bg-[#efede9] mt-17">
        <div className="container mx-auto px-6 lg:px-12 h-full">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center h-full py-8 lg:py-0">
            {/* Left Content */}
            <div className="flex-1 space-y-4 lg:space-y-6">
              <h1 className="text-[45px] font-roboto font-[600] text-gray-900 ">
                Join The Island Door Company
              </h1>
              
              <p className="font-roboto font-[400] text-[18px] text-[#3B3B3B] leading-relaxed">
                For forty years, we've measured twice, machined once, and delivered
                doors that fit. At Hawaii Doors, we don't just build doors, we build
                trust, craftsmanship, and opportunity across every island.
              </p>
              
              <p className="font-roboto font-[400] text-[18px] text-[#3B3B3B] leading-relaxed">
                If you value precision, integrity, and doing things right, you'll fit our
                team. Think you'd be a great addition?{" "}
                <a 
                  href="#contact" 
                  className="text-black font-semibold underline transition-colors"
                >
                  Get in touch
                </a>
              </p>
            </div>

            {/* Right Image */}
            <div className="flex-1 w-full h-64 sm:h-80 lg:h-full lg:max-h-[450px] relative">
              <div className="relative w-full h-full">
                <Image
                  src={Careerimg}
                  alt="Happy team members collaborating"
                  fill
                  className="object-cover "
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second Section - White Background Contact */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col justify-center items-center text-center space-y-8">
            <h2 className="text-[45px] font-[600] text-black font-roboto">
              Ready for Joining?
            </h2>
            
            <p className="text-[18px] font-[400] text-gray-700 max-w-2xl">
              Email your resume and cover letter to
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4px-4 sm:px-8 py-4 sm:py-6 rounded-lg  transition-shadow md:w-min">
              {/* Email Icon */}

              <div className=" p-2 rounded-full bg-[#F5F5F4]">
              <svg 
                className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1} 
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              </svg>
              </div>
              
              {/* Email Address */}
              <a 
                href="mailto:info@hawaiidoors.com" 
                className="font-[400] text-[32px] text-[#0069A8] transition-colors break-all sm:break-normal text-center sm:text-left"
              >
                info@hawaiidoors.com
              </a>
              
              {/* Arrow Icon */}
              <svg 
                className="w-5 h-5 sm:w-6 sm:h-6 text-[#0069A8] flex-shrink-0 " 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 7l5 5m0 0l-5 5m5-5H6" 
                />
              </svg>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}