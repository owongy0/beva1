import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase"
import { auth } from "@/auth"

// GET /api/admin/users/[id] - Get user details with appointments
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const { id } = await params

    // Get user details
    const { data: user, error: userError } = await getSupabaseAdmin()
      .from("users")
      .select("id, email, name, hkid, phone, role, created_at")
      .eq("id", id)
      .single()

    if (userError || !user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Get user's appointments
    const { data: appointments, error: aptError } = await getSupabaseAdmin()
      .from("appointments")
      .select("*")
      .eq("user_id", id)
      .order("appointment_date", { ascending: false })

    if (aptError) {
      console.error("[USER GET] Appointments error:", aptError)
    }

    return NextResponse.json({
      success: true,
      user,
      appointments: appointments || [],
    })
  } catch (error) {
    console.error("[USER GET] Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PUT /api/admin/users/[id] - Update user details
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const { id } = await params
    const body = await request.json()
    const { name, email, hkid, phone } = body

    // Check if email is already taken by another user
    if (email) {
      const { data: existing } = await getSupabaseAdmin()
        .from("users")
        .select("id")
        .eq("email", email)
        .neq("id", id)
        .single()

      if (existing) {
        return NextResponse.json(
          { error: "Email already in use" },
          { status: 409 }
        )
      }
    }

    const { data: user, error } = await getSupabaseAdmin()
      .from("users")
      .update({
        name,
        email,
        hkid: hkid || null,
        phone: phone || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("[USER UPDATE] Error:", error)
      return NextResponse.json(
        { error: "Failed to update user" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, user })
  } catch (error) {
    console.error("[USER UPDATE] Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
