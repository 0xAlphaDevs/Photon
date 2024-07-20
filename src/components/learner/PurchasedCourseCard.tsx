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
import { PhotonTokenAbi, PhotonTokenAddress } from "@/lib/abi/PhotonToken";
import { useRouter } from "next/navigation";

interface Course {
  courseId: string;
  name: string;
  description: string;
  price: number;
  owner: string;
}

export function PurchasedCourseCard({ courseNftAddress }: any) {
  const router = useRouter();
  const [course, setCourse] = React.useState<Course>({
    courseId: "loading...",
    name: "loading...",
    description: "loading...",
    price: 0,
    owner: "loading...",
  });
  const { error, isPending, writeContract } = useWriteContract();

  const { data: courseId } = useReadContract({
    address: courseNftAddress,
    abi: PhotonCourseAbi,
    functionName: "symbol",
  });

  const { data: owner } = useReadContract({
    address: courseNftAddress,
    abi: PhotonCourseAbi,
    functionName: "owner",
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
      owner:
        (owner as string)?.slice(0, 6) + "..." + (owner as string)?.slice(-6),
    });
  }, [description, name, price, courseId, owner]);

  const handleViewCourse = (id: string) => {
    router.push(`/learner/purchases/course/${id}`);
  };

  return (
    <Card key={courseNftAddress} className="shadow-md">
      <CardHeader>
        <CardTitle>{course.name}</CardTitle>
        <CardDescription>
          <div>
            <p> {course.description}</p>
            <p className="font-semibold py-2 text-blue-500">
              {" "}
              Educator : {course.owner}
            </p>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p>Course ID : {course.courseId}</p>
        <p>Price: {course.price / 10 ** 18} PHT</p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => handleViewCourse(course.courseId)}
          className="w-full"
        >
          View Course
        </Button>
      </CardFooter>
    </Card>
  );
}
