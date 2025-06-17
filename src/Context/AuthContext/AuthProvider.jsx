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
import Swal from "sweetalert2";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const GoogleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    return signInWithPopup(auth, GoogleProvider).then((result) => {
      Swal.fire({
        title: "Login Successful",
        icon: "success",
        draggable: false,
      });
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("User state changed", user);
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const userInfo = {
    signInWithGoogle,
    logOut: async () => {
      const result_1 = await auth.signOut();
      Swal.fire({
        title: "Logout Successful",
        icon: "success",
        draggable: false,
      });;
    },
    user,
  };

  return <Authconext value={userInfo}>{children}</Authconext>;
};

export default AuthProvider;
