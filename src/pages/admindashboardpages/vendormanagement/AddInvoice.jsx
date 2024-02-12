import Wrapper from "../../../assets/wrappers/adminwrappers/Forms";
import { Link, useNavigate } from "react-router-dom";
// bootstrap imports 
import Button from "react-bootstrap/Button";
// antd imports 
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Space, AutoComplete, Select, Input } from 'antd';
const { TextArea } = Input;
//icon imports
import { FaUpload } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'


//backend updates
import { getAllVendors, getCommoditiesOfRestaurant, postIngredientsDetails } from "../../../config/routeApi/owner";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Uploading from "../../../components/loaders/Uploading";
import { toastError, toastSuccess } from "../../../helpers/helpers";

const AddInvoice = () => {
  const [paymentMode, setPaymentMode] = useState("");
  const [errorMessage, setErrorMessage] = useState('');

  // const [categories,setCategories] = useState(['Vegetables', 'Fruits', 'Beverages'])
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedvalue, setSelectedValue] = useState([]);
  const [commodities, setComodities] = useState([]);
  // const [category, setCategory] = useState('');
  const [isUploading, setUploading] = useState(false)
  const [totalCommodityAmount, setTotalCommodityAmount] = useState(0);
  const [form] = Form.useForm();
  const [vendors, setVendors] = useState([]);
  const [units, setUnits] = useState([
    { value: 'kg', label: 'Kilogram (kg)' },
    { value: 'l', label: 'liters (l)' },
  ],);
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFinish = (values) => {
    // console.log("called");
        console.log(values,"heey");

    if (!paymentMode) {
      setErrorMessage('Please select a payment mode.');
      return;
    }

    (async function addIngredient() {

      setUploading(true)

     
      const response = await postIngredientsDetails({
        ...values, image,
        paymentMode
      });
      setUploading(false)

      if (response.data.success) {


        navigate(-1)
        toastSuccess(response.data.message)
      } else {
        toastError(response.data.message)

      }
    })();

  };
  const handleChange = (value) => {
    console.log(value)
    setSelectedValue(value);
  };

  const handleImage = (e) => {
    const image = e.target.files[0];
    if (image) {
      const reader = new FileReader();

      reader.onload = function (e) {
        setImagePreview(e.target.result);
      };

      reader.readAsDataURL(image);
    }

    setImage(image);
  };

  // const navigate = useNavigate();

  useEffect(() => {

    async function getvendors() {

      const { data } = await getAllVendors()
      if (data.success) {

        const newOptions = data.vendors.map((vendor) => ({
          key: vendor._id,
          value: `${vendor._id} - ${vendor.vendorId} - ${vendor.vendorName} - ${vendor.phone}`,
          label: `${vendor.vendorId} - ${vendor.vendorName} - ${vendor.phone}`,
        }));

        setVendors(newOptions)

      }

    }

    getvendors()

    async function getCommodities() {
      const { data } = await getCommoditiesOfRestaurant()
      if (data.success) {

        setComodities(data.commodities)
      }
    }

    getCommodities()
  }, [])



  const handleValuesChange = (changedValues, allValues) => {
    const { commodities } = allValues;

    // Calculate total sum of commodity amounts
    const sumCommodityAmount = commodities.reduce((total, { CommodityAmount = 0, GstAmount = 0 }) => {
      const commodityAmount = parseFloat(CommodityAmount) || 0;
      const gstAmount = parseFloat(GstAmount) || 0;
      const totalCommodity = commodityAmount + gstAmount;
      return total + totalCommodity;
    }, 0);

    setTotalCommodityAmount(sumCommodityAmount);

    // Calculate and set total amount for each commodity
    const updatedCommodities = commodities.map((commodity) => {
      const commodityAmount = parseFloat(commodity.CommodityAmount) || 0;
      const gstAmount = parseFloat(commodity.GstAmount) || 0;
      const totalCommodity = commodityAmount + gstAmount;
      return {
        ...commodity,
        TotalCommodityAmount: totalCommodity.toFixed(2),
      };
    });

    form.setFieldsValue({ commodities: updatedCommodities });

    // Calculate total amount including GST for the entire form
    const totalAmount = sumCommodityAmount + parseFloat(allValues.totalAmount?.gstAmount || 0);
    form.setFieldsValue({ totalAmount });

  };


  return (
    <>
      {isUploading ? (<Uploading isUploading={isUploading} />) : null}
      <Wrapper className="page">
        <div className="page-content">
          <div>
            <h3>Add Invoice Details</h3>
          </div>

          <div className="custom-form">
            <Form
              form={form}
              onFinish={onFinish}
              onValuesChange={handleValuesChange}
              autoComplete="off" >
              <div className="form-input-row">
                <div className="form-input-full">
                  <label htmlFor="ingredient" className="text-left">
                    Vendor
                    <span className="text-danger">*</span>
                  </label>
                  <br />

                  {vendors && (
                    <Form.Item name="vendorId"   rules={[{ required: true, message: 'Search & Select Vendor' }]}>

                      <Select
                        showSearch="single"
                        placeholder="Type or Select VendorId or Vendor Name"
                        onChange={handleChange}
                        options={vendors}
                        style={{ width: "100%", height: "45px", border: "1px solid #A7CFFF", borderRadius: "7px" }}
                        className="antd-select-customization"
                        bordered={false}
                      />

                    </Form.Item>
                  )}
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input-textarea">
                  <label>Description<span className="text-danger">*</span></label>
                  <br />
                  <Form.Item name="description" rules={[{ required: true, message: 'Missing Vendor Description' }]}>

                    <TextArea
                      showCount
                      maxLength={100}
                      // onChange={onChange}
                      placeholder="Description"
                      style={{ height: 120, resize: 'none' }}
                    />


                  </Form.Item>
                  {errors.description && errors.description.type === "required" && (
                    <label className="text-sm">Please enter the description</label>
                  )}
                </div>
              </div>

              <div>
                <label>Commodities<span className="text-danger">*</span></label>
                <br />
                <Form.List name="commodities" initialValue={['']}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }, index) => (

                        <div key={index}>
                          {/* style={{ display: 'flex', marginBottom: 8 }} */}
                          <Space key={key} align="baseline" className="form-commodity-row">
                            <Form.Item

                              {...restField}
                              name={[name, 'commodity']}
                              rules={[{ required: true, message: 'Enter Valid Commodity Name' ,   pattern: /^[A-Za-z]+$/,}]}
                            >
                              <AutoComplete
                                dataSource={commodities}
                                placeholder="Select or Enter New Category"
                                filterOption={(inputValue, option) =>
                                  option.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }>

                                <Input style={{ borderStyle: "none" }} />
                              </AutoComplete>
                            </Form.Item>

                            <Form.Item
                              {...restField}
                              name={[name, 'Quantity']}
                              rules={[
                                { required: true, message: 'Enter Valid Quantity',pattern: new RegExp(/^[0-9]+$/) },
                              
                              ]}
                            >
                              <Input placeholder="Quantity" />
                            </Form.Item>

                            <Form.Item
                              {...restField}
                              name={[name, 'Unit']}
                            rules={[{ required: true, message: 'Select a Unit' },]}
                            >
                              {units && (<Select

                                style={{ height: "50px" }}
                                // onChange={handleChange}
                                placeholder="Unit"
                                options={[{ value: 'kg', label: 'Kilogram (kg)' },
                                { value: 'l', label: 'liters (l)' }, { value: 'Count', label: 'Count' },]}
                              />)
                              }
                            </Form.Item>

                            <Form.Item
                              {...restField}
                              name={[name, 'CommodityAmount']}
                              rules={[{ required: true, message: 'Enter Valid Amount' ,pattern: new RegExp(/^[0-9]+$/) },
                             
                            
                              ]}
                            >
                              <Input placeholder="Amount" />

                            </Form.Item>


                            <Form.Item
                              {...restField}
                              name={[name, 'GstAmount']}
                              rules={[{ required: true, message: 'Enter valid GST Amount',pattern: new RegExp(/^[0-9]+$/) },
                           ]}
                            >
                              <Input placeholder="GST Amount" />
                            </Form.Item>



                            <Form.Item
                              {...restField}
                              name={[name, 'TotalCommodityAmount']}

                            >
                              <Input disabled placeholder="Total Amount" />
                            </Form.Item>


                            <MinusCircleOutlined className="minus-circle" onClick={() => remove(name)} />

                          </Space>
                        </div>
                      ))}
                      <Form.Item style={{ marginTop: "20px" }}>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                          Add More
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>

              </div>


              <div className="form-input-row">
                <div className="form-input-full">
                  <label>Total Amount</label>

                  <br />
                  <Form.Item

                    // {...restField}
                    name="totalAmount"
                  // name={[name, 'totalAmount']}
                  // rules={[{ required: true, message: 'Please enter a valid amount', type: 'number' }]}
                  >
                    <Input disabled type="number" placeholder="Total Amount" value={totalCommodityAmount} />


                  </Form.Item>


                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input-full">
                  <label>Mode of Payment<span className="text-danger">*</span></label>

                  <div className="radio-div">

                    <div className="payment-btn-div">
                      <div className={`payment-btn ${paymentMode === "cash-voucher" ? "payment-btn-active" : ""}`} onClick={() => setPaymentMode("cash-voucher")}>
                        <span><TiTick /></span>Cash Voucher
                      </div>
                    </div>

                    <div className="payment-btn-div">
                      <div className={`payment-btn ${paymentMode === "upi" ? "payment-btn-active" : ""}`} onClick={() => setPaymentMode("upi")} >
                        <span><TiTick /></span>UPI
                      </div>
                    </div>

                    <div className="payment-btn-div">
                      <div className={`payment-btn ${paymentMode === "cheque" ? "payment-btn-active" : ""}`} onClick={() => setPaymentMode("cheque")} >
                        <span><TiTick /></span>Cheque
                      </div>
                    </div>

                    <div className="payment-btn-div">
                      <div className={`payment-btn ${paymentMode === "nft" ? "payment-btn-active" : ""}`} onClick={() => setPaymentMode("nft")} >
                        <span><TiTick /></span>NFT
                      </div>
                    </div>

                    <div className="payment-btn-div">
                      <div className={`payment-btn ${paymentMode === "inpc" ? "payment-btn-active" : ""}`} onClick={() => setPaymentMode("inpc")} >
                        <span><TiTick /></span>INPC
                      </div>
                    </div>
                  </div>


                </div>
              </div>
              
              {!paymentMode&&errorMessage && <div className="error-message">
                <h1 className="error-msg">{errorMessage}</h1>
               </div>}

              <div className="form-input-row">
                <div className="form-input-upload">
                  <label htmlFor="billImage" className="text-left">
                    Upload Bills<span className="text-danger">*</span>
                  </label>
                  <br />
                  <label htmlFor="billImage" className="file-upload">
                  <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Missing Item Image",
                        },
                        
                      ]}
                              name={"Image"}
                    >

                      <Input
                        
                      type="file"
                      id="billImage"
                      accept="image/jpeg, image/png"
                      onChange={handleImage}
                     />

                    {/* <input
                      {...register("billImage", { required: true })}
                      type="file"
                      accept="image/jpeg, image/png"
                      onChange={handleImage}
                      name="billImage"
                      id="billImage"
                      
                      
                      /> */}

                      </Form.Item>
                    <span className="upload-icon" ><FaUpload /></span>
                    <label htmlFor="billImage" className="browse-btn">Browse File</label>
                  </label>
                  {errors.billImage && errors.billImage.type === "required" && (
                    <label className="text-sm">Please upload the bill image </label>
                  )}
                </div>
                {image && (


                  <div className="col-md-5 mt-3">
                    <Zoom>

                      <img
                        src={imagePreview}
                        alt="Invoice Preview"
                        className="img-fluid rounded-4"
                        style={{ width: "300px" }} />

                    </Zoom>
                  </div>


                )}
              </div>

              <div className="buttons">
                <Button className="submit-btn" type="submit">
                  Submit
                </Button>
                <Link to={-1}>

                  <Button className="cancel-btn" type="button">
                    Cancel
                  </Button>
                </Link>



              </div>

            </Form>

          </div>
        </div>
      </Wrapper>
    </>
  );
};
export default AddInvoice;
