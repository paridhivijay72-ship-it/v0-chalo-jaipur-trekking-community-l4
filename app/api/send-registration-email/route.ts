import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const {
      fullName,
      contact,
      email,
      address,
      aadhaar,
      instagram,
      healthIssues,
      healthDetails,
      amount,
      paymentMethod,
      transactionId,
      dateTime,
    } = data

    // Mask Aadhaar number (show only last 4 digits)
    const maskedAadhaar = aadhaar.replace(/(\d{4})\s(\d{4})\s(\d{4})/, "XXXX XXXX $3")

    // Admin Email Content
    const adminEmailContent = `
Hello Admin,

A new user has successfully completed registration and payment.

User Details:
-----------------------
Full Name: ${fullName}
Mobile Number: ${contact}
Email ID: ${email}
Address: ${address}
Aadhaar Number: ${maskedAadhaar}
Instagram ID: ${instagram || "Not provided"}
Health Issue: ${healthIssues}
Health Details: ${healthDetails || "None"}

Payment Details:
-----------------------
Amount Paid: ₹${amount}
Payment Method: ${paymentMethod.toUpperCase()}
Transaction ID: ${transactionId}
Payment Status: SUCCESS
Date & Time: ${dateTime}

Please take further action if required.

Regards,
Website System
    `

    const emailJsServiceId = process.env.EMAILJS_SERVICE_ID
    const emailJsTemplateId = process.env.EMAILJS_TEMPLATE_ID
    const emailJsPublicKey = process.env.EMAILJS_PUBLIC_KEY

    if (emailJsServiceId && emailJsTemplateId && emailJsPublicKey) {
      // Send Admin Email
      await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: emailJsServiceId,
          template_id: emailJsTemplateId,
          user_id: emailJsPublicKey,
          template_params: {
            to_email: "somyakhandelwal300@gmail.com",
            subject: "New Registration Successful – Payment Received",
            message: adminEmailContent,
          },
        }),
      })
    }

    // For development/testing, log to console
    console.log("[v0] Admin Email Content:", adminEmailContent)

    return NextResponse.json({
      success: true,
      message: "Registration email sent to admin successfully",
    })
  } catch (error) {
    console.error("[v0] Error sending emails:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send registration email",
      },
      { status: 500 },
    )
  }
}
