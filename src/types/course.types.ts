/**
 * Instructor information
 */
export interface Instructor {
  id?: string | number;
  name: string;
  avatar: string;
  title?: string;
  bio?: string;
  rating?: number;
  students?: number;
  courses?: number;
}

/**
 * Course category information
 */
export interface CourseCategory {
  id: string | number;
  name: string;
  slug: string;
  color: string;
}

/**
 * Main course interface
 */
export interface Course {
  id: string | number;
  title: string;
  slug?: string;
  description?: string;
  image: string;
  category: string;
  categoryColor: string;
  rating: number;
  reviewCount: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  lessons: number;
  duration: string;
  students: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  language?: string;
  certificate?: boolean;
  instructor: Instructor;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  isPublished?: boolean;
  isFeatured?: boolean;
}

/**
 * Course card props
 */
export interface CourseCardProps extends Omit<Course, "description" | "slug"> {
  onEnroll?: (courseId: string | number) => void;
  onAddToCart?: (courseId: string | number) => void;
  onAddToWishlist?: (courseId: string | number) => void;
  isInCart?: boolean;
  isInWishlist?: boolean;
  variant?: "default" | "compact" | "featured";
}

/**
 * Course section props
 */
export interface CourseSectionProps {
  title?: string;
  subtitle?: string;
  courses: Course[];
  showLoadMore?: boolean;
  maxItems?: number;
  onLoadMore?: () => void;
  isLoading?: boolean;
  emptyStateMessage?: string;
}
