"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, FileText, Users, MapPin, Euro, Clock, ArrowLeft, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const TABS = [
  {
    id: "requirements",
    label: "Requirements",
    icon: CheckCircle,
    content: {
      title: "Work Requirements",
      items: [
        "Valid passport (6+ months validity)",
        "Work visa or appropriate visa status",
        "Healthcare insurance",
        "Local tax registration",
        "Employment contract",
      ],
    },
  },
  {
    id: "documents",
    label: "Documents",
    icon: FileText,
    content: {
      title: "Required Documents",
      items: [
        "Passport copy",
        "CV/Resume (translated if needed)",
        "Cover letter",
        "Educational certificates",
        "Work experience certificates",
        "Reference letters",
      ],
    },
  },
  {
    id: "employers",
    label: "Employers",
    icon: Users,
    content: {
      title: "Featured Employers",
      items: [
        "TechCorp Europe - IT & Software",
        "FinServe Solutions - Finance & Banking",
        "MediCare Plus - Healthcare",
        "BuildRight Construction - Engineering",
        "RetailGlobal - Retail & Management",
      ],
    },
  },
  {
    id: "process",
    label: "Process",
    icon: MapPin,
    content: {
      title: "Migration Process",
      items: [
        "1. Job matching and application",
        "2. Interview preparation",
        "3. Visa application support",
        "4. Document verification",
        "5. Relocation arrangements",
        "6. Job start and settling in",
      ],
    },
  },
  {
    id: "costs",
    label: "Costs",
    icon: Euro,
    content: {
      title: "Estimated Costs",
      items: [
        "Visa application: €50-200",
        "Translation services: €100-300",
        "Medical checks: €150-400",
        "Relocation expenses: €500-2,000",
        "Housing deposit: €300-800",
        "Total estimate: €1,100-3,700",
      ],
    },
  },
  {
    id: "timeline",
    label: "Timeline",
    icon: Clock,
    content: {
      title: "Expected Timeline",
      items: [
        "Job search: 2-4 weeks",
        "Application & interviews: 2-3 weeks",
        "Visa processing: 2-6 weeks",
        "Document preparation: 1-2 weeks",
        "Relocation & settling: 1-2 weeks",
        "Total: 2-4 months",
      ],
    },
  },
];

export default function ShortRoutePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("requirements");

  const currentTab = TABS.find((tab) => tab.id === activeTab);
  const Icon = currentTab?.icon || CheckCircle;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Button variant="ghost" onClick={() => router.back()} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-lg">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Short Route</h1>
              <p className="text-gray-600 mt-1">Quick path to finding your next opportunity</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 bg-white border border-gray-200 p-1 rounded-lg mb-8">
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {TABS.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="space-y-6">
              <Card className="border-2 border-blue-200 bg-white">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl">{tab.content.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tab.content.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Bottom CTA */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 border-0 text-white">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-blue-100 mb-6">
              Browse available positions and start your application process today. Our team is here to support you at every step.
            </p>
            <div className="flex gap-4">
              <Button asChild className="bg-white text-blue-600 hover:bg-blue-50">
                <Link href="/jobs">Browse Jobs</Link>
              </Button>
              <Button variant="outline" asChild className="border-white text-white hover:bg-white/10">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Premium Upsell */}
        <div className="mt-8 p-6 bg-white rounded-lg border-2 border-purple-200">
          <div className="flex items-start gap-4">
            <div className="text-3xl">✨</div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Looking for More Support?</h3>
              <p className="text-gray-600 mb-4">
                Consider upgrading to our Premium Route for personalized guidance, live team support, and expert assistance throughout your journey.
              </p>
              <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white">
                <Link href="/routes/premium">Explore Premium Route</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
