"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className='fixed center z-40 p-3 bg-purple-800 border-2 border-gray-200 text-gray-700 rounded-full shadow-lg hover:shadow-xl hover:border-orange-500 hover:text-orange-500 transition-all duration-300 animate-fade-in'
      aria-label='Back to top'
    >
      <ArrowUp className='w-5 h-5 ' />
    </button>
  );
}
