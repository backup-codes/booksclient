import {
    BsGrid1X2Fill, BsPeopleFill, BsBookFill, BsMenuButtonWideFill, BsFillGearFill
} from "react-icons/bs"
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { FaHeadset, FaCartShopping } from "react-icons/fa6";
import { BiSolidReport } from "react-icons/bi";
import { MdSell, MdTableBar } from "react-icons/md";
import { RiStockFill } from "react-icons/ri";


const sidebarlinks = [
    {
        text: "dashboard",
        path: "/dashboard",
        icon: <BsGrid1X2Fill />,
    },
    {
        text: "POS Management",
        path: "/dashboard/pos-management",
        icon: <BsBookFill />,
        iconClosed: <IoMdArrowDropdown />,
        iconOpened: <IoMdArrowDropup />,
        subNav: [
            {
                text: "Passbook",
                path: "/dashboard/pos-management/pos-passbook",
            },
        ],
    },
    {
        text: "Sales Management",
        path: "/dashboard/sales-management",
        icon: <BiSolidReport />,
        iconClosed: <IoMdArrowDropdown />,
        iconOpened: <IoMdArrowDropup />,
        subNav: [
            {
                text: "Total Sales",
                path: "/dashboard/sales-management/total-sales",
            },
            {
                text: "Online Orders",
                path: "/dashboard/sales-management/online-orders",
            },
            {
                text: "Take Away",
                path: "/dashboard/sales-management/take-away",
            },
            {
                text: "Dining",
                path: "/dashboard/sales-management/dining",
            },
        ],
    },
    {
        text: "Vendor Management",
        path: "/dashboard/vendor-management",
        icon: <MdSell />,
        iconClosed: <IoMdArrowDropdown />,
        iconOpened: <IoMdArrowDropup />,
        subNav: [
            {
                text: "Vendor Invoice",
                path: "/dashboard/vendor-management/Invoice",
            },
            {
                text: "Settings",
                path: "/dashboard/vendor-management/vendor-settings",
            },
        ],
    },
    {
        text: "Employee Management",
        path: " ",
        icon: <BsPeopleFill />,
        iconClosed: <IoMdArrowDropdown />,
        iconOpened: <IoMdArrowDropup />,
        subNav: [
            {
                text: "Basic Details",
                path: "/dashboard/employee-management/basic-details",
            },
            {
                text: "Employment Details",
                path: "/dashboard/employee-management/employment-details",
            },
        ],
    },
    {
        text: "Menu Management",
        path: " ",
        icon: <BsMenuButtonWideFill />,
        iconClosed: <IoMdArrowDropdown />,
        iconOpened: <IoMdArrowDropup />,
        subNav: [
            {
                text: "Menu",
                path: "/dashboard/menu-management/menu",
            },
            {
                text: "Cuisines",
                path: "/dashboard/menu-management/categories",
            }
        ],
    },
    {
        text: "Order Management",
        path: "/dashboard/order-management",
        icon: <FaCartShopping />,
    },
    {
        text: "Captain Management",
        path: "/dashboard/captain-management",
        icon: <MdTableBar />,
        iconClosed: <IoMdArrowDropdown />,
        iconOpened: <IoMdArrowDropup />,
        subNav: [
            {
                text: "Table Details",
                path: "/dashboard/captain-management/table-details",
            },
            {
                text: "Passbook",
                path: "/dashboard/captain-management/captain-passbook",
            }
        ],
    },
    {
        text: "Stock Management",
        path: "/dashboard/stock-management",
        icon: <RiStockFill />,
        iconClosed: <IoMdArrowDropdown />,
        iconOpened: <IoMdArrowDropup />,
        subNav: [
            {
                text: "Stock In",
                path: "/dashboard/stock-management/stock-in",
            },
            {
                text: "Stock Out",
                path: "/dashboard/stock-management/stock-out",
            }
        ],
    },

    {
        text: "Customer Management",
        path: "/dashboard/customer-management",
        icon: <BsPeopleFill />,
    },
    {
        text: "settings",
        path: "settings",
        icon: <BsFillGearFill />
    },
    {
        text: "Support",
        path: "support",
        icon: <FaHeadset />,
    },

];


export default sidebarlinks;