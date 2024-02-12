import { Outlet } from "react-router-dom"
import { useState } from "react";
import PosSidebar from "../../components/poscomponents/PosSidebar";
import PosHeader from "../../components/poscomponents/PosHeader";


const PosDashboardLayout = () => {

    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

    const openSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }

    return (
        <div className='pos-grid-container'>
            <PosHeader openSidebar={openSidebar} />
            <PosSidebar openSidebarToggle={openSidebarToggle} openSidebar={openSidebar} />
            <Outlet />
        </div>
    )
}
export default PosDashboardLayout