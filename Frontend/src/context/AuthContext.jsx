import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return !!localStorage.getItem('token')
    })
    const [isAdmin, setIsAdmin] = useState(false);

    return (
        <AuthContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }}>
            {children}
        </AuthContext.Provider>
    )
}