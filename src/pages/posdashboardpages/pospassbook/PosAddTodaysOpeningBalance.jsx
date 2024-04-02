import Wrapper from "../../../assets/wrappers/adminwrappers/Forms";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { restaurantPosAxiosInstance } from "../../../config/apiInterceptor";
import { toastError, toastSuccess } from "../../../helpers/helpers";
import Uploading from "../../../components/loaders/Uploading";

const PosAddTodaysOpeningBalance = () => {
  const navigate = useNavigate();
  const [isUploading, setUploading] = useState(false);
  const currentDate = new Date().toISOString().split("T")[0];
  const [denominationCounts, setDenominationCounts] = useState({});
  
  // Define completeDenominationState and initialize it
  const [completeDenominationState, setCompleteDenominationState] = useState([]);

  // Define denominations array within the component scope
  const denominations = [
    { value: 2000, label: "Rs 2000" },
    { value: 500, label: "Rs 500" },
    { value: 200, label: "Rs 200" },
    { value: 100, label: "Rs 100" },
    { value: 50, label: "Rs 50" },
    { value: 20, label: "Rs 20" },
    { value: 10, label: "Rs 10" },
    { value: 5, label: "Rs 5" },
    { value: 2, label: "Rs 2" },
    { value: 1, label: "Rs 1" },
  ];

  // Calculate total amount based on denomination counts
  const totalAmount = Object.keys(denominationCounts).reduce(
    (acc, label) => acc + (denominationCounts[label] || 0) * parseInt(label.replace(/\D/g, ""), 10),
    0
  );

  const handleSubmitButton = async (formData) => {
    setUploading(true);
  
    const data = {
      ...formData,
      totalAmount: totalAmount // Include total amount in the data object
    };
  
    data.cashDenomination = completeDenominationState;
  
    try {
      const response = await restaurantPosAxiosInstance.post(
        `addTodaysOpeningBalance`,
        data
      );

      if (response.data.success) {
        navigate("/pos-dashboard/pos-passbook");
        toastSuccess(response.data.message);
      } else {
        toastError(response.data.message);
      }
    } catch (error) {
      toastError("An error occurred while submitting the form.");
    }

    setUploading(false);
  };

  const updateQuantity = (denomination, action) => {
    setDenominationCounts((prevCounts) => {
      const currentCount = prevCounts[denomination.label] || 0;
      const updatedCount =
        action === "increase"
          ? currentCount + 1
          : Math.max(currentCount - 1, 0);
      return {
        ...prevCounts,
        [denomination.label]: updatedCount,
      };
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      {isUploading ? <Uploading isUploading={isUploading} /> : null}
      <Wrapper className="page">
        <div className="page-content">
          <div className="page-header">
            <h3>Add Today's Opening Balance</h3>
          </div>

          <div className="custom-form">
            <form onSubmit={handleSubmit(handleSubmitButton)}>
              <div className="form-input-row">
                <div className="form-input">
                  <label>
                    Date<span className="text-danger">*</span>
                  </label>
                  <br />
                  <input
                    {...register("date", { required: true })}
                    type="date"
                    id="date"
                    defaultValue={currentDate}
                    readOnly
                  />
                  {errors.date && errors.date.type === "required" && (
                    <label className="error-msg text-danger">
                      Please enter date
                    </label>
                  )}
                </div>

                <div className="form-input">
                  <label>
                    Total Amount<span className="text-danger">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    value={`Rs ${totalAmount}`}
                    readOnly
                  />
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input-full">
                  <label>Cash Denomination</label>

                  {denominations.map((denomination) => (
                    <div key={denomination.value} className="form-input-row">
                      <label
                        htmlFor={`quantityInput${denomination.label}`}
                        className="denomination-label"
                      >
                        {denomination.label}
                      </label>

                      <div className="denomination-toggle">
                        <div className="denomination-input-toggle">
                          <button
                            type="button"
                            className="prepend-btn"
                            onClick={() => {
                              updateQuantity(denomination, "decrease");
                            }}
                          >
                            -
                          </button>

                          <input
                            type="number"
                            className="denomination-input"
                            id={`quantityInput${denomination.label}`}
                            placeholder="Quantity"
                            value={denominationCounts[denomination.label] || 0}
                            onChange={(e) => {
                              setDenominationCounts({
                                ...denominationCounts,
                                [denomination.label]:
                                  parseInt(e.target.value, 10) || 0,
                              });
                            }}
                          />

                          <button
                            type="button"
                            className="append-btn"
                            onClick={() => {
                              updateQuantity(denomination, "increase");
                            }}
                          >
                            +
                          </button>
                        </div>

                        <div className="denomination-total">
                          <span>
                            Rs{" "}
                            {denomination.value *
                              (denominationCounts[denomination.label] || 0)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
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
export default PosAddTodaysOpeningBalance;
