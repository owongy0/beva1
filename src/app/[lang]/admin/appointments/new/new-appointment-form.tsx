"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Locale } from "@/i18n/config"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Loader2, 
  CheckCircle, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Search, 
  CreditCard, 
  Phone, 
  Mail,
  ArrowLeft,
  Stethoscope,
  FileText
} from "lucide-react"

interface User {
  id: string
  email: string
  name: string | null
  hkid: string | null
  phone: string | null
}

interface NewAppointmentFormProps {
  lang: Locale
  users: User[]
}

export function NewAppointmentForm({ lang, users }: NewAppointmentFormProps) {
  const [formData, setFormData] = useState({
    userId: "",
    title: "",
    doctor: "",
    date: "",
    time: "",
    location: "21/F, 21 Ashley Road, Tsim Sha Tsui, Hong Kong",
    description: "",
  })
  const [userSearch, setUserSearch] = useState("")
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const t = {
    title: lang === "zh-TW" ? "創建新預約" : "Create New Appointment",
    subtitle: lang === "zh-TW" ? "為用戶手動創建預約記錄" : "Manually create an appointment record for a user",
    back: lang === "zh-TW" ? "返回預約列表" : "Back to Appointments",
    form: {
      user: {
        label: lang === "zh-TW" ? "選擇用戶 *" : "Select User *",
        hint: lang === "zh-TW" ? "輸入姓名、電郵、HKID 或電話號碼進行搜索" : "Type name, email, HKID or phone to search",
        placeholder: lang === "zh-TW" ? "開始輸入以搜索用戶..." : "Start typing to search users...",
        noResults: lang === "zh-TW" ? "沒有找到用戶" : "No users found",
        selected: lang === "zh-TW" ? "已選擇" : "Selected",
      },
      title: {
        label: lang === "zh-TW" ? "預約標題 *" : "Appointment Title *",
        placeholder: lang === "zh-TW" ? "例如：初步諮詢" : "e.g., Initial Consultation",
      },
      doctor: {
        label: lang === "zh-TW" ? "醫生 *" : "Doctor *",
        placeholder: lang === "zh-TW" ? "例如：Dr. Wai-Man Leung" : "e.g., Dr. Wai-Man Leung",
      },
      date: {
        label: lang === "zh-TW" ? "日期 *" : "Date *",
      },
      time: {
        label: lang === "zh-TW" ? "時間 *" : "Time *",
      },
      location: {
        label: lang === "zh-TW" ? "地點 *" : "Location *",
      },
      description: {
        label: lang === "zh-TW" ? "描述 / 備註" : "Description / Notes",
        placeholder: lang === "zh-TW" ? "任何額外資訊..." : "Any additional information...",
      },
      submit: lang === "zh-TW" ? "創建預約" : "Create Appointment",
      success: lang === "zh-TW" ? "預約創建成功！" : "Appointment created successfully!",
    },
    preview: {
      title: lang === "zh-TW" ? "預約預覽" : "Appointment Preview",
      confirmation: lang === "zh-TW" ? "預約確認" : "Appointment Confirmation",
      doctor: lang === "zh-TW" ? "醫生" : "Doctor",
      date: lang === "zh-TW" ? "日期" : "Date",
      time: lang === "zh-TW" ? "時間" : "Time",
      location: lang === "zh-TW" ? "地點" : "Location",
      notes: lang === "zh-TW" ? "備註" : "Notes",
      placeholder: {
        title: lang === "zh-TW" ? "[預約標題]" : "[Appointment Title]",
        doctor: lang === "zh-TW" ? "[醫生姓名]" : "[Doctor Name]",
        date: lang === "zh-TW" ? "[日期]" : "[Date]",
        time: lang === "zh-TW" ? "[時間]" : "[Time]",
        location: lang === "zh-TW" ? "[地點]" : "[Location]",
      },
      selectUser: lang === "zh-TW" ? "選擇用戶以查看預覽" : "Select a user to see preview",
      inquiry: lang === "zh-TW" ? "如有疑問，請致電 +852 2345 6789" : "For inquiries, call +852 2345 6789",
    },
    validation: {
      user: lang === "zh-TW" ? "請選擇用戶" : "Please select a user",
      title: lang === "zh-TW" ? "請輸入預約標題" : "Please enter appointment title",
      doctor: lang === "zh-TW" ? "請輸入醫生姓名" : "Please enter doctor name",
      date: lang === "zh-TW" ? "請選擇日期" : "Please select a date",
      time: lang === "zh-TW" ? "請選擇時間" : "Please select a time",
      location: lang === "zh-TW" ? "請輸入地點" : "Please enter location",
    },
    error: lang === "zh-TW" ? "發生錯誤，請稍後再試" : "An error occurred. Please try again.",
  }

  const filteredUsers = useMemo(() => {
    if (!userSearch.trim()) return users.slice(0, 10)
    
    const search = userSearch.toLowerCase()
    return users.filter(user => 
      (user.name && user.name.toLowerCase().includes(search)) ||
      user.email.toLowerCase().includes(search) ||
      (user.hkid && user.hkid.toLowerCase().includes(search)) ||
      (user.phone && user.phone.toLowerCase().includes(search))
    ).slice(0, 20)
  }, [userSearch, users])

  const selectedUser = users.find(u => u.id === formData.userId)

  const handleUserSelect = (user: User) => {
    setFormData({ ...formData, userId: user.id })
    setUserSearch(user.name || user.email)
    setShowUserDropdown(false)
  }

  const validateForm = () => {
    if (!formData.userId) {
      setError(t.validation.user)
      return false
    }
    if (!formData.title.trim()) {
      setError(t.validation.title)
      return false
    }
    if (!formData.doctor.trim()) {
      setError(t.validation.doctor)
      return false
    }
    if (!formData.date) {
      setError(t.validation.date)
      return false
    }
    if (!formData.time) {
      setError(t.validation.time)
      return false
    }
    if (!formData.location.trim()) {
      setError(t.validation.location)
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!validateForm()) return

    setLoading(true)

    try {
      const response = await fetch("/api/admin/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: formData.userId,
          title: formData.title,
          doctor: formData.doctor,
          date: formData.date,
          time: formData.time,
          location: formData.location,
          description: formData.description,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || (lang === "zh-TW" ? "創建失敗" : "Failed to create appointment"))
      } else {
        setSuccess(true)
        setFormData({
          userId: "",
          title: "",
          doctor: "",
          date: "",
          time: "",
          location: "21/F, 21 Ashley Road, Tsim Sha Tsui, Hong Kong",
          description: "",
        })
        setUserSearch("")
      }
    } catch {
      setError(t.error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ""
    const date = new Date(dateStr)
    return date.toLocaleDateString(lang === "zh-TW" ? "zh-HK" : "en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  const formatTime = (timeStr: string) => {
    if (!timeStr) return ""
    const [hours, minutes] = timeStr.split(":")
    const date = new Date()
    date.setHours(parseInt(hours), parseInt(minutes))
    return date.toLocaleTimeString(lang === "zh-TW" ? "zh-HK" : "en-GB", {
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
          <p className="mt-2 text-gray-600">{t.subtitle}</p>
        </div>
        <Button asChild variant="outline">
          <Link href={`/${lang}/admin/appointments`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.back}
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-[#00477f]" />
              {lang === "zh-TW" ? "預約詳情" : "Appointment Details"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    {t.form.success}
                  </AlertDescription>
                </Alert>
              )}

              {/* User Search */}
              <div className="space-y-2">
                <Label>{t.form.user.label}</Label>
                <p className="text-xs text-gray-500">{t.form.user.hint}</p>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    value={userSearch}
                    onChange={(e) => {
                      setUserSearch(e.target.value)
                      setShowUserDropdown(true)
                      if (!e.target.value) {
                        setFormData({ ...formData, userId: "" })
                      }
                    }}
                    onFocus={() => setShowUserDropdown(true)}
                    placeholder={t.form.user.placeholder}
                    className="pl-10"
                  />
                  
                  {showUserDropdown && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setShowUserDropdown(false)}
                      />
                      <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                        {filteredUsers.length === 0 ? (
                          <div className="px-4 py-3 text-sm text-gray-500 text-center">
                            {t.form.user.noResults}
                          </div>
                        ) : (
                          filteredUsers.map((user) => (
                            <button
                              key={user.id}
                              type="button"
                              onClick={() => handleUserSelect(user)}
                              className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0"
                            >
                              <div className="font-medium text-gray-900">
                                {user.name || user.email}
                              </div>
                              <div className="flex flex-wrap gap-2 mt-1 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Mail className="w-3 h-3" />
                                  {user.email}
                                </span>
                                {user.hkid && (
                                  <span className="flex items-center gap-1">
                                    <CreditCard className="w-3 h-3" />
                                    HKID: {user.hkid}
                                  </span>
                                )}
                                {user.phone && (
                                  <span className="flex items-center gap-1">
                                    <Phone className="w-3 h-3" />
                                    {user.phone}
                                  </span>
                                )}
                              </div>
                            </button>
                          ))
                        )}
                      </div>
                    </>
                  )}
                </div>
                
                {selectedUser && (
                  <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm font-medium text-blue-900">
                      {t.form.user.selected}: {selectedUser.name || selectedUser.email}
                    </p>
                    <p className="text-xs text-blue-700">{selectedUser.email}</p>
                    {selectedUser.hkid && (
                      <p className="text-xs text-blue-700">HKID: {selectedUser.hkid}</p>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">{t.form.title.label}</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder={t.form.title.placeholder}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="doctor">{t.form.doctor.label}</Label>
                <Input
                  id="doctor"
                  value={formData.doctor}
                  onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                  placeholder={t.form.doctor.placeholder}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">{t.form.date.label}</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">{t.form.time.label}</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">{t.form.location.label}</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">{t.form.description.label}</Label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder={t.form.description.placeholder}
                  className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#00477f] hover:bg-[#003d70]"
                disabled={loading || !formData.userId}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t.form.submit}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card className="border-2 border-dashed border-gray-300">
          <CardHeader>
            <CardTitle className="text-gray-600 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              {t.preview.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!selectedUser ? (
              <p className="text-gray-400 text-center py-8">{t.preview.selectUser}</p>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="bg-[#00477f] text-white px-6 py-4">
                  <h3 className="font-bold text-lg">{t.preview.confirmation}</h3>
                  <p className="text-white/80 text-sm">
                    {selectedUser.name || selectedUser.email}
                  </p>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">
                      {formData.title || t.preview.placeholder.title}
                    </h4>
                  </div>

                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-[#00477f] mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">{t.preview.doctor}</p>
                      <p className="font-medium text-gray-900">
                        {formData.doctor || t.preview.placeholder.doctor}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-[#00477f] mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">{t.preview.date}</p>
                      <p className="font-medium text-gray-900">
                        {formData.date ? formatDate(formData.date) : t.preview.placeholder.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#00477f] mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">{t.preview.time}</p>
                      <p className="font-medium text-gray-900">
                        {formData.time ? formatTime(formData.time) : t.preview.placeholder.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#00477f] mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">{t.preview.location}</p>
                      <p className="font-medium text-gray-900">
                        {formData.location || t.preview.placeholder.location}
                      </p>
                    </div>
                  </div>

                  {formData.description && (
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 bg-gray-50">
                      <p className="text-sm text-gray-500 mb-1">{t.preview.notes}</p>
                      <p className="text-gray-700 whitespace-pre-wrap">{formData.description}</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-3 text-center">
                  <p className="text-sm text-gray-500">{t.preview.inquiry}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
