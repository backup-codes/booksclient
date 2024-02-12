import styled from "styled-components";

const Wrapper = styled.main`

  
  .top-content {
    width: 100%;
    display: flex;
    column-gap: 8px;
    margin-bottom: 20px;
    .input-div {
      width: 100%;
      position: relative;
    }
    input {
      width: 100%;
      border: 1px solid #c8e1ff;
      border-radius: 7px;
      padding: 7px 20px;
    }
    select {
      width: 100%;
      border: 1px solid #c8e1ff;
      border-radius: 7px;
      padding: 9px 20px;
    }
    .filter-icon {
      position: absolute;
      top: 12px;
      right: 20px;
      color: #00418d;
    }
  }
  .sub-title {
    font-weight: 700;
    color: #393939;
    margin-bottom: 20px;
    font-family: "Montserrat", sans-serif;
  }
  .menu-cards {
    width: 70%;
  }
  .modal-buttons {
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    position: sticky;
    bottom: 0px;
    left: 0px;
    background-color: #F5F9FF;
  }
  .modal-btn {
    width: 200px;
    border-radius: 10px;
    background: #00418d;
    color: #fff;
    border-style: none;
    padding: 10px 30px;
  }

  .modal-btn1:disabled,
  .modal-btn1[disabled] {
    width: 200px;
    border-radius: 10px;
    background: #00418d;
    color: #fff;
    border-style: none;
    padding: 10px 30px;
    opacity: 0.5; /* Example: Reduce opacity for a disabled look */
    cursor: not-allowed;
  }

  .btn-icon {
    margin-right: 7px;
  }

  
/* 768px >= Medium <= 1024 start*/

@media screen and (min-width: 768px) and (max-width: 1024px) {
.menu-cards {
    width: 100%;
  }
}
/* 768px >= Medium <= 1024 end*/


/* small <= 768px start */

@media screen and  (max-width: 768px) {
h2{
  font-size: 18px;
}
  .top-content {
    width: 100%;
    display: flex;
    column-gap: 8px;
    margin-bottom: 20px;
    .input-div {
      width: 33%;
      position: relative;
    }
    input {
      padding: 5px;
      font-size: 10px;
    }
    select {
      padding: 5px;
      font-size: 8px;
    }
    select:focus{
      box-shadow: none;
    }
  }
  .sub-title {
    font-size: 16px;
  }
  .menu-cards {
    width: 100%;
  }
  .modal-buttons {
    height: 10%;
  }
  .modal-btn {
    width: 100px;
    font-size: 8px;
    padding: 7px 10px;
    border-radius: 7px;
  }
  .modal-btn1:disabled,
  .modal-btn1[disabled] {
    width: 100px;
    border-radius: 7px;
    padding: 7px 10px;
  }
  .btn-icon {
    margin-right: 5px;
  }
}

/* small <= 768px  end */

`;

export default Wrapper;
