import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { EarningChart } from '@/components/educator/earningChart'
import { Button } from '@/components/ui/button'
import { courses } from '@/lib/courses'


const EducatorEarnings = () => {
  return (
    <div className="py-8">
      <p className='text-3xl font-medium'> Earnings</p>
      <div className='flex gap-8 w-full my-8'>
        <Card className='w-[50%] h-60'>
          <CardHeader>
            <CardTitle>Profile Overview</CardTitle>
            <CardDescription>Below are the details of your total earnings.</CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-2'>
            <div className='flex items-center gap-4'>
              <p>Total Courses : </p>
              <p className='font-bold'>34</p>
            </div>
            <div className='flex items-center gap-4'>
              <p>Total Sales : </p>
              <p className='font-bold'>26</p>
            </div>
            <div className='flex items-center gap-4'>
              <p>Total Revenue : </p>
              <p className='font-bold'>$ 3400</p>
            </div>
          </CardContent>
        </Card>
        <Card className='w-[50%] h-60'>
          <CardContent className=''>
            <EarningChart />
          </CardContent>
        </Card>

      </div>
      <div >
        <p className='text-xl font-medium'> Course wise breakup </p>
        <div className='flex flex-col gap-4 my-4'>
          {courses.map((course, index) => (
            <Card key={index} className='shadow-md'>
              <CardContent className='flex justify-between items-center pt-4'>
                <div className='flex flex-col gap-2'>
                  <CardTitle>{course.name}</CardTitle>
                  <CardDescription className='flex gap-40'>
                    <p>Course code :</p>
                    <p>Total earnings :</p>
                  </CardDescription>
                </div>
                <Button>Withdraw Earnings</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EducatorEarnings