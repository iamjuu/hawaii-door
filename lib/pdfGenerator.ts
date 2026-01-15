import PDFDocument from "pdfkit";
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
const formatValue = (key: string, value: any): string => {
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

// Generate PDF from quote data
export async function generateQuotePDF(quoteData: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50, size: "A4" });
      const chunks: Buffer[] = [];

      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      // Header
      doc.fontSize(24).text("Hawaii Door - Quote Specification", { align: "center" });
      doc.moveDown(0.5);
      doc.fontSize(10).text(`Generated on: ${new Date().toLocaleDateString()}`, { align: "center" });
      doc.moveDown(1);

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

      // Door Specifications Box with border effect
      const boxStartY = doc.y;
      doc.fontSize(16).text("Door Specifications", { underline: true });
      doc.moveDown(0.5);

      // Try to add door image on the right side
      const imagePath = getDoorImagePath(quoteData.doorType);
      let imageAdded = false;
      let imageY = doc.y;
      if (imagePath) {
        const fullImagePath = path.join(process.cwd(), "public", imagePath);
        if (fs.existsSync(fullImagePath)) {
          try {
            doc.image(fullImagePath, 420, imageY, { width: 120, height: 96 });
            imageAdded = true;
          } catch (err) {
            console.log("Could not add image to PDF:", err);
          }
        }
      }

      // Primary specs on the left
      doc.fontSize(11);
      const specsStartY = doc.y;
      primarySpecs.forEach((spec, index) => {
        const currentY = specsStartY + (index * 20);
        doc.text(`${spec.label}:`, 50, currentY, { width: 180, continued: true });
        doc.text(spec.value, 230, currentY, { width: 150 });
      });
      
      // Move cursor below specs or image, whichever is lower
      const specsEndY = specsStartY + (primarySpecs.length * 20);
      const imageEndY = imageY + (imageAdded ? 96 : 0);
      doc.y = Math.max(specsEndY, imageEndY) + 20;

      doc.moveDown(1);

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
        // Check if we need a new page
        if (doc.y > 700) {
          doc.addPage();
        } else {
          doc.moveDown(1);
        }
        doc.fontSize(16).text("Handing & Hinges", { underline: true });
        doc.moveDown(0.5);
        doc.fontSize(11);
        const handingStartY = doc.y;
        handingHingesSpecs.forEach((spec, index) => {
          const currentY = handingStartY + (index * 20);
          doc.text(`${spec.label}:`, 50, currentY, { width: 180, continued: true });
          doc.text(spec.value, 230, currentY, { width: 300 });
        });
        doc.y = handingStartY + (handingHingesSpecs.length * 20) + 20;
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
        // Check if we need a new page
        if (doc.y > 700) {
          doc.addPage();
        } else {
          doc.moveDown(1);
        }
        doc.fontSize(16).text("Lock Information", { underline: true });
        doc.moveDown(0.5);
        doc.fontSize(11);
        const lockStartY = doc.y;
        lockInfoSpecs.forEach((spec, index) => {
          const currentY = lockStartY + (index * 20);
          doc.text(`${spec.label}:`, 50, currentY, { width: 180, continued: true });
          doc.text(spec.value, 230, currentY, { width: 300 });
        });
        doc.y = lockStartY + (lockInfoSpecs.length * 20) + 20;
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
        // Check if we need a new page
        if (doc.y > 700) {
          doc.addPage();
        } else {
          doc.moveDown(1);
        }
        doc.fontSize(16).text("Your Details", { underline: true });
        doc.moveDown(0.5);
        doc.fontSize(11);
        const detailsStartY = doc.y;
        yourDetailsSpecs.forEach((spec, index) => {
          const currentY = detailsStartY + (index * 20);
          doc.text(`${spec.label}:`, 50, currentY, { width: 180, continued: true });
          doc.text(spec.value, 230, currentY, { width: 300 });
        });
        doc.y = detailsStartY + (yourDetailsSpecs.length * 20) + 20;
      }

      // Footer
      doc.fontSize(8).text(
        "This is an automated quote specification generated by Hawaii Door.",
        { align: "center" }
      );

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

