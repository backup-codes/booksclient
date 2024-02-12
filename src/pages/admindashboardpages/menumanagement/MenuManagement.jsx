import Wrapper from "../../../assets/wrappers/adminwrappers/SalesManagement";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import ManagementCard from "../../../components/admindashboardcomponents/ManagementCard";
import { MenuDashboard, MenuDateFilter } from "../../../config/routeApi/owner";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toastError } from "../../../helpers/helpers";


const MenuManagement = () => {
  const [menu, setMenu] = useState([]);

  const [today, setToday] = useState([]);
  const [lastWeek, setLastWeek] = useState([]);
  const [lastMonth, setLastMonth] = useState([]);
  const [lastYear, setLastYear] = useState([]);

  const [showToday, setShowToday] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [showFiltered, setShowFiltered] = useState(false);
  const [showLastWeek, setShowLastWeek] = useState(false);
  const [showLastMonth, setShowLastMonth] = useState(false);
  const [showLastYear, setShowLastYear] = useState(false);
  const [showYesterday, setShowYesterday] = useState(false);
  const [showTotal, setShowTotal] = useState(true);

  const [filteredData, setFilteredData] = useState([]);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();



  const handleMenuDashboard = async () => {
    try {
      const response = await MenuDashboard();
      if (response.data.success) {
        setMenu(response.data.Menu);
        setToday(response.data.Today);
        setLastWeek(response.data.LastWeek);
        setLastMonth(response.data.LastMonth);
        setLastYear(response.data.LastYear);
      } else {  
        toastError(response.data.message)
    
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonClick = (dateRange) => {
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

  useEffect(() => {
    handleMenuDashboard();
  }, []);

  const handleDateFilter = async (data) => {
    try {
      const response = await MenuDateFilter(data);

      if (response.data.success) {
        setFilteredData(response.data.data);
        setShowFiltered(true);
        setShowToday(false);
        setShowMenu(false);
        setShowLastWeek(false);
        setShowLastMonth(false);
        setShowLastYear(false);
        console.log("filtered");
      } else {
       toastError(response.data.message)
      }
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <Wrapper className="page">
      <div className="page-content">
        <div className="page-header">
          <div>
            <h3>Menu Management</h3>
          </div>

          <div className="dates">
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

        <section>
          <Container>
            <Row>
              {showToday &&
                today.map((category, index) => (
                  <div key={category._id} className="py-3">
                    <h3>{category._id}</h3>
                    <Container>
                      <Row>
                        {category.items.map((item, index) => (
                          <Card
                            as={Col}
                            md={"4"}
                            key={index}
                            className="sales-card"
                          >
                            <Card.Body>
                              <Card.Title className="sales-card-title">
                                {item} per day
                              </Card.Title>
                              <h2>34</h2>
                            </Card.Body>
                            <div className="card-bg"></div>
                          </Card>
                        ))}
                      </Row>
                    </Container>
                  </div>
                ))}

              {showLastWeek &&
                lastWeek.map((category, index) => (
                  <div key={category._id} className="py-3">
                    <h3>{category._id}</h3>
                    <Container>
                      <Row>
                        {category.items.map((item, index) => (
                          <Card
                            as={Col}
                            md={"4"}
                            key={index}
                            className="sales-card"
                          >
                            <Card.Body>
                              <Card.Title className="sales-card-title">
                                {item} per day
                              </Card.Title>
                              <h2>34</h2>
                            </Card.Body>
                            <div className="card-bg"></div>
                          </Card>
                        ))}
                      </Row>
                    </Container>
                  </div>
                ))}

              {showLastMonth &&
                lastMonth.map((category, index) => (
                  <div key={category._id} className="py-3">
                    <h3>{category._id}</h3>
                    <Container>
                      <Row>
                        {category.items.map((item, index) => (
                          <Card
                            as={Col}
                            md={"4"}
                            key={index}
                            className="sales-card"
                          >
                            <Card.Body>
                              <Card.Title className="sales-card-title">
                                {item} per day
                              </Card.Title>
                              <h2>34</h2>
                            </Card.Body>
                            <div className="card-bg"></div>
                          </Card>

                        ))}
                      </Row>
                    </Container>
                  </div>
                ))}

              {showLastYear &&
                lastYear.map((category, index) => (
                  <div key={category._id} className="py-3">
                    <h3>{category._id}</h3>
                    <Container>
                      <Row>
                        {category.items.map((item, index) => (
                          <Card
                            as={Col}
                            md={"4"}
                            key={index}
                            className="sales-card"
                          >
                            <Card.Body>
                              <Card.Title className="sales-card-title">
                                {item} per day
                              </Card.Title>
                              <h2>34</h2>
                            </Card.Body>
                            <div className="card-bg"></div>
                          </Card>
                        ))}
                      </Row>
                    </Container>
                  </div>
                ))}

              {showMenu &&
                menu.map((category, index) => (
                  <div key={category._id} className="py-3">
                    <h3>{category._id}</h3>
                    <Container>
                      <Row>
                        {category.items.map((item, index) => (
                          <Card
                            as={Col}
                            md={"4"}
                            key={index}
                            className="sales-card"
                          >
                            <Card.Body>
                              <Card.Title className="sales-card-title">
                                {item} per day
                              </Card.Title>
                              <h2>34</h2>

                            </Card.Body>
                            <div className="card-bg"></div>
                          </Card>
                        ))}
                      </Row>
                    </Container>
                  </div>
                ))}

              {filteredData &&
                filteredData.map((category, index) => (
                  <div key={category._id} className="py-3">
                    <h3>{category._id}</h3>
                    <Container>
                      <Row>
                        {category.items.map((item, index) => (
                          <Card
                            as={Col}
                            md={"4"}
                            key={index}
                            className="sales-card"
                          >
                            <Card.Body>
                              <Card.Title className="sales-card-title">
                                {item} per day
                              </Card.Title>
                              <h2>34</h2>

                            </Card.Body>
                            <div className="card-bg"></div>
                          </Card>
                        ))}
                      </Row>
                    </Container>
                  </div>
                ))}
            </Row>
          </Container>
        </section>
      </div>
    </Wrapper>
  );
};
export default MenuManagement;
