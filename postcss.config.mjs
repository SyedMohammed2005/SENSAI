// ==========================================================
// 🎨 TAILWIND + POSTCSS CONFIGURATION
// ==========================================================
// This file configures PostCSS to use Tailwind CSS
// It tells the build system which plugins to apply
// ==========================================================


// ----------------------------------------------------------
// ⚙️ PostCSS Configuration Object
// ----------------------------------------------------------
const config = {

  // --------------------------------------------------------
  // 🔌 PostCSS Plugins
  // --------------------------------------------------------
  // plugins → List of PostCSS plugins used during CSS build
  plugins: {

    // ------------------------------------------------------
    // 🌬️ Tailwind CSS Plugin
    // ------------------------------------------------------
    // "@tailwindcss/postcss" enables Tailwind processing
    // It:
    // 1️⃣ Scans your project for class names
    // 2️⃣ Generates only the CSS you actually use
    // 3️⃣ Optimizes output for production
    "@tailwindcss/postcss": {},
  },
};


// ----------------------------------------------------------
// 📤 Export Configuration
// ----------------------------------------------------------
// Exporting this config allows Next.js build system
// (Webpack / Turbopack) to use it automatically
export default config;