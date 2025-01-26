import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getUser } from "./lib/userUtils.js";
import { findUserIdFromEmail } from "./lib/data";
import { User } from "./lib/models/index.js";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const trimmedpasswordHash = user.password.trim();
          const passwordsMatch = await bcrypt.compare(
            password,
            trimmedpasswordHash
          );
          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials");

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const email = user.email;
      const username = user.name.replace(/\s+/g, "").toLowerCase();
      const emailExists = await findUserIdFromEmail(email);
      if (emailExists === undefined) {
        await User.create({
          username: username,
          email: email,
        });
      }
      return true;
    },
  },
});
