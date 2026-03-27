import { Suspense } from "react";
import { HashLoader } from "react-spinners";

/*
  Layout Component

  This layout wraps all nested pages/components
  inside this route segment.

  It provides:
  1. Padding wrapper (px-5)
  2. Suspense fallback loader while async components load
*/

export default function Layout({ children }) {
  return (
    /*
      Adds horizontal padding to all pages
      rendered inside this layout
    */
    <div className="px-5">

      {/*
        Suspense is used to handle loading state
        for async Server Components inside this layout.

        If any child component is:
        - Fetching data (async/await)
        - Waiting for server response

        React will show the fallback loader
        until the content is ready.
      */}
      <Suspense
        fallback={
          /*
            HashLoader shows a horizontal loading bar
            while children are loading.

            width="100%" → full width loader
            color="gray" → loader color
            mt-4 → margin top spacing
          */
         <div className="flex justify-center items-center min-h-screen">
  <HashLoader size={80} color="#6366f1" />
</div>
        }
      >
        {/*
          children represents the page content
          that gets rendered inside this layout.
        */}
        {children}
      </Suspense>
    </div>
  );
}