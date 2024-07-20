"use client";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PhotonTokenAbi, PhotonTokenAddress } from "@/lib/abi/PhotonToken";
import React, { useMemo } from "react";
import { useReadContract, useAccount } from "wagmi";

const EducatorWallet = () => {
  const { address } = useAccount();
  const [phtBalance, setPhtBalance] = React.useState<number>(0);

  const { data: balance } = useReadContract({
    address: PhotonTokenAddress,
    abi: PhotonTokenAbi,
    functionName: "balanceOf",
    args: [address],
  });

  useMemo(() => {
    console.log("balance", balance);
    if (balance) {
      const phtBalance = Number(balance) / 10 ** 18;
      setPhtBalance(phtBalance);
    }
  }, [balance]);

  return (
    <div className="flex flex-col gap-10 p-16">
      <div className="flex flex-col gap-4 justify-center items-center ">
        <div className="text-4xl font-semibold">Your Holdings</div>
        {/* <div className="border border-solid border-slate-800 w-full" /> */}
      </div>
      <div className="flex justify-around">
        <Card className="flex flex-col gap-4 p-4 shadow-md w-96">
          <CardDescription> Current balance </CardDescription>
          {!phtBalance ? (
            <Skeleton className="h-8 w-28 rounded-lg" />
          ) : (
            <CardTitle> {phtBalance} PHT</CardTitle>
          )}
        </Card>
      </div>
    </div>
  );
};

export default EducatorWallet;
