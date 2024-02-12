import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaIndianRupeeSign } from "react-icons/fa6";
import Wrapper from "../../assets/wrappers/Menu/AddToCartMenu";
import Card from "react-bootstrap/Card";
import { GetMenuDataAtCap } from "../../config/routeApi/cap";
import Uploading from "../loaders/Uploading";
import { toastError } from "../../helpers/helpers";

const AddToCartCapMenu = ({
  onTotalPriceChange,
  onSelectedItemsChange,
  sortingOption,
  selectedCategory,
  searchTerm,
}) => {
  const [menu, setMenu] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [displayedMenu, setDisplayedMenu] = useState([]);
  const [isUploading, setUploading] = useState(false);

  const handleMenuData = async () => {
    try {
      setUploading(true);

      const response = await GetMenuDataAtCap();
      setUploading(false);

      if (response.data.success) {
        setMenu(response.data.MenuData);
        const initialQuantities = {};
        response.data.MenuData.forEach((menuItem) => {
         
          initialQuantities[menuItem._id] = {
            quantity: 1,
            item: menuItem.item,
            price: menuItem.discountPrice? menuItem.discountPrice:actualPrice,
          };
        });

        setQuantities(initialQuantities);
      } else {

        toastError(response.data.message)


      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to update displayed menu based on sorting and filtering
  const updateDisplayedMenu = () => {
    let updatedMenu = [...menu];

    //search functionality
    updatedMenu = updatedMenu.filter((item) => {
      const itemNameMatches = item.item.toLowerCase().includes(searchTerm.toLowerCase());
      const priceMatches = (
        item.discountPrice !== undefined
          ? parseFloat(item.discountPrice)
          : parseFloat(item.actualPrice)
      ).toString().includes(searchTerm);
    
      return itemNameMatches || priceMatches;
    });
    

    // Apply sorting
    if (sortingOption === "low to high") {
      updatedMenu.sort((a, b) => {
        const priceA = a.discountPrice !== undefined ? parseFloat(a.discountPrice) : parseFloat(a.actualPrice);
        const priceB = b.discountPrice !== undefined ? parseFloat(b.discountPrice) : parseFloat(b.actualPrice);
        return priceA - priceB;
      });
    } else if (sortingOption === "high to low") {
      updatedMenu.sort((a, b) => {
        const priceA = a.discountPrice !== undefined ? parseFloat(a.discountPrice) : parseFloat(a.actualPrice);
        const priceB = b.discountPrice !== undefined ? parseFloat(b.discountPrice) : parseFloat(b.actualPrice);
        return priceB - priceA;
      });
    }
    

    // Apply filtering
    if (selectedCategory !== "all") {
      updatedMenu = updatedMenu.filter(
        (item) => item.category === selectedCategory
      );
    }

    setDisplayedMenu(updatedMenu);
  };

  useEffect(() => {
    console.log("Sorting and filtering updated menu");
    updateDisplayedMenu();
  }, [sortingOption, menu, searchTerm]);

  useEffect(() => {
    console.log("Fetching menu data");
    handleMenuData();
  }, [selectedCategory]);

  useEffect(() => {
    let totalPrice = 0;

    selectedItems.forEach((itemId) => {
      totalPrice +=
        quantities[itemId]?.quantity * parseFloat(quantities[itemId]?.price);
    });

    const selectedItemsDetails = selectedItems.map((itemId) => ({
      id: itemId,
      quantity: quantities[itemId]?.quantity,
      item: quantities[itemId]?.item,
      price: quantities[itemId]?.price,
      totalItemPrice:
        quantities[itemId]?.quantity * parseFloat(quantities[itemId]?.price),
    }));

    const TotalOrderPrice = selectedItemsDetails.reduce(
      (accumulator, currentItem) => accumulator + currentItem.totalItemPrice,
      0
    );

    onTotalPriceChange(TotalOrderPrice);
    onSelectedItemsChange(selectedItemsDetails);
  }, [ selectedItems]);
  // }, [onTotalPriceChange, onSelectedItemsChange, selectedItems]);

  // Constants


  const productStock = 12;

  // Decrease quantity handler
  const setDecrease = (itemId) => {

    if (selectedItems.includes(itemId)) {

      return toastError("Uncheck to Change Quantity")
      
     }

    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: {
        ...prevQuantities[itemId],
        quantity:
          prevQuantities[itemId].quantity > 1
            ? prevQuantities[itemId].quantity - 1
            : 1,
      },
    }));




  };

  // Increase quantity handler
  const setIncrease = (itemId, productStock) => {

    if (selectedItems.includes(itemId)) {
     return toastError("Uncheck to Change Quantity")
    }

    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: {
        ...prevQuantities[itemId],
        quantity:
          prevQuantities[itemId].quantity < productStock
            ? prevQuantities[itemId].quantity + 1
            : productStock,
      },
    }));




  };

  // Checkbox change handler
  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter((id) => id !== itemId)
        : [...prevSelectedItems, itemId]
    );

    onSelectedItemsChange(selectedItems);
  };

  return (
    <>
      {isUploading ? <Uploading isUploading={isUploading} /> : null}

      {displayedMenu.map((menuItem) => (
        <Wrapper key={menuItem._id}>
          <Card>
            <Card.Body>
              <div className="checkbox-div">
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(menuItem._id)}
                  checked={selectedItems.includes(menuItem._id)}
                />
              </div>

              <div className="image-div">
                <img src={menuItem?.itemImage} alt="itemImage" />
              </div>
              <div className="content">
                <p className="menu-title">{menuItem.item}</p>
                {/* <p className="menu-price">
                  <FaIndianRupeeSign />
                  {menuItem.actualPrice}
                </p> */}
                <p className="discount">
                <FaIndianRupeeSign />
                {menuItem.actualPrice ? menuItem.actualPrice : null}
              </p>
              <p className="menu-price">
                <FaIndianRupeeSign />
                {menuItem.discountPrice ? menuItem.discountPrice : null}
              </p>
              </div>

              <div className="count-div">
                <div className="quantity">quantity</div>
                <div className="increase-decrease-div">
                  <button
                    className="decrease"
                    onClick={() => setDecrease(menuItem._id)}
                  >
                    <FaMinus />
                  </button>
                  <div className="count">
                    {quantities[menuItem._id]?.quantity}
                  </div>
                  <button
                    className="increase"
                    onClick={() => setIncrease(menuItem._id, productStock)}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Wrapper>
      ))}
    </>
  );
};

export default AddToCartCapMenu;
