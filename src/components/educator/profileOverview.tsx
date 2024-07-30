import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EarningChart } from "./earningChart";
import { PhotonCourseAbi } from "@/lib/abi/PhotonCourseAbi";
import { useReadContracts } from "wagmi";

const ProfileOverview = ({ allCourses }: { allCourses: string[] }) => {
  const courses: string[] = allCourses;
  const [totalSales, setTotalSales] = React.useState(0);
  const [courseEarnings, setCourseEarnings] = React.useState([
    { courseId: "00000", earnings: 0 },
  ]);
  const [totalEarnings, setTotalEarnings] = React.useState(0);

  const earningsContractCalls = courses.map((course: string) => ({
    address: course as `0x${string}`,
    abi: PhotonCourseAbi,
    functionName: "getCourseEarnings",
  }));

  const totalSalesContractCalls = courses.map((course: string) => ({
    address: course as `0x${string}`,
    abi: PhotonCourseAbi,
    functionName: "totalSupply",
  }));

  const courseSymbolContractCalls = courses.map((course: string) => ({
    address: course as `0x${string}`,
    abi: PhotonCourseAbi,
    functionName: "symbol",
  }));

  const {
    data: earningsData,
    error: readEarningsError,
    isLoading: readEarningsLoading,
  } = useReadContracts({
    //@ts-ignore
    contracts: earningsContractCalls,
  });

  const {
    data: totalSalesData,
    error: readTotalSalesError,
    isLoading: readTotalSalesLoading,
  } = useReadContracts({
    //@ts-ignore
    contracts: totalSalesContractCalls,
  });

  const {
    data: courseSymbolData,
    error: readCourseSymbolError,
    isLoading: readCourseSymbolLoading,
  } = useReadContracts({
    //@ts-ignore
    contracts: courseSymbolContractCalls,
  });

  useMemo(() => {
    // console.log("earnings data :", earningsData);

    if (
      !readEarningsLoading &&
      earningsData &&
      !readCourseSymbolLoading &&
      courseSymbolData
    ) {
      // sum all the earnings
      const totalEarnings = earningsData.reduce((acc, contract) => {
        return acc + Number(contract.result) / 10 ** 18;
      }, 0);

      const courseEarnings = earningsData.map((contract, index) => {
        return {
          courseId: courseSymbolData[index].result as string,
          earnings: Number(contract.result) / 10 ** 18,
        };
      });

      // console.log("course earnings :", courseEarnings);

      setCourseEarnings(courseEarnings);

      setTotalEarnings(totalEarnings);
    }
  }, [
    earningsData,
    readEarningsLoading,
    courseSymbolData,
    readCourseSymbolLoading,
  ]);

  useMemo(() => {
    if (!readTotalSalesLoading && totalSalesData) {
      // sum all the total sales
      const totalSales = totalSalesData.reduce((acc, contract) => {
        return acc + Number(contract.result);
      }, 0);

      console.log("total sales :", totalSales);

      setTotalSales(totalSales - 1);
    }
  }, [totalSalesData, readTotalSalesLoading]);

  return (
    <div className="flex gap-8 w-full my-8">
      <Card className="w-[50%] ">
        <CardHeader>
          <CardTitle className="">Profile Overview</CardTitle>
          <CardDescription>
            Below are the details of your total earnings.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <p className="text-lg">Total Courses : </p>
            <p className="font-bold text-lg">{courses.length}</p>
          </div>
          <div className="flex items-center gap-4 text-lg">
            <p>Total Sales : </p>
            <p className="font-bold">{totalSales}</p>
          </div>
          <div className="flex items-center gap-4 text-lg">
            <p>Total Revenue : </p>
            <p className="font-bold"> {totalEarnings} PHT</p>
          </div>
        </CardContent>
      </Card>
      <Card className="w-[50%] ">
        <CardHeader>
          <CardTitle>Course Wise Earnings</CardTitle>
          <CardDescription>
            Below are the details of your course wise earnings
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <EarningChart courseEarnings={courseEarnings} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileOverview;
