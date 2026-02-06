import { Metadata } from "next"
import { requireAdmin } from "@/lib/auth"
import { getDictionary } from "@/i18n/get-dictionary"
import { Locale } from "@/i18n/config"
import { supabaseAdmin } from "@/lib/supabase"
import { NewAppointmentForm } from "./new-appointment-form"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === "zh-TW" ? "創建新預約 - BEVA 診所" : "Create Appointment - BEVA Clinic",
  }
}

export default async function NewAppointmentPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  await requireAdmin()

  const { data: users } = await supabaseAdmin
    .from("users")
    .select("id, email, name, hkid, phone")
    .eq("role", "user")
    .order("name")

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <NewAppointmentForm 
          lang={lang as Locale} 
          users={users || []} 
        />
      </div>
    </main>
  )
}
