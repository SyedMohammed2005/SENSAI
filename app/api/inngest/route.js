/*
  Import serve helper from inngest/next

  This creates API route handlers (GET, POST, PUT)
  for handling Inngest events and webhooks.
*/
import { serve } from "inngest/next";

/*
  Import configured Inngest client.

  This client connects your Next.js app
  to the Inngest event system.
*/
import { inngest } from "@/lib/inngest/client";

/*
  Import background function(s) that will run
  when specific events are triggered.

  ⚠ Currently commented out.
  If not imported, it will cause error below
  because generateIndustryInsights is used.
*/
 import { generateIndustryInsights } from "@/lib/inngest/function";

/*
  This exports API route handlers for:
  - GET
  - POST
  - PUT

  These handlers allow:
  - Inngest to send webhooks
  - Your app to trigger background jobs
*/
export const { GET, POST, PUT } = serve({

  /*
    Inngest client instance.
    Required to connect to your Inngest app.
  */
  client: inngest,

  /*
    List of background functions to register.

    generateIndustryInsights:
    - Runs asynchronously
    - Triggered by specific event
    - Used for AI processing / background jobs

    ⚠ If this function is not imported,
    this file will throw:
    "generateIndustryInsights is not defined"
  */
 // functions: [generateIndustryInsights],
functions: [],
});