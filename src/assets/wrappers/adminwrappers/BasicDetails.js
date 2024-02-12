import styled from 'styled-components'

const Wrapper = styled.main`

h3{
    color: #000;
    margin-bottom: 0px;
}
.page-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
select{
  width: 200px;
}
.form-select:focus{
  box-shadow: none;
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
.table-div{
    margin: 30px 0px;
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
    padding: 12px 10px;
    text-align: center;
    vertical-align: middle;
}
tr{
    text-align: center;
}
td{
  max-width: 300px; 
  overflow-wrap: break-word;
  padding: 12px 5px;
  vertical-align: middle;
  color: #6A6A6A;
}
.table-btn{
    border-style: none;
    background-color: transparent;
    padding: 0px;
}
.table-btn:hover{
    background-color: transparent;
    border-style: none;
}
.action-icon{
    font-size: 24px;
}
.action-icon:hover {
    color: #e97d7d;
    cursor: pointer;
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

${'' /* vendor settings and customer page search btn styles start */}

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
${'' /* vendor settings and customer page search btn styles end */}
`;

export default Wrapper;