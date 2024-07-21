import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EarningChart } from "./earningChart";

const ProfileOverview = ({ allCourses }: { allCourses: any[] }) => {
  const courses = allCourses;
  console.log(courses);
  //TO DO: Add logic to calculate total sales and revenue

  return (
    <div className="flex gap-8 w-full my-8">
      <Card className="w-[50%] h-60">
        <CardHeader>
          <CardTitle>Profile Overview</CardTitle>
          <CardDescription>
            Below are the details of your total earnings.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <p>Total Courses : </p>
            <p className="font-bold">{courses.length}</p>
          </div>
          <div className="flex items-center gap-4">
            <p>Total Sales : </p>
            <p className="font-bold">26</p>
          </div>
          <div className="flex items-center gap-4">
            <p>Total Revenue : </p>
            <p className="font-bold"> 3400 PHT</p>
          </div>
        </CardContent>
      </Card>
      <Card className="w-[50%] h-60">
        <CardContent className="">
          <EarningChart />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileOverview;
