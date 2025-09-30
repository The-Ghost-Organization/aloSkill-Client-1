// components/ProtectedRoute.tsx
"use client";

import type { UserRole } from "@/app/api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  fallback?: React.ReactNode;
}

export function ProtectedRoute({
  children,
  allowedRoles,
  fallback = <div>Loading...</div>,
}: ProtectedRouteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/auth/signin");
      return;
    }

    if (allowedRoles && !allowedRoles.includes(session.user?.role)) {
      router.push("/unauthorized");
    }
  }, [session, status, allowedRoles, router]);

  if (status === "loading") {
    return <>{fallback}</>;
  }

  if (!session) {
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(session?.user?.role)) {
    return null;
  }

  return <>{children}</>;
}
