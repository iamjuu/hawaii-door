"use client";
import Image from "next/image";
import Buildit from "../../../../public/assets/images/landing/build.png";
import Review from "../../../../public/assets/images/landing/review.png";
import Submit from "../../../../public/assets/images/landing/submit.png";
import Yourdoor from "../../../../public/assets/images/landing/yourdoor.png";
import Greenarrow from "../../../../public/assets/images/landing/greenarrow.png";
import Downarrow from "../../../../public/assets/images/landing/downarrow.png";
import Truck from "../../../../public/assets/images/landing/truck.png";
import { MdOutlineArrowOutward } from "react-icons/md";
import LinkButton from "../components/link-button";
import Link from "next/link";
import Heading from "./header";

const stepBox =
  "flex flex-col items-center text-center px-2 pt-4 pb-6 md:pt-10 md:pb-10 w-full max-w-[260px] mx-auto";

const StepsDoor = () => {
  return (
    <section className="w-full py-[50px] pb-5 font-inter">
      <div className="max-w-7xl md:max-w-full mx-auto px-4 sm:px-6 md:px-[60px] flex flex-col">

        {/* Heading */}
        <div className="flex items-center justify-start">
          <Heading
            heading="How To Order Doors"
            subheading="Four easy steps to get your perfect premium door delivered"
          />
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-10 md:gap-[50px]">
          <div className="group w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-start font-roboto">

            {/* STEP 1 */}
            <div className="relative flex flex-col justify-center items-center">
              <div className={stepBox}>
                <Image
                  src={Buildit}
                  alt="Build It"
                  width={170}
                  height={170}
                  className="w-[140px] md:w-[170px] h-auto mb-5 md:mb-6 md:grayscale md:group-hover:grayscale-0 transition-all duration-500"
                />
                <h4 className="text-xl font-medium text-black">Build It</h4>
                <p className="mt-2 text-[#3B3B3B] text-sm md:text-base">
                  Build your perfect door with our easy, interactive builder.
                </p>
              </div>

              <div className="flex md:hidden justify-center my-4">
                <Image src={Downarrow} alt="Down Arrow" width={20} height={20} />
              </div>

              <div className="hidden md:flex absolute right-[-60px] top-1/3 -translate-y-1/2">
                <Image
                  src={Greenarrow}
                  alt="Arrow"
                  width={60}
                  height={60}
                  className="md:grayscale md:group-hover:grayscale-0 transition-transform duration-300 ease-out md:group-hover:translate-y-1"
                />
              </div>
            </div>

            {/* STEP 2 */}
            <div className="relative flex flex-col justify-center items-center">
              <div className={stepBox}>
                <Image
                  src={Review}
                  alt="Review"
                  width={100}
                  height={100}
                  className="w-[80px] md:w-[100px] h-auto mb-5 md:mb-6 md:grayscale md:group-hover:grayscale-0 transition-all duration-500"
                />
                <h4 className="text-xl font-medium text-black">Review</h4>
                <p className="mt-2 text-[#3B3B3B] text-sm md:text-base">
                  Add your details and review your quote.
                </p>
              </div>

              <div className="flex md:hidden justify-center my-4">
                <Image src={Downarrow} alt="Down Arrow" width={20} height={20} />
              </div>

              <div className="hidden md:flex absolute right-[-10px] top-1/3 -translate-y-1/2">
                <Image
                  src={Greenarrow}
                  alt="Arrow"
                  width={60}
                  height={60}
                  className="md:grayscale md:group-hover:grayscale-0 transition-transform duration-300 ease-out md:group-hover:translate-y-1"
                />
              </div>
            </div>

            {/* STEP 3 */}
            <div className="relative flex flex-col justify-center items-center">
              <div className={stepBox}>
                <Image
                  src={Submit}
                  alt="Submit"
                  width={210}
                  height={210}
                  className="w-[160px] md:w-[210px] h-auto mb-5 md:mb-6 md:grayscale md:group-hover:grayscale-0 transition-all duration-500"
                />
                <h4 className="text-xl font-medium text-black">Submit</h4>
                <p className="mt-2 text-[#3B3B3B] text-sm md:text-base">
                  Confirm your specs and submit your quote.
                </p>
              </div>

              <div className="flex md:hidden justify-center my-4">
                <Image src={Downarrow} alt="Down Arrow" width={20} height={20} />
              </div>

              <div className="hidden md:flex absolute right-[-60px] top-1/3 -translate-y-1/2">
                <Image
                  src={Greenarrow}
                  alt="Arrow"
                  width={60}
                  height={60}
                  className="md:grayscale md:group-hover:grayscale-0 transition-transform duration-300 ease-out md:group-hover:translate-y-1"
                />
              </div>
            </div>

            {/* STEP 4 */}
            <div className="flex justify-center">
              <div className={stepBox}>
                <Image
                  src={Yourdoor}
                  alt="Your Door"
                  width={120}
                  height={120}
                  className="w-[90px] md:w-[120px] h-auto mb-5 md:mb-6 md:grayscale md:group-hover:grayscale-0 transition-all duration-500"
                />
                <h4 className="text-xl font-medium text-black">Get Your Door</h4>
                <p className="mt-2 text-[#3B3B3B] text-sm md:text-base">
                  We price it, prep it, and get it ready.
                </p>
              </div>
            </div>

          </div>

          {/* CTA */}
          <div className="w-full flex justify-center items-center mt-4 md:mt-0">
            <Link href="/build">
              <LinkButton
                label="Start Building Your Door Now"
                icon={<MdOutlineArrowOutward className="text-2xl py-[15px]" />}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative w-full min-h-[60px] md:h-[68px] flex flex-col md:flex-row justify-center items-center gap-4 md:gap-16 py-3 md:py-0 bg-[#F6F5F1] group cursor-pointer mt-6">
        <div className="flex items-center gap-2">
          <Image
            src={Truck}
            alt="Delivered"
            width={32}
            height={32}
            className="w-6 h-6 md:w-8 md:h-8 md:grayscale md:group-hover:grayscale-0 transition-all duration-500"
          />
          <span className="text-[#585858] font-roboto text-sm md:text-lg">
            Delivered Across Hawaii.
          </span>
        </div>
      </div>
    </section>
  );
};

export default StepsDoor;
