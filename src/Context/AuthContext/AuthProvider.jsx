import React, { useEffect, useState } from "react";
import { Authconext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import auth from "../../Firebase/Firebase.init";
import Swal from "sweetalert2";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const GoogleProvider = new GoogleAuthProvider();
  const signInWithGoogle = (from) => {
    return signInWithPopup(auth, GoogleProvider).then((result) => {
      Swal.fire({
        title: "Login Successful",
        icon: "success",
        draggable: false,
      })
    });
  };

  const createUserWithEmail = async (email, password, photoURL, name) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    Swal.fire({
      title: "Registration Successful",
      icon: "success",
      draggable: false,
    });
    await updateProfile(result.user, {
      displayName: name,
      photoURL: photoURL,
    });
    setUser(result.user);
    window.location.reload();
  };

  const signInWithEmail = async (email, password , from) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    setUser(result.user);
    await Swal.fire({
      title: "Login Successful",
      icon: "success",
      draggable: false,
    });
    // No need to reload the page; state update will trigger re-render
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(false);
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
      });
      setUser(null);
    },
    user,
    createUserWithEmail,
    signInWithEmail,
    loading,
  };

  return <Authconext value={userInfo}>{children}</Authconext>;
};

export default AuthProvider;
