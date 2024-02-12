//styled-component import
import Wrapper from '../../../assets/wrappers/adminwrappers/SalesManagement'
//component imports
import SalesManagementCard from '../../../components/admindashboardcomponents/SalesManagementCard';
//bootstrap imports
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import { useEffect, useMemo, useState } from 'react';
// import { restaurantPosAxiosInstance } from '../../../config/apiInterceptor';
import { PassBookData } from '../../../config/routeApi/owner';
import { toastError } from '../../../helpers/helpers';
// import { fetchTodaysExpenseData, fetchTodaysOpeningData } from '../../../config/routeApi/pos';
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CountUp from 'react-countup';

const PosManagement = () => {

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
  
  // const [closingBalance, setClosingBalance] = useState("0");
  const [totalSalesData, setTotalSalesData] = useState([
    {
      title: "Opening Balance",
      quantity: 0,
    },
    {
      title: "Floating Cash",
      quantity: 0,
    },
    {
      title: "Closing Balance",
      quantity: 0
    },
  ]);




  useEffect(() => {
    const handlePassbookData = async () => {
      try {
        
        const { data } = await PassBookData();


        if (data.success) {
        console.log(data.LastWeekData,"LastWeekData");
          setToday(data.TodaysData)
          setYesterday(data.YesterdaysData)
          setLastMonth(data.LastMonthData)
          setLastWeek(data.LastWeekData)
          setLastYear(data.LastYearData)
        } else {


  toastError(data.message)

          //   toast.error(data.message)
        }


      } catch (error) {
        console.log(error);
      }
    };
    handlePassbookData();



  }, []);

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
    <Wrapper className='page'>
      <div className="page-content">
        <div className="page-header">
          <div>
            <h3>POS Management</h3>
          </div>

        
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
                  <Card as={Col} md={"4"} key={index} className="sales-card" >
             
                  <Card.Body>
                    <Card.Title className="sales-card-title">
                      {item.title}
                      </Card.Title>
                      <h1><CountUp duration={0.6} prefix="₹ " end={item.amount} /></h1>
                  </Card.Body>
        
                  <div className="card-bg"></div>
                </Card>
                ))}


{showLastWeek &&
                lastWeek.map((item, index) => (
                  <Card as={Col} md={"4"} key={index} className="sales-card" >
                     <Card.Body>
                    <Card.Title className="sales-card-title">
                      {item.title}
                      </Card.Title>
                      <h1><CountUp duration={0.6} prefix="₹ " end={item.amount} /></h1>
                  </Card.Body>
                    <div className="card-bg"></div>
                  </Card>
                ))}

              {showLastMonth &&
                lastMonth.map((item, index) => (
                  <Card as={Col} md={"4"} key={index} className="sales-card" >
                      <Card.Body>
                    <Card.Title className="sales-card-title">
                      {item.title}
                      </Card.Title>
                      <h1><CountUp duration={0.6} prefix="₹ " end={item.amount} /></h1>
                  </Card.Body>
                    <div className="card-bg"></div>
                  </Card>
                ))}

              {showLastYear &&
                lastYear.map((item, index) => (
                  <Card as={Col} md={"4"} key={index} className="sales-card">
   <Card.Body>
                    <Card.Title className="sales-card-title">
                      {item.title}
                      </Card.Title>
                      <h1><CountUp duration={0.6} prefix="₹ " end={item.amount} /></h1>
                  </Card.Body>
                    <div className="card-bg"></div>
                  </Card>
                ))}
              
              {showYesterday &&
                yesterday.map((item, index) => (
                  <Card as={Col} md={"4"} key={index} className="sales-card">
                       <Card.Body>
                    <Card.Title className="sales-card-title">
                      {item.title}
                      </Card.Title>
                      <h1><CountUp duration={0.6} prefix="₹ " end={item.amount} /></h1>
                  </Card.Body>
                    <div className="card-bg"></div>
                  </Card>
                ))}

                </Row>
            </Container>


          {/* <SalesManagementCard arrayOfObjects={totalSalesData} /> */}
        </section>
      </div>
    </Wrapper>
  )
}
export default PosManagement