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
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { PhotonTokenAbi, PhotonTokenAddress } from "@/lib/abi/PhotonToken";

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
  const [course, setCourse] = React.useState<Course>({
    courseId: "loading...",
    name: "loading...",
    description: "loading...",
    price: 0,
    balance: 0,
    owner: "loading...",
  });
  const { error, isPending, writeContract } = useWriteContract();

  // tokenid -> nft symbol , nft name, description, price

  const { data: courseId } = useReadContract({
    address: courseNftAddress,
    abi: PhotonCourseAbi,
    functionName: "symbol",
  });

  const { data: owner } = useReadContract({
    address: courseNftAddress,
    abi: PhotonCourseAbi,
    functionName: "owner",
  });

  const { data: description } = useReadContract({
    address: courseNftAddress,
    abi: PhotonCourseAbi,
    functionName: "description",
  });

  const { data: name } = useReadContract({
    address: courseNftAddress,
    abi: PhotonCourseAbi,
    functionName: "name",
  });

  const { data: price } = useReadContract({
    address: courseNftAddress,
    abi: PhotonCourseAbi,
    functionName: "price",
  });

  const { data: nftBalance } = useReadContract({
    address: courseNftAddress,
    abi: PhotonCourseAbi,
    functionName: "balanceOf",
    args: [address],
  });

  const { data: allowance } = useReadContract({
    address: PhotonTokenAddress,
    abi: PhotonTokenAbi,
    functionName: "allowance",
    args: [address, courseNftAddress],
  });

  useMemo(() => {
    setCourse({
      ...course,
      courseId: courseId as string,
      name: name as string,
      description: description as string,
      price: Number(price),
      balance: Number(nftBalance),
      owner: owner as string,
    });
  }, [description, name, price, courseId, nftBalance, owner]);

  const handlePurchase = () => {
    console.log("purchase initiated", courseNftAddress, course.price);

    writeContract({
      address: courseNftAddress,
      abi: PhotonCourseAbi,
      functionName: "purchaseCourse",
      args: [],
    });
  };

  const handleApprove = () => {
    writeContract({
      address: PhotonTokenAddress,
      abi: PhotonTokenAbi,
      functionName: "approve",
      args: [courseNftAddress, course.price as number],
    });
  };

  console.log("owner", owner);

  return (
    <Card key={courseNftAddress} className="shadow-md">
      <CardHeader>
        <CardTitle>{course.name}</CardTitle>
        <CardDescription>
          <div>
            <p> {course.description}</p>
            <p className="font-semibold py-2 text-blue-500">
              {" "}
              Educator :{" "}
              {course.owner.slice(0, 6) + "..." + course.owner.slice(-6)}
            </p>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p>Course ID : {course.courseId}</p>
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
          <Button onClick={handlePurchase} className="w-full">
            Buy Course
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
