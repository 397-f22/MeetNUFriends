import React from "react";
import { ListGroup, Button, Container, Row, Image } from "react-bootstrap";
import { signInWithGoogle } from "../utilities/firebase";
import { useProfile } from "../utilities/userProfile";
import "./Login.css";

const Login = () => {
  const [_, error, isLoading] = useProfile();

  if (error) return <h1>Error loading user: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user profile</h1>;

  return (
    <Container className="login-body" fluid="true">
      <ListGroup className="login-container m-2">
        <ListGroup.Item className="login-card px-5 py-4">
          <div className="login-title-div mt-4 mb-5 d-flex">
            <Image className="login-image" src="favicon.png" />
            <h2 className="ms-2">MeetNUFriends</h2>
          </div>
          <Row className="login-description-div">
            <p className="mb-5">
              Welcome to MeetNUFriends! An application that conects you with
              other Northwestern students based on similar interests and tags.
              Just log in with your Northwestern university email and start
              meeting amazing people that share your same interests.
            </p>
            <Button className="login-button" onClick={signInWithGoogle}>
              SIGN IN NOW
            </Button>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
};

export default Login;
