"use client";

import { useState, useEffect } from "react";

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

  // Sync local state with quoteData when it changes (e.g., when navigating back/forward)
  useEffect(() => {
    setFormData({
      firstName: quoteData.firstName || "",
      companyName: quoteData.companyName || "",
      phone: quoteData.phone || "", // Store with +91 prefix if present
      email: quoteData.email || "",
      poNumber: quoteData.poNumber || "",
    });
  }, [quoteData.firstName, quoteData.companyName, quoteData.phone, quoteData.email, quoteData.poNumber]);

  const handleInputChange = (field: string, value: string) => {
    // For phone field, automatically prepend +91 if not already present and value is not empty
    if (field === "phone") {
      // Remove any existing +91 prefix first to avoid duplicates
      value = value.replace(/^\+91\s*/, '');
      // Add +91 prefix if user has entered a value
      if (value) {
        value = "+91" + value;
      }
    }
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    setQuoteData({
      ...quoteData,
      ...updatedData,
    });
  };

  // Get phone number without +91 prefix for display in input
  const getPhoneDisplayValue = (phone: string) => {
    if (!phone) return "";
    return phone.startsWith("+91") ? phone.substring(3) : phone;
  };

  return (
    <div className="mt-[50px] mb-[50px] font-roboto max-w-[950px]">
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
            <div className="relative flex items-center">
              <span className="absolute left-3 text-[14px] text-[#0A0A0A] font-medium z-10">+91</span>
              <input
                type="tel"
                value={getPhoneDisplayValue(formData.phone)}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="1234567890"
                className="w-full h-[50px] border-2 border-[#E9EAEE] rounded-[10px] pl-12 pr-3 py-1 text-[14px] placeholder:text-[14px] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
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