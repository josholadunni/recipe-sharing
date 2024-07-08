import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const protectedRoutes = ["/profile", "/settings", "/dashboard"];
      if (protectedRoutes.some((route) => nextUrl.pathname.startsWith(route))) {
        return isLoggedIn;
      }

      return true; // Allow access to public pages
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
