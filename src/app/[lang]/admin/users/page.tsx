import { Metadata } from "next"
import { requireAdmin } from "@/lib/auth"
import { getDictionary } from "@/i18n/get-dictionary"
import { Locale } from "@/i18n/config"
import { getSupabaseAdmin } from "@/lib/supabase"
import { UsersList } from "./users-list"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === "zh-TW" ? "用戶管理 - BEVA 診所" : "User Management - BEVA Clinic",
  }
}

export default async function UsersPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  await requireAdmin()

  const { data: users } = await getSupabaseAdmin()
    .from("users")
    .select("id, email, name, hkid, phone, role, created_at")
    .order("created_at", { ascending: false })

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <UsersList 
          lang={lang as Locale} 
          users={users || []} 
        />
      </div>
    </main>
  )
}
