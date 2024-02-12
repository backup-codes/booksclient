import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Wrapper from "../../assets/wrappers/adminwrappers/MenuCard";
import { FaPlus, FaMinus } from "react-icons/fa";
import { MdCurrencyRupee, MdDelete, MdEdit } from "react-icons/md";
import {
  DeleteMenu,
  UpdateMenuActive,
  quantityIncrementAtMenu,
} from "../../config/routeApi/owner";
import Uploading from "../loaders/Uploading";
import { floorNumber, toastSuccess } from "../../helpers/helpers";

const MenuCard = ({ handleToggleChange, updateQuantity, onDelete, ...data }) => {
  const [count, setCount] = useState(data.quantity);
  const [isUploading, setUploading] = useState(false);

  const navigate = useNavigate();
  // console.log(props,"ui am oproppp");
  console.log(data.plateform,"plateform");

  const handleToggleChangefn = async () => {
    try {
      // console.log(props,"i am props");
      const updatedIsShared = !data.toggleState;

handleToggleChange(data.itemId);
      const response = await UpdateMenuActive(data.itemId, updatedIsShared,data.plateform);

      if (!response.success) {
        handleToggleChange(data.itemId);
        console.error("Failed to update isShared property");
      }

    } catch (error) {

      console.error("Error updating menu:", error);
      
    }
  };

  const stock = 30;

  const increase = async () => {

    setCount((currentState) => {
      if (currentState < stock) {
        (async () => {
          const Data = {
            quantityStatus: "increment",
            ItemId: data.itemId,
            count: count + 1,
            plateform:data.plateform
          };

          const response = await quantityIncrementAtMenu(Data);


        })();
        const newState = currentState + 1;
        return newState;
      }
      return currentState;
    });
  };

  const decrease = () => {
    

    setCount((currentState) => {
      if (currentState > 0) {
        (async () => {
          const Data = {
            quantityStatus: "decrement",
            ItemId: data.itemId,
            count: count - 1,
            plateform:data.plateform
          };
          const response = await quantityIncrementAtMenu(Data);
       

        })();
        const newState = currentState - 1;
        return newState;
      }
      return currentState;
    });
  };

  const handleMenuDrop = async (menuId,plateform) => {
    try {
      console.log("calledddd delete");
      const response = await DeleteMenu(menuId,plateform);
      onDelete();

    
      toastSuccess(response.data.message)
    } catch (error) {
      console.log(error);
      // toast.success(response.data.message);
    }
  };

  const handleEditMenu = async (menuId) => {
    navigate(`/dashboard/menu-management/update-menu-item/${menuId}`);
  };

  return (
    <>
    { isUploading ?(<Uploading isUploading={isUploading}/>):null}
      
    <Wrapper>
      <div className="card">
        {data.discount && (
          <span className="percentage">{floorNumber( data.discountPerc)}%</span>
          )}
        <div className="toggle-edits-div">
          <div className="toggle-switch-div">
            <label className="switch">
              <input
                type="checkbox"
                checked={data.toggleState}
                onChange={handleToggleChangefn}
                />
              <span className="slider toggle-btn" />
            </label>
          </div>

            <div className="delete-edit">
            {/* <span className="action-icon edit-icon"> */}
              <Link className="action-icon edit-icon" to={`/dashboard/menu-management/update-menu-item/${data.itemId}`} state={{Item:data}}>
              <MdEdit
                // onClick={() => {
                //     handleEditMenu(props.itemId);
                //   }}
                  />
                  </Link>
              {/* </span> */}
              
              {data.plateform === "Restaurant" && (<span className="action-icon delete-icon">
                
              <MdDelete
                onClick={() => {
                  handleMenuDrop(data.itemId,data.plateform);
                }}
                style={{ cursor: "pointer" }}
                />
              </span>)}
              
          </div>
        </div>

        <div className="card-body">
          <div className="card-img">
            <img src={data.img} alt="" />
          </div>

          <div className="card-content">
            <h5 className="truncate">{data.title}</h5>
            <p className="truncate">{data.desc}</p>
            <div className="card-buttons">
              <div className="price-div">
                <div>
                  {data.discount && (
                    <h5 className="discount">
                      <MdCurrencyRupee />
                      {data.originalPrice}
                    </h5>
                  )}
                </div>

                <div>
                  {data.discount ? (
                    <h5>
                      <MdCurrencyRupee />
                      {data.discount}
                    </h5>
                  ) : (
                    <h5 className="py-2">
                      <MdCurrencyRupee />
                      {data.originalPrice}
                    </h5>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="quantity">
            <div>
              <p>Quantity</p>
            </div>
              <div className="count">
                <p>{count}</p>
              </div>
            {/* <div className="count-div">
              <div className="decrease" onClick={decrease}>
                <FaMinus />
              </div>
              <div className="increase" onClick={increase}>
                <FaPlus />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </Wrapper>
                  </>
  );
};

export default MenuCard;
