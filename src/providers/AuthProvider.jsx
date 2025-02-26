/* eslint-disable react/prop-types */
import axios from "axios";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase.config";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = async () => {
    setLoading(true);
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirect to login page after logout
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("CurrentUser-->", currentUser);
      if (currentUser?.email) {
        setUser(currentUser);

        // Get JWT token
        const apiUrl = import.meta.env.VITE_API_URL;
        if (!apiUrl) {
          console.error("VITE_API_URL is not defined");
          setLoading(false);
          return;
        }

        try {
          const response = await axios.post(
            `${apiUrl}/jwt`,
            {
              email: currentUser?.email,
            },
            { withCredentials: true }
          );
          if (response.data?.token) {
            localStorage.setItem("token", response.data.token);
          }
        } catch (error) {
          console.error("Error fetching JWT token:", error);
        }
      } else {
        setUser(currentUser);
        localStorage.removeItem("token");
        console.log("Token removed from localStorage");
      }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;