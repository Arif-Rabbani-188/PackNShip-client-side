import React, { useEffect, useState } from "react";
import { Authconext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import auth from "../../Firebase/Firebase.init";

const AuthProvider = ({ children }) => {
    const GoogleProvider = new GoogleAuthProvider();
    const signInWithGoogle =()=>{
        return signInWithPopup(auth, GoogleProvider);
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log("User state changed", user);
    });
  const userInfo = {
    signInWithGoogle,
    
  };

  return <Authconext value={userInfo}>{children}</Authconext>;
};

export default AuthProvider;