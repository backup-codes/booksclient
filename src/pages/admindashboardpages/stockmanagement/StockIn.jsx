import { useEffect, useState } from "react";
import Wrapper from "../../../assets/wrappers/adminwrappers/BasicDetails";
import Table from "react-bootstrap/Table";
// import Button from "react-bootstrap/Button";
import { IoSearchSharp } from "react-icons/io5";
// import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
// import CustomerDetailModal from "../../../components/admindashboardcomponents/CustomerDetailModal";
// import { RestaurantAdminApi } from "../../../config/global";
// import axios from "axios";
// const { TextArea } = Input;
import "../../../assets/css/Customers.css";
// import { restaurantOwnerAxiosInstance } from "../../../config/apiInterceptor";
import {
  commodityStockOut,
  // getEmployeesData,
  getStockInDetails,
} from "../../../config/routeApi/owner";
import Uploading from "../../../components/loaders/Uploading";
import { Modal } from "antd";
import Styled from "styled-components";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { formatDate, toastError } from "../../../helpers/helpers";
// import {
//   Cascader,
//   DatePicker,
//   Form,
//   Input,
//   InputNumber,
//   Radio,
//   Select,
//   Switch,
//   TreeSelect,
// } from 'antd';
import { useForm } from "react-hook-form";

const ModalStyle = Styled(Modal)`
margin: 50px 0px;
h4{
  width: 100%;
    text-align: center;
    margin-bottom: 20px;
}

//modal forms styles start
.form-div {
    margin-top: 40px;
  }
  .form-row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 20px;
    row-gap: 20px;
  }
  .form-input{
    width: 100%;
    margin-bottom: 20px;
  }
  label {
    color: #393939;
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    font-size: 16px;
  }
  input {
    width: 100%;
    border-radius: 7px;
    border: 1px solid #a7cfff;
    padding: 10px 20px;
    font-size: 14px;
  }
  input::placeholder {
    font-size: 10px;
    color: #6a6a6a;
  }

  select {
    height: 48px;
    border-radius: 7px;
    border: 1px solid #a7cfff;
    padding: 0px 10px;
    font-size: 14px;
  }
  select:focus {
    box-shadow: none;
  }
  .form-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0px;
  }

  .form-btn button {
    flex-grow: 1;
    margin-right: 10px;
  }

  .form-btn button:first-child {
    background-color: #00418d;
    color: #fff;
    padding: 15px 10px;
    border-style: none;
    border-radius: 12px;
    font-family: "Montserrat", sans-serif;
  }

  .form-btn button:last-child {
    background-color: #00418d;
    color: #fff;
    padding: 15px 10px;
    border-style: none;
    border-radius: 12px;
    font-family: "Montserrat", sans-serif;
  }

  .error-msg {
    color: red;
    font-size: 10px;
    font-weight: 400;
    margin-top: 3px;
  }
// modal form styles end 

.buttons{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 40px 0px 20px 0px;
}
button{
   color: #fff;
    border-radius: 7px;
    border-style: none;
    padding: 10px 50px;
}
.submit-btn{
    margin-right: 10px;
    background-color:#00418D;
}
.cancel-btn{
    background-color: #7EB9FF;
}
`;
const StockIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //modal useState start
  const [modalShow, setModalShow] = useState(false);
  // modal useState End
  const [stockrDetails, setstockDetails] = useState([]);
  const [URL, setSeletedURL] = useState();
  const [indicator, SetIndicator] = useState(false);
  const [isUploading, setUploading] = useState(false);
  const [selectedStockIn, setSelectedStockIn] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  // const [componentSize, setComponentSize] = useState('large');

  useEffect(() => {
    async function getStockIn() {
      try {
        const { data } = await getStockInDetails();
        console.log(data.stockInData);
        setstockDetails(data.stockInData);
      } catch (err) {
        console.log(err);
      }
    }

    getStockIn();
  }, []);

  async function search(query) {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const handleEmployData = async () => {
      try {
        //    const response = await getEmployeesData()
        //     setCustomerDetails(response.data.customerData);
      } catch (error) {
        console.log(error);
      }
    };
    handleEmployData();
  }, [indicator]);

  async function handleView(URL) {
    setSelectedStockIn("");
    setSeletedURL(URL);
    setModalShow(true);
  }

  async function handleStockOut(StockIn) {
    setSeletedURL("");
    setModalShow(true);
    setSelectedStockIn(StockIn);
  }

  const tableHeading = [
    {
      id: 1,
      title: "Date",
    },
    {
      id: 1,
      title: "Commodity",
    },
    {
      id: 2,
      title: "Stock Inward",
    },
    {
      id: 3,
      title: "Vendor ID",
    },
    {
      id: 4,
      title: "Amount",
    },
  ];

  async function handleStockOutDetails(data) {
    try {
      const response = await commodityStockOut({ data, ...selectedStockIn });
      if (response.data.success) {
        setModalShow(false);
      } else {
        toastError(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // Adjust the delay as needed (e.g., 300 milliseconds)

    // Clear the timeout if the component is unmounted or the search query changes
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Filter the stockrDetails based on the debounced search query
  const filteredSalesData = stockrDetails.filter((item) => {
    const formattedAmount = String(item.amount);
    const searchLowerCase = debouncedSearchQuery.toLowerCase();

    return Object.entries(item).some(
      ([key, value]) =>
        (typeof value === "string" &&
          key !== "VendorId" &&
          key !== "stockInward" &&
          value.toLowerCase().includes(searchLowerCase)) ||
        (key === "VendorId" &&
          value.vendorId.toLowerCase().includes(searchLowerCase)) ||
        (key === "stockInward" &&
          (value + " " + item.unit).toLowerCase().includes(searchLowerCase)) ||
        formattedAmount.includes(debouncedSearchQuery)
    );
  });


  // const filteredSalesData = stockrDetails.filter((item) => {
  //   const formattedAmount = String(item.amount);
  //   const searchLowerCase = searchQuery.toLowerCase();

  //   return Object.entries(item).some(
  //     ([key, value]) =>
  //       (typeof value === "string" &&
  //         key !== "VendorId" &&
  //         key !== "stockInward" &&
  //         value.toLowerCase().includes(searchLowerCase)) ||
  //       (key === "VendorId" &&
  //         value.vendorId.toLowerCase().includes(searchLowerCase)) ||
  //       (key === "stockInward" &&
  //         (value + " " + item.unit).toLowerCase().includes(searchLowerCase)) ||
  //       formattedAmount.includes(searchQuery)
  //   );
  // });

  return (
    <>
      {isUploading ? <Uploading isUploading={isUploading} /> : null}

      <Wrapper className="page">
        <div className="page-content">
          <div className="page-header">
            <h3>Stock In</h3>

            <div className="search-div">
              <div className="search-input-group">
                <IoSearchSharp className="search-icon" />

                <input
                  type="text"
                  placeholder="Search"
                  className="search-bar"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="table-div">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>S.No.</th>
                  {tableHeading.map((item) => {
                    return <th key={item.id}>{item.title}</th>;
                  })}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalesData.map((item, i) => {
                  return (
                    <tr key={item._id}>
                      <td>{i + 1}</td>
                      <td>{formatDate(item.date)}</td>
                      <td>{item.commodity}</td>
                      <td>{item.stockInward + " " + item.unit}</td>
                      <td>{item.VendorId.vendorId}</td>
                      <td>{item.amount}</td>

                      <td>
                        <div className="actions">
                          <div className="link-wrapper">
                            <Link
                              className="action-list"
                              onClick={() => handleView(item.billURL)}
                            >
                              <a className="view">View</a>
                            </Link>
                          </div>
                          <div className="link-wrapper">
                            <Link
                              className="action-list"
                              onClick={() => handleStockOut(item)}
                            >
                              <a className="view">Stock Out</a>
                            </Link>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>

        <ModalStyle
          width="500px"
          centered
          open={modalShow}
          onCancel={() => setModalShow(false)}
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
        >
          {URL && modalShow && (
            <div className="modal-content">
              <div className="modal-header" key={URL}>
                <h4 className="modal-title">Stock Invoice</h4>
              </div>
              <div className="modal-body text-center">
                <div className="row justify-content-center">
                  <div className="col-md-4 mb-4">
                    <Zoom>
                      <img src={URL} alt="Image" className="img-fluid" />
                    </Zoom>
                  </div>
                </div>
              </div>
              <div className="buttons">
                <button
                  className="submit-btn"
                  type="button"
                  onClick={() => setModalShow(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {selectedStockIn && modalShow && (
            <>
              <div className="modal-header">
                <h4 className="modal-title">Stock Out</h4>
              </div>

              <div className="form-div">
                <form noValidate onSubmit={handleSubmit(handleStockOutDetails)}>
                  <div className="form-row">
                    <div className="form-input">
                      <label htmlFor="quantity">Quantity</label>
                      <br />
                      <input
                        {...register("quantity", {
                          required: true,
                          pattern: /^[0-9]+(\.[0-9]+)?$/,
                        })}
                        type="number"
                        id="quantity"
                        placeholder="Enter the Quantity"
                      />
                      {errors.quantity &&
                        errors.quantity.type === "required" && (
                          <label className="error-msg">
                            Please enter the quantity
                          </label>
                        )}
                      {errors.customer &&
                        errors.quantity.type === "pattern" && (
                          <label className="error-msg">
                            Please enter a quantity
                          </label>
                        )}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-input">
                      <label htmlFor="quantity" className="text-left">
                        Description
                      </label>
                      <br />
                      <input
                        {...register("description", {
                          required: true,
                          pattern: /^[a-zA-Z0-9-'.,() ]+$/,
                        })}
                        type="text"
                        id="description"
                        placeholder="Enter the Description"
                      />
                      {errors.description &&
                        errors.description.type === "required" && (
                          <label className="error-msg">
                            Please enter the description
                          </label>
                        )}
                      {errors.description &&
                        errors.description.type === "pattern" && (
                          <label className="error-msg">
                            Please enter a description
                          </label>
                        )}
                    </div>
                  </div>

                  <div className="buttons">
                    <button className="submit-btn" type="submit">
                      Submit
                    </button>

                    <button
                      className="cancel-btn"
                      type="button"
                      onClick={() => setModalShow(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </ModalStyle>
      </Wrapper>
    </>
  );
};
export default StockIn;
