import React, { Suspense } from "react";
import { HashLoader } from "react-spinners";

// Layout component for Industry Insights pages
const Layout = ({ children }) => {
  return (
    // Main wrapper with horizontal padding
    <div className="px-5">

      {/* Page Title Section */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold gradient-title">
          Industry Insights
        </h1>
      </div>

      {/* Suspense for loading fallback while data loads */}
      <Suspense
        fallback={
          <div className="flex justify-center mt-10">
            {/* Loading spinner */}
           <div className="flex justify-center items-center min-h-screen">
  <HashLoader size={80} color="#6366f1" />
</div>
          </div>
        }
      >
        {children}
      </Suspense>

    </div>
  );
};

export default Layout;