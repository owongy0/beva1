import { Metadata } from "next"
import Link from "next/link"
import { requireAdmin } from "@/lib/auth"
import { getDictionary } from "@/i18n/get-dictionary"
import { Locale } from "@/i18n/config"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, CalendarPlus, CalendarDays } from "lucide-react"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === "zh-TW" ? "管理員控制台 - BEVA 診所" : "Admin Dashboard - BEVA Clinic",
  }
}

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const user = await requireAdmin()
  const dict = await getDictionary(lang as Locale)

  const t = {
    title: lang === "zh-TW" ? "管理員控制台" : "Admin Dashboard",
    loggedInAs: lang === "zh-TW" ? "已登入為" : "Logged in as",
    users: {
      title: lang === "zh-TW" ? "用戶管理" : "User Management",
      description: lang === "zh-TW" 
        ? "查看和管理所有註冊用戶資料" 
        : "View and manage all registered user accounts",
      button: lang === "zh-TW" ? "管理用戶" : "Manage Users",
    },
    appointments: {
      title: lang === "zh-TW" ? "預約管理" : "Appointment Management",
      view: {
        title: lang === "zh-TW" ? "查看預約" : "View Appointments",
        description: lang === "zh-TW"
          ? "查看和管理所有預約記錄"
          : "View and manage all appointment records",
        button: lang === "zh-TW" ? "查看預約" : "View Appointments",
      },
      create: {
        title: lang === "zh-TW" ? "創建新預約" : "Create Appointment",
        description: lang === "zh-TW"
          ? "為用戶手動創建新的預約記錄"
          : "Manually create a new appointment for a user",
        button: lang === "zh-TW" ? "創建預約" : "Create Appointment",
      },
    },
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
          <div className="text-sm text-gray-500">
            {t.loggedInAs}: {user.email}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Management Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-[#00477f]" />
                {t.users.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">{t.users.description}</p>
              <Button asChild className="w-full bg-[#00477f] hover:bg-[#003d70]">
                <Link href={`/${lang}/admin/users`}>{t.users.button}</Link>
              </Button>
            </CardContent>
          </Card>

          {/* View Appointments Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-[#00477f]" />
                {t.appointments.view.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">{t.appointments.view.description}</p>
              <Button asChild className="w-full bg-[#00477f] hover:bg-[#003d70]">
                <Link href={`/${lang}/admin/appointments`}>{t.appointments.view.button}</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Create Appointment Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarPlus className="w-5 h-5 text-[#00477f]" />
                {t.appointments.create.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">{t.appointments.create.description}</p>
              <Button asChild className="w-full bg-[#00477f] hover:bg-[#003d70]">
                <Link href={`/${lang}/admin/appointments/new`}>{t.appointments.create.button}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
