import React, { useState } from "react";
import { KotOrder } from "../../config/routeApi/pos";
import { useNavigate } from "react-router-dom";
import Wrapper from "../../assets/wrappers/poswrappers/PosFormModal";
import { IoMdPrint } from "react-icons/io";
import Uploading from "../loaders/Uploading";
import { toastError, toastSuccess } from "../../helpers/helpers";

const KotModal = (props) => {
  const { kotData, orderData, TotalPrice, onCancel, onKotIdChange } = props;

  const navigate = useNavigate();
  const [isUploading, setUploading] = useState(false);

  const handleOrderSubmit = async () => {
    try {
      const data = {
        orderData: orderData,
        TotalPrice: TotalPrice,
        kotData: kotData,
      };
      setUploading(true)

      const response = await KotOrder(data);
    setUploading(false)

      if (response.data.success) {
        props.onCancel();
    
        toastSuccess(response.data.message)


        if (orderData.orderMode != "online") {
          props.onKotIdChange(response.data.orderId);
        } else {
          navigate("/pos-dashboard");
        }
      } else {
  toastError(response.data.message)
        
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
   <>
    { isUploading ?(<Uploading isUploading={isUploading}/>):null}
   
    <Wrapper centered {...props}>
      <h4 className="title">Order Summary</h4>
      <div className="form-div">
        <div className="summary-items">
          {kotData &&
            kotData.map((item, index) => {
              return (
                <div key={index} className="single-item">
                  <p>{item.item}</p>
                  <p className="quantity">x{item.quantity}</p>
                </div>
              );
            })}
        </div>
        <div className="total"></div>

        <div className="form-btn">
          <button onClick={handleOrderSubmit}>
            <IoMdPrint style={{ marginRight: "10px", fontSize: "20px" }} />
            KOT Print
          </button>
        </div>
      </div>
      </Wrapper>
   </> 
      
  );
};

export default KotModal;
