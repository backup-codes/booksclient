import Wrapper from "../../../assets/wrappers/adminwrappers/MenuDetails";
import Button from "react-bootstrap/Button";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TableCard from "../../../components/admindashboardcomponents/TableCard";
import { useEffect, useState } from "react";
import { TableDataAtAdmin } from "../../../config/routeApi/owner";
import { toastError } from "../../../helpers/helpers";
import Uploading from "../../../components/loaders/Uploading";
import ViewDineInOrdersModal from "../../../components/admindashboardcomponents/ViewDineInOrdersModal";
const TableDetails = () => {
  // const [isUploading ,setUploading] =useState(false)
  const [tableData, setTableData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleTables = async () => {
      try {
        // setUploading(true)
        const response = await TableDataAtAdmin();
        // setUploading(false)
        if (response.data.success) {
          setTableData(response.data.tableData);
        } else {
          toastError(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleTables();
  }, [refresh]);

  const handleTableDelete = (tableId) => {
    setTableData((prevTableData) =>
      prevTableData.filter((table) => table._id !== tableId)
    );
    setRefresh((prevRefresh) => !prevRefresh);
  };


  const handleToggleChange = (tableId, updatedIsShared) => {
    try {
      // ... (no changes here)
      const updatedMenuData = tableData.map((table) =>
        table._id === tableId
          ? {
            ...table,
            isShared: updatedIsShared,
          }
          : table
      );

      setTableData(updatedMenuData);
    } catch (error) {
      console.error("Table Toggle error:", error);
    }
  };


  const handleAddTable = () => {
    if (tableData.length > 10) {
      toastError("Only 10 tables are allowed");
    } else {
      navigate("/dashboard/captain-management/add-table");
    }
  };

  return (
    <>
      {/* { isUploading ?(<Uploading isUploading={isUploading}/>):null} */}
      <Wrapper className="page">
        <div className="page-content">
          <div className="page-header">
            <h3>Table Management</h3>

            <Button className="button menu-btn" onClick={handleAddTable}>
              <FaPlus className="plus-icon" />
              {/* <Link to=""> */}
              Add New Table
              {/* </Link> */}
            </Button>
          </div>

          <section style={{ marginTop: "30px" }}>
            <div className="card-deck">
              {tableData.map((item) => (
                <TableCard
                  tableData={item}
                  key={item._id}
                  tableNo={item.tableName}
                  noOfSeats={item.numberOfSeats}
                  image={item.image}
                  tableId={item._id}
                  toggleState={item.isShared}
                  access={item.captainId && item.captainId}
                  refresh={refresh}
                  onDelete={handleTableDelete}
                  handleToggleChange={() => handleToggleChange(item._id)}
                />
              ))}
            </div>
          </section>
        </div>
      </Wrapper>

    </>
  );
};
export default TableDetails;
