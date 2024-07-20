"use client";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PhotonTokenAbi, PhotonTokenAddress } from "@/lib/abi/PhotonToken";
import React, { useMemo } from "react";
import { useReadContract, useWriteContract, useAccount } from "wagmi";

const LearnerWallet = () => {
  const { address } = useAccount();
  const [phtBalance, setPhtBalance] = React.useState<number>(0);

  const { error, isPending, writeContract } = useWriteContract();

  const { data: balance } = useReadContract({
    address: PhotonTokenAddress,
    abi: PhotonTokenAbi,
    functionName: "balanceOf",
    args: [address],
  });

  useMemo(() => {
    if (balance) {
      const phtBalance = Number(balance); // TODO: Convert to PHT by dividing by 10^18
      setPhtBalance(phtBalance);
    }
  }, [balance]);

  const handlePHTMint = () => {
    writeContract({
      address: PhotonTokenAddress,
      abi: PhotonTokenAbi,
      functionName: "mint",
      args: [address, 100],
    });
  };

  return (
    <div className="flex flex-col gap-10 p-16">
      <div className="flex flex-col gap-4 justify-center items-center ">
        <div className="text-4xl font-semibold">Your Holdings</div>
        <div className="border border-solid border-slate-800 w-full" />
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
      <div className="flex justify-center">
        {!phtBalance ? (
          <Skeleton className="h-12 w-28 rounded-lg" />
        ) : (
          <Button onClick={handlePHTMint} className="text-lg">
            Mint 100 PHT
          </Button>
        )}
      </div>
    </div>
  );
};

export default LearnerWallet;
