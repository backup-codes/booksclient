import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import img from '../../assets/images/aadhaar-example.jpg'
import img2 from '../../assets/images/pan-example.jpg'
import Styled from 'styled-components'

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
    width: 25%;
}
.right-item{
    margin-left: 20px;
}
`;

const BasicDetailModal = (props) => {
    return (
        <Wrapper
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Employee Basic Detail
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className='items'><p className='left-item'>Staff Name</p><p className='right-item'>name</p></div>
                    <div className='items'><p className='left-item'>Phone Number</p><p className='right-item'>34567899990</p></div>
                    <div className='items'><p className='left-item'>Current Address</p><p className='right-item'>example address, example, example- 234234</p></div>
                    <div className='items'><p className='left-item'>Permanent Address</p><p className='right-item'>example address, example, example - 233345</p></div>
                    <div className='items'><p className='left-item'>Email ID</p><p className='right-item'>example@gmail.com</p></div>
                    <div className='items'><p className='left-item'>DOB</p><p className='right-item'>12-09-1995</p></div>
                    <div className='items'><p className='left-item'>Gender</p><p className='right-item'>female</p></div>
                    <div className='items'><p className='left-item'>Marital Status</p><p className='right-item'>married</p></div>
                    <div className='items'><p className='left-item'>PF Number</p><p className='right-item'>9992345670</p></div>
                    <div className='items'><p className='left-item'>ESI Number</p><p className='right-item'>9992345670</p></div>
                    <div className='items'><p className='left-item'>UAN Number</p><p className='right-item'>9992345670</p></div>
                    <div className='items'><p className='left-item'>Blood Group</p><p className='right-item'>A+</p></div>
                    <div className='items'><p className='left-item'>Emergency Contact Person Name</p><p className='right-item'>name</p></div>
                    <div className='items'><p className='left-item'>Emergency Contact Person Phone No.</p><p className='right-item'>992345670</p></div>
                    <div className='items'><p className='left-item'>Emergency Contact Person Address</p><p className='right-item'>example address, example, example - 98765</p></div>
                    <div className='items'><p className='left-item'>Emergency Contact Person Relationship</p><p className='right-item'>father</p></div>
                    <div className='items'><p className='left-item'>Aadhaar Number</p><p className='right-item'>34567899992345670</p></div>
                    <div className='items'><p className='left-item'>Aadhar Image</p><img className='right-item' src={img} /></div>
                    <div className='items' style={{ marginTop: '20px' }}><p className='left-item'>PAN Number</p><p className='right-item'>34567899992345670</p></div>
                    <div className='items'><p className='left-item'>PAN Image</p><img className='right-item' src={img2} /></div>

                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='dark' onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Wrapper>
    )
}
export default BasicDetailModal