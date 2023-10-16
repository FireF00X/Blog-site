import { initializeApp } from "firebase/app";
import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
import firebaseConfig from "../Constants/firebaseConfig";




export const AuthContext = createContext();

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);


    const login = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
    }

    const signup = async (email, password) => {
        await createUserWithEmailAndPassword(auth, email, password);
    }

    const signout = async () => {
        await signOut(auth);
        setUser(null)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
        });

        return () => unSubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);

    return (
        <AuthContext.Provider value={{ signout, login, signup, isAuth: !!user }}>
            {children}
        </AuthContext.Provider>
    )
}