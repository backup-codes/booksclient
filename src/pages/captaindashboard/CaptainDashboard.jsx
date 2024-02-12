import Wrapper from "../../assets/wrappers/captainwrappers/CaptainDashboard";

//components import
import CaptainTableCard from "../../components/captaincomponents/CaptainTableCard";

//image imports
import { useEffect, useState } from "react";
import { TableStatus } from "../../config/routeApi/cap";

const CaptainDashboard = () => {
  const [table, setTable] = useState([]);

  useEffect(() => {
    const fetchTableStatus = async () => {
      try {
        const response = await TableStatus();
        console.log(response,"res");
        setTable(response.data.tableData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTableStatus();
  }, []);
  return (
    <Wrapper className="page">
      <div className="page-content">
        <div className="page-header">
          <div>
            <h2>Secure your table</h2>
          </div>
        </div>

        <section>
          <div className="card-deck">
            {table.map((item) => (
              <CaptainTableCard
                key={item._id}
                tableId={item._id}  
                isBooked={item.isBooked}
                tableno={item.tableName}
                noofseats={item.numberOfSeats}
                img={item.image}
              />
            ))}
          </div>
        </section>
      </div>
    </Wrapper>
  );
};
export default CaptainDashboard;
