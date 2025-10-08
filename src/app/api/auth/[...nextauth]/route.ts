/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import { config as envConfig } from "@/config/env";
import NextAuth, { type NextAuthOptions, type User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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
    firstName: string;
    lastName: string;
    profilePicture?: string;
    accessToken: string;
    accessTokenExpires?: number;
  }
  interface Profile {
    given_name: string;
    family_name: string;
    picture: string;
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

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        try {
          const response = await fetch(`${process.env["BACKEND_API_URL"]}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Invalid credentials");
          }

          // Extract user data and tokens from backend response
          const user: BackendUser = data.data;
          const { accessToken, accessTokenExpires } = data.data;

          // Return user object with tokens for NextAuth to manage
          return {
            id: user.id,
            userId: user.id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            profilePicture: user.profilePicture as string,
            accessToken,
            accessTokenExpires: accessTokenExpires,
          };
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
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 15 * 60,
  },

  jwt: {
    maxAge: 15 * 60,
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== "google") return true;

      try {
        // Step 1: Try login with backend
        const userFromDB = await fetch(`${envConfig.BACKEND_API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email: user.email,
            googleId: profile?.sub,
            firstName: profile?.given_name,
            lastName: profile?.family_name,
          }),
        });

        // Step 2: If user not found → register automatically
        let result;
        if (!userFromDB.ok) {
          console.log(`User ${user.email} not found, creating new user...`);

          const registerResponse = await fetch(`${envConfig.BACKEND_API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              firstName: user.name?.split(" ")[0],
              lastName: user.name?.split(" ").slice(1).join(" ") || "",
              email: user.email,
              googleId: profile?.sub,
              profilePicture: user.image,
              // provider: "google",
            }),
          });

          if (!registerResponse.ok) {
            console.error("Failed to register user automatically");
            return "/auth/error?error=AutoRegisterFailed";
          }

          result = await registerResponse.json();
        } else {
          result = await userFromDB.json();
        }

        if (result.success) {
          const backendUser = result.data;
          const { accessToken, accessTokenExpires } = result.data;

          user.id = backendUser.id;
          user.userId = backendUser.id;
          user.email = backendUser.email;
          user.role = backendUser.role;
          user.name = `${backendUser.firstName} ${backendUser.lastName}`;
          user.firstName = backendUser.firstName;
          user.lastName = backendUser.lastName;
          user.profilePicture = backendUser.profilePicture;
          user.accessToken = accessToken;
          if (accessTokenExpires) user.accessTokenExpires = accessTokenExpires;

          return true;
        }

        console.error(`Backend login/register failed for ${user.email}`);
        return "/auth/error?error=GoogleAuthFailed";
      } catch (error) {
        console.error("Error during Google sign-in:", error);
        return "/auth/error?error=VerificationFailed";
      }
    },

    // async signIn({ user, account, profile }) {
    //   if (account?.provider !== "google") return true;

    //   try {
    //     const userFromDB = await fetch(`${envConfig.BACKEND_API_URL}/auth/login`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       credentials: "include",
    //       body: JSON.stringify({
    //         email: user.email,
    //         googleId: profile?.sub,
    //       }),
    //     });

    //     if (!userFromDB.ok) {
    //       console.log(`User ${user.email} not found in backend`);
    //       return "/auth/register";
    //     }

    //     const result = await userFromDB.json();

    //     if (result.success) {
    //       const backendUser = result.data;
    //       const { accessToken, accessTokenExpires } = result.data;

    //       // Attach backend data and tokens to user object for JWT callback
    //       user.id = backendUser.id; // Override Google ID with backend ID
    //       user.userId = backendUser.id;
    //       user.email = backendUser.email;
    //       user.role = backendUser.role;
    //       user.name = `${backendUser.firstName} ${backendUser.lastName}`;
    //       user.firstName = backendUser.firstName;
    //       user.lastName = backendUser.lastName;
    //       user.profilePicture = backendUser.profilePicture;
    //       user.accessToken = accessToken;
    //       if (accessTokenExpires) {
    //         user.accessTokenExpires = accessTokenExpires;
    //       }

    //       return true;
    //     } else {
    //       console.log(`User ${user.email} not found in backend`);
    //       return "/auth/register";
    //     }
    //   } catch (error) {
    //     console.error("Error during Google sign-in:", error);
    //     return "/auth/error?error=VerificationFailed";
    //   }
    // },

    // START: Enhanced JWT callback for proper token management and refresh
    async jwt({ token, user, account }) {
      // Initial sign-in: Store user data and tokens
      if (account && user) {
        token["userId"] = user.id || user.userId;
        // Store access token and expiration from backend (prioritize backend tokens over OAuth tokens)
        token["accessToken"] = user.accessToken || account.access_token;

        // Set expiration time (backend provides this, fallback to OAuth or default)
        if (user.accessTokenExpires) {
          token["accessTokenExpires"] = user.accessTokenExpires;
        } else if (account.expires_at) {
          token["accessTokenExpires"] = account.expires_at * 1000;
        } else {
          token["accessTokenExpires"] = Date.now() + 15 * 60 * 1000;
        }

        // Store user profile data in JWT
        if (user) {
          token["name"] = user.name as string;
          token["email"] = user.email as string;
          token["firstName"] = user.firstName;
          token["lastName"] = user.lastName;
          token["role"] = user.role;
          token["profilePicture"] = user.profilePicture;
        }
      }

      // Check if access token needs refresh (with 1-minute buffer)
      const shouldRefresh =
        !token["accessTokenExpires"] ||
        Date.now() > Number(token["accessTokenExpires"]) - 60 * 1000;

      if (shouldRefresh) {
        try {
          console.log("Attempting to refresh access token");

          // Call backend refresh endpoint
          const refreshResponse = await fetch(`${envConfig.BACKEND_API_URL}/auth/refresh`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });

          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();

            if (refreshData.success) {
              // Update token with new access token and expiration
              token["accessToken"] = refreshData.data.accessToken;
              token["accessTokenExpires"] = refreshData.data.accessTokenExpires;

              console.log("Access token refreshed successfully");
            } else {
              console.error("Token refresh failed:", refreshData.message);
              // Token refresh failed - user may need to re-authenticate
              // Consider redirecting or clearing session
              return {
                ...token,
                error: "RefreshAccessTokenError",
                accessToken: null,
              };
            }
          } else {
            console.error("Token refresh request failed with status:", refreshResponse.status);
          }
        } catch (error) {
          console.error("Error refreshing access token:", error);
          // Don't throw error - allow session to continue with expired token
          // User will need to re-authenticate on next API call
          token["error"] = "RefreshAccessTokenError";
        }
      }
      return token;
    },

    // START: Enhanced session callback to properly populate user data and expose necessary tokens
    async session({ session, token }) {
      if (token) {
        session.user.id = token["userId"] as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.firstName = token["firstName"] as string;
        session.user.lastName = token["lastName"] as string;
        session.user.role = token["role"] as UserRole;
        session.user.profilePicture = token["profilePicture"] as string | null;

        // Expose access token to client for API calls (never expose refresh token)
        (session as any).accessToken = token["accessToken"];
        (session as any).accessTokenExpires = token["accessTokenExpires"];

        // Handle any errors
        if (token["error"]) {
          (session as any).error = token["error"];
        }
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
    async signIn({ user, account }) {
      console.log(`✅ User ${user.email} signed in via ${account?.provider}`);

      // if (account?.provider !== "credentials") {
      //   try {
      //     await fetch(`${envConfig.BACKEND_API_URL}/auth/track-login`, {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       credentials: "include",
      //       body: JSON.stringify({
      //         userId: user.id,
      //         provider: account?.provider,
      //         isNewUser,
      //       }),
      //     });
      //   } catch (error) {
      //     console.error("Failed to track login:", error);
      //   }
      // }
    },

    async signOut({ token }) {
      console.log(`👋 User ${token?.email} signed out`);

      // if (token?.["refreshToken"]) {
      //   try {
      //     await fetch(`${process.env["BACKEND_API_URL"]}/auth/logout`, {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({
      //         refreshToken: token["refreshToken"],
      //       }),
      //     });
      //   } catch (error) {
      //     console.error("Failed to logout from backend:", error);
      //   }
      // }
    },
  },
  secret: envConfig.NEXTAUTH_SECRET,

  // debug: envConfig.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
