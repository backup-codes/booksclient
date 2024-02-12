//styled-component imports
import Wrapper from "../../../assets/wrappers/poswrappers/PosCustomers";
//bootstrap imports
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// react imports 
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//icon imports
import { IoSearchSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
//backend imports
import { fetchOpeningData, getAllOpeningDateFilter, searchTodayOpening } from "../../../config/routeApi/pos";
import { useForm } from "react-hook-form";
import DominationModal from "../../../components/poscomponents/DominationModal";
import { toastError } from "../../../helpers/helpers";
import { restaurantPosAxiosInstance } from "../../../config/apiInterceptor";

const TodaysOpening = () => {
  const [openingdata, setOpeningdata] = useState([]);
  const [dominationModalShow, setDominationModalShow] = useState(false);
  const [isOpeningAdded, setIsOpeningAdded] = useState(false);
  const [filteredDomination, setfilteredDenominations] = useState()
  const [showFilteredData, setShowFilteredData] = useState(false);
  const [dateFilteredData, setDateFilteredData] = useState(false);
  const [showDateFilteredData, setShowDateFilteredData] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleViewDomination(data) {
    setfilteredDenominations(data)
    setDominationModalShow(true)
  }

  

  useEffect(() => {
    (async function fetchTodaysOpening() {
      const response = await fetchOpeningData()

      if (response.data.success) {
        console.log(response)
        setOpeningdata(response.data.data)
      } else {
        toastError(response.data.message)

      }

    })()

    const isAdded = async () => {
      try {
        const {data} = await restaurantPosAxiosInstance.get('isPassBookReportsAdded')

        if (data.success) {
         setIsOpeningAdded(data.isOpeningExist) 
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
        const response = await searchTodayOpening(query);
  
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

    const handleDateFilter = async (data) => {
    try {
      // const response = await AdminPassbookDateFilter(data);
      const response = await getAllOpeningDateFilter(data);
console.log(response,"datee");
      if (response.data.success) {
        setDateFilteredData(response.data.FilteredData);
        setShowDateFilteredData(true);
      } else {
        toastError(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Wrapper className="page">
      <div className="page-content">
        <div className="page-header">
          <h3>Opening Report</h3>

          <Button disabled={isOpeningAdded} variant="dark" className="fw-normal">
            <Link
              className="page-header-btn"
              to="/pos-dashboard/pos-passbook/add-todays-opening-balance"
            >
              <FaPlus className="plus-icon" />Add Opening Balance
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
        </div>




        <div className="table-div">
          <Table striped bordered hover className="table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Date</th>
                <th>Total Amount</th>
                <th>Dinomination</th>
              </tr>
            </thead>

            {!showFilteredData && !showDateFilteredData && (   <tbody>

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

                  </tr>
                );
              })}

           </tbody>)}

            
            

           {showDateFilteredData && dateFilteredData && !showFilteredData&&(<tbody>

{dateFilteredData.map((item, i) => {
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

  </tr>
  );
})}


</tbody>)}
           {showFilteredData && filteredData && (<tbody>

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

  </tr>
  );
})}


</tbody>)}
            
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
    </Wrapper>
  );
};
export default TodaysOpening;




