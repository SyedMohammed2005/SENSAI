import { serve } from "inngest/next";
import { Inngest } from "inngest";
import { generateIndustryInsights } from "@/lib/inngest/functions";

// Local Inngest client
const inngest = new Inngest({
  id: "career-coach", // Unique app ID
  name: "Career Coach",
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY, // Must exist in Vercel env
    },
  },
});

// Register functions using the local client
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [generateIndustryInsights(inngest)],
});