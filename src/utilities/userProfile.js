import { useEffect } from "react";
import { useAuthState, useDbData, useDbUpdate } from "./firebase";

export const useProfile = () => {
  const [user] = useAuthState();
  const [updateUser] = useDbUpdate("/users/");
  const [users, error, isLoading] = useDbData("/users");

  useEffect(() => {
    // Check whether the user needs to be "registered or not" - if they need
    // to be added to our list of users - if so, do so with a blank interests object
    if (user && !error && !isLoading && !Object.keys(users).includes(user.uid)) {
      updateUser({
        [user.uid]: {
          displayName: user.displayName,
          email: user.email,
          interests: {}
        },
      });
    }
  }, [error, isLoading, user, updateUser, users]);

  return [user, error, isLoading];
};
