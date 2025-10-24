export interface Instructor {
  id: number;
  name: string;
  title: string;
  image: string;
  borderColor: string;
  students: number;
  courses: number;
  rating: number;
}
export interface InstructorCardProps {
  instructor: Instructor;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}