"use client";
import Image from "next/image";
import Buildit from "../../../../public/assets/images/landing/build.png";
import Review from "../../../../public/assets/images/landing/review.png";
import Submit from "../../../../public/assets/images/landing/submit.png";
import Yourdoor from "../../../../public/assets/images/landing/yourdoor.png";
import Greenarrow from "../../../../public/assets/images/landing/greenarrow.png";
import Downarrow from "../../../../public/assets/images/landing/downarrow.png";
import { MdOutlineArrowOutward } from "react-icons/md";
import Link from "next/link";
import Heading from "./header";
import PillCTAButton from "./link-button";
import {
  ProductFootericonTruck,
  ProductFootericonTruckGreen,
} from "@/public/assets";

const stepBox =
  "flex flex-col items-center text-center px-2 pt-3 pb-4 md:pt-10 md:pb-10 w-full max-w-[260px] min-w-0 overflow-hidden mx-auto max-[640px]:pt-2 max-[640px]:pb-3";
const stepContentBox =
  "w-full max-w-[220px] min-w-0 flex flex-col items-center text-center overflow-hidden";

type StepItem = {
  type: "step";
  image: typeof Buildit;
  alt: string;
  title: string;
  content: string;
  imageClassName: string;
  imageWidth: number;
  imageHeight: number;
};

type ArrowItem = {
  type: "arrow";
};

const stepsData: (StepItem | ArrowItem)[] = [
  {
    type: "step",
    image: Buildit,
    alt: "Build It",
    title: "Build It",
    content:
      "Build your perfect door with our easy, interactive builder.",
    imageClassName:
      "w-[140px] md:w-[170px] h-auto md:grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-1",
    imageWidth: 170,
    imageHeight: 170,
  },
  { type: "arrow" },
  {
    type: "step",
    image: Review,
    alt: "Review",
    title: "Review",
    content: "Add your details and review your quote.",
    imageClassName:
      "w-[80px] md:w-[100px] h-auto  md:grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2",
    imageWidth: 100,
    imageHeight: 100,
  },
  { type: "arrow" },
  {
    type: "step",
    image: Submit,
    alt: "Submit",
    title: "Submit",
    content: "Confirm your specs and submit your quote.",
    imageClassName:
      "w-[160px] md:w-[210px] h-auto  md:grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2",
    imageWidth: 210,
    imageHeight: 210,
  },
  { type: "arrow" },
  {
    type: "step",
    image: Yourdoor,
    alt: "Your Door",
    title: "Get Your Door",
    content: "We price it, prep it, and get it ready.",
    imageClassName:
      "w-[90px] md:w-[120px] h-auto  object-contain md:grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2",
    imageWidth: 120,
    imageHeight: 120,
  },
];

const StepsDoor = () => {
  return (
    <section className="w-full mt-4 md:mt-[0px] sm:py-12 md:py-[0px] md:pt-[50px] font-inter max-[640px]:mt-3 max-[640px]:pb-4">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[60px]">
        <div className="max-w-[1400px] 2xl:mx-auto flex flex-col">
          {/* Heading */}
          <div className="flex items-center justify-start">
            <Heading
              heading="How To Order Doors"
              subheading="Four easy steps to get your perfect premium door delivered"
            />
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-0 md:gap-[20px]">
            <div className="group w-full grid mt-3 md:mt-[25px] grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-7 md:gap-3 lg:gap-[25px] items-start font-roboto min-w-0 overflow-hidden">
              {stepsData.map((item, index) =>
                item.type === "step" ? (
                  <div
                    key={index}
                    className="relative flex flex-col justify-center items-center w-full min-w-0"
                  >
                    <div className={stepBox}>
                      <Image
                        src={item.image}
                        alt={item.alt}
                        width={item.imageWidth}
                        height={item.imageHeight}
                        className={item.imageClassName}
                      />
                      <div className={stepContentBox}>
                        <h4 className="text-xl font-medium text-black w-full break-words">
                          {item.title}
                        </h4>
                        <p className="mt-1 md:mt-2 text-[#3B3B3B] text-sm md:text-base w-full break-words">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-center min-w-0"
                  >
                    <div className="flex md:hidden justify-center my-1.5">
                      <Image
                        src={Downarrow}
                        alt="Down Arrow"
                        width={20}
                        height={20}
                      />
                    </div>
                    <div className="hidden md:flex justify-center items-center self-stretch min-h-[200px]">
                      <Image
                        src={Greenarrow}
                        alt="Arrow"
                        width={60}
                        height={60}
                        className="md:grayscale group-hover:grayscale-0 transition-transform duration-300 ease-out group-hover:translate-y-1 group-hover:scale-110"
                      />
                    </div>
                  </div>
                )
              )}
            </div>

            {/* CTA */}
            <div className="w-full flex mb-0 justify-center items-center mt-3 mb-3 md:mb-0 md:mt-0 max-[640px]:mt-2">
              <Link href="/build" className="">
                <PillCTAButton
                  label="Start Building Your Door Now"
                  icon={
                    <MdOutlineArrowOutward className="text-white text-xl md:text-2xl" />
                  }
                  className="!cursor-pointer"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative w-full min-h-[60px] md:h-[68px] flex flex-col md:flex-row justify-center items-center gap-4 md:gap-16 py-3 md:py-0 bg-[#F6F5F1] group mt-4 md:mt-[55px] max-[640px]:mt-3 transition-all duration-300">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="relative w-6 h-6 md:w-8 md:h-8">
            <Image
              src={ProductFootericonTruck}
              alt="Delivered"
              width={32}
              height={32}
              className="w-6 h-6 md:w-8 md:h-8 group-hover:opacity-0 transition-opacity duration-300"
            />
            <Image
              src={ProductFootericonTruckGreen}
              alt="Delivered"
              width={32}
              height={32}
              className="w-6 h-6 md:w-8 md:h-8 absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
          <span className="text-[#585858] font-roboto text-sm md:text-lg">
            Delivered Across Hawaii.
          </span>
        </div>
      </div>
    </section>
  );
};

export default StepsDoor;
