import React, { useState, useEffect } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Uploading from '../../../components/loaders/Uploading';
import Wrapper from '../../../assets/wrappers/adminwrappers/BasicDetails';
import { AccessedEmployees, DeleteEmployeeAccess } from '../../../config/routeApi/owner';
import { toastError, toastSuccess } from '../../../helpers/helpers';

const RestautantDetails = styled.div`
  color: #6a6a6a;
  div {
    margin: 20px 0px;
  }
  p {
    margin-bottom: 0.5rem;
  }
`;

const Settings = () => {
  const [accessedEmployees, setAccessedEmployees] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [adminData, setAdminData] = useState({});
  const [isUploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for showing modal
  const navigate = useNavigate();

  const handleDeleteEmploy = async (employeeId) => {
    try {
      setUploading(true);
      const response = await DeleteEmployeeAccess(employeeId);
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
    const employAccessDetails = async () => {
      try {
        const response = await AccessedEmployees();

        if (response.data.success) {
          console.log(response.data.accessedEmployees, 'response.data.accessedEmployees');
          setAccessedEmployees(response.data.accessedEmployees);
          setAdminData(response.data.adminData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    employAccessDetails();
  }, [refresh]);

  const handleAddAccessClick = () => {
    if (accessedEmployees && accessedEmployees.length === 5) {
      setShowModal(true); // Show modal when trying to add more than 2 employees
    } else {
      navigate('/dashboard/settings/add-new-access');
    }
  };

  return (
    <>
      {isUploading ? <Uploading isUploading={isUploading} /> : null}
      <Wrapper className="page">
        <div className="page-content">
          <RestautantDetails className="restaurant-details">
            <div>
              <p>
                <b>Name of Restaurant :</b> {adminData.username}
              </p>
              <p>
                <b>Restaurant email : </b>
                {adminData.email}
              </p>
            </div>
          </RestautantDetails>
          <div className="page-header">
            <h3>Employee Access Details</h3>
            <Button variant="dark" className="fw-normal" onClick={handleAddAccessClick}>
              <FaPlus className="plus-icon" />
              Add New Access
            </Button>
          </div>
          <div className="table-div">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Employee ID</th>
                  <th>Employee Name</th>
                  <th>Password</th>
                  <th>Management</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {accessedEmployees &&
                  accessedEmployees.map((item, i) => {
                    return (
                      <tr key={item._id}>
                        <td>{i + 1}</td>
                        <td>{item.employeeId}</td>
                        <td>{item.username}</td>
                        <td>{item.password}</td>
                        <td>{item.accessFor}</td>
                        <td>
                          <div className="actions">
                            <div className="link-wrapper">
                              <Link className="action-list" to="/dashboard/settings/update-employee-access" state={{ Id: item._id }}>
                                <a className="edit">Edit</a>
                              </Link>
                            </div>
                            <div
                              className="link-wrapper"
                              onClick={() => {
                                handleDeleteEmploy(item._id);
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
          <Modal show={showModal} onHide={() => setShowModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Upgrade Required</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div style={{ backgroundColor: 'silver', padding: '20px', borderRadius: '10px', width: '200px' }}>
        <h5 style={{ color: 'black', textAlign: 'center' }}>Silver Pass</h5>
        <p style={{ color: 'black', textAlign: 'center' }}>Get 2  Employees</p>
        <p style={{ fontWeight: 'bold', textAlign: 'center' }}>Contact Us</p>
      </div>
      <div style={{ backgroundColor: 'goldenrod', padding: '20px', borderRadius: '10px', width: '200px' }}>
        <h5 style={{ color: 'black', textAlign: 'center' }}>Golden Pass</h5>
        <p style={{ color: 'black', textAlign: 'center' }}>Get 4  Employees</p>
        <p style={{ fontWeight: 'bold', textAlign: 'center' }}>Contact Us</p>
      </div>
    </div>
  </Modal.Body>
  <Modal.Footer>
    
    <Button variant="secondary" onClick={() => setShowModal(false)}>
      Close
    </Button>
    {/* Add button to upgrade */}
    <Button variant="primary">Upgrade</Button>
  </Modal.Footer>
</Modal>


        </div>
      </Wrapper>
    </>
  );
};

export default Settings;
