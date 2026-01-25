import { NextRequest, NextResponse } from "next/server";
import { generateQuotePDF } from "@/lib/pdfGenerator";

export async function POST(request: NextRequest) {
  let quoteData: any;
  try {
    const body = await request.json();
    quoteData = body.quoteData;

    // Validate required fields
    if (!quoteData) {
      return NextResponse.json(
        { success: false, error: "Quote data is required" },
        { status: 400 }
      );
    }

    // Generate PDF from quote data
    const pdfBuffer = await generateQuotePDF(quoteData);
    const fileName = `HawaiiDoor_Specifications_${quoteData.firstName || "Quote"}_${new Date().toISOString().split("T")[0]}.pdf`;

    // Return PDF as response
    // Convert Buffer to Uint8Array for NextResponse
    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Length": pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("PDF download error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error("Error details:", {
      message: errorMessage,
      stack: errorStack,
      quoteDataKeys: quoteData ? Object.keys(quoteData) : "No quoteData",
    });
    return NextResponse.json(
      { success: false, error: errorMessage, details: process.env.NODE_ENV === "development" ? errorStack : undefined },
      { status: 500 }
    );
  }
}




