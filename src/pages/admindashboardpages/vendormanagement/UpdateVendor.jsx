import Wrapper from "../../../assets/wrappers/adminwrappers/Forms";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Select, Typography } from 'antd';
//icon imports
import { FaUpload } from "react-icons/fa6";
import { AutoComplete } from 'antd';
// backend updates
import { useForm } from "react-hook-form";
import { AddVenderDetails, UpdateVenderDetails, getVendorCategories } from "../../../config/routeApi/owner";
import { useEffect, useMemo, useState } from "react";
import Uploading from "../../../components/loaders/Uploading";
import { useLocation } from "react-router-dom";
import { toastError, toastSuccess } from "../../../helpers/helpers";
import { Image } from 'antd';
const UpdateVendor = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState()
  const [image, setImage] = useState(null)
  const [imageAadhar, setImageAdhar] = useState(null);
  const [isUploading, setUploading] = useState(false);
  const [values, SetValues] = useState(false);
  const [id, setId] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [categories, setCategories] = useState(['Vegetables', 'Fruits', 'Beverages'])
  const [ingredient, setIngredient] = useState("helo")
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const location = useLocation()




  const handleImage = (e) => {
    const image = e.target.files[0];
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        // setImagePreview(e.target.result);
        setImageURL(e.target.result)
      };

      reader.readAsDataURL(file);
    }
    setImage(image);
  };



  useEffect(() => {
    (async function getCategories() {

      const response = await getVendorCategories()
      if (response.data.success) {
        setCategories(response.data.category)
      }

    })()
    async function getSetValues() {
      console.log(location.state.Item, "i am");
      SetValues(location.state.Item)


    }

    getSetValues()
  }, [])


  useMemo(() => {

setImageURL(values.billImage)
    setId(values._id)
    setValue("vendorName", values.vendorName);
    setValue("contact", values.phone);
    setValue("AccountNumber", values.accountNumber);
    setValue("BranchCode", values.branchCode);
    setValue("neft", values.neft);
    setValue("GST", values.gst);
    setIngredient(values.ingredient)
  }, [values])

  const handleVenderDetails = async (data) => {
    setUploading(true)

    const response = await UpdateVenderDetails({ ...data, image, id });
    setUploading(false)

    if (response.data.success) {
      navigate("/dashboard/vendor-management/vendor-settings");

      toastSuccess(response.data.message)

    } else {
      toastError(response.data.message)

    }


  };

  return (
    <>
      {isUploading ? (<Uploading isUploading={isUploading} />) : null}
      <Wrapper className="page">
        <div className="page-content">
          <div>
            <h3>Update Vendor Details</h3>
            {/* <p>Add/Update Ingredient Details</p> */}
          </div>

          <div className="custom-form">
            <form onSubmit={handleSubmit(handleVenderDetails)}>
              <div className="form-input-row">

                <div className="form-input">
                  <label htmlFor="vendorName" className="text-left">
                    Vendor Name<span className="text-danger">*</span>
                  </label>
                  <br />
                  <input
                    {...register("vendorName", {
                      required: true, pattern: /^[\p{L}\p{M}'-]+$/u
                    })}
                    type="text"
                    id="vendorName"
                    placeholder="Enter Vendor name"
                  />
                  {errors.vendorName && errors.vendorName.type === "required" && (
                    <label className="error-msg">Please enter the vendor name </label>
                  )}
                  {errors.vendorName && errors.vendorName.type === "pattern" && (
                    <label className="error-msg">Please enter a valid name </label>
                  )}
                </div>


                <div className="form-input">
                  <label htmlFor="contact" className="text-left">
                    Contact Number<span className="text-danger">*</span>
                  </label>
                  <br />
                  <input
                  {...register("contact", {
                    required: true,
                    pattern: /^(\+?\d{1,4}[-.\s]?)?\(?\d{10}\)?[-.\s]?$/,
                  })}
                  
                    type="phone"
                    id="contact"
                    placeholder="Enter contact number"
                  />
                  {errors.contact && errors.contact.type === "required" && (
                    <label className="error-msg">
                      Please enter the contact number
                    </label>
                  )}
                  {errors.contact && errors.contact.type === "pattern" && (
                    <label className="error-msg">
                      Please enter a valid contact number
                    </label>
                  )}
                </div>
              </div>

              <div className="form-input-row">

                {ingredient && values && (<div className="form-input">

                  <label htmlFor="category" className="text-left">
                    Category<span className="text-danger">*</span>
                  </label>

                  <AutoComplete
                    defaultValue={ingredient}
                    dataSource={categories}

                    filterOption={(inputValue, option) =>
                      option.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }>

                    <input style={{ borderStyle: "none" }} {...register("category")} type="text" id="category" onChange={(value) => setCategory(value)}
                    />
                  </AutoComplete>


                </div>)}

                <div className="form-input">
                  <label htmlFor="GST" className="text-left">
                    GST Number<span className="text-danger">*</span>
                  </label>
                  <br />
                  <input
                {...register("GST", {
                  required: true,
                  pattern:
                    /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[1-9A-Z]{1}[0-9A-Z]{2}$/,
                })}
                    
                    type="text"
                    id="GST"
                    placeholder="Enter GST number"
                  />
                  {errors.GST && errors.GST.type === "required" && (
                    <label className="error-msg">
                      Please enter the GST number{" "}
                    </label>
                  )}
                  {errors.GST && errors.GST.type === "pattern" && (
                    <label className="error-msg">
                      Please enter the a valid GST number{" "}
                    </label>
                  )}


                </div>


              </div>

              <div className="form-input-row">

                <div className="form-input">
                  <label htmlFor="AccountNumber" className="text-left">
                    Account Number<span className="text-danger">*</span>
                  </label>
                  <br />
                  <input
                    {...register("AccountNumber", {
                      required: true, pattern: /^\d+$/
                    })}
                    type="text"
                    id="AccountNumber"
                    placeholder="Enter Account Number number"
                  />
                  {errors.AccountNumber && errors.AccountNumber.type === "required" && (
                    <label className="error-msg">
                      Please enter the Account Number

                    </label>
                  )}

                  {errors.AccountNumber && errors.AccountNumber.type === "pattern" && (
                    <label className="error-msg">
                      Please enter a valid Account Number Code
                    </label>
                  )}
                </div>

                <div className="form-input">
                  <label htmlFor="BranchCode" className="text-left">
                    Branch Code<span className="text-danger">*</span>
                  </label>
                  <br />
                  <input
                    {...register("BranchCode", { required: true,  pattern: /^[A-Z]{4}\d{7}$/ })}
                    type="text"
                    id="BranchCode"
                    placeholder="Enter Branch Code number"
                  />
                  {errors.BranchCode && errors.BranchCode.type === "required" && (
                    <label className="error-msg">
                      Please enter the Branch Code
                    </label>
                  )}
                  {errors.BranchCode && errors.BranchCode.type === "pattern" && (
                    <label className="error-msg">
                      Please enter a valid Branch Code
                    </label>
                  )}
                </div>
              </div>



              <div className="form-input-row">
                <div className="form-input-full">
                  <label htmlFor="neft" className="text-left">
                    NEFT Number<span className="text-danger">*</span>
                  </label>
                  <br />
                  <input
                    {...register("neft", {
                      required: true, pattern: /^[A-Za-z0-9]{6,20}$/
                    })}
                    type="text"
                    id="neft"
                    placeholder="Enter NEFT number"
                  />
                  {errors.neft && errors.neft.type === "required" && (
                    <label className="error-msg">
                      Please enter the Branch Code number
                    </label>
                  )}
                </div>
              </div>


              <div className="form-input-row">
                <div className="form-input-upload">
                  <label htmlFor="billImage" className="text-left">
                    Upload Proof<span className="text-danger">*</span>
                  </label>
                  <br />
                  <label htmlFor="billImage" className="file-upload">
                    <input

                      type="file"
                      name="billImage"
                      id="billImage"
                      onChange={(e) => handleImage(e)}
                    />
                    <span className="upload-icon" ><FaUpload /></span>
                    <label htmlFor="billImage" className="browse-btn">Browse File</label>
                  </label>

                </div>
              </div>

              {imageURL && (<Image
                
                width={200}
                src={imageURL}
  />
)}

              <div className="buttons">
                <Button className="submit-btn" type="submit">
                  Submit
                </Button>
                <Link to="/dashboard/vendor-management/vendor-settings">
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
export default UpdateVendor;
