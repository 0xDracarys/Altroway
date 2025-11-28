"use client"

import { Globe, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useTranslation } from "@/lib/i18n/provider"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Language } from "@/lib/i18n/translations"

const builtInLanguages: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "lt", label: "Lietuvių", flag: "🇱🇹" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
]

export function LanguageSelector() {
  const { language, setLanguage } = useTranslation()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Reinitialize from localStorage if needed
  useEffect(() => {
    const saved = localStorage.getItem("preferredLanguage") as Language | null
    if (saved && ['en', 'lt', 'ru'].includes(saved)) {
      setLanguage(saved)
    }
  }, [setLanguage])

  const handleLanguageChange = async (newLang: Language) => {
    setIsLoading(true)
    try {
      // Store preference
      setLanguage(newLang)
      localStorage.setItem("preferredLanguage", newLang)

      // Emit custom event for real-time UI updates
      window.dispatchEvent(
        new CustomEvent('languageChanged', { detail: { language: newLang } })
      )

      toast({
        title: "Language Changed",
        description: `Language updated to ${builtInLanguages.find((l) => l.code === newLang)?.label}`,
        variant: "default",
      })
    } catch (error) {
      console.error('Error changing language:', error)
      toast({
        title: "Error",
        description: "Failed to change language",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const currentLabel = builtInLanguages.find(
    (lang) => lang.code === language
  )?.label

  const currentFlag = builtInLanguages.find(
    (lang) => lang.code === language
  )?.flag

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button 
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors dark:text-gray-300 dark:hover:bg-gray-800 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <span className="text-lg">{currentFlag}</span>
              <span className="text-sm font-medium hidden sm:inline">{currentLabel}</span>
            </>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <div className="px-2 py-1.5">
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">Select Language</p>
        </div>
        {builtInLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            disabled={isLoading}
            className={`cursor-pointer ${
              language === lang.code ? "bg-blue-50 dark:bg-blue-950" : ""
            }`}
          >
            <span className="flex items-center gap-2 w-full">
              <span className="text-lg">{lang.flag}</span>
              <span className="flex-1">{lang.label}</span>
              {language === lang.code && (
                <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
              )}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
