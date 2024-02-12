import { useState } from "react"
import { Outlet } from "react-router-dom";
import Header from "../../components/admindashboardcomponents/Header"
import Sidebar from "../../components/admindashboardcomponents/Sidebar"


const DashboardLayout = () => {

    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

    const openSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }


    return (
        <div className='pos-grid-container'>
            <Header openSidebar={openSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} openSidebar={openSidebar} />
            <Outlet />
        </div>

    )
}
export default DashboardLayout