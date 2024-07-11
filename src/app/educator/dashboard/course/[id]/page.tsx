
import { courses } from '@/lib/courses';
import { Course } from '@/lib/types';

const CoursePage = ({ params }: { params: { id: string } }) => {
  const course = courses.find((course: Course) => course.id === params.id);

  if (!course) {
    return <p>Course not found</p>;
  }

  return (
    <div className="py-8">
      <p>Id: {course.id}</p>
    </div>
  );
};

export default CoursePage;
