
import { Button } from '@/components/ui/button';
import { courses } from '@/lib/courses';
import { Course } from '@/lib/types';

const CoursePage = ({ params }: { params: { id: string } }) => {
  const course = courses.find((course: Course) => course.id === params.id);

  if (!course) {
    return <p>Course not found</p>;
  }

  return (
    <div className="py-8">
      <div className='flex justify-between'>
        <p>Id: {course.id}</p>
        <div className='flex items-center gap-8'>
          <Button>Go Live</Button>
          <Button>+ Add Video</Button>
        </div>
      </div>

    </div>
  );
};

export default CoursePage;
