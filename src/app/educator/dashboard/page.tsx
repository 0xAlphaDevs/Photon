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
      <div className="grid grid-cols-3 gap-8 py-16">
        {courses.map((courseAddress: string) => (
          <MyCoursesCard key={courseAddress} courseNftAddress={courseAddress} />
        ))}
      </div>
    </div>
  );
};

export default EducatorDashboard;
