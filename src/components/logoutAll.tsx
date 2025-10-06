"use client";

import { useRouter } from "next/navigation";

import { authService } from "@/lib/api/auth.service.ts";
import tokenManager from "@/lib/api/tokenManager.ts";

export default function LogoutAllDevicesButton() {
  const router = useRouter();
  const user = tokenManager.getUser();

  const handleLogoutAll = async () => {
    try {
      await authService.logoutAllDevices(user?.email);
      router.push("/auth/signin");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleLogoutAll}
      className='px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600'
    >
      Logout All Devices
    </button>
  );
}
