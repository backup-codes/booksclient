import { IoPeopleSharp, IoBook } from "react-icons/io5";
import { MdDashboard, MdOutlineDinnerDining } from "react-icons/md";
import { FaShoppingBag } from 'react-icons/fa';
import { GiDiscGolfBag } from "react-icons/gi";
import { BiSupport } from "react-icons/bi";
import { RiTakeawayFill } from "react-icons/ri";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";


const posSidebarLinks = [
    {
        text: "Dashboard",
        path: "/pos-dashboard",
        icon: <MdDashboard />,
    },
    {
        text: "Leads",
        path: "/pos-dashboard/pos-leads",
        icon: <GiDiscGolfBag />,
    },
    {
        text: "Online Orders",
        path: "/pos-dashboard/pos-online",
        icon: <FaShoppingBag />,
    },
    {
        text: "Take Away",
        path: "/pos-dashboard/pos-takeaway",
        icon: <RiTakeawayFill />,
    },
    {
        text: "Dine In",
        path: "/pos-dashboard/pos-dinein",
        icon: <MdOutlineDinnerDining />,
    },
    {
        text: "Customers",
        path: "/pos-dashboard/pos-customers",
        icon: <IoPeopleSharp />,
    },
    {
        text: "Passbook",
        path: "/pos-dashboard/pos-passbook",
        icon: <IoBook />,
        iconClosed: <IoMdArrowDropdown />,
        iconOpened: <IoMdArrowDropup />,
        subNav: [
            {
                text: "Opening Report",
                path: "/pos-dashboard/pos-passbook/todays-opening",
            },
            {
                text: "Expense Report",
                path: "/pos-dashboard/pos-passbook/todays-expense",
            },
            {
                text: "Closing Report",
                path: "/pos-dashboard/pos-passbook/todays-closing",
            },
        ],
    },
    {
        text: "Support",
        path: "/pos-dashboard/support",
        icon: <BiSupport />,
    },

];


export default posSidebarLinks;