// ==========================================================
// 🚀 NEXT.JS CONFIGURATION FILE (next.config.ts)
// ==========================================================
// This file customizes how Next.js behaves during
// development and production builds.
// ==========================================================


// ----------------------------------------------------------
// 🧩 Import Next.js Config Type
// ----------------------------------------------------------
// NextConfig → Type definition for better IntelliSense
// Ensures your config follows valid Next.js structure
import type { NextConfig } from "next";


// ----------------------------------------------------------
// ⚙️ Define Next.js Configuration Object
// ----------------------------------------------------------
const nextConfig: NextConfig = {

  // --------------------------------------------------------
  // 🖼️ Image Optimization Configuration
  // --------------------------------------------------------
  images :{

    // ------------------------------------------------------
    // 🌍 Remote Image Domains Whitelist
    // ------------------------------------------------------
    // remotePatterns allows Next.js <Image /> component
    // to load images from external domains securely.
    //
    // Without this, Next.js will block external images.
    remotePatterns:[

      {
        // Only allow HTTPS images
        protocol: "https",

        // Allow images from this domain
        // Example usage:
        // https://randomuser.me/api/portraits/men/1.jpg
        hostname: "randomuser.me",
      
      },
    ],
  },
};


// ----------------------------------------------------------
// 📤 Export Configuration
// ----------------------------------------------------------
// Next.js automatically reads and applies this config
// during build and dev server startup.
export default nextConfig;