import { Metadata } from "next"
import { redirect } from "next/navigation"
import { requireAdmin } from "@/lib/auth"
import { getDictionary } from "@/i18n/get-dictionary"
import { Locale } from "@/i18n/config"
import { getSupabaseAdmin } from "@/lib/supabase"
import AppointmentsList from "./appointments-list"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'zh-TW' ? '所有預約 - BEVA 診所' : 'All Appointments - BEVA Clinic',
  }
}

export default async function AdminAppointmentsListPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  await requireAdmin()
  const dict = await getDictionary(lang as Locale)

  // Fetch all appointments with user info
  const { data: appointments } = await getSupabaseAdmin()
    .from("appointments")
    .select(`
      *,
      user:user_id (id, email, name)
    `)
    .order('appointment_date', { ascending: true })

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {lang === 'zh-TW' ? '所有預約' : 'All Appointments'}
          </h1>
          <p className="mt-2 text-gray-600">
            {lang === 'zh-TW' 
              ? '查看和管理所有預約記錄' 
              : 'View and manage all appointment records'}
          </p>
        </div>

        <AppointmentsList 
          lang={lang as Locale} 
          appointments={appointments || []} 
        />
      </div>
    </main>
  )
}
