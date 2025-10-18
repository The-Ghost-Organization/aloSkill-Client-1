"use client";

import { ArrowRight, BookOpen, Clock, Star, Users } from "lucide-react";
import Image from "next/image";

interface CourseCardProps {
  image: string;
  category: string;
  categoryColor?: string;
  rating: number;
  reviewCount: string;
  price: number;
  title: string;
  lessons: number;
  duration: string;
  students: string;
  instructor: {
    name: string;
    avatar: string;
  };
  onEnroll?: () => void;
}

export default function CourseCard({
  image,
  category,
  categoryColor = "bg-blue-900",
  rating,
  reviewCount,
  price,
  title,
  lessons,
  duration,
  students,
  instructor,
  onEnroll,
}: CourseCardProps) {
  return (
    <div className='w-full max-w-md bg-white rounded-3xl overflow-hidden border-2 border-dashed border-orange-300 p-4 hover:shadow-2xl transition-all duration-300'>
      {/* Course Image */}
      <div className='relative rounded-2xl overflow-hidden mb-6'>
        <Image
          width={400}
          height={256}
          src={image}
          alt={title}
          className='w-full h-64 object-cover'
        />
        {/* Category Badge */}
        <div className='absolute bottom-4 left-4'>
          <span
            className={`${categoryColor} text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg`}
          >
            {category}
          </span>
        </div>
      </div>

      {/* Rating and Price */}
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-0.5'>
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`w-5 h-5 ${
                  index < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className='text-gray-700 font-semibold text-base'>{rating}k</span>
        </div>
        <span className='text-orange-500 text-xl font-bold'>${price.toFixed(2)}</span>
      </div>

      {/* Course Title */}
      <h3 className='text-2xl font-bold text-blue-900 mb-6 leading-tight'>{title}</h3>

      {/* Course Meta Info */}
      <div className='flex items-center gap-6 mb-6 text-gray-600'>
        <div className='flex items-center gap-2'>
          <BookOpen className='w-5 h-5 text-gray-700' />
          <span className='text-sm font-medium'>Lesson {lessons}</span>
        </div>
        <div className='flex items-center gap-2'>
          <Clock className='w-5 h-5 text-gray-700' />
          <span className='text-sm font-medium'>{duration}</span>
        </div>
        <div className='flex items-center gap-2'>
          <Users className='w-5 h-5 text-gray-700' />
          <span className='text-sm font-medium'>Students {students}</span>
        </div>
      </div>

      {/* Instructor and Enroll Button */}
      <div className='flex items-center justify-between pt-4 border-t-2 border-gray-100'>
        <div className='flex items-center gap-3'>
          <Image
            width={48}
            height={48}
            src={instructor.avatar}
            alt={instructor.name}
            className='w-12 h-12 rounded-full object-cover border-2 border-orange-100'
          />
          <span className='text-base font-bold text-gray-800'>{instructor.name}</span>
        </div>
        <button
          onClick={onEnroll}
          className='group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold'
        >
          <span>Enroll</span>
          <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
        </button>
      </div>
    </div>
  );
}
