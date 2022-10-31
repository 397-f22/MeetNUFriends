import React from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useProfile } from "../../utilities/userProfile";
import { useDbUpdate } from "../../utilities/firebase";

const AddInterestModal = ({ show, handleClose, interest, setInterest }) => {
  const [user,userInformation, error, isLoading] = useProfile();
  const [updateData, result] = useDbUpdate("/");
  // const [interest, setInterest] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    let content = document.getElementById("interestName").value;
    if (content.length > 0) {
      // if content is not empty, 1. update the interest in the state, 2. update the interest in the database
      setInterest({
        ...interest,
        [uuidv4()]: {
          name: content,
        },
      });
      const data = {
        name: content,
      };
      updateData({ ["/users/" + user.uid + "/interests/" + uuidv4()]: data });
    }
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add an interest</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label htmlFor="interestName">Interest name</Form.Label>
          <Form.Control
            type="text"
            id="interestName"
          />
          <Form.Text muted>Enter the name of your interest</Form.Text>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={(e) => handleSubmit(e)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddInterestModal;
