import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Search, ArrowLeft, Construction } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <Card className="border-0 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto mb-6 w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <Construction className="h-12 w-12 text-white" />
            </div>
            <CardTitle className="text-4xl font-bold text-gray-900 mb-4">
              Page Not Found
            </CardTitle>
            <CardDescription className="text-xl text-gray-600">
              Oops! The page you're looking for doesn't exist or is under construction.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-gray-500 mb-6">
                Don't worry, this happens to the best of us. Let's get you back on track!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button asChild variant="default" className="h-12">
                <Link href="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Go Home
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="h-12">
                <Link href="/jobs" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Browse Jobs
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
                <h3 className="font-semibold text-gray-900 mb-2">Popular Pages</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  <Link href="/dashboard" className="text-sm text-blue-600 hover:text-blue-700 px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100">
                    Dashboard
                  </Link>
                  <Link href="/profile" className="text-sm text-blue-600 hover:text-blue-700 px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100">
                    Profile
                  </Link>
                  <Link href="/messages" className="text-sm text-blue-600 hover:text-blue-700 px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100">
                    Messages
                  </Link>
                  <Link href="/about" className="text-sm text-blue-600 hover:text-blue-700 px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100">
                    About
                  </Link>
                  <Link href="/contact" className="text-sm text-blue-600 hover:text-blue-700 px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100">
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
