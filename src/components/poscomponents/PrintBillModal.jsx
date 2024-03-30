import React, { useEffect, useState } from "react";
import { PrintBill, posDashboard } from "../../config/routeApi/pos";
import { useNavigate } from "react-router-dom";

import Wrapper from "../../assets/wrappers/poswrappers/PosFormModal";
import { MdCurrencyRupee } from "react-icons/md";
import { IoMdPrint } from "react-icons/io";
import { calculateGST, toastError, toastSuccess } from "../../helpers/helpers";

const PrintBillModal = (props) => {
  const { printBillData, TotalPrice, onCancel, kotId } = props;
  console.log(printBillData, "printBillData");

  const [isUploading, setUploading] = useState(false);
  const [manager, setManager] = useState({});
  const [restaurant, setRestaurant] = useState({});

  const navigate = useNavigate();
  const { gstAmount, grandTotal } = calculateGST(TotalPrice);
  useEffect(() => {
    const handleManagerData = async () => {
      try {
        const response = await posDashboard();
        if (response.data.success) {
          setManager(response.data.ManagerData);
          setRestaurant(response.data.RestaurantData);
        } else {
          toastError(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleManagerData();
  }, []);

  // const handleOrderSubmit = async () => {
  //   try {
  //     setUploading(true);
  //     const data = {
  //       orderData: orderData,
  //       TotalPrice: TotalPrice,
  //       kotId: kotId,
  //     };

  //     console.log(data, "printbill takeaway ");

  //     localStorage.removeItem("selectedItems");

  // printBillData.map((item) => {
  //   localStorage.removeItem(`quantity_${item._id}`);
  // });

  // const response = await PrintBill(data);
  // // const response2 = await KotOrder(data);
  // setUploading(false);

  // if (response.data.success) {
  //   props.onCancel();
  //   navigate("/pos-dashboard");
  //   toastSuccess(response.data.message);
  // } else {
  //   toastError(response.data.message);
  // }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleOrderSubmit = async () => {
    try {
      // const restaurantAddressHtml =
      //   restaurant.address && restaurant.address.length > 0
      //     ? restaurant.address
      //         .map(
      //           (addressItem, index) =>
      //             `<div key=${index}>
      //     <p>
      //       ${addressItem.building}, ${addressItem.city}, ${addressItem.pin}, ${addressItem.district}, ${addressItem.state}
      //     </p>
      //     <p>Phone: ${addressItem.phone}</p>
      //   </div>`
      //         )
      //         .join("")
      //     : "";

      const printWindow = window.open("", "_blank");
      printWindow.document.write(
        `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Summary</title>

          <style>

          .body-print{
            width:300px;
          }
          .title {
            text-align: center;
            font-weight: 700;
            color: #393939;
            font-family: "Montserrat", sans-serif;
            font-size: 16px;
            text-transform: uppercase;
            margin:0px
          }
          
          .bill-header {
            width: 100%;
          
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .restaurant-header {
            text-align: center;
            text-transform: uppercase;
            margin-bottom: 15px;
            p {
              font-size: 12px;
              font-weight: 500;
              margin-bottom: 0px;
            }
          }
          .header-div {
            width: 100%;
            display: flex;
            justify-content: space-between;
          }
          .header-info > p {
            font-size: 12px;
            margin: 0px;
          }

         
          .summary-heading {
            width: 100%;
            display: flex;
            flex-direction:row;
            justify-content: space-between;
            gap:10
            align-items: center;
            p {
              font-weight: 700;
            }
          }
          .menu-item-name{
            width:60%;
          }
          .menu-item-name2{
            width:50%;
          }
          .food-check{
            width: 100%;
            display: flex;
            flex-direction:row;
            justify-content:end; 
            gap:10px
          }
         
          .single-item {
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            border-bottom: 1px solid #c1c1c1;
            margin-bottom: 5px;
            p {
              font-size: 16px;
              margin-bottom: 5px;
            }
          }
        
          .quantity {
            text-align: center;
           
            color: #b6b6b6;
          }
          .price {
            text-align: center;
          
            font-weight: 600;
            font-size: 14px;
          }
          .total {
            text-align: center;
            
            display: flex;
            justify-content: space-between;
            align-items: center;
            p {
              font-weight: 700;
              font-size: 16px;
              margin:5px 0;
            }
          }
          .gst {
            p {
              font-weight: 400;
              font-size: 14px;
              margin-bottom: 0px;
            }
          }
     
        </style>

       

        </head>
        <body>
        <div class=body-print>
          <h4 class="title">Order Summary</h4>
          <div class="form-div">
            <div class="bill-header">
              <div class="restaurant-header">
                <h5>${restaurant.username || "Restaurant"}</h5>
                ${
                  restaurant.address && restaurant.address.length > 0
                    ? restaurant.address
                        .map(
                          (addressItem, index) =>
                            `<div key=${index}>
                        <p>${addressItem.building}, ${addressItem.city}, ${addressItem.pin}, ${addressItem.district}, ${addressItem.state}</p>
                        <p>Phone: ${addressItem.phone}</p>
                      </div>`
                        )
                        .join("")
                    : "<p>No address found</p>"
                }
              </div>

               <div class="header-div">
                  <div class="header-info">
                    <div class="header-info">
                    
                    </div>
                    <p>POS ID: ${manager && manager.employeeId}</p>
                  </div>
              </div>
            </div>

            <div class="summary-items">
              <div class="summary-heading">
                <p class="menu-item-name">Menu Item</p>

                <div class="food-check">
                  <p>Qty</p>
                  <p>Price</p>
                  <p>Value</p>
                </div>
               
                
              </div>
              ${printBillData?.map((val, index) => {
                const subtotal = val.orderedQuantity * val.discountPrice;
                return `<div key=${index} class="single-item">
                    <p class="menu-item-name">${val.item}</p>
                    <div class="food-check">
                      <p class="quantity">x${val.orderedQuantity}</p>
                      <p class="price">
                      
                      &#x20B9; ${val.discountPrice}
                      </p>
                      <p class="price">
                      &#x20B9;${subtotal}
                      </p>
                    </div>
                  </div>`;
              })}
            
            </div>
            <div class="total">
            <p>SubTotal Amount</p>
            <p>
            &#x20B9;
              ${TotalPrice}
            </p>
          </div>

            <div class="total gst">
            <p>Gst Amount</p>
            <p>
            &#x20B9;
              ${gstAmount}
            </p>
          </div>

          <div class="total">
            <p>Total Amount</p>
            <p>
            &#x20B9;
              ${grandTotal}
            </p>
          </div>


            <div class="restaurant-header" style={{ marginTop: "20px" }}>
              <h6>thank you for your visit!</h6>
              <p>have a nice day!</p>
            </div>


          </div>
        </div>

        </body>
        </html>

        `
      );

      printWindow.document.close();
      printWindow.print();

      console.log(printBillData?._id, "printBillData?._id");

      const data = {
        userId: kotId,
        amount: TotalPrice,
      };

      printBillData.map((item) => {
        localStorage.removeItem(`quantity_${item._id}`);
      });

      const response = await PrintBill(data);
      // const response2 = await KotOrder(data);
      setUploading(false);

      if (response.data.success) {
        // navigate("/pos-dashboard");
        // toastSuccess(response.data.message);

        toastSuccess("Order saved");

        navigate("/pos-dashboard");
        props.onCancel();
      } else {
        toastError(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isUploading ? <Uploading isUploading={isUploading} /> : null}
      <Wrapper centered {...props}>
        <h4 className="title">Order Summary</h4>
        <div className="form-div">
          <>
            <div className="summary-items">
              {printBillData &&
                printBillData.map((item, index) => {
                  return (
                    <div key={index} className="single-item">
                      <p>{item.item}</p>
                      <p className="quantity">x{item.orderedQuantity}</p>
                      <p className="price">
                        <MdCurrencyRupee />
                        {TotalPrice}
                      </p>
                    </div>
                  );
                })}
            </div>
            <div className="total">
              <>
                <p>Total Amount</p>
                <p>
                  <MdCurrencyRupee />
                  {TotalPrice}
                </p>
              </>
            </div>
          </>
          <div className="form-btn">
            <button
              onClick={handleOrderSubmit}
              type="button"
              className="modal-btn"
            >
              <IoMdPrint style={{ marginRight: "10px", fontSize: "20px" }} />
              Print Bill
            </button>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default PrintBillModal;
