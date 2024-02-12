import styled from "styled-components";

const Wrapper = styled.main`
grid-area: main;
height: calc(100vh - 90px);
background-color:#F5F9FF;
border-radius: 0px 25px 25px 0px;
margin-right: 20px;
.page-content{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    padding: 30px 20px 0px 50px;
}

`;

export default Wrapper;