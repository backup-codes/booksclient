import Wrapper from "../../../assets/wrappers/adminwrappers/Forms";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Zoom from "react-medium-image-zoom";
import { Image } from 'antd';
//icon imports
import { FaUpload } from "react-icons/fa6";
import {
  getEmploymentDetailsById,
  updateEmploymentDetails,
} from "../../../config/routeApi/owner";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

//backend imports here
import moment from "moment";
import { toastError, toastSuccess } from "../../../helpers/helpers";

const UpdateBasicDetails = () => {
  const [isUploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");
  const [panpreview, setpanPreview] = useState("");
  const [imgpreview, setImagePreview] = useState("");
  const [aadhaarImagePreview, setAadharImagePreview] = useState([]);
  const [panImagePreview, setPanImagePreview] = useState("");
  const [imgpanpreview, setpanImagePreview] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { employId } = useParams();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEmploymentDetailsById(employId);

        const employmentData = response.data.EmploymentData;
        console.log(employmentData, "response");
        setValue("email", employmentData.email);
        
        if (employmentData.joinDate) {
          
          const formattedJoinDateDate = new Date(employmentData.joinDate).toISOString().split("T")[0];
          setValue("joinDate", formattedJoinDateDate);
        }

        if (employmentData.dob) {
          
          
          const formattedDobDate = new Date(employmentData.dob).toISOString().split("T")[0];
          setValue("dob", formattedDobDate);
        }


        setPanImagePreview(employmentData.pancard_image)

        setAadharImagePreview(employmentData.aadhar_image)
        setValue("employeeType", employmentData.employeeType);
        setValue("designation", employmentData.designation);
        setValue("employ", employmentData.staff);

        setValue("currentAddress", employmentData.current_address);
        setValue("permanentAddress", employmentData.permanent_address);
        setValue("phone", employmentData.phone);
        setValue("gender", employmentData.gender);

        setValue("maritalStatus", employmentData.marital_status);
        setValue("aadharNumber", employmentData.aadhar_number);
        setValue("pancardNumber", employmentData.pan_number);
        setValue("aadharImage", employmentData.aadhar_image);
        setValue("pancardImage", employmentData.pancard_image);

        // setValue("employID", employmentData.employID);
        setValue("pfNumber", employmentData.pf_number);
        setValue("esiNumber", employmentData.esi_number);
        setValue("bloodGroup", employmentData.blood_group);
        setValue("uanNumber", employmentData.uan_number);

        setValue(
          "emergencyContactName",
          employmentData.emergency_contact_person_name
        );
        setValue(
          "emergencyContactNumber",
          employmentData.emergency_contact_person_number
        );
        setValue(
          "emergencyContactAddress",
          employmentData.emergency_contact_person_address
        );
        setValue(
          "emergencyContactPersonRelation",
          employmentData.emergency_contact_person_relation
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [employId, setValue]);

  const handleEmploymentSubmit = async (data, e) => {
    try {
      e.preventDefault(); 
      setUploading(true);
      console.log(data," i am the  updated detailss");
      console.log(e.target.aadharImage.files, " i am the aadhar image bruhh");
      const imageAadhar = e.target.aadharImage.files
      
      const formData = new FormData();
      for (let i = 0; i < imageAadhar.length; i++) {
      
        formData.append("aadharImage", imageAadhar[i]);

      }

      
      // formData.append("aadharImage", e.target.aadharImage.files[0]);
      formData.append("pancardImage", e.target.pancardImage.files[0]);
  
      // Append other form data fields
      for (const key in data) {
        if (key !== "aadharImage" && key !== "pancardImage") {
          formData.append(key, data[key]);
        }
      }
  
      const response = await updateEmploymentDetails(employId, formData);

      console.log(response);
      setUploading(false);
  
      if (response.data.success) {
        toastSuccess(response.data.message);
        navigate(-1);
      } else {
        toastError(response.data.message);
      }

    } catch (error) {
      console.log(error);
    }
  };
  

  const handleaadharImageChange = (e) => {
    const images = e.target.files;
  
    if (images) {
      const previews = [];
  
      Array.from(images).forEach((image) => {
        const reader = new FileReader();
  
        reader.onload = function (e) {
          previews.push(e.target.result);
  
          // Check if all images have been processed
          if (previews.length === images.length) {
            setAadharImagePreview(previews);
          }
        };
  
        reader.readAsDataURL(image);
      });
    }
  };
  
  
  const handlePancardimagechange = (e) => {

    const image = e.target.files[0];
    if (image) {
      const reader = new FileReader();

      reader.onload = function (e) {
        setPanImagePreview(e.target.result);
      };

      reader.readAsDataURL(image);
    }
  };

  return (
    <Wrapper className="page">
      <div className="page-content">
        <div>
          <h3>Update Employee Basic Details</h3>
        </div>

        <div className="custom-form">
          <form
            onSubmit={handleSubmit(handleEmploymentSubmit)}
            // onSubmit={(e) => handleSubmit(handleEmploymentSubmit(e))}
            encType="multipart/form-data"
          >
            <div className="form-input-row">
              <div className="form-input">
                <label htmlFor="employ">
                  Employee Name{" "}
                  <span className="mandatory text-danger  text-danger ">*</span>
                </label>
                <br />

                <input
                  {...register("employ", {
                    required: true,
                    pattern: /^[a-zA-Z-' ]+$/,
                  })}
                  type="text"
                  id="employ"
                  placeholder="Enter employee name"
                />
                {errors.employ && errors.employ.type === "required" && (
                  <label className="error-msg">
                    Here please enter the employee name 
                  </label>
                )}
                {errors.employ && errors.employ.type === "pattern" && (
                  <label className="error-msg">
                     Here please enter valid employee name 
                  </label>
                )}
              </div>

              <div className="form-input">
                <label htmlFor="dob">
                  DOB{" "}
                  <span className="mandatory text-danger  text-danger ">*</span>
                </label>
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
                     Here please enter the dob 
                  </label>
                )}
                {errorMessage && (
                  <p className="error-message error-msg">{errorMessage}</p>
                )}
              </div>
            </div>

            <div className="form-input-row">
              <div className="form-input">
                <label htmlFor="currentAddress">
                  Current Address{" "}
                  <span className="mandatory text-danger  text-danger ">*</span>
                </label>
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
                      Please enter the currentAddress 
                    </label>
                  )}
                {errors.currentAddress &&
                  errors.currentAddress.type === "pattern" && (
                    <label className="error-msg">
                       Please enter a valid current address, maximum 180
                      characters 
                    </label>
                  )}
              </div>

              <div className="form-input">
                <label htmlFor="email">
                  Email{" "}
                  <span className="mandatory text-danger  text-danger ">*</span>
                </label>
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
                     Please enter the email 
                  </label>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <label className="error-msg">
                     Please enter a valid email 
                  </label>
                )}
              </div>
            </div>

            <div className="form-input-row">
              <div className="form-input">
                <label htmlFor="permanentAddress">
                  Permanent Address{" "}
                  <span className="mandatory text-danger  text-danger ">*</span>
                </label>
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
                       Please enter the permanent address 
                    </label>
                  )}
                {errors.permanentAddress &&
                  errors.permanentAddress.type === "pattern" && (
                    <label className="error-msg">
                       Please a valid permanent address, maximum 180
                      characters 
                    </label>
                  )}
              </div>

              <div className="form-input">
                <label htmlFor="phone">
                  Phone No.{" "}
                  <span className="mandatory text-danger  text-danger ">*</span>
                </label>
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
                    Please enter a valid 10-digit phone number 
                  </label>
                )}
                {errors.phone && errors.phone.type === "pattern" && (
                  <label className="error-msg">
                     Please enter a valid phone 
                  </label>
                )}
              </div>
            </div>

            <div className="form-input-row">
              <div className="form-input">
                <label htmlFor="gender">
                  Gender{" "}
                  <span className="mandatory text-danger  text-danger ">*</span>
                </label>
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
                    Please select the gender 
                  </label>
                )}
              </div>

              <div className="form-input">
                <label htmlFor="maritalStatus">
                  Marital status{" "}
                  <span className="mandatory text-danger  text-danger ">*</span>
                </label>
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
                       Please select the marital status 
                    </label>
                  )}
              </div>


            </div>

            <div className="form-input-row">
              <div className="form-input">
                <label htmlFor="aadharNumber">
                  Aadhaar Number{" "}
                  <span className="mandatory text-danger  text-danger ">*</span>
                </label>
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
                      Please enter the Aadhaar Number 
                    </label>
                  )}
                {errors.aadharNumber &&
                  errors.aadharNumber.type === "pattern" && (
                    <label className="error-msg">
                       Please enter a valid Aadhaar Number (12 digits) 
                    </label>
                  )}
              </div>

              <div className="form-input">
                <label htmlFor="pancardNumber">
                  PAN Card Number{" "}
                  <span className="mandatory text-danger  text-danger ">*</span>
                </label>
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
                      Please enter the Pancard Number 
                    </label>
                  )}
                {errors.pancardNumber &&
                  errors.pancardNumber.type === "pattern" && (
                    <label className="error-msg">
                       Please enter a valid Pancard Number 
                    </label>
                  )}
              </div>
            </div>

            <div className="form-input-row">
              <div className="form-input">
                <label htmlFor="aadharImage" className="text-left">
                  Upload Aadhaar Image{" "}
                  <span className="mandatory text-danger  text-danger ">*</span>
                </label>
                <br />

                <label htmlFor="aadharImage" className="file-upload">
                  <input
                    {...register("aadharImage", {
                      // required: true,
                    })}
                    accept="image/jpeg, image/png"
                    type="file"
                    id="aadharImage"
                    onChange={handleaadharImageChange}
                    multiple
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
                       Please upload Aadhaar image 
                    </label>
                  )}
                {errors.aadharImage &&
                  errors.aadharImage.type === "validFileType" && (
                    <label className="error-msg">
                      Please upload a valid Aadhaar image (jpeg, jpg, or
                      png
                    </label>
                  )}
              </div>

            

              <div className="form-input">
                <label htmlFor="pancardImage">
                  Upload PAN Card Image{" "}
                  <span className="mandatory text-danger  text-danger ">*</span>
                </label>
                <br />

                <label htmlFor="pancardImage" className="file-upload">
                  <input
                    {...register("pancardImage", {
                      // required: true,
                    })}
                    accept="image/jpeg, image/png"
                    type="file"
                    id="pancardImage"
                    onChange={handlePancardimagechange}
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
                      Please upload PAN card image 
                    </label>
                  )}
                {errors.pancardImage &&
                  errors.pancardImage.type === "validFileType" && (
                    <label className="error-msg">
                   Please upload a valid PAN card image (jpeg, jpg, or
                      png
                    </label>
                  )}
              </div>
            </div>

            <div className="d-flex justify-content-between">

<div className="col-md-5 mt-3 d-flex flex-wrap gap-3">
              
            {aadhaarImagePreview && aadhaarImagePreview.map((image, index) => (
                <Image key={index} width={200} src={image} />

              
              ))}
</div>
<div className="col-md-5 mt-3 d-flex flex-wrap gap-3">
              
            {panImagePreview  &&
           (     <Image width={200} src={panImagePreview} />)

              
            }
</div>

{/* {imgpreview || preview ? (
    <Zoom>
      <img
        src={imgpreview ? imgpreview : preview}
        alt="Aadhaar Preview"
        className="img-fluid rounded-4"
        style={{ width: "300px" }}
      />
    </Zoom>
) : null} */}

{imgpanpreview || panpreview ? (
  <div className="col-md-5 mt-3">
    <Zoom>
      <img
        src={imgpanpreview ? imgpanpreview : panpreview}
        alt="Aadhaar Preview"
        className="img-fluid rounded-4"
        style={{ width: "300px" }}
      />
    </Zoom>
  </div>
) : null}

            </div>
            





{/* temperory */}



            <div className="form-input-row">
           
              <div className="form-input">
                <label htmlFor="pfNumber">
                  PF Number{" "}
                  <span className="mandatory text-danger  text-danger ">*</span>
                </label>
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
                <label htmlFor="esiNumber">
                  ESI Number{" "}
                  <span className="mandatory text-danger  text-danger ">*</span>
                </label>
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
                <label htmlFor="bloodGroup">
                  Blood Group{" "}
                  <span className="mandatory text-danger  text-danger ">*</span>
                </label>
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
                {errors.bloodGroup && errors.bloodGroup.type === "required" && (
                  <label className="error-msg">
                    ( Here please enter the Blood Group )
                  </label>
                )}
                {errors.bloodGroup && errors.bloodGroup.type === "pattern" && (
                  <label className="error-msg">
                    ( Here please enter a valid blood group (e.g., A+, B-, AB+,
                    O+) )
                  </label>
                )}
              </div>
            </div>

            <div className="form-input-row">
              <div className="form-input">
                <label htmlFor="uanNumber">
                  UAN Number{" "}
                  <span className="mandatory text-danger  text-danger ">*</span>
                </label>
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
                  Emergency contact person&apos;s name{" "}
                  <span className="mandatory text-danger  text-danger ">*</span>
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
                  Emergency Contact Person&apos;s Number{" "}
                  <span className="mandatory text-danger  text-danger ">*</span>
                </label>
                <br />

                <input
                  {...register("emergencyContactNumber", {
                    required: true,
                    pattern: /^\d{10}$/,
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
                  Emergency Contact Person's Address{" "}
                  <span className="mandatory text-danger  text-danger ">*</span>
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
                     Please enter the address 
                    </label>
                  )}
                {errors.emergencyContactAddress &&
                  errors.emergencyContactAddress.type === "pattern" && (
                    <label className="error-msg">
                   Please enter a valid address
                    </label>
                  )}
              </div>
            </div>

            <div className="form-input-row">
              <div className="form-input">
                <label htmlFor="emergencyContactPersonRelation">
                  Emergency Contact Person Relationship{" "}
                  <span className="mandatory text-danger  text-danger ">*</span>
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
                  errors.emergencyContactPersonRelation.type === "required" && (
                    <label className="error-msg">
                      ( Here please enter the relationship )
                    </label>
                  )}
                {errors.emergencyContactPersonRelation &&
                  errors.emergencyContactPersonRelation.type === "pattern" && (
                    <label className="error-msg">
                      ( Here please enter a valid relationship (only letters and
                      spaces) )
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
  );
};
export default UpdateBasicDetails;
