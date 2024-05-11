import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { prisma } from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (!user.email) return false;

      // Check if user exists
      const userData = await prisma.user.findUnique({ where: { email: user.email } });

      // If user does not exist, create a new user
      if (!userData) {
        await prisma.user.create({
          data: {
            name: user.name ?? Math.random().toString(36).substring(7),
            email: user.email,
          },
        });
      }

      return true;
    },
  },
});
