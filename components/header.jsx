// components/header.jsx
import { checkUser } from "@/lib/checkUser";
import HeaderClient from "./header-client";

// This is a Server Component (no "use client" directive)
const Header = async () => {
  // ✅ Server-side: This can use Prisma and Node.js modules
  await checkUser();
  
  return <HeaderClient />;
};

export default Header;