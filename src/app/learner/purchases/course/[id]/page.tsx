"use client";

import { Button } from "@/components/ui/button";
import { courses } from "@/lib/courses";
import { Course, Video } from "@/lib/types";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { MoveLeftIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { getCourseDetails } from "@/lib/getCourseDetails";

const CoursePage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const sampleCourse: any = courses.find(
    (course: Course) => course.id === params.id
  );
  const [course, setCourse] = useState<Course>(sampleCourse);
  // const course = courses.find((course: Course) => course.id === params.id);

  // if (!course) {
  //   return <p>Course not found</p>;
  // }

  const handleBackClick = () => {
    router.push("/learner/purchases");
  };

  const handleViewVideo = (videoId: string) => {
    router.push(`/learner/purchases/course/${course.id}/video/${videoId}`);
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
      <div className="h-6 w-6 cursor-pointer mr-2" onClick={handleBackClick}>
        <MoveLeftIcon className="h-6 w-6" />
      </div>
      {/* Course Details */}
      <div className=" my-8">
        <div className="flex justify-between items-center">
          <p className="text-3xl font-semibold py-1"> {course.name}</p>
          <div className="flex gap-2 items-center">
            <p className="text-lg py-4 flex items-center gap-4 font-bold ">
              Course ID :
            </p>
            <Badge> {course.id} </Badge>
          </div>
        </div>
        <div className=" flex justify-center shadow-md p-3 rounded-[10px] object-contain mb-4">
          <Image
            src={course.thumbnailUrl}
            height={160}
            width={320}
            alt="Course Thumbnail"
            className="w-auto h-auto"
          />
        </div>
        <p className="text-muted-foreground text-lg flex justify-center p-1">
          {course.description}
        </p>
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
