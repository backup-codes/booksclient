import styled from 'styled-components'

const Wrapper = styled.main`
.page-header{
    margin-bottom: 20px;
}
h2{
    font-weight: bold;
    text-transform: capitalize;
}
.card-deck{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    column-gap: 30px;
    row-gap: 30px;
}

/* Small <= 768px start */
@media screen and (max-width: 768px){
    h2{
        font-size: 20px;
    }
    .card-deck{
        column-gap: 10px;
        row-gap: 15px;
        justify-content: space-between;
    }
}
/* Small <= 768px end */
`;

export default Wrapper;