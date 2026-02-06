import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name, lang = 'en' } = body

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: lang === 'zh-TW' ? '請填寫所有必填欄位' : 'Please fill in all required fields' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: lang === 'zh-TW' ? '請輸入有效的電郵地址' : 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Password validation (min 8 chars)
    if (password.length < 8) {
      return NextResponse.json(
        { error: lang === 'zh-TW' ? '密碼必須至少 8 個字符' : 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const { data: existingUser } = await getSupabaseAdmin()
      .from("users")
      .select("id")
      .eq("email", email)
      .single()

    if (existingUser) {
      return NextResponse.json(
        { error: lang === 'zh-TW' ? '此電郵已被註冊' : 'This email is already registered' },
        { status: 409 }
      )
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12)

    // Create user (auto-verified - no email verification needed)
    const { data: newUser, error: createError } = await getSupabaseAdmin()
      .from("users")
      .insert({
        email,
        name,
        password_hash: passwordHash,
        role: 'user',
        email_verified: new Date().toISOString(), // Auto-verify
        email_verified_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (createError || !newUser) {
      console.error('[REGISTER] Failed to create user:', createError)
      return NextResponse.json(
        { error: lang === 'zh-TW' ? '註冊失敗，請稍後再試' : 'Registration failed, please try again later' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: lang === 'zh-TW'
        ? '註冊成功！您現在可以登入。'
        : 'Registration successful! You can now log in.',
      userId: newUser.id,
    })

  } catch (error) {
    console.error('[REGISTER] Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
