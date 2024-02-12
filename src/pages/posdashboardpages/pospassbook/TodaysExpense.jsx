import Wrapper from "../../../assets/wrappers/poswrappers/PosCustomers";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { IoSearchSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { expenseDateFilter, fetchExpenseData, searchTodaysExpense } from "../../../config/routeApi/pos";
import ViewModal from "../../../components/poscomponents/ViewModal";
import { useForm } from "react-hook-form";
import { toastError } from "../../../helpers/helpers";

const TodaysExpense = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [expenseData, setexpenseData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [viewdata, setSeletedviewdata] = useState();
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilteredData, setShowFilteredData] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  async function search(query) {
    try {

      setSearchQuery(query);

      if (searchQuery) {

        const response = await searchTodaysExpense(searchQuery); // Use correct variable name here
        if (response.data.success) {

          setShowFilteredData(true)
          setFilteredData(response.data.data)
        }
      }


      console.log(showFilteredData, "filtered");
    } catch (error) {
      console.log(error);
    }
  }






  useEffect(() => {


    (async function fetchExpense() {

      const response = await fetchExpenseData()
      if (response.data.success) {

        setexpenseData(response.data.data)

      } else {
        toastError(response.data.message)

      }

    })()

  }, []);

  async function handleView(data) {
    setSeletedviewdata(data);
    setModalShow(true);
  }


  const handleDateFilter = async (data) => {
    try {


      const response = await expenseDateFilter(data);
      console.log(response)

      if (response.data.success) {
        setFilteredData(response.data.data);
        setShowFilteredData(true);
      } else {

        toastError(response.data.message)

      }




    } catch (error) {
      console.error(error);
    }
  };

  return (


    <Wrapper className="page">
      <div className="page-content">
        <div className="page-header">

          <h3>Expense Report</h3>

          <Button className="fw-normal">
            <Link
              className="page-header-btn"
              to="/pos-dashboard/pos-passbook/add-todays-expense"
            >
              <FaPlus className="plus-icon" />Add Expense Report
            </Link>
          </Button>


        </div>


        <div className="search-and-btn">
          <div className="search-div">
            <div className="search-input-group">
              <IoSearchSharp className="search-icon" />
              <input type="text" placeholder="Search"
                onInput={(e) => search(e.target.value)}

                className="search-bar" />
            </div>
            {/* <button className="search-btn">Search</button> */}
          </div>

          <div>
            <form onSubmit={handleSubmit(handleDateFilter)}>
              <div className="dates">
                <div className="date left">
                  <Form.Label>From</Form.Label>
                  <div>
                    <Form.Control
                      className="date-input"
                      type="date"
                      {...register("start", { required: true })}
                    />
                    {errors.start && (
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid date
                      </Form.Control.Feedback>
                    )}
                  </div>
                </div>

                <div className="date right">
                  <Form.Label>To</Form.Label>
                  <div>
                    <Form.Control
                      className="date-input"
                      type="date"
                      {...register("end", { required: true })}
                    />
                    {errors.end && (
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid date
                      </Form.Control.Feedback>
                    )}
                  </div>
                </div>
                <Button className="search-btn" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>




        <div className="table-div">
          <Table striped bordered hover className="table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Date</th>
                <th>Total Amount</th>
                <th>Description</th>
                <th>Bill</th>
              </tr>
            </thead>



            {!showFilteredData && (<tbody>

              {expenseData.map((item, i) => {
                const dateObject = new Date(item.date);
                const formattedDate = dateObject.toLocaleDateString();

                return (
                  <tr key={item._id}>
                    <td>{i + 1}</td>
                    <td>{formattedDate}</td>
                    <td>{item.amount}</td>
                    <td>{item.description}</td>
                    <td>{
                      <div className="actions">

                        <div className="link-wrapper">
                          <Link
                            className="action-list"
                            onClick={() => handleView(item.billURL)}>
                            <a className="view">
                              View
                            </a>
                          </Link>
                        </div>
                      </div>

                    }</td>

                  </tr>
                );
              })}


            </tbody>)}

            {showFilteredData && filteredData && (<tbody>

              {filteredData.map((item, i) => {
                const dateObject = new Date(item.date);
                const formattedDate = dateObject.toLocaleDateString();

                return (
                  <tr key={item._id}>
                    <td>{i + 1}</td>
                    <td>{formattedDate}</td>
                    <td>{item.amount}</td>
                    <td>{item.description}</td>
                    <td>{
                      <div className="actions">

                        <div className="link-wrapper">
                          <Link
                            className="action-list"
                            onClick={() => handleView(item.billURL)}>
                            <a className="view">
                              View
                            </a>
                          </Link>
                        </div>
                      </div>

                    }</td>

                  </tr>
                );
              })}

              
            </tbody>)}



          </Table>
        </div>
      </div>

      {

viewdata ? (
  <ViewModal
  viewData={viewdata}
  open={modalShow}
  onCancel={() => setModalShow(false)}
  cancelButtonProps={{ style: { display: "none" } }}
  okButtonProps={{ style: { display: "none" } }}
  />) : null
}

    </Wrapper>
  );
};
export default TodaysExpense;




