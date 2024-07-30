"use client";

import React, { useEffect } from "react";
import { NavbarProps } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { ConnectKitButton } from "connectkit";
import { usePathname, useRouter } from "next/navigation";
import { useAccount } from "wagmi";

const Navbar: React.FC<NavbarProps> = ({ links, supText }) => {
  const pathname = usePathname();
  const { isDisconnected, isConnected, address } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isDisconnected) {
      router.push("/");
    }
  }, [isDisconnected]);

  return (
    <div className="grid fixed top-0 left-0 min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              href="#"
              className="flex items-center gap-4 font-bold"
              prefetch={false}
            >
              <Image
                src="/favicon.png"
                width={40}
                height={40}
                alt="Picture of the author"
              />
              <span className="text-3xl">
                Photon
                <sup className="text-sm font-semibold absolute ml-2 mt-4">
                  {supText}
                </sup>
              </span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-3 text-lg py-2 my-2 transition-all hover:bg-slate-200 ${
                    pathname === link.href ? "bg-slate-300" : ""
                  }`}
                  prefetch={false}
                >
                  {link.image}
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-8 flex justify-center ">
            <ConnectKitButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
