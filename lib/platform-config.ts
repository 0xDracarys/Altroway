// This file contains editable configuration for the platform
// In production, these would be stored in a database

export const platformConfig = {
  // Hero Section
  hero: {
    badge: "Your Gateway to European Opportunities",
    title: "Find Your Dream Job in Europe",
    subtitle:
      "Connect with top European employers, get expert legal guidance, and build your career across the continent with our comprehensive platform.",
    videoUrl: "https://videos.pexels.com/video-files/3377752/3377752-hd_1920_1080_30fps.mp4",
  },

  // Statistics - these should be editable
  stats: {
    activeJobs: { label: "Active Jobs", default: 150, key: "active_jobs" },
    countries: { label: "Countries", default: 27, key: "countries" },
    successStories: {
      label: "Success Stories",
      default: 500,
      key: "success_stories",
    },
    legalPartners: {
      label: "Legal Partners",
      default: 10,
      key: "legal_partners",
    },
  },

  // Process Steps
  processSteps: [
    {
      number: 1,
      title: "Create Your Profile",
      description: "Build a compelling profile showcasing your skills, experience, and career goals.",
      icon: "Users",
      color: "blue",
    },
    {
      number: 2,
      title: "Find Your Job",
      description: "Browse thousands of opportunities and apply to positions that match your expertise.",
      icon: "Search",
      color: "green",
    },
    {
      number: 3,
      title: "Connect & Communicate",
      description: "Directly communicate with employers and get legal guidance for your application.",
      icon: "MessageSquare",
      color: "purple",
    },
    {
      number: 4,
      title: "Land Your Dream Job",
      description: "Get hired and start your new career in Europe with our ongoing support.",
      icon: "Award",
      color: "orange",
    },
  ],

  // Features
  features: [
    {
      title: "Smart Job Matching",
      description: "Our AI-powered system matches you with the perfect job opportunities based on your skills, experience, and preferences.",
      icon: "Search",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Expert Legal Support",
      description: "Get professional guidance for visas, work permits, and immigration processes from certified legal advisors.",
      icon: "Scale",
      gradient: "from-green-500 to-green-600",
    },
    {
      title: "Direct Communication",
      description: "Connect directly with employers and legal advisors through our integrated messaging system.",
      icon: "MessageSquare",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      title: "Secure & Trusted",
      description: "Your data is protected with enterprise-grade security and all employers are verified.",
      icon: "Shield",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      title: "European Network",
      description: "Access opportunities across 27 European countries with our extensive network of employers.",
      icon: "Globe",
      gradient: "from-red-500 to-red-600",
    },
    {
      title: "Career Growth",
      description: "Track your applications, get insights, and grow your career with our comprehensive tools.",
      icon: "TrendingUp",
      gradient: "from-indigo-500 to-indigo-600",
    },
  ],

  // Success Stories
  successStories: [
    {
      name: "Maria Santos",
      role: "Software Engineer",
      location: "Berlin",
      quote: "Altroway helped me find my dream job in Berlin. The legal support made the visa process so much easier!",
      rating: 5,
      initial: "M",
      color: "blue",
    },
    {
      name: "Ahmed Hassan",
      role: "Data Scientist",
      location: "Amsterdam",
      quote: "The job matching was incredible. I found a position in Amsterdam that perfectly fits my skills and goals.",
      rating: 5,
      initial: "A",
      color: "green",
    },
    {
      name: "Sarah Johnson",
      role: "Marketing Manager",
      location: "Barcelona",
      quote: "Direct communication with employers was a game-changer. I got hired within 2 weeks of joining!",
      rating: 5,
      initial: "S",
      color: "purple",
    },
  ],

  // Routes
  routes: {
    short: {
      title: "Short Route",
      description: "Quick path to employment",
      includes: ["Requirements", "Documents", "Employers", "Migration process", "Costs", "Timeline"],
    },
    premium: {
      title: "Premium Route",
      description: "Personalized guidance and support",
      includes: [
        "Individual guide based on qualification and goals",
        "Live support from the team",
        "Setup of operation",
        "Post arrival tips",
        "Rules and regulations to follow",
      ],
    },
  },
}
