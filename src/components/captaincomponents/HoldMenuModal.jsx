import Wrapper from "../../assets/wrappers/poswrappers/PosFormModal";
import { MdCurrencyRupee } from "react-icons/md";
import { IoMdPrint } from "react-icons/io";
import { HoldItems } from "../../config/routeApi/cap";
import { toastError,toastSuccess } from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";
import Uploading from "../loaders/Uploading";
import { useState } from "react";

const HoldMenuModal = (props) => {
  const [isUploading, setUploading] = useState(false);
  const { kotData, orderData, TotalPrice, onCancel, onKotIdChange } = props;
  const navigate = useNavigate();
//   const handleOrderSubmit = async () => {
//     try {
//       const data = {
//         orderData: orderData,
//         TotalPrice: TotalPrice,
//         kotData: kotData,
//       };

//       const response = await HoldItems(data);
//       if (response.data.success) {
//         props.onCancel();
//         toast.success(response.data.message, {
//           duration: 3000,
//           position: "top-center",
//           style: {
//             background: "#B00043",
//             color: "#fff",
//           },
//         });
//         if (orderData.orderMode != "online") {
//           props.onKotIdChange(response.data.orderId);
//         } else {
//           navigate("/captain-dashboard");
//         }
//       } else {
//         toast.error(response.data.message, {
//           duration: 3000,
//           position: "top-center",
//           style: {
//             background: "#B00043",
//             color: "#fff",
//           },
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

  return (
    <>
    { isUploading ?(<Uploading isUploading={isUploading}/>):null}


    <Wrapper centered {...props}>
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
    </Wrapper>
          </>
  );
};

export default HoldMenuModal;
