import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../firebase/firebase.config';
import axios from 'axios';

export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mongoUser, setMongoUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`https://doc-app-server.vercel.app/user/mongo?email=${user?.email}`);
                setMongoUser(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, [user?.email]);

    const createUser = (email, password) => {
        console.log(email, password, "createUser");
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Google sign in 
    const loginInWithGoogle = (provider) => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const signIn = (email, password) => {
        console.log(email, password, "signIn");
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const updateUser = (userInfo) => {
        console.log(userInfo, "updateUser");
        return updateProfile(auth.currentUser, userInfo);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('user observing');
            setUser(currentUser);
            console.log(currentUser, "currentUser");
            setLoading(false);
        });

        return () => unsubscribe();
    }, [])



    const authInfo = {
        loginInWithGoogle,
        createUser,
        signIn,
        updateUser,
        logOut,
        user,
        mongoUser,
        loading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;