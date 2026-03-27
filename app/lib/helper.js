/*
  Helper function to convert entries (experience, education, projects)
  into formatted Markdown text.

  Parameters:
  - entries → array of objects (experience/education/projects)
  - type → section title (e.g., "Work Experience", "Education")
*/
export function entriesToMarkdown(entries, type) {

  /*
    If:
    - entries is undefined
    - OR entries is null
    - OR entries array is empty

    Then return empty string.
    This prevents rendering empty markdown sections.
  */
  if (!entries?.length) return "";

  /*
    Build markdown string:

    1. Add section heading (## Work Experience)
    2. Convert each entry into markdown
    3. Join all entries with spacing
  */
  return (
    // Section title
    `## ${type}\n\n` +

    /*
      Loop through each entry in the array
      and convert it into markdown format.
    */
    entries
      .map((entry) => {

        /*
          Determine date range:

          If entry.current is true →
          show "startDate - Present"

          Otherwise →
          show "startDate - endDate"
        */
        const dateRange = entry.current
          ? `${entry.startDate} - Present`
          : `${entry.startDate} - ${entry.endDate}`;

        /*
          Return formatted markdown for one entry:

          ### Title @ Organization
          Date Range
          
          Description
        */
        return `### ${entry.title} @ ${entry.organization}\n${dateRange}\n\n${entry.description}`;
      })

      /*
        Join all formatted entries with
        double line breaks for proper markdown spacing.
      */
      .join("\n\n")
  );
}