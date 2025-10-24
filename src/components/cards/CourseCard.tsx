"use client";

import type { CourseCardProps } from "@/types/course.types";
import { BookOpen, Clock, Heart, ShoppingCart, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo, useState } from "react";

const CourseCard = memo(function CourseCard({
  id,
  image,
  category,
  categoryColor,
  rating,
  reviewCount,
  price,
  originalPrice,
  discount,
  title,
  lessons,
  duration,
  students,
  instructor,
  onEnroll,
  onAddToCart,
  onAddToWishlist,
  isInCart = false,
  isInWishlist = false,
}: CourseCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!onAddToWishlist) return;

    setIsWishlistLoading(true);
    try {
      await onAddToWishlist(id);
    } catch (error) {
      console.error("Failed to update wishlist:", error);
    } finally {
      setIsWishlistLoading(false);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(id);
  };

  const handleEnroll = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEnroll?.(id);
  };

  const discountPercentage =
    discount ||
    (originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0);

  return (
    <article className='group bg-white rounded-md shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-dotted border-orange-400 flex flex-col h-full'>
      <Link
        href={`/courses/${id}`}
        className='block relative overflow-hidden'
      >
        <div className='relative h-48 bg-gray-200'>
          {!imageError ? (
            <Image
              src={image}
              alt={title}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
              className='object-cover group-hover:scale-110 transition-transform duration-500'
              onError={handleImageError}
              priority={false}
            />
          ) : (
            <div className='flex items-center justify-center h-full bg-gradient-to-br from-gray-200 to-gray-300'>
              <BookOpen className='w-16 h-16 text-gray-400' />
            </div>
          )}

          <div className='absolute top-4 left-4 z-10'>
            <span
              className={`${categoryColor} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm`}
            >
              {category}
            </span>
          </div>

          <div className='absolute top-4 right-4 z-10 bg-white rounded-lg px-3 py-1.5 shadow-lg'>
            <div className='flex items-center gap-1'>
              <span className='text-orange-600 font-black text-lg'>${price.toFixed(2)}</span>
              {originalPrice && originalPrice > price && (
                <span className='text-gray-400 text-xs line-through'>
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {discountPercentage > 0 && (
            <div className='absolute bottom-4 right-4 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg'>
              {discountPercentage}% OFF
            </div>
          )}

          <button
            onClick={handleWishlistToggle}
            disabled={isWishlistLoading}
            className={`absolute bottom-4 left-4 z-10 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
              isInWishlist
                ? "bg-red-500 text-white"
                : "bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white"
            } ${isWishlistLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-4 h-4 transition-all ${isInWishlist ? "fill-current" : ""}`} />
          </button>
        </div>
      </Link>

      <div className='p-5 flex flex-col flex-grow'>
        <div className='flex items-center gap-2 mb-3'>
          <div
            className='flex items-center'
            aria-label={`Rating: ${rating} out of 5`}
          >
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating) ? "fill-orange-400 text-orange-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className='text-sm font-semibold text-gray-900'>{rating}</span>
          <span className='text-sm text-gray-500'>({reviewCount})</span>
        </div>

        <Link href={`/courses/${id}`}>
          <h3 className='text-lg font-bold text-blue-900 mb-4 line-clamp-2 min-h-[3.5rem] group-hover:text-orange-600 transition-colors cursor-pointer'>
            {title}
          </h3>
        </Link>

        <div className='flex items-center gap-4 text-sm text-gray-600 mb-4 flex-wrap'>
          <div
            className='flex items-center gap-1'
            title={`${lessons} lessons`}
          >
            <BookOpen className='w-4 h-4 text-orange-600 flex-shrink-0' />
            <span className='whitespace-nowrap'>{lessons} Lessons</span>
          </div>
          <div
            className='flex items-center gap-1'
            title={`Duration: ${duration}`}
          >
            <Clock className='w-4 h-4 text-orange-600 flex-shrink-0' />
            <span className='whitespace-nowrap'>{duration}</span>
          </div>
          <div
            className='flex items-center gap-1'
            title={`${students} students enrolled`}
          >
            <Users className='w-4 h-4 text-orange-600 flex-shrink-0' />
            <span className='whitespace-nowrap'>{students}</span>
          </div>
        </div>

        <div className='mt-auto pt-4 border-t border-gray-100'>
          <div className='flex items-center justify-between gap-2'>
            <div className='flex items-center gap-2 min-w-0'>
              <div className='relative w-8 h-8 flex-shrink-0'>
                <Image
                  src={instructor.avatar}
                  alt={instructor.name}
                  fill
                  sizes='32px'
                  className='rounded-full object-cover'
                />
              </div>
              <span className='text-sm font-medium text-gray-700 truncate'>{instructor.name}</span>
            </div>

            <div className='flex items-center gap-2 flex-shrink-0'>
              {onAddToCart && (
                <button
                  onClick={handleAddToCart}
                  disabled={isInCart}
                  className={`p-2 rounded-lg transition-all ${
                    isInCart
                      ? "bg-green-100 text-green-600 cursor-default"
                      : "bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-600"
                  }`}
                  title={isInCart ? "In cart" : "Add to cart"}
                  aria-label={isInCart ? "In cart" : "Add to cart"}
                >
                  <ShoppingCart className='w-4 h-4' />
                </button>
              )}

              {onEnroll && (
                <button
                  onClick={handleEnroll}
                  className='px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-sm font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg whitespace-nowrap'
                >
                  Enroll
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
});

export default CourseCard;
