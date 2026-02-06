"use client"

import { useState, useMemo } from "react"
import { Locale } from "@/i18n/config"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, Calendar, Clock, MapPin, User, Search, CreditCard, Phone, Mail } from "lucide-react"

interface User {
  id: string
  email: string
  name: string | null
  hkid: string | null
  phone: string | null
}

interface AppointmentFormProps {
  lang: Locale
  users: User[]
}

export default function AppointmentForm({ lang, users }: AppointmentFormProps) {
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

  // Filter users based on search (matches name, email, hkid, or phone)
  const filteredUsers = useMemo(() => {
    if (!userSearch.trim()) return users.slice(0, 10) // Show first 10 by default
    
    const search = userSearch.toLowerCase()
    return users.filter(user => 
      (user.name && user.name.toLowerCase().includes(search)) ||
      user.email.toLowerCase().includes(search) ||
      (user.hkid && user.hkid.toLowerCase().includes(search)) ||
      (user.phone && user.phone.toLowerCase().includes(search))
    ).slice(0, 20) // Limit to 20 results
  }, [userSearch, users])

  const selectedUser = users.find(u => u.id === formData.userId)

  const handleUserSelect = (user: User) => {
    setFormData({ ...formData, userId: user.id })
    setUserSearch(user.name || user.email)
    setShowUserDropdown(false)
  }

  const validateForm = () => {
    if (!formData.userId) {
      setError(lang === 'zh-TW' ? '請選擇用戶' : 'Please select a user')
      return false
    }
    if (!formData.title.trim()) {
      setError(lang === 'zh-TW' ? '請輸入預約標題' : 'Please enter appointment title')
      return false
    }
    if (!formData.doctor.trim()) {
      setError(lang === 'zh-TW' ? '請輸入醫生姓名' : 'Please enter doctor name')
      return false
    }
    if (!formData.date) {
      setError(lang === 'zh-TW' ? '請選擇日期' : 'Please select a date')
      return false
    }
    if (!formData.time) {
      setError(lang === 'zh-TW' ? '請選擇時間' : 'Please select a time')
      return false
    }
    if (!formData.location.trim()) {
      setError(lang === 'zh-TW' ? '請輸入地點' : 'Please enter location')
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
      const response = await fetch('/api/admin/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: formData.userId,
          title: formData.title,
          doctor: formData.doctor,
          date: formData.date,
          time: formData.time,
          location: formData.location,
          description: formData.description,
          lang,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || (lang === 'zh-TW' ? '創建失敗' : 'Failed to create appointment'))
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
      setError(lang === 'zh-TW' ? '發生錯誤，請稍後再試' : 'An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString(lang === 'zh-TW' ? 'zh-HK' : 'en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (timeStr: string) => {
    if (!timeStr) return ''
    const [hours, minutes] = timeStr.split(':')
    const date = new Date()
    date.setHours(parseInt(hours), parseInt(minutes))
    return date.toLocaleTimeString(lang === 'zh-TW' ? 'zh-HK' : 'en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>
            {lang === 'zh-TW' ? '預約詳情' : 'Appointment Details'}
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
                  {lang === 'zh-TW' ? '預約創建成功！' : 'Appointment created successfully!'}
                </AlertDescription>
              </Alert>
            )}

            {/* User Search with Autocomplete */}
            <div className="space-y-2">
              <Label>
                {lang === 'zh-TW' ? '搜索並選擇用戶 *' : 'Search and Select User *'}
              </Label>
              <p className="text-xs text-gray-500">
                {lang === 'zh-TW' 
                  ? '輸入姓名、電郵、HKID 或電話號碼進行搜索'
                  : 'Type name, email, HKID or phone to search'}
              </p>
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
                  placeholder={lang === 'zh-TW' ? '開始輸入以搜索用戶...' : 'Start typing to search users...'}
                  className="pl-10"
                />
                
                {/* Dropdown Results */}
                {showUserDropdown && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowUserDropdown(false)}
                    />
                    <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                      {filteredUsers.length === 0 ? (
                        <div className="px-4 py-3 text-sm text-gray-500 text-center">
                          {lang === 'zh-TW' ? '沒有找到用戶' : 'No users found'}
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
              
              {/* Selected User Display */}
              {selectedUser && (
                <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm font-medium text-blue-900">
                    {lang === 'zh-TW' ? '已選擇：' : 'Selected: '}{selectedUser.name || selectedUser.email}
                  </p>
                  <p className="text-xs text-blue-700">{selectedUser.email}</p>
                  {selectedUser.hkid && (
                    <p className="text-xs text-blue-700">HKID: {selectedUser.hkid}</p>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">
                {lang === 'zh-TW' ? '預約標題 *' : 'Appointment Title *'}
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder={lang === 'zh-TW' ? '例如：初步諮詢' : 'e.g., Initial Consultation'}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="doctor">
                {lang === 'zh-TW' ? '醫生 *' : 'Doctor *'}
              </Label>
              <Input
                id="doctor"
                value={formData.doctor}
                onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                placeholder={lang === 'zh-TW' ? '例如：Dr. Wai-Man Leung' : 'e.g., Dr. Wai-Man Leung'}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">
                  {lang === 'zh-TW' ? '日期 *' : 'Date *'}
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">
                  {lang === 'zh-TW' ? '時間 *' : 'Time *'}
                </Label>
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
              <Label htmlFor="location">
                {lang === 'zh-TW' ? '地點 *' : 'Location *'}
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                {lang === 'zh-TW' ? '描述 / 備註' : 'Description / Notes'}
              </Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder={lang === 'zh-TW' ? '任何額外資訊...' : 'Any additional information...'}
                className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#00477f] hover:bg-[#003d70]"
              disabled={loading || !formData.userId}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {lang === 'zh-TW' ? '創建預約' : 'Create Appointment'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Preview */}
      <div className="space-y-6">
        <Card className="border-2 border-dashed border-gray-300">
          <CardHeader>
            <CardTitle className="text-gray-600">
              {lang === 'zh-TW' ? '用戶預覽' : 'User Preview'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!selectedUser ? (
              <p className="text-gray-400 text-center py-8">
                {lang === 'zh-TW' ? '選擇用戶以查看預覽' : 'Select a user to see preview'}
              </p>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="bg-[#00477f] text-white px-6 py-4">
                  <h3 className="font-bold text-lg">
                    {lang === 'zh-TW' ? '預約確認' : 'Appointment Confirmation'}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {selectedUser.name || selectedUser.email}
                  </p>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">
                      {formData.title || (lang === 'zh-TW' ? '[預約標題]' : '[Appointment Title]')}
                    </h4>
                  </div>

                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-[#00477f] mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">
                        {lang === 'zh-TW' ? '醫生' : 'Doctor'}
                      </p>
                      <p className="font-medium text-gray-900">
                        {formData.doctor || (lang === 'zh-TW' ? '[醫生姓名]' : '[Doctor Name]')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-[#00477f] mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">
                        {lang === 'zh-TW' ? '日期' : 'Date'}
                      </p>
                      <p className="font-medium text-gray-900">
                        {formData.date ? formatDate(formData.date) : (lang === 'zh-TW' ? '[日期]' : '[Date]')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#00477f] mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">
                        {lang === 'zh-TW' ? '時間' : 'Time'}
                      </p>
                      <p className="font-medium text-gray-900">
                        {formData.time ? formatTime(formData.time) : (lang === 'zh-TW' ? '[時間]' : '[Time]')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#00477f] mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">
                        {lang === 'zh-TW' ? '地點' : 'Location'}
                      </p>
                      <p className="font-medium text-gray-900">
                        {formData.location || (lang === 'zh-TW' ? '[地點]' : '[Location]')}
                      </p>
                    </div>
                  </div>

                  {formData.description && (
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 bg-gray-50">
                      <p className="text-sm text-gray-500 mb-1">
                        {lang === 'zh-TW' ? '備註' : 'Notes'}
                      </p>
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {formData.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-3 text-center">
                  <p className="text-sm text-gray-500">
                    {lang === 'zh-TW' 
                      ? '如有疑問，請致電 +852 2345 6789'
                      : 'For inquiries, call +852 2345 6789'}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
