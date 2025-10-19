import { Star } from "lucide-react";
import Image from "next/image";

interface TestimonialCardProps {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
}

export default function TestimonialCard({
  name,
  role,
  avatar,
  rating,
  comment,
}: TestimonialCardProps) {
  return (
    <div className='bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100'>
      {/* Rating */}
      <div className='flex gap-1 mb-4'>
        {Array.from({ length: rating }).map((_, i) => (
          <Star
            key={i}
            className='w-4 h-4 text-yellow-500 fill-yellow-500'
          />
        ))}
      </div>

      {/* Comment */}
      <p className='text-gray-600 text-sm leading-relaxed mb-4'>{comment}</p>

      {/* User Info */}
      <div className='flex items-center gap-3'>
        <Image
          width={48}
          height={48}
          src={avatar}
          alt={name}
          className='w-12 h-12 rounded-full object-cover'
        />
        <div>
          <h4 className='font-semibold text-gray-900'>{name}</h4>
          <p className='text-xs text-gray-500'>{role}</p>
        </div>
      </div>
    </div>
  );
}
