"use server";
// This file runs on the SERVER (Backend)
// It can access database and secret API keys safely


// ================= IMPORTS =================

// Import database connection (Prisma)
// Used to read and write data in database
import { db } from "@/lib/prisma";

// Import Clerk authentication
// Used to check if user is logged in
import { auth } from "@clerk/nextjs/server";

// Import Google Gemini AI
// Used to generate industry insights using AI
import { GoogleGenerativeAI } from "@google/generative-ai";


// ================= AI SETUP =================

// Create AI instance using secret API key
// API key is stored securely in environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Select AI model
// "gemini-2.5-flash" is the AI model used
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });



// =======================================================
// FUNCTION 1: generateAIInsights
// This function:
// - Takes industry name as input
// - Sends prompt to AI
// - Gets structured JSON response
// - Returns parsed JSON object
// =======================================================

export const generateAIInsights = async (industry) => {

  // Create AI prompt
  // We strictly tell AI to return ONLY JSON format
  const prompt = `
          Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
          {
            "salaryRanges": [
              { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
            ],
            "growthRate": number,
            "demandLevel": "High" | "Medium" | "Low",
            "topSkills": ["skill1", "skill2"],
            "marketOutlook": "Positive" | "Neutral" | "Negative",
            "keyTrends": ["trend1", "trend2"],
            "recommendedSkills": ["skill1", "skill2"]
          }
          
          IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
          Include at least 5 common roles for salary ranges.
          Growth rate should be a percentage.
          Include at least 5 skills and trends.
        `;

  // Send prompt to AI model
  const result = await model.generateContent(prompt);

  // Get AI response
  const response = result.response;

  // Convert AI response to text
  const text = response.text();

  // Sometimes AI wraps JSON inside ```json ``` block
  // So we remove those backticks if they exist
  const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

  // Convert text into real JavaScript object
  // This allows us to use it in database
  return JSON.parse(cleanedText);
};



// =======================================================
// FUNCTION 2: getIndustryInsights
// This function:
// - Checks if user is logged in
// - Gets user's industry
// - Checks if insights already exist in database
// - If not → generate using AI and save
// - If yes → return existing insights
// =======================================================

export async function getIndustryInsights() {

  // ================= AUTH CHECK =================
  // Make sure user is logged in
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");


  // ================= GET USER FROM DATABASE =================
  // Find user and also include related industryInsight
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      industryInsight: true, // Also fetch related insights
    },
  });

  if (!user) throw new Error("User not found");


  // ================= CHECK IF INSIGHTS EXIST =================
  // If insights do not exist in database
  if (!user.industryInsight) {

    // Generate insights using AI
    const insights = await generateAIInsights(user.industry);

    // Save generated insights in database
    const industryInsight = await db.industryInsight.create({
      
      data: {
        industry: user.industry, // Save industry name
        ...insights, // Spread all AI generated fields
        // Set next update date (7 days later)
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    // Return newly created insights
    return industryInsight;
  }

  // If insights already exist → just return them
  return user.industryInsight;
}
