"use client"

import { Button } from '@/components/ui/button';
import { courses } from '@/lib/courses';
import { Course } from '@/lib/types';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { videos } from '@/lib/videos';
import { AddVideo } from '@/components/educator/addVideo';


const CoursePage = ({ params }: { params: { id: string } }) => {

  const router = useRouter();
  const course = courses.find((course: Course) => course.id === params.id);

  if (!course) {
    return <p>Course not found</p>;
  }

  const handleGoLive = () => {
    router.push(`/educator/dashboard/course/${course.id}/livestream`);
  };

  return (
    <div className="py-8">
      <div className='flex justify-end'>
        <div className='flex items-center gap-8'>
          <Button onClick={handleGoLive}>Go Live</Button>
          {/* <Button>+ Add Video</Button> */}
          <AddVideo />
        </div>
      </div>
      {/* <div className='py-8 flex justify-center'>
        <Card className='shadow-md w-[60%]'>
          <CardContent className='py-4 flex gap-8 justify-between'>
            <Image
              src={course.thumbnailUrl}
              width={100}
              height={100}
              alt="Course Thumbnail"
              className='shadow-md p-3 rounded-[10px] w-[60%]'
            />
            <div className='w-full'>
              <div className='mb-2'>
                <p className='text-3xl font-semibold py-1'> {course.name}</p>
                <p className='text-muted-foreground'>{course.description}</p>
              </div>
              <p className='text-lg py-4 flex items-center gap-4 '>Course Id :<Badge> {course.id} </Badge></p>
              <p> <span className='text-muted-foreground'>Creator : </span> {course.creator}</p>
              <p><span className='text-muted-foreground py-2'>Price : </span> ${course.price}</p>
            </div>
          </CardContent>
        </Card>

      </div > */}

      {/* Course Details */}
      <div className=' my-8'>
        <div className='flex justify-between items-center'>
          <p className='text-3xl font-semibold py-1'> {course.name}</p>
          <p className='text-lg py-4 flex items-center gap-4 '>Course Id :<Badge> {course.id} </Badge></p>
        </div>
        <div className='relative h-40'>
          <Image
            src={course.thumbnailUrl}
            layout="fill"
            alt="Course Thumbnail"
            className='shadow-md p-3 rounded-[10px] object-contain'
          />
        </div>
        <p className='text-muted-foreground flex justify-center p-1'>{course.description}</p>
      </div>
      <div className=''>
        <p className='text-3xl font-semibold py-4'>Course Content</p>
        <div className='flex flex-col gap-4'>
          {videos.map((video, index) => (
            <Card key={index} className='shadow-md'>
              <CardContent className='flex justify-between items-center pt-4'>
                <div className='flex flex-col gap-2'>
                  <CardTitle>{video.name}</CardTitle>
                  <CardDescription>{video.description}</CardDescription>
                </div>
                <Button onClick={() => router.push(`/videos/${index}`)}>View</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div >
  );
};

export default CoursePage;
