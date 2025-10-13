"use client";

import { getSession, signOut } from "next-auth/react";
import { useState } from "react";
import Toast from "./toast/successToast.tsx";

export default function LogoutButton() {
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleLogout = async () => {
    console.log("Logout button clicked");

    // Get session to access the access token
    const session = await getSession();
    console.log("Current session token:", session?.accessToken);

    try {
      // Ensure accessToken is available
      if (!session?.accessToken) {
        throw new Error("No access token found. Please log in again.");
      }

      // Call the backend logout API with the Authorization header
      const response = await fetch(`${process.env["BACKEND_API_URL"]}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`, // Pass access token here
        },
      });

      const data = await response.json();
      console.log("Backend logout response:", data);

      if (data.success) {
        setToast({
          message: data.message || "Logged out successfully!",
          type: "success",
        });

        // Call NextAuth's signOut to remove the session
        await signOut({ callbackUrl: "/auth/signin" });
      } else {
        setToast({
          message: data.message || "Logout failed!",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
      setToast({
        message: "Network error while logging out.",
        type: "error",
      });

      // Even if backend logout fails, still try to sign out from NextAuth
      try {
        await signOut({ callbackUrl: "/auth/signin" });
      } catch (signOutError) {
        console.error("NextAuth signOut error:", signOutError);
      }
    }
  };

  return (
    <>
      <button
        onClick={handleLogout}
        className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600'
      >
        Logout
      </button>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
