import React, { useState, useEffect } from "react";
// import { v4 as uuidv4 } from "uuid";
import { Button, Modal, Form } from "react-bootstrap";
import { useProfile } from "../../utilities/userProfile";
import { useDbUpdate } from "../../utilities/firebase";

const ProfileModal = ({ isProfileModalOpen, closeProfileModal }) => {
    const [user] = useProfile();
    const [updateData] = useDbUpdate("/");
    const [description, setDescription] = useState(user ? user.description : "");

    const handleSubmit = (e) => {
        e.preventDefault();
        updateData({ ["/users/" + user.uid + "/description"]: description });
        closeProfileModal();
    };

    return (
        <Modal show={isProfileModalOpen} onHide={closeProfileModal}>
            <Modal.Header closeButton>
                <Modal.Title>Edit profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label htmlFor="description">Description</Form.Label>
                    <Form.Control
                        type="text"
                        id="description"
                        onChange={(e) => setDescription(e.target.value)}
                        defaultValue={description}
                    />
                    <Form.Text muted>Enter your profile description</Form.Text>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeProfileModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={(e) => handleSubmit(e)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProfileModal;
