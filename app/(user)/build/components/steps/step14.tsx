"use client";

import { useState } from "react";

interface StepProps {
  quoteData: any;
  setQuoteData: (data: any) => void;
}

const Step14 = ({ quoteData, setQuoteData }: StepProps) => {
  const [formData, setFormData] = useState({
    firstName: quoteData.firstName || "",
    companyName: quoteData.companyName || "",
    phone: quoteData.phone || "",
    email: quoteData.email || "",
    poNumber: quoteData.poNumber || "",
  });

  const handleInputChange = (field: string, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    setQuoteData({
      ...quoteData,
      ...updatedData,
    });
  };

  return (
    <div className="mt-[50px] mb-[50px] font-roboto">
      <h2 className="text-[32px] font-medium text-black mb-8">Your Details</h2>

      <div className="w-full border-2 border-gray-100 rounded-xl p-6">
        <h3 className="text-[16px] font-roboto text-[#0A0A0A] mb-6">
          Contact Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* First Name */}
          <div>
            <label className="block text-[14px] font-medium text-[#0A0A0A] mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              placeholder="Full name"
              className="w-full h-[50px] border-2 border-[#E9EAEE] rounded-[10px] px-3 py-1 text-[14px] placeholder:text-[14px] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Company / Job Name */}
          <div>
            <label className="block text-[14px] font-medium text-[#0A0A0A] mb-2">
              Company / Job Name
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              placeholder="Company or project name"
              className="w-full h-[50px] border-2 border-[#E9EAEE] rounded-[10px] px-3 py-1 text-[14px] placeholder:text-[14px] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Phone */}
          <div>
            <label className="block text-[14px] font-medium text-[#0A0A0A] mb-2">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="(555) 123-4567"
              className="w-full h-[50px] border-2 border-[#E9EAEE] rounded-[10px] px-3 py-1 text-[14px] placeholder:text-[14px] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-[14px] font-medium text-[#0A0A0A] mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="email@example.com"
              className="w-full h-[50px] border-2 border-[#E9EAEE] rounded-[10px] px-3 py-1 text-[14px] placeholder:text-[14px] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* PO Number - Full Width */}
        <div>
          <label className="block text-[14px] font-medium text-[#0A0A0A] mb-2">
            PO Number
          </label>
          <input
            type="text"
            value={formData.poNumber}
            onChange={(e) => handleInputChange("poNumber", e.target.value)}
            placeholder="Enter Number"
            className="w-full h-[50px] border-2 border-[#E9EAEE] rounded-[10px] px-3 py-1 text-[14px] placeholder:text-[14px] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default Step14;