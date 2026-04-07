// ==========================================================
// 🚀 NEXT.JS CONFIGURATION FILE (next.config.ts)
// ==========================================================
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // For randomuser.me (user avatars)
      {
        protocol: "https",
        hostname: "randomuser.me",
        port: "",
        pathname: "/**",
      },
      // ✅ ADD THIS - For Unsplash images (your feature cards)
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      // Optional: For Unsplash premium images
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;