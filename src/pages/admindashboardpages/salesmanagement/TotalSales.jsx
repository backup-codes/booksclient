import Wrapper from "../../../assets/wrappers/adminwrappers/BasicDetails";
import Table from "react-bootstrap/Table";
import { IoSearchSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { TotalSalesData } from "../../../config/routeApi/owner";
import { toastError } from "../../../helpers/helpers";

const TotalSales = () => {
  const [salesData, setSalesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  
  useEffect(() => {
    const handleSalesData = async () => {
      try {
        const response = await TotalSalesData();
        if (response.data.success) {
          setSalesData(response.data.SalesData);
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
    }, 300); 
    
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const filteredSalesData = salesData.filter((item) => {
    const formattedAmount = String(item.Amount);
    return (
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      ) || formattedAmount.includes(debouncedSearchQuery)
    );
  });

  // const filteredSalesData = salesData.filter((item) => {
  //   const formattedAmount = String(item.Amount);
  //   return (
  //     Object.values(item).some(
  //       (value) =>
  //         typeof value === "string" &&
  //         value.toLowerCase().includes(searchQuery.toLowerCase())
  //     ) || formattedAmount.includes(searchQuery)
  //   );
  // });

  return (
    <Wrapper className="page">
      <div className="page-content">
        <div className="page-header">
          <h3>Total Sales</h3>

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
                <th>Bill Amount</th>
                <th>Mode of Payment</th>
                <th>Mode of Order</th>
              </tr>
            </thead>
            <tbody>
              {filteredSalesData.map((item, i) => {
                const dateObject = new Date(item.date);
                const formattedDate = dateObject.toLocaleDateString();
                const formattedTime = dateObject.toLocaleTimeString();
                return (
                  <tr key={item._id}>
                    <td>{i + 1}</td>
                    <td>{formattedDate}</td>
                    <td>{formattedTime}</td>
                    <td>{item.billId}</td>
                    <td>{item.Amount}</td>
                    <td>{item.paymentMethod}</td>
                    <td>{item.orderMode}</td>
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
export default TotalSales;
