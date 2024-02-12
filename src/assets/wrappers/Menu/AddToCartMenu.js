import styled from "styled-components";

const Wrapper = styled.div`
padding: 8px 10px;
.card{
    border-radius: 25px;
    border-style: none;
    box-shadow: 0px 4px 7px 0px #C8E1FF;
    padding: 0px 20px;
}
.card-body{
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 20px;
    font-family: 'Montserrat', sans-serif;
}
.image-div{
    width: 14%;
    height: 100px;
    border-radius: 100px;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
.content{
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

}
.menu-title{
    text-transform: capitalize;
    font-weight: 600;
    font-size: 16px; 
    color:#393939;
    margin: 0;
}
.menu-price{
    color:#3A3A3A
    font-weight: 600;
    font-size: 20px;
    margin: 0;
}
.discount{
    color:red;
    font-size: 20px;
    font-weight: 600;
    text-decoration: line-through;
    margin: 0;
}
.count-div{
    ${'' /* width: 25%; */}
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 15px;
}
.increase-decrease-div{
    display: flex;
}
.quantity{
    text-transform: capitalize;
    font-weight: 500;
    font-size: 15px;
    color:#4D4D4D;
}
.count{
    width: 30px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.decrease, .increase{
    width: 30px;
    height: 25px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-style: none;
}

.decrease{
    background: #C8E1FF;
}
.increase{
    background: #00418D;
}

.checkbox-div{
    width: 25px;
    height: 25px;
    margin-right: 10px;
    input{
        width: 100%;
        height: 100%;
        outline: 12px solid #c00;
        cursor: pointer;
    }
}
.checkbox-div>input:checked{
    accent-color: green;
    appearance: auto;
}
.checkbox-div>input:hover{
    accent-color: #00305B;
}


/* 768px >= Medium <= 1024 start*/

@media screen and (min-width: 768px) and (max-width: 1024px) {
.image-div{
    width: 14%;
    height: 110px;

}
}

/* 768px >= Medium <= 1024 end */


/* small <= 768px start */
@media screen and (max-width: 768px)  {
padding: 5px;
.card{
    border-radius: 15px;
    padding: 0px;
}
.card-body{
    column-gap: 7px;
    padding: 10px;
}
.image-div{
    width: 20%;
    height: 55px;
    background-color: #000;

}
.content{
    width: 50%;
}
.menu-title{
    font-size: 12px;
}
.menu-price{
    font-size: 14px;
}
.count-div{
    width: 30%;
    row-gap: 5px;
    ${'' /* padding: 5px; */}
}
.quantity{
    font-size: 10px;
}
.count{
    font-size: 14px;
    width: 30px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.decrease, .increase{
    width: 20px;
    height: 16px;
}

.decrease{
    background: #C8E1FF;
}
.increase{
    background: #00418D;
}

.checkbox-div{
    width: 18px;
    height: 18px;
    margin-right: 0px;
}
}
/* small <= 768px start */

`;

export default Wrapper;