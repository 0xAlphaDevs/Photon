import Navbar from "@/components/navbar"
import { CircleDollarSignIcon, VideoIcon } from "lucide-react";

const links = [
  { href: '/learner/dashboard', text: 'All Courses', image: <VideoIcon className="h-6 w-6" /> },
  { href: '/learner/purchases', text: 'My Purchases', image: <CircleDollarSignIcon className="h-6 w-6" /> },
];

export default function ClientDashboard({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="grid grid-cols-6">
      <Navbar links={links} />
      <div className="col-span-5 px-10"> {children}</div>
    </section>
  )
}