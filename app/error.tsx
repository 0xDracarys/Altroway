"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, RefreshCw, AlertTriangle, ArrowLeft } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <Card className="border-0 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto mb-6 w-24 h-24 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-12 w-12 text-white" />
            </div>
            <CardTitle className="text-4xl font-bold text-gray-900 mb-4">
              Something went wrong!
            </CardTitle>
            <CardDescription className="text-xl text-gray-600">
              We encountered an unexpected error. Don't worry, our team has been notified.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-gray-500 mb-6">
                This error has been logged and we'll work to fix it as soon as possible.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button onClick={reset} variant="default" className="h-12">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              
              <Button asChild variant="outline" className="h-12">
                <Link href="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Go Home
                </Link>
              </Button>
            </div>

            <div className="text-center">
              <Button asChild variant="ghost" className="text-blue-600 hover:text-blue-700">
                <Link href="javascript:history.back()" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Go Back
                </Link>
              </Button>
            </div>

            <div className="border-t pt-6">
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  If this problem persists, please contact our support team.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Link href="/contact" className="text-sm text-blue-600 hover:text-blue-700 px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100">
                    Contact Support
                  </Link>
                  <Link href="/help" className="text-sm text-blue-600 hover:text-blue-700 px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100">
                    Help Center
                  </Link>
                  <Link href="/documentation" className="text-sm text-blue-600 hover:text-blue-700 px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100">
                    Documentation
                  </Link>
                </div>
              </div>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <div className="border-t pt-6">
                <details className="text-left">
                  <summary className="cursor-pointer font-semibold text-gray-900 mb-2">
                    Error Details (Development Only)
                  </summary>
                  <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto">
                    {error.message}
                    {error.stack && `\n\nStack trace:\n${error.stack}`}
                  </pre>
                </details>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
