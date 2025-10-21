"use client"

import { BarChart3, BookIcon, BookOpen, DollarSign, LogOut, MessageSquare, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense } from "react";

const InstructorsLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const navItems = [
        { icon: BarChart3, label: 'Dashboard', path: '/dashboard/instructor' },
        { icon: BookIcon, label: 'Create New Course', path: '/dashboard/instructor/create-course' },
        { icon: BookOpen, label: 'My Courses', path: '/dashboard/instructor/course', badge: 3 },
        { icon: DollarSign, label: 'Earning', path: '/dashboard/instructor/earning' },
        { icon: MessageSquare, label: 'Message', path: '/dashboard/instructor/message', badge: 2 },
        { icon: Settings, label: 'Settings', path: '/dashboard/instructor/settings' },
        { icon: LogOut, label: 'SignOut', path: '/dashboard' },
    ];
    return (
        <div className="w-screen h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-pink-100 overflow-y-auto overflow-x-hidden flex items-center gap-2">
            <div className="w-[20%] h-full bg-gradient-to-t from-[#0F172A] to-[#0B1120] text-white flex flex-col">
                <Link href="/" className='hover:text-orange p-5 text-2xl font-semibold'>AloSkill</Link>

                <nav className="flex-1 px-4 flex flex-col gap-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded transition-colors cursor-pointer ${pathname === item.path
                                ? 'bg-orange-500 text-white'
                                : 'text-gray-400 hover:bg-gray-800'
                                }`}
                        >
                            <div className="flex items-center space-x-3">
                                <item.icon className="w-5 h-5" />
                                <span className="text-sm font-medium">{item.label}</span>
                            </div>
                            {item.badge && (
                                <span className={`w-5 h-5 flex items-center justify-center rounded-full text-xs font-semibold ${pathname === item.path ? 'bg-white text-orange-500' : 'bg-orange-500 text-white'
                                    }`}>
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="flex-1">
                <Suspense fallback={<LoadingFallback />}>
                    {children}
                </Suspense>
            </div>
        </div>
    );

    // Loading fallback component
    function LoadingFallback() {
        return (
            <div className="bg-white rounded-lg shadow-sm p-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
            </div>
        );
    }
};

export default InstructorsLayout;