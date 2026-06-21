import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import LinkedIn from "next-auth/providers/linkedin";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  providers: [
    LinkedIn({
      clientId:     process.env.AUTH_LINKEDIN_ID!,
      clientSecret: process.env.AUTH_LINKEDIN_SECRET!,
      authorization: {
        params: { scope: "openid profile email" },
      },
    }),
    Credentials({
      id:   "credentials",
      name: "Test Account",
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.username !== "user" ||
          credentials?.password !== "user"
        ) return null;

        // Upsert the test user so it always exists
        const user = await db.user.upsert({
          where:  { email: "user@socion.test" },
          update: {},
          create: {
            email:        "user@socion.test",
            name:         "Gabriel Teste",
            image:        "https://api.dicebear.com/7.x/avataaars/svg?seed=gabriel",
            plan:         "TRIAL",
            trialEndsAt:  new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
            emailVerified: new Date(),
          },
        });

        return { id: user.id, email: user.email, name: user.name, image: user.image };
      },
    }),
  ],
  pages: { signIn: "/login" },
  events: {
    async createUser({ user }) {
      // Only for OAuth users (credentials already set plan above)
      const existing = await db.user.findUnique({ where: { id: user.id } });
      if (existing?.plan === "FREE") {
        await db.user.update({
          where: { id: user.id },
          data: {
            plan:        "TRIAL",
            trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          },
        });
      }
    },
  },
  callbacks: {
    jwt({ token, user }) {
      if (user?.id) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      if (token?.id) session.user.id = token.id as string;
      return session;
    },
  },
});
