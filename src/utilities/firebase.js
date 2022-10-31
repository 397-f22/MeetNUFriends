import { useEffect, useState, useCallback } from "react";
import { getDatabase, onValue, ref, update } from "firebase/database";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCHtJ4bjObRIyZwicmFUh7AKseZoBywT8Q",
  authDomain: "meetnufriends.firebaseapp.com",
  projectId: "meetnufriends",
  storageBucket: "meetnufriends.appspot.com",
  messagingSenderId: "754646726571",
  appId: "1:754646726571:web:1bdbf021510656338ec4ee",
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  // Keep track of whether data from the database is being loaded or not
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => {
      setIsLoading(true);
      onValue(
        ref(database, path),
        (snapshot) => {
          setData(snapshot.val());
          setIsLoading(false);
        },
        (error) => {
          setError(error);
          setIsLoading(false);
        }
      )
    },
    [path]
  );

  return [data, error, isLoading];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message =
    error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback(
    (value) => {
      update(ref(database, path), value)
        .then(() => setResult(makeResult()))
        .catch((error) => setResult(makeResult(error)));
    },
    [path]
  );
  return [updateData, result];
};

export const useAuthState = () => {
  const [user, setUser] = useState();

  useEffect(() => onAuthStateChanged(getAuth(firebase), setUser), []);

  return [user];
};

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));
export { firebaseSignOut as signOut };
