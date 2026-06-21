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
        const u = credentials?.username as string | undefined;
        const p = credentials?.password as string | undefined;

        const accounts: Record<string, { email: string; name: string; seed: string }> = {
          user: { email: "user@socion.test",  name: "Gabriel Teste",  seed: "gabriel" },
          zero: { email: "zero@socion.test",  name: "Usuário Zero",   seed: "zero" },
        };

        if (!u || !p || !(u in accounts) || p !== u) return null;

        const acct = accounts[u];
        const user = await db.user.upsert({
          where:  { email: acct.email },
          update: {},
          create: {
            email:         acct.email,
            name:          acct.name,
            image:         `https://api.dicebear.com/7.x/avataaars/svg?seed=${acct.seed}`,
            plan:          "TRIAL",
            trialEndsAt:   new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
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
