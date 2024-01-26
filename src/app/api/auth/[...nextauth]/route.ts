import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text", placeholder: "jsmith" },
        password: { label: "password", type: "password" },
      },
      //@ts-ignore
      async authorize(credentials, req) {
        const response = await fetch("http://localhost:8080/api/users/login", {
          method: "POST",
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const user = await response.json();
          if (response.ok && user) {
            return { user: user.user, accessToken: user.accessToken };
          }
        } else {
          return null;
        }
      },
    }),
  ],
  // secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = token.user.user;
      session.access_token = token.user.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
