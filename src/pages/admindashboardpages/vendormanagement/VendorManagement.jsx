import Wrapper from "../../../assets/wrappers/adminwrappers/SalesManagement";
// import ManagementCard from "../../../components/admindashboardcomponents/ManagementCard";
import Form from "react-bootstrap/Form";
import {Modal} from 'antd'

import Card from "react-bootstrap/Card";
import {
  VendorDashboard,
  VendorDateFilter,
} from "../../../config/routeApi/owner";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toastError } from "../../../helpers/helpers";
import Styled from "styled-components";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'


const ModalStyle = Styled(Modal)`
margin: 50px 0px;
.ant-modal{
    width: 700px;
}
.modal-content{
    padding: 20px 10px;
}
h4{
    text-align: center;
    margin-bottom: 20px;
}
.items{
    display: flex;
    column-gap: 20px;
}
.left-item{
    width: 30%;
}
.right-item{
    width: 70%;
}
.cancel-btn{
    width: 100%;
    text-align: center;
    margin-top: 20px;
    button{
        padding: 10px 30px;
        border-style: none;
        border-radius: 7px;
        color: #fff;
        background-color: #00418E;
    }
}
`;


const VendorManagement = () => {
  const [today, setToday] = useState([]);
  const [total, setTotal] = useState([]);
  const [lastWeek, setLastWeek] = useState([]);
  const [lastMonth, setLastMonth] = useState([]);
  const [lastYear, setLastYear] = useState([]);
  const [yesterday, setYesterday] = useState([]);

  const [showToday, setShowToday] = useState(true);
  const [showTotal, setShowTotal] = useState(true);
  const [showFiltered, setShowFiltered] = useState(false);
  const [showLastWeek, setShowLastWeek] = useState(false);
  const [showLastMonth, setShowLastMonth] = useState(false);
  const [showYesterday, setShowYesterday] = useState(false);
  const [showLastYear, setShowLastYear] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [URLS, setURLS] = useState([]);

  const [filteredData, setFilteredData] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  

  const handleVendorDashboard = async () => {
    try {
      const response = await VendorDashboard();

      const { todaysArray, yesterdayArray, lastweekArray, lastmontharray, lastYeararray } = response.data
      console.log(todaysArray, yesterdayArray, lastweekArray, lastmontharray, lastYeararray, "today")
      if (response.data.success) {
        setYesterday(yesterdayArray)
        setToday(todaysArray);
        setLastWeek(lastweekArray);
        setLastMonth(lastmontharray);
        setLastYear(lastYeararray);
    
      } else {
        toastError(response.data.message)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleVendorDashboard();
  }, []);

  const handleCardOnClick = async (URLS)=>{
    try {
      setURLS(URLS)
      setViewModal(true)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDateFilter = async (data) => {
    try {
      const response = await VendorDateFilter(data);

      if (response.data.success) {
        setFilteredData(response.data.data);
        setShowFiltered(true);
        setShowToday(false);
        setShowTotal(false);
        setShowLastWeek(false);
        setShowLastMonth(false);
        setShowLastYear(false);
        console.log("filtered");

      } else {

   

      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = (dateRange) => {
    // Update the state based on the clicked button
    switch (dateRange) {
      case "today":
        setShowToday(true);
        setShowTotal(false);
        setShowYesterday(false);
        setShowLastWeek(false);
        setShowLastMonth(false);
        setShowLastYear(false);
        setShowFiltered(false);
        break;
      case "yesterday":
        setShowToday(false);
        setShowYesterday(true);
        setShowTotal(false);
        setShowLastWeek(false);
        setShowLastMonth(false);
        setShowLastYear(false);
        setShowFiltered(false);
        break;
      case "total":
        setShowToday(false);
        setShowTotal(true);
        setShowYesterday(false);
        setShowLastWeek(false);
        setShowLastMonth(false);
        setShowLastYear(false);
        setShowFiltered(false);

        break;
      case "lastWeek":
        setShowToday(false);
        setShowTotal(false);
        setShowLastWeek(true);
        setShowLastMonth(false);
        setShowYesterday(false);
        setShowLastYear(false);
        break;
      case "lastMonth":
        setShowToday(false);
        setShowTotal(false);
        setShowLastWeek(false);
        setShowYesterday(false);
        setShowYesterday(false);
        setShowLastMonth(true);
        setShowLastYear(false);
        setShowFiltered(false);

        break;
      case "lastYear":
        setShowYesterday(false);
        setShowToday(false);
        setShowTotal(false);
        setShowLastWeek(false);
        setShowLastMonth(false);
        setShowLastYear(true);
        setShowFiltered(false);

        break;
      default:
        // Do nothing
        break;
    }
  };

  return (
    <Wrapper className="page">
      <div className="page-content">
        <div className="page-header">
          <div>
            <h3>Vendor Management</h3>
          </div>

          {/* <div className="dates">
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
          </div> */}
        </div>

        <section>
          <div className="card-deck" style={{justifyContent:"space-between"}}>
            <Button
              onClick={() => handleButtonClick("today")}
              className={
                showToday
                  ? "quicklink-btn quicklink-btn-active"
                  : "quicklink-btn"
              }
            >
              Today
            </Button>

            <Button
              onClick={() => handleButtonClick("yesterday")}
              className={
                showYesterday
                  ? "quicklink-btn quicklink-btn-active"
                  : "quicklink-btn"
              }
            >
              Yesterday
            </Button>

            <Button
              onClick={() => handleButtonClick("lastWeek")}
              className={
                showLastWeek
                  ? "quicklink-btn quicklink-btn-active"
                  : "quicklink-btn"
              }
            >
              Last Week
            </Button>

            <Button
              onClick={() => handleButtonClick("lastMonth")}
              className={
                showLastMonth
                  ? "quicklink-btn quicklink-btn-active"
                  : "quicklink-btn"
              }
            >
              Last Month
            </Button>

            <Button
              onClick={() => handleButtonClick("lastYear")}
              className={
                showLastYear
                  ? "quicklink-btn quicklink-btn-active"
                  : "quicklink-btn"
              }
            >
              Last Year
            </Button>

            {/* <Button
              onClick={() => handleButtonClick("total")}
              className={showTotal ? "quicklink-btn" : "quicklink-btn"}
            >
              Reset
            </Button> */}
          </div>
        </section>

        <section className="sales-card-deck">
          <Container>
            <Row>
              {showToday &&
                today.map((item, index) => (
                  <Card as={Col} md={"4"} key={index} className="sales-card" onClick={()=>handleCardOnClick(item.imageUrls)}>
             
                  <Card.Body>
                    <Card.Title className="sales-card-title">
                      {item.vendor}
                    </Card.Title>
                  </Card.Body>
        
                  <div className="card-bg"></div>
                </Card>
                ))}

              {showLastWeek &&
                lastWeek.map((item, index) => (
                  <Card as={Col} md={"4"} key={index} className="sales-card" onClick={()=>handleCardOnClick(item.imageUrls)}>
                    <Card.Body>
                      <Card.Title className="sales-card-title">
                        {item.vendor}
                      </Card.Title>
                      {/* <h2>{item.totalQuantity}</h2> */}
                    </Card.Body>
                    <div className="card-bg"></div>
                  </Card>
                ))}

              {showLastMonth &&
                lastMonth.map((item, index) => (
                  <Card as={Col} md={"4"} key={index} className="sales-card" onClick={()=>handleCardOnClick(item.imageUrls)}>
                    <Card.Body>
                      <Card.Title className="sales-card-title">
                        {item.vendor}
                      </Card.Title>
                      {/* <h2>{item.totalQuantity}</h2> */}
                    </Card.Body>
                    <div className="card-bg"></div>
                  </Card>
                ))}

              {showLastYear &&
                lastYear.map((item, index) => (
                  <Card as={Col} md={"4"} key={index} className="sales-card" onClick={()=>handleCardOnClick(item.imageUrls)}>
                    <Card.Body>
                      <Card.Title className="sales-card-title">
                        {item.vendor}
                      </Card.Title>
                      {/* <h2>{item.totalQuantity}</h2> */}
                    </Card.Body>
                    <div className="card-bg"></div>
                  </Card>
                ))}
              
              {showYesterday &&
                yesterday.map((item, index) => (
                  <Card as={Col} md={"4"} key={index} className="sales-card" onClick={()=>handleCardOnClick(item.imageUrls)}>
                    <Card.Body>
                      <Card.Title className="sales-card-title">
                        {item.vendor}
                      </Card.Title>
                      {/* <h2>{item.totalQuantity}</h2> */}
                    </Card.Body>
                    <div className="card-bg"></div>
                  </Card>
                ))}

              {showTotal &&
                total.map((item, index) => (
                  <Card as={Col} md={"4"} key={index} className="sales-card" onClick={()=>handleCardOnClick(item.imageUrls)}>
                    <Card.Body>
                      <Card.Title className="sales-card-title">
                        {item.vendor}
                      </Card.Title>
                      {/* <h2>{item.totalQuantity}</h2> */}
                    </Card.Body>
                    <div className="card-bg"></div>
                  </Card>
                ))}

              {filteredData &&
                filteredData.map((item, index) => (
                  <Card as={Col} md={"4"} key={index} className="sales-card" onClick={()=>handleCardOnClick(item.imageUrls)}>
                    <Card.Body>
                      <Card.Title className="sales-card-title">
                        {item.vendor}
                      </Card.Title>
                      {/* <h2>{item.totalQuantity}</h2> */}
                    </Card.Body>
                    <div className="card-bg"></div>
                  </Card>
                ))}
            </Row>
          </Container>
        </section>
      </div>

                                          <ModalStyle
                                                width="700px"
                                                centered
                                                open={viewModal}
                                                onCancel={() => setViewModal(false)}
                                                cancelButtonProps={{ style: { display: "none" } }}
                                                okButtonProps={{ style: { display: "none" } }}
                                            >

<div className="modal-content">
        <div className="modal-header">
            <h4 className="modal-title">Invoice Gallery</h4>
        </div>
        <div className="modal-body">
            <div className="row">
              {URLS.map((url, index) => (
                
                <div key={index} className="col-md-4 mb-4">
                      <Zoom>
                        <img src={url} alt={`Image ${index + 1}`} className="img-fluid" />
                        </Zoom>
                    </div>
                ))}
            </div>
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setViewModal(false)}>
                Close
            </button>
        </div>
    </div>
                                            </ModalStyle>

    </Wrapper>
  );
};
export default VendorManagement;
