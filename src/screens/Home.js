import React, { useState } from "react";
import { Button, ListGroup, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../utilities/userProfile";
import { signOut, useDbData } from "../utilities/firebase";
import AddInterestModal from "../components/addInterestModal/addInterestModal";
import UserCard from "../components/userCard/userCard";

const Home = () => {
  const navigate = useNavigate();

  const [currentUser, error, isLoading] = useProfile();
  const [show, setShow] = useState(false);
  const [users, errorUsers, isLoadingUsers] = useDbData("/users");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (error || errorUsers)
    return <h1>Error loading users data: {`${error}`}</h1>;
  if (isLoading || isLoadingUsers) return <h1>Loading users data...</h1>;

  if (!currentUser) navigate("/login");
  if (!users) return <div> No Users </div>;

  const currentUserInformation = Object.entries(users).filter(([id, user]) => id === currentUser.uid)[0][1];

  return (
    <div>
      <h1>MeetNUFriends</h1>
      <Button onClick={signOut} variant="primary">
        Sign out!
      </Button>
      <Button onClick={handleShow} variant="secondary">
        +
      </Button>
      <h3>My interests:</h3>
      <div>
        {currentUserInformation.interests ? Object.values(currentUserInformation.interests).map(({ name }) => <Badge pill bg="primary">{name}</Badge>) : null}
      </div>
      <AddInterestModal show={show} handleClose={handleClose} />
      <ListGroup>
        {Object.entries(users).map(([id, user]) => {
          return (
            <ListGroup.Item key={id}>
              <UserCard name={user.displayName} interests={user.interests ? Object.values(user.interests).map(({ name }) => name) : null} />
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
};

export default Home;
