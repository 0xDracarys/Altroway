import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Footer } from "@/components/footer";
import { Search, MapPin, Clock, Euro, Building, Zap, Bookmark, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import { JobsClient } from "./jobs-client";

export default async function JobsPage() {
  const supabase = await createClient();

  // Fetch jobs from database
  const { data: jobs, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching jobs:", error);
    // Return empty array instead of failing
  }

  const jobsList = jobs || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-12 mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 text-blue-600 bg-white/90 px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              FEATURED OPPORTUNITIES
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Find Your Dream Job in Europe
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Discover thousands of opportunities with visa sponsorship and expert support from leading European employers
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-12">
        <JobsClient initialJobs={jobsList} />
      </div>

      <Footer />
    </div>
  );
}
