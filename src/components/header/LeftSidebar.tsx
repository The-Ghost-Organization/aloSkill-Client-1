"use client";

import {
  Briefcase,
  Calendar,
  Facebook,
  GraduationCap,
  Instagram,
  Trophy,
  Twitter,
  UserCircle,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
interface LeftSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  { icon: UserCircle, label: "Sign In/Up", href: "/auth", color: "text-orange-500" },
  { icon: GraduationCap, label: "Instructors", href: "/instructors", color: "text-blue-500" },
  { icon: Users, label: "Students", href: "/students", color: "text-green-500" },
  { icon: Calendar, label: "Events", href: "/events", color: "text-purple-500" },
  { icon: UserPlus, label: "Groups", href: "/groups", color: "text-pink-500" },
  { icon: Trophy, label: "Challenge", href: "/challenge", color: "text-yellow-500" },
  { icon: Briefcase, label: "Workshop", href: "/workshop", color: "text-indigo-500" },
  { icon: Users, label: "Learn Together", href: "/learn-together", color: "text-teal-500" },
  { icon: Users, label: "Learn Together", href: "/learn-together2", color: "text-teal-500" },
  { icon: Users, label: "Learn Together", href: "/learn-together3", color: "text-teal-500" },
  { icon: Users, label: "Learn Together", href: "/learn-together4", color: "text-teal-500" },
  { icon: Users, label: "Learn Together", href: "/learn-together5", color: "text-teal-500" },
  { icon: Users, label: "Learn Together", href: "/learn-together6", color: "text-teal-500" },
  { icon: Users, label: "Learn Together", href: "/learn-together7", color: "text-teal-500" },
];

export default function LeftSidebar({ isOpen = true, onClose }: LeftSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className='fixed top-0 inset-0 bg-black/50 z-40 lg:hidden'
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 lg:top-20 left-0 h-[calc(100vh-5rem)] bg-white border-r border-gray-200 z-50 overflow-y-auto
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          w-64 flex flex-col
        `}
      >
        {/* Mobile Close Button */}
        <div className='lg:hidden flex justify-end p-4'>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
          >
            <X className='w-6 h-6 text-gray-700' />
          </button>
        </div>

        {/* Navigation */}
        <nav className='flex-1 px-4 py-6 space-y-2 overflow-y-auto pt-20 lg:pt-6'>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <a
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                  ${
                    isActive
                      ? "bg-orange-50 text-orange-600 font-semibold shadow-sm"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-orange-500" : item.color}`} />
                <span className='text-sm'>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Footer */}
        <div className='p-6 border-t border-gray-200'>
          <p className='text-xs text-gray-500 mb-3 font-medium'>Follow Us</p>
          <div className='flex gap-3'>
            {/* Twitter */}
            <a
              href='#'
              className='w-9 h-9 flex items-center justify-center rounded-full border border-gray-300
                 hover:border-sky-500 hover:text-sky-500 transition-all duration-300 hover:shadow-md'
            >
              <Twitter className='w-4 h-4' />
            </a>

            {/* Facebook */}
            <a
              href='#'
              className='w-9 h-9 flex items-center justify-center rounded-full border border-gray-300
                 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 hover:shadow-md'
            >
              <Facebook className='w-4 h-4' />
            </a>

            {/* Instagram */}
            <a
              href='#'
              className='w-9 h-9 flex items-center justify-center rounded-full border border-gray-300
                 hover:border-pink-500 hover:text-pink-500 transition-all duration-300 hover:shadow-md'
            >
              <Instagram className='w-4 h-4' />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
