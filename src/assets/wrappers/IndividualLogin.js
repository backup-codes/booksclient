import styled from 'styled-components'
import { IndividualLoginBg } from '../../assets/images';

const Wrapper = styled.main`
width: 100vw;
height: 100vh;
background: url(${IndividualLoginBg});
background-repeat: no-repeat;
background-size: cover;
font-family: 'Montserrat', sans-serif;

header{
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    padding: 10px 30px;
    img{
        width: 80px;
        height: 100%;
    }
    h3{
        text-transform: capitalize;
        font-weight: 700;
        margin: 0px;
        background: linear-gradient(to left,#002755, #155AAB);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-top: 10px;
    }
}


section{
    width: 100%;
    height: 90%;
    display: flex;
    align-items: center;
}
.left-content{
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 100px;
    position: relative;
    img{
        position: absolute;
        top: 45%;
        right: 0px;
    }
}
.heading{
    text-transform: uppercase;
    font-weight: 700;
    font-size: 30px;
    color: #fff;
}
.right-content{
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
}

form{
    width: 70%;
    background-color: #00397D80;
    padding: 100px 50px;
    border-radius: 25px;
    display: flex;
    flex-direction: column;

}
.form-row{
    width: 100%;
    position: relative;
    margin-bottom: 30px;
    input{
        width: 100%;
        background-color: rgba(255,255,255,0.5);
        border-style: none;
        border-radius: 7px;
        padding: 10px 45px;
        color:#fff;
    }
    input::placeholder{
        color: #fff;
        font-weight: 300;
    }
    input:focus{
        outline:none;
    }
    span{
        width: 18px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 13px;
        left: 14px;
        color: #fff;

        svg{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    
}
.eye-btn{
    padding: 0px;
    background-color: transparent;
    position: absolute;
    top: 7px;
    right: 14px;
}
.forgot-password{
    text-align: end;
    color: #fff;
    font-weight: 300;
    font-size: 12px;
    margin-top: -20px;
    margin-bottom:  50px;
}
a{
    text-decoration: none;
    color: #fff;
}

button{
    border-style: none;
    background-color: #2B8DFF;
    color: #fff;
    padding: 15px;
    border-radius: 7px;
    font-weight: 700;
    font-size: 20px;
}

.bg-girl{
    position: absolute;
    bottom: 80px;
    right: 15px;
}

.mobile-heading{
    display: none;
}
.error-msg{
    color: red;
    font-size: 14px;
}

/* 768px >= Medium <= 1024 start */

@media screen and (min-width: 768px) and (max-width: 1024px){
    .left-content{
        width: 40%;
        padding-left: 0px;
    }
    header{
        height: 7%;
        img{
            width: 80px;
        }
    }
    .heading{
        font-size: 24px;
        margin-bottom: 60px;
        margin-right: 110px;
    }
    .right-content{
        width: 60%;
    }
    .bg-girl{
    bottom: 365px;
    right: -35px;
}
}
/* 768px >= Medium <= 1024 end */



/* Small <= 767px start*/
@media screen and (min-width: 320px) and (max-width:767px){

header{
    padding: 0px;
    img{
        width: 60px;
        height: 70%;
    }
    h3{
        font-size: 18px;
        margin: 12px 0px 0px -12px;
    }
}

.left-content{
    display: none
}
.right-content{
    width: 100%;
    flex-direction: column;
    justify-content: center;
}
.mobile-heading{
    display: inline;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 20px;
    color: #fff;
    margin-bottom: 30px;
}

form{
    width: 70%;
    padding: 30px 20px;
    border-radius: 20px;
}
.form-row{
    margin-bottom: 20px;
    input{
        font-size: 14px;
        color: #fff;
    }
    span{
        width: 14px;
        height: 14px;
        top: 14px;
        left: 15px;
        svg{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    
}
.eye-btn{
    padding: 0px;
    background-color: transparent;
    position: absolute;
    top: 5px;
    right: 14px;
}
.forgot-password{
    margin-top: -10px;
    margin-bottom:  20px;
}
button{
    padding: 10px;
    border-radius: 5px;
    font-size: 16px;
}

.bg-girl{
    display: none;
}
.error-msg{
    font-size: 10px;
}
}
/* Small <= 767px end*/
`;

export default Wrapper;