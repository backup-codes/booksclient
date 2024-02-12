import Card from "react-bootstrap/Card";
import Wrapper from "../../assets/wrappers/poswrappers/PosTakeawayorder";
//icon imports
import { FaPlus } from "react-icons/fa6";
//component imports
import TakeAwayModal from "./TakeAwayModal";
import TakeAwayOrderSummaryModal from "./TakeAwayOrderSummaryModal";
//backend imports
import { useEffect, useState } from "react";
import { TakeAwayData } from "../../config/routeApi/pos";

//image imports
import { TakeAwayCardBg } from "../../assets/images";

const PosTakeawayOrder = () => {
  // takeaway data useState
  const [holdedTakeAwayData, setHoldedTakeAwayData] = useState([]);
  const [indicator, setIndicator] = useState(false);

  useEffect(() => {
    const handleTakeAwayData = async () => {
      try {
        const response = await TakeAwayData();
        console.log(response,"i am jaseel responee");
        if (response.data.success) {
          setHoldedTakeAwayData(response.data.HoldTakeAwayData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleTakeAwayData();
  }, [indicator]);

  //code for TakeAwayModal
  const [modal2Open, setModal2Open] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  //takeaway order summery modal useState
  const [openTakeAwayOrderSummeryModal, setOpenTakeAwayOrderSummeryModal] =
    useState(false);

  const handleViewDetails = (item) => {
    
    setSelectedItem(item)
    setOpenTakeAwayOrderSummeryModal(true);
  };

  const handleCloseModal = () => {
    setOpenTakeAwayOrderSummeryModal(false);
  };

  return (
    <Wrapper>
      <h4>Take Away</h4>

      <div className="takeaway-content">
        <div className="add-btn">
          <FaPlus onClick={() => setModal2Open(true)} className="add-icon" />
        </div>

        <div>
          <TakeAwayModal
            open={modal2Open}
            onCancel={() => setModal2Open(false)}
            cancelButtonProps={{ style: { display: "none" } }}
            okButtonProps={{ style: { display: "none" } }}
          />
        </div>

        <div className="card-deck flex-row">
          {holdedTakeAwayData &&
            holdedTakeAwayData.map((item) => (
              <Card
                key={item._id}
                className="takeaway-card"
                style={{ width: "14rem" }}
              >
                <div className="takeaway-card-body">
                  <div className="takeaway-card-img">
                    <img src={TakeAwayCardBg} alt="" />
                  </div>
                  <div className="takeaway-card-content">
                    <h5>{item.customerName}</h5>
                    <div className="sub-content">
                      <p className="sub-content-title">Phone: </p>
                      <p>{item.phone}</p>
                    </div>
                    <div className="sub-content">
                      <p className="sub-content-title">Payment: </p>
                      <p>{item.paymentMethod}</p>
                    </div>

                    <div className="sub-content">
                      <p className="sub-content-title">Status: </p>
                      <p>On Hold</p>
                    </div>

                    <button onClick={() => handleViewDetails(item)}>
                      View Order
                    </button>

                    <div>
                     
                    </div>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </div>


      {selectedItem && (
        <TakeAwayOrderSummaryModal
          setIndicator={setIndicator}
          indicator={indicator}
                        open={openTakeAwayOrderSummeryModal}
                        onCancel={handleCloseModal}
                        cancelButtonProps={{ style: { display: "none" } }}
                        okButtonProps={{ style: { display: "none" } }}
                        selectedOrder={selectedItem}
                        // KotData={holdedTakeAwayData.find(
                        //   (val) => val._id === openTakeAwayOrderSummeryModal
                        // )}
                        // user={item._id}
        />
      )}
    </Wrapper>
  );
};
export default PosTakeawayOrder;
