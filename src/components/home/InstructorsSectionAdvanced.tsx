"use client";

import { ArrowRight, Award, Share2, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface InstructorAdvanced {
  id: number;
  name: string;
  title: string;
  image: string;
  borderColor: string;
  students: number;
  courses: number;
  rating: number;
}

const instructorsAdvanced: InstructorAdvanced[] = [
  {
    id: 1,
    name: "Esther Howard",
    title: "Senior Instructor",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    borderColor: "border-orange-500",
    students: 1250,
    courses: 12,
    rating: 4.9,
  },
  {
    id: 2,
    name: "Beverly Hathcock",
    title: "Senior Instructor",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    borderColor: "border-orange-500",
    students: 980,
    courses: 8,
    rating: 4.8,
  },
  {
    id: 3,
    name: "Donald Gonzales",
    title: "Junior Instructor",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    borderColor: "border-orange-500",
    students: 650,
    courses: 5,
    rating: 4.7,
  },
  {
    id: 4,
    name: "Eddie Lenz",
    title: "Senior Instructor",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    borderColor: "border-orange-500",
    students: 1100,
    courses: 10,
    rating: 4.9,
  },
];

export function InstructorsSectionAdvanced() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className='py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-purple-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
          {/* Left Content */}
          <div className='space-y-6 lg:pr-8 order-2 lg:order-1'>
            <div className='inline-block animate-fade-in'>
              <span className='px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold uppercase tracking-wide'>
                Our Instructor
              </span>
            </div>

            <h2 className='text-3xl md:text-4xl lg:text-5xl font-black text-blue-900 leading-tight animate-slide-up'>
              Meet Our Expert
              <br />
              Instructor
            </h2>

            <p className='text-gray-600 text-base md:text-lg leading-relaxed animate-slide-up'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris...
            </p>

            <div className='flex flex-col sm:flex-row gap-4 pt-4 animate-slide-up'>
              <button className='group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold'>
                <span>Contact Us</span>
                <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
              </button>
              <button className='flex items-center justify-center gap-2 px-8 py-4 bg-blue-900 text-white rounded-full hover:bg-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold'>
                <span>Find Courses</span>
                <ArrowRight className='w-5 h-5' />
              </button>
            </div>
          </div>

          {/* Right - Instructors Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 order-1 lg:order-2'>
            {instructorsAdvanced.map(instructor => (
              <InstructorCardAdvanced
                key={instructor.id}
                instructor={instructor}
                isHovered={hoveredId === instructor.id}
                onHover={() => setHoveredId(instructor.id)}
                onLeave={() => setHoveredId(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Advanced Instructor Card
interface InstructorCardAdvancedProps {
  instructor: InstructorAdvanced;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function InstructorCardAdvanced({
  instructor,
  isHovered,
  onHover,
  onLeave,
}: InstructorCardAdvancedProps) {
  return (
    <div
      className={`
        group relative bg-white rounded-2xl overflow-hidden 
        border-4 ${instructor.borderColor} 
        shadow-lg hover:shadow-2xl 
        transition-all duration-300 hover:-translate-y-2
        ${isHovered ? "scale-105" : "scale-100"}
      `}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Share Button */}
      <button className='absolute top-4 right-4 z-10 p-2.5 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110'>
        <Share2 className='w-5 h-5' />
      </button>

      {/* Instructor Image */}
      <div className='relative h-72 sm:h-80 overflow-hidden'>
        <Image
          width={400}
          height={400}
          src={instructor.image}
          alt={instructor.name}
          className='w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500'
        />

        {/* Hover Overlay with Stats */}
        <div
          className={`
            absolute inset-0 bg-gradient-to-t from-blue-900/95 via-blue-900/80 to-transparent
            transition-opacity duration-300
            ${isHovered ? "opacity-100" : "opacity-0"}
          `}
        >
          <div className='absolute bottom-20 left-0 right-0 p-4 space-y-3'>
            <div className='flex items-center justify-between text-white'>
              <div className='flex items-center gap-2'>
                <Award className='w-5 h-5' />
                <span className='text-sm font-semibold'>{instructor.courses} Courses</span>
              </div>
              <div className='flex items-center gap-1'>
                <Star className='w-4 h-4 text-yellow-400 fill-yellow-400' />
                <span className='text-sm font-semibold'>{instructor.rating}</span>
              </div>
            </div>
            <div className='text-white text-sm font-semibold'>
              {instructor.students.toLocaleString()}+ Students
            </div>
          </div>
        </div>
      </div>

      {/* Instructor Info Card */}
      <div className='absolute bottom-4 left-4 right-4 bg-white rounded-xl p-4 shadow-lg'>
        <div className='flex items-center justify-between'>
          <div className='flex-1'>
            <h3 className='text-lg font-bold text-gray-900 mb-1'>{instructor.name}</h3>
            <p className='text-sm text-gray-500 font-medium'>{instructor.title}</p>
          </div>
          <div className='flex items-center justify-center w-10 h-10 bg-purple-50 rounded-lg'>
            <svg
              className='w-6 h-6 text-purple-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M14 5l7 7m0 0l-7 7m7-7H3'
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
