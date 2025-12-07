import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface User {
  id: string
  email: string
  name: string
  pseudonym?: string
  avatar: string
  mood: 'positive' | 'neutral' | 'negative'
  stress_type: 'fatigue' | 'anxiety' | 'overwhelm' | 'general'
  music_preference: 'nature' | 'classical' | 'ambient' | 'none'
  level: number
  xp: number
  streak_days: number
  calm_points: number
  subscription_plan: 'free' | 'premium' | 'pro'
  subscription_status: 'active' | 'inactive' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  user_id: string
  title: string
  subject: string
  due_date: string
  priority: 'high' | 'medium' | 'low'
  estimated_time: number
  completed: boolean
  created_at: string
}

export interface MoodEntry {
  id: string
  user_id: string
  date: string
  mood: number
  stress_level: number
  notes: string
  created_at: string
}

export interface CalmNote {
  id: string
  user_id: string
  text: string
  color: string
  category: string
  created_at: string
}