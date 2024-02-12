import styled from "styled-components";

const Wrapper = styled.main`

.page-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.button-deck{
    display: flex;
    column-gap: 20px;
    row-gap: 10px;
    flex-wrap: wrap;
    margin-top: 20px;
}
button{
    padding:10px 20px;
    background-color:#0059C2;
    border-style: none;
    font-size: 14px;
}
.page-header-btn{
    text-decoration: none;
    color: #f3f0ec; 
}

.plus-icon{
    margin-right: 10px;
}

Button:hover{
    background-color: #00418E;
    border-style: none;
}
${'' /* search btn styles start */}
.search-and-btn{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
}
.search-div{
  display: flex;
  align-items: center;
}
  .search-input-group{
    position: relative;
  }

  .search-bar{
    border-style: none;
    box-shadow: inset 0px 2px 6px #00000040;
    border-radius: 15px;
    padding: 7px 20px 7px 50px;
  }
  .search-bar:focus{
    outline: none;
  }
  .search-bar::placeholder{
    font-size: 12px;
  }
  .search-icon{
    font-size: 20px;
    color: #67666B;
    position: absolute;
    top: 9px;
    left: 15px;
  }
.search-btn{
  background-color: #00418D;
  padding: 10px 20px;
  margin-left: 5px;
  border-style: none;
  border-radius: 10px;
  color: #fff;
  font-size:12px;
}
.search-btn:hover{
  border-style: none;
  background-color:#7EB9FF;
}
${'' /* search btn styles end */}

${'' /* date filter styles start  */}
.dates{
  display: flex;
  align-items: center;
  column-gap: 5px;
  }
  .date{
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 10px;
    padding: 5px 10px;
    label{
      margin: 0px 10px 0px 0px;
    }
  }
.date-input{
  box-shadow: inset 0px 2px 6px #00000040;
  border-radius: 50px;
  font-size: 10px;
}

${'' /* date filter styles end  */}

${'' /* table styles start */}
.table-div{
    margin-top: 30px;
    border: 1px solid #DEE2E6;
    border-radius:15px;
}
.table{
    border: 2px solid #DEE2E6;
    border-radius:15px;
    margin-bottom: 0px;
}
th{
    background-color: #00418E;
    color: #fff;
    font-weight: 700;
    padding: 15px 10px;
    text-align: center;
}
tr{
    text-align: center;
}
td{
    padding: 8px 5px;
    vertical-align: middle;
}


${'' /* action buttons in table styles start */}

.actions {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    padding: 10px;
}
.action-list{
    box-shadow: 0 4px 15px 0px #C8E1FF;
}
.actions a{
    padding: 10px 10px;
    background-color: #fff;
    text-decoration: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.5s ease;
    font-size: 14px;
}
.link-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(200, 225, 255, 0.7);
    border-radius: 8px; 
}

  .delete {
    color: #e74c3c;
 font-weight:  bolder;
  }
  .delete:hover{
    color: #e97d7d;
}
.view {
    color: #2B8DFF;
  }
  .view:hover{
   color: #ff9544;
}
.edit {
    color: #2B8DFF ;
  }
  .edit:hover{
    color:#8a9eaf;
}
${'' /* action buttons in table styles end */}




${'' /* table styles end */}

${'' /* pos passbook styles start*/}
.card-deck{
    margin: 30px 0px;
}
.card{
    width: 30%;
    padding: 30px;
    text-align: center;
    vertical-align: middle;
    background-color: #00418E;
    color: #fff;
    border-radius: 15px;
}
.card-title{
    padding-bottom: 20px;
}
.button-date{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 15px 0px;
}
.dates{
    display: flex;
    align-items: center;
}
.date{
    display: flex;
    align-items: center;
    label{
        margin: 0px 10px 0px 20px;
        vertical-align: middle;
    }
}

${'' /* pos passbook styles end*/}


@media screen and (max-width: 768px){

h2{
 font-size: 20px;
 margin-bottom: 0px;
}
.page-header{
  margin-bottom: 20px;
}
button{
  font-size: 12px;
  padding: 6px 10px;
}

${'' /* search btn styles start */}
${'' /* .search-and-btn{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
} */}
${'' /* .search-div{
  display: flex;
  align-items: center;
} */}
  ${'' /* .search-input-group{
    position: relative;
  } */}

  .search-bar{
    width: 150px;
    font-size: 12px;
    border-radius: 10px;
    padding: 7px 20px 7px 35px;
  }
  .search-bar::placeholder{
    font-size: 10px;
  }
  .search-icon{
    font-size: 15px;
    left: 12px;
  }
${'' /* search btn styles end */}

${'' /* table styles start */}
.table-div{
  margin-top: 20px;
}
.table{
  border: 1px solid #DEE2E6;
  border-radius:10px;
}
th{
  font-size: 10px;
  font-weight: 700;
  padding: 10px 5px;
}
td{
  padding: 5px 5px;
  font-size: 10px;
}
${'' /* action buttons in table styles start */}

.actions {
  padding: 10px;
  gap: 5px;
}
.actions a{
    padding: 7px;
    font-size: 10px;
}
${'' /* action buttons in table styles end */}

${'' /* table styles end */}


}



`;

export default Wrapper;