"use client";

import Image from "next/image";
import { useState } from "react";
import clearwhite from "../../../../../public/assets/images/dummy/clearwhite1.png";
import oak from "../../../../../public/assets/images/dummy/oak1.png";
import primedwhite from "../../../../../public/assets/images/dummy/primed1.png";
import rotted from "../../../../../public/assets/images/dummy/rotary1.png";

interface StepProps {
  quoteData: any;
  setQuoteData: (data: any) => void;
}

const Step13 = ({ quoteData, setQuoteData }: StepProps) => {
  const [selectedFinishOption, setSelectedFinishOption] = useState<string | null>(
    quoteData.doorFinishOption || null
  );

  const [specialInstructions, setSpecialInstructions] = useState<string>(
    quoteData.specialInstructions || ""
  );

  const [uploadedFiles, setUploadedFiles] = useState<File[]>(
    quoteData.uploadedFiles || []
  );

  const handleFinishSelect = (option: string) => {
    setSelectedFinishOption(option);
    setQuoteData({
      ...quoteData,
      doorFinishOption: option,
    });
  };

  const handleSpecialInstructionsChange = (value: string) => {
    setSpecialInstructions(value);
    setQuoteData({
      ...quoteData,
      specialInstructions: value,
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
    <div className="mt-[50px] mb-[50px]">
      <h2 className="text-[32px] font-medium text-black mb-8">
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
                rounded-xl shadow-md hover:shadow-lg max-w-[230px] mx-auto
                ${
                  selectedFinishOption === option.id
                    ? "border-2 border-orange-500 shadow-lg"
                    : ""
                }
              `}
            >
              {selectedFinishOption === option.id && (
                <div className="absolute top-2 right-2 z-10">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
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
        <h3 className="text-[16px] font-roboto text-[#0A0A0A] mb-7">
          Special Instructions
        </h3>

        <textarea
          value={specialInstructions}
          onChange={(e) => handleSpecialInstructionsChange(e.target.value)}
          placeholder="Enter any special requirements, measurements, or instructions...."
          className="w-full p-4 border border-gray-200 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          rows={6}
          style={{ fontSize: "14px", color: "#717182" }}
        />
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