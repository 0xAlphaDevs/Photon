"use client";
import React, { useMemo } from "react";
import {
  PhotonCourseFactoryAbi,
  PhotonCourseFactoryAddress,
} from "@/lib/abi/PhotonCourseFactoryAbi";
import { useAccount, useReadContract } from "wagmi";
import EarningCourseCard from "@/components/educator/earningsCourseCard";
import { Skeleton } from "@/components/ui/skeleton";
import ProfileOverview from "@/components/educator/profileOverview";

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
      <ProfileOverview allCourses={courses} />
      <div>
        <p className="text-xl font-medium"> Course wise breakup </p>
        <div className="flex flex-col gap-4 my-4">
          {isLoading ? (
            <div className="flex flex-col gap-4">
              <Skeleton className="rounded-lg shadow-md bg-white h-28" />
              <Skeleton className="rounded-lg shadow-md bg-white h-28" />
              <Skeleton className="rounded-lg shadow-md bg-white h-28" />
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
