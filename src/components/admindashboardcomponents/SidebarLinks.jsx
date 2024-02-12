import { NavLink } from 'react-router-dom'
import { useState } from "react";
import styled from 'styled-components'


const SidebarLink = styled(NavLink)`
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
text-transform: capitalize;
font-size: 14px;
text-decoration: none;
color: #fff;
.sidebar-links{
    width: 100%;
    display:flex;
    align-items: center;
}
.sidebar-icon{
    width: 15%;
    font-size: 16px;
    padding: 14px 10px;
    background-color:#00418D;
    margin-right: 10px;
    text-align: center;
    vertical-align: center;
}

.sidebar-icon-top-radius{
    border-radius: 50px 50px 0px 0px;
}
.title-icon{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 15px 5px 5px;
    background-color:#00418D;
}
.title{
    width: 100%;
    margin-top: 1px;
    padding: 10px 0px 10px 8px;
}
.title-icon-top-radius{
    border-radius: 15px 15px 0px 0px;
}

.dashboard-title-icon{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    background-color: #00305B;
    text-align: center;
    padding: 0px 0px;
    border-radius: 15px;
}
.dropdown-icon{
    color: #fff;
}
.title-icon:hover{
    background-color: #C8E1FF;
    border-radius: 25px 0px 0px 25px;
    color: #000;
}
.title-icon:hover .dropdown-icon{
    color: #000;
}
&.active .title-icon{
    width: 100%;
    background-color: #C8E1FF;
    border-radius: 25px 0px 0px 25px;
    color: #000;
}
&.active .dropdown-icon{
    color: #000;
}
`;

const DropdownLink = styled(NavLink)`
color: #fff;
text-decoration: none;
font-size: 14px;
 .dropdown-links{
    width: 100%;
    display: flex;
    align-items: center;
 }

    .sidebar-icon{
    width: 15%;
    font-size: 16px;
    padding: 20px 12px;
    background-color:#00418D;
    margin-right: 10px;
}
 .title{
    width: 100%;
    padding: 10px 15px 9px 45px;
    background-color:#00418D;
 }
 .title:hover{
    background-color: #C8E1FF;
    color: #000;
    border-radius: 25px 0px 0px 25px;
 }
&.active .title{
    background-color: #C8E1FF;
    border-radius: 25px 0px 0px 25px;
    color: #000;
}
`;


const SidebarLinks = ({ item, index }) => {



    const [subnav, setSubnav] = useState(false);

    const showSubnav = () => setSubnav(!subnav);



    const handleParentClick = (event) => {
        if (item.subNav && item.path == " ") {
            event.preventDefault(); // Prevent default redirect when there is a submenu
            showSubnav();
        } else if (item.subNav) {
            showSubnav();
        }

    };


    // { `sidebar-icon ${item.index === 0 ? 'sidebar-icon-top-radius' : ''}` } 
    return (
        <div>
            <SidebarLink className='main-menu-link' key={item.text} to={item.path} onClick={handleParentClick} end>
                <div className="sidebar-links">
                    <span className={`sidebar-icon ${index === 0 ? 'sidebar-icon-top-radius' : ''}`}>{item.icon}</span>
                    <div className={` ${index === 0 ? 'dashboard-title-icon' : 'title-icon'} ${index === 1 ? 'title-icon-top-radius' : ''}`}>
                        <span className="title">{item.text}</span>

                        <div className='dropdown-icon'>
                            {

                                item.subNav && subnav ? item.iconOpened : item.iconClosed
                            }
                        </div>
                    </div>
                </div>

            </SidebarLink>

            {
                subnav && item.subNav.map((subitem, index) => {
                    return (
                        <DropdownLink key={index} to={subitem.path} >
                            <div className="dropdown-links">
                                {/* {subitem.icon} */}
                                <span className='sidebar-icon'></span>
                                <span className="title">{subitem.text}
                                </span>
                            </div>
                        </DropdownLink>
                    )
                })
            }



        </div>
    )
}
export default SidebarLinks