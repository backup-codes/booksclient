import { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "react-bootstrap/Card";

//component imports
import DineInOrderSummaryModal from "./DineInOrderSummaryModal";

//image imports
import { Table } from "../../assets/images";

import { GetDineInData } from "../../config/routeApi/pos";
import { toastError } from "../../helpers/helpers";

const Wrapper = styled.div`
  margin-bottom: 40px;
  h4 {
    font-weight: 700;
  }
  .dinein-content {
    display: flex;
    align-items: center;
  }
  .card-deck {
    display: flex;
    column-gap: 20px;
    row-gap: 10px;
    flex-wrap: wrap;
  }
`;

const Wrapper1 = styled.div`
  h4 {
    font-weight: 700;
  }
  .dinein-content {
    display: flex;
    align-items: center;
  }
  .dinein-card {
    width: 20rem;
    height: 10rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 15px;
    box-shadow: 0px 4px 15px 0px #c8e1ff;
    border-style: none;
    margin: 5px 0px;
  }
  .card-img {
    width: 40%;
    height: 100%;
    padding: 10px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
    }
  }
  .card-content {
    width: 60%;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .card-title {
    font-size: 25px;
    font-weight: 700;
    margin: 0px;
  }
  h5 {
    font-weight: 700;
    color: #5e5e5e;
  }
  p {
    font-size: 14px;
    color: #494949;
    font-weight: 700;
  }
  .view-order-btn {
    width: 80%;
    background-color: #00418d;
    font-weight: 700;
    font-size: 14px;
    padding: 8px 20px;
    border-style: none;
    border-radius: 15px;
    color: #fff;
  }

  .add-btn {
    width: 40px;
    height: 40px;
    background-color: #00418d;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 25px;
    margin-left: 20px;
    box-shadow: 0px 4px 15px 0px #b5d7ff;
  }
  .add-icon {
    color: #fff;
    font-size: 24px;
  }
`;
const PosDineIn = () => {
  //takeaway order summery modal useState
  const [openDineInOrderSummeryModal, setOpenDineInOrderSummeryModal] =
    useState(null);

  const [dineInData, setDineInData] = useState([]);

  useEffect(() => {
    const handleDineInData = async () => {
      try {
        const response = await GetDineInData();
        if (response.data.success) {
          setDineInData(response.data.DineInData);
        } else {
          toastError(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleDineInData();
  }, []);

  const handleViewDetails = (dineInId) => {
    setOpenDineInOrderSummeryModal(dineInId);
  };

  const handleCloseModal = () => {
    setOpenDineInOrderSummeryModal(false);
  };

  return (
    <Wrapper>
      <h4>Dine In</h4>

      <div className="dinein-content">
        <div className="card-deck">
          {dineInData &&
            dineInData.map((item) => (
              <Wrapper1 key={item._id}>
                <Card className="dinein-card">
                  <div className="card-img">
                    <img
                      src={item.tableId ? item.tableId.image : Table}
                      alt="table-image"
                    />
                  </div>
                  <div className="card-content">
                    <Card.Title>{item.customerName} </Card.Title>
                    <h5>Table 0{item.tableNumber}</h5>
                    <p>Bill ID: {item.billId}</p>
                    <button
                      className="view-order-btn"
                      type="button"
                      onClick={() => handleViewDetails(item._id)}
                    >
                      View Order
                    </button>

                    <div>
                    
                    </div>
                  </div>
                </Card>
              </Wrapper1>
            ))}
        </div>
      </div>

      {openDineInOrderSummeryModal && (
                        <DineInOrderSummaryModal
                          open={openDineInOrderSummeryModal}
                          onCancel={handleCloseModal}
                          cancelButtonProps={{ style: { display: "none" } }}
                          okButtonProps={{ style: { display: "none" } }}
                          orderDetails={
                            dineInData.find(
                              (val) => val._id === openDineInOrderSummeryModal
                            ) || {}
                          }
                        />
                      )}

    </Wrapper>
  );
};
export default PosDineIn;
