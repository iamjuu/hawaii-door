"use client";

import Image from "next/image";
import m1img from "../../../../../public/assets/images/dummy/m1.png";
import m2img from "../../../../../public/assets/images/dummy/m2.png";
import m3img from "../../../../../public/assets/images/dummy/m3.png";
import m4img from "../../../../../public/assets/images/dummy/m4.png";

const Step5 = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">What is the Wall Thickness</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Option 1 */}
        <div className="border-2 border-gray-200 rounded-lg p-4 flex flex-col items-center bg-white">
          <div className="relative w-full aspect-[4/3] mb-3">
            <Image
              src={m1img}
              alt="Wall thickness option 1"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-sm text-gray-700 font-medium text-center">
            Option 1
          </p>
        </div>

        {/* Option 2 */}
        <div className="border-2 border-gray-200 rounded-lg p-4 flex flex-col items-center bg-white">
          <div className="relative w-full aspect-[4/3] mb-3">
            <Image
              src={m2img}
              alt="Wall thickness option 2"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-sm text-gray-700 font-medium text-center">
            Option 2
          </p>
        </div>

        {/* Option 3 */}
        <div className="border-2 border-gray-200 rounded-lg p-4 flex flex-col items-center bg-white">
          <div className="relative w-full aspect-[4/3] mb-3">
            <Image
              src={m3img}
              alt="Wall thickness option 3"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-sm text-gray-700 font-medium text-center">
            Option 3
          </p>
        </div>

        {/* Option 4 */}
        <div className="border-2 border-gray-200 rounded-lg p-4 flex flex-col items-center bg-white">
          <div className="relative w-full aspect-[4/3] mb-3">
            <Image
              src={m4img}
              alt="Wall thickness option 4"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-sm text-gray-700 font-medium text-center">
            Option 4
          </p>
        </div>

        {/* Input card – only input, no image */}
        <div className="border-2 border-gray-200 rounded-lg p-4 flex flex-col justify-center bg-white">
          <input
            type="text"
            placeholder="Enter Diameter"
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Step5;