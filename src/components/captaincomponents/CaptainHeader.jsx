import { BsJustify } from "react-icons/bs";
import Wrapper from "../../assets/wrappers/poswrappers/PosHeader";
// import { IoIosNotificationsOutline } from "react-icons/io";
import { ProfileImg } from "../../assets/images";
//backend updates
import { useEffect, useState } from "react";
import { GetCapDashboard, capDashboard } from "../../config/routeApi/cap";
import Uploading from "../loaders/Uploading";
import toast from "react-hot-toast";

const CaptainHeader = ({ openSidebar }) => {
  const [click, setClick] = useState(false);
  const [capData, setCapData] = useState({});
  const [restaurant, setRestaurant] = useState({});
  //   const [isUploading, setUploading] = useState(false);

  useEffect(() => {
    const handleCapDashboard = async () => {
      try {

        // const response = await GetCapDashboard();
        const response = await capDashboard();

console.log(response,"header response");
        if (response.data.success) {
          setRestaurant(response.data.RestaurantData)
          setCapData(response.data.ManagerData);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleCapDashboard()
  }, []);

  const handleClick = () => {
    setClick(!click);
  };

  return (
    <>
      {/* {isUploading ? <Uploading isUploading={isUploading} /> : null} */}

      <Wrapper className="pos-header">
        <div className="menu-icon">
          <BsJustify className="menu-icon" onClick={openSidebar} />
        </div>

        <div>
          <h3>{restaurant && restaurant.username}</h3>
        </div>

        <div className="header-content">
          {/* <div className='notification-div'>
                        <IoIosNotificationsOutline className='notification-icon' />
                        <div className='notification-count'>
                            <p>0</p>
                        </div>
                    </div> */}

          <div>
            <button type="button" className="button">
              Hello, {capData && capData.username}
            </button>
          </div>

          <div className="profile" onClick={handleClick}>
            <div className="profile-div">
              <img src={ProfileImg} alt="" />
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};
export default CaptainHeader;
