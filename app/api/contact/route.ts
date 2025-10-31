export const dynamic = "force-dynamic"

import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { default: dbConnect } = await import("@/lib/db")
    const { default: Contact } = await import("@/models/Contact")

    await dbConnect()

    const { name, email, message } = await request.json()

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Please provide all required fields" }, { status: 400 })
    }

    // Create contact submission
    const contact = await Contact.create({
      name,
      email,
      message,
    })

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully",
        contactId: contact._id,
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Contact error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
