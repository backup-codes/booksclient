import Card from 'react-bootstrap/Card';
import Wrapper from '../../assets/wrappers/poswrappers/PosPassbookCard';
import { FaIndianRupeeSign } from "react-icons/fa6";

const PosPassbookCard = () => {
    return (
        <Wrapper className='page'>
            <Card className='card' text='white' style={{ width: '60%' }}>
                <Card.Body>
                    <div className='card_header'>
                        <div className='card-header-left'>
                            <Card.Title>Passbook</Card.Title>
                            <p className='card-subtitle'>Total Orders</p>
                        </div>
                        <div className='card-header-right'>
                            <h5>other expenses</h5>
                        </div>
                    </div>
                    <div className='card_body'>
                        <FaIndianRupeeSign className='rupee-icon' />
                        <div>
                            <h3>Amount Received</h3>
                            <h3>00.00</h3>
                        </div>
                    </div>


                    <div className='card_footer'>
                        <div>
                            <Card.Link className='card-footer-link' href="#">
                                cash Received
                                <p><FaIndianRupeeSign /> 00.00</p>
                            </Card.Link>
                        </div>
                        <div>

                            <Card.Link className='card-footer-link' href="#">
                                money Return
                                <p><FaIndianRupeeSign /> 00.00</p>
                            </Card.Link>

                        </div>
                        <div>

                            <Card.Link className='card-footer-link' href="#">
                                online payment
                                <p><FaIndianRupeeSign /> 00.00</p>
                            </Card.Link>

                        </div>
                    </div>

                </Card.Body>
            </Card>

        </Wrapper>
    )
}
export default PosPassbookCard
