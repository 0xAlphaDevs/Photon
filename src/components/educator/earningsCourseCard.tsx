import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const EarningCourseCard = ({ courseNftAddress }: any) => {
  // TO DO: Fetch course details from the blockchain
  const course = {
    name: "loading...",
    code: "loading...",
    earnings: "loading...",
  };

  return (
    <Card key={courseNftAddress} className="shadow-md">
      <CardContent className="flex justify-between items-center pt-4">
        <div className="flex flex-col gap-2">
          <CardTitle>{course.name}</CardTitle>
          <CardDescription className="flex gap-40">
            <p>Course code :</p>
            <p>Total earnings :</p>
          </CardDescription>
        </div>
        <Button>Withdraw Earnings</Button>
      </CardContent>
    </Card>
  );
};

export default EarningCourseCard;
