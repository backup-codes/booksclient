import styled from "styled-components";

const Wrapper = styled.main`
.main-cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  margin: 15px 0;
}

.main-card {
  display: flex;
  flex-direction: column;
  padding: 20px 15px !important;
  border-radius: 5px;
}

.main-card:first-child {
  background-color: #2962ff;
}

.main-card:nth-child(2) {
  background-color: #ff6d00;
}

.main-card:nth-child(3) {
  background-color: #2e7d32;
}

.main-card:nth-child(4) {
  background-color: #d50000;
}

.inner-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.inner-card>h3 {
  font-size: 20px !important;
  padding-bottom: 15px;
}

.inner-card>.card_icon {
  font-size: 25px;
}

.charts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 60px;
  height: 300px;
}

`;

export default Wrapper;