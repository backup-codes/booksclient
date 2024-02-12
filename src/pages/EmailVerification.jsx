import { BgBlob, SemiCircle, BgBoy } from "../assets/images"
import Styled from 'styled-components'

const Wrapper = Styled.div`
width: 100vw;
height: 100vh;
display: flex;
.left-div{
    width: 50%;
    background-image: url(${SemiCircle});
    background-repeat: no-repeat;
    background-size: 90% 130%;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
        width: 65%;
        height: 70%;
        margin-left: 120px;
    }
}

.right-div{
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column; 
    position:relative;
}
.bg-blob{
    position: absolute;
    height: 90%;
}
.right-div-content{
    z-index: 5;
    text-align: center;
    margin-top: 120px;
    p{
        font-size: 18px;
    }
    h3{
        font-weight: 700;
    }
}



/* 768px >= Medium <= 1024 start */

@media screen and (min-width: 768px) and (max-width: 1024px){
.left-div{
    display: none;
}

.right-div{
 width: 100%;
 padding: 0px 0px;
 img{
    width: 90%;
    height: 70%;
 }
 .right-div-content{
    margin-top: 150px;
 }
}
/* 768px >= Medium <= 1024 end */
`;

const EmailVerification = () => {
    return (
        <Wrapper>

            <div className="left-div">
                <img src={BgBoy} alt="" />
            </div>
            <div className="right-div">
                <img className='bg-blob' src={BgBlob} alt="" />
                <div className='right-div-content'>
                    <p>
                        We have sent an e-mail link
                    </p>
                    <h3>check you e-mail to login</h3>
                </div>
            </div>
        </Wrapper>
    )
}
export default EmailVerification