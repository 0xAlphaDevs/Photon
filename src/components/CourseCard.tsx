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
import { useAccount, useReadContract, useWriteContract } from "wagmi";

interface Course {
  courseId: string;
  name: string;
  description: string;
  price: number;
}

const CourseCard = ({ courseNftAddress }: any) => {
  const { address } = useAccount();
  const [course, setCourse] = React.useState<Course>({
    courseId: "loading...",
    name: "loading...",
    description: "loading...",
    price: 0,
  });
  const { error, isPending, writeContract } = useWriteContract();
  // tokenid -> nft symbol , nft name, description, price

  const { data: courseId } = useReadContract({
    address: courseNftAddress,
    abi: PhotonCourseAbi,
    functionName: "symbol",
  });

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

  const { data: price } = useReadContract({
    address: courseNftAddress,
    abi: PhotonCourseAbi,
    functionName: "price",
  });

  useMemo(() => {
    setCourse({
      ...course,
      courseId: courseId as string,
      name: name as string,
      description: description as string,
      price: Number(price),
    });
  }, [description, name, price, courseId]);

  const handlePurchase = () => {
    // writeContract({
    //   address: "",
    //   abi: PhotonCourseAbi,
    //   functionName: "purchaseCourse",
    //   args: [address],
    // });
  };


  return (
    <Card key={courseNftAddress} className="shadow-md">
      <CardHeader>
        <CardTitle>{course.name}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p>Course Id: {course.courseId}</p>
        <p>Price: {course.price} PHT</p>
      </CardContent>
      <CardFooter>
        <Button onClick={handlePurchase} className="w-full">Buy Course</Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
