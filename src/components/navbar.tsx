import React from "react";
import { NavbarProps } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

const Navbar: React.FC<NavbarProps> = ({ links }) => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="#" className="flex items-center gap-4 font-bold" prefetch={false}>
              <Image
                src="/favicon.png"
                width={40}
                height={40}
                alt="Picture of the author"
              />
              <span className="text-3xl">Photon</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="flex items-center gap-4 rounded-lg px-3 py-2 transition-all text-lg hover:bg-slate-200"
                  prefetch={false}
                >
                  {link.image}
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
