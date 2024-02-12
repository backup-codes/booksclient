import styled from "styled-components";
import { Modal } from 'antd';

const Wrapper = styled(Modal)`


.ant-modal-content{
    width: 100%;
    background-color: #F5F9FF;
    padding: 80px 0px;
}

.content-div{
    width: 100%;
    display: flex;
    justify-content: center;
}

input{
    width: 50%;
    height: 48px;
    border-radius: 7px;
    border: 1px solid #A7CFFF;
    padding: 0px 10px;
    font-size: 14px;
}
input::placeholder{
    font-size: 10px;
    color: #6A6A6A;
}

.add-btn{
    padding: 10px 30px;
    margin-left: 20px;
    border-style: none;
    border-radius: 7px;
    background-color: #000;
    color: #fff;
}


`;

export default Wrapper;