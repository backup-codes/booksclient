  // import PosPassbookCard from "../../components/poscomponents/PosPassbookCard"
import Wrapper from "../../assets/wrappers/poswrappers/PosDashboard";
// import PosOnlineOrders from "../../components/poscomponents/PosOnlineOrders";
import PosTakeawayOrder from "../../components/poscomponents/PosTakeawayOrder";
import PosOnlineAggregators from "../../components/poscomponents/PosOnlineAggregators";
import PosDineIn from "../../components/poscomponents/PosDineIn";
import { useEffect, useState } from "react";
import { posDashboard } from "../../config/routeApi/pos";
import { toastError } from "../../helpers/helpers";

const PosDashboard = () => {
  const [manager, setManager] = useState({});

  useEffect(() => {
    const handleManagerData = async () => {
      try {
        const response = await posDashboard();
        if (response.data.success) {
          setManager(response.data.ManagerData);
        } else {
          toastError(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleManagerData();
  }, []);

  return (
    <Wrapper className="page">
      <div className="page-content">
        <div className="page-header">
          <div>
            <h1>Hello, {manager && manager.username}</h1>
            <p>Welcome</p>
          </div>
          <div>
            <p>Employee ID : {manager && manager.employeeId}</p>
          </div>
        </div>

        <div>
          <section>
            <PosOnlineAggregators />
          </section>

          <section>
            <PosTakeawayOrder />
          </section>

          <section>
            <PosDineIn />
          </section>
        </div>
      </div>
    </Wrapper>
  );
};
export default PosDashboard;
