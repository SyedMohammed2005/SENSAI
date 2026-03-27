"use client";
// This makes the component run on the client side (browser)

import { useRouter } from "next/navigation";
// Used to navigate between pages and refresh data

import { format } from "date-fns";
// Used to format the created date into readable format

import { Edit2, Eye, Trash2 } from "lucide-react";
// Icons used in buttons (View and Delete)

import { toast } from "sonner";
// Used to show success or error messages

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// UI Card components for layout

import { Button } from "@/components/ui/button";
// Custom Button component

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
// Alert dialog components used for delete confirmation popup

import { deleteCoverLetter } from "@/actions/cover-letter";
// Server action to delete a cover letter


// Main component that receives coverLetters as props
export default function CoverLetterList({ coverLetters }) {

  // Router for navigation and refreshing page
  const router = useRouter();

  // Function to delete a cover letter
  const handleDelete = async (id) => {
    try {
      // Call server action to delete letter
      await deleteCoverLetter(id);

      // Show success message
      toast.success("Cover letter deleted successfully!");

      // Refresh page data after deletion
      router.refresh();
    } catch (error) {
      // Show error message if something fails
      toast.error(error.message || "Failed to delete cover letter");
    }
  };

  // If there are no cover letters, show empty state message
  if (!coverLetters?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Cover Letters Yet</CardTitle>
          <CardDescription>
            Create your first cover letter to get started
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    // Main container for list
    <div className="space-y-4">

      {/* Loop through each cover letter */}
      {coverLetters.map((letter) => (

        // Card for each cover letter
        <Card key={letter.id} className="group relative ">

          <CardHeader>
            <div className="flex items-start justify-between">

              {/* Left side: Title and Date */}
              <div>
                <CardTitle className="text-xl gradient-title">
                  {letter.jobTitle} at {letter.companyName}
                </CardTitle>
                <CardDescription>
                  Created {format(new Date(letter.createdAt), "PPP")}
                </CardDescription>
              </div>

              {/* Right side: Action buttons */}
              <div className="flex space-x-2">

                <AlertDialog>

                  {/* View Button */}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => router.push(`/ai-cover-letter/${letter.id}`)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>

                  {/* Delete Button (opens confirmation dialog) */}
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>

                  {/* Delete Confirmation Popup */}
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Delete Cover Letter?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your cover letter for {letter.jobTitle} at{" "}
                        {letter.companyName}.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      {/* Cancel Button */}
                      <AlertDialogCancel>Cancel</AlertDialogCancel>

                      {/* Confirm Delete Button */}
                      <AlertDialogAction
                        onClick={() => handleDelete(letter.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>

                  </AlertDialogContent>
                </AlertDialog>

              </div>
            </div>
          </CardHeader>

          {/* Card Content Section */}
          <CardContent>
            <div className="text-muted-foreground text-sm line-clamp-3">
              {/* Show short preview of job description */}
              {letter.jobDescription}
            </div>
          </CardContent>

        </Card>
      ))}
    </div>
  );
}