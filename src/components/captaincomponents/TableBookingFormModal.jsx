import Wrapper from "../../assets/wrappers/poswrappers/PosFormModal";
import { Table1 } from "../../assets/images";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { BookTable } from "../../config/routeApi/cap";
import Uploading from "../loaders/Uploading";
import { toastError, toastSuccess } from "../../helpers/helpers";

const TableBookingFormModal = (props) => {
  // const [orderId,setOrderId] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isUploading, setUploading] = useState(false);

  const handleSubmitButton = async (data) => {
    setUploading(true);

    const requestData = {
      ...data,
      tableName: props.tableName,
      tableId: props.tableId,
      orderMode: "dineIn",
    };

    const response = await BookTable(requestData);
    setUploading(false);

    if (response.data.success) {
      // setOrderId(response.data.OrderId)
      toastSuccess(response.data.message)
      props.onCancel();
      props.SetBooked(!props.isBooked);
      props.onOrderIdChange(response.data.OrderId);
    } else {
      // Display error toast
      toastError(response.data.message)
    }
  };

  return (
    <>
      {isUploading ? <Uploading isUploading={isUploading} /> : null}
      <Wrapper centered {...props}>
        <h4 className="title">Book Table</h4>
        <div className="form-div">
          <form onSubmit={handleSubmit(handleSubmitButton)}>
            <div className="card-div">
              <div className="card">
                <div className="card-img">
                  <img src={Table1} alt="" />
                </div>
                <div>
                  <h4>Table 01</h4>
                  <p style={{ margin: "0px" }}>2 seaters</p>
                </div>
              </div>
            </div>
            <div className="table-form-content">

              <div>
                <input
                  {...register("customerName", { required: true })}
                  type="text"
                  id="customerName"
                  placeholder="Please enter the customer name"
                />
                {errors.customerName &&
                  errors.customerName.type === "required" && (
                    <label className="error-msg">
                      Please enter the customer name
                    </label>
                  )}
              </div>
              <div>
                <input
                  {...register("phone", {
                    required: true,
                    pattern: /^[0-9]{10}$/,
                  })}
                  type="tel"
                  id="phone"
                  placeholder="+91 xxxxxxxxxx"
                />
                {errors.phone && errors.phone.type === "required" && (
                  <label className="error-msg text-danger">
                    please enter phone number
                  </label>
                )}
                {errors.phone && errors.phone.type === "pattern" && (
                  <label className="error-msg text-danger">
                    please enter a valid phone
                  </label>
                )}
              </div>

            </div>

            <div className="form-btn">
              <button className="form-submit-btn" type="submit" >Submit</button>
            </div>
          </form>
        </div>
      </Wrapper>
    </>
  );
};
export default TableBookingFormModal;
