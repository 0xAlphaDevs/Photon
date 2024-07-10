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
    <section className="grid grid-cols-6">
      <Navbar links={links} />
      <div className="col-span-5"> {children}</div>
    </section>
  )
}