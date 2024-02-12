import Styled from "styled-components";

//image imports
import { CardBg } from "../../../assets/images";

const Wrapper = Styled.main`
.page-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
}

select{
  width: 200px;
}
.form-select:focus{
  box-shadow: none;
}
.dates{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
    column-gap: 5px;
}
  .date{
      display: flex;
      align-items: center;
      background-color: #fff;
      border-radius: 10px;
      padding: 5px 10px;
      label{
        font-size: 14px;
          margin: 0px 10px 0px 0px;
      }
  }
  .date-input{
    box-shadow: inset 0px 2px 6px #00000040; 
    border-radius: 50px;
    font-size: 10px;
  }

.search-btn{
  background-color: #00418D;
  padding: 10px 20px;
  margin-left: 5px;
  border-style: none;
  border-radius: 10px;
  color: #fff;
  font-size:12px;
}
.search-btn:hover{
  border-style: none;
  background-color:#7EB9FF;
}

.form-select{
    margin-top: 10px;
}
.form-select:focus{
    box-shadow: none;
}
.card-deck{
    display: flex;
    align-items: center;
    column-gap: 20px;
    row-gap: 10px;
    flex-wrap: wrap;
    margin: 40px 0px 30px 0px;
}
.card{
    width: 190px;
    text-align: center;
    margin: 20px 10px 0px 0px;
}
.quicklink-btn{
    width: 174px;
    background-color: transparent;
    border: 1px solid #2B8DFF;
    border-radius: 50px;
    color:#373737;
}
.quicklink-btn-active{
    color: #fff;
    background-color: #66ACFF;
    border-style:none;
    border-radius: 50px;
}
.card-body{
    padding: 10px;
}
.card-title{
    margin-bottom: 0px;
    font-size: 16px;
    font-weight: 700;
}
.card:hover{
    background-color:#00418e;
    color: #fff;
}

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
    width: 275px;
    border-style: none;
    border-radius: 15px;
    margin: 5px 5px;
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

export default Wrapper;
