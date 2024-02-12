import styled from 'styled-components'
import { LoginBg } from '../images';


const Wrapper = styled.div`
height: 100vh;
width: 100vw;
overflow: auto;
background-color: #FBFBFB;
position: relative;
.login-page{
    width: 100%;
    height: 100%;
    display: flex;
}

.left-div{
    width: 30%;
    height: 100%;
    display: flex;
    align-items: center;
}
.heading{
    position: absolute;
    top: 320px;
    left:70px;
    font-size: 90px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    color: #B9B9B9;
    transform: rotate(-90deg);
}
.forgot-password-heading{
    font-size: 60px;
    left: -30px;
    top: 350px;
}
.right-div{
    width: 70%;
    height: 100%;
    color: #fff;
    background: url(${LoginBg});
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;

    img{
        width: 55%;
        height: 80%;
        margin-left: 100px;
    }
}

.container{
    width: 22%;
    background-color: #fff;
    text-align: center;
    padding: 40px 30px;
    position: absolute;
    top: 140px;
    left: 300px;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
}

.logo{
    width: 120px;
    height: 120px;
}
.form-input{
    display: flex;
    align-items: center;
    border-bottom: 1px solid #3F3F3F;
    margin-top: 20px;
    position: relative;
}
input{
    width: 100%;
    border-style: none;
    padding: 10px 15px;
}
input::placeholder{
    color: #4D4D4D;
    font-size: 12px;
}
input:focus{
    outline: none;
}
label{
    width: 100%;
    color: red;
    font-size: 12px;
    padding-top: 3px;
}
a{
    font-size: 12px;
    color: #4D4D4D;
    text-decoration: none;
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
}
.eye-btn{
    color: #000;
    background-color: transparent;
    width: 32px;
    height: 32px;
    padding: 0px;
    position: absolute;
    bottom: 5px;
    right: 5px;
}
button{
    width: 100%;
    background-color:#51A1FF;
    margin-top: 20px;
    border-style: none;
    border-radius: 7px;
    padding: 10px;
    color: #fff;
}

/*  RESPONSIVENESS START*/


/* 768px >= Medium <= 1024 start */

@media screen and (min-width: 768px) and (max-width: 1024px){
.heading{
        top: 550px;
        left: 0px;
    }
.forgot-password-heading{
        left: -120px;
        top: 550px;
    }
.container{
        position: absolute;
        width: 40%;
        padding: 40px 30px;
        top: 380px;
        left: 400px;
    }
.right-div{
    img{
            display: none;
        }
    }
}
/* 768px >= Medium <= 1024 end */

`;

export default Wrapper;