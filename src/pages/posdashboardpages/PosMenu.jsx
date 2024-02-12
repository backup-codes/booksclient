import Wrapper from "../../assets/wrappers/poswrappers/PosMenu";
import AddToCartMenuCard from "../../components/Menu/AddToCartMenuCard";

//icons
import { FaPrint } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";

//backend updates
import { useLocation, useNavigate } from "react-router-dom";
import KotModal from "../../components/poscomponents/KotModal";
import { useEffect, useState } from "react";
import PrintBillModal from "../../components/poscomponents/PrintBillModal";
import { GetMenuDataAtPos, HoldItemsAtPos } from "../../config/routeApi/pos";

import { KotOrder } from "../../config/routeApi/pos";
import Wrapper1 from "../../assets/wrappers/poswrappers/PosFormModal";
import { IoMdPrint } from "react-icons/io";
import { toastError, toastSuccess } from "../../helpers/helpers";
import Uploading from "../../components/loaders/Uploading";

const PosMenu = () => {
  const [modalKot, setModalKot] = useState(false);
  const [modalPrintBill, setModalPrintBill] = useState(false);
  const [kotId, setKotId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [menuCategories, setMenuCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploading, setUploading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [swiggyMenu, setSwiggyMenu] = useState([]);
  const [currentMenu, setCurrentMenu] = useState([]);
  const [zomatoMenu, setZomatoMenu] = useState([]);
  const [bromagMenu, setBromagMenu] = useState([]);
  const [othersMenu, setOthersMenu] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [orderMode, setOrderMode] = useState("");
  const location = useLocation();
  const { orderData, HoldMenu } = location.state || {};
  const navigate = useNavigate();


  console.log(HoldMenu," holdmenu");

  const handleTotalPrice = (total) => {
    setTotalPrice(total);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKotIdChange = (newKotId) => {
    setKotId(newKotId);
  };

  const handleModalKotOpen = () => {
    if (selectedItems.filter((item) => item.quantity > 0).length === 0) {
      toastError("Please select at least one item from the menu!");
    } else {
      setModalKot(true);
    }
  };

  

  const filterMenu = (menu) => {

    const sortedMenu = [...menu]; 

   
    sortedMenu.sort((a, b) => {

      const priceA = a.discountPrice || a.actualPrice; 
      const priceB = b.discountPrice || b.actualPrice;

      if (selectedSortOption === "low to high") {
        return priceA - priceB;
      } else if (selectedSortOption === "high to low") {
        return priceB - priceA;
      } else {
        return 0; 
      }

    });

    return sortedMenu.filter((item) => {
      const itemName = (item.item || "").toLowerCase();
      const itemDescription = (item.itemDescription || "").toLowerCase();
      const itemCategory = (item.category || "").toLowerCase();

      const matchesSearch =
        itemName.includes(searchQuery.toLowerCase()) ||
        itemDescription.includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || itemCategory === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  };

  useEffect(() => {
    const storedItems = localStorage.getItem("selectedItems");
    if (storedItems) {
      setSelectedItems(JSON.parse(storedItems));
    }
  }, []);

  const handleModalPrintBillOpen = () => {
    if (totalPrice == 0) {
      toastError("Please select the item from menu!");
    } else {
      setModalPrintBill(true);
    }
  };


  const handleMenuData = async () => {
    try {
      const Mode = orderData?.orderMode ? orderData?.orderMode : HoldMenu.orderMode
      
      console.log(Mode, "i am hold"); 
      const { data } = await GetMenuDataAtPos(Mode);  
console.log(data,"i am dataaa");
      if (data.success) {

        if (data.CategoryData) {
          setMenuCategories(data.CategoryData);
        }
        setSelectedCategory("All");
console.log(data.MenuData,"i am data.menudata");
        setCurrentMenu(data.MenuData)

        
      } else {
        // Display error toast
        toastError(data.message);
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
    setOrderMode(orderData?.orderMode ? orderData?.orderMode : HoldMenu.orderMode)

    handleMenuData();
    handleCategoryChange({ target: { value: "all" } });
  }, [searchTerm, orderId]);

  const handleHoldSubmit = async () => {
    try {


      const dataToPass = {
        orderData: orderData,
        TotalPrice: totalPrice,
        kotData: selectedItems,
        orderId,
      };
      
      console.log(dataToPass, "data to pass");
      // if (orderId &&orderData) {
        
      //   const response = await HoldItemsAtPos(dataToPass);

      //   if (response.data.success) {
      //     navigate("/pos-dashboard");
      //     toastSuccess(response.data.message);
      //   } else if (orderId) {
      //     navigate("/pos-dashboard");

      //   } else {
      //     toastError(response.data.message);
      //   }
      // } else {
      //   toastError("Send Item to KOT")
      // }

      if (orderId) {
        if (orderData) {
          // Both orderId and orderData exist, call the API
          const response = await HoldItemsAtPos(dataToPass);
      
          if (response.data.success) {
            navigate("/pos-dashboard");
            toastSuccess(response.data.message);
          } else {
            toastError(response.data.message);
          }
        } else {
          // Only orderId exists, navigate to /pos-dashboard
          navigate("/pos-dashboard");
        }
      } else {
        toastError("Send Item to KOT");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const calculateTotalOrderAmount = (selectedItems) => {
    let totalAmount = 0;

    selectedItems.forEach((item) => {
      // Check if discount price is available, otherwise use actual price
      const price = item.discountPrice || item.actualPrice;

      // Calculate amount based on ordered quantity
      const itemAmount = price * item.orderedQuantity;

      // Add to the total amount
      totalAmount += itemAmount;
    });

    return totalAmount;
  };
  const handleOrderSubmit = async () => {
    try {
      // setUploading(true);

      const TotalAmount = calculateTotalOrderAmount(
        selectedItems.filter((item) => item.quantity > 0)
      );

     

      // selectedItems.map((item) => {
      //   if (item.orderedQuantity > 0) {
      //   }
      // });


      const data = {
        orderData: orderData,
        TotalPrice: TotalAmount,
        kotData: selectedItems.filter((item) => item.quantity > 0),
        HoldMenu: HoldMenu ? HoldMenu : "",
      };


      console.log(data,"i am dataaaaaaaa ");

      localStorage.removeItem("selectedItems");

      selectedItems.map((item) => {
        localStorage.removeItem(`quantity_${item._id}`);
      });

      const response = await KotOrder(data);
      console.log(response,orderData,"i ma response from kot submit");
      setUploading(false);

      if (response.data.success) {
        setModalKot(false);

        toastSuccess(response.data.message);
        // orderData.orderMode === "takeaway" ||
        if ( response.data.orderId) {
        
          setOrderId(response.data.orderId);
        
        } else {

          navigate("/pos-dashboard");

        }
      } else {
        toastError(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handlePrindbill = async () => {
    try {
      
      console.log();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Wrapper className="page">
      <div className="page-content">
        <div className="content">
          <h4 className="title">Menu</h4>

          <div className="top-content">
            <div className="input-div">
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="input-div">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                {menuCategories.map((category) => {
                  console.log(category.category);
                  return (
                    <option
                      key={category._id}
                      value={category.category.toLowerCase()}
                    >
                      {category.category}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="input-div">
              <select
                value={selectedSortOption}
                onChange={(e) => setSelectedSortOption(e.target.value)}
              >
                <option disabled value="">
                  Sort by price
                </option>
              
                <option value="low to high">Low to high</option>
                <option value="high to low">High to low</option>
              </select>
            </div>
          </div>

          <div className="bottom-content">
            <h5 className="sub-title">Your Order</h5>

            <div className="menu-cards">
              {filterMenu(currentMenu).length > 0 ? (
                <>
                  {filterMenu(currentMenu).map((item) => (
                    <AddToCartMenuCard
                      key={item._id}
                      Title={item.item}
                      Image={item.itemImage}
                      ActualPrice={item.actualPrice}
                      DiscountPrice={item.discountPrice}
                      itemId={item._id}
                      stock={item.quantity}
                      selectedItem={selectedItems}
                      setSelectedItems={setSelectedItems}
                      Item={item}
                    />
                  ))}
                </>
              ) : (
                <p>No matching items found.</p>
              )}
            </div>
          </div>
        </div>

        <div className="modal-buttons">

{orderMode === 'takeaway' &&  (    <button
            type="button"
            onClick={() => handleHoldSubmit()}
            className="modal-btn"
            // hidden={orderData && orderData.orderMode == "online"}
          >
            {" "}
            Hold{" "}
          </button>)}

          <button
            onClick={handleModalKotOpen}
            type="button"
            className="modal-btn"
          >
            {" "}
            KOT{" "}
          </button>
{orderMode === 'takeaway' &&  (    <button
            type="button"
            onClick={() => handleModalPrintBillOpen()}
            className="modal-btn"
            // hidden={orderData && orderData.orderMode == "online"}
          >
            {" "}
            Print Bill{" "}
          </button>)}



          
          <div>
            {isUploading ? <Uploading isUploading={isUploading} /> : null}

            

            

            <Wrapper1
              centered
              open={modalKot}
              onCancel={() => setModalKot(false)}
              cancelButtonProps={{ style: { display: "none" } }}
              okButtonProps={{ style: { display: "none" } }}
            >
              <h4 className="title">Order Summary</h4>
              <div className="form-div">
  <div className="summary-items">
    <div className="heading d-flex justify-content-between">
      <p>Item</p>
      <p className="quantity">Quantity</p>
    </div>
    {selectedItems
      .concat(HoldMenu ? HoldMenu : [])
      .filter((item) => item.orderedQuantity > 0)
      .map((item, index) => {
        return (
          <div key={index} className="single-item">
            <p>{item.item && item.item}</p>
            <p className="quantity">x{item.orderedQuantity}</p>
          </div>
        );
      })}
  </div>

  <div className="total"></div>

  <div className="form-btn">
    <button onClick={handleOrderSubmit}>
      <IoMdPrint style={{ marginRight: "10px", fontSize: "20px" }} />
      KOT Print
    </button>
  </div>
</div>
            </Wrapper1>

          </div>

          
          <PrintBillModal
            open={modalPrintBill}
            onCancel={() => setModalPrintBill(false)}
            cancelButtonProps={{ style: { display: "none" } }}
            okButtonProps={{ style: { display: "none" } }}
            printBillData={selectedItems}
            TotalPrice={totalPrice}
            kotId={kotId}
            orderData={orderData}
          />

          
          
        </div>
      </div>
    </Wrapper>
  );
};
export default PosMenu;
