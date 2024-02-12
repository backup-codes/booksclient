import Wrapper from '../assets/wrappers/IndividualLogin';
import { LogoBb, LineVector, IndividualLoginBgGirl } from '../assets/images';
import { IoMailOpen } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";


const IndividualForgotPassword = () => {
    return (
        <Wrapper>
            <header>
                <img src={LogoBb} alt="" />
                <h3>bromag books</h3>
            </header>

            <section>
                <div className='left-content'>
                    <h3 className='heading'>Forgot Password</h3>
                    <img src={LineVector} alt="" />
                </div>


                <div className='right-content'>

                    <form>
                        <div className='form-row'>
                            <span><IoMailOpen /></span>
                            <input type="text" placeholder='Email' />
                        </div>
                        <div className='form-row'>
                            <span><RiLockPasswordFill /></span>
                            <input type="password" placeholder='Pass code' />
                        </div>
                        <p className='forgot-password'>Resend?</p>
                        <button>Submit</button>
                    </form>

                    <img className='bg-girl' src={IndividualLoginBgGirl} alt="" />
                </div>
            </section>
        </Wrapper>
    )
}
export default IndividualForgotPassword