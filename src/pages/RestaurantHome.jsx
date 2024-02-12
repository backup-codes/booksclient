//styled-component imports
import Wrapper from "../assets/wrappers/RestaurantHome";
//component imports
import Logo from "../components/Logo";
//card data imports
import landingData from "../utils/LandingPageData";

//react-icon imports
import { RiArrowDropDownLine } from "react-icons/ri";
import Footer from "../components/Footer";

//backend imports
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RestaurantAdminApi } from "../config/global";
import { toastError } from "../helpers/helpers";

const RestaurantHome = () => {
  const [restaurant, setRestaurant] = useState({});
  const [selectedRole, setSelectedRole] = useState("");

  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    const newRole = event.target.value;
    setSelectedRole(newRole);

    // Redirect based on the selected role
    switch (newRole) {
      case "admin":
        navigate("/admin-login");
        break;
      case "employee":
        navigate("/employee-login");
        break;

      default:
        navigate("/restaurant-home");
        break;
    }
  };

  const token = localStorage.getItem("restaurant");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  const axiosConfig = {
    method: "get",
    url: `${RestaurantAdminApi}accessRestaurantHome`,
    headers: headers,
  };

  useEffect(() => {
    const handleHomeAccess = async () => {
      try {
        const response = await axios(axiosConfig);
        if (response.data.success == false) {
          toastError(response.data.message)
          navigate("/login");
        } else {
          setRestaurant(response.data.restaurantData);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    if (token) {
      handleHomeAccess();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <Wrapper>
      <header>
        <Logo />
        <h5 className="heading">
          Welcome <span>{restaurant.username}</span>
        </h5>
        <div className="dropdown-div">
          <RiArrowDropDownLine className="dropdown-icon" />

          <select
            id="roles"
            name="roles"
            value={selectedRole}
            onChange={handleRoleChange}
          >
            <option value="" disabled>
              Select a role
            </option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
        </div>
      </header>



      <section className="card-section">
        <div className="card-deck">
          {
            landingData.map((item, index) => {
              return (
                <div key={index} className="card-div">
                  <div className="card-img">
                    <img src={item.img} alt="" />
                  </div>
                  <div className="title-div">
                    <h6>{item.title}</h6>
                  </div>
                </div>

              );
            })
          }
        </div>
      </section>

      <Footer />
    </Wrapper>
  );
};
export default RestaurantHome;
