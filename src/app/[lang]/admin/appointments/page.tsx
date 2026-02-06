import { Metadata } from "next"
import { requireAdmin } from "@/lib/auth"
import { getDictionary } from "@/i18n/get-dictionary"
import { Locale } from "@/i18n/config"
import { supabaseAdmin } from "@/lib/supabase"
import { AppointmentsList } from "./appointments-list"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === "zh-TW" ? "所有預約 - BEVA 診所" : "All Appointments - BEVA Clinic",
  }
}

export default async function AppointmentsPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  await requireAdmin()

  const { data: appointments } = await supabaseAdmin
    .from("appointments")
    .select(`
      *,
      user:user_id (id, email, name)
    `)
    .order("appointment_date", { ascending: true })

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <AppointmentsList 
          lang={lang as Locale} 
          appointments={appointments || []} 
        />
      </div>
    </main>
  )
}
