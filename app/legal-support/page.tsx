"use client"

import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  FileText,
  Briefcase,
  CheckCircle,
  Clock,
  Users,
  MapPin,
  Scale,
  Globe,
  Award,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

export default function LegalSupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 text-white py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 text-purple-600 bg-white/90 px-4 py-2">
            <Scale className="h-4 w-4 mr-2" />
            EXPERT LEGAL SUPPORT
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Legal & Visa Support</h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Navigate the complexities of European immigration with our network of certified legal experts and advisors
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 pb-16">
        {/* Services Overview */}
        <section className="mb-16 max-w-5xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Legal Support Services</h2>
            <p className="text-gray-600">
              We connect you with a network of experienced immigration lawyers and specialists across Europe to ensure your smooth transition.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-xl transition-all border-t-4 border-t-green-600">
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Document Review</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Ensure your visa and work permit applications are accurate, complete, and compliant with all requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all border-t-4 border-t-blue-600">
              <CardContent className="p-8 text-center">
                <Briefcase className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Application Assistance</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Step-by-step guidance through the entire visa and work permit application process with expert support.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all border-t-4 border-t-purple-600">
              <CardContent className="p-8 text-center">
                <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Legal Consultation</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Personalized advice on complex immigration cases, appeals, and special circumstances.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why Choose Our Legal Team */}
        <section className="mb-16 max-w-5xl mx-auto bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border-2 border-purple-200">
          <h2 className="text-3xl font-bold text-purple-900 mb-8">Why Choose Our Legal Team</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Award, title: "Certified Experts", desc: "Immigration lawyers with 10+ years of experience" },
              { icon: Globe, title: "Multi-Country Coverage", desc: "Specialists across all 27 EU countries" },
              { icon: Clock, title: "24/7 Support", desc: "Available when you need us, especially during critical timelines" },
              { icon: CheckCircle, title: "High Success Rate", desc: "98% application approval rate with our guidance" },
              { icon: Users, title: "Personalized Approach", desc: "Tailored solutions for your unique situation" },
              { icon: MapPin, title: "Local Knowledge", desc: "Deep understanding of each country's immigration laws" },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="flex items-start gap-4">
                  <Icon className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-purple-700">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16 max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Legal Topics</h2>
            <p className="text-gray-600">Find answers to common questions about visas and immigration.</p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-8">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="visa-types">
                  <AccordionTrigger className="text-lg font-semibold hover:text-blue-600">
                    <Shield className="h-5 w-5 mr-3 text-blue-600" />
                    Types of Work Visas
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    <p className="mb-4">
                      The type of visa you need depends on your nationality, skills, and the country you plan to work in. Common types include:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-gray-900">EU Blue Card:</strong>
                          <p className="text-sm">A work and residence permit for highly-qualified, non-EU citizens. It is recognized in 25 of the 27 EU member states.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-gray-900">National Work Visas:</strong>
                          <p className="text-sm">Issued by individual countries for specific types of employment. Often tied to a specific employer.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-gray-900">Digital Nomad Visas:</strong>
                          <p className="text-sm">A newer category for remote workers employed by companies outside the host country.</p>
                        </div>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="permits">
                  <AccordionTrigger className="text-lg font-semibold hover:text-blue-600">
                    <FileText className="h-5 w-5 mr-3 text-blue-600" />
                    Work Permits vs. Residency Permits
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="font-semibold text-blue-900 mb-2">Work Permit:</p>
                        <p className="text-sm">Grants you the right to take up a specific job in a country. It is often tied to your employer and has validity specific to that employment.</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <p className="font-semibold text-green-900 mb-2">Residency Permit:</p>
                        <p className="text-sm">Allows you to live in a country for a specified period. It may or may not include the right to work. Often, a work visa will lead to a temporary residency permit.</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="family">
                  <AccordionTrigger className="text-lg font-semibold hover:text-blue-600">
                    <Users className="h-5 w-5 mr-3 text-blue-600" />
                    Family Reunification
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    <p className="mb-4">
                      Most European countries have provisions for visa holders to bring their immediate family members (spouse and minor children). The process and requirements include:
                    </p>
                    <ul className="space-y-2">
                      {[
                        "Proof of financial support for family members",
                        "Adequate housing accommodations",
                        "Health insurance coverage",
                        "Family relationship documentation",
                        "Background checks for all family members",
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <span className="text-green-600">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm font-medium text-blue-600">
                      The specific rules vary significantly by country and visa type. We'll help you navigate them.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="timeline">
                  <AccordionTrigger className="text-lg font-semibold hover:text-blue-600">
                    <Clock className="h-5 w-5 mr-3 text-blue-600" />
                    Typical Application Timeline
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    <p className="mb-4">Processing times vary by country and visa type, but here's a general timeline:</p>
                    <div className="space-y-3">
                      {[
                        { step: "Document Preparation", time: "1-2 weeks" },
                        { step: "Application Submission", time: "1-3 weeks" },
                        { step: "Initial Review", time: "2-4 weeks" },
                        { step: "Interview/Additional Docs", time: "1-4 weeks" },
                        { step: "Final Decision", time: "1-3 weeks" },
                        { step: "Visa Issuance", time: "1-2 weeks" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                          <span className="font-medium text-gray-900">{item.step}</span>
                          <Badge className="bg-blue-100 text-blue-800">{item.time}</Badge>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto bg-gradient-to-r from-purple-600 to-indigo-800 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Expert Legal Guidance?</h2>
          <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
            Our certified legal advisors are ready to help you navigate your European career journey with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-white text-purple-600 hover:bg-gray-100">
              <Link href="/register">
                Get Legal Consultation
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" asChild variant="outline" className="text-white border-white hover:bg-white/10">
              <Link href="/contact">Schedule a Call</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
