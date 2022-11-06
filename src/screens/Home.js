import React, { useState } from "react";
import { ListGroup, Container } from "react-bootstrap";
import { useProfile } from "../utilities/userProfile";
import { useDbData } from "../utilities/firebase";
import UserCard from "../components/userCard/userCard";
import Menubar from "../components/Navbar/Menubar";
import UserInterests from "../components/Interests/UserInterests";
import { stringSimilarity } from "../utilities/calculate";
import ProfileModal from "../components/ProfileModal/ProfileModal";

const Home = () => {
  const [currentUser, error, isLoading] = useProfile();
  const [show, setShow] = useState(false);
  const [users, errorUsers, isLoadingUsers] = useDbData("/users");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const openProfileModal = () => { setIsProfileModalOpen(true) };
  const closeProfileModal = () => { setIsProfileModalOpen(false) };

  if (error || errorUsers)
    return <h1>Error loading users data: {`${error}`}</h1>;
  if (isLoading || isLoadingUsers) return <h1>Loading users data...</h1>;

  if (!currentUser) return;
  if (!users) return <div> No Users </div>;

  const currentUserInformation = Object.entries(users).filter(
    ([id, user]) => id === currentUser.uid
  )[0][1];

  // create a set of all the interests of the other users
  const allInterests = new Set();
  Object.entries(users).forEach(([id, user]) => {
    if (id !== currentUser.uid && user.interests) {
      Object.entries(user.interests).forEach(([id, interst]) => {
        allInterests.add(interst.name);
      });
    }
  });

  // calculate the similarity list between the interests of the current user and all other users
  const calculateSimilarity = (currentUser, users) => {
    const similarityList = [];
    Object.entries(users).forEach(([id, user]) => {
      if (user !== currentUser && user.interests) {
        let similarity = 0;
        Object.entries(user.interests).forEach(([id, interest]) => {
          if (currentUser.interests) {
            Object.entries(currentUser.interests).forEach(
              ([id, currentUserInterest]) => {
                similarity += stringSimilarity(
                  interest.name,
                  currentUserInterest.name
                );
              }
            );
          }
        });
        similarityList.push([id, user, similarity]);
      }
      if (!user.interests) {
        similarityList.push([id, user, 0]);
      }
    });
    // sort the list by the similarity
    similarityList.sort((a, b) => b[2] - a[2]);
    return similarityList;
  };

  // console.log(calculateSimilarity(currentUserInformation, users));

  return (
    <div>
      <ProfileModal isProfileModalOpen={isProfileModalOpen} closeProfileModal={closeProfileModal} />
      <Menubar user={currentUser} openProfileModal={openProfileModal} />
      <Container className="container">
        <UserInterests
          currentUserInformation={currentUserInformation}
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
          allInterests={allInterests}
        />
        <ListGroup variant="flush">
          {calculateSimilarity(currentUserInformation, users)
            .filter(([id, user, similarity]) => user !== currentUserInformation)
            .map(([id, user, similarity]) => {
              return (
                <ListGroup.Item key={id}>
                  <UserCard
                    description={user.description}
                    name={user.displayName}
                    email={user.email}
                    interests={
                      user.interests
                        ? Object.values(user.interests).map(({ name }) => name)
                        : null
                    }
                    similarity={similarity}
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
