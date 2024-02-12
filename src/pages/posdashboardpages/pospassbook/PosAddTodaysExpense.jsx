import Wrapper from "../../../assets/wrappers/adminwrappers/Forms";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
//icon imports
import { FaUpload } from "react-icons/fa6";
import { useState } from "react";
import { restaurantPosAxiosInstance } from "../../../config/apiInterceptor";
import Uploading from "../../../components/loaders/Uploading";
import { Image } from "antd";
import { toastError, toastSuccess } from "../../../helpers/helpers";
const PosAddTodaysExpense = () => {
  //backend integration code
  const [image, setImage] = useState(null);
  const [isUploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleSubmitButton = async (data) => {

    setUploading(true)

    const formData = new FormData();
    const { totalAmount, date, description } = data
    formData.append("image", image);
    formData.append("amount", totalAmount);
    formData.append("date", date);
    formData.append("description", description);

    const response = await restaurantPosAxiosInstance.post(
      `addTodaysExpense`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    setUploading(false)
    if (response.data.success) {
      toastSuccess(response.data.message)

    } else {
      toastError(response.data.message)

    }



  };

  const handleImage = (e) => {
    const image = e.target.files[0];
    if (image) {
      const reader = new FileReader();
      
      reader.onload = function (e) {
        setImagePreview(e.target.result);
      };
      
      reader.readAsDataURL(image);
      setImage(image);
    }
    
    setImage(image);
  };

  return (

    <>
      {isUploading ? (<Uploading isUploading={isUploading} />) : null}

      <Wrapper className="page">
        <div className="page-content">
          <div className="page-header">
            <h3>Add Today&apos;s Expenses</h3>
          </div>

          <div className="custom-form">
            <form onSubmit={handleSubmit(handleSubmitButton)}>

              <div className="form-input-row">
                <div className="form-input-full">
                  <label>Date<span className="text-danger">*</span></label>
                  <br />
                  <input
                    {...register("date", { required: true })}
                    type="date"
                    id="date"
                  />
                  {errors.date && errors.date.type === "required" && (
                    <label className="error-msg text-danger">
                      Please enter date

                    </label>
                  )}
                </div>


              </div>
              <div className="form-input-row">
                <div className="form-input">
                  <label>Amount<span className="text-danger">*</span></label>
                  <br />
                  <input
                    {...register("totalAmount", { required: true })}
                    type="number"
                    id="totalAmount"
                    placeholder="Enter Total amount"
                  />
                  {errors.totalAmount &&
                    errors.totalAmount.type === "required" && (
                      <label className="error-msg text-danger">
                        Please enter  amount
                      </label>
                    )}
                </div>


                <div className="form-input">
                  <label>Description<span className="text-danger">*</span></label>
                  <br />
                  <input
                    {...register("description", { required: true })}
                    type="text"
                    id="description"
                    placeholder="Enter Descriptiont"
                  />
                  {errors.description &&
                    errors.description.type === "required" && (
                      <label className="error-msg text-danger">
                        Please enter description
                      </label>
                    )}
                </div>


              </div>



              <div className="form-input-row">
                <div className="form-input-full">
                  <label htmlFor="uploads" >Upload a Copy<span className="text-danger">*</span></label>
                  <br />
                  <label htmlFor="uploads" className="file-upload">
                    <input
                      {...register("uploads", { required: true })}
                      type="file"
                      id="uploads"
                      onChange={handleImage}
                      placeholder="Please Upload a Copy"
                    />
                    <span className="upload-icon" ><FaUpload /></span>
                    <label htmlFor="uploads" className="browse-btn">Browse File</label>
                  </label>
                  {!imagePreview && errors.uploads && errors.uploads.type === "required" && (
                    <label className="error-msg text-danger">
                      Please Upload the Copy
                    </label>
                  )}
                </div>
              </div>

              {imagePreview && (
                  <div className="col-md-5 mt-3">
                    <Image width={200} src={imagePreview} />
                  </div>
                )}

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
export default PosAddTodaysExpense;
