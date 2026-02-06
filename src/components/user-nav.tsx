"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Locale } from "@/i18n/config"
import { Dictionary } from "@/i18n/get-dictionary"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut, Calendar, LayoutDashboard } from "lucide-react"

interface UserNavProps {
  lang: Locale
  dict: Dictionary
}

export function UserNav({ lang, dict }: UserNavProps) {
  const { data: session, status } = useSession()

  // Loading state
  if (status === "loading") {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
    )
  }

  // Not logged in - show Register and Login buttons
  if (!session?.user) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-gray-700 hover:text-[#00477f]"
        >
          <Link href={`/${lang}/register`}>
            {lang === 'zh-TW' ? '註冊' : 'Register'}
          </Link>
        </Button>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="border-[#00477f] text-[#00477f] hover:bg-[#f0f5fa]"
        >
          <Link href={`/${lang}/login`}>
            {dict.nav.signIn}
          </Link>
        </Button>
      </div>
    )
  }

  // Logged in
  const isAdmin = session.user.role === "admin"
  const userInitial = session.user.name?.[0] || session.user.email?.[0] || "U"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-9 w-9 rounded-full bg-[#00477f] text-white hover:bg-[#003d70]"
        >
          <span className="font-semibold text-sm">{userInitial}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {session.user.name && (
              <p className="font-medium">{session.user.name}</p>
            )}
            {session.user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {session.user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link href={`/${lang}/bookings`} className="cursor-pointer">
            <Calendar className="mr-2 h-4 w-4" />
            {dict.nav.myBookings}
          </Link>
        </DropdownMenuItem>
        
        {isAdmin && (
          <DropdownMenuItem asChild>
            <Link href={`/${lang}/admin`} className="cursor-pointer">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              {lang === 'zh-TW' ? '管理員控制台' : 'Admin Dashboard'}
            </Link>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:text-red-600"
          onClick={() => signOut({ callbackUrl: `/${lang}` })}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {lang === 'zh-TW' ? '登出' : 'Sign Out'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
