/*
  PrivacyPage Component

  Purpose:
  Static page that displays the platform's privacy policy.

  This is a simple functional component (no state, no props).
  It renders structured privacy information using Tailwind CSS styling.
*/

export default function PrivacyPage() {
  return (

    /*
      Outer container:
      - min-h-screen → full viewport height
      - bg-black → dark background
      - text-gray-300 → default text color
      - px-6 py-16 → horizontal & vertical spacing
    */
    <div className="min-h-screen bg-black text-gray-300 px-6 py-16">

      {/*
        Inner wrapper:
        - max-w-4xl → limits content width for readability
        - mx-auto → centers horizontally
        - space-y-8 → vertical spacing between sections
      */}
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-white">
          Privacy Policy
        </h1>

        {/*
          Intro paragraph explaining the purpose of the privacy policy
        */}
        <p>
          At SENSAI, your privacy is important to us. This Privacy Policy
          explains how we collect, use, and protect your information when you
          use our AI-powered career platform.
        </p>

        {/*
          Section 1: Information Collection
          Wrapped in <section> for semantic HTML structure.
        */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            Information We Collect
          </h2>
          <p>
            We may collect your name, email address, resume content, and usage
            data to improve your experience and provide AI-powered insights.
          </p>
        </section>

        {/*
          Section 2: Data Usage
          Explains how collected information is utilized.
        */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            How We Use Your Data
          </h2>
          <p>
            Your data is used to generate resume feedback, interview
            preparation insights, and personalized recommendations. We do not
            sell your data to third parties.
          </p>
        </section>

        {/*
          Section 3: Security Practices
          Mentions protection measures.
        */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            Data Security
          </h2>
          <p>
            We implement security measures to protect your information from
            unauthorized access or misuse.
          </p>
        </section>

        {/*
          Footer note:
          Dynamically displays current year.
          This avoids manually updating the year.
        */}
        <p className="text-sm text-gray-500">
          Last updated: {new Date().getFullYear()}
        </p>

      </div>
    </div>
  );
}