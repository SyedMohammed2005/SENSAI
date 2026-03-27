// Import Next.js Link component for client-side navigation
import Link from "next/link";

// Import reusable Button component from your UI library
import { Button } from "@/components/ui/button";

// Custom 404 Not Found page component
export default function NotFound() {
  return (
    // Full screen centered container
    <div className="flex flex-col items-center justify-center min-h-[100vh] px-4 text-center">
      
      {/* 404 Error Code */}
      <h1 className="text-6xl font-bold gradient-title mb-4">404</h1>

      {/* Error Title */}
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>

      {/* Error Description */}
      <p className="text-gray-600 mb-8">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been
        moved.
      </p>

      {/* Navigation button to return to homepage */}
      <Link href="/">
        <Button>Return Home</Button>
      </Link>

    </div>
  );
}