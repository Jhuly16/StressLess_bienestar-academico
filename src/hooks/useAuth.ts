import { useState, useEffect } from 'react'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { supabase, User } from '../lib/supabase'
import { sendEmail, emailTemplates } from '../lib/email'
import toast from 'react-hot-toast'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSupabaseUser(session?.user ?? null)
      if (session?.user) {
        fetchUserProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSupabaseUser(session?.user ?? null)
      
      if (session?.user) {
        if (event === 'SIGNED_UP') {
          await createUserProfile(session.user)
        }
        fetchUserProfile(session.user.id)
      } else {
        setUser(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      setUser(data)
    } catch (error) {
      console.error('Error fetching user profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const createUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      const userData = {
        id: supabaseUser.id,
        email: supabaseUser.email!,
        name: supabaseUser.user_metadata?.name || '',
        avatar: '🧑‍🎓',
        mood: 'neutral' as const,
        stress_type: 'general' as const,
        music_preference: 'none' as const,
        level: 1,
        xp: 0,
        streak_days: 0,
        calm_points: 0,
        subscription_plan: 'free' as const,
        subscription_status: 'active' as const
      }

      const { error } = await supabase
        .from('users')
        .insert([userData])

      if (error) throw error

      // Send welcome email
      try {
        const welcomeEmail = emailTemplates.welcome(userData.name || 'Usuario')
        await sendEmail(userData.email, welcomeEmail.subject, welcomeEmail.html)
      } catch (emailError) {
        console.error('Error sending welcome email:', emailError)
      }

      setUser(userData)
      toast.success('¡Bienvenido a StressLess! 🎉')
    } catch (error) {
      console.error('Error creating user profile:', error)
      toast.error('Error al crear el perfil')
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          }
        }
      })

      if (error) throw error
      toast.success('¡Registro exitoso! Revisa tu email para confirmar tu cuenta.')
    } catch (error: any) {
      toast.error(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error
      toast.success('¡Bienvenido de vuelta! 🐱')
    } catch (error: any) {
      toast.error(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      toast.success('¡Hasta pronto! 👋')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id)

      if (error) throw error

      setUser({ ...user, ...updates })
      toast.success('Perfil actualizado 🎉')
    } catch (error: any) {
      toast.error('Error al actualizar el perfil')
      throw error
    }
  }

  const addXP = async (amount: number) => {
    if (!user) return

    const newXP = user.xp + amount
    const newLevel = Math.floor(newXP / 100) + 1
    const leveledUp = newLevel > user.level

    try {
      await updateProfile({ xp: newXP, level: newLevel })

      if (leveledUp) {
        // Send level up email
        try {
          const levelUpEmail = emailTemplates.levelUp(user.name, newLevel)
          await sendEmail(user.email, levelUpEmail.subject, levelUpEmail.html)
        } catch (emailError) {
          console.error('Error sending level up email:', emailError)
        }
        
        toast.success(`¡Nivel ${newLevel} desbloqueado! 🎉`)
      }
    } catch (error) {
      console.error('Error adding XP:', error)
    }
  }

  return {
    user,
    supabaseUser,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    addXP
  }
}