import Navbar from "@/components/navbar";
import { CircleDollarSignIcon, VideoIcon, WalletIcon } from "lucide-react";

const links = [
  {
    href: "/learner/dashboard",
    text: "All Courses",
    image: <VideoIcon className="h-6 w-6" />,
  },
  {
    href: "/learner/purchases",
    text: "My Purchases",
    image: <CircleDollarSignIcon className="h-6 w-6" />,
  },
  {
    href: "/learner/wallet",
    text: "Wallet",
    image: <WalletIcon className="h-6 w-6" />,
  },
];

export default function ClientDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-12 w-full">
      <Navbar links={links} supText="Learner" />
      <div className="col-start-3 col-end-13 pr-10 pl-16 z-40"> {children}</div>
    </section>
  );
}
