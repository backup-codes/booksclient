import SidebarLinks from "./SidebarLinks";
import sidebarlinks from "../../utils/SidebarLinksData";
import { useDispatch } from "react-redux";
import { ownerLogout } from "../../store/slices/owner";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoLogOut } from "react-icons/io5";



const LogOut = styled.div`
padding: 0px 0px;
width: 100%;
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
@media screen and (min-width:768px) and (max-width: 1024px){
height: calc(100vh - 60vh);
}
`;

function Sidebar({ openSidebarToggle, openSidebar }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("atoken");
    dispatch(ownerLogout());
    navigate("/restaurant-home");
  };

  return (
    // className = { openSidebarToggle? "sidebar-responsive": "" }
    <aside id="sidebar" className={openSidebarToggle ? 'sidebar-responsive' : ''}>
      <div className="sidebar-content" style={{ width: "98%", height: "100%" }}>

        <div className="sidebar_title">
          <span className="icon close_icon" onClick={openSidebar}>
            X
          </span>
        </div>


        <div style={{ margin: "20px 10px 0px 10px" }}>

          <div>
            {sidebarlinks.map((item, index) => {
              return <SidebarLinks key={index} index={index} item={item}></SidebarLinks>;
            })}
          </div>

          <LogOut className="logout-div" >
            <span><IoLogOut /></span>
            <button onClick={handleLogout}>
              <p>logout</p>
            </button>
          </LogOut>
        </div>
      </div>
    </aside>
  );
}
export default Sidebar;
