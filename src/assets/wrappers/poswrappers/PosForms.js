import styled from 'styled-components'

const Wrapper = styled.main`
${'' /* grid-area: main;
height: calc(100vh - 90px);
background-color:#F5F9FF;
border-radius: 0px 25px 25px 0px;
margin-right: 20px; */}
${'' /* .page-content{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    padding: 30px 20px 0px 50px;
} */}

${'' /* form styles start */}

.custom-form{
    width: 100%;
    margin-top: 30px;
    padding: 30px;
    border-radius: 7px;
    background-color: #fff;
    color: #16335c;
    box-shadow: 1px 2px 3px 0px rgba(0,0,0,0.5);
}
form{
    width: 100%;
    display: flex;
    flex-direction: column;
}
.form-input-row{
    width: 100%;
    display:flex;
    margin: 10px 0px;
    column-gap: 30px;
}
.form-input{
    width: 50%;
}
.form-input-full{
    width: 100%;
}
input{
    width: 100%;
    padding: 5px 20px;
    border-radius: 7px;
    border: 1px solid #C1C1C1;
}
input::placeholder{
    font-size: 12px;
}
input:focus{
    outline: none;
    border: 1px solid #000;
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
    border: 1px solid #C1C1C1;
    border-radius: 7px;
    padding: 5px 10px;
}
.text-area{
    font-size: 12px;
}
.form-input-upload{
    width: 100%;
}
label{
    font-size: 18px;
}
.buttons{
    margin-top: 40px;
}
Button{
    margin-right: 30px;
}
.error-msg{
    color: red;
    font-size: 12px;
    margin-top: 3px;
}
${'' /* form styles end  */}

${'' /* pos add todays expenses form start */}
.checkbox-div{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    input{
        height: 15px;
        width: 15px;
        margin-right: 20px;
    }
}
${'' /* pos add todays expenses form end */}
`;

export default Wrapper;

