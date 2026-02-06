"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Locale } from "@/i18n/config"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Loader2, Calendar, Clock, MapPin, User, Phone, FileText, AlertCircle } from "lucide-react"

interface Appointment {
  id: string
  title: string
  doctor: string
  appointment_date: string
  appointment_time: string
  location: string
  description: string
  status: 'scheduled' | 'completed' | 'cancelled'
  created_at: string
}

interface BookingsPageProps {
  params: Promise<{ lang: string }>
}

export default function BookingsPage({ params }: BookingsPageProps) {
  const { data: session, status } = useSession()
  const [lang, setLang] = useState<Locale>('en')
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    params.then(p => setLang(p.lang as Locale))
  }, [params])

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect(`/${lang}/login`)
    }
  }, [status, lang])

  useEffect(() => {
    if (session?.user) {
      fetchAppointments()
    }
  }, [session])

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/user/appointments')
      const data = await response.json()

      if (response.ok) {
        setAppointments(data.appointments || [])
      } else {
        setError(data.error || 'Failed to load appointments')
      }
    } catch {
      setError(lang === 'zh-TW' ? '載入失敗' : 'Failed to load appointments')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(lang === 'zh-TW' ? 'zh-HK' : 'en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':')
    const date = new Date()
    date.setHours(parseInt(hours), parseInt(minutes))
    return date.toLocaleTimeString(lang === 'zh-TW' ? 'zh-HK' : 'en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled':
        return lang === 'zh-TW' ? '已預約' : 'Scheduled'
      case 'completed':
        return lang === 'zh-TW' ? '已完成' : 'Completed'
      case 'cancelled':
        return lang === 'zh-TW' ? '已取消' : 'Cancelled'
      default:
        return status
    }
  }

  const t = {
    title: lang === 'zh-TW' ? '我的預約' : 'My Appointments',
    subtitle: lang === 'zh-TW' ? '查看您的預約記錄' : 'View your appointment records',
    bookAppointment: {
      title: lang === 'zh-TW' ? '需要預約？' : 'Need to book an appointment?',
      description: lang === 'zh-TW'
        ? '請致電我們的熱線安排預約。我們的團隊將為您安排合適的醫生和時間。'
        : 'Please call our hotline to schedule an appointment. Our team will arrange a suitable doctor and time for you.',
      call: '+852 2345 6789',
    },
    noAppointments: {
      title: lang === 'zh-TW' ? '暫無預約' : 'No Appointments',
      description: lang === 'zh-TW'
        ? '您目前沒有任何預約記錄。'
        : 'You have no appointment records at the moment.',
      contact: lang === 'zh-TW' ? '聯絡我們' : 'Contact Us',
    },
    loading: lang === 'zh-TW' ? '載入中...' : 'Loading...',
    error: lang === 'zh-TW' ? '載入失敗' : 'Failed to load appointments',
    doctor: lang === 'zh-TW' ? '醫生' : 'Doctor',
    date: lang === 'zh-TW' ? '日期' : 'Date',
    time: lang === 'zh-TW' ? '時間' : 'Time',
    location: lang === 'zh-TW' ? '地點' : 'Location',
    notes: lang === 'zh-TW' ? '備註' : 'Notes',
  }

  if (status === 'loading' || loading) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#00477f]" />
          <p className="mt-4 text-gray-600">{t.loading}</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
          <p className="mt-2 text-gray-600">{t.subtitle}</p>
        </div>

        {/* Info Card */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="font-semibold text-blue-900 mb-1">{t.bookAppointment.title}</h2>
                <p className="text-blue-800 text-sm mb-3">{t.bookAppointment.description}</p>
                <a 
                  href={`tel:${t.bookAppointment.call.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-900"
                >
                  <Phone className="w-4 h-4" />
                  {t.bookAppointment.call}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {appointments.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{t.noAppointments.title}</h2>
              <p className="text-gray-600 mb-6">{t.noAppointments.description}</p>
              <Button asChild variant="outline" className="border-[#00477f] text-[#00477f]">
                <a href={`/${lang}#contact`}>
                  <Phone className="w-4 h-4 mr-2" />
                  {t.noAppointments.contact}
                </a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    {/* Main Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg font-semibold text-gray-900">{appointment.title}</h3>
                        <Badge className={getStatusColor(appointment.status)}>
                          {getStatusText(appointment.status)}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4 text-[#00477f]" />
                        <span>{t.doctor}: {appointment.doctor}</span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4 text-[#00477f]" />
                          {formatDate(appointment.appointment_date)}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4 text-[#00477f]" />
                          {formatTime(appointment.appointment_time)}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4 text-[#00477f]" />
                          {appointment.location}
                        </div>
                      </div>

                      {appointment.description && (
                        <div className="flex items-start gap-3 pt-4 border-t">
                          <FileText className="w-4 h-4 text-[#00477f] mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-500">{t.notes}</p>
                            <p className="font-medium text-gray-900 whitespace-pre-wrap">
                              {appointment.description}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
