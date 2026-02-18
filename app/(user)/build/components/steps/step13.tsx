"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import clearwhite from "../../../../../public/assets/images/dummy/clearwhite1.png";
import oak from "../../../../../public/assets/images/dummy/oak1.png";
import primedwhite from "../../../../../public/assets/images/dummy/primed1.png";
import rotted from "../../../../../public/assets/images/dummy/rotary1.png";

interface StepProps {
  quoteData: any;
  setQuoteData: (data: any) => void;
}

interface DoorOption {
  _id: string;
  name: string;
  doorType: string;
  category: string;
}

const LYDEN_DOOR = "Lyden door";
const FIBER_GLASS = "Fiber glass";

const Step13 = ({ quoteData, setQuoteData }: StepProps) => {
  const [selectedFinishOption, setSelectedFinishOption] = useState<string | null>(
    quoteData.doorFinishOption || null
  );
  const [doorTypes, setDoorTypes] = useState<string[]>([]);
  const [doors, setDoors] = useState<DoorOption[]>([]);
  const [loadingTypes, setLoadingTypes] = useState(false);
  const [loadingDoors, setLoadingDoors] = useState(false);
  const [doorCategory, setDoorCategory] = useState<string>(quoteData.doorCategory || "");
  const [selectedDoorId, setSelectedDoorId] = useState<string>(quoteData.selectedDoorId || "");
  const [selectedDoorName, setSelectedDoorName] = useState<string>(quoteData.selectedDoorName || "");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>(
    quoteData.uploadedFiles || []
  );

  const productCategory = quoteData.productCategory || "";

  // Product Category options: API types + Lyden door (interior) / Fiber glass (exterior)
  const displayDoorTypes = [...doorTypes];
  if (productCategory === "interior" && !displayDoorTypes.includes(LYDEN_DOOR)) {
    displayDoorTypes.push(LYDEN_DOOR);
  }
  if (productCategory === "exterior" && !displayDoorTypes.includes(FIBER_GLASS)) {
    displayDoorTypes.push(FIBER_GLASS);
  }

  const isSkuOptionalInput =
    doorCategory === LYDEN_DOOR || doorCategory === FIBER_GLASS;

  // Fetch door types (first dropdown) when product category is set
  useEffect(() => {
    if (!productCategory) {
      setDoorTypes([]);
      return;
    }
    const fetchDoorTypes = async () => {
      setLoadingTypes(true);
      try {
        const res = await fetch(`/api/products/door-types?category=${productCategory}`);
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) setDoorTypes(data.data);
        else setDoorTypes([]);
      } catch {
        setDoorTypes([]);
      } finally {
        setLoadingTypes(false);
      }
    };
    fetchDoorTypes();
  }, [productCategory]);

  // Fetch doors (second dropdown) when door category is selected (skip for Lyden door / Fiber glass)
  useEffect(() => {
    if (
      !productCategory ||
      !doorCategory ||
      doorCategory === LYDEN_DOOR ||
      doorCategory === FIBER_GLASS
    ) {
      setDoors([]);
      return;
    }
    const fetchDoors = async () => {
      setLoadingDoors(true);
      try {
        const params = new URLSearchParams({
          category: productCategory,
          doorType: doorCategory,
          limit: "100",
          excludeImages: "true",
        });
        const res = await fetch(`/api/products?${params}`);
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) setDoors(data.data);
        else setDoors([]);
      } catch {
        setDoors([]);
      } finally {
        setLoadingDoors(false);
      }
    };
    fetchDoors();
  }, [productCategory, doorCategory]);

  // Sync local state with quoteData when it changes (e.g., when navigating back/forward)
  useEffect(() => {
    setSelectedFinishOption(quoteData.doorFinishOption || null);
    setDoorCategory(quoteData.doorCategory || "");
    setSelectedDoorId(quoteData.selectedDoorId || "");
    setSelectedDoorName(quoteData.selectedDoorName || "");
    setUploadedFiles(quoteData.uploadedFiles || []);
  }, [
    quoteData.doorFinishOption,
    quoteData.doorCategory,
    quoteData.selectedDoorId,
    quoteData.selectedDoorName,
    quoteData.uploadedFiles,
  ]);

  const handleFinishSelect = (option: string) => {
    setSelectedFinishOption(option);
    setQuoteData({
      ...quoteData,
      doorFinishOption: option,
    });
  };

  const handleDoorCategoryChange = (value: string) => {
    setDoorCategory(value);
    setSelectedDoorId("");
    setSelectedDoorName("");
    setQuoteData({
      ...quoteData,
      doorCategory: value,
      selectedDoorId: "",
      selectedDoorName: "",
    });
  };

  const handleDoorSelect = (door: DoorOption) => {
    setSelectedDoorId(door._id);
    setSelectedDoorName(door.name);
    setQuoteData({
      ...quoteData,
      selectedDoorId: door._id,
      selectedDoorName: door.name,
    });
  };


  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);
    const updatedFiles = [...uploadedFiles, ...newFiles];
    setUploadedFiles(updatedFiles);
    setQuoteData({
      ...quoteData,
      uploadedFiles: updatedFiles,
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const finishOptions = [
    {
      id: "clearwhite",
      image: clearwhite,
      title: "Clear White Brich Prefinished",
      alt: "Clear White Brich Prefinished",
    },
    {
      id: "oak",
      image: oak,
      title: "Clear Oak Prefinished",
      alt: "Placeholder 2",
    },
    {
      id: "primedwhite",
      image: primedwhite,
      title: "Primed White Hardboard",
      alt: "Placeholder 3",
    },
    {
      id: "rotted",
      image: rotted,
      title: "Unfinished Rotary Natural Birch",
      alt: "Placeholder 4",
    },
  ];

  return (
    <div className="mt-[25px] mb-[50px] font-roboto">
      <h2 className="text-[32px] font-[500] font-roboto text-black mb-8">
        Door Finish & Notes
      </h2>

      <div className="w-full border-2 border-gray-100 rounded-xl p-6">
        <h3 className="text-[16px] font-roboto  text-[#0A0A0A]  mb-7">Door Finish</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {finishOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => handleFinishSelect(option.id)}
              className={`
                relative cursor-pointer transition-all flex flex-col overflow-hidden
                rounded-xl shadow-md hover:shadow-lg max-w-[230px] mx-auto border-2
                ${
                  selectedFinishOption === option.id
                    ? "border-[#FF6E4A] bg-white shadow-lg"
                    : "border-gray-200 bg-white"
                }
              `}
            >
              {selectedFinishOption === option.id && (
                <div className="absolute top-3 right-3 z-10">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#FF6E4A] flex items-center justify-center">
                    <svg
                      className="w-3 h-3 md:w-4 md:h-4 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                </div>
              )}

              <div className="relative w-full aspect-[4/3] bg-gradient-to-b from-[#F3F4F6] to-[#E5E7EB] flex items-center justify-center p-3">
                <Image
                  src={option.image}
                  alt={option.alt}
                  width={130}
                  height={130}
                  className="object-contain"
                />
              </div>
              <div className="bg-white p-3 border-t border-gray-200">
                <h4 className="text-[19.48px] font-roboto text-[#2C2C2C] text-center px-4">
                  {option.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full border-2 border-gray-100 rounded-xl p-6 mt-6">
        <h3 className="text-[16px] font-roboto text-[#0A0A0A] mb-4">
          Product Category (Choose Your Door Type)
        </h3>
        {!productCategory ? (
          <p className="text-sm text-gray-500 mb-4">
            Complete step 0 (Choose door category: Interior or Exterior) to see categories.
          </p>
        ) : (
          <select
            value={doorCategory}
            onChange={(e) => handleDoorCategoryChange(e.target.value)}
            className="w-full max-w-md p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 text-black font-roboto"
          >
            <option value="">Select product category</option>
            {loadingTypes ? (
              <option disabled>Loading...</option>
            ) : (
              displayDoorTypes.map((dt) => (
                <option key={dt} value={dt}>
                  {dt}
                </option>
              ))
            )}
          </select>
        )}

        {productCategory && doorCategory && (
          <>
            <h3 className="text-[16px] font-roboto text-[#0A0A0A] mt-6 mb-4">
              SKU <span className="text-gray-500 font-normal">(Optional)</span>
            </h3>
            {isSkuOptionalInput ? (
              <input
                type="text"
                value={selectedDoorName}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedDoorName(value);
                  setQuoteData({
                    ...quoteData,
                    selectedDoorId: "",
                    selectedDoorName: value,
                  });
                }}
                placeholder="Enter SKU (optional)"
                className="w-full max-w-md p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 text-black font-roboto"
              />
            ) : (
              <select
                value={selectedDoorId}
                onChange={(e) => {
                  const value = e.target.value;
                  const door = value ? doors.find((d) => d._id === value) : null;
                  if (door) handleDoorSelect(door);
                  else {
                    setSelectedDoorId("");
                    setSelectedDoorName("");
                    setQuoteData({
                      ...quoteData,
                      selectedDoorId: "",
                      selectedDoorName: "",
                    });
                  }
                }}
                className="w-full max-w-md p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 text-black font-roboto"
              >
                <option value="">Select door</option>
                {loadingDoors ? (
                  <option disabled>Loading...</option>
                ) : (
                  doors.map((d) => (
                    <option key={d._id} value={d._id}>
                      {d.name}
                    </option>
                  ))
                )}
              </select>
            )}
          </>
        )}
      </div>

      <div className="w-full border-2 border-gray-100 rounded-xl p-6 mt-6">
        <h3 className="text-[16px] font-roboto text-[#0A0A0A] mb-2">
          File Upload
        </h3>
        <p className="text-[16px] text-[#717182] mb-6">
          Upload drawing, specifications, or reference images
        </p>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-orange-500 transition-colors bg-gray-50"
        >
          <input
            type="file"
            id="file-upload"
            multiple
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={(e) => handleFileUpload(e.target.files)}
            className="hidden"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="flex flex-col items-center">
              <svg
                className="w-10 h-10 text-gray-400 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-base mb-1">
                <span className="text-orange-500">Click to upload</span>{" "}
                <span className="text-gray-600">or drag and drop</span>
              </p>
              <p className="text-sm text-gray-500">
                PDF, PNG, JPG up to 10MB
              </p>
            </div>
          </label>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
              >
                <span className="text-sm text-gray-700">{file.name}</span>
                <button
                  onClick={() => {
                    const updated = uploadedFiles.filter((_, i) => i !== index);
                    setUploadedFiles(updated);
                    setQuoteData({
                      ...quoteData,
                      uploadedFiles: updated,
                    });
                  }}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Step13;