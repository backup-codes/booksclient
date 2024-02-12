import styled from "styled-components"

const Wrapper = styled.div`
h4{
    font-weight: 700;
}


.card-deck{
    width: 80%;
    background-color: rgba(255,255,255, 0.7);
    border-radius: 15px;
    padding: 30px;
    display: flex;
    column-gap: 30px;
    flex-wrap: wrap;
}

.online-orders-card{
    
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: 15px;
    margin: 5px 0px;
}

.cardbody{
    display: flex;
    justify-content: center;
    align-items: center;
    
}
.card-title{
    margin:0px;
    font-size: 25px;
    font-weight: 700;
    z-index: 5;
}
.swiggy{
    color: #fff;
    background-color:#FDB36E;
}
.swiggy-icon{
    position: absolute;
    top: 6px;
    left:0px;
    font-size: 100px;
    color: #FFF1DD4D;
}
.zomato{
    color: #fff;
    background-color:#FF6060;
}
.zomato-title{
    font-size: 100px;
    z-index: 5;
}
.zomato-icon{
    position: absolute;
    top: -40px;
    left: 0px;
    font-size: 190px;
    color: rgba(255,255,255,0.2);
}
.bromag{
    color: #fff;
    background-color:#393939;
    text-transform: uppercase;
}
.bromag-icon{
    position:absolute;
    top:10px;
    left: -20px;
}
.others{
    color: #fff;
    background-color:#8FC2FF;
}
.others-icon{
    width: 80px;
    height: 120px;
    position:absolute;
    top:0px;
    left: 0px;
}
`;

export default Wrapper;