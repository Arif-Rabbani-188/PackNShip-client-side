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
// NOTE: useNavigate was imported earlier but unused; removed for cleanliness

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tokenUser, setTokenUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const GoogleProvider = new GoogleAuthProvider();
  const [cartDatas, setCartDatas] = useState([]); // always an array for simpler logic

  const signInWithGoogle = () => {
    setCartDatas([]);
    return signInWithPopup(auth, GoogleProvider)
      .then((result) => {
        Swal.fire({ title: "Login Successful", icon: "success", draggable: false });
        const signedUser = result.user;
        setUser(signedUser); // firebase user (no _id yet)

        // Ensure user exists server-side then refresh to get _id + cart
        axios
          .get(
            `https://pick-ns-hiip-serversite.vercel.app/users?email=${signedUser?.email}`
          )
          .then((res) => {
            let found = null;
            if (Array.isArray(res.data)) {
              // API maybe ignores email param; search manually
              found = res.data.find((u) => u.email === signedUser.email) || null;
            } else if (res.data && typeof res.data === "object") {
              if (res.data.email === signedUser.email) found = res.data;
            }
            if (!found) {
              axios
                .post("https://pick-ns-hiip-serversite.vercel.app/users", {
                  email: signedUser?.email,
                  displayName: signedUser?.displayName,
                  photoURL: signedUser?.photoURL,
                  createdAt: new Date(),
                  cart: [],
                })
                .finally(() => refreshUser(signedUser.email));
            } else {
              // Directly set to matched DB user to avoid flicker
              setUser(found);
              setCartDatas(Array.isArray(found.cart) ? found.cart : []);
            }
          })
          .catch((error) => {
            console.error("Error checking user existence:", error);
            // Fallback to later refresh attempt
            refreshUser(signedUser.email);
          });
        return signedUser;
      })
      .catch((err) => {
        console.error("Google sign-in failed", err);
        throw err;
      });
  };

  useEffect(() => {}, []);

  // Fetch latest user (with cart) from server by email only
  const refreshUser = async (emailOverride) => {
    try {
      const email = emailOverride || user?.email;
      if (!email) return;
      const res = await axios.get(
        `https://pick-ns-hiip-serversite.vercel.app/users?email=${email}`
      );
      let dbUser = null;
      if (Array.isArray(res.data)) {
        // Find exact email match instead of first element
        dbUser = res.data.find((u) => u.email === email) || null;
      } else if (res.data && typeof res.data === "object") {
        if (res.data.email === email) dbUser = res.data;
      }
      // Fallback: if still not found, try full users list
      if (!dbUser) {
        const all = await axios.get(
          "https://pick-ns-hiip-serversite.vercel.app/users"
        );
        if (Array.isArray(all.data)) {
          dbUser = all.data.find((u) => u.email === email) || null;
        }
      }
      if (dbUser) {
        setUser(dbUser);
        setCartDatas(Array.isArray(dbUser.cart) ? dbUser.cart : []);
      }
    } catch (err) {
      console.error("Failed to refresh user", err);
    }
  };

  const createUserWithEmail = async (email, password, photoURL, name) => {
  setCartDatas([]); // ensure clean state server-driven
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
    setTokenUser(result.user);
    try {
      const res = await axios.post(
        "https://pick-ns-hiip-serversite.vercel.app/users",
        {
          email: result.user?.email,
          name: result.user?.displayName,
          photoURL: result.user?.photoURL,
          createdAt: new Date(),
          cart: [],
        }
      );
      if (res.data.insertedId) {
        Swal.fire({
          title: "User data saved successfully",
          icon: "success",
          draggable: false,
        });
      }
    } catch (error) {
      // Likely already exists
    }
  };

  const signInWithEmail = async (email, password) => {
  setCartDatas([]); // server will provide cart
    const result = await signInWithEmailAndPassword(auth, email, password);
    setUser(result.user);
    await Swal.fire({
      title: "Login Successful",
      icon: "success",
      draggable: false,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(false);
      setUser(firebaseUser);
      setTokenUser(firebaseUser);
      if (!firebaseUser) {
        // user signed out -> clear cart to prevent leakage
        setCartDatas([]);
      } else {
        // Immediately attempt to hydrate full user from server
        refreshUser(firebaseUser.email);
      }
    });
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    if (!user) {
      setCartDatas([]);
      return;
    }
    if (!user._id) {
      refreshUser();
    }
  }, [user]);

  console.log(tokenUser);

  const userInfo = {
    signInWithGoogle,
  logOut: async () => {
      await auth.signOut();
      Swal.fire({
        title: "Logout Successful",
        icon: "success",
        draggable: false,
      });
      setUser(null);
      setTokenUser(null);
      setCartDatas([]); // clear cart immediately
    },
  refreshUser,
    user,
    setUser,
    createUserWithEmail,
    signInWithEmail,
    loading,
    cartDatas,
    setCartDatas,
    tokenUser,
  };

  return <Authconext.Provider value={userInfo}>{children}</Authconext.Provider>;
};

export default AuthProvider;
