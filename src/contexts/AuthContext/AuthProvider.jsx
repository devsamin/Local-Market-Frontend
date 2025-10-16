import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    console.log("AuthProvider rendered, user:", user);

    const createUser = (email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const loginUser = (email, password)=>{
        console.log("Login triggered");
        return signInWithEmailAndPassword(auth, email, password);
    }
    const UserUpdateProfile = (updateData)=>{
        return updateProfile(auth.currentUser, updateData);
    }
    const logoutUser = ()=>{
        console.log("Logout triggered");
        return signOut(auth);
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);
        });
        return ()=>{
            unsubscribe();
        }
    },[])

    const authInfo = {
        user,
        setUser,
        createUser,
        loginUser,
        logoutUser,
        UserUpdateProfile

    };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;