import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Web3ModalProvider from "@/components/wallet/providers";
import { config } from "@/components/wallet/config";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Photon",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3ModalProvider> {children}</Web3ModalProvider>
      </body>
    </html>
  );
}


