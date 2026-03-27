// ==========================================================
// 🧹 ESLINT CONFIGURATION (Flat Config - Modern Format)
// ==========================================================
// This file defines linting rules for your Next.js + TypeScript project.
// It uses ESLint's new "flat config" format.
// ==========================================================


// ----------------------------------------------------------
// 🧩 Import ESLint Helpers
// ----------------------------------------------------------

// defineConfig → Wraps configuration with proper typing
// globalIgnores → Allows defining global ignore patterns
import { defineConfig, globalIgnores } from "eslint/config";


// ----------------------------------------------------------
// 📦 Import Next.js Recommended Rule Sets
// ----------------------------------------------------------

// Core Web Vitals rules:
// - Performance best practices
// - Accessibility suggestions
// - Next.js specific optimizations
import nextVitals from "eslint-config-next/core-web-vitals";


// TypeScript rules for Next.js:
// - Enforces correct TS usage
// - Prevents common typing mistakes
import nextTs from "eslint-config-next/typescript";


// ----------------------------------------------------------
// ⚙️ Define ESLint Configuration
// ----------------------------------------------------------

// defineConfig expects an array of configuration objects
// You are merging multiple rule sets using spread operator
const eslintConfig = defineConfig([

  // --------------------------------------------------------
  // 🚀 Next.js Core Web Vitals Rules
  // --------------------------------------------------------
  // Includes rules like:
  // - Avoid blocking rendering
  // - Proper <Image /> usage
  // - Performance best practices
  ...nextVitals,


  // --------------------------------------------------------
  // 🧠 Next.js + TypeScript Rules
  // --------------------------------------------------------
  // Adds strict TS linting support
  ...nextTs,


  // --------------------------------------------------------
  // 🚫 Global Ignore Overrides
  // --------------------------------------------------------
  // Overrides default ignored files/folders
  // Prevents ESLint from scanning build artifacts
  globalIgnores([

    // Default ignores of eslint-config-next:

    ".next/**",        // Next.js build output
    "out/**",          // Static export output
    "build/**",        // Custom build folder (if exists)
    "next-env.d.ts",   // Auto-generated Next.js type file
  ]),
]);


// ----------------------------------------------------------
// 📤 Export Configuration
// ----------------------------------------------------------
// ESLint automatically detects this file and applies rules
export default eslintConfig;