import React, { useMemo } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useAccount, useReadContract, useReadContracts } from 'wagmi'
import { PhotonCourseAbi } from '@/lib/abi/PhotonCourseAbi'
import { Badge } from '../ui/badge'
import { Skeleton } from '../ui/skeleton'

interface MyCoursesCard {
  courseId: string;
  name: string;
  description: string;
  price: number;
  balance: number;
}

const MyCoursesCard = ({ courseNftAddress }: any) => {
  const router = useRouter();
  const { address } = useAccount();
  const [course, setCourse] = React.useState<MyCoursesCard>({
    courseId: "loading...",
    name: "loading...",
    description: "loading...",
    price: 0,
    balance: 0,
  });

  const {
    data: readContractsData,
    isLoading: readContractsLoading,
    error: readContractsError,
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
    ],
  });

  useMemo(() => {
    if (!readContractsLoading && readContractsData) {
      const [
        courseId,
        description,
        name,
        price,
        nftBalance,
      ] = readContractsData.map((result) => result.result);

      setCourse({
        courseId: courseId as string,
        name: name as string,
        description: description as string,
        price: Number(price),
        balance: Number(nftBalance),
      });
    }
  }, [readContractsData, readContractsLoading]);

  const handleViewCourse = (id: string) => {
    router.push(`/educator/dashboard/course/${id}`);
  };

  if (readContractsLoading) {
    return (
      <Card key={courseNftAddress} className='shadow-md'>
        <CardHeader>
          <CardTitle className='flex justify-between items-center'>
            <Skeleton className='h-6 w-[200px]' />
            <Skeleton className='h-6 w-[200px]' />
          </CardTitle>
          <CardDescription >
            <Skeleton className='h-4 w-[300px]' />
          </CardDescription>
        </CardHeader>
        <CardContent className='flex justify-between items-center'>
          <Skeleton className='h-4 w-[100px]' />
          <Skeleton className='h-10 w-[100px]' />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card key={courseNftAddress} className='shadow-md'>
      <CardHeader>
        <CardTitle className='flex justify-between items-center'>
          <p> {course.name}</p>
          <div className='flex gap-2 items-center'>
            <p className='text-sm'>Course ID :</p>
            <Badge> {course.courseId}</Badge>
          </div>
        </CardTitle>
        <CardDescription >
          <p> {course.description}</p>
        </CardDescription>
      </CardHeader>
      <CardContent className='flex justify-between items-center'>
        <p className='text-muted-foreground'>Price: <strong className="text-lg font-bold">{course.price / 10 ** 18} PHT</strong></p>
        <Button className='' onClick={() => handleViewCourse(course.courseId)}>Edit Course</Button>
      </CardContent>
    </Card>
  )
}

export default MyCoursesCard