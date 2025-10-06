"use client";

import { authService } from "@/lib/api/auth.service.ts";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Toast from "./toast/toast.tsx";

export default function LogoutAllDevicesButton({ email }: { email: string }) {
  const router = useRouter();
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleLogoutAll = async () => {
    const response = await authService.logoutAllDevices(email);

    if (response.success) {
      setToast({ message: "Logged out from all devices!", type: "success" });

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
        onClick={handleLogoutAll}
        className='px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600'
      >
        Logout All Devices
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
