//styled-component imports
import Wrapper from "../../../assets/wrappers/poswrappers/PosCustomers";
//react-icon imports
import { IoSearchSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
//bootstrap imports
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
//react imports
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//backend integration imports
import { getEmployeeBill } from "../../../config/routeApi/cap";
import { formatDate } from "../../../helpers/helpers";
//component imports
import ViewModal from "../../../components/poscomponents/ViewModal";

const CaptainCustomers = () => {
  const [customerDetails, setCustomerDetails] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [viewdata, setSeletedviewdata] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleEmployData = async () => {
      try {
        const response = await getEmployeeBill();
        setCustomerDetails(response.data.BillData);
        if (response.data.success) {
          setCustomerDetails(response.data.BillData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    handleEmployData();
  }, []);

  async function handleView(expensedata) {
    setSeletedviewdata(expensedata);
    setModalShow(true);
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCustomers = customerDetails.filter((item) => {
    const date = formatDate(item.date).toString().toLowerCase();
    const customerName = (item.customer?.customer || "").toString().toLowerCase();
    const customerNumber = (item.customer?.phone || "").toString().toLowerCase();
    const billAmount = item.amount ? item.amount.toString().toLowerCase() : "";
    const limit = (item.limit || "").toString().toLowerCase();
    const balance = (item.balance || "").toString().toLowerCase();

    return (
      date.includes(searchTerm.toLowerCase()) ||
      customerName.includes(searchTerm.toLowerCase()) ||
      customerNumber.includes(searchTerm.toLowerCase()) ||
      billAmount.includes(searchTerm.toLowerCase()) ||
      limit.includes(searchTerm.toLowerCase()) ||
      balance.includes(searchTerm.toLowerCase())
    );
  });

  //TABLE HEADING DATA
  const tableHeading = [
    {
      id: 1,
      title: "Date",
    },
    {
      id: 2,
      title: "Customer Name",
    },
    {
      id: 3,
      title: "Customer Number",
    },
    {
      id: 4,
      title: "Bill Amount",
    },
    {
      id: 5,
      title: "Limit",
    },
    {
      id: 6,
      title: "Balance",
    },
    {
      id: 7,
      title: "Bill",
    },
  ];

  return (
    <Wrapper className="page">
      <div className="page-content">
        <div className="page-header">
          <h2>Customer Management</h2>
        </div>

        <div className="search-and-btn">
          <div className="search-div">
            <div className="search-input-group">
              <IoSearchSharp className="search-icon" />
              <input
                type="text"
                placeholder="Search"
                className="search-bar"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          <Button variant="dark" className="fw-normal">
            <Link
              className="page-header-btn"
              to="/captain-dashboard/captain-customers/select-customer"
            >
              <FaPlus className="plus-icon" />
              Select Customer
            </Link>
          </Button>
        </div>

        <div className="table-div">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>S.No.</th>
                {tableHeading.map((item) => {
                  return <th key={item.id}>{item.title}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {filteredCustomers &&
                filteredCustomers.map((item, i) => {
                  return (
                    <tr key={item._id}>
                      <td>{i + 1}</td>
                      <td>{formatDate(item.date)}</td>
                      <td>{item.customer.customer}</td>
                      <td>{item.customer.phone}</td>
                      <td>{item.amount ? item.amount : 0}</td>
                      <td>{item.limit}</td>
                      <td>{item.balance}</td>
                      <td>
                        <div className="actions">
                          <div className="link-wrapper">
                            <Link
                              className="action-list view"
                              onClick={() => handleView(item.BillImage)}
                            >
                              View
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

      {viewdata ? (
        <ViewModal
          viewData={viewdata}
          open={modalShow}
          onCancel={() => setModalShow(false)}
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
        />
      ) : null}
    </Wrapper>
  );
};
export default CaptainCustomers;
