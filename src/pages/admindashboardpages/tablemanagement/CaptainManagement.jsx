//styled-component import
import Wrapper from "../../../assets/wrappers/adminwrappers/SalesManagement";

import { CaptainList, OrderDataOfCap } from "../../../config/routeApi/owner";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CountUp from "react-countup";
import { toastError } from "../../../helpers/helpers";
// import { Dropdown } from "react-bootstrap";
// import { RiArrowDropDownLine } from "react-icons/ri";

const CaptainManagement = () => {
  const [todayDineInOrdersPerDay, setTodayDineInOrdersPerDay] = useState(0);
  // const [closingBalancePerDay, setClosingBalancePerDay] = useState(0);
  const [totalDineInSalesPerDay,settotalDineInSalesPerDay] =useState(0)
  const [totalDineInOrders, setTotalDineInOrders] = useState(0);
  const [captain, setCaptain] = useState([]);

  const [selectedCaptainId, setSelectedCaptainId] = useState("all");
  const [selectedCaptainData, setSelectedCaptainData] = useState(null);

  useEffect(() => {
    const handleCapOrder = async () => {
      try {
        const {data} = await OrderDataOfCap(selectedCaptainId);
        
        if (data.success) {
          console.log(data," ia ma daaatata");
          setTodayDineInOrdersPerDay(data.TodayDineInOrdersPerDay)
          setTotalDineInOrders(data.TotalDineInOrders)
          settotalDineInSalesPerDay(data.todaysDineInSalesAmount)
          
        } else {

          toastError(data.message)

        }




      } catch (error) {
        console.log(error);
      }
    };
    handleCapOrder();
  }, [selectedCaptainId]);

  const handleCaptainChange = async (e) => {
    try {
      
      console.log(e.target.value);
      setSelectedCaptainId(e.target.value)

    } catch (err) {
      
    }
  }


 

  useEffect(() => {
    const handleLeadsData = async () => {
      try {
        const response = await CaptainList();
        setCaptain(response.data.captains);
        // setSelectedCaptainData(response.data.TotalDineInOrders);
      } catch (error) {
        console.log(error);
      }
    };
    handleLeadsData();
  }, []);

  const quickLinks = [
    "Today",
    "Yesterday",
    "Last Week",
    "Last Month",
    "Last Year",
    "Reset",
  ];

  const totalSalesData = [
    totalDineInOrders && {
      title: "Total Sales at captain",
      quantity: `${totalDineInOrders ? totalDineInOrders : 0}`,
    },
    {
      title: "Total Sales/Day",
      quantity: `${todayDineInOrdersPerDay ? todayDineInOrdersPerDay : 0}`,
    },
    {
      title: "Total Sales Amount/Day",
      quantity: `${totalDineInSalesPerDay ? totalDineInSalesPerDay : 0}`,
    },
  ];
  

  return (
    <Wrapper className="page">
      <div className="page-content">
        <div className="page-header">
          <h3>Captain Management</h3> 

          <div>
            <select
              className="form-select"
              onChange={handleCaptainChange}
              value={selectedCaptainId}
            >
              <option className="default" value="all">
                All captain
              </option>
              {captain &&
                captain.map((val) => (
                  <option key={val._id} value={val._id}>
                    {val.username}
                  </option>
                ))}
            </select>
          </div>

        </div>

        <section className="sales-card-deck">
          <Container>
            <Row>
              {totalSalesData.map((item, index) => {
                return (
                  <Card as={Col} md={"4"} key={index} className="sales-card">
                    {console.log(item)}
                    <Card.Body>
                      <Card.Title className="sales-card-title">
                        {item.title}
                      </Card.Title>

                      <h1>
                        <CountUp
                          duration={0.6}
                          prefix={
                            item.title === "Total Sales Amount/Day" ? "₹ " : ""
                          }
                          end={item.quantity}
                        />
                      </h1>
                    </Card.Body>
                    <div className="card-bg"></div>
                  </Card>
                );
              })}

              
            </Row>
          </Container>
        </section>
      </div>
    </Wrapper>
  );
};

export default CaptainManagement;
