/*
  TermsPage Component

  Purpose:
  Displays the Terms of Service for the SENSAI platform.

  This is a static server component:
  - No state
  - No props
  - No client-side interactivity
  - Purely renders legal content

  Styled using Tailwind CSS.
*/

export default function TermsPage() {
  return (

    /*
      Outer Wrapper:
      - min-h-screen → ensures page fills entire viewport height
      - bg-black → dark background theme
      - text-gray-300 → default readable text color
      - px-6 py-16 → horizontal & vertical spacing
    */
    <div className="min-h-screen bg-black text-gray-300 px-6 py-16">

      {/*
        Content Container:
        - max-w-4xl → keeps text readable (prevents full-width stretch)
        - mx-auto → centers horizontally
        - space-y-8 → consistent vertical spacing between elements
      */}
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Main Heading */}
        <h1 className="text-3xl font-bold text-white">
          Terms of Service
        </h1>

        {/*
          Introductory paragraph explaining agreement condition.
        */}
        <p>
          By using SENSAI, you agree to the following terms and conditions.
        </p>

        {/*
          Section 1: Service Usage Explanation
          Using semantic <section> improves accessibility and structure.
        */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            Use of Service
          </h2>
          <p>
            SENSAI provides AI-generated career guidance. The insights are for
            informational purposes only and should not be considered
            professional or legal advice.
          </p>
        </section>

        {/*
          Section 2: User Responsibility
          Clarifies that user input accuracy is user's responsibility.
        */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            User Responsibility
          </h2>
          <p>
            You are responsible for the accuracy of the information you submit
            to the platform.
          </p>
        </section>

        {/*
          Section 3: Liability Disclaimer
          Limits legal exposure by clarifying AI suggestions are advisory only.
        */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            Limitation of Liability
          </h2>
          <p>
            SENSAI is not liable for decisions made based on AI-generated
            suggestions.
          </p>
        </section>

        {/*
          Footer Note:
          Automatically updates the year.
          Prevents manual edits every year.
        */}
        <p className="text-sm text-gray-500">
          Effective date: {new Date().getFullYear()}
        </p>

      </div>
    </div>
  );
}