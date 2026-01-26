import { NextRequest, NextResponse } from "next/server";
import { sendContactFormEmail, sendContactConfirmationToUser } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    const contactData = {
      firstName,
      lastName,
      email,
      phone,
      message,
    };

    // Send email to admin
    const adminResult = await sendContactFormEmail(contactData);
    console.log("✅ Admin contact form email sent:", adminResult.messageId);

    // Send confirmation email to user
    try {
      const userResult = await sendContactConfirmationToUser({
        firstName,
        lastName,
        email,
      });
      console.log("✅ User confirmation email sent:", userResult.messageId);
    } catch (userEmailError) {
      // Don't fail the entire request if user email fails
      console.error("⚠️ User confirmation email failed (non-critical):", userEmailError);
    }

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully. We'll get back to you within 24 hours.",
      messageId: adminResult.messageId,
    });
  } catch (error) {
    console.error("Contact form submission error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
