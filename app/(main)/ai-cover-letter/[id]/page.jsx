// Import Link component for navigation between pages
import Link from "next/link";

// Import ArrowLeft icon
import { ArrowLeft } from "lucide-react";

// Import custom Button component
import { Button } from "@/components/ui/button";

// Import server action to fetch a single cover letter
import { getCoverLetter } from "@/actions/cover-letter";

// Import preview component to edit/view the cover letter
import CoverLetterPreview from "../_components/cover-letter-preview";


// This is a server component page to edit a specific cover letter
// It receives params from the URL (like /ai-cover-letter/[id])
export default async function EditCoverLetterPage({ params }) {

  // Get the id from URL params
  const { id } = await params;

  // Fetch the cover letter details using the id
  const coverLetter = await getCoverLetter(id);

  return (
    // Main container with padding
    <div className="container mx-auto py-6">

      {/* Top section: Back button and title */}
      <div className="flex flex-col space-y-2">

        {/* Back button to go to cover letter list page */}
        <Link href="/ai-cover-letter">
          <Button variant="link" className="gap-2 pl-0">
            <ArrowLeft className="h-4 w-4" />
            Back to Cover Letters
          </Button>
        </Link>

        {/* Page title showing job title and company name */}
        <h1 className="text-6xl font-bold gradient-title mb-6">
          {coverLetter?.jobTitle} at {coverLetter?.companyName}
        </h1>

      </div>

      {/* Cover letter preview/editor component */}
      <CoverLetterPreview content={coverLetter?.content} />

    </div>
  );
}