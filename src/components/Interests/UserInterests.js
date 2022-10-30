import React from "react";
import { Badge, Button } from "react-bootstrap";
import AddInterestModal from "../AddInterestModal/AddInterestModal";

const UserInterests = ({
  currentUserInformation,
  show,
  handleClose,
  handleShow,
}) => {
  return (
    <div className="mt-4 mb-2">
      <h3>My Interests</h3>
      <div className="interests-list">
        {currentUserInformation.interests
          ? Object.values(currentUserInformation.interests).map(({ name }) => (
              <Badge key="name" pill bg="info">
                {name}
              </Badge>
            ))
          : null}
        <Button
          className="interests-add-button"
          onClick={handleShow}
          variant="success"
        >
          +
        </Button>
      </div>
      <AddInterestModal show={show} handleClose={handleClose} />
    </div>
  );
};

export default UserInterests;
