/*
  ContactPage Component

  This is a simple static page component.
  It does not:
  - Fetch data
  - Use state
  - Use client-side logic

  So it runs as a Server Component by default.
*/

export default function ContactPage() {
  return (

    /*
      Full page wrapper

      min-h-screen → Makes section at least full viewport height
      bg-black → Black background
      text-gray-300 → Default light gray text
      px-6 py-16 → Horizontal & vertical padding
    */
    <div className="min-h-screen bg-black text-gray-300 px-6 py-16">

      {/*
        Centered content container

        max-w-2xl → Limits width for readability
        mx-auto → Centers horizontally
        space-y-8 → Vertical spacing between elements
        text-center → Center aligns text
      */}
      <div className="max-w-2xl mx-auto space-y-8 text-center">

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-white">
          Contact Us
        </h1>

        {/*
          Intro paragraph explaining purpose of page
        */}
        <p>
          Have questions, feedback, or partnership inquiries?
          We’d love to hear from you.
        </p>

        {/*
          Contact details section
          space-y-4 → spacing between email & response time
        */}
        <div className="space-y-4">
          <p>Email: support@sensai.ai</p>
          <p>Response time: Within 24-48 hours</p>
        </div>

        {/*
          Footer text

          new Date().getFullYear() dynamically shows
          current year automatically.
          This prevents manual updating every year.
        */}
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} SENSAI. All rights reserved.
        </p>

      </div>
    </div>
  );
}