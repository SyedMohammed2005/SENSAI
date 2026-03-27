"use server"; 
// This file runs on backend (server side)

import { db } from "@/lib/prisma"; 
// Import Prisma database connection

import { auth } from "@clerk/nextjs/server"; 
// Import Clerk authentication to check logged-in user

import { redirect } from "next/navigation"; 
// Used to redirect user to another page (like sign-in)

import { generateAIInsights } from "./dashboard"; 
// Import AI function that generates industry insights



// ================= UPDATE USER =================
// This function updates user profile details after onboarding
export async function updateUser(data) {

  // Get logged-in user ID
  const { userId } = await auth();

  // If user is not logged in, redirect to sign-in page
  if (!userId) {
    redirect("/sign-in");
  }


  // Find user in database using Clerk user ID
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  // If user not found in database, stop execution
  if (!user) throw new Error("User not found");


  try {

    // ✅ 1) Check if industry insights already exist
    // We check first to avoid generating AI data again
    let industryInsight = await db.industryInsight.findUnique({
      where: { industry: data.industry },
    });


    // ✅ 2) If industry insights do NOT exist, generate using AI
    // AI is called outside transaction to avoid database locking
    if (!industryInsight) {

      // Call AI function to generate insights
      const insights = await generateAIInsights(data.industry);

      // Save generated insights into database
      industryInsight = await db.industryInsight.create({
        data: {
          industry: data.industry,

          // Spread operator adds all AI generated fields
          ...insights,

          // Set next update date (after 7 days)
          nextUpdate: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
          ),
        },
      });
    }


    // ✅ 3) Update user profile details
    // This updates industry, experience, bio and skills
    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: {
        industry: data.industry,
        experience: Number(data.experience), 
        // Convert experience to number to avoid type issues

        bio: data.bio,
        skills: data.skills,
      },
    });


    // Return updated user and industry insights
    return { success: true, updatedUser, industryInsight };

  } catch (error) {
    // Log actual error in console
    console.error("REAL ERROR:", error);

    throw new Error("Failed to update profile");
  }
}



// ================= ONBOARDING STATUS =================
// This function checks whether user completed onboarding or not
export async function getUserOnboardingStatus() {

  // Get logged-in user
  const { userId } = await auth();

  // If no user logged in, onboarding is false
  if (!userId) {
    return { isOnboarded: false };
  }


  // Fetch only industry field to check onboarding status
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: { industry: true },
  });


  // If industry exists → user completed onboarding
  // If industry is empty → onboarding not completed
  return {
    isOnboarded: !!user?.industry,
  };
}
