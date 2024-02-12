import React, { useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ownerDetails } from "../store/slices/owner";
import { toastError } from "../helpers/helpers";

const AccessAtDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("atoken");
  const isMounted = useRef(true);

  const dispatch = useDispatch();
  const liveToken = useSelector((val) => {
    return val.ownerDetails.ownerToken;
  });
  const handleDashboardAccess = useCallback(async () => {
    try {
      if (!token && isMounted.current) {
        navigate("/restaurant-home");
        toastError(  "Your session has expired. Please log in again to continue.")
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, [token, navigate]);

  useEffect(() => {
    const data = {
      token: token,
      role: "owner",
    };
    handleDashboardAccess();
    dispatch(ownerDetails(data));
    return () => {
      isMounted.current = false;
    };
  }, [handleDashboardAccess, liveToken]);

  return null;
};

export default AccessAtDashboard;
