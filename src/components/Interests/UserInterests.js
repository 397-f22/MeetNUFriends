import React from "react";
import { Badge, Button } from "react-bootstrap";
import AddInterestModal from "../AddInterestModal/addInterestModal";

const UserInterests = ({
  currentUserInformation,
  show,
  handleClose,
  handleShow,
  allInterests,
}) => {
  return (
    <div className="mt-4 mb-4">
      <h3>My Interests</h3>
      <div className="interests-list">
        <div>
          {currentUserInformation.interests
            ? Object.values(currentUserInformation.interests).map(
              ({ name }) => (
                <Badge className="interests-badges" key={name} bg="info">
                  {name}
                </Badge>
              )
            )
            : null}
        </div>
        <div>
          <Button className="interests-add-button" onClick={handleShow}>
            <i className="bi bi-plus-lg"></i>
          </Button>
        </div>
      </div>
      <AddInterestModal
        show={show}
        handleClose={handleClose}
        interests={allInterests}
      />
    </div>
  );
};

export default UserInterests;
