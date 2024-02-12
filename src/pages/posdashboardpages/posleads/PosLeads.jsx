//styled-component imports
import Wrapper from "../../../assets/wrappers/poswrappers/PosCustomers";
//react-icon imports
import { IoSearchSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
//bootstrap imports
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
//react imports
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//backend integration imports
import { DeleteLeadData, LeadsData } from "../../../config/routeApi/pos";
import Uploading from "../../../components/loaders/Uploading";
import { toastSuccess } from "../../../helpers/helpers";

const PosLeads = () => {
  const [isUploading, setUploading] = useState(false);
  const [leadDetails, setLeadDetails] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const handleLeadsData = async () => {
      try {
        const response = await LeadsData();
        setLeadDetails(response.data.LeadsDetails);
      } catch (error) {
        console.log(error);
      }
    };
    handleLeadsData();
  }, [refresh]);

  const handleDropLeadData = async (LeadId) => {
    try {
      setUploading(true);

      const response = await DeleteLeadData(LeadId);
      setUploading(false);

      if (refresh === true) {
        setRefresh(false);
      } else {
        setRefresh(true);
      }

      toastSuccess(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditLeadData = async (leadId) => {
    navigate(`/pos-dashboard/pos-leads/pos-update-lead/${leadId}`);
  };

  const filteredLeads = leadDetails.filter((item) =>
  Object.values(item).some((value) =>
    value.toString().toLowerCase().includes(searchTerm.toLowerCase())
  )
);

  //TABLE HEADING DUMMY DATA
  const tableHeading = [
    {
      id: 1,
      title: "Customer Name",
    },
    {
      id: 2,
      title: "Email",
    },
    {
      id: 3,
      title: "Phone No.",
    },
    {
      id: 4,
      title: "Date of Birth",
    },
    {
      id: 5,
      title: "Marital Status",
    },
    {
      id: 6,
      title: "Anniversary",
    },
  ];

  return (
    <>
      {isUploading ? <Uploading isUploading={isUploading} /> : null}
      <Wrapper className="page">
        <div className="page-content">
          <div className="page-header">
            <h3>POS Leads</h3>
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
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <Button variant="dark" className="fw-normal">
              <Link
                className="page-header-btn"
                to="/pos-dashboard/pos-leads/pos-add-lead"
              >
                <FaPlus className="plus-icon" />
                Add Lead
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads && filteredLeads.map((item, i) => {
                  return (
                    <tr key={item._id}>
                      <td>{i + 1}</td>
                      <td>{item.customerName}</td>
                      <td>{item.email || "Nill"}</td>
                      <td>{item.phone}</td>
                      <td>{item.dob || "Nill"}</td>
                      <td>{item.maritalStatus || "Nill"}</td>
                      <td>{item.anniversaryDate || "Nill"}</td>
                      <td>
                        <div className="actions">
                          <div
                            className="link-wrapper"
                            onClick={() => {
                              handleEditLeadData(item._id);
                            }}
                          >
                            <Link className="action-list">
                              <a className="edit">Edit</a>
                            </Link>
                          </div>

                          <div
                            className="link-wrapper"
                            onClick={() => {
                              handleDropLeadData(item._id);
                            }}
                          >
                            <a className="delete">Delete</a>
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
      </Wrapper>
    </>
  );
};
export default PosLeads;
