// import LogOut from '../LogOut'
//styled-component imports
import Wrapper from "../../assets/wrappers/poswrappers/PosHeader";
//icon imports
import { BsJustify } from "react-icons/bs";
// import { IoIosNotificationsOutline } from "react-icons/io";
//image imports
import { ProfileImg } from "../../assets/images";
import { useEffect, useState } from "react";
import { GetRestaurantDetail } from "../../config/routeApi/owner";
function Header({ openSidebar }) {
    const [restaurantData,setRestaurantData] = useState ()
    useEffect(() => {
        (async function getDetails(){
            
            const response =await GetRestaurantDetail()
            console.log(response, "response");
            if (response.data.success) {
    
                setRestaurantData(response.data.restaurantData)
            } 
            
        })();
    },[])
    
    return (

        <Wrapper className="pos-header">
            <div className='menu-icon'>
                <BsJustify className='menu-icon' onClick={openSidebar} />
            </div>

            <div>
               {restaurantData && (<h3>{restaurantData.username}</h3>)}
            </div>
            <div className="header-content">
                {/* <div className="notification-div">
                    <IoIosNotificationsOutline className="notification-icon" />
                    <div className="notification-count">
                        <p>0</p>
                    </div>
                </div> */}

                <div className="profile">
                    {/* <div className="profile-div">
                        <img src={ProfileImg} alt="" />
                    </div> */}

                </div>
            </div>
        </Wrapper>


        // <header className='header'>
        //     <div className='menu-icon'>
        //         <BsJustify className='icon' onClick={openSidebar} />
        //     </div>
        //     <div className='header-left'>
        //         <BsSearch className='icon' />
        //     </div>
        //     <div className="header-right">
        //         <div>
        //             <BsFillBellFill className='icon' />
        //             <BsFillEnvelopeFill className='icon' />
        //             <BsPersonCircle className='icon' />
        //         </div>
        //         {/* <LogOut /> */}
        //     </div>
        // </header>
    )
}
export default Header