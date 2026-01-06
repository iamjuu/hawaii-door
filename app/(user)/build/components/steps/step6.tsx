"use client";

import Image from "next/image";
import { useState } from "react";
import lhra from "../../../../../public/assets/images/dummy/Lhra.png";
import lha from "../../../../../public/assets/images/dummy/Lha.png";
import rha from "../../../../../public/assets/images/dummy/rha.png";
import rhra from "../../../../../public/assets/images/dummy/rhra.png";

const Step6 = () => {
  const [selectedRadius, setSelectedRadius] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Door Handling & Hinges</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1: LHRA */}
        <div className="border-2 border-gray-200 rounded-lg p-4 bg-white">
          <div className="relative w-full aspect-[4/3] mb-4">
            <Image
              src={lhra}
              alt="LHRA"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-base font-semibold text-gray-900 mb-1">LHRA</p>
          <p className="text-sm text-gray-500">Left Hand Reverse Active</p>
        </div>

        {/* 2: LHA (you can edit the labels as needed) */}
        <div className="border-2 border-gray-200 rounded-lg p-4 bg-white">
          <div className="relative w-full aspect-[4/3] mb-4">
            <Image
              src={lha}
              alt="LHA"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-base font-semibold text-gray-900 mb-1">LHA</p>
          <p className="text-sm text-gray-500">Left Hand Active</p>
        </div>

        {/* 3: RHA */}
        <div className="border-2 border-gray-200 rounded-lg p-4 bg-white">
          <div className="relative w-full aspect-[4/3] mb-4">
            <Image
              src={rha}
              alt="RHA"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-base font-semibold text-gray-900 mb-1">RHA</p>
          <p className="text-sm text-gray-500">Right Hand Active</p>
        </div>

        {/* 4: RHRA */}
        <div className="border-2 border-gray-200 rounded-lg p-4 bg-white">
          <div className="relative w-full aspect-[4/3] mb-4">
            <Image
              src={rhra}
              alt="RHRA"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-base font-semibold text-gray-900 mb-1">RHRA</p>
          <p className="text-sm text-gray-500">Right Hand Reverse Active</p>
        </div>
      </div>

      {/* Hinge Radius */}
      <div className="mt-10">
        <p className="text-lg font-semibold text-gray-900 mb-3">Hinge Radius</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => setSelectedRadius("1/4")}
            className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
              selectedRadius === "1/4"
                ? "border-orange-500 text-orange-600"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            1/4&quot; Round Corner
          </button>
          <button
            type="button"
            onClick={() => setSelectedRadius("5/8")}
            className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
              selectedRadius === "5/8"
                ? "border-orange-500 text-orange-600"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            5/8&quot; Round Corner
          </button>
          <button
            type="button"
            onClick={() => setSelectedRadius("square")}
            className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
              selectedRadius === "square"
                ? "border-orange-500 text-orange-600"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            Square
          </button>
        </div>
      </div>

      {/* Hinge Type */}
      <div className="mt-8">
        <p className="text-lg font-semibold text-gray-900 mb-3">Hinge Type</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setSelectedType("residential")}
            className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
              selectedType === "residential"
                ? "border-orange-500 text-orange-600"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            Residential
          </button>
          <button
            type="button"
            onClick={() => setSelectedType("commercial")}
            className={`border-2 rounded-lg px-4 py-3 text-sm font-medium bg-white transition-colors ${
              selectedType === "commercial"
                ? "border-orange-500 text-orange-600"
                : "border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            Commercial
          </button>
        </div>
      </div>

      {/* Hinge Location (from top) */}
      <div className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Hinge Location */}
          <div>
            <p className="text-lg font-semibold text-gray-900 mb-1">
              Hinge Location (from top)
            </p>
            <p className="text-xs text-gray-500 mb-3">Bottom to bottom</p>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Hinge 1 location"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500"
              />
              <input
                type="text"
                placeholder="Hinge 2 location"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500"
              />
              <input
                type="text"
                placeholder="Hinge 3 location"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Right: Backset */}
          <div>
            <p className="text-lg font-semibold text-gray-900 mb-2">Backset</p>
            <input
              type="text"
              placeholder="Measure from door edge to hinge edge"
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step6;