//styled-component imports
import Wrapper from "../../../assets/wrappers/adminwrappers/BasicDetails";
import Styled from "styled-components";
//bootstrap imports
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
//icon imports
import { IoSearchSharp } from "react-icons/io5";
//react imports
import { useEffect, useState } from "react";
//backend imports
import {
  AdminPassbookDateFilter,
  PassBookData,
  TodaysPassbookData,
  getAllRegisteredPos,
  getAllSalesReport,
} from "../../../config/routeApi/owner";
import { useForm } from "react-hook-form";
//image imports
import { CardBg } from "../../../assets/images";
// import { formatCurrency } from "../../../helpers/helpers";
import CountUp from "react-countup";
import ViewModal from "../../../components/poscomponents/ViewModal";
import { toastError } from "../../../helpers/helpers";

const CardDeck = Styled.div`
display: flex;
justify-content: space-around;
padding: 30px 0px;
h1{
  margin-bottom: 0px;
  font-weight: 700;
  z-index: 5;
}
.card{
  width: 30%;
  padding: 20px;
  text-align: center;
  color: #fff;
  border-radius: 15px;
  position: relative;
  border-style: none;
}
.sales-card{
 background: linear-gradient(to bottom,#2B8DFF,#2b8eff45);
}
.card-bg{
  width: 310px;
  height: 110px;
  background: url(${CardBg});
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  bottom: 0;
  right:0;
}
.card-body{
  z-index: 5;
}
.card-title{
  padding-bottom: 20px;
  font-weight: 700;
}

// mode of payment card style

.mop-card{
  width: 160px;
  padding: 10px;
  background-color: #fff;
  color: #212529;
  border-radius: 7px;
  box-shadow: 0px 4px 15px 0px #C8E1FF;
  .card-title{
    font-weight: 700;
    padding-bottom: 0px;
    font-size: 14px;
  }
  h1{
    font-size: 16px;
    color: #2B8DFF;
    font-weight: 700;
  }
}
`;

const SalesReport = Styled.div`
  margin-top: 20px;
  color: #202123;

 .search-date{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 15px 0px;
  }
.search-div{
  display: flex;
  align-items: center;
}
  .search-input-group{
    position: relative;
  }

  .search-bar{
    border-style: none;
    box-shadow: inset 0px 2px 6px #00000040; 
    border-radius: 15px;
    padding: 7px 20px 7px 50px;
  }
  .search-bar:focus{
    outline: none;
  }
  .search-bar::placeholder{
    font-size: 12px;
  }
  .search-icon{
    font-size: 20px;
    color: #67666B;
    position: absolute;
    top: 9px;
    left: 15px;
  }
.search-btn{
  background-color: #00418D;
  padding: 10px 20px;
  margin-left: 5px;
  border-style: none;
  border-radius: 10px;
  color: #fff;
  font-size:12px;
}
.search-btn:hover{
  border-style: none;
  background-color:#7EB9FF;
}

  .dates{
      // width: 80%;
      display: flex;
      align-items: center;
      column-gap: 5px;
  }
  .date{
      display: flex;
      align-items: center;
      background-color: #fff;
      border-radius: 10px;
      padding: 5px 10px;
      label{
          margin: 0px 10px 0px 0px;
      }
  }
  .date-input{
    box-shadow: inset 0px 2px 6px #00000040; 
    border-radius: 50px;
    font-size: 10px;
  }
`;

const Passbook = () => {
  // const [paymentMethod, setPaymentMethod] = useState([]);
  // const [floatingCash, setFloatingCash] = useState(0);
  // const [totalOpening, setTotalOpening] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [passBook, setPassBookData] = useState("");
  const [showFilteredData, setShowFilteredData] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [viewdata, setSeletedviewdata] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [showSearchfilteredPassBook, setShowSearchfilteredPassBook] = useState(false);
  const [todaysData, setTodaysData] = useState([]);
  const [registeredPosManager, setRegisteredPosManagers] = useState([]);
  const [selectedPOSManager, setSelectedPosManager] = useState('All');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSearchTermChange = (event) => {
    const term = event.target.value;
  
    // Check if the search term is null or empty
    if (term === null || term.trim() === '') {
      // If term is null or empty, reset the search results and hide filtered passBook
      setSearchTerm('');
      setSearchResult([]);
      setShowSearchfilteredPassBook(false);
      return;
    }
  
    setSearchTerm(term);
  
    // Filter passBook based on search term
    const result = passBook.filter((transaction) => deepSearch(transaction, term));
    setSearchResult(result);
    setShowSearchfilteredPassBook(true);
  };
  
  // Helper function to recursively search through nested objects and arrays
  const deepSearch = (obj, term) => {
    if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        if (deepSearch(obj[key], term)) {
          return true;
        }
      }
    } else if (typeof obj === 'string' && obj.toLowerCase().includes(term.toLowerCase())) {
      return true;
    } else if (typeof obj === 'number' && obj.toString().includes(term)) {
      return true;
    }
  
    return false;
  };


  
  useEffect(() => {
    const handlePassbookData = async () => {
      try {
        // const { data } = await PassBookData();

        const {data} = await TodaysPassbookData(selectedPOSManager)
        if (data.success) {
          setTodaysData(data.TodaysData);
        } else {
          toastError(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    handlePassbookData();

    const GetAllSalesReport = async () => {
      const response = await getAllSalesReport(selectedPOSManager,null);

      if (response.data.success) {
        console.log(response.data," heeey dataata");
        setPassBookData(response.data.data);
      } else {
        toastError(response.data.message);
      }
    };
    GetAllSalesReport();

  

  }, [selectedPOSManager]);

  useEffect(() => {
    const GetAllRegisteredPos = async () => {
      try {
        const { data } = await getAllRegisteredPos();

        if (data.success) {
          setRegisteredPosManagers(data.RegisteredPosManagers);
        } else {
          toastError(data.message);
        }
      } catch (err) {
        console.log(err);
      }
    };

    GetAllRegisteredPos();
  },[])


  async function handleView(data) {
console.log(data);
    setSeletedviewdata(data);
    setModalShow(true);
  }



  const handleDateFilter = async (data) => {
    try {
      // const response = await AdminPassbookDateFilter(data);
      const response = await getAllSalesReport(selectedPOSManager,data);

      if (response.data.success) {
        setFilteredData(response.data.data);
        setShowFilteredData(true);
      } else {
        toastError(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const handleSearch = (item) => {
  //   return (
  //     item.orderMode.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     item.billId.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // };

  return (
    <Wrapper className="page">
      <div className="page-content">
        <div className="page-header">
          <h3>Passbook</h3>
          <div>
          <select
      className="form-select"
      value={selectedPOSManager}
      onChange={(e) => setSelectedPosManager(e.target.value)}
    >
      <option value="All">All</option>
      {registeredPosManager.map((posManager) => (
        <option key={posManager._id} value={posManager._id}>
          {posManager.username}
        </option>
      ))}
    </select>
          </div>
        </div>

        <CardDeck className="card-deck">  
          {todaysData.map((item) => (
            <Card className="sales-card my-3 mx-2 p-3 shadow" key={item.title}>
              <div className="card-bg"></div>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <h1>
                  <CountUp duration={0.6} prefix="₹ " end={item.amount} />
                </h1>
              </Card.Body>
            </Card>
          ))}
        </CardDeck>

        <SalesReport>
          <div>
            <h3>Closing Report</h3> 
          </div>

          <div>
            <div className="search-date">
              <div className="search-div">
                <div className="search-input-group">
                  <IoSearchSharp className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="search-bar"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                  />
                </div>
                {/* <button className="search-btn">Search</button> */}
              </div>

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

          <div>
          
          </div>

          <div className="table-div">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Date</th>
                  <th>Total Orders</th>
                  <th>Total Amount</th>
                  <th>Swiggy Sales Total Amount</th>
                  <th>Zomato Sales Total Amount</th>
                  <th>Bromag Sales Total Amount</th>
                  <th>Others Sales Total Amount</th>
                  <th>Take Away Sales Total Amount</th>
             
                </tr>
              </thead>
              {!showFilteredData && !showSearchfilteredPassBook &&  (
                <tbody>
                  {passBook &&
                    passBook.map((item, i) => {
                      const dateObject = new Date(item.date);

                      const formattedDate = dateObject.toLocaleDateString();
                      // const formattedTime = dateObject.toLocaleTimeString();
                      return (
                        <tr key={item._id}>
                          <td>{i + 1}</td>
                          <td>{formattedDate}</td>
                          {/* <td>{item.employeeid}</td> */}
                          <td>{item.totalOrder}</td>
                          <td>{item.totalAmount}</td>
                          <td>{item.totalAmountSwiggyOrder}</td>
                          <td>{item.totalAmountZomatoOrder}</td>
                          <td>{item.totalAmountBromagOrder}</td>
                          <td>{item.totalAmountOthersOrder}</td>
                          <td>{item.totalAmountTakeaway}</td>
                       
                        </tr>
                      );
                    })}
                </tbody>
              )}

              {showFilteredData && !showSearchfilteredPassBook &&(
                <tbody>
                  {filteredData &&
                    filteredData.map((item, i) => {
                      const dateObject = new Date(item.date);

                      const formattedDate = dateObject.toLocaleDateString();
                      const formattedTime = dateObject.toLocaleTimeString();
                      return (
                        <tr key={item._id}>
                           <td>{i + 1}</td>
                          <td>{formattedDate}</td>
                          <td>{item.totalOrder}</td>
                          <td>{item.totalAmount}</td>
                          <td>{item.totalAmountSwiggyOrder}</td>
                          <td>{item.totalAmountZomatoOrder}</td>
                          <td>{item.totalAmountBromagOrder}</td>
                          <td>{item.totalAmountOthersOrder}</td>
                          <td>{item.totalAmountTakeaway}</td>
                        
                        </tr>
                      );
                    })}
                </tbody>
              )}

              {showSearchfilteredPassBook   &&(
                <tbody>
                  {searchResult &&
                    searchResult.map((item, i) => {
                      const dateObject = new Date(item.date);

                      const formattedDate = dateObject.toLocaleDateString();
                      const formattedTime = dateObject.toLocaleTimeString();
                      return (
                        <tr key={item._id}>
                           <td>{i + 1}</td>
                          <td>{formattedDate}</td>
                          <td>{item.totalOrder}</td>
                          <td>{item.totalAmount}</td>
                          <td>{item.totalAmountSwiggyOrder}</td>
                          <td>{item.totalAmountZomatoOrder}</td>
                          <td>{item.totalAmountBromagOrder}</td>
                          <td>{item.totalAmountOthersOrder}</td>
                          <td>{item.totalAmountTakeaway}</td>
                        
                        </tr>
                      );
                    })}
                </tbody>
              )}
            </Table>
          </div>
        </SalesReport>
      </div>
      {viewdata ? (
        <ViewModal
          viewData={viewdata}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      ) : null}
    </Wrapper>
  );
};
export default Passbook;
