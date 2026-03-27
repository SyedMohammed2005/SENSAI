// Import React (required for JSX)
import React from "react";

// Hero section component (top landing section)
import HeroSection from "@/components/hero.jsx";

// UI components from shadcn/ui
import { Card, CardContent } from "@/components/ui/card";

// Static data imports for different sections
import { features } from "@/data/features.js";
import { howItWorks } from "@/data/howitWorks.js";
import { testimonial } from "@/data/testimonial.js";
import { faqs } from "@/data/faqs.js";

// Next.js optimized image component
import Image from "next/image";

// AI Chatbot component
import Chatbot from "@/components/Chatbot";

// Accordion components for FAQ section
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Next.js routing and UI utilities
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Icon used in CTA button
import { ArrowRight } from "lucide-react";

// ==============================
// Home Page Component
// ==============================
export default function Home() {
  return (
    // Main wrapper with full viewport height,
    // dark background, and overflow hidden to prevent scroll bleed
    <main className="relative min-h-screen bg-black overflow-hidden">
      {/* Decorative background grid layer (positioned behind content) */}
      <div className="grid-background"></div>

      {/* Main content container positioned above background */}
      <div className="relative z-10">
        {/* ================= HERO SECTION ================= */}
        <HeroSection />

        {/* AI Chatbot floating component */}
        <Chatbot />

        {/* ================= FEATURES SECTION ================= */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            {/* Section heading with hover animation */}
            <h2
              className="text-3xl font-bold tracking-tighter text-center mb-12
              transition-all duration-500 ease-out
              hover:scale-105 hover:-translate-y-2"
            >
              Powerful Features for your Career Growth
            </h2>

            {/* Responsive grid layout for feature cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {/* Loop through features data array */}
              {features.map((feature, index) => {
                return (
                  // Individual feature card
                  <Card
                    key={index}
                    className="border-2 border-white/10 bg-black text-white hover:border-primary transition-colors duration-300"
                  >
                    <CardContent className="pt-6 text-center flex flex-col items-center">
                      <div className="flex flex-col items-center justify-center">
                        {/* Feature icon (React element stored in data) */}
                        {feature.icon}

                        {/* Feature title */}
                        <h3 className="text-xl font-bold mb-2">
                          {feature.title}
                        </h3>

                        {/* Feature description */}
                        <p className="text-foreground text-white/70">
                          {feature.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= STATS / METRICS SECTION ================= */}
        <section className="w-full py-12 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            {/* Responsive grid for metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {/* Industry count metric */}
              <div className="flex flex-col items-center justify-center space-y-2">
                <h3 className="text-4xl font-bold">50+</h3>
                <p className="text-foreground-muted text-white/70">
                  Industries Covered
                </p>
              </div>

              {/* Question bank metric */}
              <div className="flex flex-col items-center justify-center space-y-2">
                <h3 className="text-4xl font-bold">1000+</h3>
                <p className="text-foreground-muted text-white/70">
                  Industries Questions
                </p>
              </div>

              {/* Success rate metric */}
              <div className="flex flex-col items-center justify-center space-y-2">
                <h3 className="text-4xl font-bold">95%</h3>
                <p className="text-foreground-muted text-white/70">
                  Success Rate
                </p>
              </div>

              {/* AI availability metric */}
              <div className="flex flex-col items-center justify-center space-y-2">
                <h3 className="text-4xl font-bold">24/7</h3>
                <p className="text-foreground-muted">AI Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS SECTION ================= */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-2 md:px-2">
            {/* Section header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              {/* Animated heading */}
              <h2
                className="text-3xl font-bold tracking-tighter text-center mb-12
                transition-all duration-500 ease-out
                hover:scale-105 hover:-translate-y-2"
              >
                How It Works
              </h2>

              {/* Section subtitle */}
              <p className="text-muted-foreground">
                Four simple steps to accelerate your career growth
              </p>
            </div>

            {/* Responsive grid layout for steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {/* Loop through howItWorks data array */}
              {howItWorks.map((item, index) => {
                return (
                  // Individual step container
                  <div
                    key={index}
                    className="flex flex-col items-center space-y-4 text-center max-w-sm mx-auto"
                  >
                    {/* Step icon inside circular background */}
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      {item.icon}
                    </div>

                    {/* Step title */}
                    <h3 className="font-semibold text-xl text-center whitespace-nowrap px-6">
                      {item.title}
                    </h3>

                    {/* Step description */}
                    <p className="text-muted-foreground text-center leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= TESTIMONIALS SECTION ================= */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            {/* Section heading with hover animation */}
            <h2
              className="text-3xl font-bold tracking-tighter text-center mb-12
              transition-all duration-500 ease-out
              hover:scale-105 hover:-translate-y-2"
            >
              What Our Users Say
            </h2>

            {/* Testimonials responsive grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Loop through testimonial data */}
              {testimonial.map((testimonial, index) => {
                return (
                  // Individual testimonial card
                  <Card key={index} className="bg-background">
                    <CardContent className="pt-6">
                      <div className="flex flex-col space-y-4">
                        {/* User profile section */}
                        <div className="flex items-center space-x-4">
                          {/* User avatar image */}
                          <div className="relative h-12 w-12 flex-shrink-0">
                            <Image
                              width={40}
                              height={40}
                              src={testimonial.image}
                              alt={testimonial.author}
                              className="rounded-full object-cover border-2 border-primary/20"
                            />
                          </div>

                          {/* User details */}
                          <div>
                            <p className="font-semibold">
                              {testimonial.author}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.role}
                            </p>
                            <p className="text-sm text-primary">
                              {testimonial.company}
                            </p>
                          </div>
                        </div>

                        {/* Testimonial quote block */}
                        <blockquote>
                          <p className="text-muted-foreground italic relative">
                            {/* Opening quotation mark */}
                            <span className="text-3xl text-primary absolute -top-4 -left-2">
                              &quot;
                            </span>

                            {testimonial.quote}

                            {/* Closing quotation mark */}
                            <span className="text-3xl text-primary absolute -bottom-4">
                              &quot;
                            </span>
                          </p>
                        </blockquote>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section className="w-full py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            {/* FAQ section header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2
                className="text-3xl font-bold tracking-tighter mb-4
                transition-all duration-500 ease-out
                hover:scale-105 hover:-translate-y-2"
              >
                Frequently Asked Questions
              </h2>

              {/* FAQ subtitle */}
              <p className="text-muted-foreground">
                Find answers to common questions about our platform
              </p>
            </div>

            {/* Accordion container */}
            <div className="max-w-6xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {/* Loop through FAQ data */}
                {faqs.map((faq, index) => {
                  return (
                    <AccordionItem key={index} value={`item-${index}`}>
                      {/* FAQ question */}
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>

                      {/* FAQ answer */}
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </div>
        </section>

        {/* ================= CALL TO ACTION SECTION ================= */}
        <section className="w-full">
          <div className="mx-auto py-24 gradient rounded-lg">
            {/* Centered CTA content */}
            <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto">
              {/* CTA heading */}
              <h2
                className="text-3xl font-bold tracking-tighter text-primary-foreground sm:text-4xl md:text-5xl
                transition-all duration-500 ease-out
                hover:scale-105 hover:-translate-y-2"
              >
                Ready to Accelerate Your Career?
              </h2>

              {/* CTA description */}
              <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
                Join thousands of professionals using Senseai to achieve their
                career goals. Sign up today and take the first step towards a
                brighter future!
              </p>

              {/* CTA button linking to post-login/dashboard */}
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
        <footer className="bg-gradient-to-b from-black to-[#111827] py-12 mt-16 border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center space-y-6 text-center">
              {/* Brand name */}
              <h3 className="text-xl font-semibold text-white">SENSAI</h3>

              {/* Footer description */}
              <p className="text-gray-300 max-w-md">
                Empowering your career with AI-driven insights, interview
                practice, and smart guidance.
              </p>

              {/* Decorative divider */}
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

              {/* Copyright notice */}
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
