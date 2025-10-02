/* eslint-disable no-console */

import NextAuth, { type NextAuthOptions, type User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// Extend the Session type to include custom user properties
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: UserRole;
      status: UserStatus;
      isEmailVerified: boolean;
      profilePicture?: string | null;
      accessToken: string;
      refreshToken: string;
      name?: string | null;
      image?: string | null;
    };
    accessToken: string;
    refreshToken: string;
    error?: string;
  }
}

// Type definitions

export enum UserRole {
  STUDENT = "STUDENT",
  INSTRUCTOR = "INSTRUCTOR",
  ADMIN = "ADMIN",
}
export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
  PENDING_VERIFICATION = "PENDING_VERIFICATION",
}
interface BackendUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  isEmailVerified: boolean;
  profilePicture?: string;
  accessToken: string;
  refreshToken: string;
}

interface ExtendedUser extends User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  isEmailVerified: boolean;
  profilePicture?: string;
  accessToken: string;
  refreshToken: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<ExtendedUser | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        try {
          const response = await fetch(`${process.env["BACKEND_API_URL"]}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Invalid credentials");
          }

          const user: BackendUser = data.data;

          return {
            id: user.id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            status: user.status,
            isEmailVerified: user.isEmailVerified,
            profilePicture: user.profilePicture,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            image: user.profilePicture,
          } as ExtendedUser;
        } catch (error: unknown) {
          console.error("Login error:", error);
          if (error instanceof Error) {
            throw new Error(error.message || "Authentication failed");
          }
          throw new Error("Authentication failed");
        }
      },
    }),

    GoogleProvider({
      clientId: process.env["GOOGLE_CLIENT_ID"] as string,
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"] as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-email",
    newUser: "/onboarding",
  },

  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      if (user) {
        const extendedUser = user as ExtendedUser;

        token["id"] = extendedUser.id;
        token.email = extendedUser.email;
        token["firstName"] = extendedUser.firstName;
        token["lastName"] = extendedUser.lastName;
        token["role"] = extendedUser.role;
        token["status"] = extendedUser.status;
        token["isEmailVerified"] = extendedUser.isEmailVerified;
        token["profilePicture"] = extendedUser.profilePicture;
        token["accessToken"] = extendedUser.accessToken;
        token["refreshToken"] = extendedUser.refreshToken;
      }
// http://localhost:3000/api/auth/callback/google
      if (account?.provider === "google") {
        try {
          const response = await fetch(`${process.env["BACKEND_API_URL"]}/auth/google`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              googleId: account.providerAccountId,
              email: token.email,
              firstName: token.name?.split(" ")[0] || "",
              lastName: token.name?.split(" ").slice(1).join(" ") || "",
              profilePicture: token.picture,
            }),
          });

          const data = await response.json();
          const backendUser: BackendUser = data.data;

          token["id"] = backendUser.id;
          token["role"] = backendUser.role;
          token["status"] = backendUser.status;
          token["isEmailVerified"] = backendUser.isEmailVerified;
          token["accessToken"] = backendUser.accessToken;
          token["refreshToken"] = backendUser.refreshToken;
        } catch (error) {
          console.error("Google auth backend error:", error);
        }
      }

      if (trigger === "update" && session) {
        return { ...token, ...session };
      }

      const now = Math.floor(Date.now() / 1000);
      const tokenIat = typeof token["iat"] === "number" ? token["iat"] : now;
      const tokenAge = now - tokenIat;

      if (tokenAge > 23 * 60 * 60) {
        try {
          const response = await fetch(`${process.env["BACKEND_API_URL"]}/auth/refresh`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              refreshToken: token["refreshToken"],
            }),
          });

          if (response.ok) {
            const data = await response.json();
            token["accessToken"] = data.data.accessToken;
            token["refreshToken"] = data.data.refreshToken;
          }
        } catch (error) {
          console.error("Token refresh failed:", error);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        if (!session.user) {
          session.user = {
            id: "",
            email: "",
            firstName: "",
            lastName: "",
            role: UserRole.STUDENT,
            status: UserStatus.ACTIVE,
            isEmailVerified: false,
            accessToken: "",
            refreshToken: "",
            name: null,
            image: null,
            profilePicture: null,
          };
        }

        session.user.id = token["id"] as string;
        session.user.email = token.email as string;
        session.user.firstName = token["firstName"] as string;
        session.user.lastName = token["lastName"] as string;
        session.user.role = token["role"] as UserRole;
        session.user.status = token["status"] as UserStatus;
        session.user.isEmailVerified = token["isEmailVerified"] as boolean;
        session.user.profilePicture = token["profilePicture"] as string | null;
        session.accessToken = token["accessToken"] as string;
        session.refreshToken = token["refreshToken"] as string;
        session.error = token["error"] as string;
      }

      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  events: {
    async signIn({ user, account, isNewUser }) {
      console.log(`✅ User ${user.email} signed in via ${account?.provider}`);

      if (account?.provider !== "credentials") {
        try {
          await fetch(`${process.env["BACKEND_API_URL"]}/auth/track-login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: user.id,
              provider: account?.provider,
              isNewUser,
            }),
          });
        } catch (error) {
          console.error("Failed to track login:", error);
        }
      }
    },

    async signOut({ token }) {
      console.log(`👋 User ${token?.email} signed out`);

      if (token?.["refreshToken"]) {
        try {
          await fetch(`${process.env["BACKEND_API_URL"]}/auth/logout`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              refreshToken: token["refreshToken"],
            }),
          });
        } catch (error) {
          console.error("Failed to logout from backend:", error);
        }
      }
    },
  },

  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
