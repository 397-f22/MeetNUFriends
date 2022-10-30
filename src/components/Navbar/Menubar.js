import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { signOut } from "../../utilities/firebase";

const SignOutButton = () => (
  <button className="ml-5 p-2 w-10 btn navbar-signout-button" onClick={signOut}>
    Sign out
  </button>
);

const Menubar = () => {
  return (
    <Navbar className="navbar-container p-3">
      <Container>
        <Navbar.Brand href="/" className="navbar-title">
          MeetNUFriends
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <SignOutButton />
      </Container>
    </Navbar>
  );
};

export default Menubar;
