import styled from "styled-components";

const Wrapper = styled.div`
.card{
    width: 23rem;
    padding: 10px;
    display: flex;
    flex-direction: column;
    column-gap: 20px;
    border-style: none;
    border-radius:14px;
    position: relative;
}
.percentage{
    background-color: #FF6363;
    color: #fff;
    height: 40px;
    width: 150px;
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -5px;
    left: -60px;
    transform: rotate(-45deg);
}
.toggle-edits-div{
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.toggle-switch-div{
    padding: 10px;
}
.delete-edit{
    display: flex;
    column-gap: 5px;
    padding: 10px;
}
.action-icon{
    font-size: 20px;
    padding: 5px;
    box-shadow: 0px 3px 10px 0px #C8E1FF;
    border-radius: 5px;
    background-color: #ff;
    display: flex;
    align-items: center;
    justify-content: center;
}
.edit-icon{
    color: #00418D;
    cursor: pointer;
}
.delete-icon{
    color: #FF6363;
    cursor: pointer;
}
.card-body{
    display: flex;
    column-gap: 20px;
    padding: 5px 10px;
    margin-top: 5px;
}
.card-img{
    width: 25%;
    height: 70px;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
.card-content{
    width: 45%;
}
h4{
    font-weight: 700;
    font-size: 18px;
    margin: 0px;
    text-transform: capitalize;
}

p{
    font-size: 10px;
    margin: 0px;
}
.truncate{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    ${'' /* display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2; */}
}
.card-buttons{
    width: 100%;
    display: flex;
    align-items: center;
    column-gap: 15px;
    justify-content: space-between;
}


.view-button {
    position: absolute;
  bottom: 10px;
  right: 10px;
  border-radius: 30px;
  color: #ffffff;
  background-color: #00418D;
  padding: 12px 12px 8px 12px;
  cursor: pointer;
  border: none;
  outline: none;
  font-weight: bold;
  font-size: 12px;
  line-height: 1.3;
  display: flex;
  align-items: center;
  }

.price-div{
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 10px;
    margin-top: 5px;
}
h5{
    font-size: 18px;
    margin: 0px;
    font-weight: 700;
    text-transform: capitalize;
}
.discount{
    color:red;
    text-decoration: line-through;
}
.quantity{
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    ${'' /* justify-content: center; */}
    row-gap: 5px;
    p{
        font-weight: 700;
        font-size: 15px;
        ${'' /* margin-bottom: 8px; */}
    }
}
.count-div{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 3px;
    div{
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px;
        border-radius: 5px;
    }
    p{
        font-weight: 700;
        font-size: 16px;
    }
}
.increase{
    width: 22px;
    background-color: #00418D;
    color: #fff;
}
.decrease{
    width: 22px;
    background-color:#C8E1FF;
    color: #fff;

}

${'' /* toggle button style start */}
.switch{
    position: relative;
    display: inline-block;
    width: 50px;
    height: 25px;
    display: flex;
    align-items: center;
}

.switch input{
    opacity: 0;
    width: 0;
    height: 0;
}
.slider{
    position: absolute;
    cursor: pointer;

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50px;
    background-color: #C4DFFF;
    transition: 0.4s;
}
.slider:before{
    border-radius: 50px;
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 3px;
    background-color: #fff;
    transition: 0.4s;
}
input:checked+.slider{
    background-color:#00418D;
}
input:checked+.slider:before{
    transform: translateX(22px); 

}
${'' /* toggle button style end */}

`;

export default Wrapper;