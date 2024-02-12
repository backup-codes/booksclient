//styled-component imports
import Wrapper from "../../../assets/wrappers/adminwrappers/BasicDetails";
//bootstrap imports
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
//icon imports
import { FaPlus } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
//react imports
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
//backend integration imports
import {
  DeleteEmploymentData,
  EmployDetails,
} from "../../../config/routeApi/owner";
// import Uploading from "../../../components/loaders/Uploading";
import { toastSuccess } from "../../../helpers/helpers";
import Uploading from "../../../components/loaders/Uploading";

const EmploymentDetails = () => {
  const [employDetails, setEmployDetails] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [isUploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");


  useEffect(() => {
    const handleEmployData = async () => {
      try {
        const response = await EmployDetails();
        setEmployDetails(response.data.EmployData);
      } catch (error) {
        console.log(error);
      }
    };
    handleEmployData();
  }, [refresh]);

  const handleDeleteEmployment = async (employId) => {
    try {
      // setUploading(true)

      const response = await DeleteEmploymentData(employId);
      // setUploading(false)

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

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(undefined, options);
    return formattedDate;
  };


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // Adjust the delay as needed (e.g., 300 milliseconds)

    // Clear the timeout if the component is unmounted or the search query changes
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Filter the employDetails based on the debounced search query
  const filteredEmployDetails = employDetails.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    )
  );

  // const filteredEmployDetails = employDetails.filter((item) =>
  //   Object.values(item).some(
  //     (value) =>
  //       typeof value === "string" &&
  //       value.toLowerCase().includes(searchQuery.toLowerCase())
  //   )
  // );

  return (
    <>
      { isUploading ?(<Uploading isUploading={isUploading}/>):null}
      <Wrapper className="page">
        <div className="page-content">
          <div className="page-header">
            <h3>Employment Details</h3>
          </div>

          <div className="search-and-btn">
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
            </div>

            <Button>
              <FaPlus className="plus-icon" />
              <Link
                className="page-header-btn"
                to="/dashboard/employee-management/add-employment-details"
              >
                Add Employment Details
              </Link>
            </Button>
          </div>

          <div className="table-div">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Designation</th>
                  <th>Date of Joining</th>
                  <th>Employee ID</th>
                  <th>Employee Name</th>
                  <th>Employee Type</th>
                  <th>Employee email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployDetails &&
                  filteredEmployDetails.map((item, i) => {
                    return (
                      <tr key={item.id}>
                        <td>{i + 1}</td>
                        <td>{item.designation}</td>
                        <td>{formatDate(item.joinDate)}</td>
                        <td>{item.employID}</td>
                        <td>{item.staff}</td>
                        <td>{item.employeeType}</td>
                        <td>{item.email}</td>
                        <td>
                          <div className="actions">
                            <div className="link-wrapper">
                              <Link
                                className="action-list"
                                to={`/dashboard/employee-management/update-employment-details/${item._id}`}
                              >
                                <a className="edit">Edit</a>
                              </Link>
                            </div>

                            <div
                              className="link-wrapper"
                              onClick={() => {
                                handleDeleteEmployment(item._id);
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
export default EmploymentDetails;
