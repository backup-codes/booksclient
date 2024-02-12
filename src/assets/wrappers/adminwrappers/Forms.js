import styled from "styled-components";

const Wrapper = styled.main`
h3{
    color: #000;
    padding-bottom: 5px;
}
p{
    margin-top: -5px;
    color: #9e9ea4;
}
.password-input{
    position: relative;
}
.eye-btn{
    color: #00418D;
    font-size: 24px;
    padding: 0px;
    background-color: transparent;
    position: absolute;
    top: 38px;
    right: 25px;
}
.custom-form{
    width: 100%;
    margin: 10px 0px 30px 0px;
    padding: 30px;
    background-color: #fff;
    color: #16335c;
    box-shadow: 1px 2px 3px 0px rgba(0,0,0,0.5);
    border-radius: 25px;
}
form{
    width: 100%;
    display: flex;
    flex-direction: column;
}
.ant-space-item{
    width: 100%;
}
.ant-form-item{
    margin-bottom: 0px;
}
.minus-circle svg{
    color: red;
    width: 20px;
    height: 20px;
}
.form-input-row{
    width: 100%;
    display:flex;
    margin: 10px 0px;
    column-gap: 30px;
    justify-content: space-between;
    align-items: center;
}
.form-commodity-row{
width: 100%;
display:flex;
align-items: center;
}
.form-input{
    width: 50%;
}
.form-input-full{
    width: 100%;
}
input{
    width: 100%;
    font-size: 14px;
    padding: 12px 20px;
    border-radius: 7px;
    border: 1px solid #A7CFFF;
}
input::placeholder{
    font-size: 12px;
}
input:focus{
    outline: none;
    border: 1px solid #000;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

${'' /* .eye-btn {
    padding: 0px;
    background-color: black;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2; 
} */}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
${'' /* file upload styles start  */}
.file-upload{
    width: 100%;
    border-radius: 7px;
    border: 2px dashed #A7CFFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 10px;
    padding: 10px;
    cursor: pointer;
}
input[type="file"]{
    display: none;
}
.upload-icon{
    font-size: 24px;
    color: #2B8DFF;
    border: 1px solid #2B8DFF;
    padding: 10px 15px;
    border-radius: 100px;
}
.browse-btn{
    background-color: #2B8DFF;
    color: #fff;
    font-size: 12px;
    padding: 10px 30px;
    border-radius: 7px;
    border-style: none;
}
${'' /* file upload styles end  */}


${'' /* radio button style start */}
.radio-div{
    width: 100%;
    display: flex;
    column-gap: 20px;
    row-gap: 10px;
    flex-wrap: wrap;
}
.payment-btn-div{
    padding: 20px;
    position: relative;
}
.payment-btn{
    width: 100px;
    height: 60px;
    font-size: 14px;
    color: #2B8DFF;
    font-weight: 700;
    padding: 10px;
    box-shadow: 0px 4px 15px 0px #C8E1FF;
    text-align: center;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.payment-btn>span{
    width: 25px;
    height: 25px;
    color: #fff;
    position: absolute;
    right: 10px;
    top: 10px;
    background-color: #2B8DFF;
    border: 2px solid #fff;
    border-radius: 100px;
    display: none;
}
.payment-btn-active{
    border: 1px solid #407BFF;
    background-color: #CEE4FD;
}
.payment-btn-active>span{
    display: block;
}
${'' /* radio button style end */}

.form-select{
    padding: 14px 20px;
    border: 1px solid #A7CFFF;
    font-size: 12px;
    font-color: #828482;
}
.form-select option{
    font-size: 16px;
    padding: 10px;
}
.form-select option:hover{
    background-color: #A7CFFF;
}
.form-select:focus{
    box-shadow: none;
}
.form-input-textarea{
    width: 100%;
}
.text-area{
    width:100%;
    height:200px;
    overflow:auto;
    resize:none;
    border: 1px solid #A7CFFF;
    border-radius: 7px;
    padding: 12px 20px;
}
.text-area{
    font-size: 12px;
}


${'' /* add or update ingredients form style in vendor management start*/}
.form-input-radio{
    display: flex;
    align-items: center;
    align-items: flex-start;
    justify-content: flex-start;
    column-gap: 50px;
    input{
        width: 15px;
        height: 15px;
    }
    label{
        margin-left: 5px;
        margin-top: 3px;
        font-size: 14px;
    }
    .radio-input{
        display: flex;
        align-items: center;
    }
}
${'' /* add or update ingredients form style in vendor management start*/}

.form-input-upload{
    width: 100%;
}
label{
    font-size: 18px;
}
.buttons{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 40px 0px 20px 0px;
}
button{
    border-style: none;
    padding: 10px 50px;
}
.submit-btn{
    margin-right: 30px;
    background-color:#00418D;
}
.cancel-btn{
    background-color: #7EB9FF;
}
.error-msg{
    color: red;
    font-size: 12px;
    margin-top: 7px;
}

.error-msg-autocomplete{
    color: red;
    font-size: 12px;

}

.upload-info {
    font-size: 12px;
    color: #999; /* Adjust the color as needed */
    margin-left: 5px; /* Adjust the margin as needed */
  }

.ant-form-item-explain-error{
    color: red;
    font-size: 12px;
}

${'' /* cash denomination style start */}
.denomination-label{
    width: 10%;
}
.denomination-toggle{
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.denomination-input-toggle{
    display:flex;
    column-gap: 10px;
    align-items: center;
    padding: 5px 10px;
}
.prepend-btn, .append-btn{
    color: #2B8DFF;
    border-radius: 6px;
    background: #FFF;
    box-shadow: 0px 4px 5px 0px #C8E1FF;
    display: flex;
    align-items: center;
    padding: 4px 20px;
    border-radius: 7px;
}
.denomination-input{
    width: 150px;
    border-radius: 7px;
    border: 1px solid #A7CFFF;
    background: #FFF;
    padding: 5px;
    text-align: center;
}
.denomination-total{
    width: 15%;
    margin-left: 30px;
}

${'' /* cash denomination style end */}



@media screen and (max-width: 768px){
h3{
    font-size: 20px;
}
.custom-form{
    width: 100%;
    margin: 10px 0px 30px 0px;
    padding: 20px 15px;
    border-radius: 15px;
}
.form-input-row{
    flex-wrap: wrap;
    margin: 5px 0px;
    column-gap: 10px;
    row-gap: 10px;
}
.form-input{
    width: 100%;
}
.form-input-full{
    width: 100%;
}
label{
    font-size: 12px;
}
input{
    font-size: 12px;
    padding: 7px 10px;
}
input::placeholder{
    font-size: 10px;
}
${'' /* file upload styles start  */}
.file-upload{
    width: 100%;
    border-radius: 7px;
    border: 2px dashed #A7CFFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 10px;
    padding: 10px;
    cursor: pointer;
}
.form-input-upload{
    width: 100%;
}
input[type="file"]{
    display: none;
}
.upload-icon{
    font-size: 24px;
    color: #2B8DFF;
    border: 1px solid #2B8DFF;
    padding: 10px 15px;
    border-radius: 100px;
}
.browse-btn{
    background-color: #2B8DFF;
    color: #fff;
    font-size: 12px;
    padding: 10px 30px;
    border-radius: 7px;
    border-style: none;
}
${'' /* file upload styles end  */}


${'' /* radio button style start */}
.radio-div{
    width: 100%;
    display: flex;
    column-gap: 20px;
    row-gap: 10px;
    flex-wrap: wrap;
}
.payment-btn-div{
    padding: 20px;
    position: relative;
}
.payment-btn{
    width: 100px;
    height: 60px;
    font-size: 14px;
    color: #2B8DFF;
    font-weight: 700;
    padding: 10px;
    box-shadow: 0px 4px 15px 0px #C8E1FF;
    text-align: center;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.payment-btn>span{
    width: 25px;
    height: 25px;
    color: #fff;
    position: absolute;
    right: 10px;
    top: 10px;
    background-color: #2B8DFF;
    border: 2px solid #fff;
    border-radius: 100px;
    display: none;
}
.payment-btn-active{
    border: 1px solid #407BFF;
    background-color: #CEE4FD;
}
.payment-btn-active>span{
    display: block;
}
${'' /* radio button style end */}

.form-select{
    padding: 7px 10px;
    font-size: 10px;
}
.form-select option{
    font-size: 12px;
}

.buttons{
    margin: 20px 0px;
}
button{
    font-size: 12px;
    padding: 7px 20px;
}
.error-msg{
    font-size: 8px;
}
 
}
`;

export default Wrapper;