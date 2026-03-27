// Import React (needed to create React components)
import React from 'react';


// AuthLayout component
// This layout wraps authentication pages like Sign In and Sign Up
// It receives "children" which means the page content inside this layout
const Authlayout = ({ children }) => {

  return (
    // This div centers the content horizontally
    // pt-40 adds top padding so the form is pushed down from the top
    <div className="flex justify-center pt-40">
      
      {/* This will render the page content (SignIn or SignUp form) */}
      {children}

    </div>
  );
};


// Export this layout so Next.js can use it
export default Authlayout;