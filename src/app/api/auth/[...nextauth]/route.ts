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
cookie: {
    name: "next-auth.session-token",
    options: {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    },
  },
      async authorize(credentials, req) {
        // console.log("entrou",req);
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
            console.log({ user });
            return user;
          }
        } else {
          console.log("deu errado irmao");
          return null;
        }
      },
    }),
  ],
  // secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log(token, user, account, profile, isNewUser);
      // if (account) {
      //   token.accessToken = account.access_token
      //   token.id = profile.id
      // }
      if (user) {
        token.user = user;
      }
      console.log(token, user, account, profile, isNewUser);
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      session.access_token = token?.user.accessToken
      // session.accessToken = token.user.accessToken;
      // session.user.id = token.id;
      console.log(session, token);
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
