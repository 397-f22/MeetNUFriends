import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useProfile } from "../../utilities/userProfile";
import { useDbUpdate } from "../../utilities/firebase";

const AddInterestModal = ({ show, handleClose }) => {
  const [user, error, isLoading] = useProfile();
  const [updateData, result] = useDbUpdate("/");
  const [interest, setInterest] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    //TODO: CHECK VALIDATION
    if (interest.length > 0) {
      const data = {
        name: interest,
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
            onChange={(e) => setInterest(e.target.value)}
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
