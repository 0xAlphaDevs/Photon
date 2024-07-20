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
import { Button } from "@/components/ui/button";
// import { courses } from "@/lib/courses";
import { Course } from "@/lib/types";
import { useReadContract } from "wagmi";
import {
  PhotonCourseFactoryAbi,
  PhotonCourseFactoryAddress,
} from "@/lib/abi/PhotonCourseFactoryAbi";
import CourseCard from "@/components/learner/CourseCard";

const LearnerDashboard = () => {
  const [courses, setCourses] = React.useState<string[]>([]);

  const { data: allCourses } = useReadContract({
    address: PhotonCourseFactoryAddress,
    abi: PhotonCourseFactoryAbi,
    functionName: "getAllCourses",
  });

  useMemo(() => {
    if (allCourses) {
      setCourses(allCourses as string[]);
    }
  }, [allCourses]);

  return (
    <div className="py-8">
      <p className="text-3xl font-medium">All Courses</p>
      <div className="grid grid-cols-3 gap-8 py-16">
        {courses?.map((courseAddress: string) => (
          <CourseCard key={courseAddress} courseNftAddress={courseAddress} />
        ))}
      </div>
    </div>
  );
};

export default LearnerDashboard;
