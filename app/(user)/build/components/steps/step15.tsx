"use client";

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

  // Primary specifications (Category, Subcategory, Height, Width, Thickness, Quantity)
  const primarySpecs = [
    { key: "doorType", label: "Category", value: formatValue("doorType", quoteData.doorType) },
    { key: "doorConfig", label: "Subcategory", value: formatValue("doorConfig", quoteData.doorConfig) },
    { key: "height", label: "Height", value: formatValue("height", quoteData.height) },
    { key: "width", label: "Width", value: formatValue("width", quoteData.width) },
    { key: "thickness", label: "Thickness", value: formatValue("thickness", quoteData.thickness) },
    { key: "quantity", label: "Quantity", value: formatValue("quantity", quoteData.quantity) },
  ].filter(spec => spec.value !== "-");

  // All other specifications (excluding primary specs and empty values)
  const otherSpecs = Object.entries(quoteData)
    .filter(([key, value]) => {
      // Filter out empty values, internal fields, and primary specs
      if (!value || value === "" || (Array.isArray(value) && value.length === 0)) return false;
      if (key === "uploadedFiles") return false;
      if (["doorType", "doorConfig", "height", "width", "thickness", "quantity"].includes(key)) return false;
      return true;
    })
    .map(([key, value]) => ({
      key,
      label: getDisplayName(key),
      value: formatValue(key, value),
    }));

  const doorImage = quoteData.doorType ? getDoorImage(quoteData.doorType) : null;

  return (
    <div className="mt-[50px] mb-[50px] max-w-[950px] font-roboto">
      <h2 className="text-[20px] md:text-[32px] font-roboto font-[500] mb-5 md:mb-8 text-black">
        Review & Submit
      </h2>

      <div className="border-2 border-gray-200 rounded-xl p-6">
        {/* First Div - Primary Specifications with Image */}
        <div className="flex flex-col md:flex-row gap-6 mb-6 pb-6 border-b border-gray-200">
          {/* Left Side - Primary Specs */}
          <div className="flex-1">
            <h3 className="text-[14px] md:text-[16px] font-roboto font-[400] text-[#0A0A0A] mb-6">
              Door Specifications
            </h3>
            <div className="space-y-4">
              {primarySpecs.map((spec, index) => (
                <div key={index} className="flex justify-between items-start border-b border-gray-100 pb-3">
                  <span className="text-[14px] md:text-[16px] font-roboto font-[400] text-black">
                    {spec.label}:
                  </span>
                  <span className="text-[14px] md:text-[16px] font-roboto font-[400] text-gray-700 ml-4">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Edit Button and Image */}
          <div className="md:w-[250px] flex flex-col items-end md:items-start">
            {/* Edit Button - Top Right */}
            <div className="flex items-center gap-2 mb-4">
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
            </div>
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

        {/* Second Div - All Other Specifications */}
        <div className="space-y-4">
          {otherSpecs.map((spec, index) => (
            <div key={index} className="flex justify-between items-start border-b border-gray-100 pb-3">
              <span className="text-[14px] md:text-[16px] font-roboto font-[400] text-black">
                {spec.label}:
              </span>
              <span className="text-[14px] md:text-[16px] font-roboto font-[400] text-gray-700 ml-4">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step15;
