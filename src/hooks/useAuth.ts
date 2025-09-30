// lib/hooks/useAuth.ts
"use client";

import type { UserRole } from "@/app/api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuth(requiredRole?: UserRole | UserRole[]) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    // Not authenticated
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }

    // Check role-based access
    if (session && requiredRole) {
      const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

      if (!roles.includes(session?.user?.role)) {
        router.push("/unauthorized");
      }
    }
  }, [status, session, requiredRole, router]);

  return {
    session,
    status,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    user: session?.user,
  };
}
