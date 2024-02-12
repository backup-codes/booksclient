import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { restaurantDetails } from "../store/slices/restaurantAdmin";
import { toastError } from "../helpers/helpers";
const LinkVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const value = useSelector((data)=>{return data})
  useEffect(() => {
    const decodedToken = atob(token);
    if(decodedToken){
      localStorage.setItem(
        "restaurant",
        JSON.stringify(decodedToken)
      );
      let impData = {
        role:"restaurant",
        token:decodedToken
      }
      dispatch(restaurantDetails(impData));
      navigate("/restaurant-home");

      // dispatch(restaurantDetails({ token: decodedToken, role: "restaurant" }));
      // console.log("Before setting item to local storage",value);
      // localStorage.setItem("restaurant", JSON.stringify(value.restaurantToken));
      // console.log("After setting item to local storage",value);
      // navigate("/dashboard");
    } else {
      
      toastError("Token Unavailable")
   
    }
   
  }, []);

  return <div>laoding...</div>;
};

export default LinkVerification;
