import { Outlet } from "react-router-dom"
import { useState } from "react";
import CaptainSidebar from "../../components/captaincomponents/CaptainSidebar";
import CaptainHeader from "../../components/captaincomponents/CaptainHeader";

const CaptainDashboardLayout = () => {

    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

    const openSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }
    return (
        <div className='pos-grid-container'>
            <CaptainHeader openSidebar={openSidebar} />
            <CaptainSidebar openSidebarToggle={openSidebarToggle} openSidebar={openSidebar} />
            <Outlet />
        </div>
    )
}
export default CaptainDashboardLayout