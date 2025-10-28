"use client";

import { Code, MessageSquare, Palette, Users } from "lucide-react";

const bonuses = [
  {
    id: 1,
    icon: Palette,
    title: "Free Design Prototype",
    description: "Experience your design in action before development.",
  },
  {
    id: 2,
    icon: Code,
    title: "Developer Handoff",
    description: "We ensure what we design is exactly what gets built.",
  },
  {
    id: 3,
    icon: Users,
    title: "Project Management",
    description: "Stay on track with our expert project management.",
  },
  {
    id: 4,
    icon: MessageSquare,
    title: "Project Consultation",
    description: "Get professional advice to enhance your project.",
  },
];

export default function BonusesSection() {
  return (
    <section className='relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-gray-900 via-[#074079] to-gray-900'>
      {/* Background Effects */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-0 right-0 w-96 h-96 bg-[#DA7C36] opacity-10 blur-3xl rounded-full'></div>
        <div className='absolute bottom-0 left-0 w-96 h-96 bg-purple-500 opacity-10 blur-3xl rounded-full'></div>
      </div>

      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-12 md:mb-16 animate-fade-in'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4'>
            Bonuses Worth Over
          </h2>
          <div className='text-4xl md:text-5xl lg:text-6xl font-black'>
            <span className='text-purple-400'>$2,500</span>
            <span className='text-yellow-400'>-Yours Free!</span>
          </div>
        </div>

        {/* Bonuses Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
          {bonuses.map((bonus, index) => (
            <BonusCard
              key={bonus.id}
              bonus={bonus}
              index={index}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </section>
  );
}

function BonusCard({ bonus, index }) {
  const Icon = bonus.icon;

  return (
    <div
      className='relative group animate-slide-up'
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Animated Border Container */}
      <div className='absolute inset-0 rounded-2xl overflow-hidden'>
        <div className='absolute inset-0 animated-border'></div>
      </div>

      {/* Card Content */}
      <div className='relative bg-white/80  rounded-2xl p-6 lg:p-8 h-full transition-all duration-300  border border-transparent'>
        {/* Icon */}
        <div className='mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#DA7C36] to-[#d15100] text-white group-hover:scale-110 transition-transform duration-300'>
          <Icon className='w-7 h-7' />
        </div>

        {/* Title */}
        <h3 className='text-xl font-bold text-white mb-3 group-hover:text-[#DA7C36] transition-colors duration-300'>
          {bonus.title}
        </h3>

        {/* Description */}
        <p className='text-gray-400 text-sm leading-relaxed'>{bonus.description}</p>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes border-flow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out both;
        }

        .animated-border {
          background: linear-gradient(
            90deg,
            #da7c36 0%,
            #d15100 25%,
            #9333ea 50%,
            #3b82f6 75%,
            #da7c36 100%
          );
          background-size: 300% 300%;
          animation: border-flow 4s ease infinite;
          padding: 3px;
          border-radius: 1rem;
        }

        .animated-border::before {
          content: "";
          position: absolute;
          inset: 2px;
          background: rgb(17, 24, 39);
          border-radius: 1rem;
        }

        .group:hover .animated-border {
          animation: border-flow 2s ease infinite;
        }
      `}</style>
    </div>
  );
}
