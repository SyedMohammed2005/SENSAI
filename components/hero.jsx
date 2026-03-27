"use client";

// Importing Next.js Link for client-side routing
import Link from "next/link";

// Importing Next.js optimized Image component
import Image from "next/image";

// Importing custom Button component
import { Button } from "./ui/button";

// Importing React hooks
import { use, useRef, useEffect } from "react";

// Hero Section Component
const HeroSection = () => {
  // Creating reference for hero image (used for scroll animation)
  const imageRef = useRef(null);

  // Scroll effect for image animation
  useEffect(() => {
    const imageElement = imageRef.current;

    // Function to handle scroll event
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100; // Trigger animation after 100px scroll

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled"); // Add animation class
      } else {
        imageElement.classList.remove("scrolled"); // Remove animation class
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    // Main Hero Section
    <section className="w-full pt-36 md:pt-48 pb-10">
      <div className="space-y-6 text-center">
        
        {/* Heading & Subheading */}
        <div className="space-y-6 mx-auto">
          
          {/* Main Title */}
          <h1
            className="text-5xl font-bold md:text-6xl lg:text=7xl xl:text-8xl gradient-title
               transition-all duration-500 ease-out
               hover:scale-105 hover:-translate-y-2"
          >
            Your AI Carrer Coach for
            <br />
            Professional Success
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
            Advance your career with personalized guidance, interview prep, and
            AI-powered tools for job success.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex justify-center space-x-4">
          
          {/* Primary Get Started Button */}
          <Link href="/post-login">
            <Button
              size="lg"
              className="px-8 bg-white text-black
             relative rounded-md
             overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>

              {/* Animated snake border effect */}
              <span className="snake-border"></span>
            </Button>
          </Link>

          {/* Secondary Get Started Button */}
          <Link href="/post-login">
            <Button
              size="lg"
              variant="outline"
              className="px-8 bg-black text-white
             relative rounded-md
             overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>

              {/* White animated snake border */}
              <span className="snake-border-white"></span>
            </Button>
          </Link>
        </div>

        {/* Hero Image Section */}
        <div className="hero-image-wrapper mt-5 md:mt-0">
          
          {/* Image container with scroll animation reference */}
          <div ref={imageRef} className="hero-image">
            <Image
              src={"/banner.jpeg"}
              width={1080}
              height={720}
              alt="Banner Senseai"
              className="hero-image rounded-lg shadow-2xl border mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Exporting HeroSection component
export default HeroSection;