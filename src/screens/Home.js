import React from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../utilities/userProfile";
import { signOut, useDbData } from "../utilities/firebase";
import { Button } from "react-bootstrap";
import AddInterestModal from "../components/addInterestModal/addInterestModal"
import { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup"
import UserCard from "../components/userCard/userCard";

const Home = () => {
  const navigate = useNavigate();
  const [user, error, isLoading] = useProfile();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [users, errorUsers, isLoadingUsers] = useDbData("/users")

  if (isLoading||isLoadingUsers) {
    return <div>Loading...</div>;
  }
  if (error||errorUsers) {
    console.log(error);
    return <div>Error retrieving user profile...</div>;
  }
  if (!user) {
    navigate("/login");
  }

  if (!users) return <div> No Users </div>

  return (
    <div>
      <h1>MeetNUFriends</h1>
      <p>Welcome!</p>
      <Button onClick={signOut} variant="primary">Sign out!</Button>
      <Button onClick={handleShow} variant="secondary">+</Button>
      <AddInterestModal show={show} handleClose={handleClose}/>
      <ListGroup> 
        {Object.entries(users).map(([id, user]) =>
         {
        return <ListGroup.Item>
          <UserCard name={user.displayName}/>
        </ListGroup.Item>})
        } 
        
      </ListGroup>
    </div>
  );
};

export default Home;
