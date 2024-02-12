import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CaptainAccess = () => {

    const navigate = useNavigate()
    const Token = localStorage.getItem("capToken")
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

export default CaptainAccess;
