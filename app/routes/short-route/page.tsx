import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  FileText,
  Building,
  MapPin,
  Euro,
  Clock,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"

export default function ShortRoutePage() {
  const requirements = [
    "Valid passport or travel document",
    "High school diploma or equivalent",
    "Proof of employment offer",
    "Health insurance",
  ]

  const documents = [
    "Visa application form",
    "Employment contract",
    "Proof of financial means",
    "Criminal record clearance",
    "Proof of accommodation",
  ]

  const employers = [
    {
      name: "Tech Startups",
      count: "500+",
      description: "Join innovative companies across Europe",
    },
    {
      name: "Manufacturing",
      count: "300+",
      description: "Stable employment in industrial sector",
    },
    {
      name: "Hospitality",
      count: "450+",
      description: "Hospitality and tourism opportunities",
    },
    {
      name: "Healthcare",
      count: "200+",
      description: "Medical and care sector positions",
    },
  ]

  const timeline = [
    { step: "Application", duration: "1-2 weeks" },
    { step: "Visa Processing", duration: "2-4 weeks" },
    { step: "Onboarding", duration: "1 week" },
    { step: "Start Work", duration: "First day!" },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-4 text-blue-600 bg-white/90 px-4 py-2">
              FASTEST PATH TO EMPLOYMENT
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Short Route</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Get to work faster with our streamlined process. Perfect for those ready for immediate employment.
            </p>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                  Basic Requirements
                </h2>
                <p className="text-gray-600">
                  Here's what you need to qualify for the Short Route
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {requirements.map((req, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-600">
                    <CardContent className="p-6 flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-800">{req}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Documents Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <FileText className="h-10 w-10 text-orange-600" />
                  Required Documents
                </h2>
              </div>

              <div className="space-y-3">
                {documents.map((doc, index) => (
                  <Card key={index} className="hover:shadow-md transition-all">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">
                        {index + 1}
                      </div>
                      <span className="text-gray-800">{doc}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Employers Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Building className="h-10 w-10 text-green-600" />
                  Partner Employers
                </h2>
                <p className="text-gray-600">
                  Connect with our extensive network of verified employers
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {employers.map((employer, index) => (
                  <Card key={index} className="hover:shadow-xl transition-all">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{employer.name}</span>
                        <Badge className="bg-blue-100 text-blue-800">
                          {employer.count}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{employer.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Migration Process Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <MapPin className="h-10 w-10 text-purple-600" />
                  Migration Process
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  "Check visa requirements for your target country",
                  "Prepare all necessary documents",
                  "Submit visa application",
                  "Receive visa approval",
                  "Arrange travel and accommodation",
                  "Start your new job",
                ].map((step, index) => (
                  <Card key={index} className="hover:shadow-md transition-all">
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-gray-800 text-lg">{step}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Clock className="h-10 w-10 text-red-600" />
                  Typical Timeline
                </h2>
                <p className="text-gray-600">
                  From application to employment
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                {timeline.map((item, index) => (
                  <div key={index} className="relative">
                    <Card className="text-center hover:shadow-lg transition-all">
                      <CardContent className="p-6">
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                          {item.duration.split("-")[0]}
                        </div>
                        <p className="font-semibold text-gray-900 mb-2">
                          {item.step}
                        </p>
                        <p className="text-sm text-gray-600">{item.duration}</p>
                      </CardContent>
                    </Card>
                    {index < timeline.length - 1 && (
                      <ArrowRight className="absolute -right-6 top-1/2 transform -translate-y-1/2 hidden md:block text-blue-300" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Costs Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Euro className="h-10 w-10 text-green-600" />
                  Typical Costs
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    item: "Visa Application Fee",
                    cost: "€50 - €150",
                    description: "Varies by country",
                  },
                  {
                    item: "Health Insurance (first month)",
                    cost: "€50 - €200",
                    description: "Required for work",
                  },
                  {
                    item: "Accommodation (first month)",
                    cost: "€400 - €1,200",
                    description: "Varies by location",
                  },
                  {
                    item: "Travel & Relocation",
                    cost: "€300 - €800",
                    description: "Flight and transportation",
                  },
                ].map((cost, index) => (
                  <Card key={index} className="hover:shadow-md transition-all">
                    <CardContent className="p-6 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{cost.item}</p>
                        <p className="text-sm text-gray-600">{cost.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">{cost.cost}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-8 bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <p className="text-blue-900">
                    <strong>Total Estimated Cost:</strong> €800 - €2,350
                  </p>
                  <p className="text-sm text-blue-700 mt-2">
                    Costs vary depending on the country and your circumstances
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Begin your journey to a better future in Europe today
            </p>
            <Button
              size="lg"
              asChild
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-12 py-6"
            >
              <Link href="/register">
                Start Your Short Route
                <ArrowRight className="h-6 w-6 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
