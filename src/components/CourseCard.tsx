import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PhotonCourseAbi } from "@/lib/abi/PhotonCourseAbi";
import { useReadContract } from "wagmi";

interface Course {
  courseId: string;
  name: string;
  description: string;
  price: number;
}

const CourseCard = ({ courseNftAddress }: any) => {
  const [course, setCourse] = React.useState<Course>({
    courseId: "THETA101",
    name: "loading...",
    description: "loading...",
    price: 25,
  });
  // tokenid -> nft symbol , nft name, description, price

  const { data: description } = useReadContract({
    address: courseNftAddress,
    abi: PhotonCourseAbi,
    functionName: "description",
  });

  const { data: name } = useReadContract({
    address: courseNftAddress,
    abi: PhotonCourseAbi,
    functionName: "name",
  });

  useMemo(() => {
    setCourse({
      ...course,
      name: name as string,
      description: description as string,
    });
  }, [description, name]);

  return (
    <Card key={courseNftAddress} className="shadow-md">
      <CardHeader>
        <CardTitle>{course.name}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p>Id: {course.courseId}</p>
        <p>Price: ${course.price}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Buy Course</Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
