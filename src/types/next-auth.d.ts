import { DefaultSession } from "next-auth"

// Extend NextAuth types
declare module "next-auth" {
  interface User {
    role?: "user" | "admin"
  }

  interface Session {
    user: {
      id: string
      role: "user" | "admin"
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "user" | "admin"
    id?: string
  }
}
