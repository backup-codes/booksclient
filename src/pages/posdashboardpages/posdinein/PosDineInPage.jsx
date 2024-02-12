//styled-component imports
import Wrapper from "../../../assets/wrappers/poswrappers/PosCustomers";
//react-icon imports
import { IoSearchSharp } from "react-icons/io5";
//react imports
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//bootstrap imports
import Table from "react-bootstrap/Table";
//component imports
import DineInSummeryModal from "../../../components/poscomponents/DineInSummeryModal.jsx";
//backend imports
import { GetDineInData } from "../../../config/routeApi/pos.js";

const PosDineInPage = () => {
  const [DineIn, setDineIn] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showSelectedItemId, setShowSelectedItemId] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleDineIn = async () => {
      try {
        const response = await GetDineInData();

        setDineIn(response.data.DineInData);
      } catch (error) {
        console.log(error);
      }
    };
    handleDineIn();
  }, []);

  const handleViewDetails = (itemId) => {
    setSelectedItemId(itemId);
    setShowSelectedItemId(true)
  };

  const handleCloseModal = () => {
    setShowSelectedItemId(false)
    setSelectedItemId(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDineIn = DineIn.filter((item) =>
    Object.values(item).some((value) => {
      if (typeof value === "number") {
        return value
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      } else if (typeof value === "string") {
        return value.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    })
  );

  //TABLE HEADING DATA
  const tableHeading = [
    {
      id: 1,
      title: "Bill Date",
    },
    {
      id: 2,
      title: "Time",
    },
    {
      id: 3,
      title: "Table No",
    },
    {
      id: 4,
      title: "Bill Amount",
    },
    {
      id: 6,
      title: "Order Summary",
    },
  ];

  return (
    <Wrapper className="page">
      <div className="page-content">
        <div className="page-header">
          <h3>Dine In Orders</h3>

          <div className="search-input-group">
            <IoSearchSharp className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              className="search-bar"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="table-div">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>S.No.</th>
                {tableHeading.map((item) => (
                  <th key={item.id}>{item.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredDineIn &&
                filteredDineIn.map((item, i) => {
                  const dateObject = new Date(item.date);
                  const formattedDate = dateObject.toLocaleDateString();
                  const formattedTime = dateObject.toLocaleTimeString();
                  return (
                    <tr key={item._id}>
                      <td>{i + 1}</td>
                      <td>{formattedDate}</td>
                      <td>{formattedTime}</td>
                      <td>{item.tableNumber}</td>
                      <td>{item.Amount}</td>
                      <td>
                        <div className="actions">
                          <div className="link-wrapper">
                            <Link
                              className="action-list"
                              onClick={() => handleViewDetails(item)}
                            >
                              <a className="view">View</a>
                            </Link>
                          </div>
                        </div>
                      </td>

                 
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </div>

      {selectedItemId && (
                        <DineInSummeryModal
                        open={showSelectedItemId}
                        onCancel={handleCloseModal}
                        cancelButtonProps={{ style: { display: "none" } }}
                        okButtonProps={{ style: { display: "none" } }}
                        selectedOrder={selectedItemId}
                        />
                      )}
    </Wrapper>
  );
};
export default PosDineInPage;
