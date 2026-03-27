// Importing Next.js Link component for client-side navigation
import Link from "next/link";

// Importing Clerk authentication components
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

// Importing icons from lucide-react
import { GraduationCap, Layout, LayoutDashboard, PenBox, Home} from "lucide-react";

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
import { StarsIcon, ChevronDown, FileText } from "lucide-react";

// Importing function to check and sync user in database
import { checkUser } from "@/lib/checkUser";

// Async Header component (Server Component)
const Header = async () => {
  // Ensure user exists in DB before rendering header
  await checkUser();

  return (
    // Fixed header with blur background effect
    <header className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      
      {/* Navigation container */}
      <nav className="w-full px-4 h-16 md:px-6 flex items-center justify-between">
        
        {/* Logo - redirects to homepage */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Sensai Logo "
            width={200}
            height={60}
            className="h-12 py-1 w-auto object-contain"
          />
        </Link>

        {/* Right side navigation items */}
        <div className="flex item-center space-x-2 md:space-x-4">

          {/* Visible only when user is signed in */}
        <SignedIn>

  {/* Home Button */}
  <Link href="/">
   <Button variant="outline">
      <Home className="h-4 w-4" />
      <span className="hidden md:block"> Home</span>
    </Button>
  </Link>

  {/* Industry Insights Dashboard button */}
  <Link href={"/dashboard"}>
    <Button variant="outline">
      <LayoutDashboard className=" h-4 w-4" />
      <span className="hidden md:block"> Industry Insights</span>
    </Button>
  </Link>

            {/* Growth Tools Dropdown */}
            <DropdownMenu>

              {/* Dropdown Trigger Button */}
              <DropdownMenuTrigger asChild>
                <Button>
                  <StarsIcon className=" h-4 w-4" />
                  <span className="hidden md:block"> Growth Tools</span>
                  <ChevronDown className=" h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              {/* Dropdown Menu Content */}
              <DropdownMenuContent>

                {/* Resume Builder Link */}
                <DropdownMenuItem>
                  <Link href={"/resume"} className="flex items-center gap-2">
                    <FileText className=" h-4 w-4" />
                    <span> Bulid Resume</span>
                  </Link>
                </DropdownMenuItem>

                {/* AI Cover Letter Link */}
                <DropdownMenuItem>
                  <Link
                    href={"/ai-cover-letter"}
                    className="flex items-center gap-2"
                  >
                    <PenBox className=" h-4 w-4" />
                    <span> Cover Letter</span>
                  </Link>
                </DropdownMenuItem>

                {/* Interview Preparation Link */}
                <DropdownMenuItem>
                  <Link href={"/interview"} className="flex items-center gap-2">
                    <GraduationCap className=" h-4 w-4" />
                    <span> Interview Prep</span>
                  </Link>
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>

          {/* Visible only when user is signed out */}
          <SignedOut>
            <SignInButton>
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>

          {/* User profile button (visible when signed in) */}
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10", // Avatar size
                  userButtonPopoverCard: "shadow-x1", // Popover shadow
                  userPreviewMainIdentifier: "font-semibold", // Username styling
                },
              }}
              afterSignOutUrl="/" // Redirect to homepage after sign out
            />
          </SignedIn>

        </div>
      </nav>
    </header>
  );
};

// Exporting Header component
export default Header;