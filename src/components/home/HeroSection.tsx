// ============================================
// FILE: components/HeroSection.tsx
// ============================================
"use client";

import { ArrowRight, CheckCircle, Send, Star } from "lucide-react";
import Image from "next/image";

const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
];

const features = ["1000+ Courses Available", "Expert Instructors", "Lifetime Access"];

export default function HeroSection() {
  return (
    <section className='relative min-h-screen  flex items-center justify-center px-4 py-4 lg:py-32 overflow-hidden   '>
      {/* Decorative Blobs */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none bg-gradient-soft-hero  mix-blend-multiply filter blur-2xl opacity-50 '></div>
      {/* <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-300 to-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob'></div>
        <div className='absolute top-40 right-10 w-72 h-72 bg-gradient-to-br from-[var(--color-orange)] to-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000'></div>
        <div className='absolute -bottom-20 left-1/2 w-72 h-72 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000'></div>
      </div> */}

      <div className='relative z-10 max-w-5xl mx-auto text-center space-y-2'>
        {/* Social Proof - Top */}
        <div className='flex items-center justify-center gap-4 flex-wrap animate-fade-in'>
          {/* Avatars */}
          <div className='flex items-center'>
            <div className='flex -space-x-3'>
              {avatars.map((avatar, index) => (
                <div
                  key={index}
                  className='w-10 h-10 sm:w-12 sm:h-12 rounded-full border-3 border-white overflow-hidden shadow-lg hover:scale-110 transition-transform cursor-pointer'
                >
                  <Image
                    src={avatar}
                    alt={`Student ${index + 1}`}
                    width={48}
                    height={48}
                    className='w-full h-full object-cover'
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className='flex items-center gap-1 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md'>
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className='w-4 h-4 text-yellow-500 fill-yellow-500'
              />
            ))}
            <span className='text-sm font-semibold text-gray-700 ml-2'>5.0</span>
          </div>

          {/* Reviews */}
          <div className='bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md'>
            <p className='text-sm font-medium text-gray-700'>From Reviews 178+</p>
          </div>
        </div>

        {/* Badge */}
        <div className='inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg border border-[var(--color-orange)]/20 animate-slide-up'>
          <span className='w-2 h-2 bg-[var(--color-orange)] rounded-full animate-pulse'></span>
          <p className='text-sm font-semibold text-gray-700'>Learning and reading at one place</p>
        </div>

        {/* Main Heading */}
        <div className='space-y-4 animate-fade-in'>
          <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-gray-900 leading-tight'>
            Start Learning{" "}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-orange)] to-orange-600'>
              Today
            </span>
          </h1>

          {/* Subheading */}
          <p className='text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4'>
            চাহিদাসম্পন্ন দক্ষতা অর্জন করুন এবং অসাধারণ বই আবিষ্কার করুন — সব এক প্ল্যাটফর্মে,
            বাংলায়।
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className='flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up'>
          <button className='group w-full sm:w-auto relative px-8 py-4 bg-gradient-to-r from-[var(--color-orange)] to-orange-600 text-white rounded-full hover:from-orange-600 hover:to-[var(--color-orange)] transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-base overflow-hidden'>
            <span className='relative z-10 flex items-center justify-center gap-2'>
              Free Registration
              <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
            </span>
          </button>

          <button className='w-full sm:w-auto relative inline-flex h-14 active:scale-95 transition overflow-hidden rounded-full p-[2px] focus:outline-none'>
            <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#DA7C36_0%,#f472b6_50%,#bd5fff_100%)]'></span>
            <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-gray-900 backdrop-blur-3xl gap-2 hover:bg-[var(--color-orange)] hover:text-white transition-colors'>
              Become Instructor
              <Send className='w-4 h-4' />
            </span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-3 gap-6 max-w-2xl mx-auto py-8 animate-fade-in'>
          <div className='text-center'>
            <p className='text-3xl md:text-4xl font-black text-[var(--color-orange)]'>50K+</p>
            <p className='text-sm text-gray-600 font-medium mt-1'>Students</p>
          </div>
          <div className='text-center border-x border-gray-200'>
            <p className='text-3xl md:text-4xl font-black text-[var(--color-orange)]'>1200+</p>
            <p className='text-sm text-gray-600 font-medium mt-1'>Courses</p>
          </div>
          <div className='text-center'>
            <p className='text-3xl md:text-4xl font-black text-[var(--color-orange)]'>25K+</p>
            <p className='text-sm text-gray-600 font-medium mt-1'>Certificates</p>
          </div>
        </div>

        {/* Features List */}
        <div className='flex flex-wrap items-center justify-center gap-4 pt-4 animate-slide-up'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='flex items-center gap-2 text-sm font-medium text-gray-700 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm'
            >
              <CheckCircle className='w-4 h-4 text-[var(--color-orange)]' />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Quick Action Pills */}
        <div className='flex flex-wrap justify-center gap-3 pt-4 animate-fade-in'>
          <button className='px-5 py-2.5 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full hover:bg-[var(--color-orange)] hover:text-white transition-all duration-300 text-sm font-medium border border-gray-200 shadow-md hover:shadow-lg'>
            Start learning & Get certificated
          </button>
          <button className='px-5 py-2.5 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full hover:bg-[var(--color-orange)] hover:text-white transition-all duration-300 text-sm font-medium border border-gray-200 shadow-md hover:shadow-lg'>
            Career on aloskill
          </button>
          <button className='px-5 py-2.5 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full hover:bg-[var(--color-orange)] hover:text-white transition-all duration-300 text-sm font-medium border border-gray-200 shadow-md hover:shadow-lg'>
            Learn & Earn Together
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
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
          animation: fadeIn 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-out 0.3s both;
        }
      `}</style>
    </section>
  );
}
