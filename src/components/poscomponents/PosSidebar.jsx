// styled-component imports 
import styled from 'styled-components'
// react imports 
import { useNavigate } from 'react-router-dom'
// icon imports 
import { IoLogOut } from "react-icons/io5";
// component imports 
import SidebarLinks from '../admindashboardcomponents/SidebarLinks';
// sidebar links data import
import posSidebarLinks from '../../utils/PosSidebarLinksData';

// styles for logout button start 
const LogOut = styled.div`
padding: 0px 0px;
width: 100%;
height: calc(100vh - 550px);
display: flex;
margin-bottom: 20px;

button{
  width: 100%;
  background-color: transparent;
  color: #fff;
  border-style: none;
  padding:0px 0px 0px 0px;
  text-align: left;
  background-color:#00418D;
  border-radius: 0px 0px 15px 15px; 
  display: flex;
  align-items: flex-start;
  p{
    width: 100%;
    height: 52px;
    display: flex;
    align-items: center;
    padding-left:15px;
  }
}
span{
  width: 15%;
  font-size: 16px;
  color: #fff;
  margin-right: 10px;
  background-color:#00418D; 
  padding: 14px 10px;
  border-radius: 0px 0px 50px 50px;
  text-align: center;
}
button p:hover{
  background-color: #C8E1FF;
  border-radius: 25px 0px 0px 25px;
  color: #000;
}
`;
// styles for logout button end 

const PosSidebar = ({ openSidebarToggle, openSidebar }) => {

    const navigate = useNavigate()

    // const DropdownLink = styled(NavLink)
    const handleLogout = () => {
        localStorage.removeItem("posToken");
        navigate("/restaurant-home");
    };

    return (

        <aside id="sidebar" className={openSidebarToggle ? 'sidebar-responsive' : ''}>
            <div className="sidebar-content" style={{ width: "98%", height: "100%" }}>

                <div className='sidebar_title'>
                    <span className="icon close_icon" onClick={openSidebar}>X</span>
                </div>


                <div style={{ margin: "20px 10px 0px 10px" }}>

                    {/* map function for the sidebar links start  */}
                    <div>
                        {posSidebarLinks.map((item, index) => {
                            return <SidebarLinks key={index} index={index} item={item}></SidebarLinks>;
                        })}
                    </div>
                    {/* map function for the sidebar links end  */}

                    <LogOut className="logout-div" >
                        <span><IoLogOut /></span>
                        <button onClick={handleLogout}>
                            <p>logout</p>
                        </button>
                    </LogOut>
                </div>
            </div>

        </aside>
    )
}
export default PosSidebar