import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restaurantDetails } from "../store/slices/restaurantAdmin";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../helpers/helpers";

const ReduxReset = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const liveToken = useSelector((val) => {
    return val.ownerDetails.ownerToken;
  });

  const token = localStorage.getItem("restaurant");
  const atoken = localStorage.getItem("atoken");

  useEffect(() => {
    const data = {
      token: token,
      role: "restaurant",
    };
    if (token) {
      dispatch(restaurantDetails(data));
      if (atoken) {
        navigate("/dashboard");
      } else {
        navigate("/restaurant-home");
      }
    } else {
      navigate("/login");
      

      toastError(" Your session has expired or you are not logged in. Please log in again to continue")
    }
  }, [token, liveToken]);

  return <div></div>;
};

export default ReduxReset;
