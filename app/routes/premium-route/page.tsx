import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Star,
  Users,
  Headphones,
  Home,
  BookOpen,
  ArrowRight,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"

export default function PremiumRoutePage() {
  const features = [
    {
      title: "Individual Career Guide",
      description: "Personalized guidance based on your qualifications and specific goals",
      icon: BookOpen,
    },
    {
      title: "Live Support Team",
      description: "Dedicated team available for consultations and assistance",
      icon: Headphones,
    },
    {
      title: "Business Setup Assistance",
      description: "Help setting up operations if you're starting a business",
      icon: Zap,
    },
    {
      title: "Post-Arrival Support",
      description: "Tips and guidance for settling into your new country",
      icon: Home,
    },
    {
      title: "Legal Compliance",
      description: "Guidance on rules, regulations, and compliance requirements",
      icon: CheckCircle,
    },
    {
      title: "Network Building",
      description: "Connect with other professionals and local communities",
      icon: Users,
    },
  ]

  const benefits = [
    "Faster processing with priority support",
    "Custom career path aligned with your goals",
    "Access to premium job listings",
    "Unlimited consultation hours",
    "Visa and immigration assistance",
    "Housing and relocation support",
    "Language learning resources",
    "Cultural integration program",
    "Networking events access",
    "Career development training",
  ]

  const timeline = [
    {
      phase: "Phase 1: Assessment",
      duration: "1 week",
      details: "Initial consultation and career assessment",
    },
    {
      phase: "Phase 2: Planning",
      duration: "2 weeks",
      details: "Develop personalized career plan",
    },
    {
      phase: "Phase 3: Execution",
      duration: "4-8 weeks",
      details: "Job search, applications, and interviews",
    },
    {
      phase: "Phase 4: Settlement",
      duration: "2 weeks",
      details: "Post-arrival support and integration",
    },
  ]

  const pricing = [
    {
      tier: "Premium",
      price: "€1,999",
      period: "One-time",
      includes: [
        "Career assessment",
        "8 weeks personalized support",
        "Job placement assistance",
        "Visa guidance",
        "Post-arrival support",
      ],
    },
    {
      tier: "Premium Plus",
      price: "€3,499",
      period: "One-time",
      popular: true,
      includes: [
        "Everything in Premium",
        "Business setup assistance",
        "Language learning (3 months)",
        "Extended support (12 months)",
        "Housing assistance",
        "Legal consultation (unlimited)",
      ],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-4 text-purple-600 bg-white/90 px-4 py-2">
              PREMIUM EXPERIENCE
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Premium Route</h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Personalized guidance and comprehensive support for a smooth transition to your European career.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="mb-12 text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">What's Included</h2>
                <p className="text-gray-600">
                  Comprehensive support at every step of your journey
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <Card key={index} className="hover:shadow-xl transition-all border-0">
                      <CardContent className="p-6">
                        <Icon className="h-12 w-12 text-purple-600 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Premium Benefits</h2>
              <p className="text-gray-600 mb-8">
                Enjoy exclusive advantages throughout your journey
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-800">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Premium Journey</h2>
              <p className="text-gray-600 mb-8">
                Timeline for the Premium Route experience
              </p>

              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <Card key={index} className="hover:shadow-md transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {item.phase}
                          </h3>
                          <p className="text-gray-600">{item.details}</p>
                        </div>
                        <Badge className="bg-purple-100 text-purple-800 whitespace-nowrap ml-4">
                          {item.duration}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple Pricing</h2>
                <p className="text-gray-600">
                  Transparent pricing with no hidden fees
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                {pricing.map((plan, index) => (
                  <Card
                    key={index}
                    className={`relative hover:shadow-xl transition-all ${
                      plan.popular ? "ring-2 ring-purple-600 transform md:scale-105" : ""
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-purple-600">MOST POPULAR</Badge>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle>{plan.tier}</CardTitle>
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-gray-900">
                          {plan.price}
                        </span>
                        <span className="text-gray-600 ml-2">{plan.period}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <ul className="space-y-3">
                        {plan.includes.map((item, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        size="lg"
                        className="w-full"
                        variant={plan.popular ? "default" : "outline"}
                        asChild
                      >
                        <Link href="/register">Choose Plan</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
                Short Route vs Premium Route
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-4 px-4 font-semibold text-gray-900">
                        Feature
                      </th>
                      <th className="text-center py-4 px-4 font-semibold text-gray-900">
                        Short Route
                      </th>
                      <th className="text-center py-4 px-4 font-semibold text-purple-600">
                        Premium Route
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        feature: "Job Database Access",
                        short: true,
                        premium: true,
                      },
                      {
                        feature: "Direct Employer Contact",
                        short: true,
                        premium: true,
                      },
                      {
                        feature: "Legal Guidance",
                        short: true,
                        premium: true,
                      },
                      {
                        feature: "Personal Career Guide",
                        short: false,
                        premium: true,
                      },
                      {
                        feature: "Live Support Team",
                        short: false,
                        premium: true,
                      },
                      {
                        feature: "Business Setup Help",
                        short: false,
                        premium: true,
                      },
                      {
                        feature: "Relocation Assistance",
                        short: false,
                        premium: true,
                      },
                      {
                        feature: "Extended Support Period",
                        short: false,
                        premium: true,
                      },
                    ].map((row, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-4 px-4 text-gray-900 font-medium">
                          {row.feature}
                        </td>
                        <td className="py-4 px-4 text-center">
                          {row.short ? (
                            <CheckCircle className="h-6 w-6 text-green-600 mx-auto" />
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center">
                          {row.premium ? (
                            <CheckCircle className="h-6 w-6 text-purple-600 mx-auto" />
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-purple-600 to-indigo-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <Star className="h-16 w-16 mx-auto mb-4 text-yellow-300" />
            <h2 className="text-4xl font-bold mb-6">Ready for Premium Support?</h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Start your journey with personalized guidance from our expert team
            </p>
            <Button
              size="lg"
              asChild
              className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-12 py-6"
            >
              <Link href="/register">
                Choose Premium Route
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
