import React from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../utilities/userProfile";
import { signOut } from "../utilities/firebase";
import { Button } from "react-bootstrap";

const Home = () => {
  const navigate = useNavigate();
  const [user, error, isLoading] = useProfile();
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
    </div>
  );
};

export default Home;
