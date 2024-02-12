import { useState } from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Wrapper from "../assets/wrappers/LoginStyle";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../components/Logo";
import { LoginIllustration } from "../assets/images";
import { IoPersonSharp, IoEye, IoEyeOff } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { RestaurantAdminApi } from "../config/global";
import Uploading from "../components/loaders/Uploading";

const Login = () => {

  //password hide and show usestate start
  const [show, setShow] = useState(false);
  const [isUploading, setUploading] = useState(false);

  const handleShow = () => {
    setShow(!show);
  }
  //password hide and show usestate end


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleLoginSubmit = async (data) => {
    setUploading(true)

    const response = await axios.post(`${RestaurantAdminApi}login`, {
      data: data,
    });
    setUploading(false)
  
    if (response.data.success) {
      
      navigate("/email-verification");
    } else if (response.data === "Server Busy") {
      console.log("verify your email id");
    }
  };

  return (

    <>
      {isUploading ? (<Uploading isUploading={isUploading} />) : null}
      <Wrapper>
        <div className="login-page">
          <div className="left-div">
            <h1 className='heading'>Log in</h1>
          </div>

          <div className="right-div">
            <img src={LoginIllustration} alt="" />
          </div>
        </div>

        <div>
          <Container>
            <Logo className="logo" />
            <form onSubmit={handleSubmit(handleLoginSubmit)}>
              <div className="form-input">
                <span><IoPersonSharp /></span>
                <input
                  {...register("username", { required: true })}
                  type="username"

                  id="username"
                  placeholder="User name"
                />

              </div>
              {errors.username && errors.username.type === "required" && (
                <label>* Please enter the username</label>
              )}
              <div className="form-input">
                <span><RiLockPasswordFill /></span>
                <input
                  {...register("password", { required: true })}
                  type={show ? "text" : "password"}
                  id="password"
                  placeholder="Password"

                />
                <button type="button" className="eye-btn" onClick={handleShow}>{show ? <IoEyeOff /> : <IoEye />}</button>
              </div>
              {errors.password && errors.password.type === "required" && (
                <label>* Please enter the password</label>
              )}
              <Link to='/forgot-password'>Forgot password?</Link>
              <div>
                <button type="submit">
                  Log in
                </button>
              </div>
            </form>
          </Container>
        </div>
      </Wrapper>
    </>
  );
};
export default Login;
