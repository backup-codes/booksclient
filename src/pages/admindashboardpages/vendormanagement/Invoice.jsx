//styled-components imports
import Wrapper from "../../../assets/wrappers/adminwrappers/BasicDetails";
//bootstrap imports
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
//icon imports
import { FaPlus } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
//react imports
import { Link } from "react-router-dom";
//backend updates
import { getIngredientsData } from "../../../config/routeApi/owner";

import { useEffect, useState } from "react";
import ViewVendorInvoiceDetailModal from "../../../components/admindashboardcomponents/ViewVendorInvoiceDetailModal";
import { toastSuccess } from "../../../helpers/helpers";


const Invoice = () => {

    const [ingredientsData, setIngredientsData] = useState([]);
    const [viewModal, setViewModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState()
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const handleIngredientData = async () => {
        try {
            const response = await getIngredientsData();
            if (response.data.success) {
                console.log(response.data.IngredientsData)
                setIngredientsData(response.data.IngredientsData);
            } else {

                toastSuccess(response.data.message)

            }
        } catch (error) {
            console.log(error);
        }
    };


    function handleViewDetail(selectedData) {
        setSelectedItem(selectedData)
        setViewModal(true)
    }

    useEffect(() => {
        handleIngredientData();
    }, []);


    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };



    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
          setDebouncedSearchTerm(searchTerm);
        }, 300); // Adjust the delay as needed (e.g., 300 milliseconds)
    
        // Clear the timeout if the component is unmounted or the search term changes
        return () => clearTimeout(delayDebounceFn);
      }, [searchTerm]);
    
      // Filter the ingredientsData based on the debounced search term
      const filteredData = ingredientsData.filter((item) => {
        const lowerCaseSearchTerm = debouncedSearchTerm.toLowerCase();
        return (
          item.vendorId.vendorId.toLowerCase().includes(lowerCaseSearchTerm) ||
          item.vendorId.vendorName.toLowerCase().includes(lowerCaseSearchTerm) ||
          item.description.toLowerCase().includes(lowerCaseSearchTerm) ||
          item.paymentMode.toLowerCase().includes(lowerCaseSearchTerm) ||
          item.amount.toString().includes(debouncedSearchTerm)
        );
      });


    // const filteredData = ingredientsData.filter((item) => {
    //     const lowerCaseSearchTerm = searchTerm.toLowerCase();
    //     return (
    //         item.vendorId.vendorId.toLowerCase().includes(lowerCaseSearchTerm) ||
    //         item.vendorId.vendorName.toLowerCase().includes(lowerCaseSearchTerm) ||
    //         item.description.toLowerCase().includes(lowerCaseSearchTerm) ||
    //         item.paymentMode.toLowerCase().includes(lowerCaseSearchTerm) ||
    //         item.amount.toString().includes(searchTerm)
    //     );
    // });

    //TABLE HEADING DATA
    const tableHeading = [
        {
            id: 1,
            title: "Date & Time",
        },
        {
            id: 2,
            title: "Vendor ID",
        },
        {
            id: 3,
            title: "Vendor Name",
        },
        {
            id: 4,
            title: "Description",
        },
        {
            id: 5,
            title: "Mode of Payment",
        },
        {
            id: 6,
            title: "Total Amount",
        },
    ];



    return (
        <Wrapper className="page">
            <div className="page-content">
                <div className="page-header">
                    <h3>Vendor Invoice Details</h3>


                </div>

                <div className="search-and-btn" >
                    <div className="search-div">
                        <div className="search-input-group">
                            <IoSearchSharp className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search"
                                className="search-bar"
                                value={searchTerm}
                                onChange={handleSearch}
                            />


                        </div>
                        {/* <button className="search-btn">Search</button> */}
                    </div>

                    <Button>
                        <FaPlus className="plus-icon" />
                        <Link className="page-header-btn" to="/dashboard/vendor-management/add-invoice">
                            Add Invoice
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
                            {filteredData && filteredData.map((item, i) => {
                                const dateObject = new Date(item.createdAt);
                                const options = {
                                    year: '2-digit',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true,
                                
                                };
                                const formattedDate = dateObject.toLocaleString('en-US', options);

                                return (
                                    <tr key={item._id}>
                                        <td>{i + 1}</td>
                                        <td>{formattedDate}</td>
                                        <td>{item.vendorId.vendorId}</td>
                                        <td>{item.vendorId.vendorName}</td>
                                        <td>{item.description}</td>
                                        <td>{item.paymentMode}</td>
                                        <td>{item.amount}</td>


                                        <td>
                                            <div className="actions">
                                                <div className="link-wrapper" onClick={() => handleViewDetail(item)}>

                                                    <a className="edit">
                                                        View
                                                    </a>

                                                </div>
                                                {/* <div className="link-wrapper">
                                                    <Link className="action-list" to={`/dashboard/vendor-management/update-invoice`}>
                                                        <a className="edit">
                                                            Edit
                                                        </a>
                                                    </Link>
                                                </div>

                                                <div className="link-wrapper">
                                                    <a className="delete">
                                                        Delete
                                                    </a>
                                                </div> */}
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
                    <ViewVendorInvoiceDetailModal
                        viewData={selectedItem}
                        open={viewModal}
                        onCancel={() => setViewModal(false)}
                        cancelButtonProps={{ style: { display: "none" } }}
                        okButtonProps={{ style: { display: "none" } }}
                    />
                ) : null
            }
        </Wrapper>

    )
}
export default Invoice