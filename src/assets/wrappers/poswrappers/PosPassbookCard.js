import styled from 'styled-components'

const Wrapper = styled.div`
.card{
    background-color: #202123;
    padding: 20px;
    border-radius: 25px;
}

.card_header{
    display: flex;
    justify-content: space-between;
    text-transform: capitalize;
    margin-bottom: 20px;
}
.card-subtitle{
    color: #7C7E7F;
    font-weight: 700;
}

.card_body{
    display: flex;
    align-items: center;
}
.rupee-icon{
    font-size: 50px;
    margin-right: 10px;
}
.card_footer{
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}
.card-footer-link{
    text-decoration: none;
    color: #fff;
}
`;

export default Wrapper;