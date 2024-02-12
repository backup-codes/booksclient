import Wrapper from "../../../assets/wrappers/adminwrappers/Forms";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { Select } from "antd";
import { useForm } from "react-hook-form";
import {
  restaurantCapAxiosInstance,
  restaurantPosAxiosInstance,
} from "../../../config/apiInterceptor";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { FaUpload } from "react-icons/fa6";
import { getEmployeesData } from "../../../config/routeApi/cap";
import Uploading from "../../../components/loaders/Uploading";
import { toastError, toastSuccess } from "../../../helpers/helpers";

const CaptainSelectCustomer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [customerDetails, setCustomerDetails] = useState([]);
  const [selectedvalue, setSelectedValue] = useState([]);
  const [image, setImage] = useState([]);
  const [options, setOptions] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setUploading] = useState(false);


  const navigate = useNavigate()

  const handleBillImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        setImagePreview(e.target.result);
      };

      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    const handleEmployData = async () => {
      try {
        const response = await getEmployeesData();
        if (response.data.success) {
          setCustomerDetails(response.data.customerData);

          const newOptions = response.data.customerData.map((data) => ({
            key: data._id, // Assuming _id is unique for each customer
            value: `${data.customer} - ${data.phone}`,
            label: `${data.customer} - ${data.phone}`,
          }));

          setOptions(newOptions);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleEmployData();
  }, []);

  const handleEmployDetails = async (data) => {
    try {
      setUploading(true);

      const { date, amount } = data;
      console.log(date, amount, image, selectedvalue);
      const splitValues = selectedvalue.split("-");

      const name = splitValues[0].trim();

      const phone = splitValues[1].trim();

      const formData = new FormData();
      formData.append("image", image);
      formData.append("date", date);
      formData.append("amount", amount);
      formData.append("name", name);
      formData.append("phone", phone);

      const response = await restaurantCapAxiosInstance.post(
        `addCustomerBillCap`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Make sure to set the content type to multipart/form-data
          },
        }
      );

      setUploading(false);

      if (response.data.success) {
        navigate("/captain-dashboard/captain-customers");

        toastSuccess(response.data.message);
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
          <div className="page-header">
            <h3>Select Customer </h3>
          </div>

          <div className="custom-form">
            <form noValidate onSubmit={handleSubmit(handleEmployDetails)}>
              <div className="form-input-row">
                <div className="form-input">
                  <label htmlFor="customer">Customers<span className="text-danger">*</span></label>
                  <br />

                  <Select
                    showSearch="single"
                    style={{ width: "100%" }}
                    placeholder="Tags Mode"
                    onChange={handleChange}
                    options={options}
                    className="react-select"
                  />
                </div>

                <div className="form-input">
                  <label>Date<span className="text-danger">*</span></label>

                  <br />

                  <input
                    {...register("date", { required: true })}
                    type="date"
                  />
                  {errors.date && errors.date.type === "required" && (
                    <label className="error-msg text-danger">
                      Please enter date
                    </label>
                  )}
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input-full">
                  <label htmlFor="billImage">Upload Bills<span className="text-danger">*</span></label>
                  <br />

                  <label htmlFor="billImage" className="file-upload">
                    <input
                      {...register("billImage", {
                        required: true,
                      })}
                      type="file"
                      onChange={handleBillImage}
                      name="billImage"
                      id="billImage"
                    />
                    <span className="upload-icon">
                      <FaUpload />
                    </span>
                    <label htmlFor="billImage" className="browse-btn">
                      Browse File
                    </label>
                  </label>
                  {errors.image && errors.image.type === "required" && (
                    <label className="error-msg text-danger">
                      Please upload image
                    </label>
                  )}
                  {errors.image && errors.image.type === "validFileType" && (
                    <label className="error-msg text-danger">
                      ( Here please upload a valid image (jpeg, jpg, or png) )
                    </label>
                  )}
                </div>

                {imagePreview && (
                  <div className="col-md-5 mt-3">
                    <Zoom>
                      <img
                        src={imagePreview}
                        alt="Aadhaar Preview"
                        className="img-fluid rounded-4"
                        style={{ width: "300px" }}
                      />
                    </Zoom>
                  </div>
                )}
              </div>

              <div className="form-input-row">
                <div className="form-input-full">
                  <label>Total Amount<span className="text-danger">*</span></label>

                  <br />

                  <input
                    {...register("amount", { required: true })}
                    type="Number"
                    placeholder="Enter total amount"
                  />
                  {errors.amount && errors.amount.type === "required" && (
                    <label className="error-msg text-danger">
                      Please enter the amount
                    </label>
                  )}
                </div>
              </div>

              <div className="buttons">
                <Button className="submit-btn" type="submit">
                  Submit
                </Button>
                <Link to={-1}>
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
export default CaptainSelectCustomer;
