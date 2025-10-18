// "use client";

// import CourseCard from "./CourseCard";

// const coursesData = [
//   {
//     id: 1,
//     image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80",
//     category: "Digital Marketing",
//     categoryColor: "bg-blue-900",
//     rating: 4.5,
//     reviewCount: "4.5k",
//     price: 50.0,
//     title: "It Statistics Data Science And Business Analysis",
//     lessons: 10,
//     duration: "19h 30m",
//     students: "20+",
//     instructor: {
//       name: "Samantha",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Samantha",
//     },
//   },
//   {
//     id: 2,
//     image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80",
//     category: "Social Marketing",
//     categoryColor: "bg-purple-700",
//     rating: 4.5,
//     reviewCount: "4.5k",
//     price: 50.0,
//     title: "Beginner Adobe Illustrator For Graphic Design",
//     lessons: 10,
//     duration: "19h 30m",
//     students: "20+",
//     instructor: {
//       name: "Charles",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charles",
//     },
//   },
//   {
//     id: 3,
//     image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&q=80",
//     category: "Social Marketing",
//     categoryColor: "bg-purple-700",
//     rating: 4.5,
//     reviewCount: "4.5k",
//     price: 50.0,
//     title: "Starting SEO As Your Home Based Business",
//     lessons: 8,
//     duration: "19h 30m",
//     students: "20+",
//     instructor: {
//       name: "Morgan",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan",
//     },
//   },
// ];

// export default function CourseCardGrid() {
//   return (
//     <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8'>
//       {coursesData.map(course => (
//         <CourseCard
//           key={course.id}
//           image={course.image}
//           category={course.category}
//           categoryColor={course.categoryColor}
//           rating={course.rating}
//           reviewCount={course.reviewCount}
//           price={course.price}
//           title={course.title}
//           lessons={course.lessons}
//           duration={course.duration}
//           students={course.students}
//           instructor={course.instructor}
//           onEnroll={() => console.log(`Enrolling in ${course.title}`)}
//         />
//       ))}
//     </div>
//   );
// }
