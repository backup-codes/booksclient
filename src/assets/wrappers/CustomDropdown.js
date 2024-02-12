import styled from 'styled-components'

const Wrapper = styled.div`

.dropdown-div{
    display: flex;
    align-items: center;

}

.dropdown{
    width: 100%;
    cursor: pointer;
    position: relative;
}

.dropdown-btn{
    color: #fff;
    background-color: #202123;
    padding: 5px 20px;
    border-radius: 7px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.icon{
    font-size: 24px;
    margin: 0px;
}

.dropdown-content{
    width: 100%; 
    position: abosolute;
    top: 20px;
    background-color: #fff;
    color: #000;
    font-size: 16px;
    margin-top: 3px;
    padding: 10px 10px;
    box-shadow: 0px 7px 5px 7px rgba(0,0,0,0.5);
}

.dropdown-item{
    transition: all 0.2s;
    padding: 5px 10px;
}


.dropdown-item:hover{
    background: #f4f4f4;
    color:#334b72;
    font-weight:300px;
}

.selected-input{
    padding: 5px 10px;
    border: 1px solid #e2e6e9;
    border-radius: 7px;
}
`;

export default Wrapper;