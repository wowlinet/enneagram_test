import { createBrowserClient } from '@supabase/ssr'
import { createServerClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client
export const createClient = () => {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

// Server-side Supabase client
export const createServerSupabaseClient = async () => {
  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()
  
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        } catch (error) {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}

// Legacy client for backward compatibility
export const supabase = createClient()

// Types for our database
export interface Profile {
  id: string
  email: string
  name?: string
  created_at: string
  updated_at: string
}

export interface TestResult {
  id: string
  user_id?: string
  answers: number[]
  personality_type: number
  scores: {
    [key: string]: number
  }
  created_at: string
}

export interface PersonalityType {
  type_number: number
  title: string
  description: string
  strengths: string
  growth_areas: string
  characteristics: {
    core_motivation: string
    basic_fear: string
    [key: string]: any
  }
}

export interface Article {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  featured_image?: string
  category_id?: string
  published: boolean
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
}

export interface Bookmark {
  id: string
  user_id: string
  article_id: string
  created_at: string
}