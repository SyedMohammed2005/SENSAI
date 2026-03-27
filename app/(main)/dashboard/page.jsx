// Import function to check if user completed onboarding
import { getUserOnboardingStatus } from "@/actions/user";

// Import redirect function for navigation
import { redirect } from "next/navigation";

// Import function to fetch industry insights data
import { getIndustryInsights } from "@/actions/dashboard";

// Import dashboard UI component
import DashboardView from "./_components/dashboard-view";


// This is the Industry Insights page (Server Component)
const IndustryInsightsPage = async () => {

  // Check if user has completed onboarding
  const { isOnboarded } = await getUserOnboardingStatus();

  // If user is NOT onboarded, redirect to onboarding page
  if (!isOnboarded) {
    redirect("/onboarding");
  }

  // Fetch industry insights data from backend
  const insights = await getIndustryInsights();

  return (
    // Main container centered on page
    <div className="container mx-auto">

      {/* Pass insights data to Dashboard UI */}
      <DashboardView insights={insights} />

    </div>
  );
};

export default IndustryInsightsPage;