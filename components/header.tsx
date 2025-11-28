"use client"

import { Button } from "@/components/ui/button"
import { MapPin, MessageSquare, Bookmark, Building, Scale, Users, BookOpen } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { MobileNav } from "./mobile-nav"
import { UserMenu } from "./user-menu"
import { MessageNotification } from "./message-notification"
import { logout } from "@/app/actions/auth-actions"
import { RoleBasedContent } from "./role-guard"
import { LanguageSelector } from "./language-selector"
import { useTranslation } from "@/lib/i18n/provider"
import type { User } from "@supabase/supabase-js"

export function Header({ user }: { user: User | null }) {
  const { t } = useTranslation()

  return (
    <header className="bg-gradient-to-r from-white/10 to-slate-50/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-sm hover:bg-gradient-to-r hover:from-white/20 hover:to-slate-50/20 transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Image 
                src="/altroway-logo-transparent.png" 
                alt="Altroway Logo" 
                width={40} 
                height={40} 
                className="h-10 w-10 group-hover:scale-110 transition-transform"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity blur"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent group-hover:from-emerald-600 group-hover:to-cyan-600 transition-all">Altroway</span>
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/jobs" className="text-gray-600 hover:text-blue-600 transition-colors">
              {t('nav.jobs')}
            </Link>
            {user && (
              <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">
                {t('nav.profile')}
              </Link>
            )}
            {user && (
              <Link href="/messages" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1 relative">
                <MessageSquare className="h-4 w-4" />
                {t('nav.messages')}
                <MessageNotification />
              </Link>
            )}
            {user && (
              <Link href="/saved-jobs" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1">
                <Bookmark className="h-4 w-4" />
                {t('nav.saved')}
              </Link>
            )}
            <RoleBasedContent
              employer={
                <Link href="/employer" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  {t('nav.employer')}
                </Link>
              }
              legalAdvisor={
                <Link href="/legal-support" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1">
                  <Scale className="h-4 w-4" />
                  {t('nav.legal')}
                </Link>
              }
              superAdmin={
                <Link href="/admin" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  {t('nav.admin')}
                </Link>
              }
            />
            <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1">
              <Users className="h-4 w-4" />
              About
            </Link>
            <Link href="/documentation" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              Docs
            </Link>
          </nav>
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            {user ? (
              <UserMenu user={user} />
            ) : (
              <>
                <Button asChild>
                  <Link href="/register">{t('nav.getStarted')}</Link>
                </Button>
              </>
            )}
          </div>
          {/* Mobile Menu */}
          <MobileNav user={user} handleSignOut={logout} />
        </div>
      </div>
    </header>
  )
}
