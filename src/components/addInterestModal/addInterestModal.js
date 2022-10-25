import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const AddInterestModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add an interest</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
            <Form.Label htmlFor="interestName">Interest name</Form.Label>
            <Form.Control
            type=""
            id="interestName"
            />
            <Form.Text id="" muted>
            Enter the name of your interest
            </Form.Text>
        </div>        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddInterestModal;
