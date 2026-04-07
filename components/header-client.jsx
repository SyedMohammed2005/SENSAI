// components/header-client.jsx
"use client";

// Importing Next.js Link component for client-side navigation
import Link from "next/link";

// Importing Next.js hooks for client-side navigation detection
import { usePathname } from "next/navigation";

// Importing Clerk authentication components
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

// Importing icons from lucide-react
import { GraduationCap, LayoutDashboard, PenBox, Home, Map, Sparkles } from "lucide-react";

// Importing custom Button component
import { Button } from "./ui/button";

// Importing Next.js optimized Image component
import Image from "next/image";

// Importing Dropdown menu components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

// Importing additional icons
import { ChevronDown, FileText } from "lucide-react";

// Import useState for hover state
import { useState } from "react";

// Header Client Component - Handles all interactive UI logic
const HeaderClient = () => {
  // Get current pathname to determine if we're on homepage
  const pathname = usePathname();
  
  // Check if current page is homepage (root path "/")
  const isHomePage = pathname === "/";
  
  // State for dropdown open on hover
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    // Fixed header with blur background effect
    <header className="fixed top-0 z-50 w-full border-b bg-black/80 backdrop-blur-md supports-[backdrop-filter]:bg-black/60">
      
      {/* Navigation container */}
      <nav className="w-full px-4 h-16 md:px-6 flex items-center justify-between">
        
        {/* Logo - redirects to homepage */}
        <Link href="/" className="hover:opacity-80 transition-opacity duration-300">
          <Image
            src="/logo.png"
            alt="Sensai Logo"
            width={200}
            height={60}
            className="h-12 py-1 w-auto object-contain"
          />
        </Link>

        {/* Right side navigation items */}
        <div className="flex items-center space-x-2 md:space-x-4">

          {/* Visible only when user is signed in */}
          <SignedIn>

            {/* Home Button - Only show when NOT on homepage */}
            {!isHomePage && (
              <Link href="/">
                <Button 
                  variant="outline" 
                  className="relative overflow-hidden group border-white/20 hover:border-white/40 bg-transparent hover:bg-white/10 transition-all duration-300"
                >
                  <Home className="h-4 w-4 mr-2 transition-transform group-hover:scale-110 duration-300" />
                  <span className="hidden md:block">Home</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Button>
              </Link>
            )}

            {/* Industry Insights Dashboard button */}
            <Link href="/dashboard">
              <Button 
                variant="outline" 
                className="relative overflow-hidden group border-white/20 hover:border-white/40 bg-transparent hover:bg-white/10 transition-all duration-300"
              >
                <LayoutDashboard className="h-4 w-4 mr-2 transition-transform group-hover:scale-110 duration-300" />
                <span className="hidden md:block">Industry Insights</span>
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Button>
            </Link>

            {/* Growth Tools Dropdown - Same style as Industry Insights button */}
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline"
                  className="relative overflow-hidden group border-white/20 hover:border-white/40 bg-transparent hover:bg-white/10 transition-all duration-300"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <Sparkles className="h-4 w-4 mr-2 transition-transform group-hover:scale-110 duration-300" />
                  <span className="hidden md:block">Growth Tools</span>
                  <ChevronDown className={`h-4 w-4 ml-1 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Button>
              </DropdownMenuTrigger>

              {/* Dropdown Menu Content */}
              <DropdownMenuContent 
                className="w-72 bg-black/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-xl p-2 mt-2"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                {/* Resume Builder Link */}
                <DropdownMenuItem className="cursor-pointer hover:bg-white/10 rounded-lg transition-all duration-200 mb-1">
                  <Link href="/resume" className="flex items-center gap-3 px-2 py-2.5 w-full">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600/20 to-blue-400/20 flex items-center justify-center group">
                      <FileText className="h-4 w-4 text-blue-400 transition-transform group-hover:scale-110 duration-300" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">Build Resume</p>
                      <p className="text-xs text-gray-500">Create ATS-optimized resumes</p>
                    </div>
                    <Sparkles className="h-3 w-3 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </DropdownMenuItem>

                {/* AI Cover Letter Link */}
                <DropdownMenuItem className="cursor-pointer hover:bg-white/10 rounded-lg transition-all duration-200 mb-1">
                  <Link href="/ai-cover-letter" className="flex items-center gap-3 px-2 py-2.5 w-full">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-600/20 to-green-400/20 flex items-center justify-center group">
                      <PenBox className="h-4 w-4 text-green-400 transition-transform group-hover:scale-110 duration-300" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">Cover Letter</p>
                      <p className="text-xs text-gray-500">AI-powered cover letters</p>
                    </div>
                    <Sparkles className="h-3 w-3 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </DropdownMenuItem>

                {/* Interview Preparation Link */}
                <DropdownMenuItem className="cursor-pointer hover:bg-white/10 rounded-lg transition-all duration-200 mb-1">
                  <Link href="/interview" className="flex items-center gap-3 px-2 py-2.5 w-full">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600/20 to-purple-400/20 flex items-center justify-center group">
                      <GraduationCap className="h-4 w-4 text-purple-400 transition-transform group-hover:scale-110 duration-300" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">Interview Prep</p>
                      <p className="text-xs text-gray-500">Practice with AI mock interviews</p>
                    </div>
                    <Sparkles className="h-3 w-3 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </DropdownMenuItem>

                {/* Career Roadmap Link */}
                <DropdownMenuItem className="cursor-pointer hover:bg-white/10 rounded-lg transition-all duration-200">
                  <Link href="/career-roadmap" className="flex items-center gap-3 px-2 py-2.5 w-full">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-600/20 to-orange-400/20 flex items-center justify-center group">
                      <Map className="h-4 w-4 text-orange-400 transition-transform group-hover:scale-110 duration-300" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">Career Roadmap</p>
                      <p className="text-xs text-gray-500">Personalized career path</p>
                    </div>
                    <Sparkles className="h-3 w-3 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>

          {/* Visible only when user is signed out */}
          <SignedOut>
            <SignInButton>
              <Button 
                variant="outline" 
                className="relative overflow-hidden group border-white/20 hover:border-white/40 bg-transparent hover:bg-white/10 transition-all duration-300"
              >
                <span>Sign In</span>
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Button>
            </SignInButton>
          </SignedOut>

          {/* User profile button (visible when signed in) */}
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 ring-2 ring-white/20 hover:ring-white/40 transition-all duration-300",
                  userButtonPopoverCard: "bg-black/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-xl",
                  userPreviewMainIdentifier: "font-semibold text-white",
                  userPreviewSecondaryIdentifier: "text-gray-400",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>

        </div>
      </nav>
    </header>
  );
};

export default HeaderClient;