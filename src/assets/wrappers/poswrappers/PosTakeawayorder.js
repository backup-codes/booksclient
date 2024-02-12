import styled from 'styled-components'

const Wrapper = styled.div`
h4{
    font-weight: 700;
}
.takeaway-content{
    width: 100%;
    display: flex;
    ${'' /* align-items: center; */}
}
.card-deck{
    width: 90%;
    padding: 20px;
    display: flex;
    column-gap: 10px;
    row-gap: 10px;
    flex-wrap: wrap;
    align-items: center;
}
.takeaway-card{
    background: linear-gradient(to bottom right,rgba(255,255,255,0),#4199FF,#097AFF);
    border-style: none;
    border-radius: 15px;
    box-shadow: 0px 4px 15px 0px #B5D7FF;
    margin: 5px 0px;
    color: #fff;
    border: 1px solid #bddcff;
    h5{
        font-weight: 700;
        text-transform: capitalize;
        overflow: hidden;
        white-space: nowrap;
        text-overflow:ellipsis;
    }
}
.takeaway-card-body{
    display: flex;
    column-gap: 10px;
    align-items: center;
    padding: 10px;
}
.takeaway-card-img{
    width: 35%;
    height: 100px;
    ${'' /* background-color: #000; */}
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
.takeaway-card-content{

    h5{
        margin-bottom: 10px;
    }
    .sub-content{
        display: flex;
        column-gap: 3px;
    }
    .sub-content-title{
        font-weight: 700;
    }
    p{
        color: #fff;
        font-size: 12px;
        margin: 0px;
        font-weight: 100;
    }
    button{
        background-color: #51A1FF;
        border-style:none;
        border-radius: 7px;
        color: #fff;
        padding: 5px 20px;
        font-size: 12px;
        margin-top: 10px;
    }
}
.card-title{
    font-size: 25px;
    font-weight: bold;
    color: #fff;
}

.add-btn{
    width: 40px;
    height: 40px;
    background-color:#00418D;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 25px;
    margin-right: 20px;
    margin-top: 65px;
    box-shadow: 0px 4px 15px 0px #B5D7FF;
}
.add-icon{
    color: #fff;
    font-size: 24px;
}
`;

export default Wrapper;