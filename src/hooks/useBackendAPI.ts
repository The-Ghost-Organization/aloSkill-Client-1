"use client";

import { useSession } from "next-auth/react";
import { useCallback } from "react";

interface FetchOptions extends RequestInit {
  useAuth?: boolean;
}

export function useBackendAPI() {
  const { data: session } = useSession();

  const fetchAPI = useCallback(
    async <T = unknown>(endpoint: string, options: FetchOptions = {}): Promise<T> => {
      const { useAuth = true, ...fetchOptions } = options;

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(fetchOptions.headers as Record<string, string>),
      };

      // Add JWT token if authenticated
      if (useAuth && session?.accessToken) {
        headers["Authorization"] = `Bearer ${session.accessToken}`;
      }

      const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_API_URL"]}${endpoint}`, {
        ...fetchOptions,
        headers,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "API request failed");
      }

      return response.json();
    },
    [session]
  );

  return { fetchAPI, session };
}
