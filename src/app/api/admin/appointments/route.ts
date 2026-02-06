import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase"
import { auth } from "@/auth"

// GET /api/admin/appointments - Get all appointments
export async function GET(request: Request) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    let query = getSupabaseAdmin()
      .from("appointments")
      .select(`
        *,
        user:user_id (id, email, name)
      `)
      .order("appointment_date", { ascending: true })

    if (userId) {
      query = query.eq("user_id", userId)
    }

    const { data: appointments, error } = await query

    if (error) {
      console.error("[ADMIN APPOINTMENTS] Fetch error:", error)
      return NextResponse.json(
        { error: "Failed to fetch appointments" },
        { status: 500 }
      )
    }

    return NextResponse.json({ appointments })
  } catch (error) {
    console.error("[ADMIN APPOINTMENTS] Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/admin/appointments - Create new appointment
export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const body = await request.json()
    const { userId, title, doctor, date, time, location, description } = body

    // Validation
    if (!userId || !title || !doctor || !date || !time || !location) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const { data: appointment, error } = await getSupabaseAdmin()
      .from("appointments")
      .insert({
        user_id: userId,
        title,
        doctor,
        appointment_date: date,
        appointment_time: time,
        location,
        description,
        status: "scheduled",
        created_by: session.user.id,
      })
      .select()
      .single()

    if (error) {
      console.error("[ADMIN APPOINTMENTS] Create error:", error)
      return NextResponse.json(
        { error: "Failed to create appointment" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, appointment })
  } catch (error) {
    console.error("[ADMIN APPOINTMENTS] Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
