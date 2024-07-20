"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  PhotonCourseFactoryAbi,
  PhotonCourseFactoryAddress,
} from "@/lib/abi/PhotonCourseFactoryAbi";
import { PurchasedCourseCard } from "@/components/learner/PurchasedCourseCard";
import { useAccount, useReadContract } from "wagmi";

const LearnerPurchases = () => {
  const { address } = useAccount();

  const [courses, setCourses] = React.useState<string[]>([]);

  const { data: purchasedCourses } = useReadContract({
    address: PhotonCourseFactoryAddress,
    abi: PhotonCourseFactoryAbi,
    functionName: "getAllCoursesPurchasedByLearner",
    account: address,
  });

  useMemo(() => {
    console.log("Purchased Courses :", purchasedCourses);

    if (purchasedCourses) {
      setCourses(purchasedCourses as string[]);
    }
  }, [purchasedCourses]);

  return (
    <div className="py-8">
      <p className="text-3xl font-medium">My Purchases</p>
      <div className="grid grid-cols-3 gap-8 py-16">
        {courses?.map((courseAddress: string) => (
          <PurchasedCourseCard
            key={courseAddress}
            courseNftAddress={courseAddress}
          />
        ))}
      </div>
    </div>
  );
};

export default LearnerPurchases;
