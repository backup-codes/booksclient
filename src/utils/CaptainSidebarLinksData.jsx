import { IoPeopleSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { GiDiscGolfBag } from "react-icons/gi";
import { BiSupport } from "react-icons/bi";

const captainSidebarLinks = [
    {
        text: "Dashboard",
        path: "/captain-dashboard",
        icon: <MdDashboard />,
    },
    {
        text: "Leads",
        path: "/captain-dashboard/captain-leads",
        icon: <GiDiscGolfBag />,
    },
    {
        text: "Customers",
        path: "/captain-dashboard/captain-customers",
        icon: <IoPeopleSharp />,
    },
    {
        text: "Support",
        path: "/captain-dashboard/support",
        icon: <BiSupport />,
    },
];

export default captainSidebarLinks;