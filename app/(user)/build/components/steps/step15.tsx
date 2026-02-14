"use client";

import { useState } from "react";
import Image from "next/image";
import FiberDoorImage from "../../../../../public/assets/images/landing/door41.png";
import HollowCoreDoorImage from "../../../../../public/assets/images/landing/door5050.png";
import ParticleCoreDoorImage from "../../../../../public/assets/images/dummy/door5151.png";
import SCLCDoorImage from "../../../../../public/assets/images/landing/door33.png";
import OtherDoorImage from "../../../../../public/assets/images/dummy/door531.png";
import WoodCoreDoorImage from "../../../../../public/assets/images/dummy/door54.png";

// Format specific values
const valueFormatters: { [key: string]: { [value: string]: string } } = {
  jambType: {
    interior_double_rabbet: "Interior Double Rabbet",
    exterior_single_rabbet: "Exterior Single Rabbet",
    exterior_single_rabbet_kerfed: "Exterior Single Rabbet Kerfed",
    none: "None",
  },
  dbStrikeType: {
    standard: "Standard",
    radius_corner: "Radius Corner",
    box_strike: "Box Strike",
    none: "None",
  },
  lockStrikeType: {
    standard: "Standard",
    radius_corner: "Radius Corner",
    t_strike: "T-Strike",
    none: "None",
  },
  weatherstripping: {
    white: "White",
    brown: "Brown",
    none: "None",
  },
  thresholdType: {
    adjustable_in_swing: "Adjustable In-swing",
    out_swing: "Out-Swing",
    flat_saddle: "Flat / Saddle",
    none: "None",
  },
  hangDoorOption: {
    none: "None (pre-hung door)",
    plain_bearing: "Plain Bearing Hinges",
    ball_bearing: "Ball Bearing Hinges",
  },
  protectDoorOption: {
    none: "None",
    threshold: "Threshold",
    usweep: "Door Sweep (U-Sweep)",
    staple: "Staple on Sweep",
  },
  addOnOption: {
    none: "None",
    viewer: "Door Viewer (TD-VIEWER)",
  },
  lockType: {
    deadbolt: "Deadbolt",
    door_knob: "Door Knob",
  },
  doorFinishOption: {
    clearwhite: "Clear White Brich Prefinished",
    oak: "Clear Oak Prefinished",
    primedwhite: "Primed White Hardboard",
    rotted: "Unfinished Rotary Natural Birch",
  },
  doorConfig: {
    "Single Door": "Single Door",
    "Double Door": "Double Door",
  },
  doorHandling: {
    LH: "LH",
    RH: "RH",
    LHRA: "LHRA",
    LHA: "LHA",
    RHA: "RHA",
    RHRA: "RHRA",
  },
  hingeRadius: {
    "1/4": '1/4" Round Corner',
    "5/8": '5/8" Round Corner',
    square: "Square",
  },
  hingeType: {
    residential: "Residential",
    commercial: "Commercial",
  },
  wallBuilt: {
    yes: "Yes",
    no: "No",
  },
  wallThickness: {
    '4-5/8" (w/wood stud)': '4-5/8" (w/wood stud)',
    '4-7/8" (w/wood stud)': '4-7/8" (w/wood stud)',
    '6-1/8" (w/wood stud)': '6-1/8" (w/wood stud)',
    '6-3/4" (w/wood stud)': '6-3/4" (w/wood stud)',
  },
  louver: {
    "No Louver": "No Louver",
    '12"x12"': '12"x12"',
    '24"x12"': '24"x12"',
    '24"x18"': '24"x18"',
    "LL- Top and Bottom": "LL- Top and Bottom",
    "Full Louver": "Full Louver",
  },
  lockBoreDiameter: {
    "1": '1"',
    "7/8": '⅞"',
  },
  lockBackset: {
    "2_3/8": '2 ⅜"',
    "2_3/4": '2 ¾"',
  },
  faceplateDimension: {
    '1" x 2 1/4" x 5/32"': '1" x 2 ¼" x 5/32"',
    '1 1/8" x 2 1/4" x 5/32"': '1 ⅛" x 2 ¼" x 5/32"',
  },
  driveInDiameter: {
    '7/8"': '⅞"',
    '1"': '1"',
  },
  faceplateRadius: {
    '1/4" radius': '¼" Radius',
    square: "Square",
  },
  doorType: {
    "Fibre Glass Door": "Fibre Glass Door",
    "Hollow Core Door": "Hollow Core Door",
    "Particle Core Door": "Particle Core Door",
    "Wood Core Door": "Wood Core Door",
    "Solid Core Laminated Construction (SCLC)":
      "Solid Core Laminated Construction (SCLC)",
    "Other (Special Order)": "Other (Special Order)",
  },
  width: {
    "24": '24"',
    "28": '28"',
    "30": '30"',
    "32": '32"',
    "36": '36"',
    "42": '42"',
    "48": '48"',
  },
  height: {
    "80": '80" (6\'8")',
    "84": '84" (7\'0")',
    "96": '96" (8\'0")',
  },
  thickness: {
    '1 3/8"': '1 ⅜"',
    '1 3/4"': '1 ¾"',
  },
};

interface StepProps {
  quoteData: any;
  setQuoteData: (data: any) => void;
}

const Step15 = ({ quoteData, setQuoteData }: StepProps) => {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editedValues, setEditedValues] = useState<{ [key: string]: any }>({});
  const [isDownloading, setIsDownloading] = useState(false);

  // Download PDF function
  const downloadPDF = async () => {
    setIsDownloading(true);
    try {
      // Convert File objects to base64 if they exist
      const convertFileToBase64 = (
        file: File,
      ): Promise<{ name: string; base64: string; type: string }> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const base64String = (reader.result as string).split(",")[1]; // Remove data:type;base64, prefix
            resolve({
              name: file.name,
              base64: base64String,
              type: file.type || "application/octet-stream",
            });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      };

      // Prepare quote data with base64 images
      let preparedQuoteData = { ...quoteData };
      if (
        quoteData.uploadedFiles &&
        Array.isArray(quoteData.uploadedFiles) &&
        quoteData.uploadedFiles.length > 0
      ) {
        // Check if files are File objects or already base64
        const filePromises = quoteData.uploadedFiles
          .map((file: any) => {
            if (file instanceof File) {
              return convertFileToBase64(file);
            } else if (file && typeof file === "object" && file.base64) {
              // Already converted to base64 format
              return Promise.resolve(file);
            }
            return null;
          })
          .filter(Boolean);

        preparedQuoteData = {
          ...quoteData,
          uploadedFiles: await Promise.all(filePromises),
        };
      }

      const response = await fetch("/api/quote/download-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quoteData: preparedQuoteData }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      // Get the PDF blob
      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      // Set filename
      const fileName = `HawaiiDoor_Specifications_${quoteData.firstName || "Quote"}_${new Date().toISOString().split("T")[0]}.pdf`;
      link.setAttribute("download", fileName);

      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to download PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };
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

  const customFields = [
    "doorType",
    "width",
    "height",
    "thickness",
    "wallThickness",
    "lockBoreDiameter",
    "faceplateDimension",
    "lockBackset",
    "driveInDiameter",
    "faceplateRadius",
  ];

  // Format values for display
  const formatValue = (key: string, value: any): string => {
    if (!value || value === "") return "-";
    if (Array.isArray(value)) {
      if (key === "lockType")
        return value
          .map((v: string) => valueFormatters.lockType?.[v])
          .filter(Boolean)
          .join(", ") || "-";
      return value.length > 0 ? `${value.length} file(s)` : "-";
    }

    const stringValue = String(value);

    // Format specific values

    if (valueFormatters[key] && valueFormatters[key][stringValue]) {
      return valueFormatters[key][stringValue];
    }

    return stringValue;
  };

  // Get display name from field key
  const getDisplayName = (key: string): string => {
    const nameMap: { [key: string]: string } = {
      doorType: "Category",
      doorConfig: "Type",
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
      doorCategory: "Product Category",
      selectedDoorName: "Door Name (SKU)",
      specialInstructions: "Special Instructions",
      firstName: "Name",
      companyName: "Company / Job Name",
      phone: "Phone",
      email: "Email",
      poNumber: "PO Number",
    };
    return nameMap[key] || key;
  };

  // Primary specifications (Category, Type, Width, Height, Thickness, Quantity)
  const primarySpecs = [
    {
      key: "doorType",
      label: "Category",
      value: formatValue("doorType", quoteData.doorType),
    },
    {
      key: "doorConfig",
      label: "Type",
      value: formatValue("doorConfig", quoteData.doorConfig),
    },
    {
      key: "width",
      label: "Width",
      value: formatValue("width", quoteData.width),
    },
    {
      key: "height",
      label: "Height",
      value: formatValue("height", quoteData.height),
    },
    {
      key: "thickness",
      label: "Thickness",
      value: formatValue("thickness", quoteData.thickness),
    },
    {
      key: "quantity",
      label: "Quantity",
      value: formatValue("quantity", quoteData.quantity),
    },
  ].filter((spec) => spec.value !== "-");

  // Other Details specifications (Wall Built, Wall Thickness, Louver)
  // For Wall Thickness, use wallThickness if available, otherwise use customDiameter
  const wallThicknessValue =
    quoteData.wallThickness || quoteData.customDiameter || "";
  const otherDetailsSpecs = [
    {
      key: "wallBuilt",
      label: "Wall Built",
      value: formatValue("wallBuilt", quoteData.wallBuilt),
    },
    {
      key: "wallThickness",
      label: "Wall Thickness",
      value: formatValue("wallThickness", wallThicknessValue),
    },
    {
      key: "louver",
      label: "Louver",
      value: formatValue("louver", quoteData.louver),
    },
  ].filter((spec) => spec.value !== "-");

  // Handing & Hinges specifications (Door Handling, Hinge Radius, Hinge Type, Hinge Locations, Backset)
  const handingHingesSpecs = [
    {
      key: "doorHandling",
      label: "Door Handing",
      value: formatValue("doorHandling", quoteData.doorHandling),
    },
    {
      key: "hingeRadius",
      label: "Hinge Radius",
      value: formatValue("hingeRadius", quoteData.hingeRadius),
    },
    {
      key: "hingeType",
      label: "Hinge Type",
      value: formatValue("hingeType", quoteData.hingeType),
    },
    {
      key: "hingeLocation1",
      label: "Hinge 1 Location",
      value: formatValue("hingeLocation1", quoteData.hingeLocation1),
    },
    {
      key: "hingeLocation2",
      label: "Hinge 2 Location",
      value: formatValue("hingeLocation2", quoteData.hingeLocation2),
    },
    {
      key: "hingeLocation3",
      label: "Hinge 3 Location",
      value: formatValue("hingeLocation3", quoteData.hingeLocation3),
    },
    {
      key: "backset",
      label: "Backset",
      value: formatValue("backset", quoteData.backset),
    },
  ].filter((spec) => spec.value !== "-");

  // Your Details specifications (Name, Email, Company/Job Name, Phone, PO Number)
  const yourDetailsSpecs = [
    {
      key: "firstName",
      label: "Name",
      value: formatValue("firstName", quoteData.firstName),
    },
    {
      key: "email",
      label: "Email",
      value: formatValue("email", quoteData.email),
    },
    {
      key: "companyName",
      label: "Company / Job Name",
      value: formatValue("companyName", quoteData.companyName),
    },
    {
      key: "phone",
      label: "Phone",
      value: formatValue("phone", quoteData.phone),
    },
    {
      key: "poNumber",
      label: "PO Number",
      value: formatValue("poNumber", quoteData.poNumber),
    },
  ].filter((spec) => spec.value !== "-");

  // Jamb specifications
  const jambSpecs = [
    {
      key: "jambType",
      label: "Jamb Type",
      value: formatValue("jambType", quoteData.jambType),
    },
    {
      key: "jambSize",
      label: "Jamb Size",
      value: formatValue("jambSize", quoteData.jambSize),
    },
    {
      key: "dbStrikeType",
      label: "DB Strike Type",
      value: formatValue("dbStrikeType", quoteData.dbStrikeType),
    },
    {
      key: "lockStrikeType",
      label: "Lock Strike Type",
      value: formatValue("lockStrikeType", quoteData.lockStrikeType),
    },
    {
      key: "undercutMeasurement",
      label: "Undercut Measurement",
      value: formatValue("undercutMeasurement", quoteData.undercutMeasurement),
    },
    {
      key: "weatherstripping",
      label: "Weatherstripping",
      value: formatValue("weatherstripping", quoteData.weatherstripping),
    },
    {
      key: "thresholdType",
      label: "Threshold Type",
      value: formatValue("thresholdType", quoteData.thresholdType),
    },
  ].filter((spec) => spec.value !== "-");

  // Options specifications (Hang Door, Protect Door, Add On)
  const optionsSpecs = [
    {
      key: "hangDoorOption",
      label: "Hang Door",
      value: formatValue("hangDoorOption", quoteData.hangDoorOption),
    },
    {
      key: "protectDoorOption",
      label: "Protect Door",
      value: formatValue("protectDoorOption", quoteData.protectDoorOption),
    },
    {
      key: "addOnOption",
      label: "Add On",
      value: formatValue("addOnOption", quoteData.addOnOption),
    },
  ].filter((spec) => spec.value !== "-");

  // Door Finish & Notes specifications
  const getFileUploadStatus = (): string => {
    if (
      quoteData.uploadedFiles &&
      Array.isArray(quoteData.uploadedFiles) &&
      quoteData.uploadedFiles.length > 0
    ) {
      const fileCount = quoteData.uploadedFiles.length;
      return `${fileCount} file${fileCount > 1 ? "s" : ""} uploaded`;
    }
    return "No files uploaded";
  };

  const doorFinishNotesSpecs = [
    {
      key: "doorFinishOption",
      label: "Door Finish",
      value: formatValue("doorFinishOption", quoteData.doorFinishOption),
    },
    {
      key: "doorCategory",
      label: "Product Category",
      value: quoteData.doorCategory || "-",
    },
    {
      key: "selectedDoorName",
      label: "Door Name (SKU)",
      value: quoteData.selectedDoorName || "-",
    },
    {
      key: "fileUploadStatus",
      label: "File Upload Status",
      value: getFileUploadStatus(),
    },
  ].filter((spec) => {
    if (spec.key === "fileUploadStatus") return true;
    return spec.value !== "-";
  });

  // Lock information and all other specifications (excluding primary specs, other details, handing & hinges, jamb, pre-hanging, door finish & notes specs, and your details specs)
  const lockInfoSpecs = Object.entries(quoteData)
    .filter(([key, value]) => {
      // Filter out empty values, internal fields, primary specs, handing & hinges specs, and your details specs
      if (
        !value ||
        value === "" ||
        (Array.isArray(value) && value.length === 0)
      )
        return false;
      if (key === "uploadedFiles") return false;
      // Exclude primary specs, other details, handing & hinges, jamb, pre-hanging specs, and your details specs
      const excludedKeys = [
        "doorType",
        "doorConfig",
        "category",
        "width",
        "height",
        "thickness",
        "quantity",
        "wallBuilt",
        "wallThickness",
        "customDiameter",
        "louver",
        "doorHandling",
        "hingeRadius",
        "hingeType",
        "hingeLocation1",
        "hingeLocation2",
        "hingeLocation3",
        "backset",
        "jambType",
        "jambSize",
        "dbStrikeType",
        "lockStrikeType",
        "undercutMeasurement",
        "weatherstripping",
        "thresholdType",
        "hangDoorOption",
        "protectDoorOption",
        "addOnOption",
        "doorFinishOption",
        "doorCategory",
        "selectedDoorId",
        "selectedDoorName",
        "specialInstructions",
        "firstName",
        "email",
        "companyName",
        "phone",
        "poNumber",
      ];
      if (excludedKeys.includes(key)) return false;
      return true;
    })
    .map(([key, value]) => ({
      key,
      label: getDisplayName(key),
      value: formatValue(key, value),
    }));

  const doorImage = quoteData.doorType
    ? getDoorImage(quoteData.doorType)
    : null;

  // Handle edit button click
  const handleEditClick = (section: string) => {
    setEditingSection(section);
    const initialValues: { [key: string]: any } = {};

    let specs: any[] = [];
    if (section === "primary") {
      specs = primarySpecs;
    } else if (section === "other") {
      specs = otherDetailsSpecs;
    } else if (section === "handing") {
      specs = handingHingesSpecs;
    } else if (section === "jamb") {
      specs = jambSpecs;
    } else if (section === "options") {
      specs = optionsSpecs;
    } else if (section === "doorFinishNotes") {
      specs = doorFinishNotesSpecs;
    } else if (section === "lock") {
      specs = lockInfoSpecs;
    } else if (section === "details") {
      specs = yourDetailsSpecs;
    }

    specs.forEach((spec) => {
      // Get the actual value from quoteData (not formatted)
      if (spec.key === "wallThickness") {
        initialValues[spec.key] =
          quoteData.wallThickness || quoteData.customDiameter || "";
      } else if (spec.key === "lockType") {
        const v = quoteData.lockType;
        initialValues[spec.key] = Array.isArray(v)
          ? v
          : v
            ? [v]
            : [];
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
  const getRawValue = (key: string): string | string[] => {
    if (editingSection && editedValues.hasOwnProperty(key)) {
      return editedValues[key] ?? (key === "lockType" ? [] : "");
    }
    if (key === "wallThickness") {
      return quoteData.wallThickness || quoteData.customDiameter || "";
    }
    if (key === "lockType") {
      const v = quoteData.lockType;
      return Array.isArray(v) ? v : v ? [v] : [];
    }
    return quoteData[key] || "";
  };

  const handleLockTypeChange = (type: string) => {
    const current = (editedValues.lockType as string[]) || (Array.isArray(quoteData.lockType) ? quoteData.lockType : quoteData.lockType ? [quoteData.lockType] : []);
    const next = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type];
    setEditedValues((prev) => ({ ...prev, lockType: next }));
  };

  // Render spec row (either display or edit mode)
  const renderSpecRow = (
    spec: { key: string; label: string; value: string },
    section: string,
  ) => {
    // File upload status is read-only
    const isReadOnly = spec.key === "fileUploadStatus";

    if (editingSection === section && !isReadOnly) {
      const formatter = valueFormatters[spec.key];
      const rawValue = getRawValue(spec.key);
      const isCustomField = customFields.includes(spec.key);

      // Lock type: multi-select checkboxes
      if (spec.key === "lockType") {
        const lockTypes = (rawValue as string[]) || [];
        return (
          <div
            key={spec.key}
            className="flex justify-between items-center border-b border-gray-100 pb-3"
          >
            <span className="text-[13px] md:text-[14px] font-roboto font-[400] text-[#4A5565]">
              {spec.label}:
            </span>
            <div className="flex flex-col gap-2 items-end">
              <label className="flex items-center gap-2 text-[13px] md:text-[14px] font-roboto font-[400] text-[#4A5565] cursor-pointer">
                <input
                  type="checkbox"
                  checked={lockTypes.includes("deadbolt")}
                  onChange={() => handleLockTypeChange("deadbolt")}
                  className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                Deadbolt
              </label>
              <label className="flex items-center gap-2 text-[13px] md:text-[14px] font-roboto font-[400] text-[#4A5565] cursor-pointer">
                <input
                  type="checkbox"
                  checked={lockTypes.includes("door_knob")}
                  onChange={() => handleLockTypeChange("door_knob")}
                  className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                Door Knob
              </label>
            </div>
          </div>
        );
      }

      // Determine effective selected value for the dropdown (rawValue is string here; lockType returned above)
      const rawStr = rawValue as string;
      let selectedValue: string = rawStr;
      if (
        formatter &&
        !Object.keys(formatter).includes(rawStr) &&
        isCustomField
      ) {
        // If value is not in formatter options but field is custom, treat as "other"
        // For doorType, the "other" key is explicitly "Other (Special Order)"
        if (spec.key === "doorType") {
          selectedValue = "Other (Special Order)";
        } else {
          selectedValue = "other";
        }
      }

      return (
        <div
          key={spec.key}
          className="flex justify-between items-center border-b border-gray-100 pb-3"
        >
          <span className="text-[13px] md:text-[14px] font-roboto font-[400] text-[#4A5565]">
            {spec.label}:
          </span>
          {formatter ? (
            <div className="flex flex-col gap-2 items-end">
              <select
                value={selectedValue}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (
                    newValue === "other" ||
                    newValue === "Other (Special Order)"
                  ) {
                    // If switching to Other, keep current rawValue if it's already custom, or clear it
                    if (!Object.keys(formatter).includes(rawStr)) {
                      handleInputChange(spec.key, rawStr);
                    } else {
                      handleInputChange(spec.key, "");
                    }
                  } else {
                    handleInputChange(spec.key, newValue);
                  }
                }}
                className="text-[13px] md:text-[14px] font-roboto font-[400] text-[#4A5565] ml-4 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-orange-500 w-[150px] md:w-[200px]"
              >
                {Object.entries(formatter).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
                {isCustomField && spec.key !== "doorType" && (
                  <option value="other">Other</option>
                )}
              </select>

              {/* Show text input if "other" is selected or value is custom */}
              {(selectedValue === "other" ||
                selectedValue === "Other (Special Order)") &&
                isCustomField && (
                  <input
                    type="text"
                    value={rawStr === "Other (Special Order)" ? "" : rawStr}
                    onChange={(e) =>
                      handleInputChange(spec.key, e.target.value)
                    }
                    placeholder="Enter custom value"
                    className="text-[13px] md:text-[14px] font-roboto font-[400] text-[#4A5565] ml-4 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-orange-500 w-[150px] md:w-[200px]"
                  />
                )}
            </div>
          ) : (
            <input
              type="text"
              value={rawStr}
              onChange={(e) => handleInputChange(spec.key, e.target.value)}
              className="text-[13px] md:text-[14px] font-roboto font-[400] text-[#4A5565] ml-4 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-orange-500 w-[150px] md:w-[200px]"
            />
          )}
        </div>
      );
    }
    return (
      <div
        key={spec.key}
        className="flex justify-between items-start border-b border-gray-100 pb-3"
      >
        <span className="text-[13px] md:text-[14px] font-roboto font-[400] text-[#4A5565]">
          {spec.label}:
        </span>
        <span className="text-[13px] md:text-[14px] font-roboto font-[400] text-[#4A5565] ml-4">
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
            className="flex items-center gap-1 px-3 py-1 bg-[#FF6E4A] text-white rounded text-[12px] md:text-[14px] font-roboto hover:bg-[#FF6E4A]/90 transition-colors"
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
        <span className="text-[14px] md:text-[16px] font-roboto font-[400] text-black">
          Edit
        </span>
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
    <div className="mt-[50px] mb-[50px] max-w-6xl mx-auto font-roboto">
      <h2 className="text-[20px] md:text-[32px] font-roboto font-[500] mb-5 md:mb-8 text-black">
        Review & Submit
      </h2>

      {/* First Box - Primary Specifications with Image */}
      <div className="border-2 border-gray-200 rounded-xl p-6 mb-6">
        {/* Subheading and Edit Button - Flex Between (Full Width) */}
        <div className="flex justify-between items-center mb-9 md:mb-13">
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
            <div className="space-y-4 ">
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

      {/* Second Box - Other Details */}
      {otherDetailsSpecs.length > 0 && (
        <div className="border-2 border-gray-200 rounded-xl p-8 md:p-6 mb-6">
          {/* Subheading and Edit Button - Flex Between */}
          <div className="flex justify-between items-center mb-9 md:mb-13">
            <h3 className="text-[14px] md:text-[16px] font-roboto font-[400] text-[#0A0A0A]">
              Other Details
            </h3>
            {/* Edit/Save/Cancel Button - Top Right */}
            {renderEditButtons("other")}
          </div>
          <div className="space-y-4 text-[13px] md:text-[14px] font-roboto font-[400] text-[#4A5565]">
            {otherDetailsSpecs.map((spec) => renderSpecRow(spec, "other"))}
          </div>
        </div>
      )}

      {/* Third Box - Handing & Hinges */}
      <div className="border-2 border-gray-200 rounded-xl p-8 md:p-6 mb-6">
        {/* Subheading and Edit Button - Flex Between */}
        <div className="flex justify-between items-center mb-9 md:mb-13 ">
          <h3 className="text-[14px] md:text-[16px] font-roboto font-[400] text-[#0A0A0A]">
            Handing & Hinges
          </h3>
          {/* Edit/Save/Cancel Button - Top Right */}
          {renderEditButtons("handing")}
        </div>
        <div className="space-y-4 text-[13px] md:text-[14px] font-roboto font-[400] text-[#4A5565">
          {handingHingesSpecs.map((spec) => renderSpecRow(spec, "handing"))}
        </div>
      </div>

      {/* Fourth Box - Lock Information */}
      <div className="border-2 border-gray-200 rounded-xl  p-8 md:p-6  mb-6">
        {/* Subheading and Edit Button - Flex Between */}
        <div className="flex justify-between items-center mb-9 md:mb-13">
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

      {/* Jamb Box */}
      {jambSpecs.length > 0 && (
        <div className="border-2 border-gray-200 rounded-xl p-8 md:p-6 mb-6">
          {/* Subheading and Edit Button - Flex Between */}
          <div className="flex justify-between items-center mb-9 md:mb-13">
            <h3 className="text-[14px] md:text-[16px] font-roboto font-[400] text-[#0A0A0A]">
              Jamb
            </h3>
            {/* Edit/Save/Cancel Button - Top Right */}
            {renderEditButtons("jamb")}
          </div>
          <div className="space-y-4 text-[13px] md:text-[14px] font-roboto font-[400] text-[#4A5565]">
            {jambSpecs.map((spec) => renderSpecRow(spec, "jamb"))}
          </div>
        </div>
      )}

      {/* Options Box */}
      {optionsSpecs.length > 0 && (
        <div className="border-2 border-gray-200 rounded-xl p-8 md:p-6 mb-6">
          {/* Subheading and Edit Button - Flex Between */}
          <div className="flex justify-between items-center mb-9 md:mb-13">
            <h3 className="text-[14px] md:text-[16px] font-roboto font-[400] text-[#0A0A0A]">
              Options
            </h3>
            {/* Edit/Save/Cancel Button - Top Right */}
            {renderEditButtons("options")}
          </div>
          <div className="space-y-4 text-[13px] md:text-[14px] font-roboto font-[400] text-[#4A5565]">
            {optionsSpecs.map((spec) => renderSpecRow(spec, "options"))}
          </div>
        </div>
      )}

      {/* Door Finish & Notes Box - Always show (file upload status is always included) */}
      <div className="border-2 border-gray-200 rounded-xl p-8 md:p-6 mb-6">
        {/* Subheading and Edit Button - Flex Between */}
        <div className="flex justify-between items-center mb-9 md:mb-13">
          <h3 className="text-[14px] md:text-[16px] font-roboto font-[400] text-[#0A0A0A]">
            Door Finish & Notes
          </h3>
          {/* Edit/Save/Cancel Button - Top Right */}
          {renderEditButtons("doorFinishNotes")}
        </div>
        <div className="space-y-4 text-[13px] md:text-[14px] font-roboto font-[400] text-[#4A5565]">
          {doorFinishNotesSpecs.map((spec) =>
            renderSpecRow(spec, "doorFinishNotes"),
          )}
        </div>
      </div>

      {/* Your Details Box */}
      <div className="border-2 border-gray-200 rounded-xl p-8 md:p-6 mb-6">
        {/* Subheading and Edit Button - Flex Between */}
        <div className="flex justify-between items-center mb-9 md:mb-13 ">
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

      {/* Download PDF Box */}
      <div className="border-2 border-gray-200 rounded-xl p-2 hover:cursor-pointer">
        <button
          onClick={downloadPDF}
          disabled={isDownloading}
          className="w-full flex items-center justify-center gap-2 text-[14px] md:text-[16px] font-roboto font-[400] text-black hover:text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {/* Download Icon */}
          {isDownloading ? (
            <svg
              className="w-4 h-4 text-black animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-4 h-4 text-black"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          )}
          <span className="text-[14px] text-[#0A0A0A]">
            {isDownloading ? "Generating PDF..." : "Download PDF"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Step15;
