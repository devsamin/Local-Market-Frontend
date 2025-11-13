// import React, { useEffect, useState } from 'react';
// import { AuthContext } from './AuthContext';
// import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
// import { auth } from '../../firebase/firebase.init';

// const AuthProvider = ({children}) => {
//     const [user, setUser] = useState(null);
//     console.log("AuthProvider rendered, user:", user);

//     const createUser = (email, password)=>{
//         return createUserWithEmailAndPassword(auth, email, password);
//     }
//     const loginUser = (email, password)=>{
//         console.log("Login triggered");
//         return signInWithEmailAndPassword(auth, email, password);
//     }
//     const UserUpdateProfile = (updateData)=>{
//         return updateProfile(auth.currentUser, updateData);
//     }
//     const logoutUser = ()=>{
//         console.log("Logout triggered");
//         return signOut(auth);
//     }
//     useEffect(()=>{
//         const unsubscribe = onAuthStateChanged(auth, currentUser=>{
//             setUser(currentUser);
//         });
//         return ()=>{
//             unsubscribe();
//         }
//     },[])

//     const authInfo = {
//         user,
//         setUser,
//         createUser,
//         loginUser,
//         logoutUser,
//         UserUpdateProfile

//     };
//     return (
//         <AuthContext.Provider value={authInfo}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthProvider;

import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export  const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  };
  // ✅ Update user info in context and localStorage
  const updateUser = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };


  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
