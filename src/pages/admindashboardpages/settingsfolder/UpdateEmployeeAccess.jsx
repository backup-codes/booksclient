// styled-comonent import 
import Wrapper from "../../../assets/wrappers/adminwrappers/Forms";
// react-icon imports 
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { fetchAcessDetail, updateEmployeeAccess } from "../../../config/routeApi/owner";
import { useForm } from "react-hook-form";
import { FaUpload } from "react-icons/fa6";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { toastError, toastSuccess } from "../../../helpers/helpers";
import { useNavigate } from "react-router-dom";
import Uploading from "../../../components/loaders/Uploading";
const UpdateEmployeeAccess = () => {
  const location = useLocation();
  const [image, setImage] = useState(null);
  const [isUploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [newimagePreview, setImageNewPreview] = useState(null);
  //password hide and show usestate
  const [show, setShow] = useState(false);
  const [ID, setID] = useState("")
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },

  } = useForm();
 const navigate = useNavigate()
  
  useEffect(() => {
    (async function getAcessDetail() {

      const { data } = await fetchAcessDetail(location.state.Id)

      if (data.success) {
        const { accessFor, email, password, _id, profileImage, username } = data.AccessData[0]
        setImagePreview(profileImage)
        setID(_id)
        setValue("accessAs", accessFor);
        setValue("username", username);
        setValue("email", email);
        setValue("password", password);



      }

    })()
  }, [])


  const handleImage = (e) => {

    const image = e.target.files[0];
    if (image) {
      const reader = new FileReader();

      reader.onload = function (e) {
        setImageNewPreview(e.target.result);
      };

      reader.readAsDataURL(image);
    }

    setImage(image);


  };


  async function handleEmployeeAccess(employeData) {
    try {
      setUploading(true)
      let { data } =await updateEmployeeAccess({ ...employeData, image, ID })
      setUploading(false)
      if (data.success) {
        navigate(-1)
        toastSuccess(data.message)

      } else {
        toastError(data.message)

      }
    } catch (err) {
      console.log(err)
    }

  }

  const handleShow = () => {
    setShow(!show);
  }

  return (
    <>
      {isUploading ? (<Uploading isUploading={isUploading} />) : null}
      <Wrapper className="page">
        <div className="page-content">
          <div>
            <h3>Update Employee Access Details</h3>
          </div>

          <div className="custom-form">
            <form noValidate onSubmit={handleSubmit(handleEmployeeAccess)}>

              <div className='form-input-row'>
                <div className='form-input-full'>
                  <fieldset>
                    <label>Employee name <span className="text-danger">*</span></label>
                    <br />

                    <input
                      {...register("username", {
                        required: true,
                      })}
                      type="text"
                      id="username"
                      placeholder="Enter Employee name"
                      autoComplete="username"
                    />
                  </fieldset>
                  {errors.username && errors.username.type === "required" && (
                    <label className="text-sm error-msg">
                      Please enter the Employee name
                    </label>
                  )}
                </div>
              </div>

              <div className='form-input-row'>
                <div className='form-input-full password-input'>
                  <fieldset >
                    <label>Password <span className=" text-danger">*</span></label>
                    <br />
                    <input
                      {...register("password", {
                        required: true,
                        minLength: 5,
                      })}
                      type={show ? "text" : "password"}
                      id="password"
                      placeholder="Enter Employee Password"
                      autoComplete="current-password"
                      required
                    />
                    <button type="button" className="eye-btn" onClick={handleShow}>{show ? <IoEyeOff /> : <IoEye />}</button>
                  </fieldset>
                  {errors.password && errors.password.type === "required" && (
                    <p className="text-sm error-msg">Please enter the password</p>
                  )}
                  {errors.password && errors.password.type === "maxLength" && (
                    <p className="text-sm error-msg" >
                      Password must be at least 5 characters long
                    </p>
                  )}
                </div>
              </div>

              <div className='form-input-row'>
                <div className='form-input-full'>
                  <fieldset>
                    <label>Email <span className="mandatory text-danger  text-danger ">*</span></label>
                    <br />
                    <input
                      {...register("email", {
                        required: true,
                        pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
                      })}
                      type="email"
                      id="email"
                      required
                    />
                  </fieldset>
                  {errors.email && errors.email.type === "required" && (
                    <p className="text-sm error-msg">Please enter the email</p>
                  )}
                </div>
              </div>

              <div className='form-input-row'>
                <div className='form-input-full'>
                  <fieldset   >
                    <label>Access for <span className="mandatory text-danger  text-danger ">*</span></label>
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
                      <option value="Captain manager">Captain management</option>
                      <option value="Employee manager">Vendor management</option>
                      <option value="POS manager">POS management</option>
                    </select>
                  </fieldset>
                  {errors.accessAs && errors.accessAs.type === "required" && (
                    <p className="text-sm error-msg">Please select the access for what</p>
                  )}
                </div>
              </div>


              <div className='form-input-row'>
                <div className='form-input-full'>
                  <label htmlFor="uploads" className="text-left">
                    Upload a Profile Picture <span className="mandatory text-danger  text-danger ">*</span>
                  </label>
                  <br />

                  <label htmlFor="uploads" className="file-upload">
                    <input
                      accept="image/jpeg, image/png"
                      type="file"
                      onChange={handleImage}
                      name="uploads"
                      id="uploads"
                    />
                    <span className="upload-icon" ><FaUpload /></span>
                    <label htmlFor="uploads" className="browse-btn">Browse File </label>
                  </label>

                </div>

                {imagePreview || newimagePreview ? (
                  <div className="col-md-5 mt-3">
                    <Zoom>
                      <img
                        src={newimagePreview || imagePreview}
                        alt="Aadhaar Preview"
                        className="img-fluid rounded-4"
                        style={{ width: "300px" }}
                      />
                    </Zoom>
                  </div>
                ) : null}






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
  )
}
export default UpdateEmployeeAccess