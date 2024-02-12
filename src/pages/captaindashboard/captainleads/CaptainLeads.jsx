//styled-component imports
import Wrapper from "../../../assets/wrappers/poswrappers/PosCustomers";
//react-icon imports
import { IoSearchSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
//bootstrap imports
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
//react imports
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
//backend integration imports
import {
  DeleteLeadDataAtCap,
  LeadsDataAtCap,
} from "../../../config/routeApi/cap";
import { toastSuccess } from "../../../helpers/helpers";

const CaptainLeads = () => {
  const [leadDetails, setLeadDetails] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const handleLeadsData = async () => {
      try {
        const response = await LeadsDataAtCap();
        setLeadDetails(response.data.LeadsDetails);
      } catch (error) {
        console.log(error);
      }
    };
    handleLeadsData();
  }, [refresh]);

  const handleDropLeadData = async (LeadId) => {
    try {
      const response = await DeleteLeadDataAtCap(LeadId);
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
    navigate(`/captain-dashboard/captain-leads/captain-update-lead/${leadId}`);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredLeads = leadDetails.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  //TABLE HEADING DATA
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
    <Wrapper className="page">
      <div className="page-content">
        <div className="page-header">
          <h2>Captain Leads</h2>
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

          <Button className="add-btn">
            <Link
              className="page-header-btn"
              to="/captain-dashboard/captain-leads/captain-add-lead"
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
              {filteredLeads &&
                filteredLeads.map((item, i) => {
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
                            <Link className="action-list edit">Edit</Link>
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
  );
};
export default CaptainLeads;
