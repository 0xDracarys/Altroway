"use client"

import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  HelpCircle,
  MessageSquare,
  Search,
  ChevronDown,
  FileText,
  Mail,
  Phone,
  Globe,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  BookOpen,
  Users,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface FAQItem {
  question: string
  answer: string
  category: string
  icon: React.ReactNode
}

const faqItems: FAQItem[] = [
  {
    category: "Getting Started",
    icon: <CheckCircle className="h-5 w-5" />,
    question: "How do I create an account?",
    answer: "Click on 'Get Started' in the header and follow the sign-up process. You'll need to provide basic information, set your goals, and complete your profile questionnaire.",
  },
  {
    category: "Getting Started",
    icon: <CheckCircle className="h-5 w-5" />,
    question: "Is there a fee to join Altroway?",
    answer: "Creating an account and browsing jobs is completely free. We offer optional premium services for enhanced support and guidance.",
  },
  {
    category: "Jobs & Applications",
    icon: <Search className="h-5 w-5" />,
    question: "How do I apply for a job?",
    answer: "Browse our jobs page, find positions that interest you, and click the apply button. Make sure your profile is complete to increase your chances.",
  },
  {
    category: "Jobs & Applications",
    icon: <Search className="h-5 w-5" />,
    question: "What is visa sponsorship?",
    answer: "Visa sponsorship means the employer will support your work visa application process. Not all jobs offer this, but we clearly mark those that do.",
  },
  {
    category: "Legal Support",
    icon: <Shield className="h-5 w-5" />,
    question: "Does Altroway help with visa applications?",
    answer: "Yes! Our legal advisors provide guidance on visa requirements. For the Premium Route, we offer comprehensive visa and immigration assistance.",
  },
  {
    category: "Legal Support",
    icon: <Shield className="h-5 w-5" />,
    question: "What documents do I need for a work visa?",
    answer: "Required documents vary by country, but typically include: passport, employment contract, proof of qualifications, health insurance, and accommodation proof.",
  },
  {
    category: "Account",
    icon: <Users className="h-5 w-5" />,
    question: "How do I update my profile?",
    answer: "Go to your Dashboard, click on 'Edit Profile', and update your information. Keep your profile complete and up-to-date for better job matches.",
  },
  {
    category: "Account",
    icon: <Users className="h-5 w-5" />,
    question: "Can I change my account type?",
    answer: "Yes, you can switch between different roles (Job Seeker, Employer, Legal Advisor) in your account settings.",
  },
  {
    category: "Messages",
    icon: <MessageSquare className="h-5 w-5" />,
    question: "How do I contact an employer?",
    answer: "Once you apply for a job or receive an interview invitation, you can message the employer directly through our messaging system.",
  },
  {
    category: "Messages",
    icon: <MessageSquare className="h-5 w-5" />,
    question: "How long does it take to get a response?",
    answer: "Response times vary, but most employers reply within 1-2 weeks. Check your notification center for updates on your applications.",
  },
  {
    category: "Routes",
    icon: <Lightbulb className="h-5 w-5" />,
    question: "What's the difference between Short and Premium routes?",
    answer: "The Short Route is self-guided with essential information. The Premium Route includes personalized coaching, live support, and extended assistance.",
  },
  {
    category: "Routes",
    icon: <Lightbulb className="h-5 w-5" />,
    question: "Can I switch routes after starting?",
    answer: "Yes, you can upgrade to the Premium Route at any time. Contact our support team to discuss the upgrade options.",
  },
]

interface ExpandableItemProps {
  item: FAQItem
  isExpanded: boolean
  onToggle: () => void
}

function ExpandableItem({ item, isExpanded, onToggle }: ExpandableItemProps) {
  return (
    <Card className="hover:shadow-md transition-all cursor-pointer border-0" onClick={onToggle}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="text-blue-600 flex-shrink-0 mt-1">{item.icon}</div>
          <div className="flex-1">
            <button className="text-left w-full">
              <h3 className="font-semibold text-gray-900 text-lg flex items-center justify-between">
                <span>{item.question}</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                />
              </h3>
            </button>
            {isExpanded && (
              <p className="text-gray-600 mt-3 leading-relaxed">{item.answer}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function HelpPage() {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set())
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedItems(newExpanded)
  }

  const categories = ["All", ...new Set(faqItems.map((item) => item.category))]
  const filteredItems =
    selectedCategory === "All"
      ? faqItems
      : faqItems.filter((item) => item.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 text-blue-600 bg-white/90 px-4 py-2">
            <HelpCircle className="h-4 w-4 mr-2" />
            HELP CENTER
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How Can We Help?</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Find answers to common questions or get in touch with our support team
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 pb-16">
        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          <Card className="text-center hover:shadow-lg transition-all border-l-4 border-l-blue-600">
            <CardContent className="p-8">
              <Mail className="h-10 w-10 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-sm text-gray-600 mb-4">24-hour response time</p>
              <Button variant="outline" asChild>
                <a href="mailto:support@altroway.com">Send Email</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-all border-l-4 border-l-green-600">
            <CardContent className="p-8">
              <Phone className="h-10 w-10 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
              <p className="text-sm text-gray-600 mb-4">Mon-Fri 9am-5pm CET</p>
              <Button variant="outline" asChild>
                <a href="tel:+491234567890">Call Us</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-all border-l-4 border-l-purple-600">
            <CardContent className="p-8">
              <MessageSquare className="h-10 w-10 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-sm text-gray-600 mb-4">Instant assistance</p>
              <Button variant="outline" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={selectedCategory === category ? "bg-blue-600" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredItems.map((item, index) => (
              <ExpandableItem
                key={`${item.category}-${index}`}
                item={item}
                isExpanded={expandedItems.has(index)}
                onToggle={() => toggleItem(index)}
              />
            ))}
          </div>

          {/* Still Need Help */}
          <Card className="mt-12 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-8 text-center">
              <Lightbulb className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-orange-900 mb-4">
                Didn't find what you're looking for?
              </h3>
              <p className="text-orange-800 mb-6">
                Our support team is here to help. Reach out to us and we'll get back to you as soon as possible.
              </p>
              <Button size="lg" asChild className="bg-orange-600 hover:bg-orange-700">
                <Link href="/contact">Contact Support</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
