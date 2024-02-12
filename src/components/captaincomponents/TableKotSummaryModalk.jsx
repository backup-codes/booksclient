import Wrapper from "../../assets/wrappers/poswrappers/PosFormModal";
import { MdCurrencyRupee } from "react-icons/md";
import { IoMdPrint } from "react-icons/io";
import { KotOrder } from "../../config/routeApi/cap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toastError, toastSuccess } from "../../helpers/helpers";

const TableKotSummaryModal = (props) => {
  const [isUploading, setUploading] = useState(false);

  const orderedItems = [
    {
      name: "Chicken Biryani",
      quantity: "2",
      price: "660",
    },
    {
      name: "Chicken Biryani",
      quantity: "2",
      price: "660",
    },
    {
      name: "Chicken Biryani",
      quantity: "2",
      price: "660",
    },
    {
      name: "Chicken Biryani",
      quantity: "2",
      price: "660",
    },
    {
      name: "Chicken Biryani",
      quantity: "2",
      price: "660",
    },
  ];

  const { kotData, orderData, TotalPrice, onCancel, onKotIdChange } = props;
  const navigate = useNavigate();
  const handleOrderSubmit = async () => {

    setUploading(true)

    try {
      const data = {
        orderData: orderData,
        TotalPrice: TotalPrice,
        kotData: kotData,
      };

      const response = await KotOrder(data);
      setUploading(false)

      if (response.data.success) {
        props.onCancel();
      toastSuccess(response.data.message)
        if (orderData.orderMode != "online") {
          props.onKotIdChange(response.data.orderId);
        } else {
          navigate("/captain-dashboard");
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
          <h4 style={{ color: "#00418D", marginBottom: "20px" }}>Table {orderData.tableName}</h4>
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
      </Wrapper>
    </>
  );
};
export default TableKotSummaryModal;
