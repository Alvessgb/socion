import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Minimal auth without PrismaAdapter — confirms SECRET + provider work
export const { handlers, auth, signIn, signOut } = NextAuth({
  session:  { strategy: "jwt" },
  secret:   process.env.AUTH_SECRET,
  trustHost: true,
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

        const map: Record<string, { id: string; email: string; name: string; image: string }> = {
          user: { id: "test-user-001", email: "user@socion.test", name: "Gabriel Teste", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=gabriel" },
          zero: { id: "test-zero-001", email: "zero@socion.test", name: "Usuário Zero",  image: "https://api.dicebear.com/7.x/avataaars/svg?seed=zero"    },
        };
        if (!u || !p || !(u in map) || p !== u) return null;
        return map[u];
      },
    }),
  ],
  pages: { signIn: "/login" },
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
