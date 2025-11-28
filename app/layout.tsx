import type React from "react"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { I18nProvider } from "@/lib/i18n/provider"
import { HeaderWrapper } from "@/components/header-wrapper"
import { Chatbot } from "@/components/chatbot/chatbot"
import { Toaster } from "@/components/ui/sonner"
import { MessageNotification } from "@/components/message-notification"
import { createClient } from "@/lib/supabase/server"
import "./globals.css"

export const metadata: Metadata = {
  title: "Altroway - Your Gateway to Europe",
  description: "Find your dream job in Europe with comprehensive support for visa applications and relocation",
  generator: "v0.dev",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <I18nProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            <HeaderWrapper user={user} />
            {children}
            <Chatbot />
            <Toaster />
            <MessageNotification />
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
