"use client";

import { ArrowRight, Pencil } from "lucide-react";
import CourseCard from "./CourseCard";

const courses = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80",
    category: "Digital Marketing",
    categoryColor: "bg-blue-900",
    rating: 4.5,
    reviewCount: "4.5k",
    price: 50.0,
    title: "It Statistics Data Science And Business Analysis",
    lessons: 10,
    duration: "19h 30m",
    students: "20+",
    instructor: {
      name: "Samantha",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Samantha",
    },
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80",
    category: "Social Marketing",
    categoryColor: "bg-purple-700",
    rating: 4.5,
    reviewCount: "4.5k",
    price: 50.0,
    title: "Beginner Adobe Illustrator For Graphic Design",
    lessons: 10,
    duration: "19h 30m",
    students: "20+",
    instructor: {
      name: "Charles",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charles",
    },
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&q=80",
    category: "Social Marketing",
    categoryColor: "bg-purple-700",
    rating: 4.5,
    reviewCount: "4.5k",
    price: 50.0,
    title: "Starting SEO As Your Home Based Business",
    lessons: 8,
    duration: "19h 30m",
    students: "20+",
    instructor: {
      name: "Morgan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan",
    },
  },
];

export default function PopularCoursesSection() {
  return (
    <section className='py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden'>
      {/* Decorative Pencil Icon */}
      <div className='absolute top-16 right-16 opacity-10'>
        <Pencil className='w-32 h-32 text-orange-400 rotate-12' />
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Section Header */}
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6'>
          <div>
            <div className='inline-block mb-4'>
              <span className='px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold uppercase tracking-wide'>
                Top Popular Course
              </span>
            </div>
            <h2 className='text-3xl md:text-4xl lg:text-5xl font-black text-blue-900'>
              Aloskill Course Student Can
              <br />
              Join With Us.
            </h2>
          </div>
          <button className='group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold'>
            <span>Load More Courses</span>
            <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
          </button>
        </div>

        {/* Courses Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {courses.map(course => (
            <CourseCard
              key={course.id}
              image={course.image}
              category={course.category}
              categoryColor={course.categoryColor}
              rating={course.rating}
              reviewCount={course.reviewCount}
              price={course.price}
              title={course.title}
              lessons={course.lessons}
              duration={course.duration}
              students={course.students}
              instructor={course.instructor}
              onEnroll={() => console.log(`Enrolling in: ${course.title}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
