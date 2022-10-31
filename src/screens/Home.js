import React, { useState } from "react";
import { ListGroup, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../utilities/userProfile";
import { useDbData } from "../utilities/firebase";
import UserCard from "../components/UserCard/UserCard";
import Menubar from "../components/Navbar/Menubar";
import UserInterests from "../components/Interests/UserInterests";

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

  const currentUserInformation = Object.entries(users).filter(
    ([id, user]) => id === currentUser.uid
  )[0][1];

  const compareFunc = (user1, user2) => {
    const user1Interests = user1[1].interests
      ? Object.values(user1[1].interests).map((interest) => interest.name)
      : [];
    const user2Interests = user2[1].interests
      ? Object.values(user2[1].interests).map((interest) => interest.name)
      : [];
    const curInterests = currentUserInformation.interests
      ? Object.values(currentUserInformation.interests).map(
          (interest) => interest.name
        )
      : [];
    const common1 = user1Interests.filter((value) =>
      curInterests.includes(value)
    );
    const common2 = user2Interests.filter((value) =>
      curInterests.includes(value)
    );
    return common2.length - common1.length;
  };

  return (
    <div>
      <Menubar user={currentUser} />
      <Container className="container">
        <UserInterests
          currentUserInformation={currentUserInformation}
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
        />
        <ListGroup variant="flush">
          {Object.entries(users)
            .sort((user1, user2) => compareFunc(user1, user2))
            .filter(([id, user]) => id !== currentUser.uid)
            .map(([id, user]) => {
              return (
                <ListGroup.Item key={id}>
                  <UserCard
                    name={user.displayName}
                    interests={
                      user.interests
                        ? Object.values(user.interests).map(({ name }) => name)
                        : null
                    }
                  />
                </ListGroup.Item>
              );
            })}
        </ListGroup>
      </Container>
    </div>
  );
};

export default Home;
