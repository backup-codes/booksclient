import Wrapper from "../../../assets/wrappers/adminwrappers/Forms";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { FaUpload } from "react-icons/fa6";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { AddEmployeeAccess } from "../../../config/routeApi/owner";
import { useState } from "react";
import { toastError, toastSuccess } from "../../../helpers/helpers";
import Uploading from "../../../components/loaders/Uploading";
import { IoEye, IoEyeOff } from "react-icons/io5";

const AddNewAccess = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setUploading] = useState(false);
  const [showPasswordLengthWarning, setShowPasswordLengthWarning] =
    useState(false);

  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const handleImage = (e) => {
    const file = e.target.files[0];

    // if (file && !["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
    //   setError("uploads", {
    //     type: "validFileType",
    //     message: "Please upload a valid image (jpeg, jpg, or png)",
    //   });
    //   return;
    // }

    // Clear validFileType error if present
    clearErrors("uploads");

    setImage(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const navigate = useNavigate();

  const handlePasswordInput = (e) => {
    const password = e.target.value;
    setShowPasswordLengthWarning(password.length > 0 && password.length < 5);
  };

  const handleAccessSubmit = async (data) => {
    if (image) {
      
      setUploading(true);
      
      const response = await AddEmployeeAccess({ ...data }, image);
      setUploading(false);
      if (response.data.success) {
        navigate("/dashboard/settings");
        toastSuccess(response.data.message);
      } else {
        toastError(response.data.message);
      }
    } else {
      toastError("Image Unavailable")
    }

   
  };

  return (
    <>
      {isUploading ? <Uploading isUploading={isUploading} /> : null}

      <Wrapper className="page">
        <div className="page-content">
          <div>
            <h3>Add Employee Access Details</h3>
          </div>

          <div className="custom-form">
            <form noValidate onSubmit={handleSubmit(handleAccessSubmit)}>
              <div className="form-input-row">
                <div className="form-input-full">
                  <fieldset>
                    <label>
                      Employee username <span className="text-danger">*</span>
                    </label>
                    <br />

                    <input
                      {...register("username", { required: true })}
                      type="text"
                      id="username"
                      placeholder="Enter Employee name"
                    />
                  </fieldset>
                  {errors.username && errors.username.type === "required" && (
                    <label className="text-sm error-msg  ">
                      Please enter the Employee name
                    </label>
                  )}
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input-full password-input">
                  <fieldset>
                    <label>
                      Password <span className=" text-danger ">*</span>
                    </label>
                    <br />
                    <input
                      {...register("password", {
                        required: true,
                        minLength: 5,
                      })}
                      type={show ? "text" : "password"}
                      id="password"
                      placeholder="Enter Employee Password"
                      onInput={handlePasswordInput}
                      required
                    />
                    <button
                      type="button"
                      className="eye-btn"
                      onClick={handleShow}
                    >
                      {show ? <IoEyeOff /> : <IoEye />}
                    </button>
                  </fieldset>
                  {errors.password && errors.password.type === "required" && (
                    <p className="text-sm error-msg pt-1 ">
                      Please enter the password
                    </p>
                  )}
                  {showPasswordLengthWarning && (
                    <p className="text-sm error-msg pt-1">
                      Password must be 5 characters long
                    </p>
                  )}
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input-full">
                  <fieldset>
                    <label>
                      Email <span className=" text-danger ">*</span>
                    </label>
                    <br />
                    <input
                      {...register("email", {
                        required: true,
                        pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
                      })}
                      type="email"
                      id="email"
                      placeholder="Enter Employee email"
                      required
                    />
                  </fieldset>
                  {errors.email && errors.email.type === "required" && (
                    <p className="text-sm error-msg pt-1">Please enter the email</p>
                  )}
                  {errors.email && errors.email.type === "pattern" && (
                    <p className="text-sm error-msg pt-1">
                      Please enter a valid email
                    </p>
                  )}
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input-full">
                  <fieldset>
                    <label>
                      Access for <span className=" text-danger ">*</span>
                    </label>
                    <br />
                    <select
                      {...register("accessAs", {
                        required: true,
                      })}
                      id="accessAs"
                      className="form-select"
                    >
                      <option value="">Select access</option>
                      <option value="Order manager">Sales management</option>
                      <option value="Captain manager">
                        Captain management
                      </option>
                      <option value="Employee manager">
                        Vendor management
                      </option>
                      <option value="POS manager">POS management</option>
                    </select>
                  </fieldset>
                  {errors.accessAs && errors.accessAs.type === "required" && (
                    <p className="text-sm error-msg pt-1">
                      Please select the access for what
                    </p>
                  )}
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input-full">
                  <label htmlFor="uploads" className="text-left">
                    Upload a Profile Picture{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <br />

                  <label htmlFor="uploads" className="file-upload">
                    <input
                      {...register("uploads", {
                        required: true,
                      })}
                      type="file"
                      onChange={handleImage}
                      name="uploads"
                      id="uploads"
                      accept="image/jpeg,image/avif"
                    />
                    <span className="upload-icon">
                      <FaUpload />
                    </span>
                    <label htmlFor="uploads" className="browse-btn">
                      Browse File
                    </label>
                  </label>
                  {errors.uploads && errors.uploads.type === "required" && (
                    <label className="error-msg pt-1">Please upload image </label>
                  )}
                  {errors.uploads &&
                    errors.uploads.type === "validFileType" && (
                      <label className="error-msg pt-1">
                        Please upload a valid image (jpeg, jpg, or png)
                      </label>
                    )}
                </div>

                {image && (
                  <div className="col-md-5 mt-3">
                    <Zoom>
                      <img
                        src={imagePreview}
                        alt="profie Preview"
                        className="img-fluid rounded-4"
                        style={{ width: "300px" }}
                      />
                    </Zoom>
                  </div>
                )}
              </div>

              <div className="buttons">
                <Button className="submit-btn" type="submit">
                  Submit
                </Button>
                <Link to="/dashboard/settings">
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
export default AddNewAccess;
