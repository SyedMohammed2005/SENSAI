// Import SignUp component from Clerk authentication library
// This component shows the registration form to new users
import { SignUp } from "@clerk/nextjs";


// This is the Sign Up page component
// It renders the Clerk SignUp UI
const page = () => {

  // Return the SignUp component
  // This will display the register form on this page
  return <SignUp/>;

};


// Export this page so Next.js can use it as a route
export default page;