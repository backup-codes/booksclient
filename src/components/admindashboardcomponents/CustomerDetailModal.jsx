
import { Modal } from "antd";
import Styled from 'styled-components'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { Image } from 'antd';
const Wrapper = Styled(Modal)`
.modal-content {
    max-height: 90vh;
    overflow-y: auto;
  }
.modal-body{
    max-height: 90vh;
    overflow-y: scroll;
  }
.items{
    display: flex;
}
.left-item{
    width: 20%;
}
.right-item{
    margin-left: 20px;
}
.close-btn{
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


const CustomerDetailModal = ({ customerData, ...props }) => {
console.log(customerData,"i am customer data modal");
    // const { customer, } = customerData
    return (
        <Wrapper
            width="700px" centered {...props}
        >
            <div className="modal-content">
                {/* <Modal.Header closeButton> */}
                <h4>
                    Customer Detail
                </h4>
                {/* </Modal.Header> */}
                {/* <Modal.Body> */}
                <div>
                    <div className='items'><p className='left-item'>Customer name</p><p className='right-item'>{customerData.customer}</p></div>
                    <div className='items'><p className='left-item'>Contact Number</p><p className='right-item'>{customerData.phone}</p></div>
                    <div className='items'><p className='left-item'>Contact Address</p><p className='right-item'>{customerData.address}</p></div>
                    <div className='items'><p className='left-item'>Aadhaar Number</p><p className='right-item'>{customerData.aadharNumber}</p></div>
                   
  <div className='items'>
    <p className='left-item'>Aadhaar Images</p>
    <div className="d-flex gap-3">
    {Array.isArray(customerData.aadharImage) && customerData.aadharImage.length > 0 ? (
                            customerData.aadharImage.map((image, index) => (
            

                                    
                                <Image key={index} width={200} src={image} />
                                
                                
                                
                                ))
                                ) : (
                                    <p>No Aadhaar Images available</p>
                                    )}
                                    </div>
  </div>

                </div>
                {/* </Modal.Body> */}

                <div className="close-btn">
                    <button type="button" onClick={props.onCancel}>
                        Close
                    </button>
                </div>
            </div>
        </Wrapper>
    )
}
export default CustomerDetailModal