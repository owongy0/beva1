import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase"
import { auth } from "@/auth"

// PUT /api/admin/appointments/[id] - Update appointment details
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
    const { title, doctor, date, time, location, description } = body

    const { data: appointment, error } = await getSupabaseAdmin()
      .from("appointments")
      .update({
        title,
        doctor,
        appointment_date: date,
        appointment_time: time,
        location,
        description,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("[APPOINTMENT UPDATE] Error:", error)
      return NextResponse.json(
        { error: "Failed to update appointment" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, appointment })
  } catch (error) {
    console.error("[APPOINTMENT UPDATE] Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PATCH /api/admin/appointments/[id] - Update appointment status
export async function PATCH(
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
    const { status } = body

    if (!status || !["scheduled", "completed", "cancelled"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      )
    }

    const { data: appointment, error } = await getSupabaseAdmin()
      .from("appointments")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("[APPOINTMENT STATUS] Error:", error)
      return NextResponse.json(
        { error: "Failed to update status" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, appointment })
  } catch (error) {
    console.error("[APPOINTMENT STATUS] Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE /api/admin/appointments/[id] - Delete appointment
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const { id } = await params

    const { error } = await getSupabaseAdmin()
      .from("appointments")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("[APPOINTMENT DELETE] Error:", error)
      return NextResponse.json(
        { error: "Failed to delete appointment" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[APPOINTMENT DELETE] Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
