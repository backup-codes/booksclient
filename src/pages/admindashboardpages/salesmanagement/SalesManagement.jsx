//styled-component import
import Wrapper from "../../../assets/wrappers/adminwrappers/SalesManagement";
//component imports
import SalesManagementCard from "../../../components/admindashboardcomponents/SalesManagementCard";
//bootstrap imports
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { SalesDashboard } from "../../../config/routeApi/owner";
import { toastError } from "../../../helpers/helpers";

const SalesManagement = () => {
  const [totalSalesPerDay, setTotalSalesPerDay] = useState({});
  const [highestBillingAmountPerHr, setHighestBillingAmountPerHr] =
    useState("");
  const [averageBillingAmountPerDay, setAverageBillingAmountPerDay] = useState(
    {}
  );
  const [onlineAggregatesPerDay, setOnlineAggregatesPerDay] = useState([]);
  const [takeAwayPerDay, setTakeAwayPerDay] = useState("");
  const [dineInPerDay, setDineInPerDay] = useState("");

  const [showToday, setShowToday] = useState(false);
  const [showYesterday, setShowYesterday] = useState(false);

  const [showTotal, setShowTotal] = useState(true);
  const [showFiltered, setShowFiltered] = useState(false);
  const [showLastWeek, setShowLastWeek] = useState(false);
  const [showLastMonth, setShowLastMonth] = useState(false);
  const [showLastYear, setShowLastYear] = useState(false);

  const [filteredData, setFilteredData] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSalesDashboard = async (dates) => {
    try {
      const response = await SalesDashboard(dates || {});

      if (response.data.success) {
        // data as cards

        console.log(response)
        setTotalSalesPerDay(response.data.TotalSalesPerDay);
        setHighestBillingAmountPerHr(response.data.HighestBillingAmountPerHr);
        setAverageBillingAmountPerDay(response.data.averageBillingAmountPerDay);
        if (response.data.TotalOnlineSales) {
          
          setOnlineAggregatesPerDay(response.data.TotalOnlineSales);
        }
        
        setTakeAwayPerDay(response.data.totalTakeAwayTotalAmount);
        setDineInPerDay(response.data.totalDineInPerDay);
      } else {
        toastError(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonClick = (dateRange) => {
    const todayDate = new Date().toISOString().split("T")[0];
    const defaultDates = { start: todayDate, end: todayDate };

    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterdayDates = yesterdayDate.toISOString().split("T")[0];
    console.log(dateRange, "dates");
    switch (dateRange) {
      case "today":
        setShowToday(true);
        setShowYesterday(false);
        setShowTotal(false);
        setShowLastWeek(false);
        setShowLastMonth(false);
        setShowLastYear(false);
        setShowFiltered(false);
        handleSalesDashboard(defaultDates);
        break;
      case "yesterday":
        setShowToday(false);
        setShowYesterday(true);
        setShowTotal(false);
        setShowLastWeek(false);
        setShowLastMonth(false);
        setShowLastYear(false);
        setShowFiltered(false);
        handleSalesDashboard({ start: yesterdayDates, end: todayDate });
        break;
      default:
        // Handle other cases based on dateRange
        // You can add more cases as needed
        break;
    }
  };


  useEffect(() => {
    handleButtonClick("today");
  }, []);

  const handleDateFilter = async (data) => {
    try {
      //   const response = await VendorDateFilter(data);

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
        toastError(response.data.filter);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const totalSales = [
    {
      title: " Total Sales Amount/Day",
      quantity:
        totalSalesPerDay && totalSalesPerDay.totalAmount
          ? totalSalesPerDay.totalAmount
          : 0,
    },
    {
      title: "Hourly Sales Amount",
      quantity:
        totalSalesPerDay && totalSalesPerDay.totalAmount
          ? totalSalesPerDay.totalAmount
          : 0,
    },
    {
      title: "Highest Billing Amount/hr",
      quantity:
        highestBillingAmountPerHr && highestBillingAmountPerHr
          ? highestBillingAmountPerHr
          : 0,
    },
    // {
    //   title: "Average Billing Amount per Day",
    //   quantity:
    //     averageBillingAmountPerDay &&
    //     averageBillingAmountPerDay.averageAmountPerDay
    //       ? averageBillingAmountPerDay.averageAmountPerDay
    //       : 0,
    // },
    {
      title: "Online Aggregator Sales/Day",
      quantity:
      onlineAggregatesPerDay &&
      onlineAggregatesPerDay
         
    },
    {
      title: "Take Away Sales Amount/Day",
      quantity: `${takeAwayPerDay}`,
    },
    {
      title: "Dining Sales Amount/Day",
      quantity: `${dineInPerDay}`,
    },
  ];





  return (
    <Wrapper className="page">
      <div className="page-content">
        <div className="page-header">
          <div>
            <h3>Sales Management</h3>
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

        {/* <section>
          <div className="card-deck">
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

            <Button
              onClick={() => handleButtonClick("total")}
              className={showTotal ? "quicklink-btn" : "quicklink-btn"}
            >
              Reset
            </Button>
          </div>
        </section> */}

        <section className="sales-card-deck">
          <SalesManagementCard arrayOfObjects={totalSales} />
          {/* <SalesManagementCard arrayOfObjects={totalOnlineSales} /> */}
          {/* <SalesManagementCard arrayOfObjects={totalOfflineSales} /> */}
          {/* <SalesManagementCard arrayOfObjects={totalCategorySales} /> */}
        </section>
      </div>
    </Wrapper>
  );
};
export default SalesManagement;
