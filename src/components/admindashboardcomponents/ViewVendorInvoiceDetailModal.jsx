import Styled from 'styled-components';
import { Modal } from "antd";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { Image } from 'antd';

const Wrapper = Styled(Modal)`
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
    column-gap: 10px;
}
.left-item{
    width: 70%;
}
table{
  width: 100%;
}
.right-item{
    width: 30%;
    display: flex;
    align-items: center;
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

const ViewVendorInvoiceDetailModal = ({ viewData, ...props }) => {

  return (



    <Wrapper width="700px" centered {...props}>
      <div className="modal-content">
        <h4 className="title">Vendor Invoice Details</h4>

        <div className="items">
          <div className="left-item">
            <p>Vendor ID: {viewData.vendorId.vendorId}</p>
            <p>Vendor Name: {viewData.vendorId.vendorName}</p>
            <p>Payment Mode: {viewData.paymentMode}</p>
            <p>Description: {viewData.description}</p>
            <p>Total Amount: {viewData.amount}</p>

            <table>
              <thead>
                <tr>
                  <th>Commodity</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                </tr>
              </thead>
              <tbody>
                {viewData.commodities.map((commodity) => (
                  <tr key={commodity._id}>
                    <td>{commodity.commodity}</td>
                    <td>{commodity.Quantity}</td>
                    <td>{commodity.Unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>

          <Image
    width={200}
    src={viewData.billImage}
  />

          {/* <Zoom className='right-item'>
            <img src={viewData.billImage} className='img-fluid mx-auto zoom' alt="Invoice Image" />
          </Zoom> */}
        </div>

        <div className="close-btn">
          <button type="button" onClick={props.onCancel}>
            Close
          </button>
        </div>
      </div>
    </Wrapper>


  );
};

export default ViewVendorInvoiceDetailModal;
