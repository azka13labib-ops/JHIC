import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }zx

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    token?: string;
    role?: string;
  }
}
