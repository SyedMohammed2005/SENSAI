import { Suspense } from "react";
import { HashLoader } from "react-spinners";

export default function Layout({ children }) {
  return (
    // Wrapper div adding horizontal padding to the layout
    <div className="px-5">

      {/* 
        Suspense is used to handle lazy-loaded components.
        While the child components are loading, the fallback UI (HashLoader)
        will be displayed.
      */}
      <Suspense
        fallback={
          // Loading spinner shown while content is being fetched/lazy loaded
         <div className="flex justify-center items-center min-h-screen">
  <HashLoader size={80} color="#6366f1" />
</div>
        }
      >
        {/* Render child components once loading is complete */}
        {children}
      </Suspense>
    </div>
  );
}