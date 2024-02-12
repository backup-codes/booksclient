// import Wrapper from "../../assets/wrappers/poswrappers/PosFormModal";
import Wrapper from "../../assets/wrappers/poswrappers/PosFormModal";
import { MdCurrencyRupee } from "react-icons/md";
import { IoMdPrint } from "react-icons/io";
import { KotOrder, capDashboard } from "../../config/routeApi/cap";
import { useEffect, useState } from "react";
import Uploading from "../loaders/Uploading";
import { calculateGST, toastError, toastSuccess } from "../../helpers/helpers";

const TableKotSummaryModal = (props) => {
  const [isUploading, setUploading] = useState(false);
  const {setSelectedItems, kotData, orderData, TotalPrice } = props;
  const [manager, setManager] = useState({});
  const [restaurant, setRestaurant] = useState(0);

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
    setUploading(true);

    try {
      const data = {
        ///orderData is TableData
        orderData: orderData,
        TotalPrice: TotalPrice,
        kotData: kotData,
      };

      const response = await KotOrder(data);
      setUploading(false);

      if (response.data.success) {

        props.onCancel();
        toastSuccess(response.data.message);
        setSelectedItems([])
      } else {
        toastError(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const { gstAmount, grandTotal } = calculateGST(TotalPrice);

  return (
    <>
      {/* {isUploading ? <Uploading isUploading={isUploading} /> : null} */}
      {/* <Wrapper centered {...props}>
        <h4 className="title">Order Summary</h4>
        <div className="form-div">
          <div className="summary-items">
            <h4 style={{ color: "#00418D", marginBottom: "20px" }}>
              Table {orderData.tableName}
            </h4>
            {kotData.map((item, index) => (
              <>
                <div key={index} className="single-item">
                  <p>{item.item}</p>
                  <p className="quantity">x{item.quantity}</p>
                </div>
              </>
            ))}
          </div>

          <div className="form-btn">
            <button type="button" onClick={handleOrderSubmit}>
              <IoMdPrint style={{ marginRight: "10px", fontSize: "20px" }} />
              KOT Print
            </button>
          </div>
        </div>
      </Wrapper> */}

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
                  <p>TABLE NO: {orderData.tableName}</p>
                <p>CAPTAIN ID:{manager && manager.employeeId}</p>
              </div>
            </div>
          </div>
          <div className="summary-items">
            <div className="summary-heading">
              <p className="menu-item-name">Menu Item</p>
              <p style={{ width: "15%", textAlign: "center" }}>Quantity</p>
             
            </div>
            {kotData && kotData.map((val, index) => {
              const subtotal = val.quantity * val.price;
              return (
                <div key={index} className="single-item">
                  <p className="menu-item-name">{val.item}</p>
                  <p className="quantity">x{val.quantity}</p>
                 
                </div>
              );
            })}
          </div>
       
          
          {/* <div className="total gst">
            <p style={{ fontSize: "12px", margin: "10px 0px" }}>
              POS ID: {manager && manager.employeeId}
            </p>
          </div> */}
         

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


    </>
  );
};
export default TableKotSummaryModal;
