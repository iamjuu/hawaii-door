import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";
import {
  TickGrayPng,
  TickColorPng,
  ConstructGray,
  ConstructColor,
  SettingGray,
  SettingColor,
  ComfortGray,
  ComfortColor,
} from "@/public/assets";
import HeroSection from "../components/herosection";
import Houseimage from "../../../../public/assets/product/exterior/house.jpg";
import Windowimage from "../../../../public/assets/product/exterior/window.jpg";
import FooterBanner from "../components/footerbanner";
import Link from "next/link";
const ExteriorPage = () => {
  const bgImage = "/assets/product/Exterior Wood.svg";
  const contant = "Exterior Doors";
  const para =
    "Choose from our beautiful, low maintenance woodgrain textured and smooth Fiberglass Doors or create a stunning entrance with our unsurpassed Wood Stile & RailDoors.";
  const features = [
    {
      text: "High-definition panel detailing",
      iconGray: TickGrayPng,
      iconColor: TickColorPng,
    },
    {
      text: "Built for lasting performance",
      iconGray: ConstructGray,
      iconColor: ConstructColor,
    },
    {
      text: "Decorative glass flexibility",
      iconGray: SettingGray,
      iconColor: SettingColor,
    },
    {
      text: "Fully custom wood designs",
      iconGray: ComfortGray,
      iconColor: ComfortColor,
    },
  ];

  return (
    <div className="bg-white">
      <Navbar />
      <HeroSection
        contant={contant}
        bgImage={bgImage}
        para={para}
        features={features}
      />
      {/* Fiberglass Doors Section */}
      <section className="px-6 md:px-14 pt-5 pb-12 md:py-16 bg-[#fdfffc] font-roboto ">
        <h2 className="text-[24px] md:text-[36px] font-[500] mb-5 md:mb-8 text-black">
          FIBERGLASS DOORS
        </h2>

        <div className="space-y-6  text-gray-600 ">
          <div className="max-w-7xl">
            <h3 className="text-[16px] md:text-[24px] font-[400] text-lg text-[#252525] mb-3">
              SMOOTH FIBERGLASS DOORS
            </h3>
            <p className="text-[14px] md:text-[16px] font-[300] text-[#666666]">
              Our smooth fiberglass doors include a subtle texture that accepts
              paint in any color without requiring pre-sanding or surface
              preparation.
            </p>
          </div>

          <div className="max-w-7xl">
            <h3 className="text-[16px] md:text-[24px] font-[400] font-roboto text-lg text-[#252525] mb-3">
              WOODGRAIN FIBERGLASS DOORS
            </h3>
            <p className="text-[14px] md:text-[16px] font-[300] text-[#666666]">
              Our wide selection of textured fiberglass doors accurately mirrors
              natural wood grain. When finished in one of our rich stain colors,
              these doors match the look of wood while offering superior
              durability and low maintenance.
            </p>
          </div>

          <div>
            <h3 className="font-[400] text-[20px] md:text-[28px] text-black mb-2">
              Benefits
            </h3>
            <ul className="list-disc ml-5 space-y-2 text-[14px] md:text-[16px] font-[300] text-[#666666] pl-3">
              <li>
                Crafted with high-definition panels adding depth and
                authenticity.
              </li>
              <li>
                Engineered to resist warping, denting, and rust, ensuring
                aesthetics, energy efficiency, and minimal upkeep.
              </li>
              <li>
                Wide selection of decorative glass designs, direct glaze
                options, Simulated Divided Lites (SDL), blinds, and vents.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="w-full px-6 md:px-16 ">
        <img
          src={Houseimage.src}
          alt="Exterior House"
          className="w-full h-auto object-cover"
        />
      </section>

      <section className="bg-[#fdfffc]  px-6 md:px-16 mt-[37px] font-roboto ">
        <div className="w-full pt-10 py-0   border-t border-[#CCCCCC] ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-14 items-start ">
            {/* LEFT IMAGE */}
            <div>
              <img
                src={Windowimage.src}
                alt="Wood Stile Door"
                className="w-full h-auto xl:h-[680px] object-cover"
              />
            </div>

            {/* RIGHT CONTENT */}
            <div className=" h-full pt-8 flex flex-col justify-start  ">
              <h2 className="text-[24px] md:text-[36px] font-roboto font-[500] mb-5 text-[#333333]">
                WOOD STILE & RAIL DOORS
              </h2>

              <p className="text-[#666666] font-[300] font-light text-[14px] md:text-[16px] mb-4 leading-relaxed">
                When you value traditional craftsmanship, nothing matches a wood
                stile and rail door. As both the first and final impression of
                your home, the door expresses your personal style and design
                vision.
              </p>

              <p className="text-[#666666] font-[300] font-light text-[14px] md:text-[16px] mb-7 mt-3 leading-relaxed">
                Wide range of standard and custom options.
              </p>

              <p className="text-[#666666] font-[300] font-light text-[14px] md:text-[16px] mb-8 leading-relaxed">
                Whether you need solid panel entry doors, bold designs with
                decorative or privacy glass, or patio French doors with
                coordinated sidelights and transoms, we offer the right solution
                for your home.
              </p>

              <h3 className="text-[23px] md:text-[28px] font-[400] text-[#252525] mb-4">
                Benefits
              </h3>

              <ul className="list-disc ml-5 space-y-3 ttext-[#666666] font-[300] font-light text-[14px] md:text-[16px] mb-10 md:mb-17">
                <li>Custom Designs</li>
                <li>
                  Wood doors provide unmatched versatility in design, style, and
                  size
                </li>
                <li>Variety of wood species and glass options</li>
              </ul>
              <Link href="/product/exterior/exterior-wood">
                <button className="w-fit px-8 py-3 bg-[#FF6E4A] text-white rounded-md hover:bg-black transition cursor-pointer">
                  LEARN MORE
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <FooterBanner />
      <Footer />
    </div>
  );
};

export default ExteriorPage;
