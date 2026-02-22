// components/user/build-door/QuoteSummary.tsx

interface QuoteSummaryProps {
    quoteData: any;
    currentStep: number;
    onRestart: () => void;
  }

  // Format values for display (same logic as step15.tsx)
  const formatValue = (key: string, value: any): string => {
    if (!value || value === "") return "";
    if (Array.isArray(value)) {
      if (key === "lockType") {
        const lockLabels: { [v: string]: string } = { deadbolt: "Deadbolt", door_knob: "Door Knob" };
        return value.map((v: string) => lockLabels[v]).filter(Boolean).join(", ") || "";
      }
      return value.length > 0 ? `${value.length} file(s)` : "";
    }
    
    const stringValue = String(value);
    
    // Format specific values
    const valueFormatters: { [key: string]: { [value: string]: string } } = {
      jambType: {
        "interior_double_rabbet": "Interior Double Rabbet",
        "exterior_single_rabbet": "Exterior Single Rabbet",
        "exterior_single_rabbet_kerfed": "Exterior Single Rabbet Kerfed",
        "none": "None",
      },
      dbStrikeType: {
        "standard": "Standard",
        "radius_corner": "Radius Corner",
        "box_strike": "Box Strike",
        "none": "None",
      },
      lockStrikeType: {
        "standard": "Standard",
        "radius_corner": "Radius Corner",
        "t_strike": "T-Strike",
        "none": "None",
      },
      weatherstripping: {
        "white": "White",
        "brown": "Brown",
        "none": "None",
      },
      thresholdType: {
        "adjustable_in_swing": "Adjustable In-swing",
        "out_swing": "Out-Swing",
        "flat_saddle": "Flat / Saddle",
        "none": "None",
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
      productCategory: "Category",
      doorType: "Core",
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
  
  const QuoteSummary = ({ quoteData, currentStep, onRestart }: QuoteSummaryProps) => {
    // Get all filled fields (excluding uploadedFiles)
    const getFilledFields = () => {
      const filledFields: Array<{ key: string; label: string; value: string }> = [];
      const processedKeys = new Set<string>();
      
      Object.entries(quoteData).forEach(([key, value]) => {
        // Skip uploadedFiles, selectedDoorId (internal ID), category (duplicate of doorConfig), and already processed keys
        if (key === "uploadedFiles" || key === "selectedDoorId" || key === "category" || processedKeys.has(key)) return;
        if (!value || value === "" || (Array.isArray(value) && value.length === 0)) return;
        
        // Special handling for doorSize - combine width and height
        if ((key === "width" || key === "height") && quoteData.width && quoteData.height) {
          if (!processedKeys.has("doorSize")) {
            filledFields.push({
              key: "doorSize",
              label: "Door Size",
              value: `${quoteData.width}" x ${quoteData.height}"`,
            });
            processedKeys.add("doorSize");
            processedKeys.add("width");
            processedKeys.add("height");
          }
          return;
        }
        
        // Special handling for wallThickness - combine with customDiameter
        if (key === "wallThickness" || key === "customDiameter") {
          if (!processedKeys.has("wallThickness")) {
            const wallThicknessValue = quoteData.wallThickness || quoteData.customDiameter || "";
            if (wallThicknessValue) {
              filledFields.push({
                key: "wallThickness",
                label: "Wall Thickness",
                value: formatValue("wallThickness", wallThicknessValue),
              });
              processedKeys.add("wallThickness");
              if (quoteData.wallThickness) processedKeys.add("wallThickness");
              if (quoteData.customDiameter) processedKeys.add("customDiameter");
            }
          }
          return;
        }
        
        // Regular field
        const formattedValue = formatValue(key, value);
        if (formattedValue) {
          filledFields.push({
            key,
            label: getDisplayName(key),
            value: formattedValue,
          });
          processedKeys.add(key);
        }
      });
      
      return filledFields;
    };

    const filledFields = getFilledFields();

    return (
      <div className="lg:w-72 xl:w-80 border border-gray-100 shadow-2xl rounded-b-[15px] h-min md:mt-[28px] flex flex-col max-h-[calc(100vh-150px)]">
        
        <h3 className="text-[16px] font-[400] mb-4 px-4 py-5 rounded-b-[15.33px] bg-gradient-to-r from-[#FFF7ED] to-[#FFEDD4] text-black border-b border-gray-200 flex-shrink-0">
          Your Quote Request
        </h3>

        <div className="pt-2 pb-6 pl-6 pr-6 md:p-6 flex flex-col flex-1 min-h-0">
          {/* Scrollable content area */}
          <div className="space-y-3 overflow-y-auto flex-1 pr-1" style={{ maxHeight: 'calc(100vh - 300px)' }}>
            {filledFields.length > 0 ? (
              filledFields.map((field) => (
                <div key={field.key} className="border-b border-gray-200 mb-[10px] md:mb-[20px] pb-[10px]">
                  <p className="text-[12px] md:text-[14px] font-[400] text-[#4A5565] mb-[1px]">
                    {field.label}
                  </p>
                  <p className="text-[12px] font-roboto md:text-[14px] text-black break-words">
                    {field.value}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-[12px] text-[#4A5565] py-4">
                No details entered yet
              </div>
            )}
          </div>
  
          {/* Fixed button at bottom */}
          <button
            onClick={onRestart}
            className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-[8.17px] hover:bg-white transition-colors text-[#0A0A0A] text-[14px] font-roboto flex-shrink-0"
          >
            <span>↻</span>
            <span>Restart Quote</span>
          </button>
        </div>
      </div>
    );
  };
  
  export default QuoteSummary;