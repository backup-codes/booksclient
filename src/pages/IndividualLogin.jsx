//styled-component imports
import Wrapper from "../assets/wrappers/IndividualLogin";
//react-icon imports
import { LogoBb, LineVector, IndividualLoginBgGirl } from "../assets/images";
import { IoPerson, IoEye, IoEyeOff } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
//react imports
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
//backend integration imports
import { employeeLogin } from "../config/routeApi/restaurant";
import { useState } from "react";
import Uploading from "../components/loaders/Uploading";
import { toastError, toastSuccess } from "../helpers/helpers";

const IndividualLogin = () => {
  const [isUploading, setUploading] = useState(false);
  //password hide and show usestate start
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };
  //password hide and show usestate end

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleLoginSubmit = async (data) => {
    try {
      const response = await employeeLogin(data);

      if (response.data.success) {
        if (response.data.PosManager) {
          navigate("/pos-dashboard");
          localStorage.setItem("posToken", response.data.token);
        } else if (response.data.Captain) {
          navigate("/captain-dashboard");
          localStorage.setItem("capToken", response.data.token);
        }
      } else {
        toastError(response.data.message);
      }
    } catch (error) {
      console.error("Error during login submit:", error);
    }
  };

  return (
    <>
      {isUploading ? <Uploading isUploading={isUploading} /> : null}
      <Wrapper>
        <header>
          <img src={LogoBb} alt="" />
          <h3>bromag books</h3>
        </header>

        <section>
          <div className="left-content">
            <h3 className="heading">Employee's login</h3>
            <img src={LineVector} alt="" />
          </div>

          <div className="right-content">
            <h3 className="mobile-heading">Employee Login</h3>
            <form onSubmit={handleSubmit(handleLoginSubmit)}>
              <div className="form-row">
                <span>
                  <IoPerson />
                </span>
                <input
                  {...register("username", { required: true })}
                  type="username"
                  id="username"
                  placeholder="User name"
                />
                {errors.username && errors.username.type === "required" && (
                  <label className="error-msg">
                    Please enter the username
                  </label>
                )}
              </div>
              <div className="form-row">
                <span>
                  <RiLockPasswordFill />
                </span>
                <input
                  {...register("password", { required: true })}
                  type={show ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                />
                <button type="button" className="eye-btn" onClick={handleShow}>
                  {show ? <IoEyeOff /> : <IoEye />}
                </button>
                {errors.password && errors.password.type === "required" && (
                  <label className="error-msg">
                    Please enter the password
                  </label>
                )}
              </div>
              <p className="forgot-password">
                <Link to="/individual-forgot-password">Forgot Password?</Link>
              </p>
              <button>Login</button>
            </form>

            <img className="bg-girl" src={IndividualLoginBgGirl} alt="" />
          </div>
        </section>
      </Wrapper>
    </>
  );
};
export default IndividualLogin;
