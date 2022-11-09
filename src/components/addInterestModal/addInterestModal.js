import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, Modal, Form } from "react-bootstrap";
import { useProfile } from "../../utilities/userProfile";
import { useDbUpdate } from "../../utilities/firebase";
import tagCanvas from "tag-canvas";

const AddInterestModal = ({ show, handleClose, interests }) => {
  const [user] = useProfile();
  const [updateData] = useDbUpdate("/");
  const [interest, setInterest] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (interest.length > 0) {
      const data = {
        name: interest,
      };
      updateData({ ["/users/" + user.uid + "/interests/" + uuidv4()]: data });
    }
    handleClose();
  };
  // TODO: Add validation to the form
  // 1. Make sure the interest is not empty
  // 2. Make sure the interest is not already in the list

  // render the tag cloud when the modal is shown
  useEffect(() => {
    if (show) {
      reSizeCanvas();
      renderTagCloud();
    }
  }, [show]);

  const reSizeCanvas = () => {
    const width = document.getElementById("interestName").offsetWidth;
    const canvas = document.getElementById("cloud");
    canvas.width = width;
    canvas.height = (width * 2) / 3;
  };

  const renderTagCloud = () => {
    try {
      tagCanvas.Start("cloud", "tags", {
        textColour: "#000",
        outlineMethod: "block",
        outlineColour: "#569AFE",
        outlineRadius: 10,
        reverse: true,
        depth: 0.8,
        maxSpeed: 0.1,
        initial: [0.03, -0.03],
        textFont: null,
        wheelZoom: false,
        dragControl: true,
        clickToFront: 600,
      });
    } catch (e) {
      // something went wrong, hide the canvas container
      document.getElementById("cloudContainer").style.display = "none";
    }
  };

  const content = [...interests];
  const setText = (s) => {
    document.getElementById("interestName").value = s;
    setInterest(s);
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
        <div
          id="cloudContainer"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <canvas id="cloud" width="600" height="600"></canvas>
        </div>
        <div id="tags" style={{ display: "none" }}>
          <ul>
            {content.map((interest) => (
              <li key={interest} onClick={(e) => setText(interest)}>
                <a href="#">{interest}</a>
              </li>
            ))}
          </ul>
        </div>
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
