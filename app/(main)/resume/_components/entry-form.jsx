// app/resume/_components/entry-form.jsx
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { entrySchema } from "@/app/lib/schema";
import { Sparkles, PlusCircle, X, Loader2 } from "lucide-react";
import { improveWithAI } from "@/actions/resume";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";

/* ===================== PLACEHOLDERS ===================== */
/*
  Dynamic placeholders based on entry type.
  This avoids hardcoding labels inside JSX and keeps UI flexible.
*/
const PLACEHOLDERS = {
  Experience: {
    title: "Software Engineer",
    organization: "Company Name",
    description:
      "Describe your responsibilities, achievements, and impact",
  },
  Education: {
    title: "B.Tech in Computer Science",
    organization: "University / College Name",
    description:
      "CGPA, relevant coursework, academic achievements",
  },
  Project: {
    title: "AI Resume Builder",
    organization: "Personal / Academic Project",
    description:
      "Tech stack, features implemented, and your contribution",
  },
};
/* ======================================================= */

/*
  Converts yyyy-MM (input type="month" format)
  → MMM yyyy (display format)
  Example: 2024-01 → Jan 2024
*/
const formatDisplayDate = (dateString) => {
  if (!dateString) return "";
  const date = parse(dateString, "yyyy-MM", new Date());
  return format(date, "MMM yyyy");
};

export function EntryForm({ type, entries, onChange }) {

  /*
    Controls whether the "Add Entry" form is visible.
    Instead of navigating pages, we toggle UI state.
  */
  const [isAdding, setIsAdding] = useState(false);

  /*
    React Hook Form setup with Zod validation.
    - defaultValues define empty initial state
    - zodResolver ensures validation before submission
  */
  const {
    register,
    handleSubmit: handleValidation,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      title: "",
      organization: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    },
  });

  /*
    Select placeholder set based on entry type.
    Example: type="Experience" → Experience placeholders
  */
  const placeholders = PLACEHOLDERS[type] || {};

  /*
    Watch "current" checkbox value.
    Used to disable endDate field when checked.
  */
  const current = watch("current");

  /*
    handleAdd runs ONLY after validation passes.
    It formats dates for display before storing entry.
  */
  const handleAdd = handleValidation((data) => {

    const formattedEntry = {
      ...data,

      // Convert yyyy-MM → readable format
      startDate: formatDisplayDate(data.startDate),

      // If "current" is true, endDate should be empty
      endDate: data.current ? "" : formatDisplayDate(data.endDate),
    };

    // Add new entry to parent state
    onChange([...entries, formattedEntry]);

    // Reset form and close entry UI
    reset();
    setIsAdding(false);
  });

  /*
    Remove entry by index.
    Creates a new array excluding the selected index.
  */
  const handleDelete = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    onChange(newEntries);
  };

  /*
    useFetch wraps improveWithAI server action.
    Handles loading, error, and returned data automatically.
  */
  const {
    loading: isImproving,
    fn: improveWithAIFn,
    data: improvedContent,
    error: improveError,
  } = useFetch(improveWithAI);

  /*
    Side effect after AI improvement:
    - If success → update description field
    - If error → show toast
  */
  useEffect(() => {
    if (improvedContent && !isImproving) {
      setValue("description", improvedContent);
      toast.success("Description improved successfully!");
    }
    if (improveError) {
      toast.error(improveError.message || "Failed to improve description");
    }
  }, [improvedContent, improveError, isImproving, setValue]);

  /*
    Trigger AI improvement.
    Sends current description + entry type to backend.
  */
  const handleImproveDescription = async () => {
    const description = watch("description");

    // Prevent empty request
    if (!description) {
      toast.error("Please enter a description first");
      return;
    }

    await improveWithAIFn({
      current: description,
      type: type.toLowerCase(),
    });
  };

  return (
    <div className="space-y-4">

      {/* Existing Entries List */}
      <div className="space-y-4">
        {entries.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex justify-between">
              {/* Display title and organization */}
              <CardTitle className="text-sm font-medium">
                {item.title} @ {item.organization}
              </CardTitle>

              {/* Delete button */}
              <Button
                variant="outline"
                size="icon"
                type="button"
                onClick={() => handleDelete(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>

            <CardContent>
              {/* Date range display */}
              <p className="text-sm text-muted-foreground">
                {item.current
                  ? `${item.startDate} - Present`
                  : `${item.startDate} - ${item.endDate}`}
              </p>

              {/* Description display */}
              <p className="mt-2 text-sm whitespace-pre-wrap">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Entry Form */}
      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>Add {type}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">

            {/* Title + Organization */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder={placeholders.title}
                {...register("title")}
              />
              <Input
                placeholder={placeholders.organization}
                {...register("organization")}
              />
            </div>

            {/* Date Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <Input type="month" {...register("startDate")} />
              <Input
                type="month"
                {...register("endDate")}
                disabled={current} // Disable if current is checked
              />
            </div>

            {/* Current Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register("current")}
                onChange={(e) => {
                  setValue("current", e.target.checked);

                  // Clear endDate if marked current
                  if (e.target.checked) {
                    setValue("endDate", "");
                  }
                }}
              />
              <label>Current {type}</label>
            </div>

            {/* Description */}
            <Textarea
              placeholder={placeholders.description}
              className="h-32"
              {...register("description")}
            />

            {/* AI Improve Button */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleImproveDescription}
              disabled={isImproving || !watch("description")}
            >
              {isImproving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Improving...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Improve with AI
                </>
              )}
            </Button>
          </CardContent>

          <CardFooter className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                setIsAdding(false);
              }}
            >
              Cancel
            </Button>

            <Button type="button" onClick={handleAdd}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Entry
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Show Add Button when form closed */}
      {!isAdding && (
        <Button
          className="w-full"
          variant="outline"
          onClick={() => setIsAdding(true)}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add {type}
        </Button>
      )}
    </div>
  );
}