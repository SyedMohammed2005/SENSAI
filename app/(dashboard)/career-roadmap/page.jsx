"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RoadmapFlow from "@/components/RoadmapFlow";
import { 
  Sparkles, 
  ChevronDown, 
  ChevronRight, 
  Download, 
  Loader2,
  CheckCircle,
  AlertCircle,
  Briefcase,
  TrendingUp,
  Award,
  Target,
  Zap
} from "lucide-react";

export default function CareerRoadmapPage() {
  const [domain, setDomain] = useState("");
  const [level, setLevel] = useState("");
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const generateRoadmap = async () => {
    if (!domain || !level) {
      setError("Please select both domain and level");
      return;
    }

    setError("");
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/career-roadmap", {
        method: "POST",
        body: JSON.stringify({ domain, level }),
      });

      const data = await res.json();
      setRoadmap(data);

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

    } catch (err) {
      setError("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  const saveRoadmap = () => {
    const dataStr = JSON.stringify(roadmap, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `${domain}-roadmap.json`;
    a.click();

    URL.revokeObjectURL(url);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      
      {/* Background Grid Lines */}
      <div className="absolute inset-0 w-full h-full">
        {/* Vertical Grid Lines */}
        <div className="absolute inset-0 w-full h-full" style={{ 
          backgroundImage: 'repeating-linear-gradient(90deg, rgba(200,200,210,0.06) 0px, rgba(200,200,210,0.06) 1px, transparent 1px, transparent 40px)',
          backgroundSize: '40px 100%'
        }} />
        
        {/* Horizontal Grid Lines */}
        <div className="absolute inset-0 w-full h-full" style={{ 
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(200,200,210,0.06) 0px, rgba(200,200,210,0.06) 1px, transparent 1px, transparent 40px)',
          backgroundSize: '100% 40px'
        }} />
        
        {/* Medium Grid Lines */}
        <div className="absolute inset-0 w-full h-full" style={{ 
          backgroundImage: 'repeating-linear-gradient(90deg, rgba(180,180,200,0.04) 0px, rgba(180,180,200,0.04) 1px, transparent 1px, transparent 120px)',
          backgroundSize: '120px 100%'
        }} />
        
        <div className="absolute inset-0 w-full h-full" style={{ 
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(180,180,200,0.04) 0px, rgba(180,180,200,0.04) 1px, transparent 1px, transparent 120px)',
          backgroundSize: '100% 120px'
        }} />
        
        {/* Diagonal Grid Lines */}
        <div className="absolute inset-0 w-full h-full" style={{ 
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(200,200,210,0.03) 0px, rgba(200,200,210,0.03) 1px, transparent 1px, transparent 50px)',
          backgroundSize: '50px 50px'
        }} />

        {/* Dot Pattern */}
        <div className="absolute inset-0 w-full h-full" style={{ 
          backgroundImage: 'radial-gradient(circle, rgba(200,200,210,0.05) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 pt-20 md:pt-24 pb-16 px-4">
        
        {/* HERO SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Icon Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-white/10 mb-6"
          >
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-xs text-gray-300">AI-Powered Career Path</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-4
              bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent
              hover:scale-105 transition-transform duration-500"
          >
            Career Roadmap
          </motion.h1>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Create a structured roadmap designed to guide you from where you are to where you want to be. 
            Get clear direction on what to learn, build real-world projects, and grow with confidence at every step.
          </motion.p>
        </motion.div>

        {/* INPUT SECTION */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto mt-12"
        >
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-gray-900/60 to-gray-900/30 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
            
            {/* Domain Input */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Briefcase className="inline w-4 h-4 mr-2" />
                Career Domain
              </label>
              <input
                placeholder="e.g., AI Engineer, Full Stack Developer, Data Scientist"
                value={domain}
                onChange={(e) => {
                  setDomain(e.target.value);
                  setError("");
                }}
                className={`w-full bg-black/50 border rounded-xl p-3 text-white placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300
                  ${!domain && error ? "border-red-500" : "border-white/10 hover:border-white/20"}`}
              />
            </div>

            {/* Level Select */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Target className="inline w-4 h-4 mr-2" />
                Experience Level
              </label>
              <div className="relative">
                <select
                  value={level}
                  onChange={(e) => {
                    setLevel(e.target.value);
                    setError("");
                  }}
                  className={`w-full bg-black/50 border rounded-xl p-3 text-white appearance-none
                    focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300
                    ${!level && error ? "border-red-500" : "border-white/10 hover:border-white/20"}`}
                >
                  <option value="" className="bg-black">Select your level</option>
                  <option value="Beginner" className="bg-black">🌱 Beginner - Just starting out</option>
                  <option value="Intermediate" className="bg-black">📈 Intermediate - Some experience</option>
                  <option value="Advanced" className="bg-black">🚀 Advanced - Expert level</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20"
                >
                  <p className="text-red-400 text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Generate Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={generateRoadmap}
              disabled={loading || !domain || !level}
              className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden group
                ${loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : !domain || !level
                  ? "bg-gray-700 cursor-not-allowed"
                  : success
                  ? "bg-gradient-to-r from-green-600 to-green-500 text-white"
                  : "bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white border border-white/10"
                }`}
            >
              {/* Shine effect */}
              {!loading && domain && level && !success && (
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              )}
              
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating Roadmap...
                  </>
                ) : success ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Roadmap Generated!
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Generate Roadmap
                  </>
                )}
              </span>
            </motion.button>

            {/* Loading Message */}
            <AnimatePresence>
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 text-center"
                >
                  <p className="text-gray-400 text-sm animate-pulse flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    ⏳ Generating roadmap... please wait, this may take a few seconds.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Message */}
            <AnimatePresence>
              {success && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20"
                >
                  <p className="text-green-400 text-sm flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    ✅ Your personalized roadmap is ready! Scroll down to view.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* ROADMAP DISPLAY */}
        <AnimatePresence>
          {(roadmap?.stages || roadmap?.steps) && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12"
            >
              <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-8">
                  <motion.h2 
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                  >
                    Your Personalized Roadmap
                  </motion.h2>
                  <p className="text-gray-400 text-sm mt-2">
                    Follow this structured path to master {domain}
                  </p>
                </div>

                {/* Roadmap Flow Component */}
                <RoadmapFlow roadmap={{
                  stages: roadmap.stages || roadmap.steps
                }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SAVE BUTTON */}
        <AnimatePresence>
          {roadmap && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="mt-8 flex justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={saveRoadmap}
                className="relative overflow-hidden group px-8 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold flex items-center gap-2 shadow-lg hover:shadow-green-500/20 transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Download className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Save Roadmap</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error State */}
        <AnimatePresence>
          {roadmap && !(roadmap?.stages || roadmap?.steps) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12 text-center"
            >
              <p className="text-red-400 text-sm flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Failed to load roadmap. Please try again.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}