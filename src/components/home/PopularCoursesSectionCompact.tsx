"use client";

import { ArrowRight, BookOpen, Clock, Pencil, Star, Users } from "lucide-react";
import Image from "next/image";

export function PopularCoursesSectionCompact() {
  return (
    <section className='py-20 bg-gray-50 relative overflow-hidden'>
      {/* Decorative Pencil Icon */}
      <div className='absolute top-20 right-20 opacity-20'>
        <Pencil className='w-32 h-32 text-orange-400 rotate-12' />
      </div>

      <div className='max-w-7xl mx-auto px-4'>
        {/* Header */}
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between mb-12'>
          <div>
            <span className='inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-xs font-bold uppercase mb-4'>
              Top Popular Course
            </span>
            <h2 className='text-4xl md:text-5xl font-black text-blue-900 leading-tight'>
              Aloskill Course Student Can
              <br />
              Join With Us.
            </h2>
          </div>
          <button className='mt-6 md:mt-0 flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all font-semibold shadow-lg'>
            Load More Courses
            <ArrowRight className='w-5 h-5' />
          </button>
        </div>

        {/* Courses Grid */}
        <div className='grid md:grid-cols-3 gap-6'>
          {/* Course 1 */}
          <div className='bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1'>
            <div className='relative h-48'>
              <Image
                width={200}
                height={200}
                src='https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500'
                alt='Course'
                className='w-full h-full object-cover'
              />
              <span className='absolute bottom-3 left-3 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-semibold'>
                Digital Marketing
              </span>
            </div>
            <div className='p-5 space-y-3'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-1'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className='w-4 h-4 text-yellow-400 fill-yellow-400'
                    />
                  ))}
                  <span className='text-sm font-semibold ml-1'>4.5</span>
                </div>
                <span className='text-orange-600 font-bold text-lg'>$57.00</span>
              </div>
              <h3 className='text-lg font-bold text-gray-900 line-clamp-2'>
                It Statistics Data Science And Business Analysis
              </h3>
              <div className='flex items-center gap-3 text-xs text-gray-600 pt-2 border-t'>
                <span className='flex items-center gap-1'>
                  <BookOpen className='w-3.5 h-3.5' /> 6 Lesson
                </span>
                <span className='flex items-center gap-1'>
                  <Clock className='w-3.5 h-3.5' /> 19h 30m
                </span>
                <span className='flex items-center gap-1'>
                  <Users className='w-3.5 h-3.5' /> 20+
                </span>
              </div>
              <div className='flex items-center justify-between pt-3 border-t'>
                <div className='flex items-center gap-2'>
                  <div className='w-8 h-8 rounded-full bg-gray-200'></div>
                  <span className='text-sm font-semibold'>Samantha</span>
                </div>
                <button className='px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 text-sm font-semibold'>
                  Enroll
                </button>
              </div>
            </div>
          </div>

          {/* Course 2 */}
          <div className='bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1'>
            <div className='relative h-48'>
              <Image
                width={200}
                height={200}
                src='https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500'
                alt='Course'
                className='w-full h-full object-cover'
              />
              <span className='absolute bottom-3 left-3 px-3 py-1.5 bg-purple-600 text-white rounded-lg text-sm font-semibold'>
                Social Marketing
              </span>
            </div>
            <div className='p-5 space-y-3'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-1'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className='w-4 h-4 text-yellow-400 fill-yellow-400'
                    />
                  ))}
                  <span className='text-sm font-semibold ml-1'>4.5</span>
                </div>
                <span className='text-orange-600 font-bold text-lg'>$57.00</span>
              </div>
              <h3 className='text-lg font-bold text-gray-900 line-clamp-2'>
                Beginner Adobe Illustrator For Graphic Design
              </h3>
              <div className='flex items-center gap-3 text-xs text-gray-600 pt-2 border-t'>
                <span className='flex items-center gap-1'>
                  <BookOpen className='w-3.5 h-3.5' /> 10 Lesson
                </span>
                <span className='flex items-center gap-1'>
                  <Clock className='w-3.5 h-3.5' /> 19h 30m
                </span>
                <span className='flex items-center gap-1'>
                  <Users className='w-3.5 h-3.5' /> 20+
                </span>
              </div>
              <div className='flex items-center justify-between pt-3 border-t'>
                <div className='flex items-center gap-2'>
                  <div className='w-8 h-8 rounded-full bg-gray-200'></div>
                  <span className='text-sm font-semibold'>Charles</span>
                </div>
                <button className='px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 text-sm font-semibold'>
                  Enroll
                </button>
              </div>
            </div>
          </div>

          {/* Course 3 */}
          <div className='bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1'>
            <div className='relative h-48'>
              <Image
                width={200}
                height={200}
                src='https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500'
                alt='Course'
                className='w-full h-full object-cover'
              />
              <span className='absolute bottom-3 left-3 px-3 py-1.5 bg-purple-600 text-white rounded-lg text-sm font-semibold'>
                Social Marketing
              </span>
            </div>
            <div className='p-5 space-y-3'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-1'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className='w-4 h-4 text-yellow-400 fill-yellow-400'
                    />
                  ))}
                  <span className='text-sm font-semibold ml-1'>4.5</span>
                </div>
                <span className='text-orange-600 font-bold text-lg'>$57.00</span>
              </div>
              <h3 className='text-lg font-bold text-gray-900 line-clamp-2'>
                Starting SEO As Your Home Based Business
              </h3>
              <div className='flex items-center gap-3 text-xs text-gray-600 pt-2 border-t'>
                <span className='flex items-center gap-1'>
                  <BookOpen className='w-3.5 h-3.5' /> 8 Lesson
                </span>
                <span className='flex items-center gap-1'>
                  <Clock className='w-3.5 h-3.5' /> 19h 30m
                </span>
                <span className='flex items-center gap-1'>
                  <Users className='w-3.5 h-3.5' /> 20+
                </span>
              </div>
              <div className='flex items-center justify-between pt-3 border-t'>
                <div className='flex items-center gap-2'>
                  <div className='w-8 h-8 rounded-full bg-gray-200'></div>
                  <span className='text-sm font-semibold'>Morgan</span>
                </div>
                <button className='px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 text-sm font-semibold'>
                  Enroll
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
