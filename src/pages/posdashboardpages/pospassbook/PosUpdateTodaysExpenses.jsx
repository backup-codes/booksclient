import Wrapper from "../../../assets/wrappers/poswrappers/PosForms"
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";


const PosUpdateTodaysExpenses = () => {
    return (
        <Wrapper className="page">
            <div className="page-content">
                <div className="page-header">
                    <h3>Update Expense</h3>
                </div>

                <div className="custom-form">
                    <form >
                        <div className='form-input-row'>
                            <div className='form-input'>
                                <label >
                                    Date
                                </label>
                                <br />
                                <input
                                    type="date"
                                />
                            </div>

                            <div className='form-input'>
                                <label>
                                    Total Orders
                                </label>
                                <br />

                                <input
                                    type="number"
                                    placeholder="Enter Total Orders"

                                />
                            </div>
                        </div>
                        <div className='form-input-row'>
                            <div className='form-input'>
                                <label >
                                    Total Amount
                                </label>
                                <br />
                                <input
                                    type="number"
                                    placeholder="Enter Total amount"
                                />
                            </div>

                            <div className='form-input'>
                                <label>
                                    Total Amount - Online Orders
                                </label>
                                <br />

                                <input
                                    type="number"
                                    placeholder="Enter Total Amount In Online Orders"

                                />
                            </div>
                        </div>

                        <div className='form-input-row'>
                            <div className='form-input'>
                                <label>
                                    Total Amount - Take Away
                                </label>
                                <br />

                                <input
                                    type="number"
                                    placeholder="Enter Total Amount In Take Away"

                                />
                            </div>

                            <div className='form-input'>
                                <label>
                                    Total Amount - Dine In
                                </label>
                                <br />

                                <input
                                    type="number"
                                    placeholder="Enter Total Amount In Dine In"

                                />
                            </div>
                        </div>

                        <div className='form-input-row'>
                            <div className='form-input'>
                                <label >
                                    Cash Received
                                </label>
                                <br />
                                <div className="checkbox-div">
                                    <input type="checkbox" />
                                    2000
                                </div>
                            </div>

                            <div className='form-input' style={{ marginTop: "25px" }}>
                                <input
                                    type="number"
                                    placeholder="Enter The Number of Notes"
                                />
                            </div>
                        </div>
                        <div className='form-input-row'>
                            <div className='form-input'>
                                <div className="checkbox-div">
                                    <input type="checkbox" />
                                    500
                                </div>
                            </div>

                            <div className='form-input'>
                                <input
                                    type="number"
                                    placeholder="Enter The Number of Notes"
                                />
                            </div>
                        </div>

                        <div className='form-input-row'>
                            <div className='form-input'>
                                <div className="checkbox-div">
                                    <input type="checkbox" />
                                    200
                                </div>
                            </div>

                            <div className='form-input'>
                                <input
                                    type="number"
                                    placeholder="Enter The Number of Notes"
                                />
                            </div>
                        </div>

                        <div className='form-input-row'>
                            <div className='form-input'>
                                <div className="checkbox-div">
                                    <input type="checkbox" />
                                    100
                                </div>
                            </div>

                            <div className='form-input'>
                                <input
                                    type="number"
                                    placeholder="Enter The Number of Notes"
                                />
                            </div>
                        </div>

                        <div className='form-input-row'>
                            <div className='form-input'>
                                <div className="checkbox-div">
                                    <input type="checkbox" />
                                    50
                                </div>
                            </div>

                            <div className='form-input'>
                                <input
                                    type="number"
                                    placeholder="Enter The Number of Notes"
                                />
                            </div>
                        </div>

                        <div className='form-input-row'>
                            <div className='form-input'>
                                <div className="checkbox-div">
                                    <input type="checkbox" />
                                    20
                                </div>
                            </div>

                            <div className='form-input'>
                                <input
                                    type="number"
                                    placeholder="Enter The Number of Notes"
                                />
                            </div>
                        </div>

                        <div className='form-input-row'>
                            <div className='form-input'>
                                <div className="checkbox-div">
                                    <input type="checkbox" />
                                    10
                                </div>
                            </div>

                            <div className='form-input'>
                                <input
                                    type="number"
                                    placeholder="Enter The Number of Notes"
                                />
                            </div>
                        </div>

                        <div className='form-input-row'>
                            <div className='form-input'>
                                <div className="checkbox-div">
                                    <input type="checkbox" />
                                    Coins
                                </div>
                            </div>

                            <div className='form-input'>
                                <input
                                    type="number"
                                    placeholder="Enter The Coin Amount"
                                />
                            </div>
                        </div>

                        <label style={{ fontWeight: "700" }}>
                            UPI Payments
                        </label>

                        <div className='form-input-row'>
                            <div className='form-input'>
                                <label >
                                    Total Orders
                                </label>
                                <br />
                                <div>
                                    <input type="text" placeholder="Enter Total Orders" />
                                </div>
                            </div>

                            <div className='form-input'>
                                <label >
                                    Total Amount
                                </label>
                                <br />
                                <input
                                    type="number"
                                    placeholder="Enter Total Amount"
                                />
                            </div>
                        </div>

                        <div className='form-input-row'>
                            <div className='form-input'>
                                <label >
                                    Upload a Copy
                                </label>
                                <br />
                                <input
                                    type="file"
                                />
                            </div>
                        </div>





                        <div className="buttons">
                            <Button variant="warning" type="submit">
                                Submit
                            </Button>
                            <Link to="/pos-dashboard/pos-passbook">
                                <Button variant="secondary" type="button">
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
export default PosUpdateTodaysExpenses