"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import {
  Card,
  CardTitle,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import useFetch from "@/hooks/use-fetch";
import { onboardingSchema } from "@/app/lib/schema";
import { updateUser } from "@/actions/user";

const OnboardingForm = ({ industries }) => {

  // Stores full industry object (not just id)
  // Needed to dynamically render sub-industries
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  // Router used for navigation after successful profile update
  const router = useRouter();

  // Custom hook wrapping the async updateUser server action
  // - updateLoading → tracks loading state
  // - updateUserFn → function to call updateUser
  // - updateResult → stores response data
  const {
    loading: updateLoading,
    fn: updateUserFn,
    data: updateResult,
  } = useFetch(updateUser);

  // Initialize React Hook Form with Zod schema validation
  // Zod automatically validates inputs before submit
  const {
    register,
    handleSubmit,
    formState: { errors }, // contains validation errors
    setValue,              // programmatically set form field values
    watch,                 // watch field changes
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  // Runs when form is submitted and validation passes
  const onSubmit = async (values) => {
    try {

      // Combine industry and subIndustry into a slug format
      // Example: "Technology-Frontend Developer"
      // → "technology-frontend-developer"
      const formattedIndustry = `${values.industry}-${values.subIndustry}`
        .toLowerCase()
        .replace(/\s+/g, "-");

      // Call server action to update user profile in DB
      await updateUserFn({
        ...values,
        industry: formattedIndustry, // overwrite industry with formatted value
      });

    } catch (error) {
      // Catch unexpected runtime errors
      console.error("Onboarding error:", error);
      toast.error("Something went wrong");
    }
  };

  // Effect runs whenever updateResult or updateLoading changes
  useEffect(() => {

    // Only proceed when:
    // 1. API call returned success
    // 2. Loading has finished
    if (updateResult?.success && !updateLoading) {

      toast.success("Profile saved!");

      // Navigate user to dashboard after onboarding
      router.push("/dashboard");

      // Refresh route data to ensure updated profile is reflected
      router.refresh();
    }

  }, [updateResult, updateLoading, router]);

  // Watch industry field so we can conditionally render subIndustry dropdown
  const watchIndustry = watch("industry");

  return (
    <div className="flex items-center justify-center bg-background">
      <Card className="w-full max-w-lg mt-10 mx-2">

        <CardHeader>
          <CardTitle className="gradient-title text-4xl">
            Complete Your Profile
          </CardTitle>
          <CardDescription>
            Select your industry to get personalized insights
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            
            {/* INDUSTRY SELECT */}
            <div className="space-y-2">
              <Label>Industry</Label>

              <Select
                onValueChange={(value) => {

                  // Update form state with selected industry id
                  setValue("industry", value);

                  // Find full industry object from industries array
                  // So we can access subIndustries later
                  setSelectedIndustry(
                    industries.find((ind) => ind.id === value)
                  );

                  // Reset subIndustry whenever industry changes
                  // Prevents invalid combination
                  setValue("subIndustry", "");
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>

                <SelectContent>
                  {/* Dynamically render industries */}
                  {industries.map((ind) => (
                    <SelectItem key={ind.id} value={ind.id}>
                      {ind.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Show validation error if industry not selected */}
              {errors.industry && (
                <p className="text-sm text-red-600">
                  {errors.industry.message}
                </p>
              )}
            </div>

            {/* SUB INDUSTRY SELECT (only render if industry selected) */}
            {watchIndustry && (
              <div className="space-y-2">
                <Label>Specialization</Label>

                <Select
                  onValueChange={(value) => {

                    // Set selected specialization in form state
                    setValue("subIndustry", value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>

                  <SelectContent>
                    {/* Render subIndustries of selectedIndustry */}
                    {selectedIndustry?.subIndustries.map((ind) => (
                      <SelectItem key={ind} value={ind}>
                        {ind}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Validation error for subIndustry */}
                {errors.subIndustry && (
                  <p className="text-sm text-red-600">
                    {errors.subIndustry.message}
                  </p>
                )}
              </div>
            )}

            {/* EXPERIENCE INPUT */}
            <div className="space-y-2">
              <Label>Years of Experience</Label>

              {/* register connects input to react-hook-form state */}
              <Input type="number" {...register("experience")} />

              {errors.experience && (
                <p className="text-sm text-red-600">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* SKILLS INPUT */}
            <div className="space-y-2">
              <Label>Skills</Label>

              {/* Simple text input registered in form */}
              <Input {...register("skills")} />

              {errors.skills && (
                <p className="text-sm text-red-600">
                  {errors.skills.message}
                </p>
              )}
            </div>

            {/* BIO TEXTAREA */}
            <div className="space-y-2">
              <Label>Bio</Label>

              {/* Larger textarea for user description */}
              <Textarea
                className="h-32"
                {...register("bio")}
              />

              {errors.bio && (
                <p className="text-sm text-red-600">
                  {errors.bio.message}
                </p>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <Button type="submit" className="w-full" disabled={updateLoading}>

              {/* Show loading spinner while async update is running */}
              {updateLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Profile"
              )}

            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;