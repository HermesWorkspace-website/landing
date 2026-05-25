import { NextRequest, NextResponse } from "next/server";
import { InquirySchema } from "@/lib/validations/inquiry";
import { prisma } from "@/lib/prisma";
import sendSlackNotification from "@/lib/send-slack-notification";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = InquirySchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed. Please check the fields below.",
          errors,
        },
        { status: 422 }
      );
    }

    const { fullName, institution, email, phone, inquiryType, message } = parsed.data;

    // Persist to database
    const inquiry = await prisma.inquiry.create({
      data: {
        fullName,
        institution,
        email,
        phone: phone || null,
        inquiryType,
        message,
      },
    });

    // Fire-and-forget Slack notification (non-blocking — won't fail the request)
    sendSlackNotification(inquiry).catch(() => {});

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been received. We'll be in touch within 2 academic hours.",
        id: inquiry.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[send_inquiry] Unexpected error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong on our end. Please try again later.",
      },
      { status: 500 }
    );
  }
}
