import { Account, NextAuthOptions, Profile, Session, User } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import TwitterProvider from "next-auth/providers/twitter";
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { Adapter, AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID as string,
      clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
      issuer: process.env.AUTH0_ISSUER as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, //necessary so getServerSession() function works and not throw jwt error
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({
      token,
      user,
      account,
      profile,
      isNewUser,
    }: {
      token: JWT;
      user: User | AdapterUser;
      account: Account | null;
      profile?: Profile | undefined;
      isNewUser?: boolean | undefined;
    }) {
      if (user) {
        token.provider = account?.provider; //adding the provider name to the token
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.provider = token.provider; //adding the provider name to the session
      }
      return session;
    },
  },
};
