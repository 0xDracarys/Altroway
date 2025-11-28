"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Clock, Target, Home } from "lucide-react";
import Link from "next/link";
import { updateUserJobTypes } from "@/app/actions/profile-actions";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n/provider";

const JOB_TYPES = [
  {
    id: "short_term",
    label: "Short Term Work",
    icon: Clock,
    description: "Seasonal, temporary, or contract-based positions",
  },
  {
    id: "long_term",
    label: "Long Term Work",
    icon: Target,
    description: "Permanent or multi-year career opportunities",
  },
  {
    id: "relocation",
    label: "Family Relocation + Citizenship",
    icon: Home,
    description: "Positions supporting long-term relocation",
  },
];

export default function JobTypesPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  const toggleJobType = (id: string) => {
    const newSelected = new Set(selectedTypes);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedTypes(newSelected);
  };

  const handleContinue = async () => {
    if (selectedTypes.size === 0) {
      alert("Please select at least one job type");
      return;
    }

    try {
      setLoading(true);
      await updateUserJobTypes(Array.from(selectedTypes));
      router.push("/onboarding/loading");
    } catch (error) {
      console.error("Error saving job types:", error);
      alert("Failed to save your preferences. Please try again.");
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
            <div className="text-sm font-semibold text-gray-600">Step 2 of 5</div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`h-2 w-8 rounded-full transition-all ${
                    step <= 2 ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">What Type of Work Are You Looking For?</h1>
          <p className="text-xl text-gray-600">
            Select one or more options that match your preferences (you can choose multiple)
          </p>
        </div>

        {/* Job Type Cards */}
        <div className="space-y-4 mb-8">
          {JOB_TYPES.map((jobType) => {
            const Icon = jobType.icon;
            const isSelected = selectedTypes.has(jobType.id);

            return (
              <Card
                key={jobType.id}
                onClick={() => toggleJobType(jobType.id)}
                className={`cursor-pointer transition-all border-2 ${
                  isSelected
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300 bg-white"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleJobType(jobType.id)}
                      className="w-6 h-6"
                    />
                    <div className={`p-3 rounded-lg ${isSelected ? "bg-blue-600" : "bg-gray-100"}`}>
                      <Icon className={`h-6 w-6 ${isSelected ? "text-white" : "text-gray-600"}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">{jobType.label}</h3>
                      <p className="text-gray-600 text-sm">{jobType.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Selection Summary */}
        {selectedTypes.size > 0 && (
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-sm">
              ✓ You've selected {selectedTypes.size} option{selectedTypes.size !== 1 ? "s" : ""}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={selectedTypes.size === 0 || loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Continue"}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Info Box */}
        <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">🎯 Multiple Selections Allowed</h3>
          <p className="text-gray-600 text-sm">
            You can select multiple job types if you're open to different opportunities. This helps us show you
            more relevant positions and tailor our recommendations to your career goals.
          </p>
        </div>
      </div>
    </div>
  );
}
