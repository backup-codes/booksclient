import styled from 'styled-components'

const Wrapper = styled.main`

h3{
    color: #000;
    text-transform: capitalize;
}
.page-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.page-sub-header {
  width: 100%;
  display: flex;
  justify-content: flex-end; 
  column-gap: 20px;
  margin: 20px 0px;
}

.left-sub-header{
    width: 50%;
    display: flex;
    flex-direction: row;
    column-gap: 10px;
    row-gap: 10px;
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
.form-select{
    width: 50%;
}
.form-select:focus{
    box-shadow: none;
}
.right-sub-header{
    width: 50%;
    display: flex;
    column-gap: 15px;
    justify-content: flex-end;
}
.button{
    padding: 5px 40px;
    color: #fff;
    border-style: none;
    a{
        color: #fff;
        text-decoration: none;
    }
}
.plus-icon{
    margin-right: 10px;
}
.menu-btn{
  background-color: #00418D;
}
.menu-btn:hover{
  background-color: #0059C2;
}
.publish-btn{
  background-color: #00418D;
}
.publish-btn:hover{
  background-color: #0059C2;
}
.category{
    margin-top: 20px;
}

.category-header{
    display: flex;
    align-items: center;
    column-gap: 20px;
    margin-bottom: 10px;
}
.quicklink-btn{
  width: 174px;
  background-color: transparent;
  border: 1px solid #2B8DFF;
  border-radius: 50px;
  color:#373737;
}
.quicklink-btn-active{
  color: #fff;
  background-color: #66ACFF;
  border-style:none;
  border-radius: 50px;
}
${'' /* cards section */}
.card-deck{
    display: flex;
    column-gap: 10px;
    row-gap: 10px;
    flex-wrap: wrap;
    padding: 10px;
}

${'' /* toggle button style start */}
.switch1,
.switch2 {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 25px;
    display: flex;
    align-items: center;
}

.checkbox1,
.checkbox2 {
  position: absolute;
  opacity: 0;
  width: 0;
    height: 0;
}

.slider1,
.slider2 {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50px;
  background-color: #C4DFFF;
  transition: 0.4s;
}

.slider1:before,
.slider2:before {
  border-radius: 50px;
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 3px;
  background-color: #fff;
  transition: 0.4s;
}


.slider2 {
  background-color: #00418D;
}

.slider2:before {
  transform: translateX(22px);
}

${'' /* toggle button style end */}
`;

export default Wrapper;