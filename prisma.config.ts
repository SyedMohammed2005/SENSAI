// ==========================================================
// 🗄️ PRISMA CONFIGURATION FILE
// ==========================================================
// This file configures Prisma CLI behavior
// It tells Prisma:
// - Where your schema is
// - Where migrations are stored
// - How to connect to your database
// ==========================================================


// ----------------------------------------------------------
// 🌍 Load Environment Variables
// ----------------------------------------------------------
// Automatically loads variables from .env file
// Makes DATABASE_URL available in process.env
import 'dotenv/config'


// ----------------------------------------------------------
// 🛠️ Import Prisma Configuration Helpers
// ----------------------------------------------------------
// defineConfig → Used to define Prisma config in a typed way
// env() → Safely reads environment variables
import { defineConfig, env } from 'prisma/config'


// ----------------------------------------------------------
// 📦 Export Prisma Configuration
// ----------------------------------------------------------
// This configuration is used when running Prisma CLI commands
// Example:
// - npx prisma generate
// - npx prisma migrate dev
// - npx prisma db push
export default defineConfig({

  // --------------------------------------------------------
  // 📄 Schema Location
  // --------------------------------------------------------
  // Points to your Prisma schema file
  // This file defines:
  // - Models
  // - Enums
  // - Relations
  // - Database structure
  schema: 'prisma/schema.prisma',

  // --------------------------------------------------------
  // 🧱 Migrations Folder
  // --------------------------------------------------------
  // Location where Prisma stores migration files
  // Each migration represents a database structure change
  migrations: {
    path: 'prisma/migrations',
  },

  // --------------------------------------------------------
  // 🔌 Database Connection
  // --------------------------------------------------------
  // Prisma reads DATABASE_URL from environment variables
  // DATABASE_URL usually looks like:
  // postgresql://user:password@localhost:5432/dbname
  datasource: {

    // env('DATABASE_URL') ensures:
    // - It must exist
    // - Prisma throws error if missing
    url: env('DATABASE_URL'),
  },
})