import { auth } from "@/auth"
import { redirect } from "next/navigation"

// Get current user session (server-side)
export async function getCurrentUser() {
  const session = await auth()
  return session?.user
}

// Require authentication (redirects to login if not authenticated)
export async function requireAuth() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect("/login")
  }
  
  return user
}

// Require admin role (redirects if not admin)
export async function requireAdmin() {
  const user = await requireAuth()
  
  if (user.role !== "admin") {
    redirect("/")
  }
  
  return user
}

// Check if user is authenticated
export async function isAuthenticated() {
  const user = await getCurrentUser()
  return !!user
}

// Check if user is admin
export async function isAdmin() {
  const user = await getCurrentUser()
  return user?.role === "admin"
}
