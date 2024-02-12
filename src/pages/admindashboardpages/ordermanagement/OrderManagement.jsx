import Wrapper from "../../../assets/wrappers/adminwrappers/SalesManagement";
import SalesManagementCard from "../../../components/admindashboardcomponents/SalesManagementCard";
// import Form from "react-bootstrap/Form";
// import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { OrderDataAtAdmin } from "../../../config/routeApi/owner";
import { useForm } from "react-hook-form";
import { toastError } from "../../../helpers/helpers";
import OrderManagementCard from "../../../components/admindashboardcomponents/OrderManagementCard";

const OrderManagement = () => {
  const [total, setTotal] = useState([]);
  const [today, setToday] = useState([]);
  const [yesterday, setYesterday] = useState([]);
  const [lastWeek, setLastWeek] = useState([]);
  const [lastMonth, setLastMonth] = useState([]);
  const [lastYear, setLastYear] = useState([]);

  // todays or first render view
  const [totalOrdersPerDay, setTotalOrdersPerDay] = useState([]);
  const [mostQuantityProduct, setMostQuantityProduct] = useState("");
  const [mostQuantity, setMostQuantity] = useState("");
  const [todayOrdersPerDay, setTodayOrdersPerDay] = useState("");
  const [onlineAggregator, setOnlineAggregator] = useState([]);
  const [takeAwayPerHour, setTakeAwayPerHour] = useState("");
  const [dineInPerHour, setDineInPerHour] = useState("");

  // yesterday's data
  const [yesterdayOrders, setYesterdayOrders] = useState("");



  // const [showToday, setShowToday] = useState(false);
  // const [showYesterday, setShowYesterday] = useState(false);
  // const [showTotal, setShowTotal] = useState(true);
  // const [showLastWeek, setShowLastWeek] = useState(false);
  // const [showLastMonth, setShowLastMonth] = useState(false);
  // const [showLastYear, setShowLastYear] = useState(false);

  // const [filteredData, setFilteredData] = useState([]);
  // const [showFiltered, setShowFiltered] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const handleOrderRecord = async () => {
      try {
        const response = await OrderDataAtAdmin();
        if (response.data.success) {
          // first render or today itself
          setTotalOrdersPerDay(response.data.TotalOrdersPerDay);
          setMostQuantity(response.data.mostQuantity);
          setMostQuantityProduct(response.data.mostQuantityProduct);
          setTodayOrdersPerDay(response.data.TodayOrdersPerDay);
          setOnlineAggregator(response.data.OnlineAggregates);
          setTakeAwayPerHour(response.data.TakeAwayPerHour);
          setDineInPerHour(response.data.DineInPerHour);
          // yesterday quick links
          setYesterdayOrders(response.data.YesterdayOrders);


          setTotal(response.data.Total);
          setYesterday(response.data.Yesterday);
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
    handleOrderRecord();
  }, []);

  

  //dummy data
  const totalSales = [
    {
      title: "Total Orders per Day",
      quantity: `${todayOrdersPerDay ? todayOrdersPerDay : 0}`,
    },
    {
      title: "Hourly Orders per day",
      quantity: `${todayOrdersPerDay ? todayOrdersPerDay : 0}`,
    },
    {
      title: `Highest Order Item per day - ${mostQuantityProduct && mostQuantityProduct}`,
      quantity: `${mostQuantity ? mostQuantity : 0}`,
    },
  ];


  const totalOnlineSales = onlineAggregator.map(({ _id, count }) => {
    return {
      title: `Online - ${_id} per hr`,
      quantity: count,
    };
  });

  const totalOfflineSales = [
    {
      title: "Take Away per hr",
      quantity: `${takeAwayPerHour}`,
    },
    {
      title: "Dining per hr",
      quantity: `${dineInPerHour}`,
    },
  ];



  return (
    <Wrapper className="page">
      <div className="page-content">
        <div className="page-header">
          <div>
            <h3>Order Management</h3>
          </div>

        </div>


        <section className="sales-card-deck">
          <OrderManagementCard totalSales={totalSales} totalOnlineSales={totalOnlineSales} totalOfflineSales={totalOfflineSales} />
        
        </section>

      </div>
    </Wrapper>
  );
};
export default OrderManagement;
