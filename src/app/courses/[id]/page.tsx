// "use client";

// import {
//   Award,
//   BarChart,
//   BookOpen,
//   CheckCircle2,
//   Clock,
//   Facebook,
//   FileText,
//   Globe,
//   Linkedin,
//   Play,
//   Share2,
//   Star,
//   Twitter,
//   Users,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useState } from "react";

// // Tab type
// type TabType = "overview" | "curriculum" | "instructor" | "reviews";

// // Mock course data (replace with actual API call)
// const getCourseData = (id: string) => {
//   // This would normally fetch from your database/API
//   return {
//     id,
//     title: "Complete Website Responsive Design: from Figma to Webflow to Website Design",
//     description:
//       "A 10+ Course Learn to design websites with Figma, build with Webflow, and make a living freelancing.",
//     image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
//     category: "Digital Marketing",
//     categoryColor: "bg-blue-900",
//     rating: 4.9,
//     reviewCount: "451,444",
//     price: 14.0,
//     originalPrice: 21.0,
//     discount: 56,
//     lessons: 20,
//     duration: "10h 30m",
//     students: "1,200",
//     level: "Beginner",
//     language: "English",
//     certificate: true,
//     instructors: [
//       {
//         name: "Vako Shvili",
//         avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vako",
//         title: "Senior Web Designer & Developer",
//         students: 45000,
//         courses: 12,
//         rating: 4.9,
//       },
//       {
//         name: "Arno Wilbur",
//         avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arno",
//         title: "Full Stack Developer",
//         students: 30000,
//         courses: 8,
//         rating: 4.8,
//       },
//     ],
//   };
// };

// export default function CourseDetailPage() {
//   const params = useParams();
//   const courseId = params["id"] as string;
//   const course = getCourseData(courseId);

//   const [activeTab, setActiveTab] = useState<TabType>("overview");

//   return (
//     <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white'>
//       {/* Breadcrumb */}
//       <div className='bg-white border-b border-gray-200'>
//         <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
//           <nav className='flex items-center gap-2 text-sm text-gray-600'>
//             <Link
//               href='/'
//               className='hover:text-orange-600 transition-colors'
//             >
//               Home
//             </Link>
//             <span>›</span>
//             <a
//               href='/courses'
//               className='hover:text-orange-600 transition-colors'
//             >
//               Courses
//             </a>
//             <span>›</span>
//             <span className='text-gray-900 font-medium line-clamp-1'>{course.title}</span>
//           </nav>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
//         <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
//           {/* Left Column - Main Content */}
//           <div className='lg:col-span-2 space-y-8'>
//             {/* Course Header */}
//             <div>
//               <div className='flex items-center gap-2 mb-3'>
//                 <span className='px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-semibold uppercase'>
//                   Best Seller
//                 </span>
//               </div>
//               <h1 className='text-2xl sm:text-3xl lg:text-4xl font-black text-blue-900 mb-4'>
//                 {course.title}
//               </h1>
//               <p className='text-gray-600 mb-6'>{course.description}</p>

//               {/* Instructor & Rating */}
//               <div className='flex flex-wrap items-center gap-6 mb-4'>
//                 <div className='flex items-center gap-3'>
//                   <div className='flex -space-x-2'>
//                     {course.instructors.map((instructor, idx) => (
//                       <Image
//                         key={idx}
//                         src={instructor.avatar}
//                         alt={instructor.name}
//                         width={40}
//                         height={40}
//                         className='rounded-full border-2 border-white'
//                       />
//                     ))}
//                   </div>
//                   <div className='text-sm'>
//                     <p className='font-semibold text-gray-900'>
//                       {course.instructors.map(i => i.name).join(" • ")}
//                     </p>
//                   </div>
//                 </div>

//                 <div className='flex items-center gap-2'>
//                   <div className='flex items-center'>
//                     {[1, 2, 3, 4, 5].map(star => (
//                       <Star
//                         key={star}
//                         className='w-4 h-4 fill-orange-400 text-orange-400'
//                       />
//                     ))}
//                   </div>
//                   <span className='text-sm font-semibold text-gray-900'>{course.rating}</span>
//                   <span className='text-sm text-gray-500'>({course.reviewCount} Rating)</span>
//                 </div>
//               </div>
//             </div>

//             {/* Course Preview Video */}
//             <div className='relative rounded-2xl overflow-hidden shadow-xl'>
//               <Image
//                 src={course.image}
//                 alt='Course preview'
//                 width={800}
//                 height={450}
//                 className='w-full h-auto'
//               />
//               <div className='absolute inset-0 bg-black/30 flex items-center justify-center'>
//                 <button className='w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform'>
//                   <Play
//                     className='w-8 h-8 text-orange-600 ml-1'
//                     fill='currentColor'
//                   />
//                 </button>
//               </div>
//             </div>

//             {/* Tabs */}
//             <div className='bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden'>
//               {/* Tab Headers */}
//               <div className='flex border-b border-gray-200 overflow-x-auto'>
//                 {[
//                   { id: "overview", label: "Overview" },
//                   { id: "curriculum", label: "Curriculum" },
//                   { id: "instructor", label: "Instructor" },
//                   { id: "reviews", label: "Reviews" },
//                 ].map(tab => (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id as TabType)}
//                     className={`px-6 py-4 font-semibold text-sm whitespace-nowrap transition-colors ${
//                       activeTab === tab.id
//                         ? "text-orange-600 border-b-2 border-orange-600 bg-orange-50/30"
//                         : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
//                     }`}
//                   >
//                     {tab.label}
//                   </button>
//                 ))}
//               </div>

//               {/* Tab Content */}
//               <div className='p-6 sm:p-8'>
//                 {activeTab === "overview" && <OverviewTab />}
//                 {activeTab === "curriculum" && <CurriculumTab />}
//                 {activeTab === "instructor" && <InstructorTab instructors={course.instructors} />}
//                 {activeTab === "reviews" && <ReviewsTab />}
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Sidebar */}
//           <div className='lg:col-span-1'>
//             <div className='sticky top-24 space-y-6'>
//               {/* Price Card */}
//               <div className='bg-white rounded-2xl shadow-lg border border-gray-200 p-6'>
//                 <div className='flex items-baseline gap-3 mb-6'>
//                   <span className='text-4xl font-black text-blue-900'>
//                     ${course.price.toFixed(2)}
//                   </span>
//                   <span className='text-2xl text-gray-400 line-through'>
//                     ${course.originalPrice.toFixed(2)}
//                   </span>
//                   <span className='px-2 py-1 bg-red-100 text-red-600 rounded text-xs font-bold'>
//                     {course.discount}% OFF
//                   </span>
//                 </div>

//                 <button className='w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl mb-3'>
//                   Add To Cart
//                 </button>

//                 <button className='w-full border-2 border-orange-600 text-orange-600 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all'>
//                   Buy Now
//                 </button>

//                 {/* Course Features */}
//                 <div className='mt-6 pt-6 border-t border-gray-200 space-y-3'>
//                   <div className='flex items-center gap-3 text-sm text-gray-700'>
//                     <Clock className='w-5 h-5 text-orange-600' />
//                     <span>Duration: {course.duration}</span>
//                   </div>
//                   <div className='flex items-center gap-3 text-sm text-gray-700'>
//                     <BarChart className='w-5 h-5 text-orange-600' />
//                     <span>Level: {course.level}</span>
//                   </div>
//                   <div className='flex items-center gap-3 text-sm text-gray-700'>
//                     <BookOpen className='w-5 h-5 text-orange-600' />
//                     <span>{course.lessons} Lessons</span>
//                   </div>
//                   <div className='flex items-center gap-3 text-sm text-gray-700'>
//                     <Users className='w-5 h-5 text-orange-600' />
//                     <span>Enrolled: {course.students} students</span>
//                   </div>
//                   <div className='flex items-center gap-3 text-sm text-gray-700'>
//                     <Globe className='w-5 h-5 text-orange-600' />
//                     <span>Language: {course.language}</span>
//                   </div>
//                   <div className='flex items-center gap-3 text-sm text-gray-700'>
//                     <Award className='w-5 h-5 text-orange-600' />
//                     <span>Certificate: {course.certificate ? "Yes" : "No"}</span>
//                   </div>
//                 </div>

//                 {/* Share */}
//                 <div className='mt-6 pt-6 border-t border-gray-200'>
//                   <p className='text-sm font-semibold text-gray-700 mb-3'>Share this course:</p>
//                   <div className='flex gap-2'>
//                     <button className='p-2 border border-gray-300 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors'>
//                       <Facebook className='w-5 h-5' />
//                     </button>
//                     <button className='p-2 border border-gray-300 rounded-lg hover:border-sky-500 hover:text-sky-500 transition-colors'>
//                       <Twitter className='w-5 h-5' />
//                     </button>
//                     <button className='p-2 border border-gray-300 rounded-lg hover:border-blue-700 hover:text-blue-700 transition-colors'>
//                       <Linkedin className='w-5 h-5' />
//                     </button>
//                     <button className='p-2 border border-gray-300 rounded-lg hover:border-orange-600 hover:text-orange-600 transition-colors'>
//                       <Share2 className='w-5 h-5' />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Overview Tab Component
// function OverviewTab() {
//   return (
//     <div className='space-y-8'>
//       {/* Description */}
//       <div>
//         <h3 className='text-xl font-bold text-blue-900 mb-4'>Course Description</h3>
//         <div className='prose prose-sm max-w-none text-gray-700 space-y-4'>
//           <p>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
//             incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
//             exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
//           </p>
//           <p>
//             Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
//             nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
//             officia deserunt mollit anim id est laborum.
//           </p>
//         </div>
//       </div>

//       {/* What you will learn */}
//       <div>
//         <h3 className='text-xl font-bold text-blue-900 mb-4'>What you will learn in this course</h3>
//         <div className='grid sm:grid-cols-2 gap-3'>
//           {[
//             "You will be able to start building websites from scratch",
//             "You will learn all about HTML5, CSS3, JavaScript, and more",
//             "Build responsive websites that work on all devices",
//             "Learn best practices for modern web development",
//             "Understand how to use Figma for web design",
//             "Master Webflow for no-code development",
//           ].map((item, index) => (
//             <div
//               key={index}
//               className='flex items-start gap-3'
//             >
//               <CheckCircle2 className='w-5 h-5 text-green-500 flex-shrink-0 mt-0.5' />
//               <span className='text-sm text-gray-700'>{item}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Who this course is for */}
//       <div>
//         <h3 className='text-xl font-bold text-blue-900 mb-4'>Who this course is for:</h3>
//         <ul className='space-y-2'>
//           {[
//             "This course is for anyone who wants to learn web design",
//             "Freelancers and entrepreneurs who want to build their own websites",
//             "Designers who want to learn how to code their designs",
//             "Anyone interested in starting a career in web development",
//           ].map((item, index) => (
//             <li
//               key={index}
//               className='flex items-start gap-3'
//             >
//               <span className='text-orange-600 font-bold mt-1'>•</span>
//               <span className='text-sm text-gray-700'>{item}</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Course requirements */}
//       <div>
//         <h3 className='text-xl font-bold text-blue-900 mb-4'>Course requirements</h3>
//         <ul className='space-y-2'>
//           {[
//             "A computer with internet connection",
//             "No prior coding experience is required",
//             "Basic understanding of how to use a computer",
//             "Passion and willingness to learn web design",
//           ].map((item, index) => (
//             <li
//               key={index}
//               className='flex items-start gap-3'
//             >
//               <FileText className='w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5' />
//               <span className='text-sm text-gray-700'>{item}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// // Curriculum Tab Component
// function CurriculumTab() {
//   const sections = [
//     {
//       title: "Introduction to Web Design",
//       lessons: 5,
//       duration: "1h 30m",
//       lectures: [
//         { title: "Welcome to the course", duration: "10:00", free: true },
//         { title: "What is web design?", duration: "15:00", free: false },
//         { title: "Tools we'll be using", duration: "20:00", free: false },
//         { title: "Setting up your workspace", duration: "25:00", free: false },
//         { title: "Your first design project", duration: "20:00", free: false },
//       ],
//     },
//     {
//       title: "Figma Fundamentals",
//       lessons: 8,
//       duration: "2h 45m",
//       lectures: [
//         { title: "Introduction to Figma", duration: "15:00", free: false },
//         { title: "Understanding frames and layers", duration: "20:00", free: false },
//         { title: "Working with components", duration: "25:00", free: false },
//       ],
//     },
//   ];

//   return (
//     <div className='space-y-4'>
//       {sections.map((section, index) => (
//         <details
//           key={index}
//           className='group border border-gray-200 rounded-xl overflow-hidden'
//         >
//           <summary className='flex items-center justify-between p-5 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors'>
//             <div>
//               <h4 className='font-bold text-blue-900'>{section.title}</h4>
//               <p className='text-sm text-gray-600 mt-1'>
//                 {section.lessons} lessons • {section.duration}
//               </p>
//             </div>
//             <Play className='w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform' />
//           </summary>
//           <div className='p-5 pt-0 space-y-2'>
//             {section.lectures.map((lecture, idx) => (
//               <div
//                 key={idx}
//                 className='flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors'
//               >
//                 <div className='flex items-center gap-3'>
//                   <Play className='w-4 h-4 text-orange-600' />
//                   <span className='text-sm text-gray-700'>{lecture.title}</span>
//                   {lecture.free && (
//                     <span className='px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded'>
//                       Free
//                     </span>
//                   )}
//                 </div>
//                 <span className='text-sm text-gray-500'>{lecture.duration}</span>
//               </div>
//             ))}
//           </div>
//         </details>
//       ))}
//     </div>
//   );
// }

// // Instructor Tab Component
// function InstructorTab({ instructors }: { instructors: any[] }) {
//   return (
//     <div className='space-y-8'>
//       {instructors.map((instructor, idx) => (
//         <div
//           key={idx}
//           className='flex flex-col sm:flex-row gap-6'
//         >
//           <Image
//             src={instructor.avatar}
//             alt={instructor.name}
//             width={120}
//             height={120}
//             className='rounded-full border-4 border-orange-100'
//           />
//           <div>
//             <h3 className='text-2xl font-bold text-blue-900 mb-2'>{instructor.name}</h3>
//             <p className='text-orange-600 font-semibold mb-4'>{instructor.title}</p>
//             <div className='flex flex-wrap gap-4 mb-4'>
//               <div className='flex items-center gap-2'>
//                 <Users className='w-4 h-4 text-gray-500' />
//                 <span className='text-sm text-gray-700'>
//                   {instructor.students.toLocaleString()} Students
//                 </span>
//               </div>
//               <div className='flex items-center gap-2'>
//                 <BookOpen className='w-4 h-4 text-gray-500' />
//                 <span className='text-sm text-gray-700'>{instructor.courses} Courses</span>
//               </div>
//               <div className='flex items-center gap-2'>
//                 <Star className='w-4 h-4 text-orange-400' />
//                 <span className='text-sm text-gray-700'>{instructor.rating} Rating</span>
//               </div>
//             </div>
//             <p className='text-gray-700 text-sm leading-relaxed'>
//               {instructor.name} is a professional web designer and developer with over 10 years of
//               experience. They have worked with numerous clients worldwide and taught thousands of
//               students.
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// // Reviews Tab Component
// function ReviewsTab() {
//   const reviews = [
//     {
//       name: "Sarah Johnson",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
//       rating: 5,
//       date: "2 days ago",
//       comment:
//         "Excellent course! Very well structured and easy to follow. The instructor explains everything clearly.",
//     },
//     {
//       name: "Mike Chen",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
//       rating: 5,
//       date: "1 week ago",
//       comment:
//         "Best web design course I've taken. Highly recommended for beginners and intermediate learners.",
//     },
//   ];

//   return (
//     <div className='space-y-6'>
//       <div className='bg-orange-50 rounded-xl p-6'>
//         <div className='flex items-center gap-4 mb-2'>
//           <span className='text-5xl font-black text-blue-900'>4.9</span>
//           <div>
//             <div className='flex items-center mb-1'>
//               {[1, 2, 3, 4, 5].map(star => (
//                 <Star
//                   key={star}
//                   className='w-5 h-5 fill-orange-400 text-orange-400'
//                 />
//               ))}
//             </div>
//             <p className='text-sm text-gray-600'>Based on 451,444 reviews</p>
//           </div>
//         </div>
//       </div>

//       <div className='space-y-4'>
//         {reviews.map((review, index) => (
//           <div
//             key={index}
//             className='border border-gray-200 rounded-xl p-5'
//           >
//             <div className='flex items-start gap-4'>
//               <Image
//                 src={review.avatar}
//                 alt={review.name}
//                 width={48}
//                 height={48}
//                 className='rounded-full'
//               />
//               <div className='flex-1'>
//                 <div className='flex items-center justify-between mb-2'>
//                   <h4 className='font-bold text-gray-900'>{review.name}</h4>
//                   <span className='text-xs text-gray-500'>{review.date}</span>
//                 </div>
//                 <div className='flex items-center mb-2'>
//                   {[1, 2, 3, 4, 5].map(star => (
//                     <Star
//                       key={star}
//                       className={`w-4 h-4 ${
//                         star <= review.rating ? "fill-orange-400 text-orange-400" : "text-gray-300"
//                       }`}
//                     />
//                   ))}
//                 </div>
//                 <p className='text-sm text-gray-700'>{review.comment}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import {
  Award,
  BarChart,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Facebook,
  FileText,
  Globe,
  Linkedin,
  Play,
  Share2,
  Star,
  Trophy,
  Twitter,
  Users,
  Video,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

// Types
interface Lecture {
  id: string | number;
  title: string;
  duration: string;
  isFree: boolean;
  isCompleted?: boolean;
}

interface Module {
  id: string | number;
  title: string;
  description?: string;
  lectures: Lecture[];
  totalDuration: string;
  lectureCount: number;
}

interface Instructor {
  id: string | number;
  name: string;
  title: string;
  avatar: string;
  bio: string;
  students: number;
  courses: number;
  rating: number;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
}

// Mock data - Replace with API call
const getCourseData = (id: string) => {
  return {
    id,
    title: "Full Stack Web Development with PHP, Laravel & Vue Js",
    subtitle: "এই কোর্স এ সম্পূর্ণ",
    badge: "সর্বমোট বিক্রিত কোর্স",
    description:
      "PHP Laravel Vue JS দিয়ে করুন ওয়েব ডেভলপমেন্ট যা ক্যারিয়ার হিসাবে তার চেয়ে আরো বেশি করতে পারেন.",
    fullDescription:
      "এই প্রোগ্রামিং কোর্স টি একদম শূন্য থেকে শুরু করে প্রফেশনাল লেভেল পর্যন্ত শিখানো হবে। আপনি এই কোর্সটি করার পর PHP, OOP, HTML, CSS, JavaScript, Laravel, ReactJS এর উপর বেশ ভালো দক্ষতা অর্জন করবেন।",
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    videoPreview: "https://www.youtube.com/watch?v=example",
    price: 1000,
    originalPrice: 2000,
    currency: "৳",
    discount: 50,
    rating: 4.9,
    reviewCount: "১,৫০০",
    enrolled: "৩,২৫০",
    duration: "৫০ ঘন্টা",
    lectures: 120,
    level: "সকল লেভেল",
    language: "বাংলা",
    lastUpdated: "জানুয়ারি ২০২৫",
    category: "ওয়েব ডেভেলপমেন্ট",

    // Course highlights
    highlights: [
      "প্রকল্প ভিত্তিক শিক্ষা",
      "লাইফটাইম এক্সেস",
      "সার্টিফিকেট প্রদান",
      "জব সাপোর্ট প্রদান",
    ],

    // What you'll learn
    learningOutcomes: [
      "PHP এর বেসিক থেকে এডভান্স লেভেল পর্যন্ত শিখবেন",
      "Laravel Framework দিয়ে প্রফেশনাল ওয়েব এপ্লিকেশন তৈরি করবেন",
      "Vue.js দিয়ে মডার্ন ফ্রন্টএন্ড ডেভেলপমেন্ট শিখবেন",
      "Database Design এবং MySQL এর কাজ শিখবেন",
      "RESTful API তৈরি এবং ব্যবহার করা শিখবেন",
      "Git এবং GitHub ব্যবহার করে প্রজেক্ট ম্যানেজমেন্ট",
    ],

    // Requirements
    requirements: [
      "কম্পিউটার এবং ইন্টারনেট সংযোগ",
      "প্রোগ্রামিং এর প্রাথমিক ধারণা থাকলে ভালো (অপশনাল)",
      "শেখার আগ্রহ এবং নিয়মিত অনুশীলন করার মানসিকতা",
    ],

    // Target audience
    targetAudience: [
      "যারা ওয়েব ডেভেলপমেন্ট শিখতে চান",
      "ফ্রিল্যান্সিং ক্যারিয়ার শুরু করতে ইচ্ছুক",
      "চাকরি পেতে নিজের স্কিল বাড়াতে চান",
      "নিজের আইডিয়া নিজে বাস্তবায়ন করতে চান",
    ],

    // Course modules/curriculum
    modules: [
      {
        id: "module-1",
        title: "PHP প্রোগ্রামিং (Module 0-5)",
        description: "PHP এর বেসিক থেকে এডভান্স পর্যন্ত শিখুন",
        lectureCount: 25,
        totalDuration: "৮ ঘন্টা",
        lectures: [
          {
            id: "1-1",
            title: "পার্ট ১ - পিএইচপি ইনস্টল ও সেটাপ শুরু করুন",
            duration: "১৫ মিনিট",
            isFree: true,
          },
          {
            id: "1-2",
            title: "Start With PHP And Visual Studio Code",
            duration: "২০ মিনিট",
            isFree: true,
          },
          {
            id: "1-3",
            title: "PHP loop & Function",
            duration: "৩০ মিনিট",
            isFree: false,
          },
          {
            id: "1-4",
            title: "PHP Object Oriented Programming",
            duration: "৪৫ মিনিট",
            isFree: false,
          },
          {
            id: "1-5",
            title: "PHP Array & String, File, Session, Exception",
            duration: "৩৫ মিনিট",
            isFree: false,
          },
          {
            id: "1-6",
            title: "Exam Week 1",
            duration: "৬০ মিনিট",
            isFree: false,
          },
        ],
      },
      {
        id: "module-2",
        title: "ডাটাবেস (Module 6-8)",
        description: "MySQL এবং Database Design শিখুন",
        lectureCount: 18,
        totalDuration: "৬ ঘন্টা",
        lectures: [
          {
            id: "2-1",
            title: "Database And SQL Basic",
            duration: "২৫ মিনিট",
            isFree: false,
          },
          {
            id: "2-2",
            title: "MySQL Advanced Queries",
            duration: "৩০ মিনিট",
            isFree: false,
          },
          {
            id: "2-3",
            title: "Database Design Best Practices",
            duration: "২০ মিনিট",
            isFree: false,
          },
        ],
      },
      {
        id: "module-3",
        title: "Laravel Framework (Module 9-15)",
        description: "Laravel দিয়ে প্রফেশনাল ওয়েব এপ্লিকেশন তৈরি",
        lectureCount: 35,
        totalDuration: "১৫ ঘন্টা",
        lectures: [
          {
            id: "3-1",
            title: "Laravel Installation and Setup",
            duration: "২০ মিনিট",
            isFree: false,
          },
          {
            id: "3-2",
            title: "Routing and Controllers",
            duration: "৩০ মিনিট",
            isFree: false,
          },
          {
            id: "3-3",
            title: "Eloquent ORM",
            duration: "৪০ মিনিট",
            isFree: false,
          },
        ],
      },
      {
        id: "module-4",
        title: "Vue.js Frontend (Module 16-20)",
        description: "Vue.js দিয়ে মডার্ন ফ্রন্টএন্ড ডেভেলপমেন্ট",
        lectureCount: 22,
        totalDuration: "১০ ঘন্টা",
        lectures: [
          {
            id: "4-1",
            title: "Vue.js Introduction",
            duration: "২৫ মিনিট",
            isFree: false,
          },
          {
            id: "4-2",
            title: "Components and Props",
            duration: "৩৫ মিনিট",
            isFree: false,
          },
        ],
      },
      {
        id: "module-5",
        title: "প্রজেক্ট (Module 21-25)",
        description: "সম্পূর্ণ প্রজেক্ট তৈরি করুন",
        lectureCount: 20,
        totalDuration: "১১ ঘন্টা",
        lectures: [
          {
            id: "5-1",
            title: "Project Planning",
            duration: "৩০ মিনিট",
            isFree: false,
          },
          {
            id: "5-2",
            title: "Building E-commerce Site",
            duration: "১২০ মিনিট",
            isFree: false,
          },
        ],
      },
    ],

    // Instructors
    instructors: [
      {
        id: 1,
        name: "Ashraful Haque",
        title: "লিড ইন্সট্রাক্টর",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ashraful",
        bio: "Full Stack Developer | Software Architect | Programming & Software Developer at vents.sh | Former Software Engineer at InfoDevelopers",
        students: 15000,
        courses: 12,
        rating: 4.9,
        socialLinks: {
          facebook: "#",
          twitter: "#",
          linkedin: "#",
        },
      },
    ],

    // Stats
    stats: [
      { label: "মোট ভিডিও", value: "১২০টি", icon: Video },
      { label: "সময়কাল", value: "৫০+ ঘন্টা", icon: Clock },
      { label: "শিক্ষার্থী", value: "৩,২৫০+", icon: Users },
      { label: "প্রজেক্ট", value: "৫টি", icon: Trophy },
    ],
  };
};

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params["id"] as string;
  const course = getCourseData(courseId);

  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(["module-1"]));
  const [showAllModules, setShowAllModules] = useState(false);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  const modulesToShow = showAllModules ? course.modules : course.modules.slice(0, 2);

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <div className='bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          {/* Breadcrumb */}
          <nav className='flex items-center gap-2 text-sm text-gray-300 mb-6'>
            <Link
              href='/'
              className='hover:text-white transition-colors'
            >
              হোম
            </Link>
            <ChevronRight className='w-4 h-4' />
            <Link
              href='/courses'
              className='hover:text-white transition-colors'
            >
              কোর্স
            </Link>
            <ChevronRight className='w-4 h-4' />
            <span className='text-white'>{course.category}</span>
          </nav>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Left: Course Info */}
            <div className='lg:col-span-2 space-y-6'>
              {/* Badge */}
              <div className='inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500 text-orange-300 px-4 py-2 rounded-full text-sm font-semibold'>
                <Trophy className='w-4 h-4' />
                {course.badge}
              </div>

              {/* Title */}
              <h1 className='text-3xl md:text-4xl lg:text-5xl font-black leading-tight'>
                {course.title}
              </h1>

              {/* Description */}
              <p className='text-lg text-gray-300 leading-relaxed'>{course.description}</p>

              {/* Meta Info */}
              <div className='flex flex-wrap items-center gap-6'>
                {/* Rating */}
                <div className='flex items-center gap-2'>
                  <div className='flex items-center'>
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        className='w-5 h-5 fill-yellow-400 text-yellow-400'
                      />
                    ))}
                  </div>
                  <span className='font-bold text-xl'>{course.rating}</span>
                  <span className='text-gray-300'>({course.reviewCount} রিভিউ)</span>
                </div>

                {/* Enrolled */}
                <div className='flex items-center gap-2'>
                  <Users className='w-5 h-5 text-green-400' />
                  <span className='text-gray-300'>{course.enrolled} জন শিক্ষার্থী</span>
                </div>
              </div>

              {/* Instructor */}
              <div className='flex items-center gap-4'>
                <div className='flex -space-x-3'>
                  {course.instructors.map(instructor => (
                    <Image
                      key={instructor.id}
                      src={instructor.avatar}
                      alt={instructor.name}
                      width={48}
                      height={48}
                      className='rounded-full border-2 border-slate-900'
                    />
                  ))}
                </div>
                <div>
                  <p className='text-sm text-gray-400'>ইন্সট্রাক্টর</p>
                  <p className='font-semibold'>{course.instructors.map(i => i.name).join(", ")}</p>
                </div>
              </div>

              {/* Highlights */}
              <div className='flex flex-wrap gap-3'>
                {course.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className='flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg'
                  >
                    <CheckCircle2 className='w-4 h-4 text-green-400' />
                    <span className='text-sm'>{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Last Updated */}
              <div className='flex items-center gap-2 text-sm text-gray-400'>
                <Calendar className='w-4 h-4' />
                <span>সর্বশেষ আপডেট: {course.lastUpdated}</span>
              </div>
            </div>

            {/* Right: Video Preview */}
            <div className='lg:col-span-1'>
              <div className='sticky top-24'>
                <div className='bg-white rounded-2xl overflow-hidden shadow-2xl'>
                  {/* Video Thumbnail */}
                  <div className='relative aspect-video bg-gradient-to-br from-purple-600 to-blue-600'>
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      className='object-cover'
                    />
                    <div className='absolute inset-0 bg-black/40 flex items-center justify-center'>
                      <button className='w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform'>
                        <Play
                          className='w-8 h-8 text-purple-600 ml-1'
                          fill='currentColor'
                        />
                      </button>
                    </div>
                    {/* Discount Badge */}
                    <div className='absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold'>
                      {course.discount}% ছাড়
                    </div>
                  </div>

                  {/* Price */}
                  <div className='p-6'>
                    <div className='flex items-baseline gap-3 mb-4'>
                      <span className='text-4xl font-black text-gray-900'>
                        {course.currency}
                        {course.price}
                      </span>
                      <span className='text-2xl text-gray-400 line-through'>
                        {course.currency}
                        {course.originalPrice}
                      </span>
                    </div>

                    {/* CTA Buttons */}
                    <div className='space-y-3'>
                      <button className='w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl'>
                        এখনই ভর্তি হোন
                      </button>
                      <button className='w-full border-2 border-orange-600 text-orange-600 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all'>
                        কার্টে যোগ করুন
                      </button>
                    </div>

                    {/* Course Info */}
                    <div className='mt-6 pt-6 border-t border-gray-200 space-y-3'>
                      <div className='flex items-center justify-between text-sm'>
                        <span className='text-gray-600 flex items-center gap-2'>
                          <Clock className='w-4 h-4' />
                          সময়কাল
                        </span>
                        <span className='font-semibold text-gray-900'>{course.duration}</span>
                      </div>
                      <div className='flex items-center justify-between text-sm'>
                        <span className='text-gray-600 flex items-center gap-2'>
                          <BookOpen className='w-4 h-4' />
                          লেকচার
                        </span>
                        <span className='font-semibold text-gray-900'>{course.lectures}টি</span>
                      </div>
                      <div className='flex items-center justify-between text-sm'>
                        <span className='text-gray-600 flex items-center gap-2'>
                          <BarChart className='w-4 h-4' />
                          লেভেল
                        </span>
                        <span className='font-semibold text-gray-900'>{course.level}</span>
                      </div>
                      <div className='flex items-center justify-between text-sm'>
                        <span className='text-gray-600 flex items-center gap-2'>
                          <Globe className='w-4 h-4' />
                          ভাষা
                        </span>
                        <span className='font-semibold text-gray-900'>{course.language}</span>
                      </div>
                      <div className='flex items-center justify-between text-sm'>
                        <span className='text-gray-600 flex items-center gap-2'>
                          <Award className='w-4 h-4' />
                          সার্টিফিকেট
                        </span>
                        <span className='font-semibold text-gray-900'>হ্যাঁ</span>
                      </div>
                    </div>

                    {/* Share */}
                    <div className='mt-6 pt-6 border-t border-gray-200'>
                      <p className='text-sm font-semibold text-gray-700 mb-3'>শেয়ার করুন:</p>
                      <div className='flex gap-2'>
                        <button className='p-2 border border-gray-300 rounded-lg hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-colors'>
                          <Facebook className='w-5 h-5' />
                        </button>
                        <button className='p-2 border border-gray-300 rounded-lg hover:border-sky-500 hover:text-sky-500 hover:bg-sky-50 transition-colors'>
                          <Twitter className='w-5 h-5' />
                        </button>
                        <button className='p-2 border border-gray-300 rounded-lg hover:border-blue-700 hover:text-blue-700 hover:bg-blue-50 transition-colors'>
                          <Linkedin className='w-5 h-5' />
                        </button>
                        <button className='p-2 border border-gray-300 rounded-lg hover:border-orange-600 hover:text-orange-600 hover:bg-orange-50 transition-colors'>
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
      </div>

      {/* Stats Section */}
      <div className='bg-white border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            {course.stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className='flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-orange-50 to-purple-50'
                >
                  <div className='flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-purple-600 rounded-lg flex items-center justify-center'>
                    <Icon className='w-6 h-6 text-white' />
                  </div>
                  <div>
                    <p className='text-xs text-gray-600'>{stat.label}</p>
                    <p className='text-xl font-black text-gray-900'>{stat.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left Column */}
          <div className='lg:col-span-2 space-y-12'>
            {/* What You'll Learn */}
            <section className='bg-white rounded-2xl p-8 shadow-sm border border-gray-200'>
              <h2 className='text-2xl font-black text-gray-900 mb-6 flex items-center gap-3'>
                <div className='w-10 h-10 bg-gradient-to-br from-orange-500 to-purple-600 rounded-lg flex items-center justify-center'>
                  <CheckCircle2 className='w-6 h-6 text-white' />
                </div>
                এই কোর্সে যা শিখবেন
              </h2>
              <div className='grid sm:grid-cols-2 gap-4'>
                {course.learningOutcomes.map((outcome, index) => (
                  <div
                    key={index}
                    className='flex items-start gap-3'
                  >
                    <CheckCircle2 className='w-5 h-5 text-green-500 flex-shrink-0 mt-0.5' />
                    <span className='text-gray-700'>{outcome}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Course Curriculum */}
            <section className='bg-white rounded-2xl p-8 shadow-sm border border-gray-200'>
              <h2 className='text-2xl font-black text-gray-900 mb-6 flex items-center gap-3'>
                <div className='w-10 h-10 bg-gradient-to-br from-orange-500 to-purple-600 rounded-lg flex items-center justify-center'>
                  <BookOpen className='w-6 h-6 text-white' />
                </div>
                কারিকুলাম
              </h2>

              <div className='space-y-4'>
                {modulesToShow.map(module => (
                  <div
                    key={module.id}
                    className='border border-gray-200 rounded-xl overflow-hidden'
                  >
                    {/* Module Header */}
                    <button
                      onClick={() => toggleModule(module.id as string)}
                      className='w-full flex items-center justify-between p-5 bg-gradient-to-r from-purple-50 to-orange-50 hover:from-purple-100 hover:to-orange-100 transition-colors'
                    >
                      <div className='flex items-center gap-4'>
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                            expandedModules.has(module.id as string)
                              ? "bg-gradient-to-br from-orange-500 to-purple-600"
                              : "bg-white border-2 border-gray-300"
                          }`}
                        >
                          <ChevronDown
                            className={`w-5 h-5 transition-transform ${
                              expandedModules.has(module.id as string)
                                ? "rotate-180 text-white"
                                : "text-gray-600"
                            }`}
                          />
                        </div>
                        <div className='text-left'>
                          <h3 className='font-bold text-gray-900'>{module.title}</h3>
                          <p className='text-sm text-gray-600 mt-1'>
                            {module.lectureCount} লেকচার • {module.totalDuration}
                          </p>
                        </div>
                      </div>
                    </button>

                    {/* Module Content */}
                    {expandedModules.has(module.id as string) && (
                      <div className='p-5 pt-0 space-y-2 bg-white'>
                        {module.lectures.map(lecture => (
                          <div
                            key={lecture.id}
                            className='flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors group'
                          >
                            <div className='flex items-center gap-3'>
                              <Play className='w-4 h-4 text-orange-600 flex-shrink-0' />
                              <span className='text-sm text-gray-700 group-hover:text-gray-900'>
                                {lecture.title}
                              </span>
                              {lecture.isFree && (
                                <span className='px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded'>
                                  ফ্রি
                                </span>
                              )}
                            </div>
                            <span className='text-sm text-gray-500 flex items-center gap-2'>
                              <Clock className='w-3 h-3' />
                              {lecture.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Show More Button */}
              {course.modules.length > 2 && (
                <div className='mt-6 text-center'>
                  <button
                    onClick={() => setShowAllModules(!showAllModules)}
                    className='px-6 py-3 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl'
                  >
                    {showAllModules ? "কম দেখান" : `আরো ${course.modules.length - 2}টি মডিউল দেখুন`}
                  </button>
                </div>
              )}
            </section>

            {/* Requirements */}
            <section className='bg-white rounded-2xl p-8 shadow-sm border border-gray-200'>
              <h2 className='text-2xl font-black text-gray-900 mb-6 flex items-center gap-3'>
                <div className='w-10 h-10 bg-gradient-to-br from-orange-500 to-purple-600 rounded-lg flex items-center justify-center'>
                  <FileText className='w-6 h-6 text-white' />
                </div>
                কোর্সের প্রয়োজনীয়তা
              </h2>
              <ul className='space-y-3'>
                {course.requirements.map((req, index) => (
                  <li
                    key={index}
                    className='flex items-start gap-3'
                  >
                    <div className='w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                      <span className='text-orange-600 font-bold text-xs'>✓</span>
                    </div>
                    <span className='text-gray-700'>{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Target Audience */}
            <section className='bg-white rounded-2xl p-8 shadow-sm border border-gray-200'>
              <h2 className='text-2xl font-black text-gray-900 mb-6 flex items-center gap-3'>
                <div className='w-10 h-10 bg-gradient-to-br from-orange-500 to-purple-600 rounded-lg flex items-center justify-center'>
                  <Users className='w-6 h-6 text-white' />
                </div>
                এই কোর্সটি কাদের জন্য
              </h2>
              <ul className='space-y-3'>
                {course.targetAudience.map((audience, index) => (
                  <li
                    key={index}
                    className='flex items-start gap-3'
                  >
                    <div className='w-2 h-2 bg-purple-600 rounded-full flex-shrink-0 mt-2'></div>
                    <span className='text-gray-700'>{audience}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Instructors */}
            <section className='bg-white rounded-2xl p-8 shadow-sm border border-gray-200'>
              <h2 className='text-2xl font-black text-gray-900 mb-6 flex items-center gap-3'>
                <div className='w-10 h-10 bg-gradient-to-br from-orange-500 to-purple-600 rounded-lg flex items-center justify-center'>
                  <Award className='w-6 h-6 text-white' />
                </div>
                ইন্সট্রাক্টর
              </h2>

              {course.instructors.map(instructor => (
                <div
                  key={instructor.id}
                  className='space-y-6'
                >
                  {/* Instructor Header */}
                  <div className='flex flex-col sm:flex-row items-start sm:items-center gap-6'>
                    <div className='relative'>
                      <Image
                        src={instructor.avatar}
                        alt={instructor.name}
                        width={120}
                        height={120}
                        className='rounded-2xl'
                      />
                      <div className='absolute -bottom-3 -right-3 w-12 h-12 bg-gradient-to-br from-orange-500 to-purple-600 rounded-full flex items-center justify-center border-4 border-white'>
                        <Award className='w-6 h-6 text-white' />
                      </div>
                    </div>

                    <div className='flex-1'>
                      <div className='flex items-center gap-2 text-sm text-orange-600 font-semibold mb-2'>
                        <Star className='w-4 h-4 fill-orange-600' />
                        {instructor.title}
                      </div>
                      <h3 className='text-2xl font-black text-gray-900 mb-3'>{instructor.name}</h3>

                      {/* Stats */}
                      <div className='flex flex-wrap gap-4'>
                        <div className='flex items-center gap-2 text-sm'>
                          <Users className='w-4 h-4 text-gray-500' />
                          <span className='text-gray-700'>
                            {instructor.students.toLocaleString()} শিক্ষার্থী
                          </span>
                        </div>
                        <div className='flex items-center gap-2 text-sm'>
                          <BookOpen className='w-4 h-4 text-gray-500' />
                          <span className='text-gray-700'>{instructor.courses} কোর্স</span>
                        </div>
                        <div className='flex items-center gap-2 text-sm'>
                          <Star className='w-4 h-4 text-yellow-500 fill-yellow-500' />
                          <span className='text-gray-700'>{instructor.rating} রেটিং</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className='text-gray-700 leading-relaxed'>{instructor.bio}</p>

                  {/* Social Links */}
                  {instructor.socialLinks && (
                    <div className='flex gap-3'>
                      {instructor.socialLinks.facebook && (
                        <a
                          href={instructor.socialLinks.facebook}
                          className='w-10 h-10 flex items-center justify-center rounded-lg border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all'
                        >
                          <Facebook className='w-5 h-5' />
                        </a>
                      )}
                      {instructor.socialLinks.twitter && (
                        <a
                          href={instructor.socialLinks.twitter}
                          className='w-10 h-10 flex items-center justify-center rounded-lg border-2 border-gray-300 hover:border-sky-500 hover:text-sky-500 hover:bg-sky-50 transition-all'
                        >
                          <Twitter className='w-5 h-5' />
                        </a>
                      )}
                      {instructor.socialLinks.linkedin && (
                        <a
                          href={instructor.socialLinks.linkedin}
                          className='w-10 h-10 flex items-center justify-center rounded-lg border-2 border-gray-300 hover:border-blue-700 hover:text-blue-700 hover:bg-blue-50 transition-all'
                        >
                          <Linkedin className='w-5 h-5' />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </section>

            {/* Description */}
            <section className='bg-gradient-to-br from-purple-50 to-orange-50 rounded-2xl p-8 border border-purple-200'>
              <h2 className='text-2xl font-black text-gray-900 mb-6'>কোর্স সম্পর্কে বিস্তারিত</h2>
              <div className='prose prose-sm max-w-none text-gray-700 space-y-4'>
                <p className='leading-relaxed'>{course.fullDescription}</p>
                <p className='leading-relaxed'>
                  এই কোর্সটি সম্পূর্ণভাবে প্রজেক্ট বেসড। প্রতিটি মডিউলে আপনি বাস্তব প্রজেক্ট তৈরি
                  করবেন যা আপনার পোর্টফোলিওতে যোগ করতে পারবেন। কোর্স শেষে আপনি একটি সম্পূর্ণ
                  E-commerce ওয়েবসাইট তৈরি করবেন যেখানে Laravel Backend এবং Vue.js Frontend ব্যবহার
                  করা হবে।
                </p>
                <p className='leading-relaxed'>
                  প্রতিটি মডিউল শেষে আপনার জন্য এক্সাম রয়েছে যা আপনার শেখা যাচাই করতে সাহায্য করবে।
                  কোর্স শেষে সার্টিফিকেট পাবেন এবং আমাদের জব সাপোর্ট টিম আপনাকে চাকরি পেতে সহায়তা
                  করবে।
                </p>
              </div>
            </section>
          </div>

          {/* Right Sidebar - Related Courses */}
          <div className='lg:col-span-1'>
            <div className='sticky top-24 space-y-6'>
              {/* Related Courses */}
              <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-200'>
                <h3 className='text-xl font-black text-gray-900 mb-4'>সম্পর্কিত কোর্স</h3>
                <div className='space-y-4'>
                  {[1, 2, 3].map(item => (
                    <Link
                      key={item}
                      href={`/courses/${item}`}
                      className='block group'
                    >
                      <div className='flex gap-3'>
                        <div className='relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden'>
                          <Image
                            src={`https://images.unsplash.com/photo-${1516321318423 + item}?w=200&q=80`}
                            alt='Related course'
                            fill
                            className='object-cover group-hover:scale-110 transition-transform duration-300'
                          />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <h4 className='text-sm font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2 mb-1'>
                            Advanced JavaScript Course
                          </h4>
                          <div className='flex items-center gap-1 mb-1'>
                            <Star className='w-3 h-3 fill-yellow-400 text-yellow-400' />
                            <span className='text-xs text-gray-600'>4.8 (১,২০০)</span>
                          </div>
                          <p className='text-sm font-bold text-orange-600'>৳১,৫০০</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Promo Banner */}
              <div className='bg-gradient-to-br from-orange-500 to-purple-600 rounded-2xl p-6 text-white'>
                <Trophy className='w-12 h-12 mb-4' />
                <h3 className='text-xl font-black mb-2'>বিশেষ অফার!</h3>
                <p className='text-sm text-white/90 mb-4'>
                  আজই কোর্সে ভর্তি হয়ে পান ৫০% ছাড় এবং বোনাস কন্টেন্ট
                </p>
                <div className='flex items-center gap-2 text-sm'>
                  <Clock className='w-4 h-4' />
                  <span>অফার শেষ হবে: ৩ দিন</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className=' fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-900 to-orange-900 py-2'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
            <p className='text-purple-200'>
              {course.enrolled} জন শিক্ষার্থী ইতিমধ্যে এই কোর্সে ভর্তি হয়েছেন
            </p>

            <div className='flex flex-col sm:flex-row gap-4'>
              <button className='px-8 py-2 bg-white text-purple-900 rounded-md font-bold text-md hover:bg-gray-100 transition-all shadow-2xl whitespace-nowrap'>
                এখনই ভর্তি হোন - ৳{course.price}
              </button>
              <button className='px-8 py-2 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all whitespace-nowrap'>
                ফ্রি ট্রায়াল
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className='lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-2xl z-50'>
        <div className='flex items-center gap-4'>
          <div className='flex-1'>
            <div className='flex items-baseline gap-2'>
              <span className='text-2xl font-black text-gray-900'>৳{course.price}</span>
              <span className='text-sm text-gray-400 line-through'>৳{course.originalPrice}</span>
            </div>
          </div>
          <button className='px-6 py-3 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-xl font-bold hover:from-orange-600 hover:to-purple-700 transition-all shadow-lg whitespace-nowrap'>
            ভর্তি হোন
          </button>
        </div>
      </div>
    </div>
  );
}
