import { useAuthState, useDbData, useDbUpdate } from "./firebase";

export const useProfile = () => {
  const [user] = useAuthState();
  const [userInformation, error, isLoading] = useDbData(`/users/${user?.uid}`);

  return [user, userInformation, error, isLoading];
};
