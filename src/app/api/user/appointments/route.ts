import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase"
import { auth } from "@/auth"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { data: appointments, error } = await getSupabaseAdmin()
      .from("appointments")
      .select('*')
      .eq('user_id', session.user.id)
      .order('appointment_date', { ascending: false })

    if (error) {
      console.error('[USER APPOINTMENTS] Error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch appointments' },
        { status: 500 }
      )
    }

    return NextResponse.json({ appointments })

  } catch (error) {
    console.error('[USER APPOINTMENTS] Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
