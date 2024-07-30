import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PhotonCourseAbi } from "@/lib/abi/PhotonCourseAbi";
import { useAccount, useReadContracts, useWriteContract } from "wagmi";
import { Skeleton } from "../ui/skeleton";

interface Course {
  name: string;
  description: string;
  symbol: string;
  courseEarnings: number;
}

const EarningCourseCard = ({ courseNftAddress }: any) => {
  const { address } = useAccount();
  const [course, setCourse] = React.useState<Course>({
    name: "",
    description: "",
    symbol: "",
    courseEarnings: 0,
  });
  const { error, isPending, writeContract } = useWriteContract();
  const {
    data: contractsData,
    error: readContractsError,
    isLoading: readContractsLoading,
  } = useReadContracts({
    contracts: [
      {
        address: courseNftAddress,
        abi: PhotonCourseAbi,
        functionName: "name",
      },
      {
        address: courseNftAddress,
        abi: PhotonCourseAbi,
        functionName: "description",
      },
      {
        address: courseNftAddress,
        abi: PhotonCourseAbi,
        functionName: "symbol",
      },
      {
        address: courseNftAddress,
        abi: PhotonCourseAbi,
        functionName: "getCourseEarnings",
      },
    ],
  });

  useMemo(() => {
    if (!readContractsLoading && contractsData) {
      const [name, description, symbol, courseEarnings] = contractsData.map(
        (result) => result.result
      );
      setCourse({
        ...course,
        name: name as string,
        description: description as string,
        symbol: symbol as string,
        courseEarnings: Number(courseEarnings) / 10 ** 18,
      });
    }
  }, [contractsData, readContractsLoading]);

  const handleWithdrawEarnings = () => {
    writeContract({
      address: courseNftAddress,
      abi: PhotonCourseAbi,
      functionName: "withdrawCourseEarnings",
    });
  };

  if (readContractsLoading) {
    return (
      <Card key={courseNftAddress} className="shadow-md">
        <CardContent className="flex justify-between items-center pt-4">
          <div className="flex flex-col gap-4">
            <Skeleton className="w-36 h-4 rounded-lg " />
            <Skeleton className="w-56 h-4 rounded-lg" />
            <CardDescription className="flex gap-40">
              <Skeleton className="h-4 w-24 rounded-lg" />
              <Skeleton className="h-4 w-24 rounded-lg" />
            </CardDescription>
          </div>
          <Skeleton className="h-10 w-32 rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card key={courseNftAddress} className="shadow-md">
      <CardContent className="flex justify-between items-center pt-4">
        <div className="flex flex-col gap-2">
          <CardTitle>{course.name}</CardTitle>
          <CardDescription>
            Course Description : {course.description}
          </CardDescription>
          <CardDescription className="flex gap-40">
            <p>
              Course code : <strong className="text-lg">{course.symbol}</strong>
            </p>
            <p>
              Course earnings :{" "}
              <strong className="text-lg">{course.courseEarnings} PHT</strong>
            </p>
          </CardDescription>
        </div>
        <Button onClick={handleWithdrawEarnings}>Withdraw Earnings</Button>
      </CardContent>
    </Card>
  );
};

export default EarningCourseCard;
