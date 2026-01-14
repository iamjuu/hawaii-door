import { NextRequest, NextResponse } from "next/server";
import { sendQuoteSubmissionEmail, sendQuoteConfirmationToUser } from "@/lib/email";

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

    // Prepare attachments array
    const attachments: { filename: string; content: string; encoding: string; contentType: string }[] = [];

    // Add PDF if provided
    if (pdfBase64) {
      const fileName = `HawaiiDoor_Specifications_${quoteData.firstName || "Quote"}_${new Date().toISOString().split("T")[0]}.pdf`;
      attachments.push({
        filename: fileName,
        content: pdfBase64,
        encoding: "base64",
        contentType: "application/pdf",
      });
    }

    // Add uploaded files if provided
    if (uploadedFiles && Array.isArray(uploadedFiles)) {
      uploadedFiles.forEach((file: { name: string; base64: string; type: string }, index: number) => {
        if (file.base64 && file.name) {
          attachments.push({
            filename: file.name,
            content: file.base64,
            encoding: "base64",
            contentType: file.type || "application/octet-stream",
          });
        }
      });
    }

    // Send email to admin with attachments
    const adminResult = await sendQuoteSubmissionEmail(quoteData, attachments);
    console.log("✅ Admin email sent:", adminResult.messageId);

    // Send confirmation email to user (no attachments)
    try {
      if (quoteData.email) {
        const userResult = await sendQuoteConfirmationToUser({
          firstName: quoteData.firstName,
          email: quoteData.email,
          companyName: quoteData.companyName,
          doorType: quoteData.doorType,
          doorConfig: quoteData.doorConfig,
        });
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

