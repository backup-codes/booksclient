import Wrapper from "../../../assets/wrappers/adminwrappers/Forms";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
// import axios from "axios";
// import { RestaurantAdminApi } from "../../../config/global";
import { AddEmploymentData } from "../../../config/routeApi/owner";
import Uploading from "../../../components/loaders/Uploading";
import { toastError, toastSuccess } from "../../../helpers/helpers";

const AddEmploymentDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isUploading, setUploading] = useState(false);

  const navigate = useNavigate();

  const handleEmployDetails = async (data) => {
    try {
      setUploading(true);

      const response = await AddEmploymentData(data);
      setUploading(false);

      if (response.data.success) {
        toastSuccess(response.data.message);
        navigate("/dashboard/employee-management/employment-details");
      } else {
        toastError(response.data.message);
        navigate("/dashboard/employee-management/employment-details");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isUploading ? <Uploading isUploading={isUploading} /> : null}
      <Wrapper className="page">
        <div className="page-content">
          <div>
            <h3>Add Employment Details</h3>
          </div>

          <div className="custom-form">
            <form noValidate onSubmit={handleSubmit(handleEmployDetails)}>
              <div className="form-input-row">
                <div className="form-input">
                  <label htmlFor="employ">Employee Name<span className="text-danger">*</span></label>
                  <input
                    {...register("employ", {
                      required: true,
                      pattern: /^[a-zA-Z-' ]+$/,
                    })}
                    type="text"
                    id="employ"
                    placeholder="Enter Employee Name"
                  />
                  {errors.employ && errors.employ.type === "required" && (
                    <label className="error-msg">
                      Please enter the employee name
                    </label>
                  )}
                  {errors.employ && errors.employ.type === "pattern" && (
                    <label className="error-msg">
                      Please enter a valid employee name
                    </label>
                  )}
                </div>

                <div className="form-input">
                  <label htmlFor="joinDate">Date of joining<span className="text-danger">*</span></label>
                  <br />

                  <input
                    {...register("joinDate", {
                      required: true,
                    })}
                    type="date"
                    id="joinDate"
                    placeholder="Enter the joining date"
                  />

                  {errors.joinDate && errors.joinDate.type === "required" && (
                    <label className="error-msg">
                      Please enter the joining date
                    </label>
                  )}
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input">
                  <label htmlFor="designation">Designation<span className="text-danger">*</span></label>
                  <br />

                  <select
                    {...register("designation", {
                      required: true,
                    })}
                    id="designation"
                    placeholder="Select the designation"
                    className="form-select"
                  >
                    <option value="">Select Designation</option>
                    <option value="Manager">Manager</option>
                    <option value="Assistant manager">Assistant Manager</option>
                    <option value="Head chef">Head Chef</option>
                    <option value="Sous chef">Sous Chef</option>
                    <option value="Line cook">Line Cook</option>
                    <option value="Server">Server</option>
                    <option value="Host hostess">Host/Hostess</option>
                    <option value="Busser">Busser</option>
                    <option value="Dishwasher">Dishwasher</option>
                    <option value="Captain">Captain</option>
                    <option value="POS manager">POS manager</option>
                    <option value="Sales manager">Sales manager</option>
                    <option value="Vendor manager">Vendor manager</option>
                    <option value="Order manager">Order manager</option>
                    <option value="Cleaning staff">Cleaning Staff</option>
                    <option value="Maintenance staff">Maintenance Staff</option>
                    <option value="Others">Others</option>
                  </select>

                  {errors.designation &&
                    errors.designation.type === "required" && (
                      <label className="error-msg">
                        Please select the designation
                      </label>
                    )}
                </div>

                <div className="form-input">
                  <label htmlFor="email">Employee email<span className="text-danger">*</span></label>
                  <br />

                  <input
                    {...register("email", {
                      required: true,
                      pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    })}
                    type="text"
                    id="email"
                    placeholder="Enter Employee email"
                  />
                  {errors.email && errors.email.type === "required" && (
                    <label className="error-msg">
                      Please enter the employee email
                    </label>
                  )}
                  {errors.email && errors.email.type === "pattern" && (
                    <label className="error-msg">
                      Please enter a valid employee email
                    </label>
                  )}
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input">
                  <label htmlFor="employeeType">Employment Type<span className="text-danger">*</span></label>
                  <select
                    {...register("employeeType", {
                      required: true,
                    })}
                    id="employeeType"
                    placeholder="Select the employment type"
                    className="form-select"
                  >
                    <option value="">Select employment type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Intern">Intern</option>
                    <option value="Temporary">Temporary</option>
                    <option value="Contract">Contract</option>
                  </select>
                  {errors.employeeType &&
                    errors.employeeType.type === "required" && (
                      <label className="error-msg">
                        Please select the employment type
                      </label>
                    )}
                </div>
              </div>

              <div className="buttons">
                <Button className="submit-btn" type="submit">
                  Submit
                </Button>
                <Link to="/dashboard/employee-management/employment-details">
                  <Button className="cancel-btn" type="button">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </Wrapper>
    </>
  );
};
export default AddEmploymentDetails;
