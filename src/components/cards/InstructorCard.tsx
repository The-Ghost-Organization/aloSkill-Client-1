import { Award, BookOpen, Star, Users } from "lucide-react";
import Image from "next/image";

interface InstructorCardProps {
  name: string;
  title: string;
  avatar: string;
  students: number;
  courses: number;
  rating: number;
  verified?: boolean;
}

export default function InstructorCard({
  name,
  title,
  avatar,
  students,
  courses,
  rating,
  verified = false,
}: InstructorCardProps) {
  return (
    <div className='bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100'>
      {/* Avatar & Info */}
      <div className='flex items-start gap-4 mb-4'>
        <div className='relative'>
          <Image
            width={80}
            height={80}
            src={avatar}
            alt={name}
            className='w-16 h-16 rounded-full object-cover'
          />
          {verified && (
            <div className='absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white'>
              <Award className='w-3 h-3 text-white' />
            </div>
          )}
        </div>
        <div className='flex-1'>
          <h3 className='font-bold text-gray-900 text-lg'>{name}</h3>
          <p className='text-sm text-gray-600'>{title}</p>
          <div className='flex items-center gap-1 mt-1'>
            <Star className='w-4 h-4 text-yellow-500 fill-yellow-500' />
            <span className='text-sm font-semibold text-gray-700'>{rating}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className='flex gap-4 pt-4 border-t border-gray-100'>
        <div className='flex items-center gap-2 text-sm text-gray-600'>
          <Users className='w-4 h-4 text-blue-500' />
          <span>{students.toLocaleString()} students</span>
        </div>
        <div className='flex items-center gap-2 text-sm text-gray-600'>
          <BookOpen className='w-4 h-4 text-orange-500' />
          <span>{courses} courses</span>
        </div>
      </div>

      {/* Action Button */}
      <button className='w-full mt-4 px-4 py-2 border-2 border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 font-semibold text-sm'>
        View Profile
      </button>
    </div>
  );
}
