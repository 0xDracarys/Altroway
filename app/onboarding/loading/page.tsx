"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Crown } from "lucide-react";

export default function LoadingPage() {
  const router = useRouter();
  const [showOptions, setShowOptions] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate processing
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowOptions(true);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleRouteSelect = (route: "short" | "premium") => {
    router.push(`/routes/${route}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Loading State */}
        {!showOptions ? (
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-block">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-4 border-white/20 border-t-white animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="h-10 w-10 text-white animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Generating Your Routes...</h1>
            <p className="text-xl text-blue-100 mb-8">
              We're analyzing your profile and creating personalized recommendations
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden mb-6">
              <div
                className="bg-white h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Status Messages */}
            <div className="space-y-2 text-blue-100 text-sm">
              <p>✓ Analyzing your goals and preferences</p>
              <p>✓ Matching with opportunities</p>
              <p>✓ Creating personalized recommendations</p>
            </div>
          </div>
        ) : (
          // Routes Selection
          <div>
            <h1 className="text-4xl font-bold text-white mb-4 text-center">Choose Your Path</h1>
            <p className="text-xl text-blue-100 mb-12 text-center">
              Based on your profile, we've created two paths for you
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Short Route */}
              <Card className="border-2 border-blue-200 bg-white/95 hover:shadow-xl transition-all cursor-pointer overflow-hidden group"
                onClick={() => handleRouteSelect("short")}
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="h-6 w-6 text-blue-600" />
                    <h3 className="text-2xl font-bold text-gray-900">Short Route</h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Quick and efficient path to finding your next opportunity
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-blue-600 font-semibold">→</span>
                      <span>Requirements</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-blue-600 font-semibold">→</span>
                      <span>Necessary Documents</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-blue-600 font-semibold">→</span>
                      <span>Available Employers</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-blue-600 font-semibold">→</span>
                      <span>Migration Process</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-blue-600 font-semibold">→</span>
                      <span>Estimated Costs</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-blue-600 font-semibold">→</span>
                      <span>Timeline</span>
                    </div>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white group-hover:translate-x-2 transition-transform">
                    Explore Short Route
                  </Button>
                </CardContent>
              </Card>

              {/* Premium Route */}
              <Card className="border-2 border-purple-400 bg-gradient-to-br from-purple-50 to-indigo-50 hover:shadow-xl transition-all cursor-pointer overflow-hidden group relative"
                onClick={() => handleRouteSelect("premium")}
              >
                <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-bl-lg">
                  <Badge className="bg-transparent text-white border-0">Premium</Badge>
                </div>

                <CardContent className="p-8 pt-12">
                  <div className="flex items-center gap-3 mb-4">
                    <Crown className="h-6 w-6 text-purple-600" />
                    <h3 className="text-2xl font-bold text-gray-900">Premium Route</h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Personalized guidance with expert support every step of the way
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-purple-600 font-semibold">★</span>
                      <span>Individual Expert Guide</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-purple-600 font-semibold">★</span>
                      <span>Live Team Support</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-purple-600 font-semibold">★</span>
                      <span>Operation Setup</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-purple-600 font-semibold">★</span>
                      <span>Post-Arrival Tips</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-purple-600 font-semibold">★</span>
                      <span>Rules & Regulations</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-purple-600 font-semibold">★</span>
                      <span>Priority Services</span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white group-hover:translate-x-2 transition-transform">
                    Explore Premium Route
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Info Message */}
            <div className="text-center text-blue-100 text-sm">
              <p>You can explore both routes and choose later. Let's get started!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
