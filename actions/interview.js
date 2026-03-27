"use server"; 
// This tells Next.js that this file runs on the backend (server side)

import { db } from "@/lib/prisma"; 
// Import database connection using Prisma ORM

import { auth } from "@clerk/nextjs/server"; 
// Import Clerk authentication to check logged-in user

import { GoogleGenerativeAI } from "@google/generative-ai"; 
// Import Google Gemini AI to generate quiz questions and tips



// Create Gemini AI instance using secret API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Select which Gemini model to use
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });



// ==============================
// FUNCTION 1: Generate Quiz
// ==============================
// This function generates 10 technical interview questions using AI
export async function generateQuiz() {

  // Get currently logged-in user ID
  const { userId } = await auth();

  // If user is not logged in, stop execution
  if (!userId) throw new Error("Unauthorized");


  // Fetch user's industry and skills from database
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: {
      industry: true,
      skills: true,
    },
  });

  // If user not found in database, stop execution
  if (!user) throw new Error("User not found");


  // Create AI prompt dynamically using user's industry and skills
  const prompt = `
    Generate 10 technical interview questions for a ${
      user.industry
    } professional${
    user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""
  }.
    
    Each question should be multiple choice with 4 options.
    
    Return the response in this JSON format only, no additional text:
    {
      "questions": [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "correctAnswer": "string",
          "explanation": "string"
        }
      ]
    }
  `;


  try {
    // Send prompt to Gemini AI
    const result = await model.generateContent(prompt);

    // Get AI response
    const response = result.response;
    const text = response.text();

    // Remove unwanted markdown formatting if AI adds ```json
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    // Convert string response into JSON object
    const quiz = JSON.parse(cleanedText);

    // Return only questions array to frontend
    return quiz.questions;

  } catch (error) {
    // Log error if quiz generation fails
    console.error("Error generating quiz:", error);

    // Throw custom error
    throw new Error("Failed to generate quiz questions");
  }
}



// ==============================
// FUNCTION 2: Save Quiz Result
// ==============================
// This function saves quiz score and generates improvement tip if needed
export async function saveQuizResult(questions, answers, score) {

  // Check logged-in user
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");


  // Find user in database
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");


  // Compare correct answers with user answers
  const questionResults = questions.map((q, index) => ({
    question: q.question,
    answer: q.correctAnswer, // correct answer
    userAnswer: answers[index], // user selected answer
    isCorrect: q.correctAnswer === answers[index], // true if correct
    explanation: q.explanation,
  }));


  // Get only wrong answers
  const wrongAnswers = questionResults.filter((q) => !q.isCorrect);


  // Only generate improvement tips if user has wrong answers
  let improvementTip = null;

  if (wrongAnswers.length > 0) {

    // Prepare text showing which questions were wrong
    const wrongQuestionsText = wrongAnswers
      .map(
        (q) =>
          `Question: "${q.question}"\nCorrect Answer: "${q.answer}"\nUser Answer: "${q.userAnswer}"`
      )
      .join("\n\n");


    // Create AI prompt to generate improvement suggestion
    const improvementPrompt = `
      The user got the following ${user.industry} technical interview questions wrong:

      ${wrongQuestionsText}

      Based on these mistakes, provide a concise, specific improvement tip.
      Focus on the knowledge gaps revealed by these wrong answers.
      Keep the response under 2 sentences and make it encouraging.
      Don't explicitly mention the mistakes, instead focus on what to learn/practice.
    `;

    try {
      // Send improvement prompt to AI
      const tipResult = await model.generateContent(improvementPrompt);

      // Store AI improvement suggestion
      improvementTip = tipResult.response.text().trim();

      console.log(improvementTip);

    } catch (error) {
      // If tip generation fails, continue without stopping program
      console.error("Error generating improvement tip:", error);
    }
  }


  try {
    // Save quiz result into database
    const assessment = await db.assessment.create({
      data: {
        userId: user.id, // link result to user
        quizScore: score, // store total score
        questions: questionResults, // store detailed question data
        category: "Technical", // type of assessment
        improvementTip, // AI-generated suggestion
      },
    });

    // Return saved assessment to frontend
    return assessment;

  } catch (error) {
    // Log error if saving fails
    console.error("Error saving quiz result:", error);

    throw new Error("Failed to save quiz result");
  }
}



// ==============================
// FUNCTION 3: Get Assessments
// ==============================
// This function fetches all previous quiz attempts of the user
export async function getAssessments() {

  // Check login
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");


  // Find user in database
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");


  try {
    // Fetch all quiz records of this user
    const assessments = await db.assessment.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "asc", // oldest first
      },
    });

    // Return all assessments
    return assessments;

  } catch (error) {
    console.error("Error fetching assessments:", error);

    throw new Error("Failed to fetch assessments");
  }
}
