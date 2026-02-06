export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          hkid: string | null
          phone: string | null
          role: 'user' | 'admin'
          image: string | null
          password_hash: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          hkid?: string | null
          phone?: string | null
          role?: 'user' | 'admin'
          image?: string | null
          password_hash?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          hkid?: string | null
          phone?: string | null
          role?: 'user' | 'admin'
          image?: string | null
          password_hash?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      accounts: {
        Row: {
          id: string
          user_id: string
          type: string
          provider: string
          provider_account_id: string
          refresh_token: string | null
          access_token: string | null
          expires_at: number | null
          token_type: string | null
          scope: string | null
          id_token: string | null
          session_state: string | null
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          provider: string
          provider_account_id: string
          refresh_token?: string | null
          access_token?: string | null
          expires_at?: number | null
          token_type?: string | null
          scope?: string | null
          id_token?: string | null
          session_state?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          provider?: string
          provider_account_id?: string
          refresh_token?: string | null
          access_token?: string | null
          expires_at?: number | null
          token_type?: string | null
          scope?: string | null
          id_token?: string | null
          session_state?: string | null
        }
      }
      sessions: {
        Row: {
          id: string
          session_token: string
          user_id: string
          expires: string
        }
        Insert: {
          id?: string
          session_token: string
          user_id: string
          expires: string
        }
        Update: {
          id?: string
          session_token?: string
          user_id?: string
          expires?: string
        }
      }
      appointments: {
        Row: {
          id: string
          user_id: string
          title: string
          doctor: string
          appointment_date: string
          appointment_time: string
          location: string
          description: string | null
          status: 'scheduled' | 'completed' | 'cancelled'
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          doctor: string
          appointment_date: string
          appointment_time: string
          location: string
          description?: string | null
          status?: 'scheduled' | 'completed' | 'cancelled'
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          doctor?: string
          appointment_date?: string
          appointment_time?: string
          location?: string
          description?: string | null
          status?: 'scheduled' | 'completed' | 'cancelled'
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
