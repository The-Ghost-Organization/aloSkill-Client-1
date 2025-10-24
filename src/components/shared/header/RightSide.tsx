// "use client";

// import { BookOpen, ChevronLeft, ChevronRight, Sparkles, Star, TrendingUp } from "lucide-react";
// import Image from "next/image";
// import { useCallback, useEffect, useState } from "react";

// const images = [
//   {
//     id: 1,
//     url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570",
//     alt: "Books collection 1",
//   },
//   {
//     id: 2,
//     url: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
//     alt: "Books collection 2",
//   },
//   {
//     id: 3,
//     url: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
//     alt: "Books collection 3",
//   },
//   {
//     id: 4,
//     url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
//     alt: "Books collection 4",
//   },
// ];

// const cards = [
//   {
//     id: 1,
//     icon: BookOpen,
//     title: "Discover New Books Every Day",
//     gradient: "from-orange-100 to-orange-50",
//     iconColor: "text-orange-500",
//   },
//   {
//     id: 2,
//     icon: Sparkles,
//     title: "Discover New Books Every Day",
//     gradient: "from-purple-100 to-purple-50",
//     iconColor: "text-purple-500",
//   },
//   {
//     id: 3,
//     icon: Star,
//     title: "Discover New Books Every Day",
//     gradient: "from-blue-100 to-blue-50",
//     iconColor: "text-blue-500",
//   },
//   {
//     id: 4,
//     icon: TrendingUp,
//     title: "Discover New Books Every Day",
//     gradient: "from-pink-100 to-pink-50",
//     iconColor: "text-pink-500",
//   },
// ];

// export default function RightSide() {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [currentCardIndex, setCurrentCardIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);

//   // Auto-scroll for images
//   useEffect(() => {
//     if (isPaused) return;

//     const imageInterval = setInterval(() => {
//       setCurrentImageIndex(prev => (prev + 1) % images.length);
//     }, 3000);

//     return () => clearInterval(imageInterval);
//   }, [isPaused]);

//   // Auto-scroll for cards
//   useEffect(() => {
//     if (isPaused) return;

//     const cardInterval = setInterval(() => {
//       setCurrentCardIndex(prev => (prev + 1) % cards.length);
//     }, 4000);

//     return () => clearInterval(cardInterval);
//   }, [isPaused]);

//   const nextImage = useCallback(() => {
//     setCurrentImageIndex(prev => (prev + 1) % images.length);
//   }, []);

//   const prevImage = useCallback(() => {
//     setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);
//   }, []);

//   const nextCard = useCallback(() => {
//     setCurrentCardIndex(prev => (prev + 1) % cards.length);
//   }, []);

//   const prevCard = useCallback(() => {
//     setCurrentCardIndex(prev => (prev - 1 + cards.length) % cards.length);
//   }, []);

//   const currentCard = cards[currentCardIndex];
//   const Icon = currentCard?.icon || BookOpen; // Use BookOpen as a fallback

//   return (
//     <aside
//       className='hidden xl:block
//         fixed top-28 py-6 right-0
//         w-60 h-[calc(100vh-4rem)]
//         bg-transparent
//         overflow-y-auto
//         z-40'
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//     >
//       <div className='space-y-4'>
//         {/* Image Slider */}
//         <div className='relative rounded-2xl overflow-hidden shadow-lg group'>
//           <div className='relative h-48 w-full'>
//             {images.map((image, index) => (
//               <Image
//               width={100}
//               height={100}
//                 key={image.id}
//                 src={image.url}
//                 alt={image.alt}
//                 className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
//                   index === currentImageIndex ? "opacity-100" : "opacity-0"
//                 }`}
//               />
//             ))}

//             {/* Gradient Overlay */}
//             <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent' />

//             {/* Navigation Arrows */}
//             <button
//               onClick={prevImage}
//               className='absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
//               aria-label='Previous image'
//             >
//               <ChevronLeft className='w-4 h-4 text-gray-800' />
//             </button>

//             <button
//               onClick={nextImage}
//               className='absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
//               aria-label='Next image'
//             >
//               <ChevronRight className='w-4 h-4 text-gray-800' />
//             </button>

//             {/* Dots Indicator */}
//             <div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5'>
//               {images.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentImageIndex(index)}
//                   className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                     index === currentImageIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
//                   }`}
//                   aria-label={`Go to image ${index + 1}`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Card Slider */}
//         <div className='relative'>
//           <div className='overflow-hidden rounded-2xl'>
//             <div
//               className={`
//                 bg-gradient-to-br ${currentCard?.gradient}
//                 rounded-2xl p-6 shadow-sm hover:shadow-md
//                 transition-all duration-500
//                 cursor-pointer border border-gray-100
//                 min-h-[200px]
//               `}
//             >
//               <div className={`${currentCard?.iconColor} mb-3 animate-bounce-gentle`}>
//                 {Icon && <Icon className='w-12 h-12' />}
//               </div>
//               <p className='text-sm font-medium text-gray-800 leading-relaxed'>
//                 {currentCard?.title}
//               </p>

//               {/* Card Dots Indicator */}
//               <div className='flex gap-1.5 mt-4'>
//                 {cards.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentCardIndex(index)}
//                     className={`h-1.5 rounded-full transition-all duration-300 ${
//                       index === currentCardIndex
//                         ? "bg-gray-600 w-6"
//                         : "bg-gray-300 w-1.5 hover:bg-gray-400"
//                     }`}
//                     aria-label={`Go to card ${index + 1}`}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Card Navigation Arrows */}
//           <button
//             onClick={prevCard}
//             className='absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-md opacity-0 hover:opacity-100 transition-opacity duration-300'
//             aria-label='Previous card'
//           >
//             <ChevronLeft className='w-4 h-4 text-gray-800' />
//           </button>

//           <button
//             onClick={nextCard}
//             className='absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-md opacity-0 hover:opacity-100 transition-opacity duration-300'
//             aria-label='Next card'
//           >
//             <ChevronRight className='w-4 h-4 text-gray-800' />
//           </button>
//         </div>

//         {/* Additional static cards (optional) */}
//         <div className='space-y-4 mt-4'>
//           {cards.slice(0, 2).map(card => {
//             const CardIcon = card.icon;
//             return (
//               <div
//                 key={card.id}
//                 className={`
//                   bg-gradient-to-br ${card.gradient}
//                   rounded-2xl p-6 shadow-sm hover:shadow-md
//                   transition-all duration-300 hover:scale-105
//                   cursor-pointer border border-gray-100
//                 `}
//               >
//                 <div className={`${card.iconColor} mb-3`}>
//                   <CardIcon className='w-12 h-12' />
//                 </div>
//                 <p className='text-sm font-medium text-gray-800 leading-relaxed'>{card.title}</p>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes bounceGentle {
//           0%,
//           100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-5px);
//           }
//         }

//         .animate-bounce-gentle {
//           animation: bounceGentle 2s ease-in-out infinite;
//         }
//       `}</style>
//     </aside>
//   );
// }

"use client";
import { BookOpen, ChevronLeft, ChevronRight, Sparkles, Star, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

const cards = [
  {
    id: 1,
    icon: BookOpen,
    title: "Discover New Books Every Day",
    gradient: "from-orange-100 to-orange-50",
    iconColor: "text-orange-500",
  },
  {
    id: 2,
    icon: Sparkles,
    title: "Discover New Books Every Day",
    gradient: "from-purple-100 to-purple-50",
    iconColor: "text-purple-500",
  },
  {
    id: 3,
    icon: Star,
    title: "Discover New Books Every Day",
    gradient: "from-blue-100 to-blue-50",
    iconColor: "text-blue-500",
  },
  {
    id: 4,
    icon: TrendingUp,
    title: "Discover New Books Every Day",
    gradient: "from-pink-100 to-pink-50",
    iconColor: "text-pink-500",
  },
];

const images = [
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
];

export default function RightSidebar() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [imageDirection, setImageDirection] = useState("next");
  const [cardDirection, setCardDirection] = useState("next");

  // Auto-scroll images every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setImageDirection("next");
      setCurrentImageIndex(prev => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll cards every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCardDirection("next");
      setCurrentCardIndex(prev => (prev + 1) % cards.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleImagePrev = () => {
    setImageDirection("prev");
    setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);
  };

  const handleImageNext = () => {
    setImageDirection("next");
    setCurrentImageIndex(prev => (prev + 1) % images.length);
  };

  const handleCardPrev = () => {
    setCardDirection("prev");
    setCurrentCardIndex(prev => (prev - 1 + cards.length) % cards.length);
  };

  const handleCardNext = () => {
    setCardDirection("next");
    setCurrentCardIndex(prev => (prev + 1) % cards.length);
  };

  const currentCard = cards[currentCardIndex];
  const CurrentIcon = currentCard.icon;

  return (
    <aside className='hidden xl:block fixed top-28 py-6 right-0 w-60 h-[calc(100vh-4rem)] bg-transparent overflow-y-auto z-40'>
      <div className='space-y-4'>
        {/* Image Slider */}
        <div className='relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300'>
          <div className='relative h-48 bg-gray-100'>
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Book ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  index === currentImageIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={handleImagePrev}
              className='absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md'
            >
              <ChevronLeft className='w-4 h-4 text-gray-700' />
            </button>
            <button
              onClick={handleImageNext}
              className='absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md'
            >
              <ChevronRight className='w-4 h-4 text-gray-700' />
            </button>

            {/* Dot Indicators */}
            <div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5'>
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setImageDirection(index > currentImageIndex ? "next" : "prev");
                    setCurrentImageIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? "bg-white w-6" : "bg-white/60 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Card Slider */}
        <div className='relative group'>
          <div className='relative h-44 rounded-2xl overflow-hidden'>
            <div
              className={`bg-gradient-to-br ${currentCard.gradient} rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-100 h-full`}
            >
              <div className={`${currentCard.iconColor} mb-3 animate-bounce`}>
                <CurrentIcon className='w-12 h-12' />
              </div>
              <p className='text-sm font-medium text-gray-800 leading-relaxed'>
                {currentCard.title}
              </p>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={handleCardPrev}
              className='absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md'
            >
              <ChevronLeft className='w-4 h-4 text-gray-700' />
            </button>
            <button
              onClick={handleCardNext}
              className='absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md'
            >
              <ChevronRight className='w-4 h-4 text-gray-700' />
            </button>
          </div>

          {/* Dot Indicators */}
          <div className='flex justify-center gap-1.5 mt-3'>
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCardDirection(index > currentCardIndex ? "next" : "prev");
                  setCurrentCardIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentCardIndex ? "bg-gray-600 w-6" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Static Cards (remaining cards not in slider) */}
        <div className='space-y-4'>
          {cards.slice(0, 2).map(card => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className={`bg-gradient-to-br ${card.gradient} rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-100`}
              >
                <div className={`${card.iconColor} mb-3`}>
                  <Icon className='w-12 h-12' />
                </div>
                <p className='text-sm font-medium text-gray-800 leading-relaxed'>{card.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
