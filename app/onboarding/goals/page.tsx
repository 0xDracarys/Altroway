"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Target, Clock, Home } from "lucide-react";
import Link from "next/link";
import { updateUserGoals } from "@/app/actions/profile-actions";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n/provider";

const GOALS = [
  {
    id: "short_term",
    label: "Short Term Work",
    icon: Clock,
    description: "Looking for temporary or seasonal employment",
    color: "bg-blue-50 border-blue-200",
  },
  {
    id: "long_term",
    label: "Long Term Work",
    icon: Target,
    description: "Seeking permanent employment abroad",
    color: "bg-green-50 border-green-200",
  },
  {
    id: "relocation",
    label: "Family Relocation + Citizenship",
    icon: Home,
    description: "Planning to relocate with family and pursue citizenship",
    color: "bg-purple-50 border-purple-200",
  },
];

export default function GoalsPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!selectedGoal) return;

    try {
      setLoading(true);
      await updateUserGoals(selectedGoal);
      router.push("/onboarding/job-types");
    } catch (error) {
      console.error("Error saving goals:", error);
      alert("Failed to save your goal. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm font-semibold text-gray-600">Step 1 of 5</div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`h-2 w-8 rounded-full transition-all ${
                    step === 1 ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">What's Your Goal?</h1>
          <p className="text-xl text-gray-600">
            Help us understand your career aspirations so we can recommend the best path for you
          </p>
        </div>

        {/* Goal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {GOALS.map((goal) => {
            const Icon = goal.icon;
            const isSelected = selectedGoal === goal.id;

            return (
              <Card
                key={goal.id}
                onClick={() => setSelectedGoal(goal.id)}
                className={`cursor-pointer transition-all transform hover:scale-105 border-2 ${
                  isSelected
                    ? "border-blue-600 bg-blue-50 shadow-lg"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg ${isSelected ? "bg-blue-600" : "bg-gray-100"}`}>
                        <Icon className={`h-6 w-6 ${isSelected ? "text-white" : "text-gray-600"}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{goal.label}</CardTitle>
                      </div>
                    </div>
                    {isSelected && (
                      <Badge className="bg-blue-600">Selected</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{goal.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <Button variant="outline" asChild>
            <Link href="/register">Back</Link>
          </Button>
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={!selectedGoal || loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Continue"}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Info Box */}
        <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">💡 Why We Ask This</h3>
          <p className="text-gray-600 text-sm">
            Your goal helps us understand your priorities. Different goals require different support:
            short-term positions prioritize quick matching, long-term roles focus on career growth,
            and relocation paths include legal and community support.
          </p>
        </div>
      </div>
    </div>
  );
}
