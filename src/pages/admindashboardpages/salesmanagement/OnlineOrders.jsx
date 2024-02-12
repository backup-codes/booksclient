import Wrapper from "../../../assets/wrappers/adminwrappers/BasicDetails";
import Table from "react-bootstrap/Table";
import { IoSearchSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { OnlineOrderData } from "../../../config/routeApi/owner";
import { toastError } from "../../../helpers/helpers";

const OnlineOrders = () => {
  const [salesOnlineData, setOnlineSalesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  useEffect(() => {
    const handleSalesData = async () => {
      try {
        const response = await OnlineOrderData();
        if (response.data.success) {
          console.log(response.data);
          setOnlineSalesData(response.data.OnlineOrderData);
        } else {
          toastError(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleSalesData();
  }, []);


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // Adjust the delay as needed (e.g., 300 milliseconds)

    // Clear the timeout if the component is unmounted or the search query changes
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const filteredSalesOnlineData = salesOnlineData.filter((item) =>
  Object.values(item).some(
    (value) =>
      typeof value === "string" &&
      value.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  )
);

  // Filter the salesOnlineData based on the search query
  // const filteredSalesOnlineData = salesOnlineData.filter((item) =>
  //   Object.values(item).some(
  //     (value) =>
  //       typeof value === "string" &&
  //       value.toLowerCase().includes(searchQuery.toLowerCase())
  //   )
  // );

  return (
    <Wrapper className="page">
      <div className="page-content">
        <div className="page-header">
          <h3>Online Orders</h3>
          <div className="search-div">
            <div className="search-input-group">
              <IoSearchSharp className="search-icon" />
              <input
                type="text"
                placeholder="Search"
                className="search-bar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* <button className="search-btn">Search</button> */}
          </div>
        </div>

        <div className="table-div">
          <Table striped bordered hover className="table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Bill Date</th>
                <th>Time</th>
                <th>Bill ID</th>
                <th>Order ID</th>
                <th>Bill Amount</th>
                <th>Mode of Order</th>
              </tr>
            </thead>
            <tbody>
              {filteredSalesOnlineData.map((item, i) => {
                const dateObject = new Date(item.date);
                const formattedDate = dateObject.toLocaleDateString();
                const options = { hour: '2-digit', minute: '2-digit', hour12: true };
                const formattedTime = dateObject.toLocaleTimeString(undefined, options);
                
                return (
                  <tr key={item.id}>
                    <td>{i + 1}</td>
                    <td>{formattedDate}</td>
                    <td>{formattedTime}</td>
                    <td>{item.billId}</td>
                    <td>{item.orderId}</td>
                    <td>{item.Amount}</td>
                    <td>{item.paymentMethod}</td>
                    <td>{item.orderStation}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </Wrapper>
  );
};

export default OnlineOrders;
