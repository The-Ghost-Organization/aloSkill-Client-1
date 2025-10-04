/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import { config as envConfig } from "@/config/env";
import NextAuth, { type NextAuthOptions, type User, type Session } from "next-auth";
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
      name?: string | null;
      image?: string | null;
    };
    error?: string;
  }
  interface User {
    userId: string;
    role: string;
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
          // 🔑 KEY CHANGE: Add credentials: "include" to send/receive cookies
          const response = await fetch(`${process.env["BACKEND_API_URL"]}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // 🔑 Enable cookie handling
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await response.json();
          console.log("response", data);

          if (!response.ok) {
            throw new Error(data.message || "Invalid credentials");
          }

          // ✅ Backend sets cookies automatically
          // Response only contains user data, not tokens
          const user: BackendUser = data.data.user || data.data;

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
      clientId: envConfig.GOOGLE_CLIENT_ID,
      clientSecret: envConfig.GOOGLE_CLIENT_SECRET,
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
    strategy: "jwt", // use stateless JWTs
    maxAge: 60 * 60, // 1 hour
    updateAge: 15 * 60, // refresh every 15 minutes
  },

  jwt: {
    maxAge: 60 * 60, // align with session
  },

  pages: {
    signIn: "/auth/signin",
    // signOut: "/auth/signout",
    error: "/auth/error",
    // verifyRequest: "/auth/verify-email",
    // newUser: "/onboarding",
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      // Only for Google OAuth
      if (account?.provider !== "google") return true;

      // const userName = user?.name?.split(" ") as string[];
      // const registerUserWithGoogle = {
      //   firstName: userName[0],
      //   lastName: userName.slice(1).join(" "),
      //   email: user.email,
      //   googleId: profile?.sub,
      //   profilePicture: user.image,
      //   image: user.image,
      //   emailVerified: profile?.email,
      // };

      try {
        const userFromDB = await fetch(`${envConfig.BACKEND_API_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            googleId: profile?.sub,
          }),
        });

        if (!userFromDB.ok) {
          console.error("Verification failed");
          return false;
        }

        const result = await userFromDB.json();

        if (result.success) {
          // Attach backend user ID to user object for JWT callback
          user.userId = result.data.id;
          user.role = result.data.role;
          return true;
        } else {
          console.log(`User ${user.email} not found`);
          // return "/auth/unauthorized?email=" + encodeURIComponent(user.email as string);
          return "/auth/register";
        }
      } catch (error) {
        console.error("Error during Google sign-in:", error);
        return "/auth/error?error=VerificationFailed";
      }
    },
    
    async jwt({ token, user, account }) { 

      if (account && user) {
        token["provider"] = account.provider;
        token["userId"] = user.id;
        // store access token and expiry if present
        if (account.expires_at) {
          token["accessTokenExpires"] = account.expires_at * 1000;
        } else {
          token["accessTokenExpires"] = Date.now() + 60 * 60 * 1000;
        }
        token["accessToken"] = account.access_token ?? token["accessToken"];
        // Do NOT store the raw refresh token inside the JWT. We store refresh_token in DB encrypted.
      }

      if (
        token["accessToken"] &&
        token["accessTokenExpires"] &&
        Date.now() < (token as any)["accessTokenExpires"] - 1000 * 10
      ) {
        return token;
      }
      
      // if (user) {
      //   const extendedUser = user as ExtendedUser;
      //   token["id"] = extendedUser.id;
      //   token.email = extendedUser.email;
      //   token["firstName"] = extendedUser.firstName;
      //   token["lastName"] = extendedUser.lastName;
      //   token["role"] = extendedUser.role;
      //   token["status"] = extendedUser.status;
      //   token["isEmailVerified"] = extendedUser.isEmailVerified;
      //   token["profilePicture"] = extendedUser.profilePicture;
      // }

      // Google OAuth sign-in
      // if (account?.provider === "google") {
      //   try {
      //     const response = await fetch(`${envConfig.BACKEND_API_URL}/auth/google`, {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       credentials: "include", // 🔑 Enable cookie handling
      //       body: JSON.stringify({
      //         googleId: account.providerAccountId,
      //         email: token.email,
      //         firstName: token.name?.split(" ")[0] || "",
      //         lastName: token.name?.split(" ").slice(1).join(" ") || "",
      //         profilePicture: token.picture,
      //       }),
      //     });
      //     const data = await response.json();
      //     const backendUser: BackendUser = data.data.user || data.data;

      //     token["id"] = backendUser.id;
      //     token["role"] = backendUser.role;
      //     token["status"] = backendUser.status;
      //     token["isEmailVerified"] = backendUser.isEmailVerified;
      //   } catch (error) {
      //     console.error("Google auth backend error:", error);
      //   }
      // }

      // Session update (when calling update() from client)
      // if (trigger === "update" && session) {
      //   return { ...token, ...session };
      // }
      return token;
    },

    async session({ session, token }) {
      console.log("inside session callback :", session, "Token :", token);
      // if (token) {
      //   if (!session.user) {
      //     session.user = {
      //       id: "",
      //       email: "",
      //       firstName: "",
      //       lastName: "",
      //       role: UserRole.STUDENT,
      //       status: UserStatus.ACTIVE,
      //       isEmailVerified: false,
      //       name: null,
      //       image: null,
      //       profilePicture: null,
      //     };
      //   }

      //   session.user.id = token["id"] as string;
      //   session.user.email = token.email as string;
      //   session.user.firstName = token["firstName"] as string;
      //   session.user.lastName = token["lastName"] as string;
      //   session.user.role = token["role"] as UserRole;
      //   session.user.status = token["status"] as UserStatus;
      //   session.user.isEmailVerified = token["isEmailVerified"] as boolean;
      //   session.user.profilePicture = token["profilePicture"] as string | null;
      //   session.error = token["error"] as string;
      // }

      // Attach minimal info to the session — never send refresh token to client
      (session as Session & any).user = { ...session.user, id: token["userId"] };
      (session as any).accessToken = token["accessToken"];
      (session as any).accessTokenExpires = token["accessTokenExpires"];
      if (token["error"]) (session as any).error = token["error"];
      return session;

      // return session;
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
          await fetch(`${envConfig.BACKEND_API_URL}/auth/track-login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // 🔑 Send cookies
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
  secret: envConfig.NEXTAUTH_SECRET,

  // debug: envConfig.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };