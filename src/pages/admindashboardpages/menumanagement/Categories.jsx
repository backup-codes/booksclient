//styled-component imports
import Wrapper from "../../../assets/wrappers/adminwrappers/BasicDetails";
//bootstrap imports
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
//icon imports
import { FaPlus } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
//react imports
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DeleteMenuCategory,
  MenuCategory,
} from "../../../config/routeApi/owner";
import Uploading from "../../../components/loaders/Uploading";
import { toastError, toastSuccess } from "../../../helpers/helpers";
//backend updates

const Categories = () => {
  const [menuCategories, setMenuCategories] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [isUploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleMenuCategoriesData = async () => {
    try {
      const response = await MenuCategory();
      if (response.data.success) {
        // Filter menu categories based on the search query
        const filteredCategories = response.data.Categories.filter(category =>
          category.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setMenuCategories(filteredCategories);
      } else {
        toastError(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    handleMenuCategoriesData();
  }, [refresh, searchQuery]);

  const handleCategoryDrop = async (categoryId) => {
    try {
      setUploading(true)
      const response = await DeleteMenuCategory(categoryId);
      setUploading(false)

      if (refresh === true) {
        setRefresh(false);
      } else {
        setRefresh(true);

      }

      toastSuccess(response.data.message)

    } catch (error) {
      console.log(error);
    }
  };

  const handleEditCategory = async (employId) => {
    navigate(`/dashboard/menu-management/update-category/${employId}`);
  };

  //TABLE HEADING DUMMY DATA
  const tableHeading = [
    {
      id: 1,
      title: "Category",
    },
    {
      id: 2,
      title: "Description",
    },
  ];

  return (

    <>
      {isUploading ? (<Uploading isUploading={isUploading} />) : null}
      <Wrapper className="page">
        <div className="page-content">
          <div className="page-header">
            <h3>Cuisines</h3>


          </div>


          <div className="search-and-btn" >
            <div className="search-div">
              <div className="search-input-group">
                <IoSearchSharp className="search-icon" />
                <input
                  type="text"
                  placeholder="Search"
                  className="search-bar"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />

              </div>
              {/* <button className="search-btn">Search</button> */}
            </div>

            <Button variant="dark" className="fw-normal page-header-btn">
              <FaPlus className="plus-icon" />
              <Link
                to="/dashboard/menu-management/new-categories"
                style={{ textDecoration: "none", color: "white" }}
              >
                Add Cuisines
              </Link>
            </Button>

          </div>

          <div className="table-div">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>S.No.</th>
                  {tableHeading.map((item) => {
                    return <th key={item.id}>{item.title}</th>;
                  })}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>

                {menuCategories.map((item, i) => {
                  return (
                    <tr key={item._id}>
                      <td>{i + 1}</td>
                      <td>{item.category}</td>

                      <td>{item.description}</td>

                      <td>
                        <div className="actions">

                          <div className="link-wrapper" onClick={() => {
                            handleEditCategory(item._id);
                          }}>
                            <Link className="action-list">
                              <a className="edit">
                                Edit
                              </a>
                            </Link>
                          </div>

                          <div className="link-wrapper" onClick={() => {
                            handleCategoryDrop(item._id);
                          }}>
                            <a className="delete">
                              Delete
                            </a>
                          </div>


                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </Wrapper>
    </>
  );
};
export default Categories;
