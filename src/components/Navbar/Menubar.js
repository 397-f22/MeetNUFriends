import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { signOut } from "../../utilities/firebase";

const SignOutButton = () => (
  <button className="ml-5 p-2 w-10 btn navbar-signout-button" onClick={signOut}>
    Sign out
  </button>
);

const ProfileButton = ({ openProfileModal }) => (
  <button className="ml-5 p-2 w-10 btn navbar-signout-button" onClick={openProfileModal}>
    Profile
  </button>
)

const Menubar = ({ user, openProfileModal }) => {
  return (
    <Navbar className="navbar-container p-3">
      <Container>
        <div>
          <Navbar.Brand href="/" className="navbar-title">
            MeetNUFriends
          </Navbar.Brand>
        </div>
        <div className="navbar-content">
          {user && (
            <Nav className="navbar-username">Welcome! {user.displayName}</Nav>
          )}
          <ProfileButton openProfileModal={openProfileModal} />
          <SignOutButton />
        </div>
      </Container>
    </Navbar>
  );
};

export default Menubar;
