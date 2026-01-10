"use client";

import { useState } from "react";
import Image from "next/image";
import FiberDoorImage from "../../../../../public/assets/images/landing/door41.png";
import HollowCoreDoorImage from "../../../../../public/assets/images/landing/door5050.png";
import ParticleCoreDoorImage from "../../../../../public/assets/images/dummy/door5151.png";
import SCLCDoorImage from "../../../../../public/assets/images/landing/door33.png";
import OtherDoorImage from "../../../../../public/assets/images/dummy/door531.png";
import WoodCoreDoorImage from "../../../../../public/assets/images/dummy/door54.png";

interface StepProps {
  quoteData: any;
  setQuoteData: (data: any) => void;
}

const Step15 = ({ quoteData, setQuoteData }: StepProps) => {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editedValues, setEditedValues] = useState<{ [key: string]: any }>({});
  // Map doorType to image
  const getDoorImage = (doorType: string) => {
    const imageMap: { [key: string]: any } = {
      "Fibre Glass Door": FiberDoorImage,
      "Hollow Core Door": HollowCoreDoorImage,
      "Particle Core Door": ParticleCoreDoorImage,
      "Wood Core Door": WoodCoreDoorImage,
      "Solid Core Laminated Construction (SCLC)": SCLCDoorImage,
      "Other (Special Order)": OtherDoorImage,
    };
    return imageMap[doorType] || FiberDoorImage;
  };

  // Format values for display
  const formatValue = (key: string, value: any): string => {
    if (!value || value === "") return "-";
    if (Array.isArray(value)) return value.length > 0 ? `${value.length} file(s)` : "-";
    
    const stringValue = String(value);
    
    // Format specific values
    const valueFormatters: { [key: string]: { [value: string]: string } } = {
      jambType: {
        "interior_double_rabbet": "Interior Double Rabbet",
        "exterior_single_rabbet": "Exterior Single Rabbet",
        "exterior_single_rabbet_kerfed": "Exterior Single Rabbet Kerfed",
      },
      dbStrikeType: {
        "standard": "Standard",
        "radius_corner": "Radius Corner",
        "box_strike": "Box Strike",
      },
      lockStrikeType: {
        "standard": "Standard",
        "radius_corner": "Radius Corner",
        "t_strike": "T-Strike",
      },
      weatherstripping: {
        "white": "White",
        "brown": "Brown",
      },
      thresholdType: {
        "adjustable_in_swing": "Adjustable In-swing",
        "out_swing": "Out-Swing",
        "flat_saddle": "Flat / Saddle",
      },
      hangDoorOption: {
        "none": "None (pre-hung door)",
        "plain_bearing": "Plain Bearing Hinges",
        "ball_bearing": "Ball Bearing Hinges",
      },
      protectDoorOption: {
        "none": "None",
        "threshold": "Threshold",
        "usweep": "Door Sweep (U-Sweep)",
        "staple": "Staple on Sweep",
      },
      addOnOption: {
        "none": "None",
        "viewer": "Door Viewer (TD-VIEWER)",
      },
      lockType: {
        "deadbolt": "Deadbolt",
        "door_knob": "Door Knob",
      },
      doorFinishOption: {
        "clearwhite": "Clear White Brich Prefinished",
        "oak": "Clear Oak Prefinished",
        "primedwhite": "Primed White Hardboard",
        "rotted": "Unfinished Rotary Natural Birch",
      },
      doorConfig: {
        "Single Door": "Single Door",
        "Double Door": "Double Door",
      },
    };

    if (valueFormatters[key] && valueFormatters[key][stringValue]) {
      return valueFormatters[key][stringValue];
    }
    
    return stringValue;
  };

  // Get display name from field key
  const getDisplayName = (key: string): string => {
    const nameMap: { [key: string]: string } = {
      doorType: "Category",
      doorConfig: "Subcategory",
      width: "Width",
      height: "Height",
      thickness: "Thickness",
      quantity: "Quantity",
      wallBuilt: "Wall Built",
      wallThickness: "Wall Thickness",
      customDiameter: "Custom Diameter",
      doorHandling: "Door Handling",
      hingeRadius: "Hinge Radius",
      hingeType: "Hinge Type",
      hingeLocation1: "Hinge 1 Location",
      hingeLocation2: "Hinge 2 Location",
      hingeLocation3: "Hinge 3 Location",
      backset: "Backset",
      louver: "Louver",
      lockType: "Lock Type",
      lockBoreDiameter: "Lock Bore Diameter",
      lockBackset: "Lock Backset",
      lockCenterline: "Lock Centerline",
      latchBoreDiameter: "Latch Bore Diameter",
      faceplateDimension: "Faceplate Dimension",
      faceplateRadius: "Faceplate Radius",
      driveInDiameter: "Drive-In Diameter",
      jambType: "Jamb Type",
      jambSize: "Jamb Size",
      dbStrikeType: "DB Strike Type",
      lockStrikeType: "Lock Strike Type",
      undercutMeasurement: "Undercut Measurement",
      weatherstripping: "Weatherstripping",
      thresholdType: "Threshold Type",
      hangDoorOption: "Hang Door",
      protectDoorOption: "Protect Door",
      addOnOption: "Add On",
      doorFinishOption: "Door Finish",
      specialInstructions: "Special Instructions",
      firstName: "Name",
      companyName: "Company / Job Name",
      phone: "Phone",
      email: "Email",
      poNumber: "PO Number",
    };
    return nameMap[key] || key;
  };

  // Primary specifications (Category, Subcategory, Width, Height, Thickness, Quantity, Wall Built, Wall Thickness)
  // For Wall Thickness, use wallThickness if available, otherwise use customDiameter
  const wallThicknessValue = quoteData.wallThickness || quoteData.customDiameter || "";
  
  const primarySpecs = [
    { key: "doorType", label: "Category", value: formatValue("doorType", quoteData.doorType) },
    { key: "doorConfig", label: "Subcategory", value: formatValue("doorConfig", quoteData.doorConfig) },
    { key: "width", label: "Width", value: formatValue("width", quoteData.width) },
    { key: "height", label: "Height", value: formatValue("height", quoteData.height) },
    { key: "thickness", label: "Thickness", value: formatValue("thickness", quoteData.thickness) },
    { key: "quantity", label: "Quantity", value: formatValue("quantity", quoteData.quantity) },
    { key: "wallBuilt", label: "Wall Built", value: formatValue("wallBuilt", quoteData.wallBuilt) },
    { key: "wallThickness", label: "Wall Thickness", value: formatValue("wallThickness", wallThicknessValue) },
  ].filter(spec => spec.value !== "-");

  // Handing & Hinges specifications (Door Handling, Hinge Radius, Hinge Type, Hinge Locations, Backset)
  const handingHingesSpecs = [
    { key: "doorHandling", label: "Door Handling", value: formatValue("doorHandling", quoteData.doorHandling) },
    { key: "hingeRadius", label: "Hinge Radius", value: formatValue("hingeRadius", quoteData.hingeRadius) },
    { key: "hingeType", label: "Hinge Type", value: formatValue("hingeType", quoteData.hingeType) },
    { key: "hingeLocation1", label: "Hinge 1 Location", value: formatValue("hingeLocation1", quoteData.hingeLocation1) },
    { key: "hingeLocation2", label: "Hinge 2 Location", value: formatValue("hingeLocation2", quoteData.hingeLocation2) },
    { key: "hingeLocation3", label: "Hinge 3 Location", value: formatValue("hingeLocation3", quoteData.hingeLocation3) },
    { key: "backset", label: "Backset", value: formatValue("backset", quoteData.backset) },
  ].filter(spec => spec.value !== "-");

  // Your Details specifications (Name, Email, Company/Job Name, Phone, PO Number)
  const yourDetailsSpecs = [
    { key: "firstName", label: "Name", value: formatValue("firstName", quoteData.firstName) },
    { key: "email", label: "Email", value: formatValue("email", quoteData.email) },
    { key: "companyName", label: "Company / Job Name", value: formatValue("companyName", quoteData.companyName) },
    { key: "phone", label: "Phone", value: formatValue("phone", quoteData.phone) },
    { key: "poNumber", label: "PO Number", value: formatValue("poNumber", quoteData.poNumber) },
  ].filter(spec => spec.value !== "-");

  // Lock information and all other specifications (excluding primary specs, handing & hinges specs, and your details specs)
  const lockInfoSpecs = Object.entries(quoteData)
    .filter(([key, value]) => {
      // Filter out empty values, internal fields, primary specs, handing & hinges specs, and your details specs
      if (!value || value === "" || (Array.isArray(value) && value.length === 0)) return false;
      if (key === "uploadedFiles") return false;
      // Exclude primary specs, customDiameter, handing & hinges specs, and your details specs
      const excludedKeys = [
        "doorType", "doorConfig", "category", "width", "height", "thickness", "quantity", 
        "wallBuilt", "wallThickness", "customDiameter",
        "doorHandling", "hingeRadius", "hingeType", 
        "hingeLocation1", "hingeLocation2", "hingeLocation3", "backset",
        "firstName", "email", "companyName", "phone", "poNumber"
      ];
      if (excludedKeys.includes(key)) return false;
      return true;
    })
    .map(([key, value]) => ({
      key,
      label: getDisplayName(key),
      value: formatValue(key, value),
    }));

  const doorImage = quoteData.doorType ? getDoorImage(quoteData.doorType) : null;

  // Handle edit button click
  const handleEditClick = (section: string) => {
    setEditingSection(section);
    const initialValues: { [key: string]: any } = {};
    
    let specs: any[] = [];
    if (section === "primary") {
      specs = primarySpecs;
    } else if (section === "handing") {
      specs = handingHingesSpecs;
    } else if (section === "lock") {
      specs = lockInfoSpecs;
    } else if (section === "details") {
      specs = yourDetailsSpecs;
    }

    specs.forEach((spec) => {
      // Get the actual value from quoteData (not formatted)
      if (spec.key === "wallThickness") {
        initialValues[spec.key] = quoteData.wallThickness || quoteData.customDiameter || "";
      } else {
        initialValues[spec.key] = quoteData[spec.key] || "";
      }
    });
    setEditedValues(initialValues);
  };

  // Handle input change
  const handleInputChange = (key: string, value: string) => {
    setEditedValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Handle save
  const handleSave = (section: string) => {
    const updates: { [key: string]: any } = {};
    
    Object.keys(editedValues).forEach((key) => {
      if (key === "wallThickness") {
        // Handle special case for wallThickness
        if (editedValues[key]) {
          updates.wallThickness = editedValues[key];
          updates.customDiameter = "";
        }
      } else {
        updates[key] = editedValues[key];
      }
    });

    setQuoteData((prev: any) => ({
      ...prev,
      ...updates,
    }));
    
    setEditingSection(null);
    setEditedValues({});
  };

  // Handle cancel
  const handleCancel = () => {
    setEditingSection(null);
    setEditedValues({});
  };

  // Get raw value for input (not formatted)
  const getRawValue = (key: string): string => {
    if (editingSection && editedValues.hasOwnProperty(key)) {
      return editedValues[key] || "";
    }
    if (key === "wallThickness") {
      return quoteData.wallThickness || quoteData.customDiameter || "";
    }
    return quoteData[key] || "";
  };

  // Render spec row (either display or edit mode)
  const renderSpecRow = (spec: { key: string; label: string; value: string }, section: string) => {
    if (editingSection === section) {
      return (
        <div key={spec.key} className="flex justify-between items-center border-b border-gray-100 pb-3">
          <span className="text-[14px] md:text-[16px] font-roboto font-[400] text-black">
            {spec.label}:
          </span>
          <input
            type="text"
            value={getRawValue(spec.key)}
            onChange={(e) => handleInputChange(spec.key, e.target.value)}
            className="text-[14px] md:text-[16px] font-roboto font-[400] text-gray-700 ml-4 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-orange-500 w-[150px] md:w-[200px]"
          />
        </div>
      );
    }
    return (
      <div key={spec.key} className="flex justify-between items-start border-b border-gray-100 pb-3">
        <span className="text-[14px] md:text-[16px] font-roboto font-[400] text-black">
          {spec.label}:
        </span>
        <span className="text-[14px] md:text-[16px] font-roboto font-[400] text-gray-700 ml-4">
          {spec.value}
        </span>
      </div>
    );
  };

  // Render edit button or save/cancel buttons
  const renderEditButtons = (section: string) => {
    if (editingSection === section) {
      return (
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSave(section)}
            className="flex items-center gap-1 px-3 py-1 bg-orange-500 text-white rounded text-[12px] md:text-[14px] font-roboto hover:bg-orange-600 transition-colors"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center gap-1 px-3 py-1 bg-gray-300 text-black rounded text-[12px] md:text-[14px] font-roboto hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      );
    }
    return (
      <button
        onClick={() => handleEditClick(section)}
        className="flex items-center gap-2 cursor-pointer"
      >
        <span className="text-[14px] md:text-[16px] font-roboto font-[400] text-black">Edit</span>
        <svg
          className="w-4 h-4 text-black"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>
    );
  };

  return (
    <div className="mt-[50px] mb-[50px] max-w-[950px] font-roboto">
      <h2 className="text-[20px] md:text-[32px] font-roboto font-[500] mb-5 md:mb-8 text-black">
        Review & Submit
      </h2>

      {/* First Box - Primary Specifications with Image */}
      <div className="border-2 border-gray-200 rounded-xl p-6 mb-6">
        {/* Subheading and Edit Button - Flex Between (Full Width) */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[14px] md:text-[16px] font-roboto font-[400] text-[#0A0A0A]">
            Door Specifications
          </h3>
          {/* Edit/Save/Cancel Button - Top Right */}
          {renderEditButtons("primary")}
        </div>
        {/* Content Row - Specs on Left, Image on Right */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Side - Primary Specs */}
          <div className="flex-1">
            <div className="space-y-4">
              {primarySpecs.map((spec) => renderSpecRow(spec, "primary"))}
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="md:w-[250px] flex flex-col items-start md:items-center">
            {/* Category Image - Small Size */}
            {doorImage && (
              <div className="relative w-[150px] h-[120px] bg-gradient-to-b from-[#F3F4F6] to-[#E5E7EB] rounded-lg p-3 flex items-center justify-center">
                <Image
                  src={doorImage}
                  alt={quoteData.doorType || "Door"}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Second Box - Handing & Hinges */}
      <div className="border-2 border-gray-200 rounded-xl p-8 md:p-6 mb-6">
        {/* Subheading and Edit Button - Flex Between */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-300">
          <h3 className="text-[14px] md:text-[16px] font-roboto font-[400] text-[#0A0A0A]">
            Handing & Hinges
          </h3>
          {/* Edit/Save/Cancel Button - Top Right */}
          {renderEditButtons("handing")}
        </div>
        <div className="space-y-4">
          {handingHingesSpecs.map((spec) => renderSpecRow(spec, "handing"))}
        </div>
      </div>

      {/* Third Box - Lock Information */}
      <div className="border-2 border-gray-200 rounded-xl  p-8 md:p-6  mb-6">
        {/* Subheading and Edit Button - Flex Between */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-300">
          <h3 className="text-[14px] md:text-[16px] font-roboto font-[400] text-[#0A0A0A]">
            Lock information
          </h3>
          {/* Edit/Save/Cancel Button - Top Right */}
          {renderEditButtons("lock")}
        </div>
        <div className="space-y-4">
          {lockInfoSpecs.map((spec) => renderSpecRow(spec, "lock"))}
        </div>
      </div>

      {/* Fourth Box - Your Details */}
      <div className="border-2 border-gray-200 rounded-xl p-8 md:p-6">
        {/* Subheading and Edit Button - Flex Between */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-300 ">
          <h3 className="text-[14px] md:text-[16px] font-roboto font-[400] text-[#0A0A0A]">
            Your Details
          </h3>
          {/* Edit/Save/Cancel Button - Top Right */}
          {renderEditButtons("details")}
        </div>
        <div className="space-y-4">
          {yourDetailsSpecs.map((spec) => renderSpecRow(spec, "details"))}
        </div>
      </div>
    </div>
  );
};

export default Step15;
