import React, { useState } from "react";
import { PrintBill } from "../../config/routeApi/pos";
import { useNavigate } from "react-router-dom";

import Wrapper from "../../assets/wrappers/poswrappers/PosFormModal";
import { MdCurrencyRupee } from "react-icons/md";
import { IoMdPrint } from "react-icons/io";
import { toastError, toastSuccess } from "../../helpers/helpers";

const PrintBillModal = (props) => {
  const { printBillData, TotalPrice, orderData, kotId, onCancel } = props;
  const [isUploading, setUploading] = useState(false);

  const navigate = useNavigate();

  const handleOrderSubmit = async () => {
    try {
      setUploading(true)
      const data = {
        orderData: orderData,
        TotalPrice: TotalPrice,
        kotId: kotId,
      };
      
      const response = await PrintBill(data);
    setUploading(false)

      if (response.data.success) {
        props.onCancel();
        navigate("/pos-dashboard");
  toastSuccess(response.data.message)
  
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
        <>
          <div className="summary-items">
            {printBillData &&
              printBillData.map((item, index) => {
                return (
                  <div key={index} className="single-item">
                    <p>{item.item}</p>
                    <p className="quantity">x{item.quantity}</p>
                    <p className="price">
                      <MdCurrencyRupee />
                      {item.price}
                    </p>
                  </div>
                );
              })}
          </div>
          <div className="total">
            <>
              <p>Total Amount</p>
              <p>
                <MdCurrencyRupee />
                {TotalPrice}
              </p>
            </>
          </div>
        </>
        <div className="form-btn">
          <button
            onClick={handleOrderSubmit}
            type="button"
            className="modal-btn"
          >
            <IoMdPrint style={{ marginRight: "10px", fontSize: "20px" }} />
            Print Bill
          </button>
        </div>
      </div>
      </Wrapper>
    </>
  );
};

export default PrintBillModal;
