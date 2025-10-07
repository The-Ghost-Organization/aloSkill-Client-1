"use client";

import { useEffect } from "react";
interface ToastProps {
  message: string;
  type?: "success" | "error"; // Using a union type for the limited options
  onClose: () => void; // Function that takes no arguments and returns nothing
}

export default function Toast({ message, type = "success", onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // auto close after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-white 
        ${type === "success" ? "bg-green-500" : "bg-red-500"} 
        animate-slideIn`}
    >
      <p>{message}</p>
    </div>
  );
}
