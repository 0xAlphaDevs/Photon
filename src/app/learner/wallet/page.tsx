"use client";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
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
    console.log("balance", balance);
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
          <CardTitle> {phtBalance} PHT</CardTitle>
        </Card>
      </div>
      <div className="flex justify-center">
        {error && <div className="text-red-500">{error.message}</div>}
        <Button onClick={handlePHTMint} className="text-lg">
          Mint 100 PHT
        </Button>
      </div>
    </div>
  );
};

export default LearnerWallet;
