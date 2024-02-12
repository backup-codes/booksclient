//styled-component imports
import Wrapper from "../../assets/wrappers/captainwrappers/CaptainTableCard";
import ModalStyle from "../../assets/wrappers/poswrappers/PosFormModal";
//react imports
import { useEffect, useState } from "react";
// import TableBookingFormModal from "./TableBookingFormModal";
import TableCancelBookingModal from "./TableCancelBookingModal";
import {
  TableStatus,
  BookTable,
  CancelBookTable,
  TableDetails,
} from "../../config/routeApi/cap";
import { useNavigate } from "react-router-dom";
// import Uploading from "../loaders/Uploading";

import { useForm } from "react-hook-form";
import { toastError, toastSuccess } from "../../helpers/helpers";

const CaptainTableCard = (props) => {
  const { tableno, noofseats, img, tableId, isBooked } = props;
  const [booked, setBooked] = useState(false);
  const [showMenuButton, setShowMenuButton] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [customerData, setCustomerData] = useState([]);
  const [tableNumber, setTableNumber] = useState("");
  const [TableId, setTableId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [isUploading, setUploading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitButton = async (data) => {
    setUploading(true);
    console.log(data," ia ma data");
setCustomerName(data.customerName)
    const requestData = {
      ...data,
      tableName: tableno,
      tableId: tableId,
      orderMode: "dineIn",
    };

    const response = await BookTable(requestData);
    setUploading(false);

    if (response.data.success) {
      setOrderId(response.data.OrderId);
      toastSuccess(response.data.message);
      setModal2Open(false);
      setBooked(true);
    } else {
      // Display error toast
      toastError(response.data.message);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTableStatus = async () => {
      try {
        // const response = await TableStatus();

        const response  = await TableDetails(tableId)

        if (response.data.success) { 

          const table = response.data.tableData;
        
          setCustomerName(table.customerName)
          setCustomerData(table);

        }else{

          toastError(response.data.message)
        }

        // console.log(table, "i am tableeee");
        
        

      } catch (error) {
        console.log(error);
      }
    };
    fetchTableStatus();
  }, []);

  useEffect(() => {
    setBooked(isBooked);
    setTableId(tableId);
    setTableNumber(tableno);
    
  }, []);

  const handleBook = async (TableId) => {
    try {
      setUploading(true);
      const response = await CancelBookTable(TableId);
      setUploading(false);

      setBooked(!booked);
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModal = () => {
    console.log("here im");
    setModal2Open(!modal2Open);
  };

  const handleCancelModal = () => {
    console.log("here");
    setCancelModalOpen(!cancelModalOpen);
  };

  useEffect(() => {
    setShowMenuButton(booked);
  }, [booked]);

  const handleMenuSubmit = async () => {
    const data = customerData
    console.log(data,"i am customer data");
    navigate(`/captain-dashboard/captain-menu`, {
      state: { data },
    });
  };

  return (
    <>
      {/* {isUploading ? <Uploading isUploading={isUploading} /> : null} */}

      <Wrapper className="card">

        <div className="card-img">
          <img
            className={booked ? "booked-img" : "unbooked-img"}
            src={img}
            alt={`table ${tableno}`}
          />
        </div>

        <div className={booked ? "customer-name-unbooked  customer-name-booked" : "customer-name-unbooked"}>
        <h3>{customerName  ? customerName : ""}</h3>

        </div>


        <div className="card-body">

          <div>
            <h5>Table {tableno}</h5>
            <p>{noofseats} seaters</p>{" "}
          </div>
          {showMenuButton && (
            <div className="menu-button">
              <button
                onClick={() => {
                  handleMenuSubmit();
                }}
                type="button"
              >
                Menu
              </button>
            </div>
          )}
        </div>

        <div className="card-button">
          <button
            className={booked ? "unbooked-btn-hidden" : "unbooked-btn "}
            type="button"
            onClick={handleModal}
          >
            {booked ? "Booked" : "Book now"}
          </button>
        </div>

        <div className="card-button">
          <button
            className={booked ? "booked-btn" : "booked-btn-hidden"}
            type="button"
            onClick={handleCancelModal}
          >
            Booked
          </button>
        </div>

        <div>
          <ModalStyle
            centered
            open={modal2Open}
            onCancel={() => setModal2Open(false)}
            cancelButtonProps={{ style: { display: "none" } }}
            okButtonProps={{ style: { display: "none" } }}
          >
            <h4 className="title">Book Table</h4>
            <div className="form-div">
              <form onSubmit={handleSubmit(handleSubmitButton)}>
                <div className="card-div">
                  <div className="card">
                    <div className="card-img">
                      <img src={img} alt="" />
                    </div>
                    <div>
                      <h4>Table 0{tableno}</h4>
                      <p style={{ margin: "0px" }}>2 seaters</p>
                    </div>
                  </div>
                </div>

               
          
                <div className="table-form-content">

                <input
    {...register("customerName", {
      required: true,
      pattern: /^[A-Za-z\s]+$/,
    })}
    type="text"
    id="customerName"
    placeholder="Please enter the customer name"
  />
  {errors.customerName &&
    errors.customerName.type === "required" && (
      <label className="error-msg">
        Please enter the customer name
      </label>
    )}
  {errors.customerName &&
    errors.customerName.type === "pattern" && (
      <label className="error-msg">
        Please enter a valid name
      </label>
    )}
                  




                  <input
                    {...register("phone", {
                      required: true,
                      pattern: /^[0-9]{10}$/,
                    })}
                    type="tel"
                    id="phone"
                    placeholder="+91 xxxxxxxxxx"
                  />
                  {errors.phone && errors.phone.type === "required" && (
                    <label className="error-msg text-danger">
                      please enter phone number
                    </label>
                  )}
                  {errors.phone && errors.phone.type === "pattern" && (
                    <label className="error-msg text-danger">
                      please enter a valid phone
                    </label>
                  )}
                </div>

                <div className="form-btn">
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
          </ModalStyle>
        </div>

        <div>
          <TableCancelBookingModal
            handleBook={() => handleBook(TableId)}
            open={cancelModalOpen}
            onCancel={() => setCancelModalOpen(false)}
            cancelButtonProps={{ style: { display: "none" } }}
            okButtonProps={{ style: { display: "none" } }}
          />
        </div>
      </Wrapper>
    </>
  );
};

export default CaptainTableCard;
