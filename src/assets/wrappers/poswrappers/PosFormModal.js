import styled from "styled-components";
import { Modal } from "antd";

const Wrapper = styled(Modal)`
  .ant-modal-content {
    width: 100%;
    background-color: #f5f9ff;
  }
  .title {
    text-align: center;
    font-weight: 700;
    color: #393939;
    margin: 20px 0px;
    font-family: "Montserrat", sans-serif;
  }

  .form-div {
    margin-top: 40px;
  }
  .form-row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 20px;
  }
  .form-group {
    width: 50%;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  .form-group-full {
    width: 100%;
    margin-bottom: 20px;
  }
  label {
    color: #393939;
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    font-size: 16px;
  }
  input {
    border-radius: 7px;
    border: 1px solid #a7cfff;
    padding: 10px 20px;
    font-size: 14px;
  }
  input::placeholder {
    font-size: 10px;
    color: #6a6a6a;
  }

  select {
    height: 48px;
    border-radius: 7px;
    border: 1px solid #a7cfff;
    padding: 0px 10px;
    font-size: 14px;
  }
  select:focus {
    box-shadow: none;
  }
  .form-btn{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 30px 0px;
  }
button{
    background-color: #00418d;
    color: #fff;
    padding: 10px 25px;
    border-style: none;
    border-radius: 12px;
    font-family: "Montserrat", sans-serif;
    margin-right: 10px;
}
${'' /* .submit-btn{
    background-color: #00418d;
    color: #fff;
    padding: 15px 10px;
    border-style: none;
    border-radius: 12px;
    font-family: "Montserrat", sans-serif;
} */}
  ${'' /* .form-btn button:first-child {
    background-color: #00418d;
    color: #fff;
    padding: 15px 10px;
    border-style: none;
    border-radius: 12px;
    font-family: "Montserrat", sans-serif;
  } */}

  ${'' /* .form-btn button:last-child {
    background-color: #00418d;
    color: #fff;
    padding: 15px 10px;
    border-style: none;
    border-radius: 12px;
    font-family: "Montserrat", sans-serif;
  } */}

  .error-msg {
    color: red;
    font-size: 10px;
    font-weight: 400;
    margin-top: 3px;
  }

  ${"" /* print bill order summary start */}
  ${"" /* dine in order summary start  */}
.bill-header {
    width: 100%;
    padding: 0px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .restaurant-header {
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 15px;
    p {
      font-size: 12px;
      font-weight: 500;
      margin-bottom: 0px;
    }
  }
  .header-div {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .header-info > p {
    font-size: 12px;
    margin: 0px;
  }
  ${"" /* dine in order summary start  */}
  .summary-items {
    padding: 20px 30px;
  }
  .summary-heading {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      font-weight: 700;
    }
  }
  .single-item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #c1c1c1;
    margin-bottom: 5px;
    p {
      font-size: 16px;
      margin-bottom: 5px;
    }
  }
  .menu-item-name {
    width: 60%;
  }
  .quantity {
    text-align: center;
    width: 15%;
    color: #b6b6b6;
  }
  .price {
    text-align: center;
    width: 15%;
    font-weight: 600;
    font-size: 14px;
  }
  .total {
    text-align: center;
    padding: 0px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      font-weight: 700;
      font-size: 16px;
    }
  }
  .gst {
    p {
      font-weight: 400;
      font-size: 14px;
      margin-bottom: 0px;
    }
  }
  ${"" /* print bill order summary end */}

  ${"" /* table booking form content start */}
.card-div {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  .card {
    width: 60%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    column-gap: 20px;
    border-radius: 12px;
    border-style: none;
  }
  .card-img {
    width: 80px;
    height: 80px;
    background-color: #000;
    border-radius: 12px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .table-form-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 20px;

    input {
      width: 60%;
    }
  }

  .radio-div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 10px;
    div {
      width: 60%;
      text-align: center;
    }
  }
  .radio-btn {
    width: 100%;
    display: flex;
    columns-gap: 10px;
    justify-content: center;
    margin: 5px 0px;
    font-weight: 500;
    input {
      width: 24px;
      height: 24px;
      margin-right: 10px;
      accent-color: #00418d;
    }
  }

  ${"" /* table booking form content end */}

  @media screen and (max-width: 768px){
   ${'' /* .ant-modal-content {
    width: 100%;
    background-color: #f5f9ff;
  } */}
  ${'' /* .title {
    text-align: center;
    font-weight: 700;
    color: #393939;
    margin: 20px 0px;
    font-family: "Montserrat", sans-serif;
  } */}

  ${'' /* .form-div {
    margin-top: 40px;
  } */}
  .form-row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 20px;
  }
  .form-group {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  .form-group-full {
    width: 100%;
    margin-bottom: 20px;
  }
  label {
    color: #393939;
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    font-size: 16px;
  }
  input {
    border-radius: 7px;
    border: 1px solid #a7cfff;
    padding: 10px 20px;
    font-size: 14px;
  }
  .error-msg {
    color: red;
    font-size: 10px;
    font-weight: 400;
    margin-top: 3px;
  }

  ${"" /* table booking form content start */}
.card-div {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  .card {
    width: 90%;
  }
   .table-form-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 10px;
    input {
      width: 90%;
    }
  }

  ${"" /* table booking form content end */}
  }
`;

export default Wrapper;
