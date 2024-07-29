import UserRegistery from "@/components/userRegistry";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image src="/logo.png" width={150} height={150} alt="Logo" />
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-bold text-primary">Welcome to Photon !</h1>
        <p className="text-muted-foreground">
          Decentralised learning and teaching platform | Powered by Theta
          Network
        </p>
      </div>
      <UserRegistery />
      <div className="grid grid-cols-3 gap-8 px-20 py-8 ">
        <Card className="shadow-sm border-none h-full w-full bg-yellow-300 rounded-lg bg-opacity-15 border cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110">
          <CardHeader>
            <CardDescription className="text-center pt-1 text-lg font-semibold text-black">NFT based
              DRM protected courses</CardDescription>
          </CardHeader>
        </Card>
        <Card className="shadow-sm border-none h-full w-full bg-yellow-300 rounded-lg bg-opacity-15 border cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110">
          <CardHeader>
            <CardDescription className="text-center pt-1 text-lg font-semibold text-black">Decentralized video powered by Theta edgecloud</CardDescription>
          </CardHeader>
        </Card>
        <Card className="shadow-sm border-none h-full w-full bg-yellow-300 rounded-lg bg-opacity-15 border cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110">
          <CardHeader>
            <CardDescription className="text-center pt-1 text-lg font-semibold text-black">Payments in Photon tokens</CardDescription>
          </CardHeader>
        </Card>
      </div>
      <div className="fixed container mx-auto bottom-4">
        <hr className="border-t-1 border-slate-600 mb-4" />
        <div className="flex justify-center items-center">
          <p className="text-muted-foreground">
            &copy;{" "}
            <a href="https://www.alphadevs.dev/" target="_blank">
              alphadevs.dev
            </a>{" "}
            | All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
