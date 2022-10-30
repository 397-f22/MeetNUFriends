import { useEffect } from "react";
import { useAuthState, useDbData, useDbUpdate } from "./firebase";

export const useProfile = () => {
  const [user] = useAuthState();
  const [updateUser, result] = useDbUpdate("/users/");
  const [userInformation, error, isLoading] = useDbData(`/users/${user?.uid}`);

  useEffect(() => {
    if (user && !error && !isLoading && userInformation) {
      updateUser({
        [user.uid]: {
          displayName: user.displayName,
          email: user.email,
          interests: userInformation.interests
            ? userInformation.interests
            : null,
        },
      });
    }
  }, [error, isLoading, user, updateUser, userInformation]);

  return [user, error, isLoading];
};
