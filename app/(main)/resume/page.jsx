/*
  Import server action to fetch resume data
  from the database.
*/
import { getResume } from "@/actions/resume";

/*
  Import ResumeBuilder component
  (Client Component that handles form + markdown + PDF)
*/
import ResumeBuilder from "./_components/resume-builder";

/*
  This is a Server Component (no "use client").

  Because:
  - It is async
  - It fetches data directly on the server
*/
export default async function ResumePage() {

  /*
    Fetch resume from database before rendering page.

    Since this runs on the server:
    - No loading flicker
    - No client-side fetch needed
    - Data is ready before sending HTML to browser
  */
  const resume = await getResume();

  return (
    /*
      Container layout:
      - mx-auto → center horizontally
      - py-6 → vertical padding
    */
    <div className="container mx-auto py-6">

      {/*
        Pass resume content to ResumeBuilder.

        resume?.content means:
        - If resume exists → pass its content
        - If resume is null → pass undefined

        ResumeBuilder uses this as initial markdown content.
      */}
      <ResumeBuilder initialContent={resume?.content} />
    </div>
  );
}