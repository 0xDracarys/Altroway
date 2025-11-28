"use client"

import { Header as HeaderComponent } from "./header"
import type { User } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export function HeaderWrapper({ user: initialUser }: { user: User | null }) {
  const [user, setUser] = useState<User | null>(initialUser)
  const [isMounted, setIsMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsMounted(true)

    // Create a Supabase client to listen for auth changes
    const supabase = createClient()

    // Get current auth state immediately
    const initializeAuth = async () => {
      try {
        const { data: { user: currentUser } } = await supabase.auth.getUser()
        setUser(currentUser)
      } catch (error) {
        console.error("Error getting user:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()

    // Subscribe to auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        // Ensure user is null on logout
        setUser(null)
      } else if (event === "SIGNED_IN" || event === "USER_UPDATED" || event === "TOKEN_REFRESHED") {
        // Update user on sign in or token changes
        setUser(session?.user ?? null)
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  if (!isMounted || isLoading) {
    return <div className="h-16 bg-white/95 backdrop-blur-sm border-b border-gray-200" />
  }

  return <HeaderComponent user={user} />
}
