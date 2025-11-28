"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight } from "lucide-react"

type JourneyStep = "welcome" | "goals" | "subtopics" | "questionary" | "test" | "routes"

export function UserJourneyWizard() {
  const [currentStep, setCurrentStep] = useState<JourneyStep>("welcome")
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [selectedSubtopics, setSelectedSubtopics] = useState<string[]>([])

  const goals = [
    { id: "short-term", label: "Short Term Work", icon: "🏢" },
    { id: "long-term", label: "Long Term Work", icon: "📈" },
    { id: "relocation", label: "Full Family Relocation + Citizenship", icon: "🏠" },
  ]

  const subtopics = [
    "Career Development",
    "Language Skills",
    "Visa & Documentation",
    "Housing & Living",
    "Local Culture",
    "Network Building",
  ]

  const toggleGoal = (goalId: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId) ? prev.filter((g) => g !== goalId) : [...prev, goalId]
    )
  }

  const toggleSubtopic = (subtopic: string) => {
    setSelectedSubtopics((prev) =>
      prev.includes(subtopic)
        ? prev.filter((s) => s !== subtopic)
        : [...prev, subtopic]
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {(["welcome", "goals", "subtopics", "questionary", "test", "routes"] as const).map(
            (step, index) => (
              <div
                key={step}
                className={`flex items-center ${index < 5 ? "flex-1" : ""}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    step === currentStep
                      ? "bg-blue-600 text-white scale-110"
                      : ["welcome", "goals", "subtopics", "questionary", "test", "routes"].indexOf(
                          currentStep
                        ) > index
                        ? "bg-green-600 text-white"
                        : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {index + 1}
                </div>
                {index < 5 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all ${
                      ["welcome", "goals", "subtopics", "questionary", "test", "routes"].indexOf(
                        currentStep
                      ) > index
                        ? "bg-green-600"
                        : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            )
          )}
        </div>
      </div>

      {/* Content */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">
            {currentStep === "welcome" && "Welcome to Your Journey"}
            {currentStep === "goals" && "What are your goals?"}
            {currentStep === "subtopics" && "Choose Your Learning Areas"}
            {currentStep === "questionary" && "Tell Us About Yourself"}
            {currentStep === "test" && "English Language Assessment"}
            {currentStep === "routes" && "Choose Your Path"}
          </CardTitle>
          <CardDescription>
            {currentStep === "welcome" && "Let's create your personalized career path"}
            {currentStep === "goals" && "Select which opportunities you're interested in"}
            {currentStep === "subtopics" && "Choose what you'd like to learn about"}
            {currentStep === "questionary" && "Answer a few questions about your background"}
            {currentStep === "test" && "Take an optional English B1 assessment"}
            {currentStep === "routes" && "Select the best route for your journey"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Welcome Step */}
          {currentStep === "welcome" && (
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                We'll help you build a personalized path to success in Europe. Our wizard will guide you through:
              </p>
              <ul className="space-y-2">
                {[
                  "Setting your career goals",
                  "Choosing learning areas",
                  "Building your professional questionary",
                  "Optional English proficiency test",
                  "Selecting your ideal career route",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Goals Step */}
          {currentStep === "goals" && (
            <div className="space-y-4">
              {goals.map((goal) => (
                <Card
                  key={goal.id}
                  className={`cursor-pointer transition-all border-2 ${
                    selectedGoals.includes(goal.id)
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                  onClick={() => toggleGoal(goal.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{goal.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{goal.label}</h3>
                      </div>
                      {selectedGoals.includes(goal.id) && (
                        <CheckCircle className="h-6 w-6 text-blue-600" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Subtopics Step */}
          {currentStep === "subtopics" && (
            <div className="grid grid-cols-2 gap-3">
              {subtopics.map((subtopic) => (
                <Button
                  key={subtopic}
                  onClick={() => toggleSubtopic(subtopic)}
                  variant={selectedSubtopics.includes(subtopic) ? "default" : "outline"}
                  className="justify-start h-auto py-3"
                >
                  {selectedSubtopics.includes(subtopic) && (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  )}
                  {subtopic}
                </Button>
              ))}
            </div>
          )}

          {/* Questionary Step */}
          {currentStep === "questionary" && (
            <div className="space-y-4">
              <p className="text-gray-600">
                Please fill out our questionary form (similar to a CV) to help employers find the perfect match for you.
              </p>
              <Badge className="bg-blue-100 text-blue-800">Personal Information Form Available</Badge>
              <p className="text-sm text-gray-600">
                This will include sections for your experience, skills, education, and languages.
              </p>
            </div>
          )}

          {/* Test Step */}
          {currentStep === "test" && (
            <div className="space-y-4">
              <p className="text-gray-600">
                Take an optional English B1 proficiency test. This certification is valuable for employers.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">Optional Assessment</h3>
                <p className="text-sm text-green-800">
                  You can take this test now or skip it and complete it later. Other language tests will be available soon.
                </p>
              </div>
            </div>
          )}

          {/* Routes Step */}
          {currentStep === "routes" && (
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:shadow-lg transition-all border-2 border-gray-200 hover:border-blue-600">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">🚀</span> Short Route
                  </CardTitle>
                  <CardDescription>Quick path to employment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {["Requirements", "Documents", "Employers", "Migration", "Costs", "Timeline"].map(
                    (item) => (
                      <div key={item} className="flex items-center gap-2 text-sm">
                        <span className="text-blue-600">✓</span>
                        <span>{item}</span>
                      </div>
                    )
                  )}
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:shadow-lg transition-all border-2 border-gray-200 hover:border-purple-600">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">👑</span> Premium Route
                  </CardTitle>
                  <CardDescription>Personalized guidance & support</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    "Individual Guide",
                    "Live Support",
                    "Operation Setup",
                    "Post-Arrival Tips",
                    "Regulations",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm">
                      <span className="text-purple-600">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-6">
            <Button
              variant="outline"
              onClick={() => {
                const steps: JourneyStep[] = ["welcome", "goals", "subtopics", "questionary", "test", "routes"]
                const currentIndex = steps.indexOf(currentStep)
                if (currentIndex > 0) {
                  setCurrentStep(steps[currentIndex - 1])
                }
              }}
              disabled={currentStep === "welcome"}
              className="flex-1"
            >
              Previous
            </Button>
            <Button
              onClick={() => {
                const steps: JourneyStep[] = ["welcome", "goals", "subtopics", "questionary", "test", "routes"]
                const currentIndex = steps.indexOf(currentStep)
                if (currentIndex < steps.length - 1) {
                  setCurrentStep(steps[currentIndex + 1])
                }
              }}
              disabled={currentStep === "routes"}
              className="flex-1"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
