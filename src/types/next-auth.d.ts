import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      name: string;
      profileImage: string;
      // accessToken: string;
    };
    access_token?: string;
  }
}
