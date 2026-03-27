/*
  Import Zod library
  Used for schema validation and data transformation
*/
import { z } from "zod";

/* =====================================================
   ONBOARDING SCHEMA
   Validates user onboarding form
===================================================== */
export const onboardingSchema = z.object({

  /*
    Industry selection is required
  */
  industry: z.string({
    required_error: "Please select an industry",
  }),

  /*
    Sub-industry / specialization is required
  */
  subIndustry: z.string({
    required_error: "Please select a specialization",
  }),

  /*
    Bio is optional
    Maximum 500 characters allowed
  */
  bio: z.string().max(500).optional(),

  /*
    Experience comes as STRING from form input.
    Example: "3"

    1️⃣ transform → convert string to number
    2️⃣ pipe → validate the transformed number
  */
  experience: z
    .string()
    .transform((val) => parseInt(val, 10)) // convert string → number
    .pipe(
      z
        .number()
        .min(0, "Experience must be at least 0 years")  // minimum 0
        .max(50, "Experience cannot exceed 50 years")  // maximum 50
    ),

  /*
    Skills come as comma-separated string:
    "React, Next.js, Node"

    transform:
    - Split by comma
    - Trim whitespace
    - Remove empty values
    - Return array of skills
  */
  skills: z.string().transform((val) =>
    val
      ? val
          .split(",")           // split by comma
          .map((skill) => skill.trim()) // remove spaces
          .filter(Boolean)      // remove empty values
      : undefined
  ),
});

/* =====================================================
   CONTACT SCHEMA
   Validates resume contact information
===================================================== */
export const contactSchema = z.object({

  /*
    Email must be valid format
  */
  email: z.string().email("Invalid email address"),

  /*
    Mobile, LinkedIn, Twitter are optional
    No strict validation here
  */
  mobile: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
});

/* =====================================================
   ENTRY SCHEMA
   Used for:
   - Experience
   - Education
   - Projects
===================================================== */
export const entrySchema = z
  .object({

    /*
      Title is required (e.g., Software Engineer)
    */
    title: z.string().min(1, "Title is required"),

    /*
      Organization required (e.g., Google)
    */
    organization: z.string().min(1, "Organization is required"),

    /*
      Start date required
    */
    startDate: z.string().min(1, "Start date is required"),

    /*
      End date optional (if current job)
    */
    endDate: z.string().optional(),

    /*
      Description required
    */
    description: z.string().min(1, "Description is required"),

    /*
      Boolean indicating if this is current position
      Default is false
    */
    current: z.boolean().default(false),
  })

  /*
    Custom validation using refine()

    Rule:
    If NOT current position AND no endDate → invalid

    Prevents incomplete date range.
  */
  .refine(
    (data) => {
      if (!data.current && !data.endDate) {
        return false;
      }
      return true;
    },
    {
      message: "End date is required unless this is your current position",
      path: ["endDate"], // attach error to endDate field
    }
  );

/* =====================================================
   RESUME SCHEMA
   Validates entire resume form
===================================================== */
export const resumeSchema = z.object({

  /*
    Nested contact schema
  */
  contactInfo: contactSchema,

  /*
    Professional summary required
  */
  summary: z.string().min(1, "Professional summary is required"),

  /*
    Skills required (string form here, not array)
  */
  skills: z.string().min(1, "Skills are required"),

  /*
    Experience is array of entrySchema
  */
  experience: z.array(entrySchema),

  /*
    Education is array of entrySchema
  */
  education: z.array(entrySchema),

  /*
    Projects is array of entrySchema
  */
  projects: z.array(entrySchema),
});

/* =====================================================
   COVER LETTER SCHEMA
   Validates cover letter generation form
===================================================== */
export const coverLetterSchema = z.object({

  /*
    Company name required
  */
  companyName: z.string().min(1, "Company name is required"),

  /*
    Job title required
  */
  jobTitle: z.string().min(1, "Job title is required"),

  /*
    Job description required
  */
  jobDescription: z.string().min(1, "Job description is required"),
});