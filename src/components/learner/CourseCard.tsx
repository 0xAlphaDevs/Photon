import React, { useEffect, useMemo } from "react";
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
import { Skeleton } from "../ui/skeleton";
import { useToast } from "../ui/use-toast";

interface Course {
  courseId: string;
  name: string;
  description: string;
  price: number;
  balance: number;
  owner: string;
}

const CourseCard = ({ courseNftAddress }: any) => {
  const { address } = useAccount();
  const { toast } = useToast();
  const [course, setCourse] = React.useState<Course>({
    courseId: "loading...",
    name: "loading...",
    description: "loading...",
    price: 0,
    balance: 0,
    owner: "loading...",
  });
  const { error, isPending, isSuccess, writeContract } = useWriteContract();

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
      {
        address: courseNftAddress,
        abi: PhotonCourseAbi,
        functionName: "balanceOf",
        args: [address],
      },
      {
        address: PhotonTokenAddress,
        abi: PhotonTokenAbi,
        functionName: "allowance",
        args: [address, courseNftAddress],
      },
    ],
  });

  useMemo(() => {
    if (!readContractsLoading && readContractsData) {
      const [courseId, owner, description, name, price, nftBalance, allowance] =
        readContractsData.map((result) => result.result);

      setCourse({
        courseId: courseId as string,
        name: name as string,
        description: description as string,
        price: Number(price),
        balance: Number(nftBalance),
        owner:
          (owner as string)?.slice(0, 6) + "..." + (owner as string)?.slice(-6),
      });
    }
  }, [readContractsData, readContractsLoading]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Opps!",
        description: error.message || "Please enter a valid contract address",
        variant: "destructive",
      });
    }
  }, [error]);

  const handlePurchase = () => {
    console.log("purchase initiated", courseNftAddress, course.price);

    writeContract({
      address: courseNftAddress,
      abi: PhotonCourseAbi,
      functionName: "purchaseCourse",
      // args: [],
    });
  };

  const handleApprove = () => {
    writeContract({
      address: PhotonTokenAddress,
      abi: PhotonTokenAbi,
      functionName: "approve",
      args: [courseNftAddress, (course.price as number) + 1 * 10 ** 18],
    });
  };

  const allowance = readContractsData ? readContractsData[6].result : 0;

  if (readContractsLoading) {
    return (
      <Card key={courseNftAddress} className="shadow-md">
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
            <p>{course.description}</p>
            <p className="font-semibold py-2 text-blue-500">
              Educator : {course.owner}
            </p>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p>Course ID: {course.courseId}</p>
        <p>Price: {course.price / 10 ** 18} PHT</p>
      </CardContent>
      <CardFooter>
        {course.balance > 0 ? (
          <Button className="w-full" variant={"success"} disabled>
            Course Already Purchased
          </Button>
        ) : Number(allowance) < course.price ? (
          <Button onClick={handleApprove} className="w-full">
            Approve PHT spend
          </Button>
        ) : (
          <Button
            onClick={handlePurchase}
            className="w-full"
            disabled={isPending}
          >
            {isPending ? "Purchasing..." : "Buy Course"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
