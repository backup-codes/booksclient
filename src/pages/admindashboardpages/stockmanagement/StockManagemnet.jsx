import Wrapper from "../../../assets/wrappers/adminwrappers/SalesManagement";
// import ManagementCard from "../../../components/admindashboardcomponents/ManagementCard";
// import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import {
  StockDashboard,
  // VendorDashboard,
  VendorDateFilter,
} from "../../../config/routeApi/owner";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
// import { toastError } from "../../../helpers/helpers";

const StockManagemnet = () => {
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

  const [filteredData, setFilteredData] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleStockDashboard = async () => {
    try {
      const response = await StockDashboard();
      if (response.data.success) {
        setToday(response.data.stocks.filter(item => item.quantity > 0));
        // Filter out items with quantity zero
      } else {
        // Handle error
      }
    } catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {
    handleStockDashboard();
  }, []);
 
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
            <h3>Stock Management</h3>
          </div>

       
        </div>

      

        <section className="sales-card-deck">
          <Container>
            <Row>
            {showToday &&
                today.map((item, index) => (
                  <Card as={Col} md={"4"} key={index} className="sales-card">
                    <Card.Body>
                      <Card.Title className="sales-card-title ">
                        <h3>{item.commodityName}</h3>
                      </Card.Title>
                      <h2>{item.quantity + " " + item.unit}</h2>
                    </Card.Body>
                    <div className="card-bg"></div>
                  </Card>
                ))}

              {showLastWeek &&
                lastWeek.map((item, index) => (
                  <Card as={Col} md={"4"} key={index} className="sales-card">
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
                  <Card as={Col} md={"4"} key={index} className="sales-card">
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
                  <Card as={Col} md={"4"} key={index} className="sales-card">
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
                  <Card as={Col} md={"4"} key={index} className="sales-card">
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
                  <Card as={Col} md={"4"} key={index} className="sales-card">
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
                  <Card as={Col} md={"4"} key={index} className="sales-card">
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
    </Wrapper>
  );
};
export default StockManagemnet;
