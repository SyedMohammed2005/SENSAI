// data/howItWorks.js
import { UserPlus, MapPin, Users, LineChart, FileEdit } from "lucide-react";

export const howItWorks = [
  {
    title: "Professional Onboarding",
    description: "Share your industry & expertise for personalized guidance",
    icon: <UserPlus className="w-8 h-8" />,
    step: "01",
    detailedDesc: "Tell us about your experience, skills, and career aspirations to get tailored recommendations."
  },
  {
    title: "Career Roadmap",
    description: "Get a personalized roadmap to achieve your career goals",
    icon: <MapPin className="w-8 h-8" />,
    step: "02",
    detailedDesc: "Visual timeline showing exactly what skills to learn and when to advance your career."
  },
  {
    title: "Prepare for Interview",
    description: "Practice with AI-powered mock interviews tailored to your role",
    icon: <Users className="w-8 h-8" />,
    step: "03",
    detailedDesc: "Realistic interview simulations with instant feedback and improvement tips."
  },
  {
    title: "Track Progress",
    description: "Monitor improvements with detailed performance analytics",
    icon: <LineChart className="w-8 h-8" />,
    step: "04",
    detailedDesc: "Visual dashboards showing your growth, achievements, and areas for improvement."
  },
  {
    title: "Craft Documents",
    description: "Create ATS-optimized resumes and compelling cover letters",
    icon: <FileEdit className="w-8 h-8" />,
    step: "05",
    detailedDesc: "AI-powered tools help you create professional documents that stand out to employers."
  }
];