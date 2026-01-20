
import Image from "next/image"
import Woodcoreimag from "../../../../public/assets/images/landing/woodcore.png"
import Hollowcoreimg from "../../../../public/assets/images/landing/hollowcore.png"
import Fiberglassimg from "../../../../public/assets/images/landing/fiberglass.png"
import Particlecoreimg from "../../../../public/assets/images/landing/particlecore.png"
import Sclcimg from "../../../../public/assets/images/landing/sclc.png"
import Vector5 from "../../../../public/assets/images/landing/vector5.png"
import Vector6 from "../../../../public/assets/images/landing/vector6.png"
import Headings from "../components/header"
// import Heading from "./Heading";
const galleryItems = [
  {
    id: 1,
    title: "Wood Core",
    description: "Island-crafted wood core doors built for strength and natural beauty. Ideal for interiors needing a classic, warm finish.",
    image: Woodcoreimag,
  },
  {
    id: 2,
    title: "Fiber Glass",
    description: "Durable, low-maintenance fiberglass doors designed for Hawai'i's humidity, salt air, and harsh weather, built to last.",
    image: Fiberglassimg,
  },
  {
    id: 3,
    title: "Hollow Core",
    description: "Lightweight and cost-effective hollow core doors ideal for interior spaces where budget and weight matter.",
    image: Hollowcoreimg,
  },
  {
    id: 4,
    title: "Particle Core",
    description: "Solid feel with cost efficiency, particle core doors offer improved sound control and durability for bedrooms and offices.",
    image: Particlecoreimg,
  },
  {
    id: 5,
    title: "SCLC",
    description: "Premium laminated solid-core doors built for strength, sound reduction, and long-term stability. Ideal for high-traffic homes and commercial spaces.",
    image: Sclcimg,
  },


]
// 👉 CHANGE WIDTH HERE ONLY
const CONTENT_WIDTH = "max-w-7xl";
// try: "max-w-4xl" | "max-w-5xl" | "max-w-7xl"

const Gallerysection = () => {
  return (
    <div className="w-full bg-white">

      {/* MAIN CONTENT */}
      <div className={`${CONTENT_WIDTH} mx-auto`}>
        <Headings
          heading="Door Categories"
          subheading="Explore our full line of pre-hung wood and fiberglass doors, organized by material and style."
        />

        {/* Gallery Grid */}
        <div className="px-5 md:px-[60px] pb-12 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* First Row */}
            <div className="group relative h-[300px] rounded-2xl overflow-hidden cursor-pointer">
              <Image
                src={galleryItems[0].image}
                alt={galleryItems[0].title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-black/70 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-3xl font-medium opacity-100 transition-opacity duration-300 group-hover:opacity-0">
                  {galleryItems[0].title}
                </h3>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1/2 p-8 flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <p className="text-white text-base md:text-lg font-roboto text-center">
                  {galleryItems[0].description}
                </p>
              </div>
            </div>

            <div className="group relative h-[300px] rounded-2xl overflow-hidden cursor-pointer">
              <Image
                src={galleryItems[1].image}
                alt={galleryItems[1].title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-black/70 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-3xl font-medium opacity-100 transition-opacity duration-300 group-hover:opacity-0">
                  {galleryItems[1].title}
                </h3>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1/2 p-8 flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <p className="text-white text-base md:text-lg font-roboto text-center">
                  {galleryItems[1].description}
                </p>
              </div>
            </div>

            {/* Second Row */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
              {galleryItems.slice(2).map((item) => (
                <div
                  key={item.id}
                  className="group relative h-[300px] md:h-[350px] rounded-2xl overflow-hidden cursor-pointer"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-black/70 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-3xl font-medium opacity-100 transition-opacity duration-300 group-hover:opacity-0">
                      {item.title}
                    </h3>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 p-6 flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <p className="text-white text-sm md:text-base font-roboto text-center">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* FULL WIDTH STRIP */}
      <div className="w-full bg-[#F6F5F1]">
        <div className={`${CONTENT_WIDTH} mx-auto relative min-h-[68px] md:h-[68px] flex flex-col md:flex-row justify-center items-center gap-4 md:gap-16 py-3 md:py-0 group cursor-pointer mt-0 md:mt-[60px]`}>

          <div className="flex items-center gap-2">
            <Image src={Vector5} alt="Use" className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 filter md:grayscale md:group-hover:grayscale-0 transition-all duration-500" />
            <span className="text-[#585858] font-roboto text-sm md:text-lg">
              Machined to Perfection
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Image src={Vector6} alt="Use" width={32} height={32} className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 filter md:grayscale md:group-hover:grayscale-0 transition-all duration-500" />
            <span className="text-[#585858] font-roboto text-sm md:text-lg">
              True Hawaii Spec
            </span>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Gallerysection;
