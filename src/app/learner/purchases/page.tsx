"use client";

import React, { useMemo } from "react";
import {
  PhotonCourseFactoryAbi,
  PhotonCourseFactoryAddress,
} from "@/lib/abi/PhotonCourseFactoryAbi";
import { PurchasedCourseCard } from "@/components/learner/PurchasedCourseCard";
import { useAccount, useReadContract } from "wagmi";

const LearnerPurchases = () => {
  const { address } = useAccount();

  const [courses, setCourses] = React.useState<string[]>([]);

  const { data: purchasedCourses, isLoading } = useReadContract({
    address: PhotonCourseFactoryAddress,
    abi: PhotonCourseFactoryAbi,
    functionName: "getAllCoursesPurchasedByLearner",
    account: address,
  });

  useMemo(() => {
    console.log("Purchased Courses :", purchasedCourses);
    const zeroAddress = "0x0000000000000000000000000000000000000000";

    if (purchasedCourses) {
      const courses = purchasedCourses as string[];
      const filteredCourses = courses.filter(
        (course: string) => course !== zeroAddress
      );

      setCourses(filteredCourses as string[]);
    }
  }, [purchasedCourses]);

  return (
    <div className="py-8">
      <p className="text-3xl font-medium">My Purchases</p>
      <div className="grid grid-cols-3 gap-8 py-16">
        {isLoading ? (
          <p>Loading...</p>
        ) : courses.length > 0 ? (
          courses?.map((courseAddress: string) => (
            <PurchasedCourseCard
              key={courseAddress}
              courseNftAddress={courseAddress}
            />
          ))
        ) : (
          // TO DO
          <p className=" flex justify-center items-center ">No Purchases Yet</p>
        )}
      </div>
    </div>
  );
};

export default LearnerPurchases;
