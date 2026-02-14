import { jsPDF } from "jspdf";
import fs from "fs";
import path from "path";
import sharp from "sharp";

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
  if (Array.isArray(value)) {
    if (key === "lockType") {
      const lockLabels: { [v: string]: string } = { deadbolt: "Deadbolt", door_knob: "Door Knob" };
      return value.map((v: string) => lockLabels[v]).filter(Boolean).join(", ") || "-";
    }
    return value.length > 0 ? `${value.length} file(s)` : "-";
  }
  
  const stringValue = String(value);
  
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
  return new Promise(async (resolve, reject) => {
    try {
      if (!quoteData) {
        reject(new Error("Quote data is required"));
        return;
      }

      // Omit selectedDoorId so it never appears in the PDF
      const { selectedDoorId: _omit, ...dataForPdf } = quoteData;
      const pdfQuoteData = { ...dataForPdf };

      // Create PDF document
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      let yPos = 40; // Increased initial margin top for main heading
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 15;
      const contentWidth = pageWidth - (2 * margin);

      // Design constants matching Step15 design (optimized for 2-page layout with 40px font)
      const sectionPadding = 6; // Increased for better spacing with larger text
      const sectionMargin = 5; // Increased for better section separation
      const sectionBorderWidth = 0.8; // Slightly thicker borders for better visibility
      const specRowSpacing = 6; // Increased for better readability
      const specRowPaddingBottom = 3; // Increased for better spacing
      const borderGray = [226, 232, 240]; // border-gray-200
      const headerGray = [10, 10, 10]; // text-[#0A0A0A]
      const textGray = [74, 85, 101]; // text-[#4A5565]margi

      // Helper function to draw rounded rectangle (approximated)
      const drawRoundedBox = (x: number, y: number, width: number, height: number, radius: number = 3) => {
        doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
        doc.setLineWidth(sectionBorderWidth);
        // Draw rounded rectangle (approximated as rectangle since jsPDF doesn't support rounded corners well)
        doc.roundedRect(x, y, width, height, radius, radius, 'S');
      };

      // Helper function to check if we need a new page (optimized for 2-page layout with larger text)
      const checkNewPage = (requiredSpace: number = 20) => {
        // Use more of the page height - adjusted for larger text
        if (yPos + requiredSpace > doc.internal.pageSize.getHeight() - 20) {
          doc.addPage();
          yPos = 20; // Top margin for new page
        }
      };

      // Title: "Hawaii Door - Quote Specification" (centered)
      doc.setFontSize(85 * 0.264583); // 85px for main heading
      doc.setFont("helvetica", "medium"); // font-500
      doc.setTextColor(0, 0, 0);
      doc.text("Hawaii Door - Quote Specification", pageWidth / 2, yPos, { align: "center" });
      yPos += 15; // Increased spacing for larger heading
      
      // Generated date below title
      doc.setFontSize(70 * 0.264583); // 70px for generated date
      doc.setFont("helvetica", "normal");
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPos, { align: "center" });
      yPos += 18; // Increased spacing for larger date text

      // Primary Specifications Section
      const primarySpecs = [
        { key: "doorType", label: "Category", value: formatValue("doorType", quoteData.doorType) },
        { key: "doorConfig", label: "Type", value: formatValue("doorConfig", quoteData.doorConfig) },
        { key: "width", label: "Width", value: formatValue("width", quoteData.width) },
        { key: "height", label: "Height", value: formatValue("height", quoteData.height) },
        { key: "thickness", label: "Thickness", value: formatValue("thickness", quoteData.thickness) },
        { key: "quantity", label: "Quantity", value: formatValue("quantity", quoteData.quantity) },
      ].filter(spec => spec.value !== "-");

      // Other Details specifications
      const wallThicknessValue = quoteData.wallThickness || quoteData.customDiameter || "";
      const otherDetailsSpecs = [
        { key: "wallBuilt", label: "Wall Built", value: formatValue("wallBuilt", quoteData.wallBuilt) },
        { key: "wallThickness", label: "Wall Thickness", value: formatValue("wallThickness", wallThicknessValue) },
        { key: "louver", label: "Louver", value: formatValue("louver", quoteData.louver) },
      ].filter(spec => spec.value !== "-");

      // Helper function to render a section box (imageLayout: object-contain style - fit image in box without stretch)
      const renderSection = (
        title: string,
        specs: Array<{ label: string; value: string }>,
        hasImage: boolean = false,
        imageBase64?: string,
        imageFormat?: string,
        imageLayout?: { drawWidth: number; drawHeight: number; offsetX: number; offsetY: number }
      ) => {
        // Increased required space check for larger text
        checkNewPage(80);
        
        const sectionStartY = yPos;
        const specsLeftX = margin + sectionPadding;
        const specsRightX = hasImage ? specsLeftX + 70 : specsLeftX + 60; // Increased space for larger label text
        const imageX = pageWidth - margin - sectionPadding - 45; // Slightly larger image width
        const specRowHeight = 12; // Increased to accommodate 40px font
        
        // Section header - equal margin top and bottom (increased font size)
        const sectionHeaderMarginTop = 9; // Equal margin top
        const sectionHeaderMarginBottom = 8; // Equal margin bottom
        doc.setFontSize(50 * 0.264583); // Increased section heading font size
        doc.setFont("helvetica", "normal"); // font-400
        doc.setTextColor(headerGray[0], headerGray[1], headerGray[2]);
        const headerY = yPos + sectionHeaderMarginTop; // Equal margin top
        doc.text(title, specsLeftX, headerY);
        yPos = headerY + sectionHeaderMarginBottom; // Equal margin bottom
        
        const specsStartY = yPos;
        const imageY = specsStartY;
        
        // Render specs on the left side (40px font)
        doc.setFontSize(40 * 0.264583); // 40px for all text
        doc.setTextColor(textGray[0], textGray[1], textGray[2]);
        
        specs.forEach((spec, index) => {
          const currentY = yPos;
          
          // Label on left (justify-between style)
          doc.setFont("helvetica", "normal");
          doc.text(`${spec.label}:`, specsLeftX, currentY);
          
          // Value on right
          const maxValueWidth = (hasImage ? imageX - specsRightX - 10 : pageWidth - margin - sectionPadding - specsRightX);
          const splitValue = doc.splitTextToSize(spec.value, maxValueWidth);
          
          // For long text (like special instructions), display value below label instead of beside
          if (splitValue.length > 2) {
            // Multi-line text - display label on first line, value on next lines
            doc.text(`${spec.label}:`, specsLeftX, currentY);
            doc.text(splitValue, specsLeftX, currentY + 8);
            
            // Draw bottom border after the text
            doc.setDrawColor(243, 244, 246); // border-gray-100
            doc.setLineWidth(0.3);
            const lineStartX = specsLeftX;
            const lineEndX = hasImage ? imageX - 10 : pageWidth - margin - sectionPadding;
            const borderY = currentY + 8 + (splitValue.length * 8) + specRowPaddingBottom;
            doc.line(lineStartX, borderY, lineEndX, borderY);
            
            yPos += 8 + (splitValue.length * 8); // Add space for multi-line text
          } else {
            // Single or double line - normal display
            doc.text(`${spec.label}:`, specsLeftX, currentY);
            doc.text(splitValue, specsRightX, currentY);
            
            // Draw bottom border for spec row (border-b border-gray-100)
            doc.setDrawColor(243, 244, 246); // border-gray-100
            doc.setLineWidth(0.3);
            const lineStartX = specsLeftX;
            const lineEndX = hasImage ? imageX - 10 : pageWidth - margin - sectionPadding;
            const borderY = currentY + specRowPaddingBottom;
            doc.line(lineStartX, borderY, lineEndX, borderY);
            
            // Adjust yPos for multi-line values
            if (splitValue.length > 1) {
              yPos += (splitValue.length - 1) * 8;
            }
          }
          
          yPos += specRowHeight;
        });
        
        // Add image on the right if provided (object-contain: preserve aspect ratio, fit in box)
        if (hasImage && imageBase64 && imageFormat) {
          try {
            const iw = imageLayout?.drawWidth ?? 40;
            const ih = imageLayout?.drawHeight ?? 30;
            const ox = imageLayout?.offsetX ?? 0;
            const oy = imageLayout?.offsetY ?? 0;
            doc.addImage(imageBase64, imageFormat, imageX + ox, imageY + oy, iw, ih);
          } catch (err) {
            console.log("Could not add image to PDF section:", err);
          }
          yPos = Math.max(yPos, imageY + 35);
        }
        
        // Section end with equal padding
        const sectionEndY = yPos + sectionPadding;
        const sectionHeight = sectionEndY - sectionStartY;
        
        // Draw section box border (border-2 border-gray-200 rounded-xl) - draw after content to know exact height
        drawRoundedBox(margin, sectionStartY, contentWidth, sectionHeight, 4); // Slightly larger radius for better aesthetics
        
        yPos = sectionEndY + sectionMargin; // Section margin bottom
      };

      // Door Specifications image: use same door-type image as Review & Submit (Select your core / step 1)
      let doorImageBase64: string | null = null;
      let doorImageFormat: string = 'PNG';
      let hasDoorImage = false;

      const imagePath = getDoorImagePath(quoteData.doorType);
      if (imagePath) {
        try {
          const imagePathWithoutSlash = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
          const fullImagePath = path.join(process.cwd(), "public", imagePathWithoutSlash);

          if (fs.existsSync(fullImagePath)) {
            const imageData = fs.readFileSync(fullImagePath);
            doorImageBase64 = `data:image/png;base64,${imageData.toString('base64')}`;
            doorImageFormat = 'PNG';
            hasDoorImage = true;
          }
        } catch (err) {
          console.log("Could not load static door image:", err);
        }
      }

      // object-contain: scale door image to fit 40x30 mm box without stretching
      let doorImageLayout: { drawWidth: number; drawHeight: number; offsetX: number; offsetY: number } | undefined;
      if (hasDoorImage && doorImageBase64) {
        try {
          const base64Data = doorImageBase64.replace(/^data:image\/\w+;base64,/, '');
          const buf = Buffer.from(base64Data, 'base64');
          const meta = await sharp(buf).metadata();
          const w = meta.width ?? 100;
          const h = meta.height ?? 100;
          const boxW = 40;
          const boxH = 30;
          if (w / h >= boxW / boxH) {
            doorImageLayout = {
              drawWidth: boxW,
              drawHeight: boxW * (h / w),
              offsetX: 0,
              offsetY: (boxH - boxW * (h / w)) / 2,
            };
          } else {
            doorImageLayout = {
              drawWidth: boxH * (w / h),
              drawHeight: boxH,
              offsetX: (boxW - boxH * (w / h)) / 2,
              offsetY: 0,
            };
          }
        } catch {
          // fallback: use full box if sharp fails
        }
      }

      // Primary Specifications Section - Door Specifications
      renderSection(
        "Door Specifications",
        primarySpecs,
        hasDoorImage,
        doorImageBase64 || undefined,
        hasDoorImage ? doorImageFormat : undefined,
        doorImageLayout
      );

      // Handing & Hinges Section
      const handingHingesSpecs = [
        { key: "doorHandling", label: "DoorHandling", value: formatValue("doorHandling", quoteData.doorHandling) },
        { key: "hingeRadius", label: "Hinge Radius", value: formatValue("hingeRadius", quoteData.hingeRadius) },
        { key: "hingeType", label: "Hinge Type", value: formatValue("hingeType", quoteData.hingeType) },
        { key: "hingeLocation1", label: "Hinge 1 Location", value: formatValue("hingeLocation1", quoteData.hingeLocation1) },
        { key: "hingeLocation2", label: "Hinge 2 Location", value: formatValue("hingeLocation2", quoteData.hingeLocation2) },
        { key: "hingeLocation3", label: "Hinge 3 Location", value: formatValue("hingeLocation3", quoteData.hingeLocation3) },
        { key: "backset", label: "Backset", value: formatValue("backset", quoteData.backset) },
      ].filter(spec => spec.value !== "-");

      // Other Details Section
      if (otherDetailsSpecs.length > 0) {
        const formattedOtherSpecs = otherDetailsSpecs.map(spec => ({ label: spec.label, value: spec.value }));
        renderSection("Other Details", formattedOtherSpecs);
      }

      if (handingHingesSpecs.length > 0) {
        const formattedHandingSpecs = handingHingesSpecs.map(spec => ({ label: spec.label, value: spec.value }));
        renderSection("Handing & Hinges", formattedHandingSpecs);
      }

      // Lock Information Section (use pdfQuoteData so selectedDoorId is never included)
      const lockInfoSpecs = Object.entries(pdfQuoteData)
        .filter(([key, value]) => {
          if (!value || value === "" || (Array.isArray(value) && value.length === 0)) return false;
          if (key === "uploadedFiles") return false;
          const excludedKeys = [
            "doorType", "doorConfig", "category", "width", "height", "thickness", "quantity", 
            "wallBuilt", "wallThickness", "customDiameter", "louver",
            "doorHandling", "hingeRadius", "hingeType", 
            "hingeLocation1", "hingeLocation2", "hingeLocation3", "backset",
            "jambType", "jambSize", "dbStrikeType", "lockStrikeType", "undercutMeasurement", 
            "weatherstripping", "thresholdType",
            "hangDoorOption", "protectDoorOption", "addOnOption",
            "doorFinishOption", "doorCategory", "selectedDoorId", "selectedDoorName", "specialInstructions",
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
        const formattedLockSpecs = lockInfoSpecs.map(spec => ({ label: spec.label, value: spec.value }));
        renderSection("Lock information", formattedLockSpecs);
      }

      // Jamb Section
      const jambSpecs = [
        { key: "jambType", label: "Jamb Type", value: formatValue("jambType", quoteData.jambType) },
        { key: "jambSize", label: "Jamb Size", value: formatValue("jambSize", quoteData.jambSize) },
        { key: "dbStrikeType", label: "DB Strike Type", value: formatValue("dbStrikeType", quoteData.dbStrikeType) },
        { key: "lockStrikeType", label: "Lock Strike Type", value: formatValue("lockStrikeType", quoteData.lockStrikeType) },
        { key: "undercutMeasurement", label: "Undercut Measurement", value: formatValue("undercutMeasurement", quoteData.undercutMeasurement) },
        { key: "weatherstripping", label: "Weatherstripping", value: formatValue("weatherstripping", quoteData.weatherstripping) },
        { key: "thresholdType", label: "Threshold Type", value: formatValue("thresholdType", quoteData.thresholdType) },
      ].filter(spec => spec.value !== "-");

      if (jambSpecs.length > 0) {
        const formattedJambSpecs = jambSpecs.map(spec => ({ label: spec.label, value: spec.value }));
        renderSection("Jamb", formattedJambSpecs);
      }

      // Options Section
      const optionsSpecs = [
        { key: "hangDoorOption", label: "Hang Door", value: formatValue("hangDoorOption", quoteData.hangDoorOption) },
        { key: "protectDoorOption", label: "Protect Door", value: formatValue("protectDoorOption", quoteData.protectDoorOption) },
        { key: "addOnOption", label: "Add On", value: formatValue("addOnOption", quoteData.addOnOption) },
      ].filter(spec => spec.value !== "-");

      if (optionsSpecs.length > 0) {
        const formattedOptionsSpecs = optionsSpecs.map(spec => ({ label: spec.label, value: spec.value }));
        renderSection("Options", formattedOptionsSpecs);
      }

      // Door Finish & Notes Section
      const getFileUploadStatus = (): string => {
        if (quoteData.uploadedFiles && Array.isArray(quoteData.uploadedFiles) && quoteData.uploadedFiles.length > 0) {
          const fileCount = quoteData.uploadedFiles.length;
          return `${fileCount} file${fileCount > 1 ? 's' : ''} uploaded`;
        }
        return "No files uploaded";
      };

      // Door Finish & Notes Section (Product Category, Door Name, SKU)
      const doorFinishSpecs = [
        { key: "doorFinishOption", label: "Door Finish", value: formatValue("doorFinishOption", quoteData.doorFinishOption) },
        { key: "doorCategory", label: "Product Category", value: quoteData.doorCategory || "-" },
        { key: "selectedDoorName", label: "Door Name (SKU)", value: quoteData.selectedDoorName || "-" },
        { key: "fileUploadStatus", label: "File Upload Status", value: getFileUploadStatus() },
      ].filter(spec => {
        if (spec.key === "fileUploadStatus") return true;
        return spec.value !== "-";
      });

      if (doorFinishSpecs.length > 0) {
        const formattedDoorFinishSpecs = doorFinishSpecs.map(spec => ({ label: spec.label, value: spec.value }));
        renderSection("Door Finish & Notes", formattedDoorFinishSpecs);
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
        const formattedDetailsSpecs = yourDetailsSpecs.map(spec => ({ label: spec.label, value: spec.value }));
        renderSection("Your Details", formattedDetailsSpecs);
      }

      // Uploaded Images Section (if multiple images exist)
      if (quoteData.uploadedFiles && Array.isArray(quoteData.uploadedFiles) && quoteData.uploadedFiles.length > 0) {
        const imageFiles = quoteData.uploadedFiles.filter((file: any) => {
          if (file && typeof file === 'object') {
            const type = file.type || '';
            const name = file.name || '';
            return type.startsWith('image/') || /\.(jpg|jpeg|png|gif|webp)$/i.test(name);
          }
          return false;
        });

        // Only show section if there are multiple images (first one already shown in Door Specifications)
        if (imageFiles.length > 1) {
          checkNewPage(80);
          
          doc.setFontSize(48 * 0.264583); // 40px for all text
          doc.setFont("helvetica", "bold");
          doc.text("Uploaded Door Images", margin, yPos);
          yPos += 12; // Increased spacing for larger text

          // Display remaining images in a grid (2 per row)
          const imagesPerRow = 2;
          const imageWidth = (contentWidth - 10) / imagesPerRow;
          const imageHeight = imageWidth * 0.75; // 4:3 aspect ratio
          
          // Get remaining images (skip first one as it's already shown)
          const remainingImages = imageFiles.slice(1);
          let rowStartY = yPos;
          
          remainingImages.forEach((imageFile: any, displayIndex: number) => {
            // Calculate which row and column for this image
            const row = Math.floor(displayIndex / imagesPerRow);
            const col = displayIndex % imagesPerRow;
            
            // Check if we need a new page for this row
            if (col === 0 && displayIndex > 0) {
              checkNewPage(imageHeight + 20);
              rowStartY = yPos;
            }

            const imageX = margin + (col * (imageWidth + 10));
            const imageY = rowStartY;

            try {
              // Determine image format
              let imgFormat = 'PNG';
              const fileType = imageFile.type || '';
              const fileName = imageFile.name || '';
              
              if (fileType.includes('jpeg') || fileType.includes('jpg') || /\.(jpg|jpeg)$/i.test(fileName)) {
                imgFormat = 'JPEG';
              } else if (fileType.includes('png') || /\.png$/i.test(fileName)) {
                imgFormat = 'PNG';
              }
              
              const imageBase64 = `data:image/${imgFormat.toLowerCase()};base64,${imageFile.base64}`;
              
              // Add image
              doc.addImage(imageBase64, imgFormat, imageX, imageY, imageWidth, imageHeight);
              
              // Add image name below
              doc.setFontSize(40 * 0.264583); // 40px for all text
              doc.setFont("helvetica", "normal");
              const imageName = imageFile.name || `Image ${displayIndex + 2}`;
              const truncatedName = doc.splitTextToSize(imageName, imageWidth);
              doc.text(truncatedName, imageX, imageY + imageHeight + 8); // Increased spacing
              
              // Update yPos for next row (when we complete a row or reach the last image)
              if (col === imagesPerRow - 1 || displayIndex === remainingImages.length - 1) {
                yPos = imageY + imageHeight + 15;
              }
            } catch (err) {
              console.log(`Could not add uploaded image ${displayIndex + 1} to PDF:`, err);
            }
          });
        }
      }

      // Footer removed - no automated message needed

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
