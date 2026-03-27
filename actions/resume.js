"use server"; 
// This tells Next.js that this file runs on the backend (server side)

import { db } from "@/lib/prisma"; 
// Import Prisma database connection

import { auth } from "@clerk/nextjs/server"; 
// Import Clerk authentication to check logged-in user

import { GoogleGenerativeAI } from "@google/generative-ai"; 
// Import Google Gemini AI to improve resume content

import { revalidatePath } from "next/cache"; 
// This is used to refresh the resume page after saving data



// Create Gemini AI instance using secret API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Select the Gemini AI model
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });



// ==================================
// FUNCTION 1: Save Resume
// ==================================
// This function saves or updates the user's resume in the database
export async function saveResume(content) {

  // Get logged-in user ID
  const { userId } = await auth();

  // If user is not logged in, stop execution
  if (!userId) throw new Error("Unauthorized");


  // Find user in database using Clerk user ID
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  // If user not found in database, stop execution
  if (!user) throw new Error("User not found");


  try {
    // Upsert means:
    // If resume exists → update it
    // If resume does not exist → create new one
    const resume = await db.resume.upsert({
      where: {
        userId: user.id,
      },
      update: {
        content, // Update existing resume content
      },
      create: {
        userId: user.id,
        content, // Create new resume with content
      },
    });

    // Refresh the /resume page to show updated content
    revalidatePath("/resume");

    // Return saved resume data
    return resume;

  } catch (error) {
    // Log error if saving fails
    console.error("Error saving resume:", error);

    throw new Error("Failed to save resume");
  }
}



// ==================================
// FUNCTION 2: Get Resume
// ==================================
// This function fetches the user's resume from the database
export async function getResume() {

  // Check if user is logged in
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");


  // Find user in database
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");


  // Return resume that belongs to this user
  return await db.resume.findUnique({
    where: {
      userId: user.id,
    },
  });
}



// ==================================
// FUNCTION 3: Improve Resume With AI
// ==================================
// This function sends resume content to AI to improve writing quality
export async function improveWithAI({ current, type }) {

  // Check logged-in user
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");


  // Get user and their industry insight from database
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      industryInsight: true,
    },
  });

  if (!user) throw new Error("User not found");


  // Create AI prompt to improve resume content
  const prompt = `
    As an expert resume writer, improve the following ${type} description for a ${user.industry} professional.
    Make it more impactful, quantifiable, and aligned with industry standards.
    Current content: "${current}"

    Requirements:
    1. Use action verbs
    2. Include metrics and results where possible
    3. Highlight relevant technical skills
    4. Keep it concise but detailed
    5. Focus on achievements over responsibilities
    6. Use industry-specific keywords
    
    Format the response as a single paragraph without any additional text or explanations.
  `;


  try {
    // Send prompt to Gemini AI
    const result = await model.generateContent(prompt);

    // Get improved content from AI
    const response = result.response;
    const improvedContent = response.text().trim();

    // Return improved resume text
    return improvedContent;

  } catch (error) {
    // Log error if AI improvement fails
    console.error("Error improving content:", error);

    throw new Error("Failed to improve content");
  }
}
