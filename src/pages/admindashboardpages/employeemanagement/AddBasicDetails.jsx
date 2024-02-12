import Wrapper from "../../../assets/wrappers/adminwrappers/Forms";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { AddEmployDetails } from "../../../config/routeApi/owner";

//icon imports
import { FaUpload } from "react-icons/fa6";
import Uploading from "../../../components/loaders/Uploading";
import { toastError, toastSuccess } from "../../../helpers/helpers";

const AddBasicDetails = () => {
  const [isUploading, setUploading] = useState(false);
  const [imageAdhar, setImageAdhar] = useState("");
  const [imagePan, setImagePan] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleValidDate = (selectedDate) => {
    if (!selectedDate) {
      setErrorMessage("");
      return true;
    }
    const age = moment().diff(selectedDate, "years");
    if (age < 18) {
      setErrorMessage("( Maximum age requirement is 18! )");
      return false;
    } else {
      setErrorMessage("");
      return true;
    }
  };

  const handleAdharImage = (e) => {
    const image = e.target.files[0];
    setImageAdhar(image);
  };
  const handlePanImage = (e) => {
    const image = e.target.files[0];
    setImagePan(image);
  };

  const submitData = async (data) => {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("aadharImage", imageAdhar);
      formData.append("pancardImage", imagePan);

      for (const key in data) {
        formData.append(key, data[key]);
      }

      const response = await AddEmployDetails(formData);

      setUploading(false);

      if (response.data.success) {
        toastSuccess(response.data.message);

        navigate("/dashboard");
      } else {
        toastError(response.data.message);
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
            
            <h3>Add Employee Basic Details</h3>
  
          </div>

          <div className="custom-form">
            <form onSubmit={handleSubmit(submitData)}>
              <div className="form-input-row">
                <div className="form-input">
                  <label htmlFor="staff">Staff Name</label>
                  <br />

                  <input
                    {...register("staff", {
                      required: true,
                      pattern: /^[a-zA-Z-' ]+$/,
                    })}
                    id="staff"
                    type="text"
                    placeholder="Enter staff name"
                  />
                  {errors.staff && errors.staff.type === "required" && (
                    <label className="error-msg">
                      ( Here please enter the staff name )
                    </label>
                  )}
                  {errors.staff && errors.staff.type === "pattern" && (
                    <label className="error-msg">
                      ( Here please enter valid staff name )
                    </label>
                  )}
                </div>

                <div className="form-input">
                  <label htmlFor="dob">DOB</label>
                  <br />

                  <input
                    {...register("dob", {
                      required: true,
                      validate: handleValidDate,
                    })}
                    type="date"
                    id="dob"
                    placeholder="Enter DOB"
                  />
                  {errors.dob && errors.dob.type === "required" && (
                    <label className="error-msg">
                      ( Here please enter the dob )
                    </label>
                  )}
                  {errorMessage && (
                    <p className="error-message error-msg">{errorMessage}</p>
                  )}
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input">
                  <label htmlFor="currentAddress">Current Address</label>
                  <br />

                  <input
                    {...register("currentAddress", {
                      required: true,
                      pattern: /^.{2,180}$/,
                    })}
                    type="text"
                    id="currentAddress"
                    placeholder="Enter current address"
                  />
                  {errors.currentAddress &&
                    errors.currentAddress.type === "required" && (
                      <label className="error-msg">
                        ( Here please enter the currentAddress )
                      </label>
                    )}
                  {errors.currentAddress &&
                    errors.currentAddress.type === "pattern" && (
                      <label className="error-msg">
                        ( Please enter a valid current address, maximum 180
                        characters )
                      </label>
                    )}
                </div>

                <div className="form-input">
                  <label htmlFor="email">Email</label>
                  <br />

                  <input
                    {...register("email", {
                      required: true,
                      pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    })}
                    type="email"
                    id="email"
                    placeholder="Enter email"
                  />
                  {errors.email && errors.email.type === "required" && (
                    <label className="error-msg">
                      ( Here please enter the email )
                    </label>
                  )}
                  {errors.email && errors.email.type === "pattern" && (
                    <label className="error-msg">
                      ( Here please enter a valid email )
                    </label>
                  )}
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input">
                  <label htmlFor="permanentAddress">Permanent Address</label>
                  <br />

                  <input
                    {...register("permanentAddress", {
                      required: true,
                      pattern: /^.{2,180}$/,
                    })}
                    type="text"
                    id="permanentAddress"
                    placeholder="Enter permanent address"
                  />
                  {errors.permanentAddress &&
                    errors.permanentAddress.type === "required" && (
                      <label className="error-msg">
                        ( Here please enter the permanent address )
                      </label>
                    )}
                  {errors.permanentAddress &&
                    errors.permanentAddress.type === "pattern" && (
                      <label className="error-msg">
                        ( Please enter a valid permanent address, maximum 180
                        characters )
                      </label>
                    )}
                </div>

                <div className="form-input">
                  <label htmlFor="phone">Phone No.</label>
                  <br />

                  <input
                    {...register("phone", {
                      required: true,
                      pattern: /^[0-9]{10}$/,
                    })}
                    type="tel"
                    id="phone"
                    placeholder="Enter phone number"
                  />
                  {errors.phone && errors.phone.type === "required" && (
                    <label className="error-msg">
                      (Here please enter a valid 10-digit phone number )
                    </label>
                  )}
                  {errors.phone && errors.phone.type === "pattern" && (
                    <label className="error-msg">
                      ( Here please enter a valid phone )
                    </label>
                  )}
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input">
                  <label htmlFor="gender">Gender</label>
                  <br />

                  <select
                    {...register("gender", {
                      required: true,
                    })}
                    id="gender"
                    placeholder="Select the gender"
                    className="form-select"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && errors.gender.type === "required" && (
                    <label className="error-msg">
                      ( Here please select the gender )
                    </label>
                  )}
                </div>

                <div className="form-input">
                  <label htmlFor="maritalStatus">Marital status</label>
                  <br />

                  <select
                    {...register("maritalStatus", {
                      required: true,
                    })}
                    id="maritalStatus"
                    placeholder="Select the marital status"
                    className="form-select"
                  >
                    <option value="">Select Marital Status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                  </select>
                  {errors.maritalStatus &&
                    errors.maritalStatus.type === "required" && (
                      <label className="error-msg">
                        ( Here please select the marital status )
                      </label>
                    )}
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input">
                  <label htmlFor="aadharNumber">Aadhaar Number</label>
                  <br />

                  <input
                    {...register("aadharNumber", {
                      required: true,
                      pattern: /^\d{12}$/,
                    })}
                    type="Number"
                    id="aadharNumber"
                    placeholder="Enter aadhaar number"
                  />
                  {errors.aadharNumber &&
                    errors.aadharNumber.type === "required" && (
                      <label className="error-msg">
                        (Here please enter the Aadhar Number )
                      </label>
                    )}
                  {errors.aadharNumber &&
                    errors.aadharNumber.type === "pattern" && (
                      <label className="error-msg">
                        ( Here please enter a valid Aadhar Number (12 digits) )
                      </label>
                    )}
                </div>

                <div className="form-input">
                  <label htmlFor="pancardNumber">PAN Card Number</label>
                  <br />

                  <input
                    {...register("pancardNumber", {
                      required: true,
                      pattern: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
                    })}
                    type="text"
                    id="pancardNumber"
                    placeholder="Enter PAN card number"
                  />
                  {errors.pancardNumber &&
                    errors.pancardNumber.type === "required" && (
                      <label className="error-msg">
                        (Here please enter the Pancard Number )
                      </label>
                    )}
                  {errors.pancardNumber &&
                    errors.pancardNumber.type === "pattern" && (
                      <label className="error-msg">
                        ( Here please enter a valid Pancard Number )
                      </label>
                    )}
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input">
                  <label htmlFor="aadharImage" className="text-left">
                    Upload Aadhaar Image
                  </label>
                  <br />

                  <label htmlFor="aadharImage" className="file-upload">
                    <input
                      {...register("aadharImage", {
                        required: true,
                      })}
                      type="file"
                      onChange={handleAdharImage}
                      name="aadharImage"
                      id="aadharImage"
                    />
                    <span className="upload-icon">
                      <FaUpload />
                    </span>
                    <label htmlFor="aadharImage" className="browse-btn">
                      Browse File
                    </label>
                  </label>
                  {errors.aadharImage &&
                    errors.aadharImage.type === "required" && (
                      <label className="error-msg">
                        ( Here please upload Aadhaar image )
                      </label>
                    )}
                  {errors.aadharImage &&
                    errors.aadharImage.type === "validFileType" && (
                      <label className="error-msg">
                        ( Here please upload a valid Aadhaar image (jpeg, jpg,
                        or png) )
                      </label>
                    )}
                </div>

                <div className="form-input">
                  <label htmlFor="pancardImage">Upload PAN Card Image</label>
                  <br />

                  <label htmlFor="pancardImage" className="file-upload">
                    <input
                      {...register("pancardImage", {
                        required: true,
                      })}
                      type="file"
                      name="pancardImage"
                      onChange={handlePanImage}
                      id="pancardImage"
                      placeholder="Upload PAN card image"
                    />
                    <span className="upload-icon">
                      <FaUpload />
                    </span>
                    <label htmlFor="pancardImage" className="browse-btn">
                      Browse File
                    </label>
                  </label>

                  {errors.pancardImage &&
                    errors.pancardImage.type === "required" && (
                      <label className="error-msg">
                        ( Here please upload PAN card image )
                      </label>
                    )}
                  {errors.pancardImage &&
                    errors.pancardImage.type === "validFileType" && (
                      <label className="error-msg">
                        ( Here please upload a valid PAN card image (jpeg, jpg,
                        or png) )
                      </label>
                    )}
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input">
                  <label htmlFor="employID">Employee ID</label>
                  <br />

                  <input
                    {...register("employID", {
                      required: true,
                      pattern: /^(?!.*[.,|_])[A-Za-z0-9]{4,}$/,
                    })}
                    type="text"
                    id="employID"
                    placeholder="Enter Employee ID"
                  />
                  {errors.employID && errors.employID.type === "required" && (
                    <label className="error-msg">
                      ( Please enter the employ ID )
                    </label>
                  )}
                  {errors.employID && errors.employID.type === "pattern" && (
                    <label className="error-msg">
                      ( Please enter a valid employ ID )
                    </label>
                  )}
                </div>
                <div className="form-input">
                  <label htmlFor="pfNumber">PF Number</label>
                  <br />

                  <input
                    {...register("pfNumber", {
                      required: true,
                      pattern: /^[A-Za-z0-9]*$/,
                    })}
                    type="text"
                    id="pfNumber"
                    placeholder="Enter PF number"
                  />
                  {errors.pfNumber && errors.pfNumber.type === "required" && (
                    <label className="error-msg">
                      ( Here please enter the PF Number )
                    </label>
                  )}
                  {errors.pfNumber && errors.pfNumber.type === "pattern" && (
                    <label className="error-msg">
                      ( Here please enter a valid PF Number )
                    </label>
                  )}
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input">
                  <label htmlFor="esiNumber">ESI Number</label>
                  <br />

                  <input
                    {...register("esiNumber", {
                      required: true,
                      pattern: /^[A-Za-z0-9]*$/,
                    })}
                    type="text"
                    id="esiNumber"
                    placeholder="Enter ESI number"
                  />
                  {errors.esiNumber && errors.esiNumber.type === "required" && (
                    <label className="error-msg">
                      ( Here please enter the ESI Number )
                    </label>
                  )}
                  {errors.esiNumber && errors.esiNumber.type === "pattern" && (
                    <label className="error-msg">
                      ( Here please enter a valid ESI Number )
                    </label>
                  )}
                </div>

                <div className="form-input">
                  <label htmlFor="bloodGroup">Blood Group</label>
                  <br />

                  <input
                    {...register("bloodGroup", {
                      required: true,
                      pattern: /^(A|B|AB|O)[\+-]$/i,
                    })}
                    type="text"
                    id="bloodGroup"
                    placeholder="Enter blood group"
                  />
                  {errors.bloodGroup &&
                    errors.bloodGroup.type === "required" && (
                      <label className="error-msg">
                        ( Here please enter the Blood Group )
                      </label>
                    )}
                  {errors.bloodGroup &&
                    errors.bloodGroup.type === "pattern" && (
                      <label className="error-msg">
                        ( Here please enter a valid blood group (e.g., A+, B-,
                        AB+, O+) )
                      </label>
                    )}
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input">
                  <label htmlFor="uanNumber">UAN Number</label>
                  <br />

                  <input
                    {...register("uanNumber", {
                      required: true,
                      pattern: /^[A-Za-z0-9]*$/,
                    })}
                    type="text"
                    id="uanNumber"
                    placeholder="Enter UAN number"
                  />
                  {errors.uanNumber && errors.uanNumber.type === "required" && (
                    <label className="error-msg">
                      ( Here please enter the UAN Number )
                    </label>
                  )}
                  {errors.uanNumber && errors.uanNumber.type === "pattern" && (
                    <label className="error-msg">
                      ( Here please enter a valid UAN Number )
                    </label>
                  )}
                </div>
                <div className="form-input">
                  <label htmlFor="emergencyContactName">
                    Emergency contact person&apos;s name
                  </label>
                  <br />

                  <input
                    {...register("emergencyContactName", {
                      required: true,
                      pattern: /^[A-Za-z\s]+$/,
                    })}
                    type="text"
                    id="emergencyContactName"
                    placeholder="Enter emergency contact name"
                  />
                  {errors.emergencyContactName &&
                    errors.emergencyContactName.type === "required" && (
                      <label className="error-msg">
                        ( Here please enter the name )
                      </label>
                    )}
                  {errors.emergencyContactName &&
                    errors.emergencyContactName.type === "pattern" && (
                      <label className="error-msg">
                        ( Here please enter a valid name )
                      </label>
                    )}
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input">
                  <label htmlFor="emergencyContactNumber">
                    Emergency Contact Person&apos;s Number
                  </label>
                  <br />

                  <input
                    {...register("emergencyContactNumber", {
                      required: true,
                      pattern: /^[0-9]+$/,
                    })}
                    type="tel"
                    id="emergencyContactNumber"
                    placeholder="Enter emergency person's phone number"
                  />
                  {errors.emergencyContactNumber &&
                    errors.emergencyContactNumber.type === "required" && (
                      <label className="error-msg">
                        ( Here please enter the phone number )
                      </label>
                    )}
                  {errors.emergencyContactNumber &&
                    errors.emergencyContactNumber.type === "pattern" && (
                      <label className="error-msg">
                        ( Here please enter a valid phone number )
                      </label>
                    )}
                </div>

                <div className="form-input">
                  <label htmlFor="emergencyContactAddress">
                    Emergency Contact Person's Address
                  </label>
                  <br />
                  <input
                    {...register("emergencyContactAddress", {
                      required: true,
                      pattern: /^[\w\s.,-]+$/,
                    })}
                    type="text"
                    id="emergencyContactAddress"
                    placeholder="Enter the emergency person's contact address"
                  />
                  {errors.emergencyContactAddress &&
                    errors.emergencyContactAddress.type === "required" && (
                      <label className="error-msg">
                        ( Here please enter the address )
                      </label>
                    )}
                  {errors.emergencyContactAddress &&
                    errors.emergencyContactAddress.type === "pattern" && (
                      <label className="error-msg">
                        ( Here please enter a valid address )
                      </label>
                    )}
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input">
                  <label htmlFor="emergencyContactPersonRelation">
                    Emergency Contact Person Relationship
                  </label>
                  <br />
                  <input
                    {...register("emergencyContactPersonRelation", {
                      required: true,
                      pattern: /^[A-Za-z\s]+$/,
                    })}
                    type="text"
                    id="emergencyContactPersonRelation"
                    placeholder="Enter the relationship with emergency contact"
                  />
                  {errors.emergencyContactPersonRelation &&
                    errors.emergencyContactPersonRelation.type ===
                      "required" && (
                      <label className="error-msg">
                        ( Here please enter the relationship )
                      </label>
                    )}
                  {errors.emergencyContactPersonRelation &&
                    errors.emergencyContactPersonRelation.type ===
                      "pattern" && (
                      <label className="error-msg">
                        ( Here please enter a valid relationship (only letters
                        and spaces) )
                      </label>
                    )}
                </div>
              </div>

              <div className="buttons">
                <Button className="submit-btn" type="submit">
                  Submit
                </Button>
                <Link to="/dashboard/employee-management/basic-details">
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
export default AddBasicDetails;
