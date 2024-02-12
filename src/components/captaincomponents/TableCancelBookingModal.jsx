import Wrapper from "../../assets/wrappers/poswrappers/PosFormModal";

const TableCancelBookingModal = (props) => {

  const handleTableCancel = async () => {
    try {
      props.onCancel();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper centered {...props}>
      <h4 className="title">Are you sure?</h4>
      <p style={{ textAlign: "center" }}>do you want to cancel booking?</p>

      <div className="form-btn" onClick={props.handleBook}>
        <button type="button" onClick={handleTableCancel}>
          Cancel Booking
        </button>
      </div>
    </Wrapper>
  );
};
export default TableCancelBookingModal;
