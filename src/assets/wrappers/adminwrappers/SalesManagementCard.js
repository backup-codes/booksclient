import styled from "styled-components";



const Wrapper = styled.div`
//sales card

.sales-card-deck{
    width: 100%;
    margin: 30px 0px;
}
.container{
    padding-top: 0px;
}
.sales-card{
    background: linear-gradient(to bottom,#2B8DFF,#2b8eff45);
    color: #fff;
    padding: 20px 10px;
    width: 285px;
    border-style: none;
    border-radius: 15px;
    h2{
        margin:0px;
    }
}
.card-body{
   z-index: 5;
}
.sales-card-title{
    font-size: 12px;
    margin-bottom: 20px;
    font-weight: 400;

}
.card-bg{
  width: 250px;
  height: 80px;
  background: url(${CardBg});
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  bottom: 0;
  right:0;
}

`;

export default Wrapper
