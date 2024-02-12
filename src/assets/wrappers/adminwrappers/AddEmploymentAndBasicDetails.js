import styled from 'styled-components'

const Wrapper = styled.main`
grid-area: main;
background-color: #F3F3F3;
padding: 20px 20px;
color: rgba(255, 255, 255, .95);
overflow-y: scroll;
h3{
    color: #000;
    padding-bottom: 5px;
}
p{
    margin-top: -5px;
    color: #9e9ea4;
}
.employee-form{
    margin-top: 30px;
    padding: 30px;
    border-radius: 7px;
    background-color: #fff;
    color: #16335c;
    box-shadow: 1px 2px 3px 0px rgba(0,0,0,0.5);
    
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
`;

export default Wrapper;