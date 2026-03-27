import { industries } from "@/data/industries";
import OnboardingForm from "./_components/onboarding-form";

// Server Component (async by default in App Router)
const OnboardingPage = async () => {

  // industries is imported from a static data file
  // Since this is a Server Component, the data is prepared on the server
  // and passed as props to the client component (OnboardingForm)

  return (
    <main>
      {/* 
        Pass industries data as props to the client-side form.
        The form will use this to dynamically render:
        - Industry dropdown
        - Sub-industry dropdown
      */}
      <OnboardingForm industries={industries} />
    </main>
  );
};

export default OnboardingPage;