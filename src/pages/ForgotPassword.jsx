import Wrapper from "../assets/wrappers/LoginStyle";
import { Container, } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import { ForgotPasswordIllustration } from "../assets/images";
import { IoPersonSharp } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";

const ForgotPassword = () => {
    return (
        <Wrapper>
            <div className="login-page">
                <div className="left-div">
                    <h1 className='heading forgot-password-heading'>Forgot Password</h1>
                </div>

                <div className="right-div">
                    <img src={ForgotPasswordIllustration} alt="" />
                </div>
            </div>

            <div>
                <Container>
                    <Logo className="logo" />
                    <form >
                        <div className="form-input">
                            <span><IoPersonSharp /></span>
                            <input
                                type="username"
                                id="username"
                                placeholder="Email"
                            />

                        </div>

                        <div className="form-input">
                            <span><RiLockPasswordFill /></span>
                            <input
                                type="password"
                                id="password"
                                placeholder="Pass Code"

                            />

                        </div>



                        <Link to='/forgot-password'>Resend?</Link>
                        <div>
                            <button type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </Container>
            </div>
        </Wrapper>
    )
}
export default ForgotPassword