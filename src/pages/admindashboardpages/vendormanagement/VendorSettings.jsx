//styled-component imports
import Wrapper from "../../../assets/wrappers/adminwrappers/BasicDetails";
//bootstrap imports
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
//react-icon imports
import { FaPlus } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
//component imports
import ViewVendorDetailModal from "../../../components/admindashboardcomponents/ViewVendorDetailModal";
//react imports
import { Link } from "react-router-dom";
import { useState } from "react";
//backend integration imports
import { getVendorData, handledeleteVendor } from "../../../config/routeApi/owner";
import { useEffect } from "react";
import { toastError } from "../../../helpers/helpers";


const VendorSettings = () => {
  const [vendorData, setVendorData] = useState([]);
  const [viewModal, setViewModal] = useState(false);
  const [indicator, setIndicator] = useState(false);
  const [selectedItem, setSelectedItem] = useState([])
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const handleViewDetail = async (item) => {
    try {

      setSelectedItem(item)
      setViewModal(true)

    } catch (err) {
      console.log(err)
    }
  }


  // const handledelete = async (id) => {
  //   try {

  //     const { data } = await handledeleteVendor(id)

  //     if (data.success) {
  //       setIndicator(!indicator)
  //     }

  //   } catch (err) {

  //     console.log(err)

  //   }
  // }

  const handleVendorData = async () => {
    try {
      const response = await getVendorData();
      if (response.data.success) {
        setVendorData(response.data.VendorData);
      } else {

        toastError(response.data.message)

      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleVendorData();
  }, [indicator]);



  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // Adjust the delay as needed (e.g., 300 milliseconds)

    // Clear the timeout if the component is unmounted or the search query changes
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Filter the vendorData based on the debounced search query
  const filteredVendorData = vendorData.filter((item) =>
    Object.values(item)
      .map((value) => (value || "").toString().toLowerCase())
      .some((value) => value.includes(debouncedSearchQuery.toLowerCase()))
  );

  // const filteredVendorData = vendorData.filter((item) =>
  //   Object.values(item)
  //     .map((value) => (value || "").toString().toLowerCase())
  //     .some((value) => value.includes(searchQuery.toLowerCase()))
  // );

  //TABLE HEADING DUMMY DATA
  const tableHeading = [
    {
      id: 1,
      title: "Date",
    },
    {
      id: 2,
      title: "Category",
    },
    {
      id: 3,
      title: "Vendor ID",
    },
    {
      id: 4,
      title: "Vendor Name",
    },
    {
      id: 5,
      title: "Contact Number",
    },
  ];


  return (
    <Wrapper className="page">
      <div className="page-content">
        <div className="page-header">
          <h3>Vendor Details</h3>
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
                onChange={(e) => setSearchQuery(e.target.value)}
              />

            </div>
            {/* <button className="search-btn">Search</button> */}
          </div>

          <Link
            className="page-header-btn"
            to="/dashboard/vendor-management/add-vendor"
          >
            <Button variant="dark" className="fw-normal">
              <FaPlus className="plus-icon" />
              Add Vendor
            </Button>
          </Link>
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
              {filteredVendorData && filteredVendorData.map((item, i) => {
                const dateObject = new Date(item.addedDate);
                const options = {
                  year: '2-digit',
                  month: '2-digit',
                  day: '2-digit',
                
                  
                };
                const formattedDate = dateObject.toLocaleString('en-US', options);



                return (
                  <tr key={item._id}>
                    <td>{i + 1}</td>
                    <td>
                      {formattedDate}
                    </td>
                    <td>{item.ingredient}</td>
                    <td>{item.vendorId}</td>
                    <td>{item.vendorName}</td>
                    <td>{item.phone}</td>
                    <td>
                      <div className="actions">
                        <div className="link-wrapper" onClick={() => handleViewDetail(item)}>

                          <a className="edit">
                            View
                          </a>

                        </div>
                        <div className="link-wrapper">
                          <Link className="action-list edit" to={`/dashboard/vendor-management/update-vendor`} state={{ Item: item }}>
                            <a className="edit">
                              Edit
                            </a>
                          </Link>
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

      {
        selectedItem ? (
          <ViewVendorDetailModal
            viewData={selectedItem}
            // show={viewModal}
            // onHide={() => setViewModal(false)}
            open={viewModal}
            onCancel={() => setViewModal(false)}
            cancelButtonProps={{ style: { display: "none" } }}
            okButtonProps={{ style: { display: "none" } }}
          />
        ) : null
      }
    </Wrapper>
  );
};
export default VendorSettings;
