import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EmployAccess = () => {

  const navigate = useNavigate();
  
  const posToken = localStorage.getItem("posToken");
  const capToken = localStorage.getItem("capToken");

  useEffect(() => {
    if (posToken) {
      navigate("/pos-dashboard");
    } else if (capToken) {
      navigate("/captain-dashboard");
    }
  }, []);

  return <div></div>;
};

export default EmployAccess;
