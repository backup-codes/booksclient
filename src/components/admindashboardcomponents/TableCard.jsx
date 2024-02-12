import Wrapper from "../../assets/wrappers/adminwrappers/MenuCard";
import { MdDelete, MdEdit } from "react-icons/md";
import { Table } from "../../assets/images";
import { Link, useNavigate } from "react-router-dom";
import { DeleteTable, UpdateTableActive } from "../../config/routeApi/owner";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Uploading from "../loaders/Uploading";
import { toastError, toastSuccess } from "../../helpers/helpers";
import ViewDineInOrdersModal from "./ViewDineInOrdersModal";

const TableCard = (props) => {
  const {tableData, image, noOfSeats, tableNo } = props;
  // const [isUploading, setUploading] = useState(false);
  const [modalView,setModalView] = useState(false)
console.log(tableData,"tableData");
  const navigate = useNavigate()


  const handleToggleChange = async () => {
    try {
      // setUploading(true)
      if (!tableData.isBooked) {
        
        const updatedIsShared = !props.toggleState;
        props.handleToggleChange(props.tableId);
        
        const response = await UpdateTableActive(props.tableId, updatedIsShared);
        // setUploading(false)
        
        if (!response.success) {
          props.handleToggleChange(props.tableId);
          console.error("Failed to update isShared property");
        }
      } else {
        toastError("Table is reserved")
      }
    } catch (error) {
      console.error("Error updating menu:", error);
    }
  };

  useEffect(() => {
    console.log("i am table data",tableData);
    // props.onDelete();
  }, [props.refresh]);

  const handleEditTable = async (tableId) => {
    navigate(`/dashboard/captain-management/update-table/${tableId}`);
  };

  const handleTableDrop = async (tableId) => {
    try {

      if (!tableData.isBooked) { 
      // setUploading(true)
      const response = await DeleteTable(tableId);
      // setUploading(false)

      props.onDelete(tableId);
     

      toastSuccess(response.data.message)
    } else {
        toastError("Deletion Failed : Table already reserved")
    }
    } catch (error) {
      
      console.log(error);
      // toast.success(response.data.message);
    }
  };
  const handleModalView = async () => {
    try {
      setModalView(true)
      
    } catch(err) {
    console.log(err);  
   }
}

  // useEffect(() => { }, [props.refresh]);
  return (
    <>
      {/* {isUploading ? (<Uploading isUploading={isUploading} />) : null} */}

      <Wrapper>
        <div className="card">
          <div className="toggle-edits-div">
            <div className="toggle-switch-div">
              <label className="switch">
                {/* <input type="checkbox" /> */}
                <input
                  type="checkbox"
                  checked={props.toggleState}
                  onChange={handleToggleChange}
                />
                <span className="slider toggle-btn" />
              </label>
            </div>

            <div className="delete-edit">
              <span className="action-icon edit-icon">

                <MdEdit
                  onClick={() => {
                    handleEditTable(props.tableId);
                  }}
                />
              </span>
              <span className="action-icon delete-icon">
                <MdDelete
                  onClick={() => {
                    handleTableDrop(props.tableId);
                  }}
                  style={{ cursor: "pointer" }}
                />
              </span>
            </div>
          </div>

          <div className="card-body">
            <div className="card-img">
              <img src={image} alt="" />
            </div>

            <div className="card-content">
              <h5 className="truncate" style={{ marginBottom: "6px" }}>
                Table {tableNo}
              </h5>
              <p
                className="truncate"
                style={{ marginBottom: "6px", fontSize: "12px" }}
              >
                {noOfSeats} Seaters
              </p>
              <p className="truncate" style={{ fontSize: "12px" }}>Table Access: {props.access}</p>
            </div>
          </div>
          
          {tableData.isBooked && tableData.Amount &&
            (<button className="view-button" onClick={() => handleModalView()}>View Order</button>)}
        </div>
      </Wrapper>
      
  { tableData.isBooked  && tableData.Amount && (<ViewDineInOrdersModal
        open={modalView}
        onCancel={() => setModalView(false)}
        ordered={tableData.KotItems}
        amount={tableData.Amount}
      />)}
    </>

  );
};
export default TableCard;
