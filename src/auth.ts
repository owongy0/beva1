import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import { supabaseAdmin } from "./lib/supabase"
import bcrypt from "bcryptjs"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const email = credentials.email as string
        const password = credentials.password as string

        // Fetch user from Supabase
        const { data: user, error } = await supabaseAdmin
          .from("users")
          .select("id, email, name, role, image, password_hash")
          .eq("email", email)
          .single()

        if (error || !user) {
          return null
        }

        // Check if user has password hash
        if (!user.password_hash) {
          return null
        }

        // Verify password using bcrypt
        const isValidPassword = await bcrypt.compare(password, user.password_hash)
        
        if (!isValidPassword) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as "user" | "admin"
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
})
