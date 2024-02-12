// import axios from "axios";
import Wrapper from "../../assets/wrappers/poswrappers/PosFormModal";
// import Form from "react-bootstrap/Form";
// import { RestaurantAdminApi } from "../../config/global";
// import MenuModal from "./MenuModal";
// import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { generateRandomBillIdWithPrefix } from "../../helpers/helpers";
import { Form, Space, AutoComplete, Select, Input } from 'antd';
import { useEffect, useState } from "react";
import {  getBromagUniqueOrderId } from "../../config/routeApi/pos";
const { TextArea } = Input;
const OnlineOrdersModal = (props) => {
  const [orderId,setOrderId]=useState("")
  //backend integration code

  const [form] = Form.useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  console.log(props, "hey");
  
  
  
  
  useEffect(() => {
    (async function getBromagBillId() {
      try {
        
        if (props.platform == "Bromag") {
  
          
          const { data } = await getBromagUniqueOrderId()

          console.log(data," ia maaa");
          
          if (data.success) {
            
            setOrderId(data.OrderId)
            
          }
          //   const randomOrderId = generateRandomBillIdWithPrefix();
          
          // setOrderId(randomOrderId);
        
        
        }
      
      } catch (err) {
        console.log(err);
      }
    })();
    
  }, [])
  



  const onFinish = (values) => {
    values.orderMode = props.platform;
    console.log(values, " i am values");
    
    navigate("/pos-dashboard/pos-menu", {
      state: { orderData: values },
    });
      }

  return (
    <Wrapper centered {...props}>
      <h4 className="title">{ props.platform}</h4>

      <div className="form-div">


        {/* <form onSubmit={handleSubmit(handleSubmitButton)}> */}

        
        
    { (orderId || props.platform !== "Bromag") && (    <Form
          form={form}
          onFinish={onFinish}
          // onValuesChange={handleValuesChange}
          autoComplete="off"
          initialValues={{
            paymentMethod: props.platform,
            orderId:orderId
          }}>
          
          <div className="form-row">

            {/* <div className="form-group">
              <label>Online Platform</label>
              <input
                {...register("orderStation", { required: true })}
                type="text"
                id="orderStation"
                placeholder="Please enter from where the order has come"
              />
              {errors.orderStation &&
                errors.orderStation.type === "required" && (
                  <label className="error-msg">
                    Please enter from where the order has come
                  </label>
                )}
            </div> */}
            
     <div className="form-group">
              <label>Order date & time</label>

              {/* <input
                {...register("orderTime", { required: true })}
                type="datetime-local"
                id="orderTime"
                placeholder="Please enter your ordered time"
              />
              {errors.orderTime && errors.orderTime.type === "required" && (
                <label className="error-msg">
                  Please enter your ordered time
                </label>
              )} */}

              <Form.Item name="orderTime" id="orderTime"  rules={[{ required: true, message: 'Missing Ordered Time' }]}>
                <Input   type="datetime-local"/>

              </Form.Item>
              



            </div>


  <div className="form-group">
                <label >Order ID</label>
                

    {/* <input
      {...register("orderId", { required: true })}
      type="text"
      id="orderId"
      placeholder="Please enter Order ID"
      disabled={props.platform === "Bromag"}
    />
    {errors.orderId && errors.orderId.type === "required" && (
      <label className="error-msg">Please enter Order ID</label>
                )} */}
                
                <Form.Item name="orderId" id="orderId"  rules={[{ required: true, message: 'Missing OrderId' }]}>
                <Input   disabled={props.platform === "Bromag"}  type="text"/>

              </Form.Item>

  </div>




            </div>

        <div className="form-row">
       

            <div className="form-group">
              
              <label  htmlFor="paymentMethod">Mode of Payment</label>

              {/* <input
                readOnly 
                value={props.platform} id="paymentMethod"
                {...register("paymentMethod")}
              /> */}


              <Form.Item name="paymentMethod" id="paymentMethod" rules={[{ required: true, message: 'Missing paymentMethod' }]}>
                
                <Input  readOnly  type="text"/>

              </Form.Item>
             
            </div>
          </div>  

          <div className="form-btn">
            <button type="submit">
              Submit
            </button>
          </div>
          {/* </form> */}
          </Form>)}
          
      </div>
    </Wrapper>
  );
};
export default OnlineOrdersModal;
