import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
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
    const interest1 = user1[1].interests
      ? Object.values(user1[1].interests)
      : [];
    const interest2 = user2[1].interests
      ? Object.values(user2[1].interests)
      : [];

    const curInterest = currentUserInformation.interests
      ? currentUserInformation.interests
      : [];
    const common1 = interest1.filter((value) => curInterest.includes(value));
    const common2 = interest2.filter((value) => curInterest.includes(value));

    return common1.length - common2.length;
  };

  return (
    <div>
      <Menubar />
      <UserInterests
        currentUserInformation={currentUserInformation}
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
      <ListGroup>
        {Object.entries(users)
          .sort((user1, user2) => compareFunc(user1, user2))
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
    </div>
  );
};

export default Home;
