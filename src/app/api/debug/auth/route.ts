import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    
    console.log("Debug auth attempt:", { email, password })
    
    // Check env vars
    const envStatus = {
      supabaseUrl: process.env.SUPABASE_URL ? "set" : "missing",
      serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? "set" : "missing",
    }
    
    // Try to fetch user
    const { data: user, error } = await getSupabaseAdmin()
      .from("users")
      .select("id, email, name, role, password_hash")
      .eq("email", email)
      .single()
    
    if (error) {
      return NextResponse.json({
        success: false,
        stage: "database_query",
        error: error.message,
        envStatus,
      })
    }
    
    if (!user) {
      return NextResponse.json({
        success: false,
        stage: "user_lookup",
        message: "User not found",
        envStatus,
      })
    }
    
    // Check password
    let passwordValid = false
    
    if (user.password_hash) {
      passwordValid = await bcrypt.compare(password, user.password_hash)
    } else {
      // Fallback to demo passwords
      const demoPasswords: Record<string, string> = {
        "admin@beva.com": "Admin123!",
        "user@example.com": "User123!",
      }
      passwordValid = demoPasswords[email] === password
    }
    
    return NextResponse.json({
      success: passwordValid,
      stage: "password_check",
      userFound: !!user,
      hasPasswordHash: !!user.password_hash,
      envStatus,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    })
    
  } catch (err) {
    return NextResponse.json({
      success: false,
      stage: "exception",
      error: String(err),
    }, { status: 500 })
  }
}
