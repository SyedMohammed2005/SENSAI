// Import Link component for navigation
import Link from "next/link";

// Import ArrowLeft icon
import { ArrowLeft } from "lucide-react";

// Import custom Button component
import { Button } from "@/components/ui/button";

// Import the cover letter generator form component
import CoverLetterGenerator from "../_components/cover-letter-generator";


// This page is used to create a new cover letter
export default function NewCoverLetterPage() {

  return (
    // Main container with padding
    <div className="container mx-auto py-6">

      {/* Top section with back button and heading */}
      <div className="flex flex-col space-y-2">

        {/* Back button to return to cover letters list */}
        <Link href="/ai-cover-letter">
          <Button variant="link" className="gap-2 pl-0">
            <ArrowLeft className="h-4 w-4" />
            Back to Cover Letters
          </Button>
        </Link>

        {/* Page title and description */}
        <div className="pb-6">
          <h1 className="text-6xl font-bold gradient-title">
            Create Cover Letter
          </h1>
          <p className="text-muted-foreground">
            Generate a tailored cover letter for your job application
          </p>
        </div>

      </div>

      {/* Cover letter generator form component */}
      <CoverLetterGenerator />

    </div>
  );
}