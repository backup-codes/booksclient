import styled from "styled-components";
import { Modal } from 'antd';



const Wrapper = styled(Modal)`
.blurred-modal {
  /* Set the backdrop filter for the modal background */
  backdrop-filter: blur(100px);
}
.ant-modal-content{
    width: 100%;
    height: 500px;
    background-color: #F5F9FF;
    overflow-y: scroll;
}
.ant-modal-content::-webkit-scrollbar {
    width: 0;  /* This will hide the scrollbar in WebKit browsers */
}
.ant-modal-content {
    scrollbar-width: thin;  /* Firefox */
}
.ant-modal-content {
    -ms-overflow-style: none;  /* Internet Explorer/Edge */
}
.ant-modal-content::-webkit-scrollbar,
.ant-modal-content {
    scrollbar-width: none;  /* Firefox */
}
.content{
    width: 100%;
    height: 100%;
}
.title{
    font-weight: 700;
    color: #393939;
    margin: 20px 0px;
    font-family: 'Montserrat', sans-serif;
}
.top-content{
    width: 100%;
    display: flex;
    column-gap: 8px;
    margin-bottom: 20px;
    .input-div{
        width: 100%;
        position:relative;
    }
    input{
        width: 100%;
        border: 1px solid #C8E1FF;
        border-radius: 7px;
        padding: 7px 20px;
    }
    .filter-icon{
        position:absolute;
        top: 12px;
        right: 20px;
        color: #00418D;
    }
}

.sub-title{
    font-weight: 700;
    color: #393939;
    margin-bottom: 20px;
    font-family: 'Montserrat', sans-serif;
}

.menu-cards{
    width: 70%;
}

.modal-buttons{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
}
.modal-btn{
    width: 200px;
    border-radius: 10px;
    background: #00418D;
    color: #fff;
    border-style: none;
    padding: 10px 30px;
}
.btn-icon{
    margin-right: 7px;
}

`;

export default Wrapper;