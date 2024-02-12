import Wrapper from "../../../assets/wrappers/adminwrappers/Forms";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Image } from 'antd';
import { RestaurantAdminApi } from "../../../config/global";
import { useNavigate } from "react-router-dom";
import { FaUpload } from "react-icons/fa6";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import "../../../assets/css/UpdateCustomers.css";
import { getCustomerDetailByID } from "../../../config/routeApi/owner";
import Uploading from "../../../components/loaders/Uploading";
import { toastError, toastSuccess } from "../../../helpers/helpers";
import { restaurantOwnerAxiosInstance } from "../../../config/apiInterceptor";

const UpdateCustomer = () => {
  const navigate = useNavigate();

  const [isUploading, setUploading] = useState(false);
  const [aadhaarImagePreview, setAadharImagePreview] = useState(null);
  const [imageAadhar, setImageAdhar] = useState(null);

  const handleAdharImage = (e) => {

    const files = e.target.files;
    
  

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

  // const handleAdharImage = (e) => {
  //   const image = e.target.files[0];
  //   const file = e.target.files[0];

  //   if (file) {
  //     const reader = new FileReader();

  //     reader.onload = function (e) {
  //       setImagePreview(e.target.result);
  //     };

  //     reader.readAsDataURL(file);
  //   }
  //   setImageAdhar(image);
  // };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { Id } = useParams();
  useEffect(() => {
    (async function getCustomerDetail() {
      const response = await getCustomerDetailByID(Id);
console.log(response," i am response");
      if (response.data.success) {
        const {
          customer,
          email,
          phone,
          limit,
          zipcode,
          address,
          city,
          aadharNumber,
          state,
          balance,
          aadharImage,
        } = response.data.customerData;

        
        setAadharImagePreview(aadharImage)
        // setImagePreview(aadharImage);
        setValue("aadharImage", aadharImage);
        setValue("customer", customer);
        setValue("phone", phone);
        setValue("email", email);
        setValue("limit", limit);
        setValue("zipcode", zipcode);
        setValue("address", address);
        setValue("city", city);
        setValue("aadharNumber", aadharNumber);
        setValue("state", state);
        setValue("balance", balance);
      } else {
        toastError(response.data.message);
      }
    })();
  }, []);

  async function handleCancel() {
    navigate(-1);
  }

  async function handleCustomerDetails(data) {
    try {
      setUploading(true);
      
      data.id = Id;
      
      const formData = new FormData();
      
      // Append data to FormData
      Object.keys(data).forEach((key) => {
  formData.append(key, data[key]);
});
      if (imageAadhar && imageAadhar.length>0) {
  
        for (let i = 0; i < imageAadhar.length; i++) {
          formData.append("aadharImage", imageAadhar[i]);
        }
      }
      
  
        const response = await restaurantOwnerAxiosInstance.patch(
          `updateCustomer`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data', // Important for sending FormData with files
            },
          }
        );
        console.log(response,"respsoos");
     
  
  setUploading(false);
  // Handle response
  console.log(response.data,"heyy deamon");

      if (response.data.success) {
        toastSuccess(response.data.message);

        navigate("/dashboard/customer-management");
      } else {
        toastError(response.data.message);
      }

    } catch (err) { 
      console.log(err," i am erro");
    }
  }

  return (
    <>
      {isUploading ? <Uploading isUploading={isUploading} /> : null}

      <Wrapper className="page">
        <div className="page-content">
          <div>
            <h3>Update Customer Details</h3>
          </div>

          <div className="custom-form">
            <form noValidate onSubmit={handleSubmit(handleCustomerDetails)}>
              <div className="form-input-row">
                <div className="form-input">
                  <label htmlFor="customer">
                    Customer Name<span className="text-danger">*</span>
                  </label>
                  <br />

                  <input
                    {...register("customer", {
                      required: true,
                      pattern: /^[a-zA-Z-' ]+$/,
                    })}
                    type="text"
                    placeholder="Enter the customer name"
                  />
                  {errors.customer &&
                    errors.customer.type === "required" &&
                    !customer && (
                      <label className="error-msg">
                        Please enter the customer name
                      </label>
                    )}
                  {errors.customer &&
                    errors.customer.type === "pattern" &&
                    !customer && (
                      <label className="error-msg">
                        Please enter a valid customer
                      </label>
                    )}
                </div>

                <div className="form-input">
                  <label htmlFor="phone">
                    Contact Number<span className="text-danger">*</span>
                  </label>
                  <br />

                  <input
                    {...register("phone", {
                      required: true,
                      pattern: /^\d{10}$/,
                    })}
                    type="phone"
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
                  <label htmlFor="email">Customer Email<span className="text-danger">*</span></label>
                  <br />

                  <input
                    {...register("email", {
                      required: true,
                      pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
                    })}
                    type="email"
                    placeholder="Enter the email"
                    id="email"
                  />

                  {errors.email &&
                    errors.email.type === "required" &&
                    !email && (
                      <label className="error-msg">
                        Please enter the email
                      </label>
                    )}
                  {errors.enail &&
                    errors.email.type === "pattern" &&
                    !email && (
                      <label className="error-msg">
                        Please enter a valid email
                      </label>
                    )}
                </div>

                <div className="form-input">
                  <label htmlFor="aadharNumber">
                    Aadhaar Number<span className="text-danger">*</span>
                  </label>
                  <br />

                  <input
                    {...register("aadharNumber", {
                      required: true,
                      pattern: /^\d{12}$/,
                    })}
                    type="Number"
                    placeholder="Enter the Aadhaar number"
                  />
                  {errors.aadharNumber &&
                    errors.aadharNumber.type === "required" &&
                    !aadharNumber && (
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
                    Address<span className="text-danger">*</span>
                  </label>
                  <br />

                  <input
                    {...register("address", {
                      required: true,
                      pattern: /^[a-zA-Z-', ]+$/,
                    })}
                    type="text"
                    placeholder="Enter street address"
                  />

                  {errors.address &&
                    errors.address.type === "required" &&
                    !address && (
                      <label className="error-msg">
                        Please enter the address
                      </label>
                    )}
                  {errors.address &&
                    errors.address.type === "pattern" &&
                    !address && (
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

                  {errors.city && errors.city.type === "required" && !city && (
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

                  {errors.state &&
                    errors.state.type === "required" &&
                    !state && (
                      <label className="error-msg">
                        Please enter the state
                      </label>
                    )}
                  {errors.state &&
                    errors.state.type === "pattern" &&
                    !state && (
                      <label className="error-msg">
                        Please enter a valid state
                      </label>
                    )}
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input-full">
                  <input
                    {...register("zipcode", {
                      required: true,
                      pattern: /^\d{6}$/,
                    })}
                    type="text"
                    placeholder="Enter zip code"
                  />
                  {errors.zipcode &&
                    errors.zipcode.type === "required" &&
                    !zipcode && (
                      <label className="error-msg">
                        Please enter the zip code
                      </label>
                    )}
                  {errors.zipcode &&
                    errors.zipcode.type === "pattern" &&
                    !zipcode && (
                      <label className="error-msg">
                        Please enter a valid zip code
                      </label>
                    )}
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input-full">
                  <label htmlFor="aadharImage">
                    Upload Aadhaar Image<span className="text-danger">*</span>
                  </label>
                  <br />

                  <label htmlFor="aadharImage" className="file-upload">
                    <input

                      type="file"
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
                  {/* {errors.aadharImage &&
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
                    )} */}
                </div>

                {aadhaarImagePreview && aadhaarImagePreview.map((image, index) => (
                  <Image key={index} width={200} src={image} />
  
                
                ))}
              </div>

              <div className="form-input-row">
                <div className="form-input">
                  <label>Limit<span className="text-danger">*</span></label>
                  <br />
                  <input
                    {...register("limit", {
                      required: true,
                      pattern: /^\d+$/,
                    })}
                    type="text"
                    placeholder="Enter amount"
                  />
                  {errors.limit &&
                    errors.limit.type === "required" &&
                    !limit && (
                      <label className="error-msg">Please enter limit</label>
                    )}
                  {errors.limit &&
                    errors.limit.type === "pattern" &&
                    !limit && (
                      <label className="error-msg">
                        Please enter a valid limit
                      </label>
                    )}
                </div>

                <div className="form-input">
                  <label>Balance<span className="text-danger">*</span></label>
                  <br />
                  <input
                    {...register("balance", {
                      required: true,
                      pattern: /^\d{4}$/,
                    })}
                    type="text"
                    placeholder="Enter amount"
                    readOnly
                  />
                </div>
              </div>

              <div className="buttons">
                <Button className="submit-btn" type="submit">
                  Submit
                </Button>

                <Button
                  variant="secondary"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Wrapper>
    </>
  );
};
export default UpdateCustomer;
