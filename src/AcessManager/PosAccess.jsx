import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PosAccess = () => {

    const navigate = useNavigate()
    const Token = localStorage.getItem("posToken")
    useEffect(() => {
    if(!Token){
        navigate("/restaurant-home")
    }
    }, []);

  return (
    <div>
      
    </div>
  );
}

export default PosAccess;
