import Wrapper from "../../../assets/wrappers/adminwrappers/BasicDetails";
import Table from "react-bootstrap/Table";
import { IoSearchSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { DineInDataForAdmin } from "../../../config/routeApi/owner";
import { toastError } from "../../../helpers/helpers";

const Dining = () => {
  const [dineIn, setDineIn] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  useEffect(() => {
    const handleDineInData = async () => {
      try {
        const response = await DineInDataForAdmin();
        if (response.data.success) {
          console.log(response.data);
          setDineIn(response.data.DineInDetails);
        } else {
          toastError(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleDineInData();
  }, []);

  // Filter the dineIn based on the search query
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // Adjust the delay as needed (e.g., 300 milliseconds)

    // Clear the timeout if the component is unmounted or the search query changes
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Filter the dineIn based on the debounced search query
  const filteredDineIn = dineIn.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    )
  );

  return (
    <Wrapper className="page">
      <div className="page-content">
        <div className="page-header">
          <h3>Dining</h3>
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
                <th>Table Number</th>
              </tr>
            </thead>
            <tbody>
              {filteredDineIn.map((item, i) => {
                const dateObject = new Date(item.date);
                const formattedDate = dateObject.toLocaleDateString();
                const formattedTime = dateObject.toLocaleTimeString();
                return (
                  <tr key={item.id}>
                    <td>{i + 1}</td>
                    <td>{formattedDate}</td>
                    <td>{formattedTime}</td>
                    <td>{item.billId}</td>
                    <td>{item.Amount}</td>
                    <td>{item.tableNumber}</td>
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

export default Dining;
