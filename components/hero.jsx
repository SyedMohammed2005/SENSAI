// "use client";

// // Importing Next.js Link for client-side routing
// import Link from "next/link";

// // Importing Next.js optimized Image component
// import Image from "next/image";

// // Importing custom Button component
// import { Button } from "./ui/button";

// // Importing React hooks
// import { use, useRef, useEffect } from "react";

// // Hero Section Component
// const HeroSection = () => {
//   // Creating reference for hero image (used for scroll animation)
//   const imageRef = useRef(null);

//   // Scroll effect for image animation
//   useEffect(() => {
//     const imageElement = imageRef.current;

//     // Function to handle scroll event
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY;
//       const scrollThreshold = 100; // Trigger animation after 100px scroll

//       if (scrollPosition > scrollThreshold) {
//         imageElement.classList.add("scrolled"); // Add animation class
//       } else {
//         imageElement.classList.remove("scrolled"); // Remove animation class
//       }
//     };

//     // Add scroll event listener
//     window.addEventListener("scroll", handleScroll);

//     // Cleanup function to remove event listener
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     // Main Hero Section
//     <section className="w-full pt-36 md:pt-48 pb-10">
//       <div className="space-y-6 text-center">
        
//         {/* Heading & Subheading */}
//         <div className="space-y-6 mx-auto">
          
//           {/* Main Title */}
//           <h1
//             className="text-5xl font-bold md:text-6xl lg:text=7xl xl:text-8xl gradient-title
//                transition-all duration-500 ease-out
//                hover:scale-105 hover:-translate-y-2"
//           >
//             Your AI Carrer Coach for
//             <br />
//             Professional Success
//           </h1>

//           {/* Subtitle */}
//           <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
//             Advance your career with personalized guidance, interview prep, and
//             AI-powered tools for job success.
//           </p>
//         </div>

//         {/* CTA Buttons */}
//         <div className="flex justify-center space-x-4">
          
//           {/* Primary Get Started Button */}
//           <Link href="/post-login">
//             <Button
//               size="lg"
//               className="px-8 bg-white text-black
//              relative rounded-md
//              overflow-hidden"
//             >
//               <span className="relative z-10">Get Started</span>

//               {/* Animated snake border effect */}
//               <span className="snake-border"></span>
//             </Button>
//           </Link>

//           {/* Secondary Get Started Button */}
//           <Link href="/post-login">
//             <Button
//               size="lg"
//               variant="outline"
//               className="px-8 bg-black text-white
//              relative rounded-md
//              overflow-hidden"
//             >
//               <span className="relative z-10">Get Started</span>

//               {/* White animated snake border */}
//               <span className="snake-border-white"></span>
//             </Button>
//           </Link>
//         </div>

//         {/* Hero Image Section */}
//         <div className="hero-image-wrapper mt-5 md:mt-0">
          
//           {/* Image container with scroll animation reference */}
//           <div ref={imageRef} className="hero-image">
//             <Image
//               src={"/banner.jpeg"}
//               width={1080}
//               height={720}
//               alt="Banner Senseai"
//               className="hero-image rounded-lg shadow-2xl border mx-auto"
//               priority
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // Exporting HeroSection component
// export default HeroSection;






"use client";

// Importing Next.js Link for client-side routing
import Link from "next/link";

// Importing Next.js optimized Image component
import Image from "next/image";

// Importing custom Button component
import { Button } from "./ui/button";

// Importing React hooks
import { useRef, useEffect, useState } from "react";

// Importing motion for animations
import { motion } from "framer-motion";

// Importing icons
import { Sparkles, ArrowRight, CheckCircle, Star, Zap } from "lucide-react";

// Hero Section Component
const HeroSection = () => {
  // Creating reference for hero image (used for scroll animation)
  const imageRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll effect for image animation
  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement?.classList.add("scrolled");
        setIsScrolled(true);
      } else {
        imageElement?.classList.remove("scrolled");
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    // Main Hero Section
    <section className="relative w-full min-h-screen overflow-hidden bg-black">
      
      {/* Background Grid Lines */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 w-full h-full" style={{ 
          backgroundImage: 'repeating-linear-gradient(90deg, rgba(200,200,210,0.04) 0px, rgba(200,200,210,0.04) 1px, transparent 1px, transparent 40px)',
          backgroundSize: '40px 100%'
        }} />
        
        <div className="absolute inset-0 w-full h-full" style={{ 
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(200,200,210,0.04) 0px, rgba(200,200,210,0.04) 1px, transparent 1px, transparent 40px)',
          backgroundSize: '100% 40px'
        }} />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-500/10 rounded-full blur-3xl" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 pt-32 md:pt-40 pb-20">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 text-center max-w-6xl mx-auto"
        >
          
          {/* Floating Badge */}
          <motion.div
            variants={itemVariants}
            animate={floatingAnimation}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gray-800/50 to-gray-900/50 
              border border-white/10 backdrop-blur-sm mx-auto"
          >
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-xs text-gray-300">AI-Powered Career Platform</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight
              bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent
              hover:scale-105 transition-transform duration-500"
          >
            Your AI Career Coach for
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Professional Success
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-2xl text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed"
          >
            Advance your career with personalized guidance, interview prep, and
            AI-powered tools for job success. Join thousands of professionals who
            accelerated their careers with Senseai.
          </motion.p>

          {/* Stats Row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-6 md:gap-8 pt-4"
          >
            {[
              { value: "50+", label: "Industries", icon: Star },
              { value: "1000+", label: "Interview Qs", icon: CheckCircle },
              { value: "95%", label: "Success Rate", icon: Zap },
              { value: "24/7", label: "AI Support", icon: Sparkles }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10"
              >
                <stat.icon className="w-3 h-3 text-gray-400" />
                <span className="text-xs font-semibold text-white">{stat.value}</span>
                <span className="text-xs text-gray-500">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Get Started Button - Beautiful Design */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center pt-4"
          >
            <Link href="/post-login">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  className="group relative px-10 py-4 bg-white text-black
                    rounded-full font-semibold text-base md:text-lg
                    shadow-lg hover:shadow-2xl 
                    transition-all duration-300 cursor-pointer
                    overflow-hidden"
                >
                  {/* Animated shine effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  
                  {/* Pulse ring effect on hover */}
                  <span className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500" />
                  
                  {/* Subtle border glow */}
                  <span className="absolute inset-0 rounded-full border-2 border-white/0 group-hover:border-white/30 transition-all duration-300" />
                  
                  <span className="relative z-10 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                    Get Started
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Trusted By Section */}
          <motion.div
            variants={itemVariants}
            className="pt-8"
          >
            <p className="text-xs text-gray-500 mb-4">Trusted by professionals from</p>
            <div className="flex flex-wrap justify-center gap-6 opacity-60">
              <span className="text-gray-400 text-sm">🏢 Fortune 500</span>
              <span className="text-gray-400 text-sm">🚀 Top Startups</span>
              <span className="text-gray-400 text-sm">💼 Remote Teams</span>
              <span className="text-gray-400 text-sm">🎓 Fresh Graduates</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Hero Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hero-image-wrapper mt-12 md:mt-16"
        >
          <div 
            ref={imageRef} 
            className={`hero-image relative transition-all duration-700 ${
              isScrolled ? 'scale-95 opacity-70' : 'scale-100 opacity-100'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-gray-500/20 via-transparent to-transparent blur-2xl" />
            
            <Image
              src="/banner.jpeg"
              width={1080}
              height={720}
              alt="Senseai Banner"
              className="relative rounded-2xl shadow-2xl border border-white/10 mx-auto
                hover:shadow-3xl transition-all duration-500"
              priority
            />

            <motion.div
              animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 md:-top-8 md:-right-8 p-2 md:p-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 
                border border-white/10 shadow-lg"
            >
              <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-yellow-500" />
            </motion.div>

            <motion.div
              animate={{ x: [0, -10, 0], y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 p-2 md:p-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 
                border border-white/10 shadow-lg"
            >
              <Zap className="w-4 h-4 md:w-6 md:h-6 text-blue-500" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        >
          <span className="text-xs text-gray-500">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center">
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-white/40 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;