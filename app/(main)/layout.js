import React from 'react';

/*
  Mainlayout Component

  This layout wraps pages that use it.
  It provides:
  - Centered container
  - Top and bottom spacing

  Comment note:
  "Redirect user after login to onboarding if user is new"
  → This logic is NOT implemented yet.
  → It would typically require:
      - Checking user auth status
      - Fetching onboarding status
      - Redirecting if not onboarded
*/


const Mainlayout = ({ children }) => {

  /*
    children represents the nested page
    that will be rendered inside this layout.
  */

  return (
    /*
      container → centers content
      mx-auto → horizontal auto margin (center alignment)
      mt-24 → margin-top spacing
      mb-20 → margin-bottom spacing

      This creates consistent vertical spacing
      across all pages using this layout.
    */
    <div className="container mx-auto mt-24 mb-20">
      {children}
    </div>
  );
};

export default Mainlayout;