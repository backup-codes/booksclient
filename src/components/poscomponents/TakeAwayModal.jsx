import { useForm } from "react-hook-form";
import Wrapper from "../../assets/wrappers/poswrappers/PosFormModal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { TakeAwayUserToLead } from "../../config/routeApi/pos";
import { toastError, toastSuccess } from "../../helpers/helpers";

const TakeAwayModal = (props) => {
  //backend integration code

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleSubmitButton = async (data) => {
    data.orderMode = "takeaway";
    navigate("/pos-dashboard/pos-menu", {
      state: { orderData: data },
    });

    const response = await TakeAwayUserToLead(data);
    if (response.data.success) {
      toastSuccess(response.data.message);
    } else {
      toastSuccess(response.data.message);
    }
  };

  return (
    <Wrapper centered {...props}>
      <h4 className="title">Take Away</h4>

      <div className="form-div">
        <form onSubmit={handleSubmit(handleSubmitButton)}>
          <div className="form-row">
            <div className="form-group-full">
              <label>Mode of payment</label>

              <Form.Select
                id="paymentMethod"
                label="Select your payment method"
                {...register("paymentMethod", {
                  required: true,
                })}
              >
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="UPI">UPI</option>
                <option value="Credit">Credit</option>
              </Form.Select>

              {errors.paymentMethod &&
                errors.paymentMethod.type === "required" && (
                  <p className="error-msg">Select your payment method</p>
                )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Name</label>

              <input
                {...register("customerName", {
                  required: true,
                  pattern:  /^[A-Za-z ]+$/,
                })}
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
              {errors.customerName &&
                errors.customerName.type === "pattern" && (
                  <label className="error-msg">
                    Please enter valid customer name
                  </label>
                )}
            </div>

            <div className="form-group">
              <label>Phone number</label>
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
            <button type="submit" onClick={handleSubmitButton}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};
export default TakeAwayModal;
