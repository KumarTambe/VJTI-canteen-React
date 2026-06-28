import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('isLoggedIn') === 'true'
    })
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        localStorage.setItem('isLoggedIn', isLoggedIn)
    }, [isLoggedIn])
    return (
        <AuthContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }}>
            {children}
        </AuthContext.Provider>
    )
}

