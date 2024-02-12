import Wrapper from "../../../assets/wrappers/adminwrappers/Forms";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { GetToEditLead, UpdateLeads } from "../../../config/routeApi/pos";
import Uploading from "../../../components/loaders/Uploading";
import { toastError } from "../../../helpers/helpers";

const PosUpdateLead = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [isUploading, setUploading] = useState(false);

  const { leadId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetToEditLead(leadId);
        if (response.data.success) {
          const leadsData = response.data.LeadsData;

          setValue("customerName", leadsData.customerName);
          setValue("email", leadsData.email);
          setValue("phone", leadsData.phone);
          setValue("dob", leadsData.dob);
          setValue("maritalStatus", leadsData.maritalStatus);
          setValue("anniversaryDate", leadsData.anniversaryDate);
        } else {
          toastError(response.data.message)
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [leadId, setValue]);

  const handleLeadsSubmit = async (data) => {
    try {


      setUploading(true)
      const response = await UpdateLeads(leadId, data);
      setUploading(false)

      if (response.data.success) {
        navigate("/pos-dashboard/pos-leads");
        toast.success(response.data.message, {
          duration: 3000,
          position: "top-center",
          style: {
            background: "#B00043",
            color: "#fff",
          },
        });
      } else {
        toast.error(response.data.message, {
          duration: 3000,
          position: "top-center",
          style: {
            background: "#B00043",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <>
      {isUploading ? (<Uploading isUploading={isUploading} />) : null}

      <Wrapper className="page">
        <div className="page-content">
          <div className="page-header">
            <h3>Update Lead</h3>
          </div>

          <div className="custom-form">
            <form onSubmit={handleSubmit(handleLeadsSubmit)}>
              <div className="form-input-row">
                <div className="form-input">
                  <label>Customer Name<span className="text-danger">*</span></label>

                  <br />
                  <input
                    {...register("customerName", { required: true })}
                    type="text"
                    id="customerName"
                    placeholder="Enter Customer Name"
                  />
                  {errors.customerName &&
                    errors.customerName.type === "required" && (
                      <label className="error-msg text-danger">
                        Please enter Customer Name
                      </label>
                    )}
                </div>

                <div className="form-input">
                  <label>Customer Email<span className="text-danger">*</span></label>
                  <br />

                  <input
                    {...register("email", {
                      required: true,
                      pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    })}
                    type="email"
                    id="email"
                    placeholder="Enter Customer Email"
                  />
                  {errors.email && errors.email.type === "required" && (
                    <label className="error-msg text-danger">
                      Please enter customer email
                    </label>
                  )}
                  {errors.email && errors.email.type === "pattern" && (
                    <label className="error-msg text-danger">
                      Please enter a valid email
                    </label>
                  )}
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input">
                  <label>Phone No.<span className="text-danger">*</span></label>

                  <br />
                  <input
                    {...register("phone", {
                      required: true,
                      pattern: /^[0-9]{10}$/,
                    })}
                    type="tel"
                    id="phone"
                    placeholder="Enter phone number"
                  />
                  {errors.phone && errors.phone.type === "required" && (
                    <label className="error-msg text-danger">
                      Please enter your phone number
                    </label>
                  )}
                  {errors.phone && errors.phone.type === "pattern" && (
                    <label className="error-msg text-danger">
                      Please enter a valid phone
                    </label>
                  )}
                </div>

                <div className="form-input">
                  <label className="text-left">Date of Birth<span className="text-danger">*</span></label>
                  <br />
                  <input
                    {...register("dob", {
                      required: true,
                    })}
                    type="date"
                    id="dob"
                    placeholder="Enter DOB"
                  />
                  {errors.dob && errors.dob.type === "required" && (
                    <label className="error-msg text-danger">
                      Please enter the dob
                    </label>
                  )}
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input">
                  <label>Marital Status<span className="text-danger">*</span></label>
                  <br />
                  <select
                    {...register("maritalStatus", {
                      required: true,
                    })}
                    id="maritalStatus"
                    placeholder="Select the marital status"
                    className="form-select"
                  >
                    <option value="">Select Marital Status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                  </select>
                  {errors.maritalStatus &&
                    errors.maritalStatus.type === "required" && (
                      <label className="error-msg text-danger">
                        Please select the marital status
                      </label>
                    )}
                </div>

                <div className="form-input">
                  <label className="text-left">Anniversary Date</label>
                  <br />
                  <input
                    {...register("anniversaryDate")}
                    type="date"
                    id="anniversaryDate"
                    placeholder="Enter Anniversary Date"
                  />
                </div>
              </div>

              <div className="buttons">
                <Button className="submit-btn" type="submit">
                  Submit
                </Button>
                <Link to="/pos-dashboard/pos-leads">
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
export default PosUpdateLead;
