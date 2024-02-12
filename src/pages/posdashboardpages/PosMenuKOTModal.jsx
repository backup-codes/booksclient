import Wrapper from "../../assets/wrappers/poswrappers/PosFormModal";
import { MdCurrencyRupee } from "react-icons/md";
import { IoMdPrint } from "react-icons/io";
import { useEffect, useState } from "react";
import { posDashboard } from "../../config/routeApi/pos";
import { calculateGST, toastError } from "../../helpers/helpers";

const PosMenuKOTModal = (props) => {
    
  const { selectedOrder } = props;
  // const { KotItems, Amount, billId, date, paymentMethod } = orderDetails;
  console.log(selectedOrder,"selectedOrder");

  const [manager, setManager] = useState({});
  const [restaurant, setRestaurant] = useState({});

  // const dateObject = new Date(date);

  // const options = {
  //   year: "2-digit",
  //   month: "numeric",
  //   day: "numeric",
  //   hour: "numeric",
  //   minute: "numeric",
  //   hour12: true,
  // };

  // const formattedDateTime = dateObject.toLocaleDateString("en-US", options);

  useEffect(() => {

    const handleManagerData = async () => {
      try {
        const response = await posDashboard();
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

  useEffect(() => {
    console.log("Restaurant Data:", restaurant);
    console.log("Username:", restaurant.username);
    console.log("Address:", restaurant.address);
  }, [restaurant]);

  

  
  const { gstAmount, grandTotal } = calculateGST(selectedOrder.Amount);

  return (
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
                <p>POS ID: {manager && manager.employeeId}</p>
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
            {selectedOrder.KotItems.map((val, index) => {
              const subtotal = val.quantity * val.price;
              return (
                <div key={index} className="single-item">
                  <p className="menu-item-name">{val.item}</p>
                      <p className="quantity">x{val.quantity}</p>
                      

                  {/* <p className="price">
                    <MdCurrencyRupee />
                    {val.price}
                  </p>
                  <p className="price">
                    <MdCurrencyRupee />
                    {subtotal}
                  </p> */}
                </div>
              );
            })}
          </div>
          {/* <div className="total">
            <p>SubTotal Amount</p>
            <p>
              <MdCurrencyRupee />
              {selectedOrder.Amount &&selectedOrder.Amount}
            </p>
          </div>
          <div className="total gst">
            <p>Gst Amount</p>
            <p>
              <MdCurrencyRupee />
              {gstAmount}
            </p>
          </div>

          <div className="total">
            <p>Total Amount</p>
            <p>
              <MdCurrencyRupee />
             {grandTotal}
            </p>
          </div> */}

          {/* <div className="restaurant-header" style={{ marginTop: "20px" }}>
            <h6>thank you for your visit!</h6>
            <p>have a nice day!</p>
          </div> */}

          <div className="form-btn">
            <button onClick={handleOrderSubmit}>
              <IoMdPrint style={{ marginRight: "10px", fontSize: "20px" }} />
              KOT Print
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default PosMenuKOTModal;
