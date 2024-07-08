import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard) {
        console.log(isLoggedIn);
        return isLoggedIn; // Protect dashboard, redirect to login if not authenticated
      }

      // Allow authenticated users to access other pages
      // Add any other protected routes here
      const protectedRoutes = ["/profile", "/settings"];
      if (protectedRoutes.some((route) => nextUrl.pathname.startsWith(route))) {
        return isLoggedIn;
      }

      return true; // Allow access to public pages
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
