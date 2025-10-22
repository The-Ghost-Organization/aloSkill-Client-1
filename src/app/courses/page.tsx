"use client";

import {
  Award,
  BarChart,
  BookOpen,
  CheckCircle2,
  Clock,
  Facebook,
  FileText,
  Globe,
  Linkedin,
  Play,
  Share2,
  Star,
  Twitter,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// Tab type
type TabType = "overview" | "curriculum" | "instructor" | "reviews";

export default function CourseDetailPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white'>
      {/* Breadcrumb */}
      <div className='bg-white border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <nav className='flex items-center gap-2 text-sm text-gray-600'>
            <a
              href='/'
              className='hover:text-orange-600 transition-colors'
            >
              Home
            </a>
            <span>›</span>
            <a
              href='/development'
              className='hover:text-orange-600 transition-colors'
            >
              Development
            </a>
            <span>›</span>
            <span className='text-gray-900 font-medium'>Web Development</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left Column - Main Content */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Course Header */}
            <div>
              <div className='flex items-center gap-2 mb-3'>
                <span className='px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-semibold uppercase'>
                  Best Seller
                </span>
              </div>
              <h1 className='text-2xl sm:text-3xl lg:text-4xl font-black text-blue-900 mb-4'>
                Complete Website Responsive Design: from Figma to Webflow to Website Design
              </h1>
              <p className='text-gray-600 mb-6'>
                A 10+ Course Learn to design websites with Figma, build with Webflow, and make a
                living freelancing.
              </p>

              {/* Instructor & Rating */}
              <div className='flex flex-wrap items-center gap-6 mb-4'>
                <div className='flex items-center gap-3'>
                  <div className='flex -space-x-2'>
                    <Image
                      src='https://api.dicebear.com/7.x/avataaars/svg?seed=Vako'
                      alt='Vako Shvili'
                      width={40}
                      height={40}
                      className='rounded-full border-2 border-white'
                    />
                    <Image
                      src='https://api.dicebear.com/7.x/avataaars/svg?seed=Arno'
                      alt='Arno Wilbur'
                      width={40}
                      height={40}
                      className='rounded-full border-2 border-white'
                    />
                  </div>
                  <div className='text-sm'>
                    <p className='font-semibold text-gray-900'>Vako Shvili • Arno Wilbur</p>
                  </div>
                </div>

                <div className='flex items-center gap-2'>
                  <div className='flex items-center'>
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        className='w-4 h-4 fill-orange-400 text-orange-400'
                      />
                    ))}
                  </div>
                  <span className='text-sm font-semibold text-gray-900'>4.9</span>
                  <span className='text-sm text-gray-500'>(451,444 Rating)</span>
                </div>
              </div>
            </div>

            {/* Course Preview Video */}
            <div className='relative rounded-2xl overflow-hidden shadow-xl'>
              <Image
                src='https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80'
                alt='Course preview'
                width={800}
                height={450}
                className='w-full h-auto'
              />
              <div className='absolute inset-0 bg-black/30 flex items-center justify-center'>
                <button className='w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform'>
                  <Play
                    className='w-8 h-8 text-orange-600 ml-1'
                    fill='currentColor'
                  />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className='bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden'>
              {/* Tab Headers */}
              <div className='flex border-b border-gray-200 overflow-x-auto'>
                {[
                  { id: "overview", label: "Overview" },
                  { id: "curriculum", label: "Curriculum" },
                  { id: "instructor", label: "Instructor" },
                  { id: "reviews", label: "Reviews" },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`px-6 py-4 font-semibold text-sm whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? "text-orange-600 border-b-2 border-orange-600 bg-orange-50/30"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className='p-6 sm:p-8'>
                {activeTab === "overview" && <OverviewTab />}
                {activeTab === "curriculum" && <CurriculumTab />}
                {activeTab === "instructor" && <InstructorTab />}
                {activeTab === "reviews" && <ReviewsTab />}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className='lg:col-span-1'>
            <div className='sticky top-24 space-y-6'>
              {/* Price Card */}
              <div className='bg-white rounded-2xl shadow-lg border border-gray-200 p-6'>
                <div className='flex items-baseline gap-3 mb-6'>
                  <span className='text-4xl font-black text-blue-900'>$14.00</span>
                  <span className='text-2xl text-gray-400 line-through'>$21.00</span>
                  <span className='px-2 py-1 bg-red-100 text-red-600 rounded text-xs font-bold'>
                    56% OFF
                  </span>
                </div>

                <button className='w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl mb-3'>
                  Add To Cart
                </button>

                <button className='w-full border-2 border-orange-600 text-orange-600 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all'>
                  Buy Now
                </button>

                {/* Course Features */}
                <div className='mt-6 pt-6 border-t border-gray-200 space-y-3'>
                  <div className='flex items-center gap-3 text-sm text-gray-700'>
                    <Clock className='w-5 h-5 text-orange-600' />
                    <span>Duration: 10h 30m</span>
                  </div>
                  <div className='flex items-center gap-3 text-sm text-gray-700'>
                    <BarChart className='w-5 h-5 text-orange-600' />
                    <span>Level: Beginner</span>
                  </div>
                  <div className='flex items-center gap-3 text-sm text-gray-700'>
                    <BookOpen className='w-5 h-5 text-orange-600' />
                    <span>20 Lessons</span>
                  </div>
                  <div className='flex items-center gap-3 text-sm text-gray-700'>
                    <Users className='w-5 h-5 text-orange-600' />
                    <span>Enrolled: 1,200 students</span>
                  </div>
                  <div className='flex items-center gap-3 text-sm text-gray-700'>
                    <Globe className='w-5 h-5 text-orange-600' />
                    <span>Language: English</span>
                  </div>
                  <div className='flex items-center gap-3 text-sm text-gray-700'>
                    <Award className='w-5 h-5 text-orange-600' />
                    <span>Certificate: Yes</span>
                  </div>
                </div>

                {/* Share */}
                <div className='mt-6 pt-6 border-t border-gray-200'>
                  <p className='text-sm font-semibold text-gray-700 mb-3'>Share this course:</p>
                  <div className='flex gap-2'>
                    <button className='p-2 border border-gray-300 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors'>
                      <Facebook className='w-5 h-5' />
                    </button>
                    <button className='p-2 border border-gray-300 rounded-lg hover:border-sky-500 hover:text-sky-500 transition-colors'>
                      <Twitter className='w-5 h-5' />
                    </button>
                    <button className='p-2 border border-gray-300 rounded-lg hover:border-blue-700 hover:text-blue-700 transition-colors'>
                      <Linkedin className='w-5 h-5' />
                    </button>
                    <button className='p-2 border border-gray-300 rounded-lg hover:border-orange-600 hover:text-orange-600 transition-colors'>
                      <Share2 className='w-5 h-5' />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Overview Tab Component
function OverviewTab() {
  return (
    <div className='space-y-8'>
      {/* Description */}
      <div>
        <h3 className='text-xl font-bold text-blue-900 mb-4'>Course Description</h3>
        <div className='prose prose-sm max-w-none text-gray-700 space-y-4'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>

      {/* What you will learn */}
      <div>
        <h3 className='text-xl font-bold text-blue-900 mb-4'>What you will learn in this course</h3>
        <div className='grid sm:grid-cols-2 gap-3'>
          {[
            "You will be able to start building websites from scratch",
            "You will learn all about HTML5, CSS3, JavaScript, and more",
            "Build responsive websites that work on all devices",
            "Learn best practices for modern web development",
            "Understand how to use Figma for web design",
            "Master Webflow for no-code development",
          ].map((item, index) => (
            <div
              key={index}
              className='flex items-start gap-3'
            >
              <CheckCircle2 className='w-5 h-5 text-green-500 flex-shrink-0 mt-0.5' />
              <span className='text-sm text-gray-700'>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Who this course is for */}
      <div>
        <h3 className='text-xl font-bold text-blue-900 mb-4'>Who this course is for:</h3>
        <ul className='space-y-2'>
          {[
            "This course is for anyone who wants to learn web design",
            "Freelancers and entrepreneurs who want to build their own websites",
            "Designers who want to learn how to code their designs",
            "Anyone interested in starting a career in web development",
          ].map((item, index) => (
            <li
              key={index}
              className='flex items-start gap-3'
            >
              <span className='text-orange-600 font-bold mt-1'>•</span>
              <span className='text-sm text-gray-700'>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Course requirements */}
      <div>
        <h3 className='text-xl font-bold text-blue-900 mb-4'>Course requirements</h3>
        <ul className='space-y-2'>
          {[
            "A computer with internet connection",
            "No prior coding experience is required",
            "Basic understanding of how to use a computer",
            "Passion and willingness to learn web design",
          ].map((item, index) => (
            <li
              key={index}
              className='flex items-start gap-3'
            >
              <FileText className='w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5' />
              <span className='text-sm text-gray-700'>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Curriculum Tab Component
function CurriculumTab() {
  const sections = [
    {
      title: "Introduction to Web Design",
      lessons: 5,
      duration: "1h 30m",
      lectures: [
        { title: "Welcome to the course", duration: "10:00", free: true },
        { title: "What is web design?", duration: "15:00", free: false },
        { title: "Tools we'll be using", duration: "20:00", free: false },
        { title: "Setting up your workspace", duration: "25:00", free: false },
        { title: "Your first design project", duration: "20:00", free: false },
      ],
    },
    {
      title: "Figma Fundamentals",
      lessons: 8,
      duration: "2h 45m",
      lectures: [
        { title: "Introduction to Figma", duration: "15:00", free: false },
        { title: "Understanding frames and layers", duration: "20:00", free: false },
        { title: "Working with components", duration: "25:00", free: false },
      ],
    },
  ];

  return (
    <div className='space-y-4'>
      {sections.map((section, index) => (
        <details
          key={index}
          className='group border border-gray-200 rounded-xl overflow-hidden'
        >
          <summary className='flex items-center justify-between p-5 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors'>
            <div>
              <h4 className='font-bold text-blue-900'>{section.title}</h4>
              <p className='text-sm text-gray-600 mt-1'>
                {section.lessons} lessons • {section.duration}
              </p>
            </div>
            <Play className='w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform' />
          </summary>
          <div className='p-5 pt-0 space-y-2'>
            {section.lectures.map((lecture, idx) => (
              <div
                key={idx}
                className='flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors'
              >
                <div className='flex items-center gap-3'>
                  <Play className='w-4 h-4 text-orange-600' />
                  <span className='text-sm text-gray-700'>{lecture.title}</span>
                  {lecture.free && (
                    <span className='px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded'>
                      Free
                    </span>
                  )}
                </div>
                <span className='text-sm text-gray-500'>{lecture.duration}</span>
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}

// Instructor Tab Component
function InstructorTab() {
  return (
    <div className='space-y-6'>
      <div className='flex flex-col sm:flex-row gap-6'>
        <Image
          src='https://api.dicebear.com/7.x/avataaars/svg?seed=Vako'
          alt='Vako Shvili'
          width={120}
          height={120}
          className='rounded-full border-4 border-orange-100'
        />
        <div>
          <h3 className='text-2xl font-bold text-blue-900 mb-2'>Vako Shvili</h3>
          <p className='text-orange-600 font-semibold mb-4'>Senior Web Designer & Developer</p>
          <div className='flex flex-wrap gap-4 mb-4'>
            <div className='flex items-center gap-2'>
              <Users className='w-4 h-4 text-gray-500' />
              <span className='text-sm text-gray-700'>45,000 Students</span>
            </div>
            <div className='flex items-center gap-2'>
              <BookOpen className='w-4 h-4 text-gray-500' />
              <span className='text-sm text-gray-700'>12 Courses</span>
            </div>
            <div className='flex items-center gap-2'>
              <Star className='w-4 h-4 text-orange-400' />
              <span className='text-sm text-gray-700'>4.9 Rating</span>
            </div>
          </div>
          <p className='text-gray-700 text-sm leading-relaxed'>
            Vako is a professional web designer and developer with over 10 years of experience. He
            has worked with numerous clients worldwide and taught thousands of students the art of
            web design.
          </p>
        </div>
      </div>
    </div>
  );
}

// Reviews Tab Component
function ReviewsTab() {
  const reviews = [
    {
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      rating: 5,
      date: "2 days ago",
      comment:
        "Excellent course! Very well structured and easy to follow. The instructor explains everything clearly.",
    },
    {
      name: "Mike Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      rating: 5,
      date: "1 week ago",
      comment:
        "Best web design course I've taken. Highly recommended for beginners and intermediate learners.",
    },
  ];

  return (
    <div className='space-y-6'>
      <div className='bg-orange-50 rounded-xl p-6'>
        <div className='flex items-center gap-4 mb-2'>
          <span className='text-5xl font-black text-blue-900'>4.9</span>
          <div>
            <div className='flex items-center mb-1'>
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  className='w-5 h-5 fill-orange-400 text-orange-400'
                />
              ))}
            </div>
            <p className='text-sm text-gray-600'>Based on 451,444 reviews</p>
          </div>
        </div>
      </div>

      <div className='space-y-4'>
        {reviews.map((review, index) => (
          <div
            key={index}
            className='border border-gray-200 rounded-xl p-5'
          >
            <div className='flex items-start gap-4'>
              <Image
                src={review.avatar}
                alt={review.name}
                width={48}
                height={48}
                className='rounded-full'
              />
              <div className='flex-1'>
                <div className='flex items-center justify-between mb-2'>
                  <h4 className='font-bold text-gray-900'>{review.name}</h4>
                  <span className='text-xs text-gray-500'>{review.date}</span>
                </div>
                <div className='flex items-center mb-2'>
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating ? "fill-orange-400 text-orange-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className='text-sm text-gray-700'>{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
