import type { NextAuthConfig } from "next-auth/index";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log("authorized running");
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isLoggedIn) {
        console.log("logged in");
      } else {
        console.log("not logged in");
      }
      if (isOnDashboard) {
        console.log("on dashboard");
        if (isLoggedIn) return true;
        console.log("not logged in");
        return Response.redirect(new URL("/login", nextUrl)); // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
