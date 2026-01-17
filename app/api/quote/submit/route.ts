import { NextRequest, NextResponse } from "next/server";
import { sendQuoteSubmissionEmail, sendQuoteConfirmationToUser } from "@/lib/email";
import { generateQuotePDF } from "@/lib/pdfGenerator";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { quoteData, pdfBase64, uploadedFiles } = body;

    // Validate required fields
    if (!quoteData) {
      return NextResponse.json(
        { success: false, error: "Quote data is required" },
        { status: 400 }
      );
    }

    // Prepare PDF attachment (for both admin and user)
    let pdfAttachmentObj: { filename: string; content: string; encoding: string; contentType: string } | null = null;

    // Generate PDF from quote data
    let pdfBuffer: Buffer | null = null;
    try {
      pdfBuffer = await generateQuotePDF(quoteData);
      const fileName = `HawaiiDoor_Specifications_${quoteData.firstName || "Quote"}_${new Date().toISOString().split("T")[0]}.pdf`;
      pdfAttachmentObj = {
        filename: fileName,
        content: pdfBuffer.toString("base64"),
        encoding: "base64",
        contentType: "application/pdf",
      };
    } catch (pdfError) {
      console.error("Error generating PDF:", pdfError);
      // Continue without PDF if generation fails
    }

    // Add PDF if provided from client (fallback)
    if (!pdfAttachmentObj && pdfBase64) {
      const fileName = `HawaiiDoor_Specifications_${quoteData.firstName || "Quote"}_${new Date().toISOString().split("T")[0]}.pdf`;
      pdfAttachmentObj = {
        filename: fileName,
        content: pdfBase64,
        encoding: "base64",
        contentType: "application/pdf",
      };
    }

    // Prepare admin attachments: PDF + uploaded files
    const adminAttachments: { filename: string; content: string; encoding: string; contentType: string }[] = [];
    if (pdfAttachmentObj) {
      adminAttachments.push(pdfAttachmentObj);
    }

    // Add uploaded files to admin attachments
    if (uploadedFiles && Array.isArray(uploadedFiles)) {
      uploadedFiles.forEach((file: { name: string; base64: string; type: string }, index: number) => {
        if (file.base64 && file.name) {
          adminAttachments.push({
            filename: file.name,
            content: file.base64,
            encoding: "base64",
            contentType: file.type || "application/octet-stream",
          });
        }
      });
    }

    // Prepare user attachments: Only PDF (no uploaded files)
    const userAttachments: { filename: string; content: string; encoding: string; contentType: string }[] = [];
    if (pdfAttachmentObj) {
      userAttachments.push(pdfAttachmentObj);
    }

    // Send email to admin with PDF + uploaded files
    const adminResult = await sendQuoteSubmissionEmail(quoteData, adminAttachments.length > 0 ? adminAttachments : undefined);
    console.log("✅ Admin email sent:", adminResult.messageId);

    // Send confirmation email to user with PDF only (no uploaded documents)
    try {
      if (quoteData.email) {
        const userResult = await sendQuoteConfirmationToUser({
          firstName: quoteData.firstName,
          email: quoteData.email,
          companyName: quoteData.companyName,
          doorType: quoteData.doorType,
          doorConfig: quoteData.doorConfig,
        }, userAttachments.length > 0 ? userAttachments : undefined);
        console.log("✅ User confirmation email sent:", userResult.messageId);
      }
    } catch (userEmailError) {
      // Don't fail the entire request if user email fails
      console.error("⚠️ User confirmation email failed (non-critical):", userEmailError);
    }

    return NextResponse.json({
      success: true,
      message: "Quote submitted successfully",
      messageId: adminResult.messageId,
    });
  } catch (error) {
    console.error("Quote submission error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

