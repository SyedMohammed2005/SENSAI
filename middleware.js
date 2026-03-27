// ===============================================
// 🔐 CLERK AUTH MIDDLEWARE SETUP
// ===============================================

// Import Clerk middleware helper and route matcher utility
// clerkMiddleware → wraps your middleware with Clerk authentication logic
// createRouteMatcher → helps define which routes require protection
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// NextResponse is used to continue the request lifecycle
import { NextResponse } from "next/server";


// =====================================================
// 🛡️ DEFINE PROTECTED ROUTES
// =====================================================

// createRouteMatcher takes an array of route patterns
// Any route matching these patterns will require authentication
// (.*) means "match everything after this path"
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",       // Protect all dashboard routes
  "/resume(.*)",          // Protect resume pages
  "/ai-cover-letter(.*)", // Protect AI cover letter pages
  "/interview(.*)",       // Protect interview preparation pages
  "/onboarding(.*)",      // Protect onboarding flow
]);


// =====================================================
// 🚦 MAIN MIDDLEWARE FUNCTION
// =====================================================

// clerkMiddleware wraps your async function
// It automatically injects authentication context
export default clerkMiddleware(async (auth, req) => {

  // auth() gives authentication details of the current request
  // userId → present if logged in
  // redirectToSignIn → helper function to redirect unauthenticated users
  const { userId, redirectToSignIn } = await auth();

  // =====================================================
  // 🔎 ACCESS CONTROL LOGIC
  // =====================================================

  // If:
  // 1) user is NOT logged in (no userId)
  // 2) AND route is protected
  // Then → redirect to Clerk sign-in page
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  }

  // If user is authenticated OR route is public
  // Continue request normally
  return NextResponse.next();
});


// =====================================================
// ⚙️ NEXT.JS MIDDLEWARE CONFIGURATION
// =====================================================

export const config = {
  matcher: [

    // This matcher ensures middleware runs on:
    // All routes EXCEPT:
    // - _next (Next.js internals)
    // - Static files like css, js, images, fonts, etc.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpg|jpeg|png|gif|svg|woff2?|ico)).*)",

    // Also run middleware on:
    // - API routes
    // - TRPC routes
    "/(api|trpc)(.*)",
  ],
};