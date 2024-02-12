import Wrapper from "../../../assets/wrappers/adminwrappers/BasicDetails";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
// import BasicDetailModal from "../../../components/admindashboardcomponents/BasicDetailModal";
import { RestaurantAdminApi } from "../../../config/global";
import { useEffect, useState } from "react";
// import { Button, Modal } from "antd";
import axios from "axios";
import { EmployDetails } from "../../../config/routeApi/owner";
import EmployeeBasicDetailsModal from "../../../components/admindashboardcomponents/EmployeeBasicDetailsModal";
import Uploading from "../../../components/loaders/Uploading";
import { toastSuccess } from "../../../helpers/helpers";
import { IoSearchSharp } from "react-icons/io5";

const BasicDetails = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [isUploading, setUploading] = useState(false);

  //modal useState
  const [modalShow, setModalShow] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const handleDeleteEmploy = async (employId) => {
    try {
      setUploading(true);

      const response = await axios.post(
        `${RestaurantAdminApi}deleteEmployeeDetails`,
        {
          data: employId,
        }
      );
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


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // Adjust the delay as needed (e.g., 300 milliseconds)

    // Clear the timeout if the component is unmounted or the search query changes
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Filter the employeeData based on the debounced search query
  const filteredEmployeeData = employeeData.filter((employee) => {
    const regex = new RegExp(debouncedSearchQuery, "i");
    return (
      regex.test(employee.staff) ||
      regex.test(employee.phone) ||
      regex.test(employee.current_address) ||
      regex.test(employee.email)
    );
  });

  // const filteredEmployeeData = employeeData.filter((employee) => {
  //   const regex = new RegExp(searchQuery, "i");
  //   return (
  //     regex.test(employee.staff) ||
  //     regex.test(employee.phone) ||
  //     regex.test(employee.current_address) ||
  //     regex.test(employee.email)
  //   );
  // });

  useEffect(() => {
    const handleEmployData = async () => {
      try {
        const response = await EmployDetails();
        setEmployeeData(response.data.EmployData);
        setSearchFilter(response.data.EmployData);
      } catch (error) {
        console.log(error);
      }
    };
    handleEmployData();
  }, [refresh]);

  return (
    <>
      {isUploading ? <Uploading isUploading={isUploading} /> : null}
      <Wrapper className="page">
        <div className="page-content">
          <div className="page-header">
            <h3>Employee Basic Details</h3>
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
          </div>

          <div className="table-div">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Staff Name</th>
                  <th>Phone Number</th>
                  <th>Current Address</th>
                  <th>Email ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="h-4/6 overflow-scroll">
                {filteredEmployeeData.map((employee, i) => (
                  <tr key={i}>
                    <td className="p-4 border-b border-blue-gray-50">
                      <span className="font-normal">{i + 1}</span>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <span className="font-normal">{employee.staff}</span>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <span className="font-normal">
                        {employee.phone || "_"}
                      </span>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <span className="font-normal">
                        {employee.current_address || "_"}
                      </span>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <span className="font-normal">{employee.email}</span>
                    </td>

                    <td>
                      <div className="actions">
                        <div
                          className="link-wrapper"
                          onClick={() => {
                            setModalShow(true);
                            setSelectedEmployee(employee);
                          }}
                        >
                          <Link className="action-list view">
                            View
                          </Link>
                        </div>

                        <div className="link-wrapper">
                          <Link
                            className="action-list edit"
                            to={`/dashboard/employee-management/update-basic-details/${employee._id}`}
                          >
                            Edit
                          </Link>
                        </div>

                        <div
                          className="link-wrapper"
                          onClick={() => {
                            handleDeleteEmploy(employee._id);
                          }}
                        >
                          <a className="delete">Delete</a>
                        </div>
                      </div>

                      <div>
                        <EmployeeBasicDetailsModal
                          open={modalShow}
                          onCancel={() => setModalShow(false)}
                          cancelButtonProps={{ style: { display: "none" } }}
                          okButtonProps={{ style: { display: "none" } }}
                          {...selectedEmployee}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Wrapper>
    </>
  );
};
export default BasicDetails;
