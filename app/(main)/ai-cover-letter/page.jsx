// Import function to fetch all cover letters from database
import { getCoverLetters } from "@/actions/cover-letter";

// Import Link for navigation
import Link from "next/link";

// Import Plus icon
import { Plus } from "lucide-react";

// Import custom Button component
import { Button } from "@/components/ui/button";

// Import component to display list of cover letters
import CoverLetterList from "./_components/cover-letter-list";


// This page shows all saved cover letters
export default async function CoverLetterPage() {

  // Fetch all cover letters from database
  const coverLetters = await getCoverLetters();

  return (
    <div>

      {/* Header section with title and Create button */}
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between mb-5">

        {/* Page title */}
        <h1 className="text-6xl font-bold gradient-title">
          My Cover Letters
        </h1>

        {/* Button to create a new cover letter */}
        <Link href="/ai-cover-letter/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create New
          </Button>
        </Link>

      </div>

      {/* Component to display all cover letters */}
      <CoverLetterList coverLetters={coverLetters} />

    </div>
  );
}