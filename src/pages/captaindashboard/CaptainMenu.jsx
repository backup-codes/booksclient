import Wrapper from "../../assets/wrappers/poswrappers/PosMenu";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
//component imports
import TableOrderSummeryModal from "../../components/captaincomponents/TableOrderSummeryModal";
import TableKotSummaryModal from "../../components/captaincomponents/TableKotSummaryModal";

//icon imports
import { FaPrint } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import {
  GetMenuDataAtCap,
  HoldItems,
  OrderedDataAtCap,
} from "../../config/routeApi/cap";
import AddToCartCapMenu from "../../components/Menu/AddToCartCapMenu";
import { IoMdPrint } from "react-icons/io";
import Uploading from "../../components/loaders/Uploading";
import { toastError, toastSuccess } from "../../helpers/helpers";

const CaptainMenu = () => {
  const [modalKot, setModalKot] = useState(false);
  const [modalHold, setModalHold] = useState(false);
  const [modalPrintBill, setModalPrintBill] = useState(false);
  const [kotId, setKotId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [menuCategories, setMenuCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isKot, setIsKot] = useState(false);
  const [isUploading, setUploading] = useState(false);
  const [ordered, setOrderedData] = useState([]);

  const navigate = useNavigate();

  // data coming from captain dashboard
  const location = useLocation();
  const data = location.state ? location.state.data : null;

  const handleTotalPrice = (total) => {
    setTotalPrice(total);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectedItemsChange = (items) => {
    setSelectedItems(items);
  };

  const handleKotIdChange = (newKotId) => {
    setKotId(newKotId);
  };


  const handleModalKotOpen = () => {
    if (totalPrice == 0)  {
      toastError("Please select the item from menu!");
    } else if (selectedItems.length == 0) {
      toastError("Already send to KOT");
      
    } else {
      setModalKot(true);
    }
  };

  const handleModalHoldOpen = () => {
    if (totalPrice == 0) {
      toastError("Please select the item from menu!");
    } else {
      setModalHold(true);
    }
  };

  useEffect(() => {
    const fetchOrderedData = async () => {
      try {
        const response = await OrderedDataAtCap(data._id);
        console.log(response,"i am response");
        setOrderedData(response.data.orderedData);
      } catch (error) {
        console.log(error);
      }
    };
    if (!modalKot) {
      fetchOrderedData();
    }
  }, [modalKot]);

  const handleHoldSubmit = async () => {
    try {
      setUploading(true);

      const dataToPass = {
        orderData: data,
        TotalPrice: totalPrice,
        kotData: selectedItems,
        // orderId,
      };
      if (totalPrice == 0) {
        toastError("Please order an item using KOT!");
      } else {
        const response = await HoldItems(dataToPass);
        setUploading(false);

        if (response.data.success) {
          navigate("/captain-dashboard");

          toastSuccess(response.data.message);
        } else {
          toastError(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendToPos = () => {

    if (ordered[0].KotItems.length == 0) {
     toastError("Your virtual plate is empty.") 
    } else {
    
      setModalPrintBill(true);
    }


  };

  const handleSortChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleMenuData = async () => {
    try {
      const response = await GetMenuDataAtCap();
      if (response.data.success) {
        setMenuCategories(response.data.Categories);
        setIsKot(response.data.isKotExist);
      } else {
        // Display error toast

        toastError(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = (event) => {
    const newSelectedCategory = event.target.value;
    setSelectedCategory(newSelectedCategory);
  };

  useEffect(() => {
   
    handleMenuData();
    handleCategoryChange({ target: { value: "all" } });
  }, [searchTerm]);

  return (
    <>
      {/* {isUploading ? <Uploading isUploading={isUploading} /> : null} */}

      <Wrapper className="page">
        <div className="page-content">
          <h2 className="title">Menu</h2>

          <div className="top-content">
            <div className="input-div">
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="input-div">
              <Form.Select
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option key="default" disabled value="">
                  Filter by category
                </option>
                {menuCategories.map(({ _id, category }) => (
                  <option key={_id} value={category}>
                    {category}
                  </option>
                ))}

                <option value="all">All categories</option>
              </Form.Select>
            </div>

            <div className="input-div">
              <Form.Select
                value={selectedOption}
                onChange={handleSortChange}
                className="select-input"
              >
                <option disabled value="">
                  Sort by price
                </option>
              
                <option value="low to high">Low to high</option>
                <option value="high to low">High to low</option>
              </Form.Select>
            </div>
          </div>

          <div className="bottom-content">
            <h5 className="sub-title">Your Order</h5>

            <div className="menu-cards">
              <AddToCartCapMenu
                orderData={data}
                onTotalPriceChange={handleTotalPrice}
                onSelectedItemsChange={handleSelectedItemsChange}
                sortingOption={selectedOption}
                selectedCategory={selectedCategory}
                searchTerm={searchTerm}
              />
            </div>
          </div>

          <div className="modal-buttons">

            <button
              onClick={() => handleHoldSubmit(data._id)}
              type="button"
              className="modal-btn"
            >
              {" "}
              Hold{" "}
            </button>

            <TableKotSummaryModal
              open={modalHold}
              onCancel={() => setModalHold(false)}
              cancelButtonProps={{ style: { display: "none" } }}
              okButtonProps={{ style: { display: "none" } }}
              kotData={selectedItems}
              TotalPrice={totalPrice}
              orderData={data}
              onKotIdChange={handleModalHoldOpen}
            />

            <button
              onClick={handleModalKotOpen}
              type="button"
              className="modal-btn"
            >
              {" "}
              KOT{" "}
            </button>

            <TableKotSummaryModal
              open={modalKot}
              setSelectedItems={setSelectedItems}
              onCancel={() => setModalKot(false)}
              cancelButtonProps={{ style: { display: "none" } }}
              okButtonProps={{ style: { display: "none" } }}
              kotData={selectedItems}
              TotalPrice={totalPrice}
              orderData={data}
              // onKotIdChange={handleKotIdChange}
            />

            
            {ordered.length > 0 && ordered[0].kotStatus ? (
              <button
                onClick={handleSendToPos}
                type="button"
                className="modal-btn"
                // hidden={data && data.orderMode === "Swiggy"||"Zomato"||"Bromag"||"Others"}
              >
                <FaPrint className="btn-icon" /> Send to POS
              </button>
            ) : (
              <button
                onClick={handleSendToPos}
                type="button"
                className="modal-btn1"
                disabled={true}
              >
                <IoMdPrint className="btn-icon" /> Send to POS
              </button>
            )}

            <TableOrderSummeryModal
              open={modalPrintBill}
              onCancel={() => setModalPrintBill(false)}
              cancelButtonProps={{ style: { display: "none" } }}
              okButtonProps={{ style: { display: "none" } }}
              ordered={ordered}
              tableName={data.tableName}
            />
          </div>
        </div>
      </Wrapper>
    </>
  );
};
export default CaptainMenu;
