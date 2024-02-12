import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
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
    width: 20%;
}
.right-item{
    margin-left: 20px;
}
`;

const DominationModal = ({ filteredDenominations, ...props }) => {

  console.log(filteredDenominations,"ff");

  return (
    <Wrapper
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter " >Domination</Modal.Title>
      </Modal.Header>
      <Modal.Body>



        <div className="d-flex justify-content-center">
          <table className="table">
            <thead>
              <tr>
                <th>Currency</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {filteredDenominations.map((denomination) => (
                <tr key={denomination._id}>
                  <td>{denomination.label}</td>
                  <td>{denomination.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>








      </Modal.Body>
      <Modal.Footer>
        <Button variant='dark' onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Wrapper>
  );
};


export default DominationModal