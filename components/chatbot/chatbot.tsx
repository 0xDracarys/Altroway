"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Briefcase, HelpCircle, Search } from "lucide-react"

interface FAQItem {
  question: string;
  keywords: string[];
  answer: string;
}

const FAQ: FAQItem[] = [
  {
    question: "What is Altroway?",
    keywords: ["what", "altroway", "platform", "about"],
    answer: "Altroway is a comprehensive job platform connecting global talent with European opportunities. We provide job listings, real-time messaging, legal support, and career guidance for professionals seeking positions in Europe."
  },
  {
    question: "How do I create an account?",
    keywords: ["register", "signup", "account", "create"],
    answer: "Click the 'Register' button in the header, select your role (Job Seeker, Employer, or Legal Advisor), fill in your details, and verify your email. You'll have full access to the platform once registered."
  },
  {
    question: "What job types are available?",
    keywords: ["job", "types", "positions", "work"],
    answer: "We have various job types including: Full-time, Part-time, Contract, Freelance, Internship, and Temporary positions across multiple industries and experience levels."
  },
  {
    question: "How does the messaging system work?",
    keywords: ["message", "chat", "communication", "contact"],
    answer: "Once you apply to a job or connect with an employer, you can message them directly through our real-time messaging system. All messages are encrypted and secure."
  },
  {
    question: "Is legal support available?",
    keywords: ["legal", "law", "support", "advisor"],
    answer: "Yes! We have professional legal advisors available to help with visa issues, contracts, employment law, and relocation questions. Visit the 'Legal Support' section to connect with an advisor."
  },
  {
    question: "How do I apply for a job?",
    keywords: ["apply", "application", "submit", "job"],
    answer: "Find a job you're interested in, click 'Apply Now', upload your resume or fill out the application form, and optionally add a cover letter. Employers will review your application and contact you."
  },
  {
    question: "Can I save jobs for later?",
    keywords: ["save", "bookmark", "favorites", "later"],
    answer: "Yes! Click the bookmark icon on any job listing to save it. You can view all your saved jobs in the 'Saved Jobs' section of your dashboard."
  },
  {
    question: "What makes Altroway different?",
    keywords: ["why", "unique", "different", "features"],
    answer: "Altroway combines job matching with legal support, real-time communication, and European-focused opportunities. Our platform is designed specifically for professionals relocating to Europe."
  }
];

const JOB_NICHES = [
  { name: "IT & Software", keywords: ["it", "software", "developer", "tech", "programming", "engineer"] },
  { name: "Healthcare", keywords: ["health", "medical", "nurse", "doctor", "healthcare", "physician"] },
  { name: "Finance", keywords: ["finance", "accountant", "banker", "accounting", "financial"] },
  { name: "Marketing", keywords: ["marketing", "sales", "advertising", "promotional"] },
  { name: "Education", keywords: ["teach", "educator", "trainer", "education", "professor"] },
  { name: "Engineering", keywords: ["engineer", "mechanical", "civil", "electrical", "construction"] },
  { name: "Hospitality", keywords: ["hotel", "restaurant", "hospitality", "tourism", "chef"] },
  { name: "Business", keywords: ["business", "manager", "executive", "management", "director"] }
];

export function Chatbot() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string; type?: "text" | "jobs" }[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [suggestedJobs, setSuggestedJobs] = useState<any[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const findJobsForNiche = async (niche: string) => {
    try {
      const response = await fetch(`/api/jobs?industry=${encodeURIComponent(niche)}&limit=5`)
      if (response.ok) {
        const jobs = await response.json()
        setSuggestedJobs(jobs)
        return jobs
      }
    } catch (error) {
      console.error("Error fetching jobs:", error)
    }
    return []
  }

  const checkFAQ = (userInput: string): FAQItem | null => {
    const input = userInput.toLowerCase()
    for (const faq of FAQ) {
      if (faq.keywords.some(keyword => input.includes(keyword))) {
        return faq
      }
    }
    return null
  }

  const detectJobNiche = (userInput: string): string | null => {
    const input = userInput.toLowerCase()
    for (const niche of JOB_NICHES) {
      if (niche.keywords.some(keyword => input.includes(keyword))) {
        return niche.name
      }
    }
    return null
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage = input
    const newMessages = [...messages, { role: "user" as const, content: userMessage }]
    setMessages(newMessages)
    setInput("")
    setIsLoading(true)

    try {
      // Check if it's a FAQ question
      const faqMatch = checkFAQ(userMessage)
      if (faqMatch) {
        setMessages((prev) => [...prev, { role: "assistant", content: faqMatch.answer, type: "text" }])
        setIsLoading(false)
        return
      }

      // Check if they're asking for jobs in a specific niche
      const niche = detectJobNiche(userMessage)
      if (niche) {
        setMessages((prev) => [...prev, { role: "assistant", content: `Great! I found jobs in ${niche}. Let me fetch the latest opportunities for you...`, type: "text" }])
        
        const jobs = await findJobsForNiche(niche)
        
        if (jobs && jobs.length > 0) {
          const jobsMessage = `I found ${jobs.length} jobs in ${niche}:\n\n${jobs.map((job, idx) => `${idx + 1}. ${job.title} at ${job.company}`).join('\n')}\n\nWould you like to see all ${niche} jobs?`
          setMessages((prev) => [...prev, { role: "assistant", content: jobsMessage, type: "jobs" }])
        } else {
          setMessages((prev) => [...prev, { role: "assistant", content: `Sorry, I couldn't find jobs in ${niche} right now. Try browsing all jobs or search for a different category.`, type: "text" }])
        }
        setIsLoading(false)
        return
      }

      // Default response for other queries
      const defaultResponses = [
        "That's a great question! You can browse all available jobs by clicking 'Jobs' in the navigation menu. Would you like help finding jobs in a specific industry?",
        "I'm here to help! I can answer FAQ questions or help you find jobs. What niche are you interested in? (e.g., IT, Healthcare, Finance, etc.)",
        "I can help you explore job opportunities or answer questions about Altroway. What would you like to know?"
      ];

      const randomResponse = defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
      setMessages((prev) => [...prev, { role: "assistant", content: randomResponse, type: "text" }])
    } catch (error) {
      console.error("Error handling message:", error)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again or explore the jobs page directly.", type: "text" },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewAllJobs = (niche?: string) => {
    if (niche) {
      router.push(`/jobs?industry=${encodeURIComponent(niche)}`)
    } else {
      router.push("/jobs")
    }
    setIsOpen(false)
  }

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50">
        <Button onClick={handleToggle} size="lg" className="rounded-full w-16 h-16 shadow-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
          {isOpen ? <X className="h-8 w-8" /> : <MessageCircle className="h-8 w-8" />}
        </Button>
      </div>
      {isOpen && (
        <div className="fixed bottom-28 right-8 z-50">
          <Card className="w-80 sm:w-96 h-[500px] flex flex-col shadow-xl border-0">
            <CardHeader className="border-b bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Job Assistant
              </CardTitle>
              <CardDescription className="text-blue-100 text-xs">
                Ask about jobs or get help finding opportunities
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.length === 0 && (
                  <div className="space-y-3 text-center py-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <HelpCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-600">Hi! I can help you:</p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>✓ Answer FAQ questions</li>
                      <li>✓ Find jobs by industry</li>
                      <li>✓ Help you navigate Altroway</li>
                    </ul>
                  </div>
                )}
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg whitespace-pre-wrap text-sm ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-gray-200 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-75"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150"></div>
                      </div>
                    </div>
                  </div>
                )}
                {suggestedJobs.length > 0 && (
                  <Button 
                    onClick={() => handleViewAllJobs(detectJobNiche(messages[messages.length - 2]?.content))}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white mt-2"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    View All Jobs
                  </Button>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about jobs or help..."
                  onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSendMessage()}
                  disabled={isLoading}
                  className="flex-grow text-sm"
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700"
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
