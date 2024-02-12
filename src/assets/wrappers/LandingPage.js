import styled from 'styled-components'
import { LandingBg } from '../images/landing-images';

const Wrapper = styled.section`
width: 100vw;
height: 100vh;
color: #3D3D3D;
overflow: auto;
nav{
    vertical-align: middle;
    background-color: #F7FAFD;
    a{
        text-decoration: none;
    }
    .container{
        padding: 0px;
    }
    button{
        border-radius: 25px;
        background-color:#66ACFFE5;
        border-style: none;
        padding: 5px 30px;
        display: flex;
        align-items: center;
    }

}
.landing-page{
    height: calc(100% - 120px);
    background-color: #F7FAFD;
    background-image: url(${LandingBg});
    background-size: cover;
    background-repeat: no-repeat;
    margin-bottom: 70px;
}
.banner{
    height: 100%;
    display: flex;
    align-items: center;
}
h1{
    font-size: 35px;
    width: 60%;
    font-weight: 700;
    margin-top: -100px;
    span{
        color: #00418E;
    }
}
h2{
    text-align:center;
    color: #464646;
    font-weight: 700;
    font-size:45px;
    padding-bottom: 30px;
}

.subcontent{
    width: 100%;
    height: 80%;
    padding:  100px 0px;
    position: relative;
}
.bullet{
    color: #6A6A6A;
    display: flex;
    svg{
        width: 24px;
        height: 24px;
        margin: -1px 5px 0px 0px;
    }
    p{
        width: 80%;
    }
}

.left-subcontent-bg{
    width: 80%;
    height: 80%;
    background-color:#E9F3FF;
    transform: rotate(-3deg);
    position: absolute;
    top: 10%;
    left: -100px;
}
.left-sub-content{
    width: 80%;
    padding: 100px 290px 100px 100px ;
    background-color: #FBFBFF;
    transform: rotate(0deg);
    right: 100px;
}
.left-subcontent-img{
    position: absolute;
    top: 180px;
    right: 120px;
}
.left-subcontent-img2{
    position: absolute;
    top: 150px;
    right: 230px;
}

.right-subcontent{
    display: flex;
    justify-content: flex-end;
}
.right-subcontent-bg{
    width: 80%;
    height: 80%;
    background-color:#E9F3FF;
    transform: rotate(3deg);
    margin-left: 300px;
    position: absolute;
    top: 10%;
    right: -100px;
}
.right-sub-content{
    width: 80%;
    padding: 100px 100px 100px 290px;
    background-color: #FBFBFF;
    transform: rotate(0deg);
    right: 100px;
}
.right-subcontent-img{
    position: absolute;
    top: 180px;
    left: 120px;
}
.right-subcontent-img2{
    position: absolute;
    top: 150px;
    left: 230px;
}


/*  RESPONSIVENESS START*/

/* 768px >= Medium <= 1024 start*/

@media screen and (min-device-width: 768px) and (max-device-width: 1024px){
.landing-page{
    height: calc(50% - 120px);
    margin-bottom: 0px;
    background-size: contain;
}
.banner{
    height: 100%;
}
h1{
    font-size: 22px;
    width:50%;
}
.landing-img{
    width: 50%;
    margin-bottom: -20px;
}

h2{
    font-size:25px;
    padding-bottom: 10px;
}
.subcontent{
    width: 100%;
    height: 80%;
    padding:  80px 0px;
}

.bullet{
    p{
        font-size: 14px;
    }
}
.left-subcontent-bg{
    height: 77%;
    top: 12%;
}
.left-sub-content{
    width: 80%;
    padding: 60px 70px 60px 30px ;
}
.left-subcontent-img{
    width: 250px;
    top: 170px;
    right: 40px;
}
.left-subcontent-img2{
    width: 120px;
    top: 140px;
    right: 100px;
}


.right-subcontent-bg{
    height: 77%;
    top: 12%;
}
.right-sub-content{
    width: 80%;
    padding: 60px 0px 60px 140px;
    right: 100px;
}
.right-subcontent-img{
    width: 250px;
    top: 170px;
    left: 40px;
}
.right-subcontent-img2{
    width: 120px;
    top: 140px;
    left: 100px;
}
}

/* 768px >= Medium <= 1024 end */
`;

export default Wrapper;