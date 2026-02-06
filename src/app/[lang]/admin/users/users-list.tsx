"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Locale } from "@/i18n/config"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { 
  User, 
  Search, 
  Mail, 
  Calendar, 
  Phone, 
  CreditCard, 
  Loader2, 
  Edit2, 
  Eye,
  ArrowLeft,
  CalendarDays
} from "lucide-react"

interface UserData {
  id: string
  email: string
  name: string | null
  hkid: string | null
  phone: string | null
  role: "user" | "admin"
  created_at: string
}

interface Appointment {
  id: string
  title: string
  doctor: string
  appointment_date: string
  appointment_time: string
  location: string
  description: string | null
  status: "scheduled" | "completed" | "cancelled"
}

interface UsersListProps {
  lang: Locale
  users: UserData[]
}

export function UsersList({ lang, users: initialUsers }: UsersListProps) {
  const [users, setUsers] = useState(initialUsers)
  const [search, setSearch] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  
  const [editingUser, setEditingUser] = useState<UserData | null>(null)
  const [editForm, setEditForm] = useState<Partial<UserData>>({})
  
  const [viewingUser, setViewingUser] = useState<UserData | null>(null)
  const [userAppointments, setUserAppointments] = useState<Appointment[]>([])
  const [loadingAppointments, setLoadingAppointments] = useState(false)

  const t = {
    title: lang === "zh-TW" ? "用戶管理" : "User Management",
    subtitle: lang === "zh-TW" ? "查看和管理所有註冊用戶" : "View and manage all registered users",
    back: lang === "zh-TW" ? "返回控制台" : "Back to Dashboard",
    search: {
      label: lang === "zh-TW" ? "搜索用戶" : "Search Users",
      placeholder: lang === "zh-TW" ? "輸入姓名、電郵、HKID 或電話號碼..." : "Type name, email, HKID or phone...",
      hint: lang === "zh-TW" ? "輸入姓名、電郵、HKID 或電話號碼進行搜索" : "Type name, email, HKID or phone to search",
      noResults: lang === "zh-TW" ? "沒有找到用戶" : "No users found",
      clear: lang === "zh-TW" ? "清除" : "Clear",
      filteredTo: lang === "zh-TW" ? "已篩選至" : "Filtered to",
    },
    showing: lang === "zh-TW" ? "顯示" : "Showing",
    users_count: lang === "zh-TW" ? "個用戶" : "users",
    noUsers: lang === "zh-TW" ? "沒有找到用戶" : "No users found",
    userInfo: {
      joined: lang === "zh-TW" ? "註冊於" : "Joined",
      hkid: "HKID",
      phone: lang === "zh-TW" ? "電話" : "Phone",
    },
    roles: {
      admin: lang === "zh-TW" ? "管理員" : "Admin",
      user: lang === "zh-TW" ? "用戶" : "User",
    },
    actions: {
      edit: lang === "zh-TW" ? "編輯" : "Edit",
      viewBookings: lang === "zh-TW" ? "查看預約" : "View Bookings",
    },
    editModal: {
      title: lang === "zh-TW" ? "編輯用戶資料" : "Edit User Details",
      name: lang === "zh-TW" ? "姓名" : "Name",
      email: lang === "zh-TW" ? "電郵" : "Email",
      hkid: "HKID",
      phone: lang === "zh-TW" ? "電話" : "Phone",
      save: lang === "zh-TW" ? "保存" : "Save",
      cancel: lang === "zh-TW" ? "取消" : "Cancel",
    },
    bookingsModal: {
      title: lang === "zh-TW" ? "的預約" : "'s Appointments",
      noAppointments: lang === "zh-TW" ? "暫無預約" : "No appointments",
      doctor: lang === "zh-TW" ? "醫生" : "Doctor",
    },
    status: {
      scheduled: lang === "zh-TW" ? "已預約" : "Scheduled",
      completed: lang === "zh-TW" ? "已完成" : "Completed",
      cancelled: lang === "zh-TW" ? "已取消" : "Cancelled",
    },
  }

  const filteredUsers = useMemo(() => {
    if (!search.trim()) return users.slice(0, 10)
    
    const searchLower = search.toLowerCase()
    return users.filter(user => 
      (user.name && user.name.toLowerCase().includes(searchLower)) ||
      user.email.toLowerCase().includes(searchLower) ||
      (user.hkid && user.hkid.toLowerCase().includes(searchLower)) ||
      (user.phone && user.phone.toLowerCase().includes(searchLower))
    ).slice(0, 20)
  }, [search, users])

  const displayedUsers = useMemo(() => {
    if (search.trim()) return filteredUsers
    return users
  }, [search, filteredUsers, users])

  const selectedUser = users.find(u => u.id === selectedUserId)

  const handleUserSelect = (user: UserData) => {
    setSelectedUserId(user.id)
    setSearch(user.name || user.email)
    setShowDropdown(false)
  }

  const clearSelection = () => {
    setSelectedUserId(null)
    setSearch("")
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(lang === "zh-TW" ? "zh-HK" : "en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":")
    const date = new Date()
    date.setHours(parseInt(hours), parseInt(minutes))
    return date.toLocaleTimeString(lang === "zh-TW" ? "zh-HK" : "en-GB", {
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const getRoleColor = (role: string) => {
    return role === "admin" 
      ? "bg-purple-100 text-purple-800" 
      : "bg-gray-100 text-gray-800"
  }

  const getRoleText = (role: string) => {
    return role === "admin" ? t.roles.admin : t.roles.user
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-blue-100 text-blue-800"
      case "completed": return "bg-green-100 text-green-800"
      case "cancelled": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "scheduled": return t.status.scheduled
      case "completed": return t.status.completed
      case "cancelled": return t.status.cancelled
      default: return status
    }
  }

  const startEdit = (user: UserData) => {
    setEditingUser(user)
    setEditForm({
      name: user.name,
      email: user.email,
      hkid: user.hkid,
      phone: user.phone,
    })
  }

  const saveEdit = async () => {
    if (!editingUser) return
    
    setLoadingId(editingUser.id)
    try {
      const response = await fetch(`/api/admin/users/${editingUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      })

      if (response.ok) {
        const { user } = await response.json()
        setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...user } : u))
        setEditingUser(null)
      } else {
        const data = await response.json()
        alert(data.error || "Failed to update user")
      }
    } catch (error) {
      console.error("Failed to update:", error)
    } finally {
      setLoadingId(null)
    }
  }

  const viewBookings = async (user: UserData) => {
    setViewingUser(user)
    setLoadingAppointments(true)
    
    try {
      const response = await fetch(`/api/admin/users/${user.id}`)
      const data = await response.json()
      
      if (response.ok) {
        setUserAppointments(data.appointments || [])
      }
    } catch (error) {
      console.error("Failed to load appointments:", error)
    } finally {
      setLoadingAppointments(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
          <p className="mt-2 text-gray-600">{t.subtitle}</p>
        </div>
        <Button asChild variant="outline">
          <Link href={`/${lang}/admin`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.back}
          </Link>
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium">{t.search.label}</Label>
            <p className="text-xs text-gray-500">{t.search.hint}</p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setShowDropdown(true)
                  if (!e.target.value) {
                    setSelectedUserId(null)
                  }
                }}
                onFocus={() => setShowDropdown(true)}
                placeholder={t.search.placeholder}
                className="pl-10"
              />
              
              {showDropdown && search.trim() && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowDropdown(false)}
                  />
                  <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredUsers.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-gray-500 text-center">
                        {t.search.noResults}
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
                                {t.userInfo.hkid}: {user.hkid}
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
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    {t.search.filteredTo}: {selectedUser.name || selectedUser.email}
                  </p>
                  <p className="text-xs text-blue-700">{selectedUser.email}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={clearSelection}>
                  {t.search.clear}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results count */}
      <p className="text-sm text-gray-600">
        {t.showing} {displayedUsers.length} {t.users_count}
      </p>

      {/* Users List */}
      {displayedUsers.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <User className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-600">{t.noUsers}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {displayedUsers.map((user) => (
            <Card key={user.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#00477f] text-white flex items-center justify-center font-semibold">
                        {(user.name || user.email).charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {user.name || user.email}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm pl-13">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4 text-[#00477f]" />
                        {t.userInfo.joined}: {formatDate(user.created_at)}
                      </div>
                      
                      {user.hkid && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <CreditCard className="w-4 h-4 text-[#00477f]" />
                          {t.userInfo.hkid}: {user.hkid}
                        </div>
                      )}
                      
                      {user.phone && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4 text-[#00477f]" />
                          {user.phone}
                        </div>
                      )}
                      
                      <Badge className={getRoleColor(user.role)}>
                        {getRoleText(user.role)}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => startEdit(user)}
                      className="border-[#00477f] text-[#00477f]"
                    >
                      <Edit2 className="w-4 h-4 mr-1" />
                      {t.actions.edit}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => viewBookings(user)}
                      className="border-green-600 text-green-600"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      {t.actions.viewBookings}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t.editModal.title}</DialogTitle>
          </DialogHeader>
          
          {editingUser && (
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>{t.editModal.name}</Label>
                <Input
                  value={editForm.name || ""}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  placeholder={t.editModal.name}
                />
              </div>
              
              <div className="space-y-2">
                <Label>{t.editModal.email} *</Label>
                <Input
                  type="email"
                  value={editForm.email || ""}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>{t.editModal.hkid}</Label>
                <Input
                  value={editForm.hkid || ""}
                  onChange={(e) => setEditForm({...editForm, hkid: e.target.value})}
                  placeholder="A123456(7)"
                />
              </div>
              
              <div className="space-y-2">
                <Label>{t.editModal.phone}</Label>
                <Input
                  value={editForm.phone || ""}
                  onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                  placeholder="+852 9876 5432"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={saveEdit}
                  disabled={loadingId === editingUser.id}
                  className="bg-[#00477f] hover:bg-[#003d70]"
                >
                  {loadingId === editingUser.id && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {t.editModal.save}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setEditingUser(null)}
                >
                  {t.editModal.cancel}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Bookings Modal */}
      <Dialog open={!!viewingUser} onOpenChange={() => setViewingUser(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {viewingUser?.name || viewingUser?.email}{t.bookingsModal.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="pt-4">
            {loadingAppointments ? (
              <div className="text-center py-8">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#00477f]" />
              </div>
            ) : userAppointments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {t.bookingsModal.noAppointments}
              </div>
            ) : (
              <div className="space-y-4">
                {userAppointments.map((apt) => (
                  <Card key={apt.id}>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{apt.title}</h4>
                          <p className="text-sm text-gray-600">{t.bookingsModal.doctor}: {apt.doctor}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {formatDate(apt.appointment_date)} · {formatTime(apt.appointment_time)}
                          </p>
                          <p className="text-sm text-gray-500">{apt.location}</p>
                        </div>
                        <Badge className={getStatusColor(apt.status)}>
                          {getStatusText(apt.status)}
                        </Badge>
                      </div>
                      {apt.description && (
                        <p className="text-sm text-gray-600 mt-2 pt-2 border-t">
                          {apt.description}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
