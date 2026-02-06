"use client"

import { useState } from "react"
import { Locale } from "@/i18n/config"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Clock, MapPin, User, Search, Loader2, CheckCircle, XCircle, Trash2, Edit2, RotateCcw } from "lucide-react"

interface User {
  id: string
  email: string
  name: string | null
}

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
  user: User
}

interface AppointmentsListProps {
  lang: Locale
  appointments: Appointment[]
}

export default function AppointmentsList({ lang, appointments: initialAppointments }: AppointmentsListProps) {
  const [appointments, setAppointments] = useState(initialAppointments)
  const [filter, setFilter] = useState<'all' | 'scheduled' | 'completed' | 'cancelled'>('all')
  const [search, setSearch] = useState("")
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<Appointment>>({})

  const filteredAppointments = appointments.filter(apt => {
    const matchesFilter = filter === 'all' || apt.status === filter
    const matchesSearch = 
      apt.title.toLowerCase().includes(search.toLowerCase()) ||
      apt.doctor.toLowerCase().includes(search.toLowerCase()) ||
      apt.user.email.toLowerCase().includes(search.toLowerCase()) ||
      (apt.user.name && apt.user.name.toLowerCase().includes(search.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(lang === 'zh-TW' ? 'zh-HK' : 'en-GB', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
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
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200'
      case 'completed':
        return 'bg-green-100 text-green-800 hover:bg-green-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 hover:bg-red-200'
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

  const updateStatus = async (id: string, newStatus: 'scheduled' | 'completed' | 'cancelled') => {
    setLoadingId(id)
    try {
      const response = await fetch(`/api/admin/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setAppointments(prev => prev.map(apt => 
          apt.id === id ? { ...apt, status: newStatus } : apt
        ))
      }
    } catch (error) {
      console.error('Failed to update status:', error)
    } finally {
      setLoadingId(null)
    }
  }

  const deleteAppointment = async (id: string) => {
    if (!confirm(lang === 'zh-TW' ? '確定要刪除此預約嗎？' : 'Are you sure you want to delete this appointment?')) {
      return
    }

    setLoadingId(id)
    try {
      const response = await fetch(`/api/admin/appointments/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setAppointments(prev => prev.filter(apt => apt.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete:', error)
    } finally {
      setLoadingId(null)
    }
  }

  const startEdit = (appointment: Appointment) => {
    setEditingId(appointment.id)
    setEditForm({
      title: appointment.title,
      doctor: appointment.doctor,
      appointment_date: appointment.appointment_date,
      appointment_time: appointment.appointment_time,
      location: appointment.location,
      description: appointment.description,
    })
  }

  const saveEdit = async (id: string) => {
    setLoadingId(id)
    try {
      const response = await fetch(`/api/admin/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editForm.title,
          doctor: editForm.doctor,
          date: editForm.appointment_date,
          time: editForm.appointment_time,
          location: editForm.location,
          description: editForm.description,
        }),
      })

      if (response.ok) {
        const { appointment } = await response.json()
        setAppointments(prev => prev.map(apt => 
          apt.id === id ? { ...apt, ...appointment } : apt
        ))
        setEditingId(null)
      }
    } catch (error) {
      console.error('Failed to update:', error)
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={lang === 'zh-TW' ? '搜索預約...' : 'Search appointments...'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background"
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'scheduled', 'completed', 'cancelled'] as const).map((status) => (
                <Button
                  key={status}
                  variant={filter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(status)}
                  className={filter === status ? "bg-[#00477f]" : ""}
                >
                  {status === 'all' 
                    ? (lang === 'zh-TW' ? '全部' : 'All')
                    : getStatusText(status)
                  }
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results count */}
      <p className="text-sm text-gray-600">
        {lang === 'zh-TW' 
          ? `顯示 ${filteredAppointments.length} 個預約`
          : `Showing ${filteredAppointments.length} appointments`
        }
      </p>

      {/* Appointments List */}
      {filteredAppointments.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-600">
              {lang === 'zh-TW' ? '沒有找到預約' : 'No appointments found'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <Card key={appointment.id} className="hover:shadow-md transition-shadow">
              {editingId === appointment.id ? (
                // Edit Mode
                <>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {lang === 'zh-TW' ? '編輯預約' : 'Edit Appointment'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>{lang === 'zh-TW' ? '標題' : 'Title'}</Label>
                        <Input
                          value={editForm.title}
                          onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{lang === 'zh-TW' ? '醫生' : 'Doctor'}</Label>
                        <Input
                          value={editForm.doctor}
                          onChange={(e) => setEditForm({...editForm, doctor: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{lang === 'zh-TW' ? '日期' : 'Date'}</Label>
                        <Input
                          type="date"
                          value={editForm.appointment_date}
                          onChange={(e) => setEditForm({...editForm, appointment_date: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{lang === 'zh-TW' ? '時間' : 'Time'}</Label>
                        <Input
                          type="time"
                          value={editForm.appointment_time}
                          onChange={(e) => setEditForm({...editForm, appointment_time: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>{lang === 'zh-TW' ? '地點' : 'Location'}</Label>
                        <Input
                          value={editForm.location}
                          onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>{lang === 'zh-TW' ? '描述' : 'Description'}</Label>
                        <textarea
                          className="w-full min-h-[80px] px-3 py-2 rounded-md border border-input bg-background"
                          value={editForm.description}
                          onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => saveEdit(appointment.id)}
                        disabled={loadingId === appointment.id}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {loadingId === appointment.id && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {lang === 'zh-TW' ? '保存' : 'Save'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setEditingId(null)}
                      >
                        {lang === 'zh-TW' ? '取消' : 'Cancel'}
                      </Button>
                    </div>
                  </CardContent>
                </>
              ) : (
                // View Mode
                <CardContent className="pt-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    {/* Main Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {appointment.title}
                        </h3>
                        <Badge className={getStatusColor(appointment.status)}>
                          {getStatusText(appointment.status)}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4 text-[#00477f]" />
                        <span>{appointment.user.name || appointment.user.email}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4 text-[#00477f]" />
                        <span>{lang === 'zh-TW' ? '醫生：' : 'Doctor: '}{appointment.doctor}</span>
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
                        <p className="text-sm text-gray-600 pt-2 border-t">
                          {appointment.description}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex lg:flex-col gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => startEdit(appointment)}
                        className="border-[#00477f] text-[#00477f]"
                      >
                        <Edit2 className="w-4 h-4 mr-1" />
                        {lang === 'zh-TW' ? '編輯' : 'Edit'}
                      </Button>
                      
                      {appointment.status === 'scheduled' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateStatus(appointment.id, 'completed')}
                          disabled={loadingId === appointment.id}
                          className="border-green-600 text-green-600"
                        >
                          {loadingId === appointment.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <CheckCircle className="w-4 h-4 mr-1" />
                          )}
                          {lang === 'zh-TW' ? '完成' : 'Complete'}
                        </Button>
                      )}
                      
                      {appointment.status === 'scheduled' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateStatus(appointment.id, 'cancelled')}
                          disabled={loadingId === appointment.id}
                          className="border-red-600 text-red-600"
                        >
                          {loadingId === appointment.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <XCircle className="w-4 h-4 mr-1" />
                          )}
                          {lang === 'zh-TW' ? '取消' : 'Cancel'}
                        </Button>
                      )}
                      
                      {appointment.status === 'cancelled' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateStatus(appointment.id, 'scheduled')}
                          disabled={loadingId === appointment.id}
                          className="border-blue-600 text-blue-600"
                        >
                          {loadingId === appointment.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <CheckCircle className="w-4 h-4 mr-1" />
                          )}
                          {lang === 'zh-TW' ? '重新預約' : 'Reschedule'}
                        </Button>
                      )}

                      {appointment.status === 'completed' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateStatus(appointment.id, 'scheduled')}
                          disabled={loadingId === appointment.id}
                          className="border-orange-600 text-orange-600"
                        >
                          {loadingId === appointment.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <RotateCcw className="w-4 h-4 mr-1" />
                          )}
                          {lang === 'zh-TW' ? '撤銷完成' : 'Undo Complete'}
                        </Button>
                      )}

                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deleteAppointment(appointment.id)}
                        disabled={loadingId === appointment.id}
                        className="border-gray-400 text-gray-600 hover:border-red-600 hover:text-red-600"
                      >
                        {loadingId === appointment.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4 mr-1" />
                        )}
                        {lang === 'zh-TW' ? '刪除' : 'Delete'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
