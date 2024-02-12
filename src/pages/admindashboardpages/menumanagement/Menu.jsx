import Wrapper from "../../../assets/wrappers/adminwrappers/MenuDetails";
import MenuCard from "../../../components/admindashboardcomponents/MenuCard";
import Button from "react-bootstrap/Button";
import { IoSearchSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

//image imports

import {
  DeleteMenu,
  MenuData,
  MenuSharingUpdates,
  PublishMenu,
} from "../../../config/routeApi/owner";
//backend updates
import { useEffect, useState } from "react";
import { RestaurantAdminApi } from "../../../config/global";
import Uploading from "../../../components/loaders/Uploading";
import { toastError, toastSuccess } from "../../../helpers/helpers";

const Menu = () => {
  const [searchInput, setSearchInput] = useState('');
  const [menuData, setMenuData] = useState([]);
  const [newMenuData, setNewMenuData] = useState([]);
  const [menuCategories, setMenuCategories] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [change, setChange] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isUploading, setUploading] = useState(false);
  const [options, setOptions] = useState([]);
  const [showBromag, setShowBromag] = useState(false);
   const [showZomato, setShowZomato] = useState(false);
   const [showRestaurant, setShowRestaurant] = useState(true);
   const [showSwiggy, setShowSwiggy] = useState(false);
   const [showOthers, setShowOthers] = useState(false);
   const [bromagMenus, setBromagMenus] = useState([]);
   const [zomataMenus, setZomataMenus] = useState([]);
   const [restaurantMenus, setRestaurantMenus] = useState([]);
   const [swiggyMenus, setSwiggyMenus] = useState([]);
   const [othersMenus, setOthersMenus] = useState([]);
  //to publish the data
  const handlePublishSubmit = async () => {
    try {
      setUploading(true)
console.log(newMenuData,"heyy")
      const data = newMenuData
        .map((category) =>
          category.data
            .filter((item) => item.isShared && item.menuShared)
            .map((item) => ({
              itemId: item._id,
              quantity: item.quantity,
            }))
        )
        .flat();


      
      const response = await PublishMenu(data);
      // setUploading(false)

      if (response.data.success) {

        toastSuccess(response.data.message)


      } else {
        toastError(response.data.message)

      }
    } catch (error) {
      console.log(error);
    }
  };


  // to delete the menu
  const handleMenuDelete = () => {
    if (refresh) {
      setRefresh(false);
    } else {
      setRefresh(true);
    }
  };

  //quantity updates
  const updateQuantity = ({ itemId, newQuantity }) => {
 
    const updatedMenuData = newMenuData.map((category) => ({
      ...category,
      data: category.data.map((item) =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      ),
    }));

    setNewMenuData(updatedMenuData);
  };


  function organizeMenu(menuData) {
    const organizedMenu = {};
  
    menuData.forEach((menuItem) => {
      const category = menuItem.category;
      const subCategory = menuItem.subCategory;
  
      // Check if the category key exists in the organizedMenu object
      if (!organizedMenu[category]) {
        organizedMenu[category] = {};
      }
  
      // Check if the subcategory key exists in the organizedMenu[category] object
      if (!organizedMenu[category][subCategory]) {
        organizedMenu[category][subCategory] = [];
      }
  
      // Add the menuItem to the array corresponding to its category and subcategory
      organizedMenu[category][subCategory].push(menuItem);
    });
  
    return organizedMenu;
  }

  //to handle menu data
  const handleMenuData = async () => {
    try {
      const {data} = await MenuData();

      
      if (data.success) {

const restaurantOrganiesMenu = await organizeMenu(data.restaurantMenu)
const zomatoOrganiesMenu = await organizeMenu(data.zomatoMenu)
const swiggyMenuOrganiesMenu = await organizeMenu(data.swiggyMenu)
const bromagMenuOrganiesMenu = await organizeMenu(data.bromagMenu)
const othersMenuMenuOrganiesMenu = await organizeMenu(data.othersMenu)

        // Log the organized menu
        
        console.log(zomatoOrganiesMenu, "heee");

        setZomataMenus(zomatoOrganiesMenu)
        setRestaurantMenus(restaurantOrganiesMenu)
        setSwiggyMenus(swiggyMenuOrganiesMenu)
        setOthersMenus(othersMenuMenuOrganiesMenu)
        setBromagMenus(bromagMenuOrganiesMenu)


      }

   
    } catch (error) {
      console.log(error);
    }
  };

  // to enable search functionality
  const handleSearch = () => {
    let filteredMenuData = menuData;

    if (selectedCategory) {
      filteredMenuData = filteredMenuData.filter(
        (item) => item.category === selectedCategory
      );
    }

    filteredMenuData = filteredMenuData.filter((item) =>
      item.item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const resultArray = filteredMenuData.reduce((acc, items) => {
      const {
        category,
        _id,
        item,
        description,
        itemType,
        actualPrice,
        discountPrice,
        itemImage,
        restaurant,
        isShared,
        menuShared,
        quantity,
        price,
        discountPercentage
      } = items;

      const existingHeading = acc.find((entry) => entry.category === category);

      if (existingHeading) {
        existingHeading.data.push({
          _id,
          item,
          description,
          itemType,
          actualPrice,
          discountPrice,
          itemImage,
          restaurant,
          isShared,
          menuShared,
          quantity,
          price,
          discountPercentage
        });
      } else {
        acc.push({
          category,
          data: [
            {
              _id,
              item,
              description,
              itemType,
              actualPrice,
              discountPrice,
              itemImage,
              restaurant,
              isShared,
              menuShared,
              quantity,
              price,
              discountPercentage
            },
          ],
        });
      }

      return acc;
    }, []);

    setFilteredData(resultArray);
    setChange(true);
  };

  useEffect(() => {
    handleMenuData();
    if (searchTerm || selectedCategory) {
      handleSearch();
    }
  }, [searchTerm, selectedCategory, refresh]);

  //toggle change for item sharing and archiving feature
  const handleToggleChange = (categoryName) => {
    try {
      const updatedMenuData = newMenuData.map((category) =>
        category.category === categoryName
          ? {
            data: category.data.map((item) => ({
              ...item,
              isShared: !item.isShared,
            })),
          }
          : category
      );

      setNewMenuData(updatedMenuData);
      if (refresh) {
        setRefresh(false);
      } else {
        setRefresh(true);
      }
    } catch (error) {
      console.error("Category Toggle error:", error);
    }
  };

  // to update category sharing in menu
  const handleMenuSharingUpdates = async (categoryName,plateform) => {
    try {


      const response = await MenuSharingUpdates(categoryName,plateform);


      if (refresh) {
        setRefresh(false);
      } else {
        setRefresh(true);
      }
      if (response.data.success) {
        toastSuccess(response.data.message)
      } else {
        toastError(response.data.message)
      }
    } catch (error) {
      console.log(error);
    }
  };

  //toggle change for category sharing and archiving feature
  const handleCheckboxChange = (categoryName,plateform) => {
    try {
      handleMenuSharingUpdates(categoryName,plateform);
    } catch (error) {
      console.error("Category Toggle error:", error);
    }
  };



  const handleButtonClick = (Plateform) => {
    // Update the state based on the clicked button
    switch (Plateform) {
      case "Restaurant":
        setShowRestaurant(true)
        setShowBromag(false);
        setShowZomato(false);
        setShowSwiggy(false);
        setShowOthers(false);

        break;
      case "Bromag":
        setShowBromag(true);
        setShowRestaurant(false)
        setShowZomato(false);
        setShowSwiggy(false);
        setShowOthers(false);

        break;
      case "Zomato":
        setShowZomato(true);
        setShowRestaurant(false)
        setShowBromag(false);
        setShowSwiggy(false);
        setShowOthers(false);
        break;
      case "Swiggy":
        setShowSwiggy(true);
        setShowBromag(false);
        setShowZomato(false);
        setShowRestaurant(false)
        setShowOthers(false);

        break;
      case "Others":
        setShowOthers(true);
        setShowBromag(false);
        setShowZomato(false);
        setShowRestaurant(false)
        setShowSwiggy(false);
        break;
      default:
        // Do nothing
        break;
    }
  }




  return (
    <>
      {/* { isUploading ?(<Uploading isUploading={isUploading}/>):null} */}
      <Wrapper className="page">
        <div className="page-content">
          <div className="page-header">
            <h3>Menu Details</h3>
          </div>

          <div className="page-sub-header">
            <div className="left-sub-header">
              <div className="search-div">
                <div className="search-input-group">
                  <IoSearchSharp className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search Menu"
                    className="search-bar"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>
              </div>

              {/* <select
                className="form-select"
                value={selectedCategory || ""}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
              >
                <option value="">Select category</option>
                {menuCategories &&
                  menuCategories.map((category) => (
                    <option key={category._id} value={category.category}>
                      {category.category}
                    </option>
                  ))}
              </select> */}

<select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value={"All"}>All Cuisine</option>
        {Object.keys(restaurantMenus).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
              </select>
              
            </div>

            <div className="right-sub-header">
              <Button variant="dark" className="button menu-btn">
                <FaPlus className="plus-icon" />
                <Link to="/dashboard/menu-management/add-new-menu-item">
                  Add Menu
                </Link>
              </Button>

              <Button
                variant="dark"
                className="button publish-btn"
                onClick={() => handlePublishSubmit(newMenuData)}
              >
                Publish
              </Button>
            </div>
          </div>

          <section style={{ margin: "40px 0px 20px 0px" }}>
            <div
              className="card-deck"
              style={{ justifyContent: "space-between" }}
            >
              <Button
                onClick={() => handleButtonClick("Restaurant")}
                className={
                  showRestaurant
                    ? "quicklink-btn quicklink-btn-active"
                    : "quicklink-btn"
                }
              >
                Restaurant
              </Button>

              <Button
                onClick={() => handleButtonClick("Bromag")}
                className={
                  showBromag
                    ? "quicklink-btn quicklink-btn-active"
                    : "quicklink-btn"
                }
              >
                Bromag
              </Button>

              <Button
                onClick={() => handleButtonClick("Zomato")}
                className={
                  showZomato
                    ? "quicklink-btn quicklink-btn-active"
                    : "quicklink-btn"
                }
              >
                Zomato
              </Button>

              <Button
                onClick={() => handleButtonClick("Swiggy")}
                className={
                  showSwiggy
                    ? "quicklink-btn quicklink-btn-active"
                    : "quicklink-btn"
                }
              >
                Swiggy
              </Button>

              <Button
                onClick={() => handleButtonClick("Others")}
                className={
                  showOthers
                    ? "quicklink-btn quicklink-btn-active"
                    : "quicklink-btn"
                }
              >
                Others
              </Button>

              {/* <Button
              onClick={() => handleButtonClick("total")}
              className={showTotal ? "quicklink-btn" : "quicklink-btn"}
            >
              Reset
            </Button> */}
            </div>
          </section>
          
          <section>
            {!change &&
              newMenuData.map((category, index) => (
                <div key={index}>
                  {index !== 0 &&
                    newMenuData[index - 1].category !== category.category && (
                      <br />
                    )}
                  <div className="category">
                    <div className="category-header">
                      <h3>{category.category}</h3>
                      {/* <div>
                        <label
                          className={
                            category.data[0].menuShared ? "switch2" : "switch1"
                          }
                        >
                          <input
                            className={
                              category.data[0].menuShared
                                ? "checkbox2"
                                : "checkbox1"
                            }
                            type="checkbox"
                            checked={category.menuShared}
                            onChange={() => {
                              handleCheckboxChange(category.category);
                            }}
                          />
                          <span
                            className={
                              category.data[0].menuShared ? "slider2" : "slider1"
                            }
                          />
                        </label>
                      </div> */}
                    </div>
                    <div className="card-deck">
                      {category.data.map((item) => (
                        <MenuCard
                          plateform={item.platformName}
                          key={item._id}
                          title={item.item}
                          desc={item.description}
                          price={item.price}
                          originalPrice={item.actualPrice}
                          img={item?.itemImage}
                          toggleState={item.isShared}
                          discount={item.discountPrice}
                          discountPerc={item.discountPercentage}
                          handleToggleChange={() => handleToggleChange(item._id)}
                          itemId={item._id}
                          updateQuantity={updateQuantity}
                          quantity={item.quantity}
                          onDelete={handleMenuDelete}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </section>


          <div>
          {showZomato &&
        zomataMenus &&
        Object.entries(zomataMenus)
          .filter(([category, subcategories]) => selectedCategory === "All" || selectedCategory === category)
          .map(([category, subcategories]) => {
            const filteredSubcategories = Object.entries(subcategories)
              .filter(([subCategory, menuItems]) => {
                const searchQuery = searchInput.toLowerCase();
                return (
                  subCategory.toLowerCase().includes(searchQuery) ||
                  menuItems.some(
                    (menuItem) =>
                      menuItem.item.toLowerCase().includes(searchQuery) ||
                      menuItem.description.toLowerCase().includes(searchQuery)
                  )
                );
              });

            if (filteredSubcategories.length === 0) {
              return null; // Skip rendering if no matching results in this category
            }

            return (
              <div key={category}>
                <div className="category">
                  <div className="category-header">
                    <h3>{category}</h3>
                    {Object.entries(subcategories)
                      .slice(0, 1)
                      .map(([subcuisine, subcuisineArray]) => (
                        <div key={subcuisine}>
                          {subcuisineArray && subcuisineArray.length > 0 && (
                            <div>
                              <label
                                className={subcuisineArray[0].menuShared ? "switch2" : "switch1"}
                              >
                                <input
                                  className={subcuisineArray[0].menuShared ? "checkbox2" : "checkbox1"}
                                  type="checkbox"
                                  checked={subcuisineArray[0].menuShared}
                                  onChange={() => {
                                    handleCheckboxChange(subcuisineArray[0].category, subcuisineArray[0].platformName);
                                  }}
                                />
                                <span
                                  className={subcuisineArray[0].menuShared ? "slider2" : "slider1"}
                                />
                              </label>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>

                  {filteredSubcategories.map(([subCategory, menuItems]) => (
                    <div key={subCategory}>
                      <h5>{subCategory}</h5>
                      <div className="card-deck">
                        {menuItems.map((menuItem) => (
                          <MenuCard
                            key={menuItem._id}
                            plateform={menuItem.platformName}
                            title={menuItem.item}
                            desc={menuItem.description}
                            price={menuItem.actualprice}
                            originalPrice={menuItem.actualPrice}
                            img={menuItem?.itemImage}
                            toggleState={menuItem.isShared}
                            discount={menuItem.discountPrice}
                            discountPerc={menuItem.discountPercentage}
                            handleToggleChange={() => handleToggleChange(menuItem._id)}
                            itemId={menuItem._id}
                            updateQuantity={updateQuantity}
                            quantity={menuItem.quantity}
                            onDelete={handleMenuDelete}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
            




            
          {showRestaurant &&
        restaurantMenus &&
        Object.entries(restaurantMenus)
          .filter(([category, subcategories]) => selectedCategory === "All" || selectedCategory === category)
          .map(([category, subcategories]) => {
            const filteredSubcategories = Object.entries(subcategories)
              .filter(([subCategory, menuItems]) => {
                const searchQuery = searchInput.toLowerCase();
                return (
                  subCategory.toLowerCase().includes(searchQuery) ||
                  menuItems.some(
                    (menuItem) =>
                      menuItem.item.toLowerCase().includes(searchQuery) ||
                      menuItem.description.toLowerCase().includes(searchQuery)
                  )
                );
              });

            if (filteredSubcategories.length === 0) {
              return null; 
            }

            return (
              <div key={category}>
                <div className="category">
                  <div className="category-header">
                    <h3>{category}</h3>
                    {Object.entries(subcategories)
                      .slice(0, 1)
                      .map(([subcuisine, subcuisineArray]) => (
                        <div key={subcuisine}>
                          {subcuisineArray && subcuisineArray.length > 0 && (
                            <div>
                              <label
                                className={subcuisineArray[0].menuShared ? "switch2" : "switch1"}
                              >
                                <input
                                  className={subcuisineArray[0].menuShared ? "checkbox2" : "checkbox1"}
                                  type="checkbox"
                                  checked={subcuisineArray[0].menuShared}
                                  onChange={() => {
                                    handleCheckboxChange(subcuisineArray[0].category, subcuisineArray[0].platformName);
                                  }}
                                />
                                <span
                                  className={subcuisineArray[0].menuShared ? "slider2" : "slider1"}
                                />
                              </label>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>

                  {filteredSubcategories.map(([subCategory, menuItems]) => (
                    <div key={subCategory}>
                      <h5>{subCategory}</h5>
                      <div className="card-deck">
                        {menuItems.map((menuItem) => (
                          <MenuCard
                            key={menuItem._id}
                            plateform={menuItem.platformName}
                            title={menuItem.item}
                            desc={menuItem.description}
                            price={menuItem.actualprice}
                            originalPrice={menuItem.actualPrice}
                            img={menuItem?.itemImage}
                            toggleState={menuItem.isShared}
                            discount={menuItem.discountPrice}
                            discountPerc={menuItem.discountPercentage}
                            handleToggleChange={() => handleToggleChange(menuItem._id)}
                            itemId={menuItem._id}
                            updateQuantity={updateQuantity}
                            quantity={menuItem.quantity}
                            onDelete={handleMenuDelete}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          
            
          {showBromag &&
  bromagMenus &&
  Object.entries(bromagMenus)
    .filter(([category, subcategories]) => selectedCategory === "All" || selectedCategory === category)
    .map(([category, subcategories]) => {
      const filteredSubcategories = Object.entries(subcategories)
        .filter(([subCategory, menuItems]) => {
          const searchQuery = searchInput.toLowerCase();
          return (
            subCategory.toLowerCase().includes(searchQuery) ||
            menuItems.some(
              (menuItem) =>
                menuItem.item.toLowerCase().includes(searchQuery) ||
                menuItem.description.toLowerCase().includes(searchQuery)
            )
          );
        });

      if (filteredSubcategories.length === 0) {
        return null; // Skip rendering if no matching results in this category
      }

      return (
        <div key={category}>
          <div className="category">
            <div className="category-header">
              <h3>{category}</h3>
              {Object.entries(subcategories)
                .slice(0, 1)
                .map(([subcuisine, subcuisineArray]) => (
                  <div key={subcuisine}>
                    {subcuisineArray && subcuisineArray.length > 0 && (
                      <div>
                        <label
                          className={subcuisineArray[0].menuShared ? "switch2" : "switch1"}
                        >
                          <input
                            className={subcuisineArray[0].menuShared ? "checkbox2" : "checkbox1"}
                            type="checkbox"
                            checked={subcuisineArray[0].menuShared}
                            onChange={() => {
                              handleCheckboxChange(
                                subcuisineArray[0].category,
                                subcuisineArray[0].platformName
                              );
                            }}
                          />
                          <span
                            className={subcuisineArray[0].menuShared ? "slider2" : "slider1"}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                ))}
            </div>

            {filteredSubcategories.map(([subCategory, menuItems]) => (
              <div key={subCategory}>
                <h5>{subCategory}</h5>
                <div className="card-deck">
                  {menuItems.map((menuItem) => (
                    <MenuCard
                      key={menuItem._id}
                      plateform={menuItem.platformName}
                      title={menuItem.item}
                      desc={menuItem.description}
                      price={menuItem.actualprice}
                      originalPrice={menuItem.actualPrice}
                      img={menuItem?.itemImage}
                      toggleState={menuItem.isShared}
                      discount={menuItem.discountPrice}
                      discountPerc={menuItem.discountPercentage}
                      handleToggleChange={() => handleToggleChange(menuItem._id)}
                      itemId={menuItem._id}
                      updateQuantity={updateQuantity}
                      quantity={menuItem.quantity}
                      onDelete={handleMenuDelete}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    })}

            
{showSwiggy &&
  swiggyMenus &&
  Object.entries(swiggyMenus)
    .filter(([category, subcategories]) => selectedCategory === "All" || selectedCategory === category)
    .map(([category, subcategories]) => {
      const filteredSubcategories = Object.entries(subcategories)
        .filter(([subCategory, menuItems]) => {
          const searchQuery = searchInput.toLowerCase();
          return (
            subCategory.toLowerCase().includes(searchQuery) ||
            menuItems.some(
              (menuItem) =>
                menuItem.item.toLowerCase().includes(searchQuery) ||
                menuItem.description.toLowerCase().includes(searchQuery)
            )
          );
        });

      if (filteredSubcategories.length === 0) {
        return null; // Skip rendering if no matching results in this category
      }

      return (
        <div key={category}>
          <div className="category">
            <div className="category-header">
              <h3>{category}</h3>
              {Object.entries(subcategories)
                .slice(0, 1)
                .map(([subcuisine, subcuisineArray]) => (
                  <div key={subcuisine}>
                    {subcuisineArray && subcuisineArray.length > 0 && (
                      <div>
                        <label
                          className={subcuisineArray[0].menuShared ? "switch2" : "switch1"}
                        >
                          <input
                            className={subcuisineArray[0].menuShared ? "checkbox2" : "checkbox1"}
                            type="checkbox"
                            checked={subcuisineArray[0].menuShared}
                            onChange={() => {
                              handleCheckboxChange(
                                subcuisineArray[0].category,
                                subcuisineArray[0].platformName
                              );
                            }}
                          />
                          <span
                            className={subcuisineArray[0].menuShared ? "slider2" : "slider1"}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                ))}
            </div>

            {filteredSubcategories.map(([subCategory, menuItems]) => (
              <div key={subCategory}>
                <h5>{subCategory}</h5>
                <div className="card-deck">
                  {menuItems.map((menuItem) => (
                    <MenuCard
                      key={menuItem._id}
                      plateform={menuItem.platformName}
                      title={menuItem.item}
                      desc={menuItem.description}
                      price={menuItem.actualprice}
                      originalPrice={menuItem.actualPrice}
                      img={menuItem?.itemImage}
                      toggleState={menuItem.isShared}
                      discount={menuItem.discountPrice}
                      discountPerc={menuItem.discountPercentage}
                      handleToggleChange={() => handleToggleChange(menuItem._id)}
                      itemId={menuItem._id}
                      updateQuantity={updateQuantity}
                      quantity={menuItem.quantity}
                      onDelete={handleMenuDelete}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    })}


{showOthers &&
  othersMenus &&
  Object.entries(othersMenus)
    .filter(([category, subcategories]) => selectedCategory === "All" || selectedCategory === category)
    .map(([category, subcategories]) => {
      const filteredSubcategories = Object.entries(subcategories)
        .filter(([subCategory, menuItems]) => {
          const searchQuery = searchInput.toLowerCase();
          return (
            subCategory.toLowerCase().includes(searchQuery) ||
            menuItems.some(
              (menuItem) =>
                menuItem.item.toLowerCase().includes(searchQuery) ||
                menuItem.description.toLowerCase().includes(searchQuery)
            )
          );
        });

      if (filteredSubcategories.length === 0) {
        return null; // Skip rendering if no matching results in this category
      }

      return (
        <div key={category}>
          <div className="category">
            <div className="category-header">
              <h3>{category}</h3>
              {Object.entries(subcategories)
                .slice(0, 1)
                .map(([subcuisine, subcuisineArray]) => (
                  <div key={subcuisine}>
                    {subcuisineArray && subcuisineArray.length > 0 && (
                      <div>
                        <label
                          className={subcuisineArray[0].menuShared ? "switch2" : "switch1"}
                        >
                          <input
                            className={subcuisineArray[0].menuShared ? "checkbox2" : "checkbox1"}
                            type="checkbox"
                            checked={subcuisineArray[0].menuShared}
                            onChange={() => {
                              handleCheckboxChange(
                                subcuisineArray[0].category,
                                subcuisineArray[0].platformName
                              );
                            }}
                          />
                          <span
                            className={subcuisineArray[0].menuShared ? "slider2" : "slider1"}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                ))}
            </div>

            {filteredSubcategories.map(([subCategory, menuItems]) => (
              <div key={subCategory}>
                <h5>{subCategory}</h5>
                <div className="card-deck">
                  {menuItems.map((menuItem) => (
                    <MenuCard
                      plateform={menuItem.platformName}
                      key={menuItem._id}
                      title={menuItem.item}
                      desc={menuItem.description}
                      price={menuItem.actualprice}
                      originalPrice={menuItem.actualPrice}
                      img={menuItem?.itemImage}
                      toggleState={menuItem.isShared}
                      discount={menuItem.discountPrice}
                      discountPerc={menuItem.discountPercentage}
                      handleToggleChange={() => handleToggleChange(menuItem._id)}
                      itemId={menuItem._id}
                      updateQuantity={updateQuantity}
                      quantity={menuItem.quantity}
                      onDelete={handleMenuDelete}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    })}

            
    </div>
<section />
          <section>
            {change &&
              filteredData.map((category, index) => (
                <div key={index}>
                  {index !== 0 &&
                    filteredData[index - 1].category !== category.category && (
                      <br />
                    )}
                  <div className="category">
                    <div className="category-header">
                      <h3>{category.category}</h3>
                      <div>
                        <label className="switch">
                          <input type="checkbox" />
                          <span className="slider" />
                        </label>
                      </div>
                    </div>
                    <div className="card-deck">
                      {category.data.map((item) => (
                        <MenuCard
                          key={item._id}
                    plateform={item.platformName}

                          title={item.item}
                          desc={item.description}
                          price={item.actualPrice}
                          img={item?.itemImage}
                          toggleState={item.isShared}
                          discount={item.discountPrice}
                          discountPerc={item.discountPercentage}
                          handleToggleChange={() => handleToggleChange(item._id)}
                          itemId={item._id}
                          onDelete={handleMenuDelete}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </section>
        </div>
      </Wrapper>
    </>

  );
};
export default Menu;