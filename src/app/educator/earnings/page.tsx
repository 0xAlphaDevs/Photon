"use client";
import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EarningChart } from "@/components/educator/earningChart";
import {
  PhotonCourseFactoryAbi,
  PhotonCourseFactoryAddress,
} from "@/lib/abi/PhotonCourseFactoryAbi";
import { useAccount, useReadContract } from "wagmi";
import EarningCourseCard from "@/components/educator/earningsCourseCard";
import { Skeleton } from "@/components/ui/skeleton";

const EducatorEarnings = () => {
  const { address } = useAccount();
  const [courses, setCourses] = React.useState<string[]>([]);
  const { data: allCourses, isLoading } = useReadContract({
    address: PhotonCourseFactoryAddress,
    abi: PhotonCourseFactoryAbi,
    functionName: "getCoursesCreatedByEducator",
    account: address,
  });

  useMemo(() => {
    if (allCourses) {
      setCourses(allCourses as string[]);
    }
  }, [allCourses]);

  return (
    <div className="py-8">
      <p className="text-3xl font-medium"> Earnings</p>
      <div className="flex gap-8 w-full my-8">
        <Card className="w-[50%] h-60">
          <CardHeader>
            <CardTitle>Profile Overview</CardTitle>
            <CardDescription>
              Below are the details of your total earnings.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <p>Total Courses : </p>
              <p className="font-bold">34</p>
            </div>
            <div className="flex items-center gap-4">
              <p>Total Sales : </p>
              <p className="font-bold">26</p>
            </div>
            <div className="flex items-center gap-4">
              <p>Total Revenue : </p>
              <p className="font-bold">$ 3400</p>
            </div>
          </CardContent>
        </Card>
        <Card className="w-[50%] h-60">
          <CardContent className="">
            <EarningChart />
          </CardContent>
        </Card>
      </div>
      <div>
        <p className="text-xl font-medium"> Course wise breakup </p>
        <div className="flex flex-col gap-4 my-4">
          {isLoading ? (
            <div className="flex flex-col gap-4">
              <Skeleton className="h-20 rounded-lg" />
              <Skeleton className="h-20 rounded-lg" />
              <Skeleton className="h-20 rounded-lg" />
            </div>
          ) : (
            courses.map((courseAddress) => (
              <EarningCourseCard
                key={courseAddress}
                courseNftAddress={courseAddress}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EducatorEarnings;
