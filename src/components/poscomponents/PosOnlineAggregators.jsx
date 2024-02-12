import Wrapper from "../../assets/wrappers/poswrappers/PosOnlineAggregators";
import Card from "react-bootstrap/Card";
import { SiSwiggy, SiZomato } from "react-icons/si";
import { BromagIndiaIcon, Others } from "../../assets/images";
import { useState } from "react";
import OnlineOrdersModal from "./OnlineOrdersModal";
import { RestaurantAdminApi } from "../../config/global";
import axios from "axios";

const OnlineAggregators = () => {
  //code for OnlineOrdersModal
  const [modal2Open, setModal2Open] = useState(false);
  const [platform, setPlatform] = useState('');

  async function handleModal( selectedPlatform) {
    setPlatform(selectedPlatform)
setModal2Open(true)
  }

  return (
    <Wrapper>
      <h4>Online Aggregators</h4>

      <div className="card-deck">
        <Card
          className="online-orders-card swiggy"
          onClick={() =>handleModal("Swiggy")}
          style={{ width: "12rem", height: "7rem" }}
        >
          <div>
            <SiSwiggy className="swiggy-icon" />
            <Card.Title>Swiggy</Card.Title>
          </div>
        </Card>

        <Card
          className="online-orders-card zomato"
          onClick={() =>handleModal("Zomato")}
          style={{ width: "12rem", height: "7rem" }}
        >
          <div>
            <SiZomato className="zomato-icon" />
            <SiZomato className="zomato-title" />
          </div>
        </Card>

        <Card
          className="online-orders-card bromag"
          onClick={() => handleModal("Bromag")}
          style={{ width: "12rem", height: "7rem" }}
        >
          <div>
            <img className="bromag-icon" src={BromagIndiaIcon} alt="" />
            <Card.Title>Bromag</Card.Title>
          </div>
        </Card>

        <Card
          className="online-orders-card others"
          onClick={() => handleModal("Others")}
          style={{ width: "12rem", height: "7rem" }}
        >
          <div>
            <img className="others-icon" src={Others} alt="" />
            <Card.Title>Others</Card.Title>
          </div>
        </Card>

        <div>

        {platform && modal2Open &&(  <OnlineOrdersModal
            platform={platform}
            open={modal2Open}
            onCancel={() => setModal2Open(false)}
            cancelButtonProps={{ style: { display: "none" } }}
            okButtonProps={{ style: { display: "none" } }}
          />)}

        </div>
      </div>
    </Wrapper>
  );
};
export default OnlineAggregators;
