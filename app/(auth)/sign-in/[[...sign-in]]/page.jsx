// Import SignIn component from Clerk authentication library
// This component shows the sign-in form to the user
import { SignIn } from "@clerk/nextjs";


// This is the Sign In page component
// It renders the Clerk SignIn UI
const page = () => {

  // Return the SignIn component
  // This will display the login form on this page
  return <SignIn/>;

};


// Export this page so Next.js can use it as a route
export default page;