"use server"; 
// This tells Next.js that this file runs on the SERVER (Backend)
// This is NOT frontend code.
// It can safely access database and secret API keys.


// ================= IMPORTS =================

// Import database connection (Prisma)
// This is used to talk to the database (create, read, delete data)
import { db } from "@/lib/prisma";

// Import authentication from Clerk
// Used to check if user is logged in
import { auth } from "@clerk/nextjs/server";

// Import Google Gemini AI
// Used to generate the cover letter using AI
import { GoogleGenerativeAI } from "@google/generative-ai";


// ================= AI SETUP =================

// Create Gemini AI instance using secret API key
// API key is stored in environment variable (secure)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Select the Gemini model we want to use
// "gemini-2.5-flash" is the AI model
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });


// =======================================================
// FUNCTION 1: GENERATE COVER LETTER
// This function:
// 1. Checks if user is logged in
// 2. Gets user data from database
// 3. Sends prompt to AI
// 4. Saves generated cover letter in database
// =======================================================

export async function generateCoverLetter(data) {

  // ================= AUTH SECTION =================
  // Check if user is logged in
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized"); 
  // If not logged in, stop execution

  // ================= DATABASE: GET USER =================
  // Find user in database using Clerk ID
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");


  // ================= CREATE AI PROMPT =================
  // This is the message sent to Gemini AI
  // It includes:
  // - Job title
  // - Company name
  // - User industry
  // - Experience
  // - Skills
  // - Bio
  // - Job description
  const prompt = `
    Write a professional cover letter for a ${data.jobTitle} position at ${
    data.companyName
  }.
    
    About the candidate:
    - Industry: ${user.industry}
    - Years of Experience: ${user.experience}
    - Skills: ${user.skills?.join(", ")}
    - Professional Background: ${user.bio}
    
    Job Description:
    ${data.jobDescription}
    
    Requirements:
    1. Use a professional, enthusiastic tone
    2. Highlight relevant skills and experience
    3. Show understanding of the company's needs
    4. Keep it concise (max 400 words)
    5. Use proper business letter formatting in markdown
    6. Include specific examples of achievements
    7. Relate candidate's background to job requirements
    
    Format the letter in markdown.
  `;


  try {

    // ================= AI GENERATION =================
    // Send prompt to Gemini AI
    const result = await model.generateContent(prompt);

    // Get text response from AI
    const content = result.response.text().trim();


    // ================= DATABASE: SAVE COVER LETTER =================
    // Save generated cover letter into database
    const coverLetter = await db.coverLetter.create({
      data: {
        content, // AI generated letter
        jobDescription: data.jobDescription,
        companyName: data.companyName,
        jobTitle: data.jobTitle,
        status: "completed",
        userId: user.id, // Connect to current user
      },
    });

    // Return saved cover letter
    return coverLetter;

  } catch (error) {

    // If AI fails or DB fails, log error
    console.error("Error generating cover letter:", error.message);

    // Throw simple error message
    throw new Error("Failed to generate cover letter");
  }
}



// =======================================================
// FUNCTION 2: GET ALL COVER LETTERS
// This function:
// - Checks login
// - Finds user
// - Returns all cover letters of that user
// =======================================================

export async function getCoverLetters() {

  // AUTH CHECK
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // FIND USER IN DATABASE
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  // DATABASE: GET ALL COVER LETTERS OF USER
  return await db.coverLetter.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc", // Newest first
    },
  });
}

// =======================================================
// FUNCTION 3: GET SINGLE COVER LETTER
// This function:
// - Checks login
// - Finds user
// - Returns one specific cover letter by ID
// =======================================================

export async function getCoverLetter(id) {

  // AUTH CHECK
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // FIND USER
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  // DATABASE: FIND ONE COVER LETTER
  return await db.coverLetter.findUnique({
    where: {
      id,
      userId: user.id, // Make sure letter belongs to this user
    },
  });
}

// =======================================================
// FUNCTION 4: DELETE COVER LETTER
// This function:
// - Checks login
// - Finds user
// - Deletes selected cover letter
// =======================================================

export async function deleteCoverLetter(id) {

  // AUTH CHECK
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // FIND USER
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  // DATABASE: DELETE COVER LETTER
  return await db.coverLetter.delete({
    where: {
      id,
      userId: user.id, // Ensure user owns this letter
    },
  });
}
