//styled-component imports
import Wrapper from "../../../assets/wrappers/adminwrappers/BasicDetails";
import Styled from "styled-components";
//bootstrap imports
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
//antd imports
import { Modal } from "antd";
//icon imports
import { IoSearchSharp } from "react-icons/io5";
//react imports

import { useEffect, useState } from "react";

//image imports
import { CardBg } from "../../../assets/images";
import {
  CaptainList,
  CaptainPassFilter,
  OrderDataOfCap,
  SalesDataOfCap,
  TodaysOrderDataOfCap,
} from "../../../config/routeApi/owner";
import CountUp from "react-countup";
import toast from "react-hot-toast";
import { toastError } from "../../../helpers/helpers";
import { useForm } from "react-hook-form";

const CardDeck = Styled.div`
display: flex;
column-gap: 20px;
padding: 30px 0px;
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

// mode of payment card style

.mop-card{
  width: 160px;
  padding: 10px;
  background-color: #fff;
  color: #212529;
  border-radius: 7px;
  box-shadow: 0px 4px 15px 0px #C8E1FF;
  .card-title{
    font-weight: 700;
    padding-bottom: 0px;
    font-size: 14px;
  }
  h1{
    font-size: 16px;
    color: #2B8DFF;
    font-weight: 700;
  }
}
`;

const SalesReport = Styled.div`
  margin-top: 20px;
  color: #202123;

 .search-date{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 15px 0px;
  }
.search-div{
  display: flex;
  align-items: center;
}
  .search-input-group{
    position: relative;
  }

  .search-bar{
    border-style: none;
    box-shadow: inset 0px 2px 6px #00000040; 
    border-radius: 15px;
    padding: 7px 20px 7px 50px;
  }
  .search-bar:focus{
    outline: none;
  }
  .search-bar::placeholder{
    font-size: 12px;
  }
  .search-icon{
    font-size: 20px;
    color: #67666B;
    position: absolute;
    top: 9px;
    left: 15px;
  }
.search-btn{
  background-color: #00418D;
  padding: 10px 20px;
  margin-left: 5px;
  border-style: none;
  border-radius: 10px;
  color: #fff;
  font-size:12px;
}
.search-btn:hover{
  border-style: none;
  background-color:#7EB9FF;
}

  .dates{
      // width: 80%;
      display: flex;
      align-items: center;
      column-gap: 5px;
  }
  .date{
      display: flex;
      align-items: center;
      background-color: #fff;
      border-radius: 10px;
      padding: 5px 10px;
      label{
          margin: 0px 10px 0px 0px;
      }
  }
  .date-input{
    box-shadow: inset 0px 2px 6px #00000040; 
    border-radius: 50px;
    font-size: 10px;
  }
`;

const ModalStyle = Styled(Modal)`
margin: 50px 0px;
.ant-modal{
    width: 700px;
}
.modal-content{
    padding: 20px 10px;
}
h4{
    text-align: center;
    margin-bottom: 20px;
}
.items{
    display: flex;
    column-gap: 20px;
}
.left-item{
    width: 30%;
}
.right-item{
    width: 70%;
}
.cancel-btn{
    width: 100%;
    text-align: center;
    margin-top: 20px;
    button{
        padding: 10px 30px;
        border-style: none;
        border-radius: 7px;
        color: #fff;
        background-color: #00418E;
    }
}
`;



const CaptainPassbook = () => {

  const [viewdata, setSeletedviewdata] = useState(null);

  const [modalShow, setModalShow] = useState(false);

  const [todayDineInOrdersPerDay, setTodayDineInOrdersPerDay] = useState(0);
  const [todaysSalesInDineIn, setTodaysSalesInDineIn] = useState(0);
  const [sales, setSales] = useState([]);
  const [captain, setCaptain] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleDateFilter = async (data) => {
    try {
      const response = await CaptainPassFilter(data);
// console.log(response,"i am res");
      if (response.data.success) {
        setSales(response.data.data)
        // setFilteredData(response.data.data);
      } else {
        toastError(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const totalSalesData = [
    {
      title: "Total Sales/Day ",
      quantity: `${todayDineInOrdersPerDay ? todayDineInOrdersPerDay : 0}`,
    },
    {
      title: "Total Sales Amount/Day",
      quantity: `${todaysSalesInDineIn ? todaysSalesInDineIn : 0}`,
    },
  ];

  useEffect(() => {
    const handleLeadsData = async () => {
      try {
        const response = await CaptainList();
        console.log(response);
        setCaptain(response.data.captains);
      } catch (error) {
        console.log(error);
      }
    };
    handleLeadsData();
  }, []);

  const handleViewDetails = (captainData) => {
    setSeletedviewdata(captainData);
    setModalShow(true);
  };

  const handleCapOrder = async () => {
    try {
      const response = await TodaysOrderDataOfCap();

      console.log(response, "i am responeeee ");
      

      if (response.data.success) {
        // first render or today itself
        setTodayDineInOrdersPerDay(response.data.TodayDineInOrdersPerDay);
        setTodaysSalesInDineIn(response.data.TodaysSalesInDineIn);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCapSales = async () => {
    try {
      const response = await SalesDataOfCap();
      console.log(response.data, "i am sales cap");
      
      if (response.data.success) {
        // first render or today itself
        setSales(response.data.SalesAtCaptain);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleCapOrder();
    handleCapSales();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Wrapper className="page">
      <div className="page-content">
        <div className="page-header">
          <h3>Passbook</h3>
        </div>

        <CardDeck className="card-deck">
          {totalSalesData.map((item, index) => {
            return (
              <Card className="sales-card" key={index}>
                <div className="card-bg"></div>
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <h1>
                    <CountUp
                      duration={0.6}
                      prefix={
                        item.title === "Total Sales Amount/Day" ? "₹ " : ""
                      }
                      end={item.quantity}
                    />
                  </h1>
                </Card.Body>
              </Card>
            );
          })}
        </CardDeck>

        <SalesReport>
          <div>
            <h3>Sales Report</h3>
          </div>

          <div>
            <div className="search-date">
              <div className="search-div">
                <div className="search-input-group">
                  <IoSearchSharp className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search items..."
                    className="search-bar"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>

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
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Date</th>
                  <th>Total Orders</th>
                  <th>Total Amount</th>
                  {/* <th>Action</th> */}
                </tr>
              </thead>

              <tbody>
                {searchTerm
                  ? sales
                    .filter(
                      (item) =>
                        item.totalOrders.toString().includes(searchTerm) ||
                        item.totalSales.toString().includes(
                          searchTerm
                        ) ||
                        item._id.date.includes(
                          searchTerm
                        )
                    )
                    .map((item, i) => {
             

                      return (
                        <tr key={i}>
                           <td>{i + 1}</td>
                       
                       <td>{item._id.date}</td>
                       <td>{item.totalOrders}</td>
                       <td>{item.totalSales}</td>
                        </tr>
                      );
                    })
                  : sales.map((item, i) => {
                    
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                       
                        <td>{item._id.date}</td>
                        <td>{item.totalOrders}</td>
                        <td>{item.totalSales}</td>
                        {/* <td>{salesDataItem.TotalAmount}</td> */}
                        {/* <td>
                          <div className="actions">
                            <div className="link-wrapper">
                              <Link
                                className="action-list view"
                                onClick={() =>
                                  handleViewDetails(item.capManagerId)
                                }
                              >
                                View
                              </Link>
                            </div>
                          </div>

                     
                        </td> */}
                      </tr>
                    );
                  })}

             
              </tbody>
            </Table>
          </div>
        </SalesReport>
      </div>


      <div>
        <ModalStyle
          width="700px"
          centered
          open={modalShow}
          onCancel={() => setModalShow(false)}
          cancelButtonProps={{
            style: { display: "none" },
          }}
          okButtonProps={{ style: { display: "none" } }}
        >
          <div className="modal-content">
            <h4 className="title">
              Employee Basic Detail
            </h4>
            <div className="modal-content">
              <div className="items">
                <p className="left-item">Staff Name</p>
                <p className="right-item">
                  {viewdata?.username}
                </p>
              </div>
              <div className="items">
                <p className="left-item">Employee ID</p>
                <p className="right-item">
                  {viewdata?.employeeId}
                </p>
              </div>
            </div>
            <div className="cancel-btn">
              <button
                type="button"
                onClick={() => setModalShow(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </ModalStyle>
      </div>
    </Wrapper>
  );
};

export default CaptainPassbook;
