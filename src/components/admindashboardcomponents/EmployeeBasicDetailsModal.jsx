import Styled from "styled-components";
import { Modal } from "antd";
import { Image } from "antd";
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
    column-gap: 20px;
}
.left-item{
    width: 30%;
}
.right-item{
    width: 70%;
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

const EmployeeBasicDetailsModal = (props) => {

  console.log(props,"I am prop");
  return (
    <Wrapper width="700px" centered {...props}>
      <div className="modal-content">
        <h4 className="title">Employee Basic Detail</h4>
        <div className="modal-content">
          {props.staff && (
            <div className="items">
              <p className="left-item">Staff Name</p>
              <p className="right-item">{props.staff}</p>
            </div>
          )}
          {props.employID && (
            <div className="items">
              <p className="left-item">Employee ID</p>
              <p className="right-item">{props.employID}</p>
            </div>
          )}
          {props.designation && (
            <div className="items">
              <p className="left-item">Designation</p>
              <p className="right-item">{props.designation}</p>
            </div>
          )}
          {props.phone && (
            <div className="items">
              <p className="left-item">Phone Number</p>
              <p className="right-item">{props.phone}</p>
            </div>
          )}
          {props.current_address && (
            <div className="items">
              <p className="left-item">Current Address</p>
              <p className="right-item">{props.current_address}</p>
            </div>
          )}
          {props.permanent_address && (
            <div className="items">
              <p className="left-item">Permanent Address</p>
              <p className="right-item">{props.permanent_address}</p>
            </div>
          )}
          {props.email && (
            <div className="items">
              <p className="left-item">Email ID</p>
              <p className="right-item">{props.email}</p>
            </div>
          )}
          {props.dob && (
            <div className="items">
              <p className="left-item">DOB</p>
              <p className="right-item">{props.dob}</p>
            </div>
          )}
          {props.gender && (
            <div className="items">
              <p className="left-item">Gender</p>
              <p className="right-item">{props.gender}</p>
            </div>
          )}
          {props.marital_status && (
            <div className="items">
              <p className="left-item">Marital Status</p>
              <p className="right-item">{props.marital_status}</p>
            </div>
          )}
          {props.pf_number && (
            <div className="items">
              <p className="left-item">PF Number</p>
              <p className="right-item">{props.pf_number}</p>
            </div>
          )}
          {props.esi_number && (
            <div className="items">
              <p className="left-item">ESI Number</p>
              <p className="right-item">{props.esi_number}</p>
            </div>
          )}
          {props.uan_number && (
            <div className="items">
              <p className="left-item">UAN Number</p>
              <p className="right-item">{props.uan_number}</p>
            </div>
          )}
          {props.blood_group && (
            <div className="items">
              <p className="left-item">Blood Group</p>
              <p className="right-item">{props.blood_group}</p>
            </div>
          )}
          {props.emergency_contact_person_name && (
            <div className="items">
              <p className="left-item">Emergency Contact Person Name</p>
              <p className="right-item">
                {props.emergency_contact_person_name}
              </p>
            </div>
          )}
          {props.emergency_contact_person_number && (
            <div className="items">
              <p className="left-item">Emergency Contact Person Phone No.</p>
              <p className="right-item">
                {props.emergency_contact_person_number}
              </p>
            </div>
          )}
          {props.emergency_contact_person_relation && (
            <div className="items">
              <p className="left-item">Emergency Contact Person Relationship</p>
              <p className="right-item">
                {props.emergency_contact_person_relation}
              </p>
            </div>
          )}
          {props.emergency_contact_person_address && (
            <div className="items">
              <p className="left-item">Emergency Contact Person Address</p>
              <p className="right-item">
                {props.emergency_contact_person_address}
              </p>
            </div>
          )}
          {props.aadhar_number && (
            <div className="items">
              <p className="left-item">Aadhaar Number</p>
              <p className="right-item">{props.aadhar_number}</p>
            </div>
          )}
          {props.aadhar_image && props.aadhar_image.length > 0 && (
            <div className="items">
              <p className="left-item">Aadhar Images</p>
              {props.aadhar_image.map((image, index) => (
                <Image key={index} width={200} src={image} />

              
              ))}
            </div>
          )}
          {props.pan_number && (
            <div className="items" style={{ marginTop: "20px" }}>
              <p className="left-item">PAN Number</p>
              <p className="right-item">{props.pan_number}</p>
            </div>
          )}
          {props.pancard_image && (
            <div className="items">
              <p className="left-item">PAN Image</p>
            
                <Image  width={200}   src={props.pancard_image} />

            </div>
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
export default EmployeeBasicDetailsModal;
