import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import Wrapper from "../../assets/wrappers/poswrappers/PosFormModal";
// import Wrapper from "../../assets/wrappers/poswrappers/PosFormModal";
import { MdCurrencyRupee } from "react-icons/md";
import { IoMdPrint } from "react-icons/io";
import { PrintBillAtCaptain, capDashboard } from "../../config/routeApi/cap";
import Uploading from "../loaders/Uploading";
import { calculateGST, toastError, toastSuccess } from "../../helpers/helpers";
import { posDashboard } from "../../config/routeApi/pos";

const TableOrderSummeryModal = (props) => {
  const { ordered } = props;
  const [filteredKotItems, setFilteredKotItems] = useState([]);
  const [isUploading, setUploading] = useState(false);
  const [manager, setManager] = useState({});
  const [restaurant, setRestaurant] = useState(0);
  const [gstAmount, setGST] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    

    if (ordered && ordered[0]) {
  
      const { gstAmount, grandTotal } = calculateGST(ordered[0].Amount);
      
      setGST(gstAmount)
      setGrandTotal(grandTotal)
    }

    const kotItems = ordered
      .filter((item) => item.KotItems && item.KotItems.length > 0)
      .map((item) => item.KotItems)
      .flat();
    setFilteredKotItems(kotItems);
  }, [ordered]);

  useEffect(() => {
    const handleManagerData = async () => {
      try {
        const response = await capDashboard();
       
        if (response.data.success) {
          setManager(response.data.ManagerData);
          setRestaurant(response.data.RestaurantData);
        } else {
          toastError(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleManagerData();
  }, []);

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

      {ordered && ordered[0] && (
        
        <Wrapper centered {...props}>
      <div>
        <h4 className="title">Order Summary</h4>
        <div className="form-div">
          <div className="bill-header">
            <div className="restaurant-header">
              <h5>{restaurant.username || "Restaurant"}</h5>
              {restaurant.address && restaurant.address.length > 0 && (
                <div>
                  {restaurant.address.map((addressItem, index) => (
                    <div key={index}>
                      <p>
                        {addressItem.building}, {addressItem.city},{" "}
                        {addressItem.pin},{addressItem.district},{" "}
                        {addressItem.state}
                      </p>

                      <p>Phone: {addressItem.phone}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="header-div">
              <div className="header-info">
                {/* <p>BILL NO: {billId}</p>
                <p>DATE&TIME: {formattedDateTime}</p> */}
              </div>
              <div className="header-info">
                {/* <p>TABLE NO: 01</p>
                <p>CAPTAIN ID: 4567</p> */}
              </div>
            </div>
          </div>
          <div className="summary-items">
            <div className="summary-heading">
              <p className="menu-item-name">Menu Item</p>
              <p style={{ width: "15%", textAlign: "center" }}>Quantity</p>
              <p style={{ width: "15%", textAlign: "center" }}>Price</p>
              <p style={{ width: "15%", textAlign: "center" }}>Value</p>
            </div>
            {filteredKotItems && filteredKotItems.map((val, index) => {
              const subtotal = val.quantity * val.price;
              return (
                <div key={index} className="single-item">
                  <p className="menu-item-name">{val.item}</p>
                  <p className="quantity">x{val.quantity}</p>
                  <p className="price">
                    <MdCurrencyRupee />
                    {val.price}
                  </p>
                  <p className="price">
                    <MdCurrencyRupee />
                    {subtotal}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="total">
            <p>SubTotal Amount</p>
            <p>
              <MdCurrencyRupee />
              {ordered[0].Amount && ordered[0].Amount}
            </p>
          </div>
          <div className="total gst">
            <p>Gst Amount</p>
            <p>
              <MdCurrencyRupee />
              {gstAmount && gstAmount}
            </p>
          </div>

          <div className="total">
            <p>Total Amount</p>
            <p>
              <MdCurrencyRupee />
              {grandTotal && grandTotal}
            </p>
          </div>
          <div className="total gst">
            <p style={{ fontSize: "12px", margin: "10px 0px" }}>
              {/* POS ID: {manager && manager.employeeId} */}
            </p>
          </div>
          <div className="restaurant-header" style={{ marginTop: "20px" }}>
            <h6>thank you for your visit!</h6>
            <p>have a nice day!</p>
          </div>

          <div className="form-btn">
            <button
              onClick={handleOrderSubmit}
              type="button"
              className="modal-btn"
            >
              <IoMdPrint style={{ marginRight: "10px", fontSize: "20px" }} />
              Send to POS
            </button>
          </div>
          {/* <div className="form-btn">
            <button>
              <IoMdPrint style={{ marginRight: "10px", fontSize: "20px" }} />
              Print Bill
            </button>
          </div> */}
        </div>
      </div>
        </Wrapper>
      
      )}

      {/* <Wrapper centered {...props}>
        <h4 className="title">Order Summary</h4>
        <div className="form-div">
          <>
            <div className="summary-items">
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
                  {ordered && ordered[0] && ordered[0].Amount !== undefined
                    ? ordered[0].Amount
                    : "N/A"}
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
              Send to POS
            </button>
          </div>
        </div>
      </Wrapper> */}
    </>
  );
};
export default TableOrderSummeryModal;
