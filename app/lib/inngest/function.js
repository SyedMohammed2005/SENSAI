import { inngest } from "./client";

export const generateIndustryInsights = inngest.createFunction(
  { id: "generate-industry-insights" },
  { event: "test/generate.industry.insights" },

  async ({ event, step }) => {
    return await step.run("generate", async () => {
      return {
        message: "Inngest working ✅",
      };
    });
  }
);