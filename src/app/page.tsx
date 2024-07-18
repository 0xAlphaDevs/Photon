"use client";
import UserRegistery from "@/components/userRegistry";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Photon
      <UserRegistery />
    </main>
  );
}
