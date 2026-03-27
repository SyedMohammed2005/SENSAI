// Import authentication helper from Clerk (server-side)
import { auth } from "@clerk/nextjs/server";

// Import Next.js redirect function (server navigation)
import { redirect } from "next/navigation";

// Import custom function to check if user completed onboarding
import { getUserOnboardingStatus } from "@/actions/user";

/*
  This is a Server Component page.
  It runs on the server before rendering.

  Purpose:
  After login, decide where the user should go:
  - Not logged in → /sign-in
  - Logged in but not onboarded → /onboarding
  - Logged in and onboarded → /dashboard
*/
const PostLoginPage = async () => {

  /*
    Get the currently authenticated user's ID
    from Clerk session.

    Since this runs on the server,
    auth() safely checks session cookies.
  */
  const { userId } = await auth();

  /*
    If no userId exists:
    - User is NOT logged in
    - Immediately redirect to sign-in page
    - Execution stops here
  */
  if (!userId) {
    redirect("/sign-in");
  }

  /*
    If user is logged in,
    check whether they have completed onboarding.

    This likely checks:
    - Database record
    - isOnboarded boolean field
  */
  const { isOnboarded } = await getUserOnboardingStatus();

  /*
    If onboarding is complete:
    - Redirect to dashboard
    - Prevent access to onboarding again
  */
  if (isOnboarded) {
    redirect("/dashboard");
  } else {
    /*
      If onboarding NOT completed:
      - Force user to complete onboarding
      - Redirect to onboarding page
    */
    redirect("/onboarding");
  }
};

// Export as default so Next.js treats this as a page
export default PostLoginPage;