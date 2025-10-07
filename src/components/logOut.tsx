"use client";

import { authService } from "@/lib/api/auth.service.ts";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Toast from "./toast/successToast.tsx";


export default function LogoutButton() {
  const router = useRouter();
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleLogout = async () => {
    const response = await authService.logoutCurrentDevice();

    if (response.success) {
      setToast({ message: "Logged out successfully!", type: "success" });

      setTimeout(() => {
        router.push("/auth/signin");
      }, 1500);
    } else {
      setToast({ message: response.message || "Logout failed!", type: "error" });
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
