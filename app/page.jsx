"use client";

// ==============================
// IMPORTS
// ==============================

// React core import
import React from "react";

// Component imports
import AccordionFeatures from "@/components/AccordionFeatures"; // Features accordion component
import HeroSection from "@/components/hero.jsx"; // Hero section component (top landing section)
import Chatbot from "@/components/Chatbot"; // AI Chatbot floating component

// UI components from shadcn/ui
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

// Animation libraries
import * as Icons from "lucide-react"; // Icon library
import { motion } from "framer-motion"; // Animation library for scroll/hover effects

// Static data imports for different sections
import { features } from "@/data/features.js"; // Features data for accordion
import { howItWorks } from "@/data/howitWorks.js"; // How it works steps data
import { testimonial } from "@/data/testimonial.js"; // Testimonials user data
import { faqs } from "@/data/faqs.js"; // FAQ questions and answers

// Next.js utilities
import Image from "next/image"; // Optimized image component
import Link from "next/link"; // Client-side routing

// Additional icons
import { ArrowRight } from "lucide-react"; // Arrow icon for CTA button

// ==============================
// HOME PAGE COMPONENT
// ==============================
export default function Home() {
  return (
    // Main wrapper with full viewport height,
    // dark background, and overflow hidden to prevent scroll bleed
    <main className="relative min-h-screen bg-black overflow-hidden">
      
      {/* Decorative background grid layer (positioned behind content) */}
      {/* Note: This creates a subtle grid pattern across the entire page background */}
      <div className="grid-background"></div>

      {/* Main content container positioned above background */}
      {/* z-10 ensures content appears above the grid background */}
      <div className="relative z-10">
        
        {/* ================= HERO SECTION ================= */}
        {/* Purpose: First impression section with main heading, CTA buttons, and hero image */}
        <HeroSection />

        {/* ================= AI CHATBOT ================= */}
        {/* Purpose: Floating chatbot component for user assistance */}
        <Chatbot />

        {/* ================= FEATURES SECTION ================= */}
        {/* Purpose: Interactive accordion showcasing platform features */}
        {/* Note: Cards are in capsule mode when inactive, expand when clicked */}
        <AccordionFeatures />

        {/* ================= STATS / METRICS SECTION ================= */}
        {/* Purpose: Display key platform metrics to build trust and credibility */}
        <section className="w-full py-12 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            {/* Responsive grid for metrics - changes layout based on screen size */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              
              {/* Industry count metric - shows number of industries covered */}
              <div className="flex flex-col items-center justify-center space-y-2">
                <h3 className="text-4xl font-bold">50+</h3>
                <p className="text-foreground-muted text-white/70">
                  Industries Covered
                </p>
              </div>

              {/* Question bank metric - shows total questions available */}
              <div className="flex flex-col items-center justify-center space-y-2">
                <h3 className="text-4xl font-bold">1000+</h3>
                <p className="text-foreground-muted text-white/70">
                  Industries Questions
                </p>
              </div>

              {/* Success rate metric - shows platform effectiveness */}
              <div className="flex flex-col items-center justify-center space-y-2">
                <h3 className="text-4xl font-bold">95%</h3>
                <p className="text-foreground-muted text-white/70">
                  Success Rate
                </p>
              </div>

              {/* AI availability metric - shows 24/7 support */}
              <div className="flex flex-col items-center justify-center space-y-2">
                <h3 className="text-4xl font-bold">24/7</h3>
                <p className="text-foreground-muted">AI Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS SECTION ================= */}
        {/* Purpose: Explain the 5-step process users go through */}
        {/* Note: Features animations, hover effects, and connecting lines between steps */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-black overflow-hidden relative">
          
          {/* Background Grid Lines - Creates technical/modern feel */}
          {/* Multiple layers of grids for depth (small, medium, diagonal, dot pattern) */}
          <div className="absolute inset-0 w-full h-full">
            {/* Small Vertical Grid Lines - 40px spacing */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(200,200,210,0.06) 0px, rgba(200,200,210,0.06) 1px, transparent 1px, transparent 40px)",
                backgroundSize: "40px 100%",
              }}
            />

            {/* Small Horizontal Grid Lines - 40px spacing */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(200,200,210,0.06) 0px, rgba(200,200,210,0.06) 1px, transparent 1px, transparent 40px)",
                backgroundSize: "100% 40px",
              }}
            />

            {/* Medium Grid Lines - 120px spacing for additional depth */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(180,180,200,0.04) 0px, rgba(180,180,200,0.04) 1px, transparent 1px, transparent 120px)",
                backgroundSize: "120px 100%",
              }}
            />

            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(180,180,200,0.04) 0px, rgba(180,180,200,0.04) 1px, transparent 1px, transparent 120px)",
                backgroundSize: "100% 120px",
              }}
            />

            {/* Diagonal Grid Lines - 45-degree angle for texture */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, rgba(200,200,210,0.03) 0px, rgba(200,200,210,0.03) 1px, transparent 1px, transparent 50px)",
                backgroundSize: "50px 50px",
              }}
            />

            {/* Dot Pattern - Adds subtle texture overlay */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(200,200,210,0.05) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
          </div>

          {/* Subtle gradient overlay - Creates depth and improves text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 pointer-events-none" />

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            
            {/* Section header with animations */}
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              {/* Animated heading - slides in from top */}
              <motion.h2
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false }} // Animation replays when scrolling back
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-center mb-4
                  transition-all duration-500 ease-out
                  hover:scale-105 hover:-translate-y-2
                  bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent"
              >
                How It Works
              </motion.h2>

              {/* Animated subtitle - fades in after heading */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: false }}
                className="text-gray-400 text-sm md:text-base"
              >
                Five simple steps to accelerate your career growth
              </motion.p>
            </div>

            {/* Responsive grid layout for steps - 1 column mobile, 2 tablet, 3 desktop, 5 large screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8 max-w-7xl mx-auto">
              {howItWorks.map((item, index) => {
                // Generate step number with leading zero (01, 02, etc.)
                const stepNumber = String(index + 1).padStart(2, "0");

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: false }}
                    // Hover effect - lift card up, but only on desktop
                    whileHover={{
                      y:
                        typeof window !== "undefined" &&
                        window.innerWidth >= 1024
                          ? -12
                          : 0,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.98 }} // Tap feedback for mobile
                    className="group relative flex flex-col items-center space-y-4 text-center p-6 rounded-2xl
                      bg-gradient-to-br from-gray-900/70 to-gray-900/40
                      border border-white/8 hover:border-white/20
                      transition-all duration-500 cursor-pointer
                      hover:shadow-2xl hover:shadow-black/40
                      backdrop-blur-sm"
                  >
                    {/* Animated Background Gradient - appears on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-700/25 to-gray-900/50 
                        opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"
                    />

                    {/* Step Number Badge - top right corner with animation */}
                    <motion.div
                      className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-r from-gray-500 to-gray-300 
                        flex items-center justify-center text-xs font-bold text-black shadow-lg z-10
                        md:group-hover:from-gray-400 md:group-hover:to-gray-200"
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.25, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {stepNumber}
                    </motion.div>

                    {/* Icon Container with 3D hover effects */}
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                      className="relative"
                    >
                      {/* Glow Effect Behind Icon - appears on hover */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-500 to-gray-300 blur-xl"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 0.3, scale: 1.6 }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Icon Circle - contains the actual icon */}
                      <div
                        className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-800/90 to-gray-900/80 
                          flex items-center justify-center shadow-lg
                          border border-white/8 md:group-hover:border-white/20
                          transition-all duration-300 overflow-hidden
                          md:group-hover:shadow-xl"
                      >
                        {/* Shine Effect - light sweeps across on hover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />

                        {/* Icon - cloned from data with proper styling */}
                        <div className="relative z-10 text-gray-300 md:group-hover:text-white transition-all duration-300 md:group-hover:scale-115">
                          {React.cloneElement(item.icon, {
                            className: "w-8 h-8",
                          })}
                        </div>
                      </div>
                    </motion.div>

                    {/* Step Title with hover scale effect */}
                    <motion.h3
                      className="font-bold text-base md:text-lg text-center transition-all duration-300"
                      whileTap={{ scale: 0.98 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <span
                        className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent
                          md:group-hover:from-white md:group-hover:to-white"
                      >
                        {item.title}
                      </span>
                    </motion.h3>

                    {/* Step Description - brightens on hover */}
                    <p
                      className="text-gray-400 text-xs sm:text-sm text-center leading-relaxed 
                        md:group-hover:text-gray-200 transition-all duration-300"
                    >
                      {item.description}
                    </p>

                    {/* Detailed Description - expands on hover (desktop only) */}
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      whileHover={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden md:block hidden"
                    >
                      <p className="text-gray-500 text-xs text-center leading-relaxed mt-2 pt-2 border-t border-white/10">
                        Click to learn more →
                      </p>
                    </motion.div>

                    {/* Mobile tap hint - visible only on touch devices */}
                    <div className="md:hidden text-center mt-2">
                      <span className="text-gray-600 text-[10px] flex items-center justify-center gap-1">
                        Tap for details
                      </span>
                    </div>

                    {/* Progress Indicator - bottom bar that expands on hover */}
                    <motion.div
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-gray-400 to-white rounded-full
                        md:group-hover:w-4/5 transition-all duration-500"
                    />

                    {/* Pulse Ring Animation - subtle border effect on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-white/0 md:group-hover:border-white/12"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    />

                    {/* Connecting Line - between cards (desktop only) */}
                    {index < howItWorks.length - 1 && (
                      <div className="hidden xl:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-20">
                        {/* Horizontal line connector */}
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          transition={{
                            duration: 0.5,
                            delay: index * 0.1 + 0.3,
                          }}
                          viewport={{ once: false }}
                          className="w-8 h-[2px] bg-gradient-to-r from-gray-700 to-gray-500"
                        />
                        {/* Pulsing dot at the end of connector */}
                        <motion.div
                          animate={{
                            scale: [1, 1.8, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.5,
                          }}
                          className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-gray-500"
                        />
                      </div>
                    )}

                    {/* Floating Particles - decorative elements on hover (desktop only) */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl hidden md:block"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-gray-400 rounded-full"
                          initial={{
                            x: "50%",
                            y: "50%",
                            scale: 0,
                          }}
                          animate={{
                            x: ["50%", `${Math.random() * 100}%`],
                            y: ["50%", `${Math.random() * 100}%`],
                            scale: [0, 1.2, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Interactive Progress Bar - shows overall process completion */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: false }}
              className="max-w-3xl mx-auto mt-16"
            >
              {/* Progress bar track */}
              <div className="relative h-1 bg-gray-800/60 rounded-full overflow-hidden">
                {/* Animated progress indicator */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-300 to-gray-600"
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "0%" }}
                  transition={{ duration: 1.5, delay: 1 }}
                  viewport={{ once: false }}
                />
              </div>
              {/* Progress labels */}
              <div className="flex justify-between mt-2 text-[10px] sm:text-xs text-gray-600 flex-wrap gap-2">
                <span>Start</span>
                <span>Onboarding</span>
                <span>Documents</span>
                <span>Interview</span>
                <span>Track</span>
                <span>Success!</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= TESTIMONIALS SECTION ================= */}
        {/* Purpose: Display user feedback and build social proof */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-neutral-800/50 overflow-hidden relative">
          
          {/* Background Grid Lines - Only Vertical & Horizontal for cleaner look */}
          <div className="absolute inset-0 w-full h-full">
            {/* Vertical Grid Lines - 50px spacing, very subtle */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(255,255,255,0.043) 0px, rgba(255,255,255,0.043) 1px, transparent 1px, transparent 50px)",
                backgroundSize: "50px 100%",
              }}
            />

            {/* Horizontal Grid Lines - 50px spacing, very subtle */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(255,255,255,0.043) 0px, rgba(255,255,255,0.043) 1px, transparent 1px, transparent 50px)",
                backgroundSize: "100% 50px",
              }}
            />
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            
            {/* Section header */}
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <motion.h2
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-center mb-4
                  transition-all duration-500 ease-out
                  hover:scale-105 hover:-translate-y-2
                  bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent"
              >
                What Our Users Say
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: false }}
                className="text-gray-400 text-sm md:text-base"
              >
                Join thousands of professionals who transformed their careers with Senseai
              </motion.p>
            </div>

            {/* Testimonials responsive grid - 1 column mobile, 2 tablet, 3 desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
              {testimonial.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: false }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative flex flex-col p-6 rounded-2xl
                    bg-gradient-to-br from-neutral-800/60 to-neutral-900/40
                    border border-white/10 hover:border-white/20
                    transition-all duration-500
                    hover:shadow-2xl hover:shadow-black/20
                    backdrop-blur-sm"
                >
                  {/* Animated Background Gradient on Hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neutral-700/20 to-neutral-900/40 
                      opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"
                  />

                  {/* Quote Icon - Top right corner */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                    viewport={{ once: false }}
                    className="absolute top-4 right-4"
                  >
                    <div
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-500 to-gray-400 
                        flex items-center justify-center"
                    >
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                  </motion.div>

                  {/* Star Rating - 5 stars with sequential animation */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <motion.svg
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.2,
                          delay: index * 0.1 + 0.3 + i * 0.05,
                        }}
                        viewport={{ once: false }}
                        className="w-4 h-4 text-yellow-500 fill-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </motion.svg>
                    ))}
                  </div>

                  {/* Quote Text - The actual testimonial */}
                  <motion.blockquote
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
                    viewport={{ once: false }}
                    className="relative mb-6"
                  >
                    <p className="text-gray-200 text-sm leading-relaxed">
                      "{item.quote}"
                    </p>
                  </motion.blockquote>

                  {/* User Profile Section */}
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/10">
                    
                    {/* Avatar with glow effect on hover */}
                    <motion.div whileHover={{ scale: 1.05 }} className="relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-500 to-gray-300 blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-white/40 transition-all duration-300">
                        <Image
                          width={48}
                          height={48}
                          src={item.image}
                          alt={item.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.div>

                    {/* User Information */}
                    <div className="flex-1">
                      <motion.p
                        className="font-semibold text-white text-sm group-hover:text-gray-200 transition-colors duration-300"
                        whileHover={{ x: 3 }}
                      >
                        {item.author}
                      </motion.p>
                      <p className="text-gray-300 text-xs">{item.role}</p>
                      <p className="text-gray-400 text-[10px] mt-0.5">
                        {item.company}
                      </p>
                    </div>

                    {/* Verified Badge - Checkmark icon */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
                      viewport={{ once: false }}
                      className="w-5 h-5 rounded-full bg-gradient-to-r from-gray-500 to-gray-300 
                        flex items-center justify-center"
                    >
                      <svg
                        className="w-3 h-3 text-black"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Progress Indicator - Bottom bar on hover */}
                  <motion.div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-gray-400 to-white rounded-full
                      md:group-hover:w-3/4 transition-all duration-500"
                  />

                  {/* Floating Particles - Decorative on hover (desktop only) */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl hidden md:block"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-gray-400 rounded-full"
                        initial={{
                          x: "50%",
                          y: "50%",
                          scale: 0,
                        }}
                        animate={{
                          x: ["50%", `${Math.random() * 100}%`],
                          y: ["50%", `${Math.random() * 100}%`],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Trust Badges - Social proof section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: false }}
              className="text-center mt-12"
            >
              <p className="text-gray-500 text-xs mb-3">
                Trusted by professionals from
              </p>
              <div className="flex flex-wrap justify-center gap-6 opacity-60">
                <span className="text-gray-400 text-sm">🏢 Fortune 500</span>
                <span className="text-gray-400 text-sm">🚀 Startups</span>
                <span className="text-gray-400 text-sm">💼 Remote Teams</span>
                <span className="text-gray-400 text-sm">🎓 Fresh Graduates</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        {/* Purpose: Answer common user questions about the platform */}
        <section className="w-full py-12 md:py-20 lg:py-24 bg-black overflow-hidden relative">
          
          {/* Background Grid Lines - Same pattern as How It Works section */}
          <div className="absolute inset-0 w-full h-full">
            {/* Vertical Grid Lines - 40px spacing */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(200,200,210,0.06) 0px, rgba(200,200,210,0.06) 1px, transparent 1px, transparent 40px)",
                backgroundSize: "40px 100%",
              }}
            />

            {/* Horizontal Grid Lines - 40px spacing */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(200,200,210,0.06) 0px, rgba(200,200,210,0.06) 1px, transparent 1px, transparent 40px)",
                backgroundSize: "100% 40px",
              }}
            />

            {/* Medium Grid Lines - 120px spacing for depth */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(180,180,200,0.04) 0px, rgba(180,180,200,0.04) 1px, transparent 1px, transparent 120px)",
                backgroundSize: "120px 100%",
              }}
            />

            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(180,180,200,0.04) 0px, rgba(180,180,200,0.04) 1px, transparent 1px, transparent 120px)",
                backgroundSize: "100% 120px",
              }}
            />
          </div>

          {/* Subtle gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 pointer-events-none" />

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            
            {/* FAQ section header - Reduced margins for compact design */}
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
              <motion.h2
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-3
                  transition-all duration-500 ease-out
                  hover:scale-105 hover:-translate-y-2
                  bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent"
              >
                Frequently Asked Questions
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: false }}
                className="text-gray-400 text-sm md:text-base"
              >
                Find answers to common questions about our platform
              </motion.p>
            </div>

            {/* Accordion container - Reduced max-width for compact layout */}
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: false }}
              >
                <Accordion type="single" collapsible className="w-full space-y-3">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: false }}
                    >
                      <AccordionItem
                        value={`item-${index}`}
                        className="group bg-gradient-to-br from-gray-900/60 to-gray-900/30 
                          border border-white/8 rounded-lg overflow-hidden
                          hover:border-white/20 transition-all duration-300
                          backdrop-blur-sm relative"
                      >
                        {/* Animated gradient overlay - appears on hover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-gray-700/15 via-gray-600/5 to-gray-700/15 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        />

                        {/* Shine effect - light sweeps across on hover */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" 
                        />

                        <AccordionTrigger className="px-4 py-3 hover:no-underline relative z-10">
                          <div className="flex items-center gap-3 text-left w-full">
                            
                            {/* Question number badge - Smaller for compact design */}
                            <motion.div
                              whileHover={{ scale: 1.15, rotate: 360 }}
                              transition={{ duration: 0.4 }}
                              className="w-6 h-6 rounded-full bg-gradient-to-r from-gray-600 to-gray-400 
                                flex items-center justify-center text-[10px] font-bold text-black shrink-0
                                group-hover:shadow-md transition-all duration-300"
                            >
                              {String(index + 1).padStart(2, "0")}
                            </motion.div>

                            {/* Question text - Smaller font for compact design */}
                            <span className="text-white font-medium text-xs md:text-sm flex-1 group-hover:text-gray-200 transition-colors duration-300">
                              {faq.question}
                            </span>

                            {/* Expand/collapse chevron icon */}
                            <motion.div
                              animate={{ rotate: 0 }}
                              className="text-gray-500 group-hover:text-gray-300 transition-colors duration-300"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </motion.div>
                          </div>
                        </AccordionTrigger>

                        <AccordionContent className="px-4 pb-3 pt-1 relative z-10">
                          <div className="flex gap-2">
                            
                            {/* Answer icon - Small info icon with pulse animation */}
                            <motion.div
                              animate={{
                                scale: [1, 1.1, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 4,
                              }}
                              className="w-6 h-6 shrink-0 flex items-center justify-center"
                            >
                              <div
                                className="w-5 h-5 rounded-full bg-gradient-to-r from-gray-600/15 to-gray-400/15 
                                  flex items-center justify-center"
                              >
                                <svg
                                  className="w-2.5 h-2.5 text-gray-400"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </motion.div>

                            {/* Answer text - Smaller font for compact design */}
                            <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ================= CALL TO ACTION SECTION ================= */}
        {/* Purpose: Final prompt to encourage user sign-up */}
        <section className="w-full">
          <div className="mx-auto py-24 gradient rounded-lg">
            {/* Centered CTA content */}
            <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto">
              
              {/* CTA heading with hover animation */}
              <h2
                className="text-3xl font-bold tracking-tighter text-primary-foreground sm:text-4xl md:text-5xl
                  transition-all duration-500 ease-out
                  hover:scale-105 hover:-translate-y-2"
              >
                Ready to Accelerate Your Career?
              </h2>

              {/* CTA description text */}
              <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
                Join thousands of professionals using Senseai to achieve their
                career goals. Sign up today and take the first step towards a
                brighter future!
              </p>

              {/* CTA button with bounce animation */}
              <Link href="/post-login" passHref>
                <Button
                  size="lg"
                  variant="secondary"
                  className="h-11 mt-5 animate-bounce"
                >
                  Start Your Journey Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ================= FOOTER SECTION ================= */}
        {/* Purpose: Site footer with navigation links and copyright */}
        <footer className="bg-gradient-to-b from-black to-[#111827] py-12 mt-16 border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center space-y-6 text-center">
              
              {/* Brand name */}
              <h3 className="text-xl font-semibold text-white">SENSAI</h3>

              {/* Footer description / tagline */}
              <p className="text-gray-300 max-w-md">
                Empowering your career with AI-driven insights, interview
                practice, and smart guidance.
              </p>

              {/* Decorative divider line */}
              <div className="h-px w-40 bg-white/10"></div>

              {/* Footer navigation links */}
              <div className="flex gap-6 text-sm text-gray-400">
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-white transition">
                  Terms of Service
                </Link>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </div>

              {/* Copyright notice - dynamically updates year */}
              <p className="text-xs text-gray-500">
                © {new Date().getFullYear()} Sensai. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}