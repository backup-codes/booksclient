//styled-component imports
import Wrapper from "../../../assets/wrappers/poswrappers/PosCustomers";

//bootstrap imports
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

//react-icon imports
import { FaPlus } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";

//react imports
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

//component imports
import ViewModal from "../../../components/poscomponents/ViewModal";
import DominationModal from "../../../components/poscomponents/DominationModal";

//backend integration imports
import { restaurantPosAxiosInstance } from "../../../config/apiInterceptor";
import { TodaysClosingDateFilter, searchTodayClosing } from "../../../config/routeApi/pos";
import { toastError } from "../../../helpers/helpers";

const PosTodaysClosing = () => {
  const [openingdata, setOpeningdata] = useState([]);
 
  const [dominationModalShow, setDominationModalShow] = useState(false);
  const [filteredDomination, setfilteredDenominations] = useState()
  
  const [showFilteredData, setShowFilteredData] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [viewdata, setSeletedviewdata] = useState();
  const [isClosingAdded, setIsClosingAdded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();



  const handleDateFilter = async (data) => {
    try {


      const response = await TodaysClosingDateFilter(data);


      if (response.data.success) {
        setFilteredData(response.data.data);
        setShowFilteredData(true);
      } else {

        toastError(response.data.message)
      }




    } catch (error) {
      console.error(error);
    }
  };




  useEffect(() => {
    (async function fetchClosingData() {
      const response = await restaurantPosAxiosInstance.get(
        `getClosingData`)

      if (response.data.success) {
        console.log(response.data.data," i am data ka data")
        setOpeningdata(response.data.data)
      } else {

        toastError(response.data.message)

      }

    })()

    const isAdded = async () => {
      try {
        const {data} = await restaurantPosAxiosInstance.get('isPassBookReportsAdded')

        if (data.success) {
         setIsClosingAdded(data.isClosingExist) 
        }  

      } catch (err) {
        console.log(err);
      }
    }
    isAdded()

  }, []);


  async function search(query) {
    try {
      console.log(query);
  
      // Use the query parameter directly instead of searchQuery
      setSearchQuery(query);
  
      if (query) {
        const response = await searchTodayClosing(query);
  
        if (response.data.success) {
          setShowFilteredData(true);
          setFilteredData(response.data.data);
        }
      } else {
       
        // If search query is empty, reset the filtered data and show opening data
        setShowFilteredData(false);
        setFilteredData([]);
      }
  
      console.log(showFilteredData, "filtered");
    } catch (error) {
      console.log(error);
    }
  }


  async function handleView(data) {
   
    setSeletedviewdata(data);
    setModalShow(true);
  }
  async function handleViewDomination(data) {
    setfilteredDenominations(data)
    setDominationModalShow(true)
  }

  return (
    <Wrapper className="page">
      <div className="page-content">
        <div className="page-header">
          <h3>Closing Report</h3>

          <Button disabled={isClosingAdded} variant="dark" className="fw-normal" >
            <Link
              className="page-header-btn"
              to="/pos-dashboard/pos-passbook/add-todays-closing"
            >
              <FaPlus className="plus-icon" />Add Closing Report
            </Link>
          </Button>

        </div>

        <div className="search-and-btn">
          <div className="search-div">
            <div className="search-input-group">
              <IoSearchSharp className="search-icon" />
              <input type="text" placeholder="Search"
                onInput={(e) => search(e.target.value)}
                className="search-bar" />
            </div>
            {/* <button className="search-btn">Search</button> */}
          </div>

          {/* Date Filter */}

          <div>
            <form onSubmit={handleSubmit(handleDateFilter)}>
              <div className="dates">
                <div className="date left">
                  <Form.Label>From</Form.Label>
                  <div>
                    <Form.Control
                      className="date-input"
                      type="date"
                      {...register("start", { required: true })}
                    />
                    {errors.start && (
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid date
                      </Form.Control.Feedback>
                    )}
                  </div>
                </div>

                <div className="date right">
                  <Form.Label>To</Form.Label>
                  <div>
                    <Form.Control
                      className="date-input"
                      type="date"
                      {...register("end", { required: true })}
                    />
                    {errors.end && (
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid date
                      </Form.Control.Feedback>
                    )}
                  </div>
                </div>
                <Button className="search-btn" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </div>

          {/* <div className="dates">
            <form onSubmit={handleSubmit(handleDateFilter)} className="d-flex flex-wrap align-items-center  gap-2">

              <div className="date left">
                <div>
                  <Form.Label>From</Form.Label>
                </div>
                <div>
                  <Form.Control
                    type="date"
                    {...register("start", { required: true })}
                  />
                  {errors.start && (
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid date
                    </Form.Control.Feedback>
                  )}
                </div>
              </div>

              <div className="date right">
                <div>
                  <Form.Label>To</Form.Label>
                </div>
                <div>
                  <Form.Control
                    type="date"
                    {...register("end", { required: true })}
                  />
                  {errors.end && (
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid date
                    </Form.Control.Feedback>
                  )}
                </div>

              </div>
              <Button variant="dark" className="fw-normal btn btn-dark mt-4 py-2 " type="submit">
                Submit
              </Button>
            </form>

          </div> */}

          {/* Add Closing Report Button */}



        </div>


        <div className="table-div">
          <Table striped bordered hover className="table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Date</th>
                <th>Total Amount</th>
                <th>Dinomination</th>
                <th>Actions</th>
              </tr>
            </thead>

            {!showFilteredData && (
              <tbody>

                {openingdata.map((item, i) => {
                  const dateObject = new Date(item.date);
                  const formattedDate = dateObject.toLocaleDateString();

                  const filteredDenominations = item.cashDenomination.filter(
                    (denomination) => denomination.count > 0
                  );

                  return (
                    <tr key={item._id}>
                      <td>{i + 1}</td>
                      <td>{formattedDate}</td>
                      <td>{item.totalAmount}</td>
                      {/* <td>
        {filteredDenominations.length > 0 ? (
          <ul>
            {filteredDenominations.map((denomination) => (
              <li key={denomination._id}>
                {denomination.label} x {denomination.count}
              </li>
            ))}
          </ul>
        ) : (
          "No denominations"
        )}
      </td> */}
                      <td>{
                        <div className="actions">

                          <div className="link-wrapper">
                            <Link
                              className="action-list"
                              onClick={() => handleViewDomination(filteredDenominations)}>
                              <a className="view">
                                View
                              </a>
                            </Link>
                          </div>
                        </div>

                      }</td>
                      <td>{
                        <div className="actions">

                          <div className="link-wrapper">
                            <Link
                              className="action-list"
                              onClick={() => handleView(item.bill)}>
                              <a className="view">
                                View
                              </a>
                            </Link>
                          </div>
                        </div>

                      }</td>
                    </tr>
                  );
                })}
              </tbody>
            )}




            {showFilteredData && (
              <tbody>

                {filteredData.map((item, i) => {
                  const dateObject = new Date(item.date);
                  const formattedDate = dateObject.toLocaleDateString();

                  const filteredDenominations = item.cashDenomination.filter(
                    (denomination) => denomination.count > 0
                  );

                  return (
                    <tr key={item._id}>
                      <td>{i + 1}</td>
                      <td>{formattedDate}</td>
                      <td>{item.totalAmount}</td>
                      <td>{
                        <div className="actions">

                          <div className="link-wrapper">
                            <Link
                              className="action-list"
                              onClick={() => handleViewDomination(filteredDenominations)}>
                              <a className="view">
                                View
                              </a>
                            </Link>
                          </div>
                        </div>

                      }</td>
                      <td>{
                        <div className="actions">

                          <div className="link-wrapper">
                            <Link
                              className="action-list"
                              onClick={() => handleView(item.bill)}>
                              <a className="view">
                                View
                              </a>
                            </Link>
                          </div>
                        </div>

                      }</td>
                    </tr>
                  );
                })}
              </tbody>
            )}



          </Table>
        </div>
      </div>


      {

        filteredDomination ? (
          <DominationModal
            filteredDenominations={filteredDomination}
            show={dominationModalShow}
            onHide={() => setDominationModalShow(false)}
          />) : null
      }


{

viewdata ? (
  <ViewModal
  viewData={viewdata}
  open={modalShow}
  onCancel={() => setModalShow(false)}
  cancelButtonProps={{ style: { display: "none" } }}
  okButtonProps={{ style: { display: "none" } }}
  />) : null
}
    </Wrapper>

    
  );
};
export default PosTodaysClosing;




