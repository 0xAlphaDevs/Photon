import Navbar from "@/components/navbar"
import { CircleDollarSignIcon, VideoIcon } from "lucide-react";

const links = [
  { href: '/educator/dashboard', text: 'My Courses', image: <VideoIcon className="h-6 w-6" /> },
  { href: '/educator/earnings', text: 'My Earnings', image: <CircleDollarSignIcon className="h-6 w-6" /> },
];

export default function ClientDashboard({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="grid grid-cols-12 w-full">
      <Navbar links={links} />
      <div className="col-start-3 col-end-13 pr-10 pl-16 z-40"> {children}</div>
    </section>
  )
}