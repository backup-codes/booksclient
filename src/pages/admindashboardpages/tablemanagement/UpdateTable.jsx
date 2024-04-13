import Wrapper from "../../../assets/wrappers/adminwrappers/Forms";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
//icon imports
import { FaUpload } from "react-icons/fa6";
import { Image } from 'antd';
//backend updates
import { useForm } from "react-hook-form";
import Zoom from "react-medium-image-zoom";
import {
  GetTableById,
  UpdateTableData,
} from "../../../config/routeApi/owner";
import { useEffect, useState } from "react";
import { toastError, toastSuccess } from "../../../helpers/helpers";
import Uploading from "../../../components/loaders/Uploading";

const UpdateTable = () => {
  const [tableImage, setTableImage] = useState("");
  const [preview, setPreview] = useState("");
  const [imgpreview, setImagePreview] = useState("");
  const [captain, setCaptain] = useState([]);
  const [isUploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { tableId } = useParams();
  const navigate = useNavigate();



  const fetchData = async () => {
    try {
      const response = await GetTableById(tableId);
      const tableData = response.data.table;
      setCaptain(response.data.captains);

      setPreview(response.data.table.image)
      setValue("tableNum", tableData.tableName);
      setValue("numberOfSeats", tableData.numberOfSeats);
      setValue("image", tableData.image);
      setValue("captain", tableData.captainId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // handleCaptainData();
    fetchData();
  }, [tableId, setValue]);

  const handleTableImage = (e) => {

    const image = e.target.files[0];
    if (image) {
      const reader = new FileReader();

      reader.onload = function (e) {
        setImagePreview(e.target.result);
      };

      reader.readAsDataURL(image);
    }
    setTableImage(image);
  };

  const handleTableSubmit = async (data) => {
console.log(data," i am data");
    setUploading(true);

    const formData = new FormData();

    formData.append("image", tableImage);
    for (const key in data) {
      formData.append(key, data[key]);
    }

    const response = await UpdateTableData(tableId, formData);

    setUploading(false);

    if (response.data.success) {
      navigate(-1);
      toastSuccess(response.data.success);
    } else {
      toastError(response.data.message);
    }
  };

  return (
    <>
      {isUploading ? <Uploading isUploading={isUploading} /> : null}


     {captain&&( <Wrapper className="page">
        <div className="page-content">
          <div>
            <h3>Update Table</h3>
          </div>

          <div className="custom-form">
            <form onSubmit={handleSubmit(handleTableSubmit)}>
              <div className="form-input-row">
                <div className="form-input">
                  <label htmlFor="tableNum">
                    Table Number<span className="text-danger">*</span>
                  </label>
                  <br />
                  <input
                    {...register("tableNum", { required: true })}
                    type="Number"
                    id="tableNum"
                    placeholder="Enter Table Number"
                  />
                  {errors.tableNum && errors.tableNum.type === "required" && (
                    <label className="error-msg">
                      Please enter the table number
                    </label>
                  )}
                </div>
                <div className="form-input">
                  <label htmlFor="numberOfSeats">
                    Total number of seats<span className="text-danger">*</span>
                  </label>
                  <br />
                  <input
                    type="Number"
                    {...register("numberOfSeats", { required: true })}
                    placeholder="Enter number of seats"
                  />
                  {errors.numberOfSeats &&
                    errors.numberOfSeats.type === "required" && (
                      <label className="error-msg">
                        Please enter the number of seats
                      </label>
                    )}
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input-full">
                  <label htmlFor="tableNum">
                    Table Access<span className="text-danger">*</span>
                  </label>
                  <br />
                  <select
                    className="form-select"
                    {...register("captain")}
                  >
                    <option value="">Select Access</option>
                    {captain &&
                      captain.map((captain) => (
                        <option key={captain._id} value={captain.username}>
                          {captain.username}
                        </option>
                      ))}
                  </select>

                  {errors.captain && errors.captain.type === "required" && (
                    <label className="error-msg">
                      Please select a captain
                    </label>
                  )}
                </div>
              </div>
              <div className="form-input-row">
                <div className="form-input-upload">
                  <label htmlFor="image">
                    Upload Table Picture<span className="text-danger">*</span>
                  </label>

                  <br />

                  <label htmlFor="image" className="file-upload">
                    <input
                      type="file"
                      id="image"
                      accept="image/jpeg, image/avif"
                      {...register("image",)}
                      onChange={handleTableImage}
                    />
                    <span className="upload-icon">
                      <FaUpload />
                    </span>
                    <label htmlFor="image" className="browse-btn">
                      Browse File
                    </label>
                  </label>



                </div>


                {imgpreview || preview ? (
                  <div className="col-md-5 mt-3">

                    
<Image
    width={200}
    src={imgpreview ? imgpreview : preview}
  />
                   
                  </div>
                ) : null}
              </div>

              <div className="buttons">
                <Button className="submit-btn" type="submit">
                  Submit
                </Button>
                <Link to="/dashboard/captain-management/table-details">
                  <Button className="cancel-btn" type="button">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </Wrapper>)}
    </>
  );
};
export default UpdateTable;
