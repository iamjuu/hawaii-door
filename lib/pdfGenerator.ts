import { jsPDF } from "jspdf";
import fs from "fs";
import path from "path";

// Map doorType to image path
const getDoorImagePath = (doorType: string): string | null => {
  const imageMap: { [key: string]: string } = {
    "Fibre Glass Door": "/assets/images/landing/door41.png",
    "Hollow Core Door": "/assets/images/landing/door5050.png",
    "Particle Core Door": "/assets/images/dummy/door5151.png",
    "Wood Core Door": "/assets/images/dummy/door54.png",
    "Solid Core Laminated Construction (SCLC)": "/assets/images/landing/door33.png",
    "Other (Special Order)": "/assets/images/dummy/door531.png",
  };
  return imageMap[doorType] || imageMap["Fibre Glass Door"];
};

// Format values for display (same logic as step15.tsx)
const formatValue = (key: string, value: unknown): string => {
  if (!value || value === "") return "-";
  if (Array.isArray(value)) return value.length > 0 ? `${value.length} file(s)` : "-";
  
  const stringValue = String(value);
  
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

// Generate PDF from quote data using jsPDF
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateQuotePDF(quoteData: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      if (!quoteData) {
        reject(new Error("Quote data is required"));
        return;
      }

      // Create PDF document
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      let yPos = 20;
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 15;
      const contentWidth = pageWidth - (2 * margin);

      // Helper function to check if we need a new page
      const checkNewPage = (requiredSpace: number = 20) => {
        if (yPos + requiredSpace > doc.internal.pageSize.getHeight() - 20) {
          doc.addPage();
          yPos = 20;
        }
      };

      // Header
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text("Hawaii Door - Quote Specification", pageWidth / 2, yPos, { align: "center" });
      yPos += 10;
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPos, { align: "center" });
      yPos += 15;

      // Primary Specifications Section
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

      checkNewPage(50);

      // Door Specifications Section
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Door Specifications", margin, yPos);
      yPos += 8;

      // Try to add door image on the right side
      const imagePath = getDoorImagePath(quoteData.doorType);
      let imageAdded = false;
      const imageStartY = yPos;
      
      if (imagePath) {
        try {
          const imagePathWithoutSlash = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
          const fullImagePath = path.join(process.cwd(), "public", imagePathWithoutSlash);
          
          if (fs.existsSync(fullImagePath)) {
            try {
              const imageData = fs.readFileSync(fullImagePath);
              const imageBase64 = `data:image/png;base64,${imageData.toString('base64')}`;
              const imageX = pageWidth - margin - 40;
              doc.addImage(imageBase64, 'PNG', imageX, imageStartY, 40, 32);
              imageAdded = true;
            } catch (err) {
              console.log("Could not add image to PDF:", err);
            }
          } else {
            console.log(`Image not found at path: ${fullImagePath}`);
          }
        } catch (imageError) {
          console.log("Error processing image path:", imageError);
        }
      }

      // Primary specs on the left
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      
      primarySpecs.forEach((spec, index) => {
        const currentY = yPos + (index * 7);
        doc.setFont("helvetica", "normal");
        doc.text(`${spec.label}:`, margin, currentY);
        doc.text(spec.value, margin + 60, currentY);
      });
      
      yPos += Math.max(primarySpecs.length * 7, imageAdded ? 35 : 0) + 10;

      // Handing & Hinges Section
      const handingHingesSpecs = [
        { key: "doorHandling", label: "Door Handling", value: formatValue("doorHandling", quoteData.doorHandling) },
        { key: "hingeRadius", label: "Hinge Radius", value: formatValue("hingeRadius", quoteData.hingeRadius) },
        { key: "hingeType", label: "Hinge Type", value: formatValue("hingeType", quoteData.hingeType) },
        { key: "hingeLocation1", label: "Hinge 1 Location", value: formatValue("hingeLocation1", quoteData.hingeLocation1) },
        { key: "hingeLocation2", label: "Hinge 2 Location", value: formatValue("hingeLocation2", quoteData.hingeLocation2) },
        { key: "hingeLocation3", label: "Hinge 3 Location", value: formatValue("hingeLocation3", quoteData.hingeLocation3) },
        { key: "backset", label: "Backset", value: formatValue("backset", quoteData.backset) },
      ].filter(spec => spec.value !== "-");

      if (handingHingesSpecs.length > 0) {
        checkNewPage(handingHingesSpecs.length * 7 + 15);
        
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("Handing & Hinges", margin, yPos);
        yPos += 8;
        
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        handingHingesSpecs.forEach((spec, index) => {
          const currentY = yPos + (index * 7);
          doc.text(`${spec.label}:`, margin, currentY);
          doc.text(spec.value, margin + 60, currentY);
        });
        yPos += handingHingesSpecs.length * 7 + 10;
      }

      // Lock Information Section
      const lockInfoSpecs = Object.entries(quoteData)
        .filter(([key, value]) => {
          if (!value || value === "" || (Array.isArray(value) && value.length === 0)) return false;
          if (key === "uploadedFiles") return false;
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

      if (lockInfoSpecs.length > 0) {
        checkNewPage(lockInfoSpecs.length * 7 + 15);
        
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("Lock Information", margin, yPos);
        yPos += 8;
        
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        lockInfoSpecs.forEach((spec, index) => {
          const currentY = yPos + (index * 7);
          checkNewPage(7);
          doc.text(`${spec.label}:`, margin, currentY);
          
          // Handle long text by splitting if needed
          const maxWidth = contentWidth - 60;
          const splitValue = doc.splitTextToSize(spec.value, maxWidth);
          doc.text(splitValue, margin + 60, currentY);
          
          if (splitValue.length > 1) {
            yPos += (splitValue.length - 1) * 5;
          }
        });
        yPos += lockInfoSpecs.length * 7 + 10;
      }

      // Your Details Section
      const yourDetailsSpecs = [
        { key: "firstName", label: "Name", value: formatValue("firstName", quoteData.firstName) },
        { key: "email", label: "Email", value: formatValue("email", quoteData.email) },
        { key: "companyName", label: "Company / Job Name", value: formatValue("companyName", quoteData.companyName) },
        { key: "phone", label: "Phone", value: formatValue("phone", quoteData.phone) },
        { key: "poNumber", label: "PO Number", value: formatValue("poNumber", quoteData.poNumber) },
      ].filter(spec => spec.value !== "-");

      if (yourDetailsSpecs.length > 0) {
        checkNewPage(yourDetailsSpecs.length * 7 + 15);
        
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("Your Details", margin, yPos);
        yPos += 8;
        
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        yourDetailsSpecs.forEach((spec, index) => {
          const currentY = yPos + (index * 7);
          doc.text(`${spec.label}:`, margin, currentY);
          doc.text(spec.value, margin + 60, currentY);
        });
        yPos += yourDetailsSpecs.length * 7 + 10;
      }

      // Footer
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.text(
          "This is an automated quote specification generated by Hawaii Door.",
          pageWidth / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: "center" }
        );
      }

      // Convert to Buffer
      const pdfOutput = doc.output("arraybuffer");
      const buffer = Buffer.from(pdfOutput);
      
      if (buffer.length === 0) {
        reject(new Error("PDF generation produced no data"));
        return;
      }
      
      resolve(buffer);
    } catch (error) {
      console.error("PDF generation error:", error);
      reject(error);
    }
  });
}
