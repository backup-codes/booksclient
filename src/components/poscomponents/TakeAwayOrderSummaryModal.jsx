import Wrapper from "../../assets/wrappers/poswrappers/PosFormModal";
import { MdCurrencyRupee } from "react-icons/md";
import { IoMdPrint } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../helpers/helpers";
import { PrintBill } from "../../config/routeApi/pos";

const TakeAwayOrderSummaryModal = (props) => {
  const { selectedOrder,setIndicator,indicator } = props;
  const navigate = useNavigate();
const {Amount,KotItems} = selectedOrder
  console.log(selectedOrder, "selectedOrder");
 
  const handleOrderSubmit = async () => {
    try {
      navigate("/pos-dashboard/pos-menu", {
        state: { HoldMenu: selectedOrder },
      });

      props.onCancel();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrintSubmit = async () => {
    try {
      const data = {
         userId : selectedOrder._id,
         amount :Amount

      }

      console.log(data," i am data");

      const response = await PrintBill(data);

      if (response.data.success) { 
        toastSuccess("Order saved");
        setIndicator(!  indicator)
        navigate("/pos-dashboard");
        props.onCancel()
      } else {
        toastError(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Wrapper centered {...props}>
      <h4 className="title">Order Summary</h4>
      <div className="form-div">
        <div id="printContent">
        <div className="summary-items ">
  <div className="heading d-flex justify-content-between">
    <p>Item</p>
    <p className="quantity">Quantity</p>
    <p className="price">Price</p>
    <p className="price">Total </p>
  </div>
  {KotItems &&
    KotItems.map((item, index) => {
      const subtotal = item.quantity * item.price;

      return (
        <div key={index} className="single-item">
          <p>{item.item}</p>
          <p className="quantity">x{item.quantity}</p>
          <p className="price">
            <MdCurrencyRupee />
            {item.price}
          </p>
          <p className="price">
            <MdCurrencyRupee />
            {item.totalItemPrice ? item.totalItemPrice : subtotal}
          </p>
        </div>
      );
    })}
</div>

          <div className="total">
            <p>SubTotal Amount</p>
            <p>
              <MdCurrencyRupee />
              {Amount && Amount}
            </p>
          </div>
        </div>
        <div className="form-btn">
          <button onClick={handleOrderSubmit}>Continue</button>
          <button onClick={handlePrintSubmit}>
            <IoMdPrint style={{ marginRight: "10px" }} />
            Print Bill
          </button>
        </div>
      </div>
    </Wrapper>
  );
};
export default TakeAwayOrderSummaryModal;
