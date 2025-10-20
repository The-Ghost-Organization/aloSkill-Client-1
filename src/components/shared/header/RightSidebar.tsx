"use client";

import { BookOpen, Sparkles, Star, TrendingUp } from "lucide-react";

const cards = [
  {
    id: 1,
    icon: BookOpen,
    title: "Discover New Books Every Day",
    gradient: "from-orange-100 to-orange-50",
    iconColor: "text-orange-500",
  },
  {
    id: 2,
    icon: Sparkles,
    title: "Discover New Books Every Day",
    gradient: "from-purple-100 to-purple-50",
    iconColor: "text-purple-500",
  },
  {
    id: 3,
    icon: Star,
    title: "Discover New Books Every Day",
    gradient: "from-blue-100 to-blue-50",
    iconColor: "text-blue-500",
  },
  {
    id: 4,
    icon: TrendingUp,
    title: "Discover New Books Every Day",
    gradient: "from-pink-100 to-pink-50",
    iconColor: "text-pink-500",
  },
];

export default function RightSidebar() {
  return (
    <aside className='hidden xl:block sticky top-20 right-0 w-64 h-[calc(100vh-5rem)] overflow-y-auto py-6 px-4'>
      <div className='space-y-4'>
        {cards.map(card => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className={`
                bg-gradient-to-br ${card.gradient} 
                rounded-2xl p-6 shadow-sm hover:shadow-md 
                transition-all duration-300 hover:scale-105 
                cursor-pointer border border-gray-100
              `}
            >
              <div className={`${card.iconColor} mb-3`}>
                <Icon className='w-12 h-12' />
              </div>
              <p className='text-sm font-medium text-gray-800 leading-relaxed'>{card.title}</p>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
