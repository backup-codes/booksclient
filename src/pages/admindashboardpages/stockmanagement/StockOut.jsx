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
import "../../../assets/css/Customers.css";
// import { restaurantOwnerAxiosInstance } from "../../../config/apiInterceptor";
import {
  // getEmployeesData,
  getStockOutDetails,
} from "../../../config/routeApi/owner";
import Uploading from "../../../components/loaders/Uploading";
import { Modal } from "antd";
import Styled from "styled-components";
// import { RiContactsBookLine } from "react-icons/ri";
import { formatDate } from "../../../helpers/helpers";

const ModalStyle = Styled(Modal)`
margin: 50px 0px;
.ant-modal{
    width: 700px;
}
.modal-content{
    padding: 20px 10px;
}
h4{
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
}
.buttons{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 40px 0px 10px 0px;
}
button{
   color: #fff;
    border-radius: 7px;
    border-style: none;
    padding: 10px 50px;
}
.close-btn{
    background-color:#00418D;
}
.c
`;

const StockOut = () => {
  //modal useState start
  const [modalShow, setModalShow] = useState(false);
  // modal useState End
  const [stockOutDetails, setStockOutDetails] = useState([]);
  const [viewdata, setSeletedviewdata] = useState();
  const [indicator, SetIndicator] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [isUploading, setUploading] = useState(false);

  useEffect(() => {
    async function fetchStockOutDetails() {
      const { data } = await getStockOutDetails();

      if (data.success) {
        setStockOutDetails(data.stockOutData);
      }
    }

    fetchStockOutDetails();
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

  async function handleView(stockoutdata) {
    setSeletedviewdata(stockoutdata.description);
    setModalShow(true);
  }

  const tableHeading = [
    {
      id: 1,
      title: "Date",
    },
    {
      id: 2,
      title: "Commodity",
    },
    {
      id: 3,
      title: "Previous Stock",
    },
    {
      id: 4,
      title: "Stock Outward",
    },
    {
      id: 5,
      title: "Balance Stock",
    },
    {
      id: 6,
      title: "Actions",
    },
  ];


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // Adjust the delay as needed (e.g., 300 milliseconds)

    // Clear the timeout if the component is unmounted or the search query changes
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Filter the stockOutDetails based on the debounced search query
  const filteredStockOutDetails = stockOutDetails.filter((item) => {
    return (
      Object.values(item).some((value) => {
        if (typeof value === "number" && !isNaN(value)) {
          // Compare numerical value directly
          return value === parseFloat(debouncedSearchQuery);
        } else if (
          typeof value === "string" &&
          value.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        ) {
          return true;
        }
        return false;
      })
    );
  });

  // const filteredStockOutDetails = stockOutDetails.filter((item) => {
  //   return (
  //     Object.values(item).some((value) => {
  //       if (typeof value === "number" && !isNaN(value)) {
  //         // Compare numerical value directly
  //         return value === parseFloat(searchQuery);
  //       } else if (
  //         typeof value === "string" &&
  //         value.toLowerCase().includes(searchQuery.toLowerCase())
  //       ) {
  //         return true;
  //       }
  //       return false;
  //     })
  //   );
  // });
  
  return (
    <>
      {isUploading ? <Uploading isUploading={isUploading} /> : null}

      <Wrapper className="page">
        <div className="page-content">
          <div className="page-header">
            <h3>Stock Out</h3>

            {/* <div className="search-and-btn"> */}

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
              {/* <button className="search-btn">Search</button> */}
              {/* </div> */}
            </div>

            {/* <Button variant="dark" className="fw-normal">
            <FaPlus className="plus-icon" />
            <Link className="page-header-btn" to="/dashboard/customer-management/add-customer">
              Add Customer
            </Link>
          </Button> */}
          </div>

          <div className="table-div">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>S.No.</th>
                  {tableHeading.map((item) => {
                    return <th key={item.id}>{item.title}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {filteredStockOutDetails.map((item, i) => {
                  return (
                    <tr key={item._id}>
                      <td>{i + 1}</td>
                      <td>{formatDate(item.date)}</td>
                      <td>{item.commodity}</td>
                      <td>{item.previousStock}</td>
                      <td>{item.stockOutward}</td>
                      <td>{item.balanceStock}</td>
                      <td>
                        <div className="actions">
                          <div className="link-wrapper">
                            <Link
                              className="action-list"
                              onClick={() => handleView(item)}
                            >
                              <a className="view">View</a>
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
          centered
          open={modalShow}
          onCancel={() => setModalShow(false)}
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Description</h4>
            </div>

            <div className="modal-body">
              <p>{viewdata}</p>
            </div>

            <div className="buttons">
              <button
                type="button"
                className="close-btn"
                onClick={() => setModalShow(false)}
              >
                Close
              </button>
            </div>
          </div>
        </ModalStyle>
      </Wrapper>
    </>
  );
};
export default StockOut;
