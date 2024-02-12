import Wrapper from "../../../assets/wrappers/adminwrappers/Forms";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";


const PosUpdateCustomer = () => {
    return (
        <Wrapper className="page">
            <div className="page-content">
                <div className="page-header">
                    <h3>Update Customer </h3>
                </div>

                <div className="custom-form">
                    <form >

                        <div className='form-input-row'>
                            <div className='form-input'>
                                <label htmlFor="customer" className="text-left">
                                    Customers
                                </label>
                                <br />

                                <select className='form-select'>
                                    <option value="">Please select</option>
                                    <option value="vegetables">customer 1</option>
                                    <option value="fruits">customer 2</option>
                                    <option value="milk">customer 3</option>
                                    <option value="dairy">customer 4</option>
                                    <option value="chicken">customer 5</option>
                                    <option value="mutton">customer 6</option>
                                </select>
                            </div>

                            <div className='form-input'>
                                <label className="text-left">
                                    Date
                                </label>

                                <br />

                                <input
                                    type="date"
                                    placeholder="Enter total amount"
                                />
                            </div>
                        </div>

                        <div className='form-input-row'>
                            <div className='form-input'>
                                <label className="text-left">
                                    Total Amount
                                </label>


                                <br />

                                <input
                                    type="Number"
                                    placeholder="Enter total amount"
                                />
                            </div>

                            <div className='form-input'>
                                <label htmlFor="billImage" className="text-left">
                                    Upload KOT Bills
                                </label>
                                <br />

                                <input
                                    type="file"
                                    name="billImage"
                                    id="billImage"

                                />
                            </div>
                        </div>



                        <div className="buttons">
                            <Button className="submit-btn" type="submit">
                                Submit
                            </Button>
                            <Link to="/pos-dashboard/pos-customers">
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
export default PosUpdateCustomer