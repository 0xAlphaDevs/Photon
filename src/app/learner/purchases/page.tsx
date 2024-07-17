"use client"

import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { courses } from '@/lib/courses'
import { Course } from '@/lib/types'
import { useRouter } from 'next/navigation'

const LearnerPurchases = () => {

  const router = useRouter();

  const handleViewCourse = (id: string) => {
    router.push(`/learner/purchases/course/${id}`);
  };

  return (
    <div className="py-8">
      <p className='text-3xl font-medium'>My Purchases</p>
      <div className='grid grid-cols-3 gap-8 py-16'>
        {courses.map((course: Course) => (
          <Card key={course.id} className='shadow-md'>
            <CardHeader>
              <CardTitle>{course.name}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent className='flex justify-between'>
              <p>Id: {course.id}</p>
              <p>Price: ${course.price}</p>
            </CardContent>
            <CardFooter>
              <Button className='w-full' onClick={() => handleViewCourse(course.id)}>View Course</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default LearnerPurchases