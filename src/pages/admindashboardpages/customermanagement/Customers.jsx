import { useEffect, useState } from "react";
import Wrapper from "../../../assets/wrappers/adminwrappers/BasicDetails";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { IoSearchSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import CustomerDetailModal from "../../../components/admindashboardcomponents/CustomerDetailModal";
import { RestaurantAdminApi } from "../../../config/global";
import axios from "axios";
import '../../../assets/css/Customers.css'
// import { restaurantOwnerAxiosInstance } from "../../../config/apiInterceptor";
import { CustomerDetailssearchQuery, getEmployeesData } from "../../../config/routeApi/owner";
import Uploading from "../../../components/loaders/Uploading";
const Customers = () => {
  //modal useState start
  const [modalShow, setModalShow] = useState(false);
  // modal useState End
  const [customerDetails, setCustomerDetails] = useState([]);
  const [viewdata, setSeletedviewdata] = useState()
  const [indicator, SetIndicator] = useState(false)
  const [searchquery, setSearchQuery] = useState("")
  const [isUploading, setUploading] = useState(false);
  const [showFilteredData, setShowFilteredData] = useState(false);
  const [filteredData, setFilteredData] = useState([]);


  async function search(query) {

    try {

      setSearchQuery(query)
      if (query) {
      console.log(query);
      
      const response = await CustomerDetailssearchQuery(query)
      // setCustomerDetails(response.data.data);
      if (response.data.success) {
        setShowFilteredData(true);
        setFilteredData(response.data.data);
      }

    } else {
       
      // If search query is empty, reset the filtered data and show opening data
      setShowFilteredData(false);
      setFilteredData([]);
    }
    } catch (error) {
      console.log(error);
    }


  }

  useEffect(() => {
    const handleEmployData = async () => {
      try {
        const response = await getEmployeesData()
        setCustomerDetails(response.data.customerData);
      } catch (error) {
        console.log(error);
      }
    };
    handleEmployData();
  }, [indicator]);

  async function handleView(customerdata) {
    setSeletedviewdata(customerdata)
    setModalShow(true)
  }


  const tableHeading = [
    {
      id: 1,
      title: "Customer Name",
    },
    {
      id: 2,
      title: "Customer Number",
    },
    {
      id: 3,
      title: "Customer Email",
    },
    {
      id: 4,
      title: "Customer Address",
    },
    {
      id: 5,
      title: "Limit",
    },
    {
      id: 6,
      title: "Balance",
    },
  ];


  // async function handleDelete(Id) {

  //   setUploading(true)

  //   const response = await axios.delete(
  //     `${RestaurantAdminApi}deleteCustomer/${Id}`
  //   );
  //   setUploading(false)

  //   if (response.data.success) {
  //     SetIndicator(!indicator)
  //   }


  // }





  return (
    <>
      {isUploading ? (<Uploading isUploading={isUploading} />) : null}

      <Wrapper className="page">
        <div className="page-content">
          <div className="page-header">
            <h3>Customer Details</h3>

          </div>


          <div className="search-and-btn">

            <div className="search-div">
              <div className="search-input-group">
                <IoSearchSharp className="search-icon" />
                <input
                  type="text"
                  placeholder="Search"
                  className="search-bar"
                  onChange={(e) => search(e.target.value)}
                />

              </div>
              {/* <button className="search-btn">Search</button> */}
            </div>

            <Button variant="dark" className="fw-normal">
              <FaPlus className="plus-icon" />
              <Link className="page-header-btn" to="/dashboard/customer-management/add-customer">
                Add Customer
              </Link>
            </Button>
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

              {!showFilteredData && (
              <tbody>
                {customerDetails.map((item, i) => {
                  return (
                    <tr key={item._id}>
                      <td>{i + 1}</td>
                      <td>{item.customer}</td>
                      <td>{item.phone}</td>
                      <td>{item.email}</td>
                      <td>{item.address}</td>
                      <td>{item.limit}</td>
                      <td>{item.balance}</td>
                      <td>
                        <div className="actions">

                          <div className="link-wrapper">
                            <Link
                              className="action-list"
                              onClick={() => handleView(item)}>
                              <a className="view">
                                View
                              </a>
                            </Link>
                          </div>

                          <div className="link-wrapper">
                            <Link className="action-list" to={`/dashboard/customer-management/update-customer/${item._id}`}>
                              <a className="edit">
                                Edit
                              </a>
                            </Link>
                          </div>

                          {/* <div className="link-wrapper" onClick={() => handleDelete(item._id)}>
                            <a className="delete">
                              Delete
                            </a>
                          </div> */}


                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}

              
{showFilteredData && (
              <tbody>

                {filteredData.map((item, i) => {
                 

            
                  return (
                    <tr key={item._id}>
                    <td>{i + 1}</td>
                    <td>{item.customer}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{item.address}</td>
                    <td>{item.limit}</td>
                    <td>{item.balance}</td>
                    <td>
                      <div className="actions">

                        <div className="link-wrapper">
                          <Link
                            className="action-list"
                            onClick={() => handleView(item)}>
                            <a className="view">
                              View
                            </a>
                          </Link>
                        </div>

                        <div className="link-wrapper">
                          <Link className="action-list" to={`/dashboard/customer-management/update-customer/${item._id}`}>
                            <a className="edit">
                              Edit
                            </a>
                          </Link>
                        </div>

                        {/* <div className="link-wrapper" onClick={() => handleDelete(item._id)}>
                          <a className="delete">
                            Delete
                          </a>
                        </div> */}


                      </div>
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            )}


            </Table>
          </div>
        </div>

        {

          viewdata ? (
            <CustomerDetailModal
              customerData={viewdata}
              open={modalShow}
              onCancel={() => setModalShow(false)}
              cancelButtonProps={{ style: { display: "none" } }}
              okButtonProps={{ style: { display: "none" } }}
            />) : null
        }
      </Wrapper>

    </>

  );
};
export default Customers;
