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
import axios from "axios";
import { useNavigate } from "react-router";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const GoogleProvider = new GoogleAuthProvider();
  const [cartDatas, setCartDatas] = useState(null);

  const signInWithGoogle = (from) => {
    return signInWithPopup(auth, GoogleProvider).then((result) => {
      Swal.fire({
        title: "Login Successful",
        icon: "success",
        draggable: false,
      });
      const user = result.user;
      setUser(user);

      // Check if user already exists in DB before posting
      axios
        .get(
          `https://pick-ns-hiip-serversite.vercel.app/users?email=${user?.email}`
        )
        .then((res) => {
          if (res.data && res.data.length > 0) {
            
          } else {
            axios
              .post("https://pick-ns-hiip-serversite.vercel.app/users", {
                email: user?.email,
                displayName: user?.displayName,
                photoURL: user?.photoURL,
                createdAt: new Date(),
                cart: [],
              })
              .then((res) => {
                console.log("User data saved:", res.data);
              })
              .catch((error) => {
                console.error("Error saving user data:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error checking user existence:", error);
        });

      return user;
    });
  };

  useEffect(() => {}, []);

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
    axios
      .post("https://pick-ns-hiip-serversite.vercel.app/users", {
        email: result.user?.email,
        name: result.user?.displayName,
        photoURL: result.user?.photoURL,
        createdAt: new Date(),
        cart: [],
      })
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "User data saved successfully",
            icon: "success",
            draggable: false,
          });
        } else {
          Swal.fire({
            title: "User data already exists",
            icon: "info",
            draggable: false,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error saving user data",
          text: error.message,
          icon: "error",
          draggable: false,
        });
      });
  };

  const signInWithEmail = async (email, password, from) => {
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
  useEffect(() => {
    if (!user || user._id) return; // Only fetch if user exists and is not fully populated
    axios
      .get("https://pick-ns-hiip-serversite.vercel.app/users")
      .then((response) => {
        const currentUser = response.data.find((u) => u.email === user?.email);
        if (currentUser) {
          setUser(currentUser);

          setCartDatas(currentUser.cart || []);

        } else {
          console.error("User not found in the database");
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [user, setUser]);

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
    setUser,
    createUserWithEmail,
    signInWithEmail,
    loading,
    cartDatas,
    setCartDatas,
  };

  return <Authconext value={userInfo}>{children}</Authconext>;
};

export default AuthProvider;
