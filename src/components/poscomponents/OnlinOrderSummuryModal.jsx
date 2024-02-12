import Wrapper from "../../assets/wrappers/poswrappers/PosFormModal";
import { MdCurrencyRupee } from "react-icons/md";
import { IoMdPrint } from "react-icons/io";

const OnlinOrderSummuryModal = (props) => {
  const { kotItems } = props;
  console.log(kotItems, "jhdajfb");

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

  return (
    <Wrapper centered {...props}>
      <h4 className="title">Order Summary</h4>
      <div className="form-div">
        <div className="summary-items">
          {kotItems &&
            kotItems.map((item, index) => {
              // const { name, quantity, price } = item;
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
          <p>Total Amount</p>
          <p>
            <MdCurrencyRupee />
            2999
          </p>
        </div>

        <div className="form-btn">
          <button type="button">
            <IoMdPrint style={{ marginRight: "10px", fontSize: "20px" }} />
            Print Bill
          </button>
        </div>
      </div>
    </Wrapper>
  );
};
export default OnlinOrderSummuryModal;
