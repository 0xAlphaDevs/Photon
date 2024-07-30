"use client";

import { Button } from "@/components/ui/button";
import { Video } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { AddVideo } from "@/components/educator/addVideo";
import { MoveLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { getCourseDetails } from "@/lib/getCourseDetails";
import { useAccount } from "wagmi";
import { Skeleton } from "@/components/ui/skeleton";

const CoursePage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [courseVideos, setCourseVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);

  const { address } = useAccount();

  const courseNftAddress = searchParams.get("address");
  const courseId = searchParams.get("course-id");
  const coursePrice = searchParams.get("course-price");
  const courseDescription = searchParams.get("course-description");
  const courseName = searchParams.get("course-name");

  console.log("courseNftAddress", courseNftAddress);

  // const handleGoLive = () => {
  //   router.push(`/educator/dashboard/course/${courseId}/livestream`);
  // };

  const handleViewVideo = (videoId: string) => {
    router.push(`/educator/dashboard/course/${courseId}/video/${videoId}`);
  };

  const handleBackClick = () => {
    router.back();
  };

  const fetchData = async () => {
    console.log("fetching course videos");
    setLoading(true);

    const response = await getCourseDetails({
      courseId: courseId as string,
      courseCreator: address as string,
    });
    console.log("response from get-course-videos", response);
    // set course videos
    const videos = response.course_videos.map((video: any) => {
      return {
        id: video.id,
        name: video.metadata.title,
        description: video.metadata.description,
      };
    });
    // reverse the videos array
    videos.reverse();

    setCourseVideos(videos);
    setLoading(false);
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
          <Dialog>
            <DialogTrigger asChild>
              <Button className="text-lg">Go Live</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Live classes</DialogTitle>
              </DialogHeader>
              <div className="flex justify-center py-4 text-3xl font-semibold text-muted-foreground">
                <Image
                  src="/coming-soon.png"
                  width={150}
                  height={150}
                  alt="Logo"
                />
              </div>
            </DialogContent>
          </Dialog>
          <AddVideo
            courseNftAddress={courseNftAddress as string}
            courseId={courseId as string}
            courseCreator={address as string}
          />
        </div>
      </div>
      {/* Course Details */}
      <div className="my-8">
        <div className="flex justify-between items-center mb-4">
          <p className="text-4xl font-semibold py-1"> {courseName}</p>
        </div>
        <div className="flex w-full gap-8">
          <div className="flex flex-col gap-4 bg-gray-100 shadow-sm p-4 rounded-[10px] w-full">
            <p className="text-2xl font-bold flex ">Course Details</p>

            <div className="flex gap-2 items-center">
              <p className="font-semibold"> Course ID : </p>
              <Badge>{courseId}</Badge>
            </div>
            <div className="flex gap-2 items-center">
              <p className="font-semibold">Course Price : </p>
              <p className="text-lg"> {Number(coursePrice) / 10 ** 18} PHT</p>
            </div>

            <p className="font-semibold">
              {" "}
              Course NFT Address :
              <span className="font-normal text-blue-500">
                {" "}
                {courseNftAddress}
              </span>
            </p>
            <p className="font-semibold">
              Course Description :{" "}
              <span className="text-muted-foreground">
                {" "}
                {courseDescription}
              </span>
            </p>
          </div>
          <div className="flex justify-center  p-3 rounded-[10px] object-contain mb-4 w-full">
            <Image
              src={"/logo.png"}
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
          {!loading ? (
            courseVideos.length === 0 ? (
              <div className="flex justify-center text-lg font-bold mt-4 text-muted-foreground">
                You have not added any videos to this course yet.
              </div>
            ) : (
              courseVideos.map((video: Video) => (
                <Card key={video.id} className="shadow-md">
                  <CardContent className="flex justify-between items-center pt-4">
                    <div className="flex flex-col gap-2">
                      <CardTitle>{video.name}</CardTitle>
                      <CardDescription>{video.description}</CardDescription>
                    </div>
                    <Button onClick={() => handleViewVideo(video.id)}>
                      View
                    </Button>
                  </CardContent>
                </Card>
              ))
            )
          ) : (
            <>
              <Card className="shadow-md">
                <CardContent className="flex justify-between items-center pt-4">
                  <div className="flex flex-col gap-2">
                    <Skeleton className="w-36 h-4 rounded-lg " />
                    <Skeleton className="w-56 h-4 rounded-lg" />
                  </div>
                  <Skeleton className="h-10 w-24 rounded-lg" />
                </CardContent>
              </Card>
              <Card className="shadow-md">
                <CardContent className="flex justify-between items-center pt-4">
                  <div className="flex flex-col gap-2">
                    <Skeleton className="w-36 h-4 rounded-lg " />
                    <Skeleton className="w-56 h-4 rounded-lg" />
                  </div>
                  <Skeleton className="h-10 w-24 rounded-lg" />
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
