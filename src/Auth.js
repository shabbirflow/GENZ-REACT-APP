import React, { useEffect, useState } from "react";
// import app from "./base.js";
// import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
// import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./base";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  console.log("HEYYY");
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    // console.log("hi 2");
    // console.log(app);
    // console.log(app.auth());
    // try {
    //   app.auth().onAuthStateChanged((user) => {
    //     setCurrentUser(user);
    //     setPending(false);
    //   });
    // } catch (e) {
    //   console.log("MY ERROR: ", e);
    // }

    try {
      const auth = getAuth(app);
      console.log(auth);
      onAuthStateChanged(auth, (user) => {
        // if (user) {
          console.log(user);
          setCurrentUser(user);
          setPending(false);
          // const uid = user.uid;
          // ...
        // }
      });
    } catch (e) {
      console.log("MY ERROR: ", e);
    }
  }, []);

  if (pending) {
    return (
      <>
        <Spinner
          animation="border"
          variant="primary"
          style={{
            width: "10rem",
            height: "10rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            marginTop: "20%",
          }}
        />
      </>
    );
  }
  console.log("AUTH REACHED");

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
