/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import { config as envConfig } from "@/config/env";
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
    accessToken: string; // Token from backend
    refreshToken: string; // Token from backend
    accessTokenExpires: number;
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

interface ExtendedUser extends User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
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
      // START: Modified authorize function to receive and return tokens from backend
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
            credentials: "include", // Enable cookie handling for session management
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await response.json();
          console.log("Login response:", data);

          if (!response.ok) {
            throw new Error(data.message || "Invalid credentials");
          }

          // Extract user data and tokens from backend response
          const user: BackendUser = data.data.user || data.data;
          const { accessToken, refreshToken, accessTokenExpires } = data.data;

          // Return user object with tokens for NextAuth to manage
          return {
            userId: user.id,
            id: user.id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            status: user.status,
            isEmailVerified: user.isEmailVerified,
            profilePicture: user.profilePicture as string,
            image: user.profilePicture as string,
            accessToken, // Token from backend
            refreshToken, // Token from backend (will be stored securely)
            accessTokenExpires, // Expiration timestamp
          };
        } catch (error: unknown) {
          console.error("Login error:", error);
          if (error instanceof Error) {
            throw new Error(error.message || "Authentication failed");
          }
          throw new Error("Authentication failed");
        }
      },
      // END: Modified authorize function
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
    // START: Modified signIn callback to receive tokens from backend for Google OAuth
    async signIn({ user, account, profile }) {
      // Only for Google OAuth
      if (account?.provider !== "google") return true;
      console.log("google provider signin called : ", profile);

      try {
        // Call backend to authenticate with Google credentials and receive tokens
        const userFromDB = await fetch(`${envConfig.BACKEND_API_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies for session management
          body: JSON.stringify({
            email: user.email,
            googleId: profile?.sub,
            // Include additional Google profile data if needed
            firstName: profile?.given_name,
            lastName: profile?.family_name,
            profilePicture: user.image,
          }),
        });

        if (!userFromDB.ok) {
          console.error("Google verification failed");
          return false;
        }

        const result = await userFromDB.json();

        if (result.success) {
          // Extract backend user data and tokens
          const backendUser = result.data.user || result.data;
          const { accessToken, refreshToken, accessTokenExpires } = result.data;

          // Attach backend data and tokens to user object for JWT callback
          user.id = backendUser.id; // Override Google ID with backend ID
          user.userId = backendUser.id;
          user.role = backendUser.role;
          user.firstName = backendUser.firstName;
          user.lastName = backendUser.lastName;
          user.profilePicture = backendUser.profilePicture;
          user.accessToken = accessToken; // Token from backend
          user.refreshToken = refreshToken; // Token from backend
          user.accessTokenExpires = accessTokenExpires; // Expiration timestamp

          return true;
        } else {
          console.log(`User ${user.email} not found in backend`);
          return "/auth/register"; // Redirect to registration
        }
      } catch (error) {
        console.error("Error during Google sign-in:", error);
        return "/auth/error?error=VerificationFailed";
      }
    },
    // END: Modified signIn callback

    // START: Enhanced JWT callback for proper token management and refresh
    async jwt({ token, user, account }) {
      // Initial sign-in: Store user data and tokens
      if (account && user) {
        token["provider"] = account.provider;
        token["userId"] = user.id || user.userId;

        // Store access token and expiration from backend (prioritize backend tokens over OAuth tokens)
        // Store access token and expiration from backend (prioritize backend tokens over OAuth tokens)
        token["accessToken"] = user.accessToken || account.access_token;
        token["refreshToken"] = user.refreshToken || account.refresh_token; // Consider encrypting this in production

        // Set expiration time (backend provides this, fallback to OAuth or default)
        if (user.accessTokenExpires) {
          token["accessTokenExpires"] = user.accessTokenExpires;
        } else if (account.expires_at) {
          token["accessTokenExpires"] = account.expires_at * 1000;
        } else {
          token["accessTokenExpires"] = Date.now() + 60 * 60 * 1000; // 1 hour default
        }

        // Store user profile data in JWT
        if (user) {
          token["firstName"] = user.firstName;
          token["lastName"] = user.lastName;
          token["role"] = user.role;
          token["profilePicture"] = user.profilePicture;
        }
      }

      // Check if access token needs refresh (with 5-minute buffer)
      const shouldRefresh =
        !token["accessTokenExpires"] ||
        Date.now() > Number(token["accessTokenExpires"]) - 5 * 60 * 1000;

      if (shouldRefresh && token["refreshToken"]) {
        try {
          console.log("Attempting to refresh access token");

          // Call backend refresh endpoint
          const refreshResponse = await fetch(`${envConfig.BACKEND_API_URL}/auth/refresh`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              refreshToken: token["refreshToken"],
            }),
          });

          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();

            if (refreshData.success) {
              // Update token with new access token and expiration
              // Update token with new access token and expiration
              token["accessToken"] = refreshData.data.accessToken;
              token["refreshToken"] = refreshData.data.refreshToken || token["refreshToken"];
              token["accessTokenExpires"] = refreshData.data.accessTokenExpires;

              console.log("Access token refreshed successfully");
            } else {
              console.error("Token refresh failed:", refreshData.message);
              // Token refresh failed - user may need to re-authenticate
              // Consider redirecting or clearing session
            }
          } else {
            console.error("Token refresh request failed with status:", refreshResponse.status);
          }
        } catch (error) {
          console.error("Error refreshing access token:", error);
          // Don't throw error - allow session to continue with expired token
          // User will need to re-authenticate on next API call
        }
      }

      return token;
    },
    // END: Enhanced JWT callback

    // START: Enhanced session callback to properly populate user data and expose necessary tokens
    async session({ session, token }) {
      // Populate user data from JWT token
      if (token) {
        session.user.id = token["userId"] as string;
        session.user.email = token.email as string;
        session.user.firstName = token["firstName"] as string;
        session.user.lastName = token["lastName"] as string;
        session.user.role = token["role"] as UserRole;
        session.user.status = token["status"] as UserStatus;
        session.user.isEmailVerified = token["isEmailVerified"] as boolean;
        session.user.profilePicture = token["profilePicture"] as string | null;
        session.user.name = token.name as string; // Full name if available
        session.user.image = token["profilePicture"] as string | null; // For NextAuth compatibility

        // Expose access token to client for API calls (never expose refresh token)
        (session as any).accessToken = token["accessToken"];
        (session as any).accessTokenExpires = token["accessTokenExpires"];
        (session as any).provider = token["provider"];

        // Handle any errors
        if (token["error"]) {
          (session as any).error = token["error"];
        }
      }

      return session;
    },
    // END: Enhanced session callback

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
