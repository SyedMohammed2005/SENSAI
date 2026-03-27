"use client"; 
// This makes the component run on the client side (browser)

import { useState } from "react"; 
// React hook to manage state (not used currently but imported)

import { useForm } from "react-hook-form"; 
// Library to manage form state and validation

import { zodResolver } from "@hookform/resolvers/zod"; 
// Connects Zod schema validation with react-hook-form

import { toast } from "sonner"; 
// Used to show success or error notifications

import { Loader2 } from "lucide-react"; 
// Loading spinner icon

import { Button } from "@/components/ui/button"; 
// Custom Button component

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; 
// Custom Card components for UI layout

import { Input } from "@/components/ui/input"; 
// Custom input field component

import { Label } from "@/components/ui/label"; 
// Label component for form fields

import { Textarea } from "@/components/ui/textarea"; 
// Textarea component for large text input

import { generateCoverLetter } from "@/actions/cover-letter"; 
// Server action function that generates the cover letter

import useFetch from "@/hooks/use-fetch"; 
// Custom hook to handle API calls and loading state

import { coverLetterSchema } from "@/app/lib/schema"; 
// Zod validation schema for form fields

import { useEffect } from "react"; 
// React hook to run side effects

import { useRouter } from "next/navigation"; 
// Next.js router for navigation


export default function CoverLetterGenerator() {

  // Router used to navigate after letter is generated
  const router = useRouter();

  // Setup form with validation using Zod schema
  const {
    register, // Connect input fields to form
    handleSubmit, // Handles form submission
    formState: { errors }, // Contains validation errors
    reset, // Reset form fields
  } = useForm({
    resolver: zodResolver(coverLetterSchema), // Attach validation schema
  });

  // Custom hook to call generateCoverLetter function
  const {
    loading: generating, // Boolean for loading state
    fn: generateLetterFn, // Function to trigger API call
    data: generatedLetter, // Response data from API
  } = useFetch(generateCoverLetter);

  // This runs when generatedLetter changes
  useEffect(() => {
    if (generatedLetter) {
      // Show success message
      toast.success("Cover letter generated successfully!");

      // Navigate to the generated letter page using its ID
      router.push(`/ai-cover-letter/${generatedLetter.id}`);

      // Reset form fields
      reset();
    }
  }, [generatedLetter]);

  // Function called when form is submitted
  const onSubmit = async (data) => {
    try {
      // Call API to generate cover letter
      await generateLetterFn(data);
    } catch (error) {
      // Show error message if something fails
      toast.error(error.message || "Failed to generate cover letter");
    }
  };

  return (
    // Main container with spacing
    <div className="space-y-6">

      {/* Card layout for form */}
      <Card>

        {/* Card Header Section */}
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
          <CardDescription>
            Provide information about the position you're applying for
          </CardDescription>
        </CardHeader>

        {/* Card Content Section */}
        <CardContent>

          {/* Form starts here */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Company Name and Job Title in two columns */}
            <div className="grid grid-cols-2 gap-4">

              {/* Company Name Field */}
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Enter company name"
                  {...register("companyName")}
                />
                {/* Show error if validation fails */}
                {errors.companyName && (
                  <p className="text-sm text-red-500">
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              {/* Job Title Field */}
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  placeholder="Enter job title"
                  {...register("jobTitle")}
                />
                {/* Show error if validation fails */}
                {errors.jobTitle && (
                  <p className="text-sm text-red-500">
                    {errors.jobTitle.message}
                  </p>
                )}
              </div>
            </div>

            {/* Job Description Field */}
            <div className="space-y-2">
              <Label htmlFor="jobDescription">Job Description</Label>
              <Textarea
                id="jobDescription"
                placeholder="Paste the job description here"
                className="h-32"
                {...register("jobDescription")}
              />
              {/* Show error if validation fails */}
              {errors.jobDescription && (
                <p className="text-sm text-red-500">
                  {errors.jobDescription.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit" disabled={generating}>
                {generating ? (
                  <>
                    {/* Show loading spinner while generating */}
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Cover Letter"
                )}
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}