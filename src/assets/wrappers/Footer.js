import styled from 'styled-components';
import { FooterBG } from '../images/landing-images';

const Wrapper = styled.footer`
width: 100%;
height: 80vh;
background-color: #F7FAFD;
margin-top: 70px;
color: #fff;

.background{
    width: 100%;
    height: 100%;
    background-image: url(${FooterBG});
    background-repeat: no-repeat;
    background-size:cover ;
    background-size: 100% 100%;
    display: flex;
    align-items: center; 
    justify-content: center;
    position: relative;
}
.bg-images{
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: end;
}
.content{
    width: 100%;
    padding: 0px 100px;
    z-index: 5;
}
.details{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
}
.logo{
    width: 100px;
    height: 100px;
    position: absolute;
    bottom: 0px;
    z-index: 10;
}
h3{
    color: #BBDAFF;
    font-weight: 700;
    text-transform: capitalize;
    margin-bottom: 20px;
}
a{
    text-decoration: none;
    color:  #fff;
}
.icon{
    font-size: 20px;
    margin-right: 10px;
}
.socials{
    width: 250px;
    display: flex;
    justify-content: space-between;
    img{
        width: 30px;
        height: 30px;
    }
}

.input-div{
    display: flex;
    align-items: center;
    border-bottom: 1px solid #fff;
    margin-top: 10px;
}

input{
    background: transparent;
    border-style: none;
    border-radius: 0px;
    color: #fff;
}

::placeholder{
    color: #fff;
    opacity: 1;
    font-size: 10px;
}
input:focus{
    background-color: transparent;
    border-style: none;
    color: #fff;
    box-shadow: none;
}
.message{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    textarea{
        resize: none;
        background-color: #fff;
        border-radius: 10px;
    }
    ::placeholder{
        color: #000;
        opacity: 1;
    }
    button{
        background-color: #66ACFFE5;
        margin-left: 10px;
    }
}

/*  RESPONSIVENESS START*/
/* 768px >= Medium <= 1024start*/

@media screen and (min-device-width: 768px) and (max-device-width: 1024px) {
height: 40vh;
margin-top: 20px;
.bg-images{
    img{
        width: 200px;
    }
}
.content{
    padding: 0px 30px;
}
h3{
    font-size: 20px;
    margin-bottom: 20px;
}
p{
    font-size: 14px;
}
.icon{
    font-size: 16px;
    margin-right: 5px;
}
.socials{
    width: 200px;
    img{
        width: 25px;
        height: 25px;
    }
}
}
/* 768px >= Medium <= 1024 end */

/* Small <= 768px start*/
@media screen and (min-width: 320px) and (max-width:767px){
width: 100%;
height: 90vh;
background-color: #00007d;
margin-top: 50px;
color: #fff;

.background{
    background: transparent;
}
.bg-images{
    display: none;
}
.content{
    padding: 0px 20px;
}
.details{
    flex-direction: column;
    align-items: center;
    padding-bottom: 100px;
}
.detail-content{
    margin-top: 20px;
    text-align: center;
}
h3{
    font-size: 16px;
    text-align: center;
    margin-bottom: 15px;
}
p{
    font-size: 12px;
    margin-bottom: 5px;
}
.icon{
    font-size: 12px;
    margin-right: 10px;
}
.socials{
    width: 200px;
    margin-top: 20px;
    img{
        width: 30px;
        height: 30px;
    }
}
.footer-form{
    width: 100%;
    display: flex;
       align-items: center;
       flex-direction: column;
    div{
       display: flex;
       justify-content: center;
    
    }
}
.input-div{
    margin-top: 0px;
    margin-bottom: 10px;
}

input{
    font-size: 12px;
}

.message{
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    textarea{
        resize: none;
        background-color: #fff;
        border-radius: 10px;
    }
    ::placeholder{
        color: #000;
        opacity: 1;
    }
    button{
        width: 50%;
        background-color: #66ACFFE5;
        margin-left: 10px;
        font-size: 12px;
    }
}
}
/* Small <= 768px end*/


`;

export default Wrapper;