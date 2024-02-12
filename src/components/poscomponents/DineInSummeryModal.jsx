import Wrapper from "../../assets/wrappers/poswrappers/PosFormModal";
import { MdCurrencyRupee } from "react-icons/md";
import { IoMdPrint } from "react-icons/io";
import { useEffect, useState } from "react";
import { posDashboard } from "../../config/routeApi/pos";
import { calculateGST, formatDate, toastError } from "../../helpers/helpers";

const DineInSummeryModal = (props) => {
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

  const handleOrderSubmit = async () => {
    try {
      props.onCancel();
      const restaurantAddressHtml =
        restaurant.address && restaurant.address.length > 0
          ? restaurant.address
              .map(
                (addressItem, index) =>
                  `<div key=${index}>
          <p>
            ${addressItem.building}, ${addressItem.city}, ${addressItem.pin}, ${addressItem.district}, ${addressItem.state}
          </p>
          <p>Phone: ${addressItem.phone}</p>
        </div>`
              )
              .join("")
          : "";
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Summary</title>
  
</head>
<body>

<div style="width: 100%; padding: 0px 30px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
    <h4 style="text-align: center; text-transform: uppercase; margin-bottom: 15px; font-size: 16px; font-weight: 700;">Order Summary</h4>
    
    <div style="width: 100%; padding: 0px 30px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <div style="text-align: center; text-transform: uppercase; margin-bottom: 15px;">
            <h5 style="font-size: 12px; font-weight: 500; margin-bottom: 0px;">Restaurant</h5>
            <div>
                <div>
                    <p>Building, City, Pin, District, State</p>
                    <p>Phone: Phone</p>
                </div>
            </div>
        </div>

        <div style="width: 100%; display: flex; justify-content: space-between;">
            <div style="width: 48%;">
                <div style="font-size: 12px; margin: 0px;">
                    <p>BILL NO: BillID</p>
                    <p>DATE&TIME: FormattedDateTime</p>
                </div>
            </div>
            <div style="width: 48%;">
                <div style="font-size: 12px; margin: 0px;">
                    <p>POS ID: ManagerEmployeeID</p>
                </div>
            </div>
        </div>
    </div>

    <div style="padding: 20px 30px;">
        <div style="width: 100%; display: flex; justify-content: space-between; align-items: center;">
            <p style="font-weight: 700;">Menu Item</p>
            <p style="width: 15%; text-align: center;">Quantity</p>
            <p style="width: 15%; text-align: center;">Price</p>
            <p style="width: 15%; text-align: center;">Value</p>
        </div>

        <div style="width: 100%;">
            <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #c1c1c1; margin-bottom: 5px;">
                <p style="width: 60%; font-size: 16px; margin-bottom: 5px;">MenuItem</p>
                <p style="text-align: center; width: 15%; color: #b6b6b6;">xQuantity</p>
                <p style="text-align: center; width: 15%; font-weight: 600; font-size: 14px;"><MdCurrencyRupee />Price</p>
                <p style="text-align: center; width: 15%; font-weight: 600; font-size: 14px;"><MdCurrencyRupee />Subtotal</p>
            </div>
        </div>
    </div>

    <div style="text-align: center; padding: 0px 30px; display: flex; justify-content: space-between; align-items: center;">
        <p style="font-weight: 700; font-size: 16px;">SubTotal Amount</p>
        <p style="font-weight: 700; font-size: 16px;"><MdCurrencyRupee />Amount</p>
    </div>

    <div style="text-align: center; padding: 0px 30px; display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
        <p style="font-weight: 400; font-size: 14px; margin-bottom: 0px;">Gst Amount</p>
        <p style="font-weight: 700; font-size: 16px;"><MdCurrencyRupee />0000</p>
    </div>

    <div style="text-align: center; padding: 0px 30px; display: flex; justify-content: space-between; align-items: center;">
        <p style="font-weight: 700; font-size: 16px;">Total Amount</p>
        <p style="font-weight: 700; font-size: 16px;"><MdCurrencyRupee />0000</p>
    </div>

    <div style="text-align: center; text-transform: uppercase; margin-top: 20px;">
        <h6>thank you for your visit!</h6>
        <p>have a nice day!</p>
    </div>

    <div style="text-align: center; margin-top: 20px;" class="form-btn">
        <button onClick={handleOrderSubmit} style="margin-right: 10px; font-size: 20px;">
            <IoMdPrint />
            Print Bill
        </button>
    </div>
</div>


</body>
</html>

      `);

      printWindow.document.close();
      printWindow.print();
    } catch (error) {
      console.log(error);
    }
  };

  
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
                <p>BILL NO: {selectedOrder.billId}</p>
                <p>DATE: {formatDate(selectedOrder.date)}</p>
              </div>
              <div className="header-info">
                <p>POS ID: {manager && manager.employeeId}</p>
                <p>Table : {selectedOrder && selectedOrder.tableNumber}</p>
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
          </div>

          <div className="restaurant-header" style={{ marginTop: "20px" }}>
            <h6>thank you for your visit!</h6>
            <p>have a nice day!</p>
          </div>

          <div className="form-btn">
            <button onClick={handleOrderSubmit}>
              <IoMdPrint style={{ marginRight: "10px", fontSize: "20px" }} />
              Print Bill
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default DineInSummeryModal;
