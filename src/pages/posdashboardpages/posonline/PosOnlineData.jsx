//styled-component imports
import Wrapper from "../../../assets/wrappers/poswrappers/PosCustomers";
//react-icon imports
import { IoSearchSharp } from "react-icons/io5";
//react imports
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//bootstrap imports
import Table from "react-bootstrap/Table";
//backend integration imports
import { OnlineData } from "../../../config/routeApi/pos";
//component imports
import TakeAwaySummeryModal from "../../../components/poscomponents/TakeAwaySummeryModal.jsx";

const PosOnlineData = () => {
  const [Online, setOnline] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showSelectedItemId, setShowSelectedItemId] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    const handleOnlineData = async () => {
      try {
        const response = await OnlineData();
        console.log(response,"heeey");
        setOnline(response.data.OnlineData);
      } catch (error) {
        console.log(error);
      }
    };
    handleOnlineData();
  }, []);

  const handleViewDetails = (item) => {
    console.log(item," i am item");
    setSelectedItemId(item);
    setShowSelectedItemId(true)
  };

  const handleCloseModal = () => {
    setShowSelectedItemId(false)
    setSelectedItemId(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredOnline = Online.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );


  const tableHeading = [
    { id: 1, title: "Bill Date" },
    { id: 2, title: "Time" },
    { id: 4, title: "Bill Amount" },
    { id: 5, title: "Mode of Payment" },
    { id: 6, title: "Order Summary" },
  ];

  return (
    <Wrapper className="page">
      <div className="page-content">
        <div className="page-header">
          <h3>Online Orders</h3>

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
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>S.No.</th>
                {tableHeading.map((item) => (
                  <th key={item.id}>{item.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredOnline && filteredOnline.map((item, i) => {
                const dateObject = new Date(item.date);
                const formattedDate = dateObject.toLocaleDateString();
                const formattedTime = dateObject.toLocaleTimeString();
                return (
                  <tr key={item._id}>
                    <td>{i + 1}</td>
                    <td>{formattedDate}</td>
                    <td>{formattedTime}</td>
                    <td>{item.Amount}</td>
                    <td>{item.paymentMethod}</td>
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
                      <TakeAwaySummeryModal
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

export default PosOnlineData;
