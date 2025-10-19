"use client";

import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";

const avatars = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=5",
];

export default function HeroSection() {
  return (
    <section className='min-h-screen flex items-center justify-center px-4 py-20 lg:py-0'>
      <div className='max-w-4xl mx-auto text-center '>
        {/* Social Proof */}
        <div className='flex items-center justify-center gap-4 flex-wrap'>
          <div className='flex items-center'>
            <div className='flex -space-x-2'>
              {avatars.map((avatar, index) => (
                <div
                  key={index}
                  className='w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md'
                >
                  <Image
                    src={avatar}
                    alt={`Student ${index + 1}`}
                    width={200}
                    height={200}
                    className='w-full h-full object-cover'
                  />
                </div>
              ))}
            </div>
          </div>
          <div className='flex items-center gap-1 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md'>
            <Star className='w-4 h-4 text-yellow-500 fill-yellow-500' />
            <Star className='w-4 h-4 text-yellow-500 fill-yellow-500' />
            <Star className='w-4 h-4 text-yellow-500 fill-yellow-500' />
            <Star className='w-4 h-4 text-yellow-500 fill-yellow-500' />
            <Star className='w-4 h-4 text-yellow-500 fill-yellow-500' />
            <span className='text-sm font-semibold text-gray-700 ml-2'>5.0</span>
          </div>
          <div className='bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md'>
            <p className='text-sm font-medium text-gray-700'>From Reviews 178+</p>
          </div>
        </div>

        <div className='bg-white/60 backdrop-blur-sm px-6 py-2 rounded-full shadow-md inline-block'>
          <p className='text-sm font-medium text-gray-700'>Learning and reading at one place</p>
        </div>

        {/* Main Heading */}
        <h1 className='text-5xl md:text-7xl font-black text-gray-900 leading-tight'>
          Start Learning Today
        </h1>

        {/* Subheading */}
        <p className='text-lg md:text-xl text-gray-600 max-w-2xl bangla mx-auto leading-relaxed'>
          চাহিদাসম্পন্ন দক্ষতা অর্জন করুন এবং অসাধারণ বই আবিষ্কার করুন — সব এক প্ল্যাটফর্মে,
          বাংলায়।
        </p>

        {/* Primary Action Buttons */}
        <div className='flex flex-col  sm:flex-row items-center justify-center gap-4'>
          <button className='group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg overflow-hidden'>
            <span className='relative z-10 flex items-center gap-2'>
              Free Registration
              <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
            </span>
          </button>

          <button className='px-8 py-4 bg-white text-gray-800 border-2 border-gray-300 rounded-full hover:border-orange-500 hover:text-orange-500 transition-all duration-300 font-semibold text-lg shadow-md hover:shadow-lg'>
            Become an Instructor
          </button>
        </div>

        {/* Secondary Pill Buttons */}
        <div className='flex flex-wrap items-center justify-center gap-3'>
          <button className='px-5 py-2.5 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full hover:bg-white hover:shadow-md transition-all duration-300 text-sm font-medium border border-gray-200'>
            Start learning & Get certificated
          </button>
          <button className='px-5 py-2.5 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full hover:bg-white hover:shadow-md transition-all duration-300 text-sm font-medium border border-gray-200'>
            Career on aloskill
          </button>
          <button className='px-5 py-2.5 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full hover:bg-white hover:shadow-md transition-all duration-300 text-sm font-medium border border-gray-200'>
            Learn & Earn Together
          </button>
        </div>
      </div>
    </section>
  );
}
