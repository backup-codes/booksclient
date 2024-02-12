import styled from 'styled-components'


const Wrapper = styled.main`
width: 100vw;
height: 100vh;
overflow-y: scroll;
font-family: 'Montserrat', sans-serif;

header{
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 70px 10px 30px;
}
.dropdown-div{
    position: relative;
}
select{
    background-color: #66ACFF;
    color: #fff;
    border-style: none;
    border-radius: 50px;
    padding: 5px 50px 5px 30px;
    outline: none;
    appearance: none;
}
option{
    background-color: #fff;
    color: #66ACFF;
}
.dropdown-icon{
    position: absolute;
    top: 3px;
    right: 10px;
    font-size: 30px;
    color: #fff;
}

.heading{
    color: #393939;
    font-size: 55px;
    font-weight: 700;
    span{
        color:#407BFF
    }
}


${'' /* card section style start  */}
.card-section{
    margin: 100px 80px;
}

.card-deck{
    display: flex;
    justify-content: center;
    column-gap: 60px;
    row-gap: 50px;
    flex-wrap: wrap;
}

.card-div{
    width: 15rem;
height: 17rem;
position: relative;
}

.card-img{
    width: 100%;
    height: 100%;
    border-radius: 15px;
    img{
        width: 400px;
        height: 100%;
        object-fit: cover;
        object-position: -100px center;
    }
}
.title-div{
    width: 100%;
    height: 50px;
    background-color: rgba(0,0,0,0.5);
    position: absolute;
    bottom: 0px;
    left: 0px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
}
h6{
    margin: 0px;
}

${'' /* card section style end  */}

/* 768px >= Medium <= 1024 start */

@media screen and (min-width: 768px) and (max-width: 1024px){
.heading{
    max-width: 350px;
    font-size: 35px;
    text-align: center;
}
select{
    width: 100%;
}
}
/* 768px >= Medium <= 1024 end */


/* Small <= 768px start*/
@media screen and (min-width: 320px) and (max-width: 767px) {

header{
    padding: 10px 20px 10px 10px;
    img{
        width: 60px;
        height: 60px;
    }
}

.heading{
    width: 50%;
    text-align: center;
    font-size: 14px;
    margin-bottom: 0px;
}

.dropdown-div{
    width: 32%;
}
select{
    width: 100%;
    font-size: 10px;
    padding: 5px 10px;
}
.dropdown-icon{
    top: 3px;
    right: 3px;
    font-size: 25px;
}



${'' /* card section style start  */}
.card-section{
    margin: 30px 10px;
}

.card-deck{
    column-gap: 10px;
    row-gap: 10px;
}

.card-div{
    width: 10rem;
    height: 12rem;
}

.card-img{
    width: 100%;
    height: 100%;
    border-radius: 15px;
    img{
        width: 300px;
        height: 100%;
        object-fit: cover;
        object-position: -100px center;
    }
}
.title-div{
    height: 40px;
    color: #fff;
    border-radius: 10px;
}
h6{
    font-size: 12px;
}
}
/* Small <= 768px end*/
`;

export default Wrapper;