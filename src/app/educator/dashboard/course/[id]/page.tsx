"use client";

import { Button } from "@/components/ui/button";
import { courses } from "@/lib/courses";
import { Course, Video } from "@/lib/types";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { AddVideo } from "@/components/educator/addVideo";
import { MoveLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { getCourseDetails } from "@/lib/getCourseDetails";

const CoursePage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const sampleCourse: any = courses.find(
    (course: Course) => course.id === params.id
  );
  const [course, setCourse] = useState<Course>(sampleCourse);

  const handleGoLive = () => {
    router.push(`/educator/dashboard/course/${course.id}/livestream`);
  };

  const handleViewVideo = (videoId: string) => {
    router.push(`/educator/dashboard/course/${course.id}/video/${videoId}`);
  };

  const handleBackClick = () => {
    router.back();
  };

  const fetchData = async () => {
    console.log("fetching data");

    const response = await getCourseDetails({
      courseId: course.id,
      courseCreator: course.creator,
    });
    console.log("response from get-course-videos", response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="py-8">
      <div className="flex justify-between">
        <div className="h-6 w-6 cursor-pointer mr-2" onClick={handleBackClick}>
          <MoveLeftIcon className="h-6 w-6" />
        </div>
        <div className="flex items-center gap-8">
          {/* <Button onClick={handleGoLive} className="text-lg">
            Go Live
          </Button> */}
          <AddVideo />
        </div>
      </div>
      {/* Course Details */}
      <div className="my-8">
        <div className="flex justify-between items-center">
          <p className="text-4xl font-semibold py-1"> {course.name}</p>
        </div>
        <div className="flex w-full gap-10">
          <div className="flex flex-col gap-4 shadow-md p-4 rounded-[10px] w-full">
            <p className="text-2xl font-medium flex justify-center">Course Details</p>

            <div className="flex gap-2 items-center">
              <p className="font-semibold"> Course ID : </p>
              <Badge>{course.id}</Badge>
            </div>
            <div className="flex gap-2 items-center">
              <p className="font-semibold">Course Price : </p>
              <p className="text-lg">  {course.price}</p>
            </div>

            <p className="font-semibold"> Course Creator :
              <span className="font-normal text-blue-500"> {course.creator}</span>
            </p>
            <p className="font-semibold">
              Course Description : <span className="text-muted-foreground"> {course.description}</span>
            </p>
          </div>
          <div className="flex justify-center  p-3 rounded-[10px] object-contain mb-4 w-full">
            <Image
              src={course.thumbnailUrl}
              height={160}
              width={160}
              alt="Course Thumbnail"
              className="w-auto h-auto"
            />
          </div>
        </div>
      </div>
      <div className="">
        <p className="text-3xl font-semibold py-4">Course Content</p>
        <div className="flex flex-col gap-4">
          {course.videos.map((video: Video) => (
            <Card key={video.id} className="shadow-md">
              <CardContent className="flex justify-between items-center pt-4">
                <div className="flex flex-col gap-2">
                  <CardTitle>{video.name}</CardTitle>
                  <CardDescription>{video.description}</CardDescription>
                </div>
                <Button onClick={() => handleViewVideo(video.id)}>View</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
