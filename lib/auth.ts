import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  secret:  process.env.AUTH_SECRET,
  providers: [
    Credentials({
      id:   "credentials",
      name: "Test Account",
      credentials: {
        username: { label: "Usuário", type: "text" },
        password: { label: "Senha",   type: "password" },
      },
      async authorize(credentials) {
        const u = credentials?.username as string | undefined;
        const p = credentials?.password as string | undefined;
        if (!u || !p) return null;

        const map: Record<string, { email: string; name: string; seed: string }> = {
          user: { email: "user@socion.test", name: "Gabriel Teste", seed: "gabriel" },
          zero: { email: "zero@socion.test", name: "Usuário Zero",  seed: "zero"    },
        };
        if (!(u in map) || p !== u) return null;

        const acct = map[u];
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
  pages:    { signIn: "/login" },
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
  trustHost: true,
});
