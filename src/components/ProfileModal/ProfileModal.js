import React, { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
import { Button, Modal, Form } from "react-bootstrap";
import { useProfile } from "../../utilities/userProfile";
import { useDbUpdate } from "../../utilities/firebase";

const ProfileModal = ({
  isProfileModalOpen,
  closeProfileModal,
  currentUserInformation,
}) => {
  const [user] = useProfile();
  const [updateData] = useDbUpdate("/");
  const [description, setDescription] = useState(user ? user.description : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData({ ["/users/" + user.uid + "/description"]: description });
    closeProfileModal();
  };

  const deleteInterest = (id) => {
    delete currentUserInformation.interests[id];
    updateData({
      ["/users/" + user.uid + "/interests/"]: currentUserInformation.interests,
    });
  };

  return (
    <Modal show={isProfileModalOpen} onHide={closeProfileModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label htmlFor="description" className="profile-modal-titles">
            Description
          </Form.Label>
          <Form.Control
            type="text"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            defaultValue={description}
          />
          <Form.Text muted>Enter your profile description</Form.Text>
        </Form>
      </Modal.Body>
      <Modal.Body>
        <p className="profile-modal-titles">Interests</p>
        {currentUserInformation &&
          Object.entries(currentUserInformation.interests).map(
            ([id, interest]) => (
              <div className="profile-interests-container" key={id}>
                <div>{interest.name}</div>
                <Button variant="danger" onClick={() => deleteInterest(id)}>
                  <i className="bi bi-x-circle-fill"></i>
                </Button>
              </div>
            )
          )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeProfileModal}>
          Close
        </Button>
        <Button
          className="profile-modal-save-button"
          onClick={(e) => handleSubmit(e)}
        >
          Save Description
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileModal;
