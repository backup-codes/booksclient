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
import TakeAwaySummeryModal from "../../../components/poscomponents/TakeAwaySummeryModal.jsx";
//backend integration imports
import { TakeAwayData } from "../../../config/routeApi/pos";


const PosTakeAwayPage = () => {
  const [takeAway, setTakeAway] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState();
const [viewModal,setViewModal]=useState(false)
  useEffect(() => {
    const handleTakeAwayData = async () => {
      try {
        const response = await TakeAwayData();
        setTakeAway(response.data.takeAwayData);
      } catch (error) {
        console.log(error);
      }
    };
    handleTakeAwayData();
  }, []);

  const handleViewDetails = (item) => {
    setViewModal(true)
setSelectedItem(item)
    // setSelectedItemId(itemId);
  };

  const handleCloseModal = () => {
    // setSelectedItemId(null);
    setViewModal(false)
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTakeAway = takeAway.filter((item) =>
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
          <h3>Take Away Orders</h3>

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
              {filteredTakeAway && filteredTakeAway.map((item, i) => {
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

      {selectedItem && (
                      <TakeAwaySummeryModal
                        // key={selectedItem._id}
                        open={viewModal}
                        onCancel={handleCloseModal}
                        cancelButtonProps={{ style: { display: "none" } }}
                        okButtonProps={{ style: { display: "none" } }}
                        // kotItems={
                        //   takeAway.find((val) => val._id === selectedItemId)
                        //     ?.KotItems || []
          // }
          selectedOrder={selectedItem}
                       
                      />
                    )}
    </Wrapper>
  );
};

export default PosTakeAwayPage;
