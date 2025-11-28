"use client"

import { Globe } from "lucide-react"
import { useEffect } from "react"
import { useTranslation } from "@/lib/i18n/provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Language } from "@/lib/i18n/translations"

const languages: { code: Language; label: string }[] = [
  { code: "en", label: "English" },
  { code: "lt", label: "Lietuvių" },
  { code: "ru", label: "Русский" },
]

export function LanguageSelector() {
  const { language, setLanguage } = useTranslation()

  // Reinitialize from localStorage if needed
  useEffect(() => {
    const saved = localStorage.getItem("preferredLanguage") as Language | null
    if (saved && ['en', 'lt', 'ru'].includes(saved)) {
      setLanguage(saved)
    }
  }, [setLanguage])

  const currentLabel = languages.find(
    (lang) => lang.code === language
  )?.label

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors dark:text-gray-300 dark:hover:bg-gray-800">
          <Globe className="h-4 w-4" />
          <span className="text-sm font-medium">{currentLabel}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={
              language === lang.code ? "bg-blue-50 dark:bg-blue-950" : ""
            }
          >
            <span className="flex items-center gap-2">
              {lang.label}
              {language === lang.code && (
                <span className="text-blue-600 dark:text-blue-400">✓</span>
              )}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
