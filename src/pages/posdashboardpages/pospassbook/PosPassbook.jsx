//styled-component imports
import Wrapper from "../../../assets/wrappers/poswrappers/PosCustomers";
import Styled from "styled-components";
//react-icon imports
import { IoSearchSharp } from "react-icons/io5";
//react imports
import { Link } from "react-router-dom";
//bootstrap imports
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
//icon imports
import { FaPlus } from "react-icons/fa";
//image imports
import { CardBg } from "../../../assets/images";
//backend imports
import { useEffect, useMemo, useState } from "react";
import {
  PassbookDateFilter,
  fetchTodaysOpeningData,
  fetchTodaysfloatingCash,
} from "../../../config/routeApi/pos";
import { useForm } from "react-hook-form";
import { restaurantPosAxiosInstance } from "../../../config/apiInterceptor";
import ViewModal from "../../../components/poscomponents/ViewModal";
// import '../../../assets/css/PosPassbook.css'
import CountUp from 'react-countup';
import { toastError } from "../../../helpers/helpers";

const CardDeck = Styled.section`
display: flex;
// justify-content: space-around;
column-gap: 20px;
row-gap 20px;
h1{
  margin-bottom: 0px;
  font-weight: 700;
  z-index: 5;
}
.card{
  width: 30%;
  padding: 20px;
  text-align: center;
  color: #fff;
  border-radius: 15px;
  position: relative;
  border-style: none;
}
.sales-card{
 background: linear-gradient(to bottom,#2B8DFF,#2b8eff45);
}
.card-bg{
  width: 310px;
  height: 110px;
  background: url(${CardBg});
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  bottom: 0;
  right:0;
}
.card-body{
  z-index: 5;
}
.card-title{
  padding-bottom: 20px;
  font-weight: 700;
}
`;


const PosPassbook = () => {
  const [passbookData, setPassbookData] = useState([]);
  const [openingBalance, setOpeningBalance] = useState(0);
  const [floatingCash, setfloatingCash] = useState(0);
  const [expenseCash, setExpenseCash] = useState(0);
  const [closingCash, setClosingBalance] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [showFilteredData, setShowFilteredData] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [isClosingAdded, setIsClosingAdded] = useState(false);
  const [isOpeningAdded, setIsOpeningAdded] = useState(false);
  const [viewdata, setSeletedviewdata] = useState();
  const [searchTerm, setSearchTerm] = useState("");


  // const totalSales = useMemo(() => {
  //   if (floatingCash && openingBalance && expenseCash) {
  //     return +floatingCash + +openingBalance - +expenseCash;
  //   } else if (openingBalance && expenseCash) {

  //     return +openingBalance - +expenseCash;

  //   } else if (floatingCash && expenseCash) {

  //     return +floatingCash - +expenseCash

  //   } else if (floatingCash && openingBalance) {

  //     return +floatingCash + +openingBalance

  //   } else if (floatingCash) {
  //     return +floatingCash
  //   } else if (openingBalance) {
  //     return +openingBalance
  //   }
  // }, [floatingCash, openingBalance]);

  async function handleView(data) {
    console.log(data,"data");
    setSeletedviewdata(data);
    setModalShow(true);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const filteredPassbookData = passbookData.filter((item) => {
    // Modify this condition based on your search criteria
    return (
      item.date.includes(searchTerm) ||
      item.totalOrder.toString().includes(searchTerm) ||
      item.totalAmount.toString().includes(searchTerm) ||
      item.totalAmountTakeaway.toString().includes(searchTerm)
    );
  });
  

  useEffect(() => {


    const isAdded = async () => {
      try {
        const {data} = await restaurantPosAxiosInstance.get('isPassBookReportsAdded')

        if (data.success) {
         setIsClosingAdded(data.isClosingExist) 
         setIsOpeningAdded(data.isOpeningExist) 
        }  

      } catch (err) {
        console.log(err);
      }
    }
    isAdded()

    const handlefetchPassbookData = async () => {
      try {
        const response = await restaurantPosAxiosInstance.get(
          "/pos/fetchPassbookData"
        );

        if (response.data.success) {

          setPassbookData(response.data.data);

        }
      } catch (error) {
        console.log(error);
      }
    };

    handlefetchPassbookData()

    const getOpeningBalance = async () => {
      const {data} = await fetchTodaysOpeningData();
      if (data.success) {

        console.log(data);

        setOpeningBalance(data.OpeningAmount)
        setExpenseCash(data.ExpenseAmount)
        setClosingBalance(data.ClosingAmount)
        setTotalSales(data.TotalSales)
        setfloatingCash(data.FloatingAmount)
     


      }
    };

    getOpeningBalance()

    // const getfloatingCash = async () => {


    //   const response = await fetchTodaysfloatingCash();

    

    //   if (response.data.success) {

    //     const floatingData = response.data.Floatingdata;

    //     const expenseData = response.data.Expensedata

    //     setExpenseCash(expenseData[0].totalExpense)
       

    //     setfloatingCash(floatingData[0].totalAmount);
    //   }
    // };

    // // getfloatingCash()



  }, []);

  const handleDateFilter = async (data) => {
    try {
      
      const response = await PassbookDateFilter(data);
      console.log(response);

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
          <h3>Passbook</h3>
        </div>

        <div className="button-deck">
          <Button disabled={isOpeningAdded} >
            <FaPlus className="plus-icon" />
            <Link
              className="page-header-btn"
              to="/pos-dashboard/pos-passbook/add-todays-opening-balance"
            >
              Add Today&apos;s  Opening Report
            </Link>
          </Button>

          <Button disabled={isClosingAdded}>
            <FaPlus className="plus-icon" />
            <Link
              className="page-header-btn"
              to="/pos-dashboard/pos-passbook/add-todays-closing"
            >
              Add Today&apos;s Closing Report
            </Link>
          </Button>
          
          <Button >
            <FaPlus className="plus-icon" />
            <Link
              className="page-header-btn"
              to="/pos-dashboard/pos-passbook/add-todays-expense"
            >
              Add Today&apos;s Expense Report
            </Link>
          </Button>

        </div>

        <CardDeck className="card-deck">
          <Card className="sales-card">
            <div className="card-bg"></div>
            <Card.Body >
              <Card.Title>Opening Amount</Card.Title>
              <h1><CountUp duration={0.6} prefix="₹ " end={openingBalance} /></h1>

            </Card.Body>
          </Card>
          <Card className="sales-card">
            <div className="card-bg"></div>
            <Card.Body >
              <Card.Title>Floating Amount</Card.Title>
              <h1><CountUp duration={0.6} prefix="₹ " end={floatingCash} /></h1>

            </Card.Body>
          </Card>
          <Card className="sales-card">
            <div className="card-bg"></div>
            <Card.Body >
              <Card.Title>Expense Amount</Card.Title>

              <h1><CountUp duration={0.6} prefix="₹ " end={expenseCash} /></h1>

            </Card.Body>
          </Card>
          <Card className="sales-card">
            <div className="card-bg"></div>
            <Card.Body >
              <Card.Title>Closing Amount</Card.Title>

              <h1><CountUp duration={0.6} prefix="₹ " end={closingCash} /></h1>

            </Card.Body>
          </Card>
          <Card className="sales-card">
            <div className="card-bg"></div>
            <Card.Body>
              <Card.Title>Total Sales Amount</Card.Title>
              <h1><CountUp duration={0.6} prefix="₹ " end={totalSales} /></h1>

            </Card.Body>
          </Card>
        </CardDeck>

        <div>
          <div>
            <h3>Sales Report</h3>
          </div>

          <div className="button-date">
            <div className="search-div">
              <div className="search-input-group">
                <IoSearchSharp className="search-icon" />
                <input
  type="text"
  placeholder="Search"
  className="search-bar"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

              </div>
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
        </div>

        <div className="table-div">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Date</th>
                <th>Total Orders</th>
                <th>Total Amount</th>
                <th>Total Amount - Take Away</th>
         
              </tr>
            </thead>
            {!showFilteredData &&!filteredPassbookData&& (
              <tbody>
                {passbookData &&
                  passbookData.map((item, i) => {
                    const dateObject = new Date(item.date);

                    const formattedDate = dateObject.toLocaleDateString();
                    // const formattedTime = dateObject.toLocaleTimeString();
                    return (
                      <tr key={item._id}>
                        <td>{i + 1}</td>
                        <td>{formattedDate}</td>
                        {/* <td>{item.employeeid}</td> */}
                        <td>{item.totalOrder}</td>
                        <td>{item.totalAmount}</td>
                        <td>{item.totalAmountTakeaway}</td>
                      
                     
                      </tr>
                    );
                  })}
              </tbody>
            )}

            {showFilteredData && (
              <tbody>
                {filteredData &&
                  filteredData.map((item, i) => {
                    const dateObject = new Date(item.date);

                    const formattedDate = dateObject.toLocaleDateString();
                    const formattedTime = dateObject.toLocaleTimeString();
                    return (
                      <tr key={item._id}>
                        <td>{i + 1}</td>
                        <td>
                          {formattedDate} 
                        </td>
                        <td>{item.totalOrder}</td>
                        <td>{item.totalAmount}</td>
               
                        <td>{item.totalAmountTakeaway}</td>
                       
                      
                      </tr>
                    );
                  })}
              </tbody>
            )}


{filteredPassbookData && !showFilteredData &&(<tbody>
  {filteredPassbookData.map((item, i) => {
    const dateObject = new Date(item.date);
    const formattedDate = dateObject.toLocaleDateString();

    return (
      <tr key={item._id}>
        <td>{i + 1}</td>
        <td>{formattedDate}</td>
        <td>{item.totalOrder}</td>
        <td>{item.totalAmount}</td>
        <td>{item.totalAmountTakeaway}</td>
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
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        ) : null
      }
    </Wrapper>
  );
};
export default PosPassbook;
