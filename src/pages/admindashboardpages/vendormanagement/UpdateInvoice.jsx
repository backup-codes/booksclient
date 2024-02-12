import Wrapper from '../../../assets/wrappers/adminwrappers/Forms'
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

//icon imports
import { FaUpload } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";

//react imports
import { useState } from 'react';

const UpdateInvoice = () => {
    const [paymentMode, setPaymentMode] = useState("");

    return (
        <Wrapper className='page'>
            <div className="page-content">
                <div>
                    <h3>Update Ingredient Details</h3>
                </div>

                <div className="custom-form">
                    <form >

                        <div className='form-input-row'>
                            <div className='form-input'>
                                <label htmlFor="customer" className="text-left">
                                    Ingredients
                                </label>
                                <br />

                                <select className='form-select'>
                                    <option value="">Please select</option>
                                    <option value="vegetables">Vegetables</option>
                                    <option value="fruits">Fruits</option>
                                    <option value="milk">Milk</option>
                                    <option value="dairy">Dairy</option>
                                    <option value="chicken">Chicken</option>
                                    <option value="mutton">Mutton</option>
                                    <option value="fish">Fish</option>
                                    <option value="egg">Egg</option>
                                    <option value="bread">Bread</option>
                                    <option value="beverages">Beverages</option>
                                    <option value="grocery">Grocery</option>
                                </select>
                            </div>

                            <div className='form-input'>
                                <label htmlFor="phone" className="text-left">
                                    Vendor ID
                                </label>
                                <br />

                                <input
                                    type="phone"
                                    placeholder="Enter vendor ID"

                                />
                            </div>
                        </div>

                        <div className='form-input-row'>
                            <div className='form-input'>
                                <label htmlFor="customer" >
                                    Vendor Name
                                </label>
                                <br />

                                <input

                                    type="text"
                                    placeholder="Enter the vendor name"

                                />
                            </div>

                            <div className='form-input'>
                                <label htmlFor="phone" >
                                    Vendor Contact Number
                                </label>
                                <br />

                                <input
                                    type="phone"
                                    placeholder="Enter the contact number"

                                />
                            </div>
                        </div>


                        <div className='form-input-row'>
                            <div className='form-input-textarea'>
                                <label>Description</label>
                                <br />
                                <textarea name="" className="text-area" placeholder='Please enter the name and quantity of the items that are received' ></textarea>
                            </div>

                        </div>



                        <div className='form-input-row'>
                            <div className='form-input'>
                                <label htmlFor="address" className="text-left">
                                    Total Quantity
                                </label>
                                <br />

                                <input
                                    type="number"
                                    placeholder="Enter quantity"
                                />
                            </div>

                            <div className='form-input'>
                                <label className="text-left">
                                    Amount
                                </label>
                                <br />
                                <input
                                    type="number"
                                    placeholder="Enter amount"
                                />
                            </div>
                        </div>

                        <div className="form-input-row">
                            <div className="form-input-full">
                                <label>Mode of Payment</label>

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



                        <div className='form-input-row'>
                            <div className='form-input-full'>
                                <label htmlFor="billImage" className="text-left">
                                    Upload Bills
                                </label>
                                <br />

                                <label htmlFor="billImage" className="file-upload">
                                    <input
                                        type="file"
                                        name="billImage"
                                        id="billImage"

                                    />
                                    <span className="upload-icon" ><FaUpload /></span>
                                    <label htmlFor="billImage" className="browse-btn">Browse File</label>
                                </label>


                            </div>
                        </div>


                        <div className="buttons">
                            <Button className="submit-btn" type="submit">
                                Submit
                            </Button>
                            <Link to="/dashboard/vendor-management/invoice">
                                <Button className="cancel-btn" type="button">
                                    Cancel
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </Wrapper>
    )
}
export default UpdateInvoice