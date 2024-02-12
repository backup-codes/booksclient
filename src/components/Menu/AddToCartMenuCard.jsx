import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaIndianRupeeSign } from "react-icons/fa6";
import { GetMenuDataAtPos } from "../../config/routeApi/pos";
import Wrapper from "../../assets/wrappers/Menu/AddToCartMenu";
import Card from "react-bootstrap/Card";
import { toastError } from "../../helpers/helpers";

const AddToCartMenuCard = ({
  // onTotalPriceChange,
  // onSelectedItemsChange,
  // sortingOption,
  // selectedCategory,
  // searchTerm,
  // orderData,
  stock,
  itemId,
  Title,
  Image,
  ActualPrice,
  DiscountPrice,
  selectedItems,
  setSelectedItems,
  Item
}) => {
  const [menu, setMenu] = useState([]);
  const [quantities, setQuantities] = useState({});
  // const [selectedItems, setSelectedItems] = useState([]);
  const [displayedMenu, setDisplayedMenu] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [isChecked, setChecked] = useState(false);

  // Function to update displayed menu based on sorting and filtering
  // const updateDisplayedMenu = () => {
  //   let updatedMenu = [...menu];

  //   //search functionality
  //   updatedMenu = updatedMenu.filter((item) =>
  //     item.item.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  //   // Apply sorting
  //   if (sortingOption === "low to high") {
  //     updatedMenu.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  //   } else if (sortingOption === "high to low") {
  //     updatedMenu.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  //   }

  //   // Apply filtering
  //   if (selectedCategory !== "all") {
  //     updatedMenu = updatedMenu.filter(
  //       (item) => item.category === selectedCategory
  //     );
  //   }

  //   setDisplayedMenu(updatedMenu);
  // };

  // const handleMenuData = async () => {
  //   try {
  //     // log
  //     const response = await GetMenuDataAtPos();
  //     if (response.data.success) {
  //       setMenu(response.data.MenuData);
  //       const initialQuantities = {};
  //       response.data.MenuData.forEach((menuItem) => {
  //         initialQuantities[menuItem._id] = {
  //           quantity: 1,
  //           item: menuItem.item,
  //           price: menuItem.price,
  //         };
  //       });
  //       setQuantities(initialQuantities);
  //     } else {
  //       // Display error toast

  //       toastError(response.data.message)

  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   updateDisplayedMenu();
  // }, [sortingOption, selectedCategory, menu, searchTerm]);

  // useEffect(() => {
  //   if (orderData?.KotItems && orderData.KotItems.length > 0) {
  //     const defaultSelectedItems = orderData.KotItems.map(
  //       (kotItem) => kotItem.item
  //     );
  //     setSelectedItems(defaultSelectedItems);
  //   }
  // }, []);

  // useEffect(() => {
  //   handleMenuData();
  // }, [selectedCategory]);

  // useEffect(() => {
  //   let totalPrice = 0;

  //   selectedItems.forEach((itemId) => {
  //     totalPrice +=
  //       quantities[itemId]?.quantity * parseFloat(quantities[itemId]?.price);
  //   });

  //   const selectedItemsDetails = selectedItems.map((itemId) => ({
  //     id: itemId,
  //     quantity: quantities[itemId]?.quantity,
  //     item: quantities[itemId]?.item,
  //     price: quantities[itemId]?.price,
  //     totalItemPrice:
  //       quantities[itemId]?.quantity * parseFloat(quantities[itemId]?.price),
  //   }));

  //   const TotalOrderPrice = selectedItemsDetails.reduce(
  //     (accumulator, currentItem) => accumulator + currentItem.totalItemPrice,
  //     0
  //   );

  //   // onTotalPriceChange(TotalOrderPrice);
  //   // onSelectedItemsChange(selectedItemsDetails);
  // }, [onTotalPriceChange, onSelectedItemsChange, selectedItems]);
  // }, [onTotalPriceChange, onSelectedItemsChange, selectedItems]);

  // Constants
  // const productStock = 12;
  useEffect(() => {
    const storedQuantity = localStorage.getItem(`quantity_${itemId}`);
    if (storedQuantity != null) {
      setQuantity(parseInt(storedQuantity, 10));
    }
  }, []);

  useEffect(() => {
    // Retrieve selected items from local storage
    const storedSelectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
  
    // Check if the current item exists in the stored selected items
    const itemExists = storedSelectedItems.some((selectedItem) => selectedItem._id === Item._id);
  
    if (itemExists) {
      // Item exists in selected items
      // You can perform additional actions or set state accordingly
      setChecked(true)
      console.log(`${Item.item} is already selected.`);
    } else {
      setChecked(false)
      // Item does not exist in selected items
      // You can perform additional actions or set state accordingly
      console.log(`${Item.item} is not selected.`);
    }
  }, [Item._id]);

  // Decrease quantity handler
  const setDecrease = () => {
    let newQuantity

    if (isChecked) {

return   toastError("Uncheck to change quantity")

    }

    if (quantity >= 1) {
      setQuantity(quantity - 1);

       newQuantity = quantity - 1;
      setQuantity(newQuantity);

      localStorage.setItem(`quantity_${itemId}`, newQuantity.toString());
    }

    setSelectedItems((prevSelectedItems) => {
      const itemIndex = prevSelectedItems.findIndex((item) => item._id === Item._id);
  
      if (itemIndex !== -1) {
        // Item found, decrement its ordered quantity
        const updatedItems = [...prevSelectedItems];
        if (updatedItems[itemIndex].orderedQuantity >= 0) {
          updatedItems[itemIndex].orderedQuantity = newQuantity;
  
          // Update local storage
          localStorage.setItem("selectedItems", JSON.stringify(updatedItems));
  
          return updatedItems;
        } else {
          // Handle case where ordered quantity is already at minimum (e.g., show an error)
          console.error(`Ordered quantity for item with ID ${itemId} is already at minimum`);
          return prevSelectedItems;
        }
      } else {
        // Item not found, handle accordingly (e.g., show an error)
        console.error(`Item with ID ${itemId} not found in selectedItems`);
        return prevSelectedItems;
      }
    });

  };

  // Increase quantity handler
  const setIncrease = () => {
    let newQuantity
    if (isChecked) {

      return   toastError("Uncheck to change quantity")
      
          }
    setQuantity((prevQuantity) => {
       newQuantity = prevQuantity + 1;
      if (stock >= newQuantity) {
        // Update state
        localStorage.setItem(`quantity_${itemId}`, newQuantity.toString());

        return newQuantity;
      } else {
        toastError(`${Title} Stock Already at Maximum`);
        return prevQuantity;
      }
    });

    if (stock >= newQuantity) {
    

      setSelectedItems((prevSelectedItems) => {

     
      
        const itemIndex = prevSelectedItems.findIndex((item) => item._id === itemId);
  
        if (itemIndex !== -1) {
          // Item found, increment its ordered quantity
          const updatedItems = [...prevSelectedItems];
          updatedItems[itemIndex].orderedQuantity = newQuantity;
  
          // Update local storage
          localStorage.setItem("selectedItems", JSON.stringify(updatedItems));
  
          return updatedItems;
        } else {
          // Item not found, handle accordingly (e.g., show an error)
          console.error(`Item with ID ${itemId} not found in selectedItems`);
          return prevSelectedItems;
        }
        

      });
    }
  };



  // Checkbox change handler
  const handleCheckboxChange = () => {

    if (isChecked) {
      const storedSelectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
      console.log("called uncheck", storedSelectedItems);
      
      localStorage.removeItem('selectedItems');
    
        setSelectedItems((prevSelectedItems) =>
      
          prevSelectedItems.filter((existingItem) => existingItem._id !== Item._id)
          
        );
        
 
      localStorage.setItem(
        'selectedItems',
        JSON.stringify(storedSelectedItems.filter((existingItem) => existingItem._id !== Item._id))
      );
      setChecked(false)
      
    } else {
     
      setChecked(true)
      setSelectedItems((prevSelectedItems) => {
       Item.orderedQuantity = quantity
        const newSelectedItems = [...prevSelectedItems, Item];
        
        // Update local storage
        localStorage.setItem("selectedItems", JSON.stringify(newSelectedItems));
        
        return newSelectedItems;
      });


      

    }


  };
  


  return (
    <div>
      {/* {displayedMenu.map((menuItem) => ( */}
      <Wrapper>
        <Card>
          <Card.Body>
            <div className="checkbox-div">
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange()}
                checked={isChecked}
              />
            </div>

            <div className="image-div">
              <img src={Image ? Image : null} alt="itemImage" />
            </div>
            <div className="content">
              <p className="menu-title">{Title ? Title : null}</p>
              <p className="discount">
                <FaIndianRupeeSign />
                {ActualPrice ? ActualPrice : null}
              </p>
              <p className="menu-price">
                <FaIndianRupeeSign />
                {DiscountPrice ? DiscountPrice : DiscountPrice}
              </p>
            </div>
            <div className="count-div">
              <div className="quantity">quantity</div>
              <div className="increase-decrease-div">
                <button className="decrease" onClick={() => setDecrease()}>
                  <FaMinus />
                </button>
                <div className="count">{quantity}</div>
                <button className="increase" onClick={() => setIncrease()}>
                  <FaPlus />
                </button>
              </div>
            </div>
            {/* <div className="total-price">
                Total :{" "}
                {quantities[menuItem._id]?.quantity *
                  parseFloat(menuItem.price)}
              </div> */}
          </Card.Body>
        </Card>
      </Wrapper>
      {/* ))} */}

      {/* <div>
        <p>Selected Items:</p>
        <ul>
          {selectedItems.map((itemId) => (
            <li key={itemId}>
              ID: {itemId}, Quantity: {quantities[itemId]?.quantity}, Item:{" "}
              {quantities[itemId]?.item}, Total Price:{" "}
              {quantities[itemId]?.quantity *
                parseFloat(quantities[itemId]?.price)}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default AddToCartMenuCard;
