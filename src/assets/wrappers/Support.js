import Styled from "styled-components";

const Wrapper = Styled.main`
a{
  text-decoration: none;
}
.card-deck{
  width: 100%;
  display: flex;
  column-gap: 10px;
  row-gap: 40px;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 40px 0px;
  padding-top: 40px;
}
.card{
  text-align:center;
  padding: 20px;
  color: #fff;
}
.card-icon{
  width: 40px;
  height: 40px;
  margin-bottom: 20px;
}

.call-card{
  background-color:#16b3d9;
}
.whatsapp-card{
  background-color: #12bb18;
}
.mail-card{
  background-color: #ea4335;
}
.card-text{
  font-size: 12px;
  color: #F3F3F3;
`;

export default Wrapper;