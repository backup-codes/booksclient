import styled from 'styled-components'

const Wrapper = styled.div`
    
    h3{
        color: #00305B;
        font-weight:  700;
        margin: 0px;
    }
    .header-content{
        display: flex;
        align-items: center;
    }
    ${'' /* .notification-div{
        width: 50px;
        height: 50px;
        position: relative;
        padding: 10px;
    }
    .notification-icon{
        width: 30px;
        height: 30px;
        color:#0059C2;
        
    }
    .notification-count{
        width: 18px;
        height: 18px;
        position: absolute;
        top: 7px;
        right: 7px;
        background-color: #4C9EFF;
        border-radius: 50px;
        color: #fff;
        p{
            font-size: 12px;
            font-weight: 700;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 1px;
        }
    } */}

.button{
    padding: 7px 20px;
    border-radius: 10px;
    background-color: #fff;
    margin: 0px 15px 0px 10px;
    border-style: none;
    display: flex;
    align-items: center;
    font-size: 14px;
}

.profile-div{
    width:45px;
    height: 45px;
    border-radius: 50px;
    img{
        width: 100%;
        height:100%;
        object-fit: cover;
    }
}


@media screen and (max-width: 768px){
    h3{
        font-size: 15px;
    }
    .button{
    padding: 5px 10px;
    margin: 0px 5px 0px 10px;
    font-size: 10px;
}
    .profile-div{
    width:35px;
    height: 35px;
    border-radius: 50px;
    img{
        width: 100%;
        height:100%;
        object-fit: cover;
    }
    }
}
`;

export default Wrapper;