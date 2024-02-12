import Button from 'react-bootstrap/Button';
import { Modal } from "antd";
import Styled from 'styled-components'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'


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

const ViewModal = ({ viewData, ...props }) => {

  console.log(props,"i ma prop");
  return (
    <Wrapper
      width="700px" centered {...props}
    >
      <div className="modal-content">
        <h4 >Bill</h4>

        <div className="text-center">
          {Array.isArray(viewData) ? (
            // If viewData is an array, render all images in the array
            viewData.map((link, index) => (

              <Zoom key={index}>
                <div key={index} className='items'>
                  <img className='right-item w-50 mx-auto' src={link} alt={`Image ${index}`} />
                </div>
              </Zoom>
            ))
          ) : (

            <Zoom>

              <div className='items'>
                <img className='right-item w-50 mx-auto zoom' src={viewData} alt="Single Image" />
              </div>
            </Zoom>
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



export default ViewModal