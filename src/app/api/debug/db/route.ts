import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase"

export async function GET() {
  const results: Record<string, any> = {
    timestamp: new Date().toISOString(),
    env: {
      supabaseUrl: process.env.SUPABASE_URL ? "✓ set" : "✗ missing",
      serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? "✓ set (length: " + process.env.SUPABASE_SERVICE_ROLE_KEY?.length + ")" : "✗ missing",
    },
    tests: {},
  }

  // Test 1: Basic connection
  try {
    const { data, error } = await getSupabaseAdmin().from("users").select("count")
    if (error) {
      results.tests.connection = { status: "error", message: error.message }
    } else {
      results.tests.connection = { status: "ok", data }
    }
  } catch (err) {
    results.tests.connection = { status: "exception", error: String(err) }
  }

  // Test 2: Fetch actual users
  try {
    const { data, error } = await getSupabaseAdmin()
      .from("users")
      .select("id, email, name, role, password_hash")
      .limit(10)
    
    if (error) {
      results.tests.users = { status: "error", message: error.message }
    } else {
      results.tests.users = { 
        status: "ok", 
        count: data?.length || 0,
        users: data?.map(u => ({
          id: u.id,
          email: u.email,
          role: u.role,
          hasPasswordHash: !!u.password_hash,
          passwordHashLength: u.password_hash?.length || 0,
        }))
      }
    }
  } catch (err) {
    results.tests.users = { status: "exception", error: String(err) }
  }

  // Test 3: Check specific user
  try {
    const { data, error } = await getSupabaseAdmin()
      .from("users")
      .select("*")
      .eq("email", "admin@beva.com")
      .single()
    
    if (error) {
      results.tests.adminUser = { status: "error", message: error.message }
    } else {
      results.tests.adminUser = { 
        status: "ok", 
        found: !!data,
        user: data ? {
          id: data.id,
          email: data.email,
          name: data.name,
          role: data.role,
          hasPasswordHash: !!data.password_hash,
        } : null
      }
    }
  } catch (err) {
    results.tests.adminUser = { status: "exception", error: String(err) }
  }

  return NextResponse.json(results)
}
