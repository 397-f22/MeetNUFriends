import { useEffect } from "react";
import { useAuthState, useDbData, useDbUpdate } from "./firebase";

export const useProfile = () => {
  const [user] = useAuthState();
  const [updateUser, result] = useDbUpdate("/users/");
  const [isAdmin, error, isLoading] = useDbData(
    `/users/${user?.uid || "guest"}`
  );

  useEffect(() => {
    if (user && !error && !isLoading) {
      updateUser({
        [user.uid]: { displayName: user.displayName, email: user.email },
      });
    }
  }, [error, isLoading, user, updateUser]);

  return [{ user, isAdmin }, error, isLoading];
};
