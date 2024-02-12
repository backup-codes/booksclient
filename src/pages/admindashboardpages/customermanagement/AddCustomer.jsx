import Wrapper from "../../../assets/wrappers/adminwrappers/Forms";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
//icon imports
import { Image } from 'antd';
import { FaUpload } from "react-icons/fa6";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useForm } from "react-hook-form";
import "../../../assets/css/AddCustomers.css";
import { useNavigate } from "react-router-dom";
import { restaurantOwnerAxiosInstance } from "../../../config/apiInterceptor";
import Uploading from "../../../components/loaders/Uploading";
import { toastError, toastSuccess } from "../../../helpers/helpers";
const AddCustomer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [aadhaarImagePreview, setAadharImagePreview] = useState(null);
  const [imageAadhar, setImageAdhar] = useState(null);
  const [isUploading, setUploading] = useState(false);
  const [limitWarning, setLimitWarning] = useState(false);

  const handleEmployDetails = async (data) => {
    try {
      // setUploading(true);

      const {
        aadharNumber,
        address,
        city,
        customer,
        email,
        limit,
        phone,
        state,
        zipcode,
      } = data;
      const formData = new FormData();


      for (let i = 0; i < imageAadhar.length; i++) {
      
        formData.append("aadharImage", imageAadhar[i]);
      }


  
      formData.append("aadharNumber", aadharNumber);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("customer", customer);
      formData.append("email", email);
      formData.append("limit", limit);
      formData.append("phone", phone);
      formData.append("state", state);
      formData.append("zipcode", zipcode);

      const response = await restaurantOwnerAxiosInstance.post(
        `addCustomer`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Make sure to set the content type to multipart/form-data
          },
        }
      );

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

  const handleLimitInput = (value) => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue > 5000) {
      setLimitWarning(true);
    } else {
      setLimitWarning(false);
    }
  };

  const handleAdharImage = (e) => {

    const files = e.target.files;
    console.log(files, " i am filesss");
    
    if (files.length !== 2) {
      
      toastError("Please select Aadhaar front and back image")

      e.target.value = null;

      return;

    }

    if (files) {
      const previews = [];
  
      Array.from(files).forEach((image) => {
        const reader = new FileReader();
  
        reader.onload = function (e) {
          previews.push(e.target.result);
  
          // Check if all images have been processed
          if (previews.length === files.length) {
            setAadharImagePreview(previews);
          }
        };
  
        reader.readAsDataURL(image);
      });
}
 
    setImageAdhar(files);
  };

  return (
    <>
      {isUploading ? <Uploading isUploading={isUploading} /> : null}

      <Wrapper className="page">
        <div className="page-content">
          <div>
            <h3>Add Customer Details</h3>
            {/* <p>Add/Update Customer Details</p> */}
          </div>

          <div className="custom-form">
            <form noValidate onSubmit={handleSubmit(handleEmployDetails)}>
              <div className="form-input-row">
                <div className="form-input">
                  <label htmlFor="customer">
                    Customer Name <span className="text-danger">*</span>
                  </label>
                  <br />

                  <input
                    {...register("customer", {
                      required: true,
                      pattern: /^[a-zA-Z-' ]+$/,
                    })}
                    type="text"
                    id="customer"
                    placeholder="Enter the customer name"
                  />
                  {errors.customer && errors.customer.type === "required" && (
                    <label className="error-msg">
                      Please enter the customer name
                    </label>
                  )}
                  {errors.customer && errors.customer.type === "pattern" && (
                    <label className="error-msg">
                      Please enter a valid customer
                    </label>
                  )}
                </div>

                <div className="form-input">
                  <label htmlFor="phone">
                    Contact Number <span className="text-danger">*</span>
                  </label>
                  <br />

                  <input
                    {...register("phone", {
                      required: true,
                      pattern: /^\d{10}$/,
                    })}
                    type="phone"
                    id="phone"
                    placeholder="Enter contact number"
                  />
                  {errors.phone && errors.phone.type === "required" && (
                    <label className="error-msg">
                      Please enter the phone number
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
                  <label htmlFor="customer">
                    Customer Email <span className="text-danger">*</span>
                  </label>
                  <br />

                  <input
                    {...register("email", {
                      required: true,
                      pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
                    })}
                    type="email"
                    placeholder="Enter the email"
                  />

                  {errors.email && errors.email.type === "required" && (
                    <label className="error-msg">Please enter the email</label>
                  )}
                  {errors.email && errors.email.type === "pattern" && (
                    <label className="error-msg">
                      Please enter a valid email
                    </label>
                  )}
                </div>

                <div className="form-input">
                  <label htmlFor="aadharNumber">
                    Aadhaar Number <span className="text-danger">*</span>
                  </label>
                  <br />

                  <input
                    {...register("aadharNumber", {
                      required: true,
                      pattern: /^\d{12}$/,
                    })}
                    type="Number"
                    id="aadharNumber"
                    placeholder="Enter the Aadhaar number"
                  />

                  {errors.aadharNumber &&
                    errors.aadharNumber.type === "required" && (
                      <label className="error-msg">
                        Please enter the aadhaar number
                      </label>
                    )}
                  {errors.aadharNumber &&
                    errors.aadharNumber.type === "pattern" && (
                      <label className="error-msg">
                        Please enter a valid aadhaar number
                      </label>
                    )}
                </div>
              </div>

              <div className="form-input-row">
                <div className=" form-input-full">
                  <label htmlFor="address">
                    Address <span className="text-danger">*</span>
                  </label>
                  <br />

                  <input
                    {...register("address", {
                      required: true,
                      pattern: /^[a-zA-Z-', ]+$/,
                    })}
                    type="text"
                    id="address"
                    placeholder="Enter street address"
                  />
                  {errors.address && errors.address.type === "required" && (
                    <label className="error-msg">
                      Please enter the address
                    </label>
                  )}
                  {errors.address && errors.address.type === "pattern" && (
                    <label className="error-msg">
                      Please enter a valid address
                    </label>
                  )}
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input">
                  <input
                    {...register("city", {
                      required: true,
                      pattern: /^[a-zA-Z-' ]+$/,
                    })}
                    type="text"
                    placeholder="Enter city"
                  />
                  {errors.city && errors.city.type === "required" && (
                    <label className="error-msg">Please enter the city</label>
                  )}
                  {errors.city && errors.city.type === "pattern" && (
                    <label className="error-msg">
                      Please enter a valid city
                    </label>
                  )}
                </div>

                <div className="form-input">
                  <input
                    {...register("state", {
                      required: true,
                      pattern: /^[a-zA-Z-' ]+$/,
                    })}
                    type="text"
                    placeholder="Enter state"
                  />
                  {errors.state && errors.state.type === "required" && (
                    <label className="error-msg">Please enter the state</label>
                  )}
                  {errors.state && errors.state.type === "pattern" && (
                    <label className="error-msg">
                      Please enter a valid state
                    </label>
                  )}
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input-full">
                  <input
                   {
                    ...register("zipcode", {
                      required: true,
                      pattern: /^\d{6}$/,
                    })
                  } 
                    type="text"
                    placeholder="Enter zip code"
                  />

                  {errors.zipcode && errors.zipcode.type === "required" && (
                    <label className="error-msg">
                      Please enter the zip code
                    </label>
                  )}
                  {errors.zipcode &&
                    errors.zipcode.type === "pattern" &&
                    !errors.zipcode.required && (
                      <label className="error-msg">
                        Please enter a valid zip code
                      </label>
                    )}
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input-full">
                  <label htmlFor="aadharImage">
                    Upload Aadhaar Image <span className="text-danger">*</span>
                  </label>
                  <br />

                  <label htmlFor="aadharImage" className="file-upload">
                    <input
                      {...register("aadharImage", {
                        required: true,
                      })}
                      type="file"
                      accept="image/jpeg, image/avif"
                      onChange={handleAdharImage}
                      name="aadharImage"
                      id="aadharImage"
                      multiple
                    />
                    <span className="upload-icon">
                      <FaUpload />
                    </span>
                    <label htmlFor="aadharImage" className="browse-btn">
                      Browse File
                    </label>
                  </label>
                  {!aadhaarImagePreview && errors.aadharImage &&
                    errors.aadharImage.type === "required" && (
                      <label className="error-msg">
                        ( Here please upload Aadhaar image )
                      </label>
                    )}
                  {!aadhaarImagePreview && errors.aadharImage &&
                    errors.aadharImage.type === "validFileType" && (
                      <label className="error-msg">
                        ( Here please upload a valid Aadhaar image (jpeg, jpg,
                        or png) )
                      </label>
                    )}
                </div>

                <div className="col-md-5 mt-3 d-flex flex-wrap gap-3">
              
              {aadhaarImagePreview && aadhaarImagePreview.map((image, index) => (
                  <Image key={index} width={200} src={image} />
  
                
                ))}
  </div>
              </div>

              <div className="form-input-row">
                <div className="form-input-full">
                  <label>
                    Limit <span className="text-danger">*</span>
                  </label>
                  <br />
                  <input
                    {...register("limit", {
                      required: true,
                      pattern: /^\d+$/,
                    })}
                    type="text"
                    placeholder="Enter amount"
                    onInput={(e) => handleLimitInput(e.target.value)}
                  />

                  {errors.limit && errors.limit.type === "required" && (
                    <label className="error-msg">Please enter limit</label>
                  )}
                  {limitWarning && (
                    <label className="error-msg">
                      The limit should not exceed 5000.
                    </label>
                  )}
                </div>
              </div>

              <div className="buttons">
                <Button className="submit-btn" type="submit">
                  Submit
                </Button>
                <Link to="/dashboard/customer-management">
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
export default AddCustomer;
