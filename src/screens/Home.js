import React, { useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../utilities/userProfile";
import { signOut, useDbData } from "../utilities/firebase";
import AddInterestModal from "../components/addInterestModal/addInterestModal";
import UserCard from "../components/userCard/userCard";

const Home = () => {
  const navigate = useNavigate();

  const [user, error, isLoading] = useProfile();
  const [show, setShow] = useState(false);
  const [users, errorUsers, isLoadingUsers] = useDbData("/users");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (error || errorUsers)
    return <h1>Error loading users data: {`${error}`}</h1>;
  if (isLoading || isLoadingUsers) return <h1>Loading users data...</h1>;

  if (!user) navigate("/login");
  if (!users) return <div> No Users </div>;

  return (
    <div>
      <h1>MeetNUFriends</h1>
      <p>Welcome!</p>
      <Button onClick={signOut} variant="primary">
        Sign out!
      </Button>
      <Button onClick={handleShow} variant="secondary">
        +
      </Button>
      <AddInterestModal show={show} handleClose={handleClose} />
      <ListGroup>
        {Object.entries(users).map(([id, user]) => {
          return (
            <ListGroup.Item key={id}>
              <UserCard name={user.displayName} />
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
};

export default Home;
