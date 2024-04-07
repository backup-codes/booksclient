import Wrapper from "../../../assets/wrappers/adminwrappers/Forms";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FaUpload } from "react-icons/fa6";
import { restaurantPosAxiosInstance } from "../../../config/apiInterceptor";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Uploading from "../../../components/loaders/Uploading";
import { toastError, toastSuccess } from "../../../helpers/helpers";
import { GetClosingFieldData } from "../../../config/routeApi/pos";
import { Image } from "antd";

const PosAddTodaysClosing = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [image, setImage] = useState(null);
  const [isUploading, setUploading] = useState(false);
  const [aadhaarImagePreview, setAadharImagePreview] = useState([]);
  const [totalCashReceived, setTotalCashReceived] = useState(0); // State for total cash received

  const handleImage = (e) => {
    const images = e.target.files;

    if (images) {
      setImage(images);
      const previews = [];

      Array.from(images).forEach((image) => {
        const reader = new FileReader();

        reader.onload = function (e) {
          previews.push(e.target.result);

          // Check if all images have been processed
          if (previews.length === images.length) {
            setAadharImagePreview(previews);
          }
        };

        reader.readAsDataURL(image);
      });
    }
  };

  
  const currentDate = new Date().toISOString().split("T")[0];

  const handleSubmitButton = async (data) => {
    setUploading(true);

    const formData = new FormData();

    const {
      Totalorder,
      date,
      totalAmount,
      totalAmountBromagOrders,
      totalAmountOthersOrder,
      totalAmountSwiggyOrder,
      totalAmountZomatoOrder,
      totalamounttakeaway,
      totalorderupi,
    } = data;

    for (let i = 0; i < image.length; i++) {
      formData.append("image", image[i]);
    }

    formData.append("date", date);
    formData.append("totalorder", Totalorder);
    formData.append("totalAmount", totalAmount);
    formData.append("totalAmountBromagOrders", totalAmountBromagOrders);
    formData.append("totalAmountOthersOrder", totalAmountOthersOrder);
    formData.append("totalAmountSwiggyOrder", totalAmountSwiggyOrder);
    formData.append("totalAmountZomatoOrder", totalAmountZomatoOrder);
    formData.append("totalamounttakeaway", totalamounttakeaway);
    formData.append("totalorderupi", totalorderupi);
    formData.append(
      "cashDenomination",
      JSON.stringify(completeDenominationState)
    );

    const response = await restaurantPosAxiosInstance.post(
      `addTodaysClosing`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setUploading(false);

    if (response.data.success) {
      navigate("/pos-dashboard/pos-passbook");
      toastSuccess(response.data.message);
    } else {
      toastError(response.data.message);
    }
  };

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

  const [denominationCounts, setDenominationCounts] = useState({});

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

  useEffect(() => {
    async function getFieldData() {
      const { data } = await GetClosingFieldData();

      const {
        message,
        success,
        todaysTotalAmount,
        todaysTotalAmountBromagOrders,
        todaysTotalAmountDineIn,
        todaysTotalAmountOthersOrders,
        todaysTotalAmountSwiggyOrders,
        todaysTotalAmountTakeAway,
        
        todaysTotalAmountZomatoOrders,
        todaysTotalOrderdsInUPI,
        todaysTotalOrders,
        todaysTotalOrderdsInCASH,
        todaysTotalOrderdsInCARD,
        todaysTotalOrderdsInCREDIT
        
      } = data;

      console.log(data, "heloooo resposne");
      setValue("Totalorder", todaysTotalOrders);
      setValue("totalAmount", todaysTotalAmount);
      setValue("totalAmountSwiggyOrder", todaysTotalAmountSwiggyOrders);
      setValue("totalAmountZomatoOrder", todaysTotalAmountZomatoOrders);
      setValue("totalAmountBromagOrders", todaysTotalAmountBromagOrders);
      setValue("totalamounttakeaway", todaysTotalAmountTakeAway);
      setValue("todaysTotalAmountDineIn", todaysTotalAmountDineIn);
      setValue("totalAmountOthersOrder", todaysTotalAmountOthersOrders);
      setValue("totalorderupi", todaysTotalOrderdsInUPI);
      setValue("totalordercash", todaysTotalOrderdsInCASH);
      setValue("totalordercard", todaysTotalOrderdsInCARD);
      setValue("totalordercredit", todaysTotalOrderdsInCREDIT);
     
      
    }

    getFieldData();
  }, []);

  const completeDenomination = () => {
    return denominations.map((denomination) => ({
      label: denomination.label,
      count: denominationCounts[denomination.label] || 0,
    }));
  };
  // Function to calculate total cash received
  useEffect(() => {
    let total = 0;
    denominations.forEach((denomination) => {
      total +=
        denomination.value * (denominationCounts[denomination.label] || 0);
    });
    setTotalCashReceived(total);
  }, [denominationCounts]);


  const [completeDenominationState, setCompleteDenominationState] = useState(
    completeDenomination()
  );
  const updateCompleteDenominationState = () => {
    setCompleteDenominationState(completeDenomination());
  };

  return (
    <>
      {isUploading ? <Uploading isUploading={isUploading} /> : null}
      <Wrapper className="page">
        <div className="page-content">
          <div className="page-header">
            <h3>Add Closing</h3>
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
                    Total Orders<span className="text-danger">*</span>
                  </label>
                  <br />

                  <input
                    disabled
                    {...register("Totalorder")}
                    type="number"
                    placeholder="Enter Total Orders"
                  />

                  {errors.Totalorder &&
                    errors.Totalorder.type === "required" && (
                      <label className="error-msg text-danger">
                        Please enter total order
                      </label>
                    )}
                </div>
              </div>
              <div className="form-input-row">
                <div className="form-input">
                  <label>
                    Total Amount<span className="text-danger">*</span>
                  </label>
                  <br />
                  <input
                    disabled
                    {...register("totalAmount")}
                    type="number"
                    placeholder="Enter Total amount"
                  />
                  {errors.totalAmount &&
                    errors.totalAmount.type === "required" && (
                      <label className="error-msg text-danger">
                        Please enter total amount
                      </label>
                    )}
                </div>

                <div className="form-input">
                  <label>
                    Total Amount - Swiggy Orders
                    <span className="text-danger">*</span>
                  </label>
                  <br />

                  <input
                    disabled
                    {...register("totalAmountSwiggyOrder")}
                    type="number"
                    placeholder="Enter Total Amount In Online Orders"
                  />
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input">
                  <label>
                    Total Amount - Bromag Orders
                    <span className="text-danger">*</span>
                  </label>
                  <br />
                  <input
                    disabled
                    {...register("totalAmountBromagOrders")}
                    type="number"
                    placeholder="Enter Total amount"
                  />
                  {errors.totalAmount &&
                    errors.totalAmount.type === "required" && (
                      <label className="error-msg text-danger">
                        Please enter total amount
                      </label>
                    )}
                </div>

                <div className="form-input">
                  <label>
                    Total Amount - Zomato Orders
                    <span className="text-danger">*</span>
                  </label>
                  <br />

                  <input
                    disabled
                    {...register("totalAmountZomatoOrder")}
                    type="number"
                    placeholder="Enter Total Amount In Online Orders"
                  />
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input">
                  <label>
                    Total Amount - Others Orders
                    <span className="text-danger">*</span>
                  </label>
                  <br />

                  <input
                    disabled
                    {...register("totalAmountOthersOrder")}
                    type="number"
                    placeholder="Enter Total Amount In Online Orders"
                  />
                </div>
              </div>
              <div className="form-input-row">
                <div className="form-input">
                  <label>
                    Total Amount - Take Away
                    <span className="text-danger">*</span>
                  </label>
                  <br />

                  <input
                    disabled
                    {...register("totalamounttakeaway", { required: true })}
                    type="number"
                    placeholder="Enter Total Amount In Take Away"
                  />
                </div>
              </div>
              {/* Display the dine orders  */}
              <div className="form-input-row">
                <div className="form-input">
                  <label>
                    Total Amount - Dine
                    <span className="text-danger">*</span>
                  </label>
                  <br />

                  <input
                    disabled
                    {...register("totalamountdine", { required: true })}
                    type="number"
                    placeholder="Enter Total Amount In Dine"
                  />
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input-full">
                  <label>
                    Cash Received<span className="text-danger">*</span>
                  </label>

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
                              updateCompleteDenominationState();
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
                              updateCompleteDenominationState();
                            }}
                          >
                            +
                          </button>
                        </div>
                        <div className="col-2">
                          <span style={{ minWidth: "50px" }}>
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
              
                              {/* Display total cash received */}
                              <div className="col-md-3">
          <div className="form-input-row">
            <div className="form-input-full">
              <label>Total Cash Received:</label>
              <span>{totalCashReceived}</span>
            </div>
          </div>
        </div>


              <div className="lg-col{6}">
                <div className="row">
                  <div className="col-lg-3">
                    <label style={{ fontWeight: "700" }}>Cash Payments</label>

                    <div className="form-input-row">
                      <div className="form-input-full">
                        <label>
                          Total Amount<span className="text-danger">*</span>
                        </label>
                        <br />
                        <div>
                          <input
                            disabled
                            {...register("totalordercash", { required: true })}
                            type="text"
                            placeholder="Enter Total Orders"
                          />

                          {errors.totalordercash &&
                            errors.totalordercash.type === "required" && (
                              <label className="error-msg text-danger">
                                Please enter total order
                              </label>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <label style={{ fontWeight: "700" }}>Card Payments</label>

                    <div className="form-input-row">
                      <div className="form-input-full">
                        <label>
                          Total Amount<span className="text-danger">*</span>
                        </label>
                        <br />
                        <div>
                          <input
                            disabled
                            {...register("totalordercard", { required: true })}
                            type="text"
                            placeholder="Enter Total Orders"
                          />

                          {errors.totalordercard &&
                            errors.totalordercard.type === "required" && (
                              <label className="error-msg text-danger">
                                Please enter total order
                              </label>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <label style={{ fontWeight: "700" }}>Credit Payments</label>

                    <div className="form-input-row">
                      <div className="form-input-full">
                        <label>
                          Total Amount<span className="text-danger">*</span>
                        </label>
                        <br />
                        <div>
                          <input
                            disabled
                            {...register("totalordercredit", { required: true })}
                            type="text"
                            placeholder="Enter Total Orders"
                          />

                          {errors.totalordercredit &&
                            errors.totalordercredit.type === "required" && (
                              <label className="error-msg text-danger">
                                Please enter total order
                              </label>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <label style={{ fontWeight: "700" }}>UPI Payments</label>

                    <div className="form-input-row">
                      <div className="form-input-full">
                        <label>
                          Total Amount<span className="text-danger">*</span>
                        </label>
                        <br />
                        <div>
                          <input
                            disabled
                            {...register("totalorderupi", { required: true })}
                            type="text"
                            placeholder="Enter Total Orders"
                          />

                          {errors.totalorderupi &&
                            errors.totalorderupi.type === "required" && (
                              <label className="error-msg text-danger">
                                Please enter total order
                              </label>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input-full">
                  <label>
                    Upload a Copy<span className="text-danger">*</span>
                  </label>
                  <br />
                  <label htmlFor="uploads" className="file-upload">
                    <input
                      multiple
                      {...register("image", { required: true })}
                      id="uploads"
                      onChange={handleImage}
                      type="file"
                      accept=".jpg, .avif"
                    />
                    <span className="upload-icon">
                      <FaUpload />
                    </span>
                    <label htmlFor="uploads" className="browse-btn">
                      Browse File
                    </label>
                  </label>

                  {errors.image && errors.image.type === "required" && (
                    <label className="error-msg text-danger">
                      Please upload image
                    </label>
                  )}
                </div>
              </div>

              <div className="col-md-5 mt-3 d-flex flex-wrap gap-3">
                {aadhaarImagePreview &&
                  aadhaarImagePreview.map((image, index) => (
                    <Image key={index} width={200} src={image} />
                  ))}
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
export default PosAddTodaysClosing;
