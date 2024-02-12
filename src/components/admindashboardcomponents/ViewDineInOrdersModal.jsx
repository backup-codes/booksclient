import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import Wrapper from "../../assets/wrappers/poswrappers/PosFormModal";
import { MdCurrencyRupee } from "react-icons/md";
import { IoMdPrint } from "react-icons/io";
import { PrintBillAtCaptain } from "../../config/routeApi/cap";
import Uploading from "../loaders/Uploading";
import { toastError, toastSuccess } from "../../helpers/helpers";

const ViewDineInOrdersModal = (props) => {
  const { ordered ,amount} = props;
  const [filteredKotItems, setFilteredKotItems] = useState([]);
  const [isUploading, setUploading] = useState(false);
  
  

  const navigate = useNavigate();
console.log(ordered,"i am ordered");
    useEffect(() => {
       
        setFilteredKotItems(ordered);
        
  }, [ordered]);

  const handleOrderSubmit = async () => {
    try {
      setUploading(true);

      // const response = await PrintBillAtCaptain(ordered);
      const response = await PrintBillAtCaptain(ordered[0]);
      setUploading(false);

      if (response.data.success) {
        props.onCancel();
        navigate("/captain-dashboard");

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
      {isUploading ? <Uploading isUploading={isUploading} /> : null}
      <Wrapper centered {...props} footer={null}>
        <h4 className="title">Order Summary</h4>
        <div className="form-div">
          <>
          <div className="summary-items">
  <div className="summary-heading">
    <p>Item</p>
    <p className="quantity">Quantity</p>
    <p className="price">Price</p>
  </div>
  {filteredKotItems.map((item, index) => (
    <div key={index} className="single-item">
      <p>{item.item}</p>
      <p className="quantity">x{item.quantity}</p>
      <p className="price">
        <MdCurrencyRupee />
        {item.price}
      </p>
    </div>
  ))}
</div>
            <div className="total">
              <>
                <p>Total Amount</p>
                <p>
                  <MdCurrencyRupee />
                  {amount}
                </p>
              </>
            </div>
          </>
       
        </div>
      </Wrapper>
    </>
  );
};
export default ViewDineInOrdersModal;
