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
import { useAccount, useReadContract } from 'wagmi'
import { PhotonCourseAbi } from '@/lib/abi/PhotonCourseAbi'

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

  const { data: courseId } = useReadContract({
    address: courseNftAddress,
    abi: PhotonCourseAbi,
    functionName: "symbol",
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

  useMemo(() => {
    setCourse({
      ...course,
      courseId: courseId as string,
      name: name as string,
      description: description as string,
      price: Number(price),
      balance: Number(nftBalance),
    });
  }, [description, name, price, courseId, nftBalance]);

  const handleViewCourse = (id: string) => {
    router.push(`/educator/dashboard/course/${id}`);
  };

  return (
    <Card key={courseNftAddress} className='shadow-md'>
      <CardHeader>
        <CardTitle>{course.name}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent className='flex justify-between'>
        <p>Course ID: {course.courseId}</p>
        <p>Price: ${course.price}</p>
      </CardContent>
      <CardFooter>
        <Button className='w-full' onClick={() => handleViewCourse(course.courseId)}>View Course</Button>
      </CardFooter>
    </Card>
  )
}

export default MyCoursesCard