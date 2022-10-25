import React from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../utilities/userProfile";
import { signOut } from "../utilities/firebase";
import { Button } from "react-bootstrap";
import AddInterestModal from "../components/addInterestModal/addInterestModal"
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [user, error, isLoading] = useProfile();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log(error);
    return <div>Error retrieving user profile...</div>;
  }
  if (!user) {
    navigate("/login");
  }

  return (
    <div>
      <h1>MeetNUFriends</h1>
      <p>Welcome!</p>
      <Button onClick={signOut} variant="primary">Sign out!</Button>
      <Button onClick={handleShow} variant="secondary">+</Button>
      <AddInterestModal show={show} handleClose={handleClose}/>
    </div>
  );
};

export default Home;
