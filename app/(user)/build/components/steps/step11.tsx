"use client";

import Image from "next/image";
import threeshold from "../../../../../public/assets/images/dummy/threshold.png";
import usleep from "../../../../../public/assets/images/dummy/usleep.png";
import staple from "../../../../../public/assets/images/dummy/staple.png";
import noneimg from "../../../../../public/assets/images/dummy/none.png";

const Step11 = () => {
  return (
    <div className="mt-[50px] mb-[50px]">
      <h2 className="text-[32px] font-medium text-black mb-8">Protect Door</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="relative border-2 border-gray-200 p-3 cursor-pointer transition-all flex flex-col hover:shadow-lg bg-white">
          <div className="relative w-full max-w-[200px] aspect-4/3 mx-auto mb-3">
            <Image src={noneimg} alt="None" fill className="object-contain" />
          </div>
          <h3 className="text-sm font-semibold text-black text-center mb-1">
            None
          </h3>
        </div>

        <div className="relative border-2 border-gray-200 p-3 cursor-pointer transition-all flex flex-col hover:shadow-lg bg-white">
          <div className="relative w-full max-w-[200px] aspect-4/3 mx-auto mb-3">
            <Image
              src={threeshold}
              alt="Threshold"
              fill
              className="object-contain"
            />
          </div>
          <h3 className="text-sm font-semibold text-black text-center mb-1">
            Threshold
          </h3>
        </div>

        <div className="relative border-2 border-gray-200 p-3 cursor-pointer transition-all flex flex-col hover:shadow-lg bg-white">
          <div className="relative w-full max-w-[200px] aspect-4/3 mx-auto mb-3">
            <Image
              src={usleep}
              alt="Door Sweep (U-Sweep)"
              fill
              className="object-contain"
            />
          </div>
          <h3 className="text-sm font-semibold text-black text-center mb-1">
            Door Sweep (U-Sweep)
          </h3>
        </div>

        <div className="relative border-2 border-gray-200 p-3 cursor-pointer transition-all flex flex-col hover:shadow-lg bg-white">
          <div className="relative w-full max-w-[200px] aspect-4/3 mx-auto mb-3">
            <Image
              src={staple}
              alt="Staple on Sweep"
              fill
              className="object-contain"
            />
          </div>
          <h3 className="text-sm font-semibold text-black text-center mb-1">
            Staple on Sweep
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Step11;