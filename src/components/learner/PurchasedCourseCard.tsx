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
import { useAccount, useReadContracts, useWriteContract } from "wagmi";
import { PhotonTokenAbi, PhotonTokenAddress } from "@/lib/abi/PhotonToken";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";

interface Course {
  courseId: string;
  name: string;
  description: string;
  price: number;
  owner: string;
}

export function PurchasedCourseCard({ courseNftAddress }: any) {
  const router = useRouter();
  const { address } = useAccount();
  const [course, setCourse] = React.useState<Course>({
    courseId: "loading...",
    name: "loading...",
    description: "loading...",
    price: 0,
    owner: "loading...",
  });
  const { error, isPending, writeContract } = useWriteContract();

  const {
    data: readContractsData,
    error: readContractsError,
    isLoading: readContractsLoading,
  } = useReadContracts({
    contracts: [
      {
        address: courseNftAddress,
        abi: PhotonCourseAbi,
        functionName: "symbol",
      },
      {
        address: courseNftAddress,
        abi: PhotonCourseAbi,
        functionName: "owner",
      },
      {
        address: courseNftAddress,
        abi: PhotonCourseAbi,
        functionName: "description",
      },
      {
        address: courseNftAddress,
        abi: PhotonCourseAbi,
        functionName: "name",
      },
      {
        address: courseNftAddress,
        abi: PhotonCourseAbi,
        functionName: "price",
      },
    ],
  });

  useMemo(() => {
    if (!readContractsLoading && readContractsData) {
      const [courseId, owner, description, name, price] = readContractsData.map(
        (result) => result.result
      );

      setCourse({
        courseId: courseId as string,
        name: name as string,
        description: description as string,
        price: Number(price),
        owner:
          (owner as string)?.slice(0, 6) + "..." + (owner as string)?.slice(-6),
      });
    }
  }, [readContractsData, readContractsLoading]);

  const handleViewCourse = (id: string) => {
    router.push(`/learner/purchases/course/${id}`);
  };

  if (readContractsLoading) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-4 w-[200px]" />
          </CardTitle>
          <CardDescription>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-between">
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-4 w-[80px]" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-12 w-full" />
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card key={courseNftAddress} className="shadow-md">
      <CardHeader>
        <CardTitle>{course.name}</CardTitle>
        <CardDescription>
          <div>
            <p> {course.description}</p>
            <p className="font-semibold py-2 text-blue-500">
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
