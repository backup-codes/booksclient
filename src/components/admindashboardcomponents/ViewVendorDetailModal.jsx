import Styled from 'styled-components';
import { Modal } from "antd";
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

const ViewVendorDetailModal = ({ viewData, ...props }) => {
  return (
    <Wrapper
      width="700px" centered {...props}
    >
      <div className="modal-content">
        <h4 id="contained-modal-title-vcenter">Vendor Details</h4>
        <div className="items">
          <div className="left-item">
            <p>Vendor ID: {viewData.vendorId}</p>
            <p>Vendor Name: {viewData.vendorName}</p>
            <p>Phone: {viewData.phone}</p>
            <p>Category: {viewData.ingredient}</p>
            <p>Account Number: {viewData.accountNumber}</p>
            <p>Branch Code: {viewData.branchCode}</p>
            <p>GST: {viewData.gst}</p>
            <p>NEFT: {viewData.neft}</p>
            {/* Add other information here */}
          </div>

         

       
{viewData && (<Image
                
                width={200}
                src={viewData.billImage}
  />
)}


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

export default ViewVendorDetailModal;
