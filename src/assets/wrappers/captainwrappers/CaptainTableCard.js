import styled from "styled-components";

const Wrapper = styled.div`

width: 220px;
border-radius: 20px;


.card-img{
    width: 200px;
    height: 120px;
    border-radius: 16px;
    margin: 10px 10px 0px;
    .unbooked-img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
.booked-img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(8px);
}

.customer-name-unbooked{
    margin: 10px 0px;
    text-align: center;
    display: none;
    h3{
        color: #00418D;
        font-size: 16px;
        font-weight: 700;
        font-family: 'Montserrat', sans-serif;
        margin: 5px 0px;
    }
}

.customer-name-booked{
    display: inline;
}

.card-body{
    width: 100%;
    padding: 10px 15px 10px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h5{
        font-weight: 700;
        margin-bottom: 2px;
        color: #3F3F3F;
    }
    p{
        font-size: 12px;
        color: #999999;
        margin-bottom: 0px;
    }
}
.menu-button button{
    background-color: #00418D;
    color: #fff;
    border-style: none;
    padding: 5px 15px;
    border-radius: 7px;
    font-size: 12px;
}
.card-button{
    width: 100%;
    
}
.unbooked-btn {
    width: 100%;
    background-color: #00418D;
    color: #fff;
    border-style: none;
    padding: 10px;
}
.unbooked-btn-hidden{
    display: none;
}
.booked-btn{
    width: 100%;
    background-color:#999999;
    color:#fff;
    border-style: none;
    padding: 10px;
}
.booked-btn-hidden{
    display: none;
}


/* Small <= 768px start */
@media screen and (max-width: 768px){
width: 149px;
border-radius: 15px;

.customer-name-unbooked{
    margin: 5px 0px;
    text-align: center;
    h3{
        color: #00418D;
        font-size: 12px;
        font-weight: 700;
        font-family: 'Montserrat', sans-serif;
        margin: 5px 0px;
    }
}
.card-img{
    background-color: #000;
    width: 135px;
    height: 90px;
    border-radius: 12px;
    margin: 5px 5px 0px;
}
.card-body{
    width: 100%;
    padding: 5px 10px 5px 10px;
    h5{
        font-size: 16px;
    }
    p{
        font-size: 10px;
        color: #999999;
    }
}
.menu-button button{
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 10px;
}
.unbooked-btn {
    padding: 7px;
}
.booked-btn{
    padding: 7px;
}
}
/* Small <= 768px end */


`;

export default Wrapper;