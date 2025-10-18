"use client";

import { Award, BookOpen, Star, Users } from "lucide-react";

const stats = [
  { icon: Users, label: "Active Students", value: "50,000+", color: "text-blue-500" },
  { icon: BookOpen, label: "Courses", value: "1,200+", color: "text-orange-500" },
  { icon: Award, label: "Certificates", value: "25,000+", color: "text-purple-500" },
  { icon: Star, label: "Average Rating", value: "4.9/5", color: "text-yellow-500" },
];

export default function StatsSection() {
  return (
    <section className='py-16 bg-white/50 backdrop-blur-sm'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
          {stats.map(stat => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className='text-center space-y-2 group cursor-pointer'
              >
                <div className='flex justify-center mb-3'>
                  <div className='p-4 bg-white rounded-2xl shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1'>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </div>
                <p className='text-3xl font-black text-gray-900 group-hover:text-orange-500 transition-colors'>
                  {stat.value}
                </p>
                <p className='text-sm text-gray-600 font-medium'>{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
