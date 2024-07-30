"use client";

import React, { useMemo } from "react";
import { CreateCourse } from "@/components/educator/createCourse";
import MyCoursesCard from "@/components/educator/myCoursesCard";
import {
  PhotonCourseFactoryAbi,
  PhotonCourseFactoryAddress,
} from "@/lib/abi/PhotonCourseFactoryAbi";
import { useAccount, useReadContract } from "wagmi";

const EducatorDashboard = () => {
  const { address } = useAccount();
  const [courses, setCourses] = React.useState<string[]>([]);
  const { data: allCourses } = useReadContract({
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
      <div className="flex justify-between">
        <p className="text-3xl font-medium">Courses</p>
        <CreateCourse />
      </div>
      <div className="flex flex-col gap-8 py-16">
        {courses.length === 0 ? (
          <div className="flex justify-center text-lg font-bold mt-4 text-muted-foreground">
            You have not created any course yet.
          </div>
        ) : (
          courses.map((courseAddress: string) => (
            <MyCoursesCard
              key={courseAddress}
              courseNftAddress={courseAddress}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default EducatorDashboard;
