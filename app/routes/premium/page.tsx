"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageSquare,
  Users,
  Briefcase,
  MapPin,
  BookOpen,
  Lock,
  ArrowLeft,
  Crown,
  Check,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PREMIUM_FEATURES = [
  {
    id: "guide",
    label: "Expert Guide",
    icon: Users,
    content: {
      title: "Individual Expert Guide",
      description: "Get a personalized expert assigned to your case",
      details: [
        "One-on-one consultation with immigration specialist",
        "Personalized career planning based on your profile",
        "Regular check-ins and progress monitoring",
        "Customized recommendations for employers and roles",
        "Priority support channel",
      ],
    },
  },
  {
    id: "support",
    label: "Live Support",
    icon: MessageSquare,
    content: {
      title: "Live Team Support",
      description: "Direct access to our support team whenever you need",
      details: [
        "24/7 chat support in multiple languages",
        "Quick response time (within 2 hours)",
        "Video consultation sessions available",
        "Email support for complex queries",
        "Dedicated support manager assigned",
      ],
    },
  },
  {
    id: "setup",
    label: "Setup",
    icon: Briefcase,
    content: {
      title: "Operation Setup",
      description: "Complete guidance for settling into your new role",
      details: [
        "Banking and financial account setup",
        "Tax registration assistance",
        "Work permit documentation",
        "Employment contract review",
        "Salary negotiation support",
      ],
    },
  },
  {
    id: "tips",
    label: "Post-Arrival",
    icon: MapPin,
    content: {
      title: "Post-Arrival Tips & Guides",
      description: "Everything you need to know after arriving",
      details: [
        "Housing and accommodation guide",
        "Local transportation information",
        "Healthcare and insurance setup",
        "Community and social integration",
        "Lifestyle and cultural adjustment tips",
      ],
    },
  },
  {
    id: "rules",
    label: "Rules & Regulations",
    icon: BookOpen,
    content: {
      title: "Rules & Regulations",
      description: "Stay informed about local laws and requirements",
      details: [
        "Legal rights and responsibilities",
        "Visa and work permit requirements",
        "Tax obligations explained",
        "Employee rights information",
        "Regular updates on policy changes",
      ],
    },
  },
];

export default function PremiumRoutePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("guide");

  const currentFeature = PREMIUM_FEATURES.find((f) => f.id === activeTab);
  const Icon = currentFeature?.icon || Users;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Button variant="ghost" onClick={() => router.back()} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Premium Route</h1>
              <p className="text-gray-600 mt-1">
                Personalized guidance with expert support every step
              </p>
            </div>
          </div>
        </div>

        {/* Premium Badge */}
        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 mb-8">
          ⭐ Premium Membership Benefits
        </Badge>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 bg-white border border-gray-200 p-1 rounded-lg mb-8">
            {PREMIUM_FEATURES.map((feature) => (
              <TabsTrigger
                key={feature.id}
                value={feature.id}
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white text-xs sm:text-sm"
              >
                <span className="hidden sm:inline">{feature.label}</span>
                <span className="sm:hidden">{feature.label.split(" ")[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {PREMIUM_FEATURES.map((feature) => (
            <TabsContent key={feature.id} value={feature.id} className="space-y-6">
              <Card className="border-2 border-purple-200 bg-white">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg">
                      <Icon className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{feature.content.title}</CardTitle>
                      <p className="text-gray-600 text-sm mt-1">{feature.content.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {feature.content.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          {/* Short Route Card */}
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-600" />
                Short Route
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-700">Self-guided path with:</p>
              <ul className="space-y-2">
                {[
                  "Job requirements checklist",
                  "Document templates",
                  "Employer database",
                  "Process guides",
                  "Cost estimations",
                  "Timeline expectations",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <span className="text-blue-600">→</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Premium Route Card */}
          <Card className="border-2 border-purple-400 bg-gradient-to-br from-purple-50 to-indigo-50 relative">
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              RECOMMENDED
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-purple-600" />
                Premium Route
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-700">All Short Route features, plus:</p>
              <ul className="space-y-2">
                {[
                  "Expert guide assignment",
                  "24/7 live support",
                  "Setup assistance",
                  "Post-arrival guidance",
                  "Rules & regulations",
                  "Priority handling",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <span className="text-purple-600">★</span>
                    <span className="font-semibold text-gray-800">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 border-0 text-white mb-8">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Unlock Premium Benefits?</h3>
            <p className="text-purple-100 mb-6">
              Join hundreds of successful professionals who have used our Premium Route to achieve their career goals in Europe.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button
                asChild
                className="bg-white text-purple-600 hover:bg-purple-50 font-semibold"
              >
                <Link href="/subscribe">Upgrade to Premium</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-white text-white hover:bg-white/10"
              >
                <Link href="/jobs">Browse Jobs First</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info Box */}
        <div className="p-6 bg-white rounded-lg border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-2">💡 Premium Subscription Includes</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {[
              "Expert Support",
              "Priority Processing",
              "24/7 Availability",
              "Multi-language Support",
              "Career Planning",
              "Legal Guidance",
              "Setup Assistance",
              "Lifetime Access",
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
